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

const POSTER_SRC_JPG = "/sequence/frame_00_delay-0.1s.jpg";
const POSTER_SRCSET_WEBP = "/sequence/frame_00_delay-0.1s-400.webp 400w, /sequence/frame_00_delay-0.1s.webp 800w";
const POSTER_SRCSET_JPG = "/sequence/frame_00_delay-0.1s-400.jpg 400w, /sequence/frame_00_delay-0.1s.jpg 800w";
const PRIORITY_RADIUS = 3;
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
  const [isLoaded, setIsLoaded] = useState(false);

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
    for (let offset = 0; offset <= PRIORITY_RADIUS; offset += 1) {
      loadFrame(index + offset);
      if (offset !== 0) {
        loadFrame(index - offset);
      }
    }
  }, [loadFrame]);

  const startBackgroundPreload = useCallback(() => {
    if (isMobileRef.current) return;
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
    isMobileRef.current = window.matchMedia("(max-width: 1024px), (pointer: coarse)").matches;
    cancelledRef.current = false;
    imagesRef.current = Array.from({ length: frameCount }, () => null);
    loadedRef.current = Array.from({ length: frameCount }, () => false);
    loadingRef.current.clear();
    backgroundQueueRef.current = isMobileRef.current
      ? []
      : Array.from({ length: frameCount - 1 }, (_, i) => i + 1);
    backgroundStartedRef.current = false;

    loadFrame(0);
    queuePriorityFrames(0);

    if (!isMobileRef.current) {
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
    }

    return () => {
      cancelledRef.current = true;
    };
  }, [frameCount, loadFrame, queuePriorityFrames, startBackgroundPreload]);

  // GSAP for cinematic zoom and parallax
  useGSAP(() => {
    if (!backgroundWrapperRef.current || !containerRef.current) return;
    if (window.matchMedia("(max-width: 1024px), (pointer: coarse)").matches) return;

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
  }, { scope: containerRef });

  useMotionValueEvent(frameIndex, "change", (latest: number) => {
    const nextIndex = Math.round(latest);
    currentFrameRef.current = nextIndex;
    queuePriorityFrames(nextIndex);
    drawFrame(nextIndex);
  });

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  const opacity = useTransform(scrollYProgress, [0, 0.95, 1], [1, 1, 0]);
  const pointerEvents = useTransform<number, string>(scrollYProgress, (v: number) => v < 1 ? "auto" : "none") as unknown as MotionValue<string>;

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
          <source srcSet={POSTER_SRCSET_JPG} sizes="100vw" type="image/jpeg" />
          <img
            src={POSTER_SRC_JPG}
            alt="Hero poster"
            width={800}
            height={450}
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
