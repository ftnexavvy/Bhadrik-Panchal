"use client";

import React from "react";
import { getAllPosts } from "@/lib/posts";
import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import Link from "next/link";

export default function InsightsPage() {
    const posts = getAllPosts();

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

                    <h1 className="text-[2.2rem] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[7rem] 2xl:text-[9rem] 4xl:text-11xl font-black uppercase tracking-tighter leading-none md:leading-[0.9] mb-8 sm:mb-12 italic flex flex-col items-center">
                        <span>BUSINESS GROWTH</span>
                        <span className="text-gray-400">INSIGHTS BLOG.</span>
                    </h1>

                    <p className="text-gray-400 uppercase tracking-widest text-sm max-w-2xl mx-auto leading-relaxed">
                        Strategic thinking for founders who want clarity, control, and real scale — not noise.
                    </p>
                </div>
            </SectionWrapper>

            {/* GRID */}
            <SectionWrapper className="pb-48">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-300 xl:max-w-350 2xl:max-w-400 4xl:max-w-[2000px] mx-auto relative">

                    {/* Glow BG */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-white/5 rounded-full blur-[120px] -z-10" />
                    {posts.map((post, i) => (
                        <Link
                            href={`/insights/${post.slug}`}
                            key={post.slug}
                            className="block"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="group relative p-10 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] border border-white/5 bg-white/4 backdrop-blur-3xl flex flex-col justify-between min-h-125 overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:border-white/20 cursor-pointer"
                            >

                                {/* Glow Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-linear-to-br from-white/8 via-transparent to-transparent blur-2xl" />

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
                                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500" />
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
                                <div className="absolute top-0 -left-full w-full h-px bg-linear-to-r from-transparent via-white to-transparent group-hover:left-full transition-all duration-1000" />

                            </motion.div>
                        </Link>
                    ))}
                </div>
            </SectionWrapper>

            {/* CTA */}
            <SectionWrapper className="bg-white text-black py-48 text-center">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span className="text-[18vw] font-black italic opacity-[0.05] tracking-tighter leading-none">
                        CLARITY.
                    </span>
                </div>
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
                            className="px-12 py-8 border border-black/10 text-black text-[10px] uppercase tracking-[0.5em] font-black rounded-full hover:bg-black hover:text-white transition-all min-h-16 flex items-center justify-center active:scale-95"
                        >
                            BOOK STRATEGY CALL →
                        </Link>
                    </div>
                </div>
            </SectionWrapper>

            <SectionWrapper className="py-16 text-center">
                <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
                    <Link
                        href="/business-coach-ahmedabad"
                        className="px-6 py-3 rounded-full border border-white/20 text-[10px] uppercase tracking-[0.3em] font-black"
                    >
                        Business Coach Ahmedabad
                    </Link>
                    <Link
                        href="/motivational-speaker-gujarat"
                        className="px-6 py-3 rounded-full border border-white/20 text-[10px] uppercase tracking-[0.3em] font-black"
                    >
                        Motivational Speaker Gujarat
                    </Link>
                </div>
            </SectionWrapper>

        </main>
    );
}
