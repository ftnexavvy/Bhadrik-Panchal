"use client";

import React from "react";
import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import Link from "next/link";

const posts = [
    {
        category: "DIGITAL GROWTH",
        date: "Apr 07, 2026",
        readTime: "5 min read",
        title: "Why Most Businesses Never Scale (And It’s Not Marketing)",
        desc: "Most founders chase tactics. Real growth comes from structure, positioning, and execution systems.",
    },
    {
        category: "PRODUCTIVITY",
        date: "Apr 05, 2026",
        readTime: "4 min read",
        title: "Busy ≠ Productive: The Founder’s Trap",
        desc: "Being busy feels productive — but it’s often avoidance.",
    },
    {
        category: "MINDSET",
        date: "Apr 02, 2026",
        readTime: "6 min read",
        title: "Motivation Doesn’t Build Businesses — Systems Do",
        desc: "Motivation fades. Systems compound. If you rely on feelings, you stay stuck.",
    },
    {
        category: "CLARITY",
        date: "Mar 28, 2026",
        readTime: "3 min read",
        title: "If You Can’t Explain Your Business in 1 Line, You Can’t Scale",
        desc: "Confused messaging creates confused customers.",
    },
    {
        category: "STRATEGY",
        date: "Mar 25, 2026",
        readTime: "5 min read",
        title: "Stop Copying Competitors — Start Building Positioning",
        desc: "When you copy, you compete. When you position, you dominate.",
    },
    {
        category: "EXECUTION",
        date: "Mar 20, 2026",
        readTime: "4 min read",
        title: "Ideas Don’t Scale. Execution Systems Do.",
        desc: "Execution discipline is the real growth lever.",
    },
];

export default function InsightsPage() {
    return (
        <main className="bg-black min-h-screen text-white pt-24 overflow-hidden">

            {/* HERO */}
            <SectionWrapper className="pt-32">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-8 block font-bold"
                    >
                        THE INTELLECTUAL CAPITAL
                    </motion.span>

                    <h1 className="text-[2.2rem] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[7rem] 2xl:text-[9rem] 4xl:text-11xl font-black uppercase tracking-tighter leading-[1] md:leading-[0.9] mb-8 sm:mb-12 italic flex flex-col items-center">
                        <span>THE</span>
                        <span className="text-gray-400">INSIGHTS.</span>
                    </h1>

                    <p className="text-gray-400 uppercase tracking-widest text-sm max-w-2xl mx-auto leading-relaxed">
                        Strategic thinking for founders who want clarity, control, and real scale — not noise.
                    </p>
                </div>
            </SectionWrapper>

            {/* GRID */}
            <SectionWrapper className="pb-48">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 4xl:max-w-[2000px] mx-auto relative">

                    {/* Glow BG */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] -z-10" />

                    {posts.map((post, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="group relative p-10 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] border border-white/5 bg-white/[0.04] backdrop-blur-3xl flex flex-col justify-between min-h-[500px] overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:border-white/20 cursor-pointer"
                        >

                            {/* Glow Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent blur-2xl" />

                            {/* Content */}
                            <div className="relative z-10">

                                <div className="flex justify-between items-center mb-10 sm:mb-12">
                                    <span className="px-4 sm:px-6 py-2 rounded-full border border-white/10 text-[8px] sm:text-[9px] uppercase tracking-widest font-black text-white/50 group-hover:border-white/30 group-hover:text-white transition-all whitespace-nowrap">
                                        {post.category}
                                    </span>
                                    <span className="text-[8px] sm:text-[9px] uppercase tracking-widest font-bold text-gray-400 italic group-hover:text-gray-200 transition-colors whitespace-nowrap">
                                        {post.date} • {post.readTime}
                                    </span>
                                </div>

                                <h2 className="text-2xl md:text-3xl lg:text-4xl 3xl:text-5xl font-black uppercase tracking-tighter mb-8 leading-[1.05] transition-all duration-500 group-hover:translate-x-2">
                                    {post.title}
                                </h2>

                                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-light text-gray-500 leading-loose transition-all duration-500 group-hover:text-gray-300 group-hover:translate-x-1">
                                    {post.desc}
                                </p>
                            </div>

                            {/* CTA */}
                            <div className="pt-10 relative z-10">
                                <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black transition-all duration-500 group-hover:gap-8">
                                    <span className="relative">
                                        READ INSIGHT
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500" />
                                    </span>

                                    <motion.span
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 6 }}
                                        className="text-gray-500 group-hover:text-white"
                                    >
                                        →
                                    </motion.span>
                                </div>
                            </div>

                            {/* Shine Line */}
                            <div className="absolute top-0 left-[-100%] w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent group-hover:left-[100%] transition-all duration-1000" />

                        </motion.div>
                    ))}
                </div>
            </SectionWrapper>

            {/* CTA */}
            <SectionWrapper className="bg-white text-black py-48 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl sm:text-7xl xl:text-[6rem] 2xl:text-[8rem] font-black uppercase tracking-tighter mb-12 italic leading-[0.8]">
                        GET CLARITY.<br />NOT CONTENT.
                    </h2>

                    <p className="text-lg md:text-xl mb-16 font-light uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
                        One email. No fluff. Just sharp insights on business and growth.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link
                            href="/contact"
                            className="px-12 bg-black text-white text-[10px] uppercase tracking-[0.5em] font-black rounded-full hover:scale-110 transition-all flex items-center justify-center active:scale-95"
                        >
                            GET INSIGHTS →
                        </Link>

                        <Link
                            href="/contact"
                            className="px-12 py-8 border border-black/10 text-black text-[10px] uppercase tracking-[0.5em] font-black rounded-full hover:bg-black hover:text-white transition-all min-h-[64px] flex items-center justify-center active:scale-95"
                        >
                            BOOK STRATEGY CALL →
                        </Link>
                    </div>
                </div>
            </SectionWrapper>

        </main>
    );
}