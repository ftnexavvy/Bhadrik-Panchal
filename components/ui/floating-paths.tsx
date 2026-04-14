"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FloatingPathsBackground({
    position,
    children,
    className,
}: {
    position: number;
    className?: string;
    children: React.ReactNode;
}) {
    // We use a deterministic approach instead of Math.random() to maintain component purity 
    // while still achieving a varied aesthetic.
    const paths = useMemo(() => Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
            } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
            } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
            } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
        // Deterministic variation based on index
        duration: 20 + ((i * 7) % 10),
    })), [position]);

    return (
        <div className={cn("w-full relative", className)}>
            <div className="absolute inset-0 pointer-events-none">
                <svg
                    className="w-full h-full text-white"
                    viewBox="-200 -200 1096 716"
                    fill="none"
                    preserveAspectRatio="xMidYMid slice"
                >
                    {paths.map((path) => (
                        <motion.path
                            key={path.id}
                            d={path.d}
                            stroke="currentColor"
                            strokeWidth={path.width}
                            strokeOpacity={0.4 + path.id * 0.03}
                            initial={{ pathLength: 0.3, opacity: 0.6 }}
                            animate={{
                                pathLength: 1,
                                opacity: [0.5, 1, 0.5],
                                pathOffset: [0, 1, 0],
                            }}
                            transition={{
                                duration: path.duration,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                        />
                    ))}
                </svg>
            </div>
            {children}
        </div>
    );
}
