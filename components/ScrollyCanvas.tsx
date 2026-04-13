"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import NextImage from "next/image";
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

export default function ScrollyCanvas({ frameCount, children }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundWrapperRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation values for frames (FM is great for this)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises: Promise<void>[] = [];

      try {
        for (let i = 0; i < frameCount; i++) {
          const img = new Image();
          const frameNum = i.toString().padStart(2, "0");
          // Use absolute path with origin to be 100% explicit
          const fullPath = `${window.location.origin}/sequence/frame_${frameNum}_delay-0.1s.webp`;
          img.src = fullPath;

          const promise = new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => {
              resolve(); // still resolve to avoid blocking
            };
          });

          promises.push(promise);
          loadedImages[i] = img;
        }

        // Wait for first frame only; don't block paint
        await Promise.race([
          Promise.all(promises.slice(0, 1)),
          new Promise((resolve) => setTimeout(resolve, 200))
        ]);

        setImages(loadedImages);
        setIsLoaded(true);

        // Continue preloading the rest in the background
        Promise.all(promises).then(() => {
          setImages([...loadedImages]);
        }).catch(() => undefined);

      } catch (error) {
        setIsLoaded(true); // Always force load on error
      }
    };

    preloadImages();

    return () => undefined;
  }, [frameCount]);

  // Helper render function
  const render = useCallback((index: number) => {
    if (!canvasRef.current || images.length === 0) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const roundedIndex = Math.round(index);
    const img = images[roundedIndex];
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
  }, [images]);

  // GSAP for cinematic zoom and parallax
  useGSAP(() => {
    if (!backgroundWrapperRef.current || !containerRef.current) return;

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
    render(latest);
  });

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      render(frameIndex.get());
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    if (isLoaded) render(frameIndex.get());

    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, render, frameIndex]);

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
        <NextImage
          src="/sequence/frame_00_delay-0.1s.webp"
          alt="Hero poster"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Cinematic Noise Layer */}
        <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

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
