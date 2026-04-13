"use client";

import { motion } from "framer-motion";
import React from "react";

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
