"use client";

import React from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface OverlayProps {
    scrollYProgress?: MotionValue<number>;
}

export default function Overlay({ scrollYProgress: inheritedScrollProgress }: OverlayProps) {
    const { scrollYProgress: windowScroll } = useScroll();
    const scrollYProgress = inheritedScrollProgress || windowScroll;

    // Animation milestones for text layers
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.5, 0.55], [0, 1, 1, 0]);
    const x2 = useTransform(scrollYProgress, [0.25, 0.55], [-30, 0]);

    const opacity3 = useTransform(scrollYProgress, [0.65, 0.7, 0.9, 0.95], [0, 1, 1, 0]);
    const x3 = useTransform(scrollYProgress, [0.65, 0.95], [30, 0]);



    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            {/* Dark Gradient for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-0" />

            {/* Section 1: Center - Hero */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <motion.div
                    style={{ opacity: opacity1, y: y1 }}
                    className="text-center px-6 max-w-5xl"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-gray-400 mb-6 block font-medium"
                    >
                        Elite Business Coaching & Consulting
                    </motion.span>
                    <h1 className="text-5xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-8">
                        SCALE TO<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white/50">10X GROWTH.</span>
                    </h1>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12 pointer-events-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-white text-black text-xs uppercase tracking-[0.3em] font-bold rounded-full shadow-2xl shadow-white/10"
                        >
                            Book Strategy Call
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-transparent text-white border border-white/20 text-xs uppercase tracking-[0.3em] font-bold rounded-full backdrop-blur-md"
                        >
                            View Case Studies
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Section 2: Bottom Left - Value Prop */}
            <div className="absolute inset-0 flex items-end justify-start p-10 md:p-24 z-10">
                <motion.div
                    style={{ opacity: opacity2, x: x2 }}
                    className="max-w-xl backdrop-blur-xl bg-white/5 p-8 border border-white/10 rounded-2xl"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase leading-none mb-4">
                        PROVEN<br />
                        SYSTEMS.
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base tracking-wide font-light max-w-sm uppercase">
                        We don&apos;t just coach. We build the infrastructure for your next evolution.
                    </p>
                </motion.div>
            </div>

            {/* Section 3: Bottom Right - CTA */}
            <div className="absolute inset-0 flex items-end justify-end p-10 md:p-24 z-10">
                <motion.div
                    style={{ opacity: opacity3, x: x3 }}
                    className="max-w-xl text-right backdrop-blur-xl bg-white/5 p-8 border border-white/10 rounded-2xl"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase leading-none mb-4">
                        ELITE<br />
                        RESULTS.
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base tracking-wide font-light max-w-sm ml-auto uppercase">
                        Join the top 1% of founders who have mastered the art of scaling.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
