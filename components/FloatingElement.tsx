"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface FloatingElementProps {
    children: React.ReactNode;
    duration?: number;
    delay?: number;
    yRange?: [number, number];
    xRange?: [number, number];
    className?: string;
}

export default function FloatingElement({
    children,
    duration = 6,
    delay = 0,
    yRange = [0, -15],
    xRange = [0, 8],
    className = "",
}: FloatingElementProps) {
    const [canAnimate, setCanAnimate] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(pointer: coarse), (max-width: 1024px), (prefers-reduced-motion: reduce)");
        const update = () => setCanAnimate(!media.matches);
        update();

        if (typeof media.addEventListener === "function") {
            media.addEventListener("change", update);
            return () => media.removeEventListener("change", update);
        }

        media.addListener(update);
        return () => media.removeListener(update);
    }, []);

    if (!canAnimate) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            animate={{
                y: [yRange[0], yRange[1], yRange[0]],
                x: [xRange[0], xRange[1], xRange[0]],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
