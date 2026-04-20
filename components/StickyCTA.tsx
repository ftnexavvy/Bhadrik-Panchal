"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function StickyCTA() {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="fixed bottom-6 right-6 z-60"
            >
                <div className="relative group">
                    {/* Pulsing ring background */}
                    <div className="absolute inset-0 bg-white rounded-full blur-[20px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 animate-pulse" />

                    <a
                        href="/book-call"
                        rel="noopener noreferrer"
                        className="
                            relative flex items-center justify-center
                            w-16 h-16 md:w-18 md:h-18
                            bg-white text-black rounded-full shadow-2xl
                            hover:scale-110 active:scale-95 transition-all duration-300
                            border border-white/20
                        "
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, 0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        >
                            <ArrowUpRight className="w-6 h-6 md:w-7 md:h-7 stroke-[2.5]" />
                        </motion.div>

                        {/* Text tooltip that appears on hover */}
                        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[10px] uppercase font-black tracking-[0.4em] text-white">
                                SECURE YOUR SPOT
                            </span>
                        </div>
                    </a>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
