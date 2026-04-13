"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
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
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Animation values for frames (FM is great for this)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // Preload images
  useEffect(() => {
    if (!hasMounted) return;

    const preloadImages = async () => {
      console.log(`Starting preloading for ${frameCount} frames...`);
      const loadedImages: HTMLImageElement[] = [];
      const promises: Promise<void>[] = [];

      try {
        // Create a safety timeout to ensure the loader eventually disappears
        const timeoutPromise = new Promise<void>((resolve) => {
          setTimeout(() => {
            console.warn("Loading timeout reached: Proceeding with available frames.");
            resolve();
          }, 3500); // 3.5 second fallback (slightly more generous)
        });

        for (let i = 0; i < frameCount; i++) {
          const img = new Image();
          const frameNum = i.toString().padStart(2, "0");
          // Use absolute path with origin to be 100% explicit
          const fullPath = `${window.location.origin}/sequence/frame_${frameNum}_delay-0.1s.png`;
          img.src = fullPath;

          const promise = new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => {
              console.error(`ERROR: Failed to load ${fullPath}`);
              resolve(); // Still resolve to not block everything
            };
          });

          promises.push(promise);
          loadedImages[i] = img;
        }

        // Wait for either the first 5 frames OR the timeout
        await Promise.race([
          Promise.all(promises.slice(0, 5)),
          timeoutPromise
        ]);

        console.log("Setting isLoaded to true");
        setImages(loadedImages);
        setIsLoaded(true);

        // Continue preloading the rest in the background
        Promise.all(promises).then(() => {
          console.log("All frames preloaded (or failed).");
          setImages([...loadedImages]);
        }).catch(err => {
          console.error("Background preloading error:", err);
        });

      } catch (error) {
        console.error("Critical error in preloadImages:", error);
        setIsLoaded(true); // Always force load on error
      }
    };

    preloadImages();

    // Ultimate fallback: Force show page after 5 seconds no matter what
    const forceTimer = setTimeout(() => {
      console.log("Force loading after 5s...");
      setIsLoaded(true);
    }, 5000);

    return () => clearTimeout(forceTimer);
  }, [frameCount, hasMounted]);

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

  // Helper render function
  const render = (index: number) => {
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
  };

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
  }, [isLoaded, images]);

  const opacity = useTransform(scrollYProgress, [0, 0.95, 1], [1, 1, 0]);
  const pointerEvents = useTransform(scrollYProgress, (v: number) => v < 1 ? "auto" : "none") as any;

  return (
    <div ref={containerRef} className="relative w-full bg-black">
      {hasMounted ? (
        <>
          <motion.div
            ref={backgroundWrapperRef}
            style={{ opacity, pointerEvents }}
            className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none -mb-[100vh]"
          >
            {/* Cinematic Noise Layer */}
            <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Dark Cinematic Overlay */}
            <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none" />

            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
                <div className="text-white text-xl font-light tracking-[0.5em] animate-pulse">
                  LOADING EXPERIENCE...
                </div>
              </div>
            )}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>

          {/* Overlay children in the relative flow (scrolling on top of sticky canvas) */}
          <div className="relative z-20 w-full">
            {children}
          </div>
        </>
      ) : (
        <div className="h-screen w-full bg-black flex items-center justify-center">
          <div className="text-white text-xl font-light tracking-[0.5em] animate-pulse">
            INITIALIZING...
          </div>
        </div>
      )}
    </div>
  );
}
