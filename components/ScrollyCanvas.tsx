"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollyCanvasProps {
  frameCount: number;
  children?: React.ReactNode;
}

const POSTER_SRC = "/sequence/frame_00_poster-640.webp";
const POSTER_SRCSET_WEBP = "/sequence/frame_00_poster-400.webp 400w, /sequence/frame_00_poster-640.webp 640w";
const PRIORITY_RADIUS = 3;
const MOBILE_PRIORITY_RADIUS = 1;
const MOBILE_FRAME_STEP = 2;
const MOBILE_CANVAS_SCALE = 0.85;
const BACKGROUND_BATCH_SIZE = 4;

type IdleCallback = IdleRequestCallback;

const scheduleIdle = (callback: IdleCallback, timeout: number) => {
  if (typeof globalThis !== "undefined" && "requestIdleCallback" in globalThis) {
    return (globalThis as typeof globalThis & {
      requestIdleCallback: (cb: IdleRequestCallback, options?: IdleRequestOptions) => number;
    }).requestIdleCallback(callback, { timeout });
  }

  return globalThis.setTimeout(() => callback({ didTimeout: false, timeRemaining: () => 0 } as IdleDeadline), timeout);
};

export default function ScrollyCanvas({ frameCount, children }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundWrapperRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const loadingRef = useRef<Set<number>>(new Set());
  const currentFrameRef = useRef(0);
  const backgroundQueueRef = useRef<number[]>([]);
  const backgroundStartedRef = useRef(false);
  const cancelledRef = useRef(false);
  const isMobileRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const liteModeRef = useRef(true);
  const [liteMode, setLiteMode] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const mobileMedia = window.matchMedia("(max-width: 1024px), (pointer: coarse)");
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      const mobile = mobileMedia.matches;
      const reducedMotion = motionMedia.matches;
      isMobileRef.current = mobile;
      setIsMobile(mobile);
      liteModeRef.current = reducedMotion;
      setLiteMode(reducedMotion);
    };

    update();

    if (typeof mobileMedia.addEventListener === "function") {
      mobileMedia.addEventListener("change", update);
      motionMedia.addEventListener("change", update);
      return () => {
        mobileMedia.removeEventListener("change", update);
        motionMedia.removeEventListener("change", update);
      };
    }

    mobileMedia.addListener(update);
    motionMedia.addListener(update);
    return () => {
      mobileMedia.removeListener(update);
      motionMedia.removeListener(update);
    };
  }, []);

  // Animation values for frames (FM is great for this)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  const getFrameSrc = useCallback((index: number) => {
    const frameNum = index.toString().padStart(2, "0");
    return `/sequence/frame_${frameNum}_delay-0.1s.webp`;
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const targetIndex = Math.round(index);
    let resolvedIndex = targetIndex;
    let distance = 0;

    while (distance < frameCount) {
      const forward = targetIndex + distance;
      if (forward < frameCount && loadedRef.current[forward] && imagesRef.current[forward]) {
        resolvedIndex = forward;
        break;
      }

      const backward = targetIndex - distance;
      if (backward >= 0 && loadedRef.current[backward] && imagesRef.current[backward]) {
        resolvedIndex = backward;
        break;
      }

      distance += 1;
    }

    const img = imagesRef.current[resolvedIndex];
    if (!img) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const x = (canvasWidth - imgWidth * scale) / 2;
    const y = (canvasHeight - imgHeight * scale) / 2;

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
  }, [frameCount]);

  const loadFrame = useCallback((index: number) => {
    if (index < 0 || index >= frameCount) return;
    if (loadedRef.current[index] || loadingRef.current.has(index)) return;

    loadingRef.current.add(index);

    const img = new Image();
    img.decoding = "async";
    img.src = getFrameSrc(index);
    imagesRef.current[index] = img;

    img.onload = () => {
      if (cancelledRef.current) return;

      loadingRef.current.delete(index);
      loadedRef.current[index] = true;

      if (index === 0) {
        setIsLoaded(true);
      }

      drawFrame(currentFrameRef.current);
    };

    img.onerror = () => {
      loadingRef.current.delete(index);
    };
  }, [drawFrame, frameCount, getFrameSrc]);

  const queuePriorityFrames = useCallback((index: number) => {
    const radius = isMobileRef.current ? MOBILE_PRIORITY_RADIUS : PRIORITY_RADIUS;

    for (let offset = 0; offset <= radius; offset += 1) {
      loadFrame(index + offset);
      if (offset !== 0) {
        loadFrame(index - offset);
      }
    }
  }, [loadFrame]);

  const startBackgroundPreload = useCallback(() => {
    if (backgroundStartedRef.current || cancelledRef.current) return;
    backgroundStartedRef.current = true;

    const processBatch = (deadline?: IdleDeadline) => {
      if (cancelledRef.current) return;

      let loadedInBatch = 0;

      while (backgroundQueueRef.current.length > 0 && loadedInBatch < BACKGROUND_BATCH_SIZE) {
        if (deadline && deadline.timeRemaining() <= 3) break;
        const nextIndex = backgroundQueueRef.current.shift();
        if (typeof nextIndex === "number") {
          loadFrame(nextIndex);
          loadedInBatch += 1;
        }
      }

      if (backgroundQueueRef.current.length === 0) return;

      scheduleIdle(processBatch, 180);
    };

    processBatch();
  }, [loadFrame]);

  useEffect(() => {
    if (liteMode) return;

    cancelledRef.current = false;
    imagesRef.current = Array.from({ length: frameCount }, () => null);
    loadedRef.current = Array.from({ length: frameCount }, () => false);
    loadingRef.current.clear();
    backgroundQueueRef.current = isMobile
      ? []
      : Array.from({ length: frameCount - 1 }, (_, i) => i + 1);
    backgroundStartedRef.current = false;

    loadFrame(0);
    queuePriorityFrames(0);

    if (isMobile) {
      return () => {
        cancelledRef.current = true;
      };
    }

    const onInteract = () => startBackgroundPreload();

    window.addEventListener("pointerdown", onInteract, { once: true, passive: true });
    window.addEventListener("touchstart", onInteract, { once: true, passive: true });
    window.addEventListener("keydown", onInteract, { once: true });
    window.addEventListener("scroll", onInteract, { once: true, passive: true });

    // Delay background preload so critical resources (fonts, LCP image) load first
    scheduleIdle(() => startBackgroundPreload(), 3000);

    return () => {
      cancelledRef.current = true;
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("scroll", onInteract);
    };
  }, [frameCount, isMobile, liteMode, loadFrame, queuePriorityFrames, startBackgroundPreload]);

  // GSAP for cinematic zoom and parallax
  useGSAP(() => {
    if (!backgroundWrapperRef.current || !containerRef.current) return;
    if (liteModeRef.current || isMobileRef.current) return;

    gsap.to(backgroundWrapperRef.current, {
      scale: 1.1,
      y: "5%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, {
    scope: containerRef,
    dependencies: [liteMode, isMobile],
    revertOnUpdate: true,
  });

  useMotionValueEvent(frameIndex, "change", (latest: number) => {
    if (liteModeRef.current) return;

    const step = isMobileRef.current ? MOBILE_FRAME_STEP : 1;
    const nextIndex = Math.max(0, Math.min(frameCount - 1, Math.round(latest / step) * step));
    if (nextIndex === currentFrameRef.current) return;

    currentFrameRef.current = nextIndex;
    queuePriorityFrames(nextIndex);
    drawFrame(nextIndex);
  });

  useEffect(() => {
    if (liteMode) return;

    const handleResize = () => {
      if (!canvasRef.current) return;
      const scale = isMobileRef.current ? MOBILE_CANVAS_SCALE : 1;
      canvasRef.current.width = Math.max(1, Math.round(window.innerWidth * scale));
      canvasRef.current.height = Math.max(1, Math.round(window.innerHeight * scale));
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame, liteMode]);

  const opacity = useTransform(scrollYProgress, [0, 0.95, 1], [1, 1, 0]);
  const pointerEvents = useTransform<number, string>(scrollYProgress, (v: number) => v < 1 ? "auto" : "none") as unknown as MotionValue<string>;

  if (liteMode) {
    return (
      <div ref={containerRef} className="relative w-full bg-black min-h-screen">
        <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none -mb-[100vh]">
          <picture className="absolute inset-0 block h-full w-full">
            <source srcSet={POSTER_SRCSET_WEBP} sizes="100vw" type="image/webp" />
            <img
              src={POSTER_SRC}
              alt="Hero poster"
              width={640}
              height={360}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>

          <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none mix-blend-screen" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }} />
          <div className="absolute inset-0 z-10 bg-black/45 pointer-events-none" />
        </div>

        <div className="relative z-20 w-full min-h-screen">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full bg-black min-h-screen">
      <motion.div
        ref={backgroundWrapperRef}
        style={{ opacity, pointerEvents }}
        className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none -mb-[100vh]"
      >
        {/* Poster image becomes the LCP target */}
        <picture className="absolute inset-0 block h-full w-full">
          <source srcSet={POSTER_SRCSET_WEBP} sizes="100vw" type="image/webp" />
          <img
            src={POSTER_SRC}
            alt="Hero poster"
            width={640}
            height={360}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>

        {/* Cinematic Noise Layer */}
        {/* CSS noise grain — no external network request */}
        <div className="absolute inset-0 z-10 opacity-[0.04] pointer-events-none mix-blend-screen" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }} />

        {/* Dark Cinematic Overlay */}
        <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none" />

        {/* Lightweight shimmer while frames warm; never blocks LCP */}
        {!isLoaded && (
          <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-white/[0.03] via-transparent to-black/30 animate-pulse" aria-hidden />
        )}

        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>

      {/* Overlay children in the relative flow (scrolling on top of sticky canvas) */}
      <div className="relative z-20 w-full min-h-screen">
        {children}
      </div>
    </div>
  );
}
