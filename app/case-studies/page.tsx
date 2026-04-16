// app/case-studies/page.tsx
"use client";

import React from "react";
import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const StackedCards = dynamic(() => import("@/components/StackedCards"), {
    ssr: false,
    loading: () => <div className="w-full" style={{ minHeight: "180vh" }} aria-hidden />,
});

const cases = [
    {
        client: "Arjun Mehta",
        sector: "Industrial Business Owner",
        result: "+320% Revenue",
        before: "No Clear Direction",
        after: "Structured Growth System",
        timeline: "8 Months",
        story: "Shifted from manual operations and reactive decisions to a clear, system-driven business model. Built a scalable structure that reduced founder dependency and unlocked consistent revenue growth.",
        process: ["Clarity", "Systems", "Execution"],
        image: "/images/cases/arjun.webp",
    },
    {
        client: "Meera Iyer",
        sector: "D2C Brand Founder",
        result: "7-Figure Breakthrough",
        before: "Local Presence",
        after: "Scalable Brand",
        timeline: "12 Months",
        story: "Evolved from a small local brand into a structured, high-authority business with clear positioning, strong digital presence, and predictable growth systems that compound over time.",
        process: ["Positioning", "Brand", "Growth"],
        image: "/images/cases/meera.webp",
    },
    {
        client: "Sameer Shah",
        sector: "Startup Founder",
        result: "Leadership Transformation",
        before: "Operator Mindset",
        after: "CEO Identity",
        timeline: "90 Days",
        story: "Moved from daily operational chaos to clear thinking and strategic leadership. Built decision-making clarity and freed up time to focus on scaling rather than surviving.",
        process: ["Mindset", "Clarity", "Leadership"],
        image: "/images/cases/sameer.webp",
    },
    {
        client: "Riya Kapoor",
        sector: "SaaS Founder",
        result: "2.4× MRR Growth",
        before: "Feature-Led Selling",
        after: "Outcome-Driven GTM",
        timeline: "6 Months",
        story: "Replaced a scattered feature-pitch sales process with a tight outcome-led go-to-market motion. Churn dropped, NPS climbed, and monthly recurring revenue more than doubled.",
        process: ["GTM", "Positioning", "Retention"],
        image: "/images/cases/riya.webp",
    },
    {
        client: "Vikram Nair",
        sector: "Real Estate Developer",
        result: "₹40Cr Pipeline Built",
        before: "Referral Dependency",
        after: "Demand-Gen System",
        timeline: "5 Months",
        story: "Moved away from unpredictable word-of-mouth into a repeatable demand-generation engine. Built authority through content, tightened the sales process, and filled a ₹40Cr forward pipeline.",
        process: ["Authority", "Demand-Gen", "Closing"],
        image: "/images/cases/vikram.webp",
    },
    {
        client: "Pooja Desai",
        sector: "Health & Wellness Brand",
        result: "+180% Repeat Purchase",
        before: "Single-Purchase Funnel",
        after: "Loyalty Ecosystem",
        timeline: "9 Months",
        story: "Redesigned the post-purchase journey from a transactional dead end into a loyalty ecosystem. Subscription revenue now accounts for 60% of total sales, with community at the core.",
        process: ["Retention", "Community", "LTV"],
        image: "/images/cases/pooja.webp",
    },
];

export default function CaseStudiesPage() {
    return (
        <main className="min-h-screen mt-20 text-white overflow-x-hidden bg-black">
            {/* Hero Section */}
            <SectionWrapper className="pt-20 pb-0">
                <div className="max-w-7xl mx-auto text-center px-4">

                    {/* Top Label */}
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="font-dm text-[9px] sm:text-[10px] tracking-[0.5em] uppercase font-medium block mb-6 sm:mb-8 text-white/60"
                    >
                        The Proof of Concept
                    </motion.span>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                        className="font-sans text-[clamp(38px,9vw,110px)] uppercase italic font-black leading-[0.95] sm:leading-[0.9] text-white mb-7 sm:mb-9 tracking-[-0.01em] sm:tracking-[-0.015em] text-center w-full mx-auto px-2 sm:px-0 flex flex-col items-center"
                    >
                        <span className="block">Real</span>
                        <span className="block pr-[0.08em]">Transformations.</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        className="font-dm text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-white/70 max-w-120 mx-auto leading-[1.8]"
                    >
                        Real shifts in thinking, structure, and business growth.
                        Proof that clarity leads to control.
                    </motion.p>
                </div>
            </SectionWrapper>

            {/* Stacked Cards Section — now with increased height and proper spacing */}
            <StackedCards cases={cases} />

            {/* Global Influence Section */}
            <section className="bg-white text-black py-48 relative z-10">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span className="text-[18vw] font-black italic opacity-[0.05] tracking-tighter leading-none">
                        IMPACT.
                    </span>
                </div>

                <div className="max-w-300 mx-auto text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-4xl mx-auto"
                    >
                        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-8 font-bold font-dm">
                            Global Influence
                        </p>
                        <h2 className="text-4xl sm:text-7xl md:text-[9rem] font-black uppercase leading-[0.9] mb-10 italic font-sans">
                            WIDER IMPACT.
                        </h2>
                        <p className="text-lg md:text-3xl font-medium uppercase tracking-tight max-w-3xl mx-auto leading-tight italic font-dm">
                            Working with founders across industries <br /> to bring clarity, structure, <br /> and scalable growth.
                        </p>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
