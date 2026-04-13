"use client";

import React from "react";
import { motion } from "framer-motion";

const projects = [
    {
        title: "The 10X Framework",
        category: "Coaching Program",
        description: "A comprehensive roadmap for scaling service-based businesses to $1M+ ARR.",
        tag: "High-Ticket",
    },
    {
        title: "Global Enterprise Strategy",
        category: "Consulting",
        description: "Strategic advisory for Fortune 500 leadership teams on digital transformation.",
        tag: "Strategy",
    },
    {
        title: "Elite Mastermind",
        category: "Group Program",
        description: "Exclusive community for top-tier founders looking for rapid expansion.",
        tag: "Networking",
    },
];

export default function Projects() {
    return (
        <section className="relative z-20 py-24 bg-black px-6 md:px-20 min-h-screen flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 uppercase tracking-tighter">
                        Selected Works
                    </h2>
                    <div className="h-1 w-20 bg-white" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass glass-hover p-8 rounded-2xl flex flex-col justify-between h-[450px] cursor-pointer group"
                        >
                            <div>
                                <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 block">
                                    {project.tag}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 group-hover:text-gray-300 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 font-light leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-sm text-gray-500">{project.category}</span>
                                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                    →
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
