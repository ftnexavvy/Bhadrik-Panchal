"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (isCoarsePointer || prefersReducedMotion) {
            return;
        }

        let lenis: Lenis | null = null;
        let rafId = 0;

        const start = () => {
            lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: "vertical",
                gestureOrientation: "vertical",
                smoothWheel: true,
                wheelMultiplier: 1.1,
                touchMultiplier: 2,
                infinite: false,
            });

            const raf = (time: number) => {
                lenis?.raf(time);
                rafId = requestAnimationFrame(raf);
            };
            rafId = requestAnimationFrame(raf);
        };

        const idleHandle = typeof requestIdleCallback !== "undefined"
            ? requestIdleCallback(() => start(), { timeout: 200 })
            : setTimeout(() => start(), 150);

        return () => {
            if (typeof cancelIdleCallback !== "undefined") {
                cancelIdleCallback(idleHandle as unknown as number);
            } else {
                clearTimeout(idleHandle as unknown as number);
            }
            if (rafId) cancelAnimationFrame(rafId);
            lenis?.destroy();
        };
    }, []);

    return <>{children}</>;
}
