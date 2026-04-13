"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall } from "lucide-react";
import Link from "next/link";

export default function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[150]"
                >
                    <a
                        href="https://cal.id/bhadrik-panchal-business-coach"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 md:gap-4 bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-full shadow-2xl hover:scale-105 transition-transform"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Book Strategy Call</span>
                        <PhoneCall size={18} className="animate-pulse" />
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
