"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    delay?: number;
}

export default function SectionWrapper({
    children,
    className = "",
    id,
    delay = 0,
}: SectionWrapperProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay }}
            className={`relative py-24 px-6 md:px-12 ${className}`}
        >
            <div className="max-w-[1200px] mx-auto w-full">
                {children}
            </div>
        </motion.section>
    );
}
