"use client";
import React, { useState } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const programs = [
    {
        title: "Strategic 1:1 Mastery",
        desc: "Fixed-point direction for high-stakes business and personal growth decisions.",
        features: [
            "Private Strategy & Mindset Syncs",
            "Direct Communication Access",
            "Custom Growth Architectures",
            "Removal of Mental Bottlenecks",
            "Founder Vision Mastery",
        ],
        cta: "Apply for 1:1",
        popular: true,
    },
    {
        title: "Inner Circle",
        desc: "A closed environment for elite thinkers focused on legacy and vision exposure.",
        features: [
            "Monthly Mastermind Syncs",
            "High-Level Network Access",
            "Scale-Ready Architectures",
            "Strategic Partnership Alerts",
            "Private Founder Retreats",
        ],
        cta: "Join Inner Circle",
        popular: false,
    },
    {
        title: "Growth & Gap Audit",
        desc: "A clinical diagnosis of your current scaling friction and efficiency leaks.",
        features: [
            "Revenue Leak Identification",
            "12-Month Logic Mapping",
            "Bottleneck & Gap Analysis",
            "Immediate ROI Indicators",
            "System Efficiency Scorecard",
        ],
        cta: "Book Your Audit",
        popular: false,
    },
    {
        title: "Keynote Speaking",
        desc: "High-impact mindset and growth thinking for global entrepreneurial stages.",
        features: [
            "Clarity-First Keynotes",
            "Mindset Transformation",
            "Real Business Logic",
            "Summit & Corporate Stages",
            "Dynamic Audience Impact",
        ],
        cta: "Inquire for Speaking",
        popular: false,
    },
    {
        title: "Business Workshops",
        desc: "Intensive group training focused on practical systems and execution logic.",
        features: [
            "Clarity & System Workshops",
            "Team Execution Support",
            "Practical Scale Toolkits",
            "Workflow Sync Sessions",
            "Immediate System Design",
        ],
        cta: "Book a Workshop",
        popular: false,
    },
    {
        title: "Founder Mentorship",
        desc: "High-level mentorship and decision support for the next generation of founders.",
        features: [
            "Mental Discipline Training",
            "Decision Logic Support",
            "Short-Format Direction",
            "Strategic Legacy Planning",
            "Leadership Mindset Reset",
        ],
        cta: "Apply for Mentorship",
        popular: false,
    },
];

const faqs = [
    {
        q: "Who is this for?",
        a: "Founders, vyaparis, and event organizers looking for real-world growth logic and serious mindset shifts.",
    },
    {
        q: "Is this coaching or speaking?",
        a: "Both. Bhadrik works 1:1 with elite founders and speaks on international stages to inspire and instruct.",
    },
    {
        q: "How do I book for events?",
        a: "Submit an inquiry for 'Keynote Speaking' or use the Contact form to share your event details.",
    },
    {
        q: "Why no pricing?",
        a: "High-value systems and world-class speaking are not commodities. We ensure impact and fit before engagement.",
    },
];

export default function ServicesPage() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <main className="bg-black min-h-screen text-white pt-24 overflow-hidden">

            {/* ── HERO SECTION ── */}
            <SectionWrapper className="pt-20 xl:pt-20 2xl:pt-48 text-center">
                <div className="max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] text-gray-500 mb-6 sm:mb-8 block font-bold"
                    >
                        PRECISION SOLUTIONS
                    </motion.span>

                    {/*
                     *  Breakpoint font scale:
                     *  mobile  → 2rem   (clamp floor)
                     *  sm      → 3.5rem
                     *  md      → 5rem
                     *  lg      → 6rem
                     *  xl/1280 → 7rem   ← matches 1280×720 target
                     *  2xl     → 8.5rem
                     */}
                    <h1 className="
                        text-[2rem] leading-none
                        sm:text-[3.5rem] sm:leading-[0.95]
                        md:text-[5rem]   md:leading-[0.9]
                        lg:text-[6rem]
                        xl:text-[6rem]
                        2xl:text-[8.5rem]
                        font-black uppercase tracking-tighter mb-6 sm:mb-8 md:mb-10 italic
                    ">
                        BUILD THE BUSINESS.<br />BECOME THE PERSON.
                    </h1>

                    <p className="text-gray-400 uppercase tracking-widest text-[10px] sm:text-xs md:text-sm max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed">
                        From confusion to clarity. From clarity to conviction. From conviction to scale.
                    </p>
                </div>
            </SectionWrapper>

            {/* ── PROGRAMS GRID ── */}
            <SectionWrapper className="pb-20 sm:pb-28 md:pb-32 pt-12 sm:pt-16 md:pt-20">
                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8
                    max-w-sm sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl
                    mx-auto px-4 sm:px-6 md:px-8
                    relative text-center
                ">
                    {/* Background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 md:w-150 xl:w-200 h-100 md:h-150 xl:h-200 bg-white/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

                    {programs.map((program, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className={`
                                /* Padding */
                                p-7 sm:p-8 md:p-9 lg:p-10 xl:p-10 2xl:p-12
                                /* Border radius */
                                rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem]
                                /* Layout */
                                border flex flex-col justify-between
                                /* Min height scales with viewport */
                                min-h-140 sm:min-h-125 md:min-h-130
                                /* Transitions */
                                transition-all duration-700 group hover:scale-[1.02] cursor-pointer
                                ${program.popular
                                    ? "border-white/10 bg-white/5 backdrop-blur-3xl text-white hover:bg-white hover:text-black hover:border-white hover:shadow-2xl hover:shadow-white/10 z-20"
                                    : "border-white/10 bg-white/5 backdrop-blur-3xl text-white hover:bg-white hover:text-black hover:border-white hover:shadow-2xl hover:shadow-white/10 z-20"
                                }
                            `}
                        >
                            <div className="transition-colors duration-700">
                                {/* Tier label */}
                                <div className={`
                                    text-[9px] sm:text-[10px]
                                    uppercase tracking-[0.4em] font-black mb-6 sm:mb-8
                                    transition-colors duration-700
                                    ${program.popular ? "text-gray-500" : "text-gray-500 group-hover:text-gray-400"}
                                `}>
                                    Tier 0{i + 1}
                                </div>

                                {/* Title */}
                                <h2 className="
                                    text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-4xl
                                    font-bold uppercase tracking-tighter mb-3 sm:mb-4 leading-none
                                    transition-colors duration-700
                                ">
                                    {program.title}
                                </h2>

                                {/* Description */}
                                <p className={`
                                    text-[10px] sm:text-[10px] md:text-xs
                                    uppercase tracking-widest font-light mb-6 sm:mb-8 leading-loose
                                    transition-colors duration-700
                                    ${program.popular ? "text-gray-400" : "text-gray-400 group-hover:text-gray-600"}
                                `}>
                                    {program.desc}
                                </p>

                                {/* Features */}
                                <ul className="space-y-3 sm:space-y-4 transition-colors duration-700">
                                    {program.features.map((feature, j) => (
                                        <li
                                            key={j}
                                            className="flex gap-3 sm:gap-4 text-[9px] sm:text-[10px] uppercase tracking-widest font-bold transition-colors duration-700"
                                        >
                                            <span className={`
                                                w-1.5 h-1.5 rounded-full mt-1 shrink-0
                                                transition-colors duration-700
                                                ${program.popular ? "bg-black" : "bg-white group-hover:bg-black"}
                                            `} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA Button */}
                            <a
                                href="/contact"
                                className={`
                                    mt-8 w-full rounded-full
                                    /* Font size per breakpoint */
                                    text-[9px] sm:text-[10px] md:text-[11px] xl:text-[10px] 2xl:text-[11px]
                                    font-black uppercase tracking-[0.4em]
                                    /* Padding per breakpoint */
                                    px-5 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 xl:px-7 xl:py-3.5 2xl:px-9 2xl:py-4
                                    /* Min height for touch targets */
                                    min-h-10.5 sm:min-h-11.5 md:min-h-13
                                    flex items-center justify-center
                                    transition-all duration-700 active:scale-95
                                    ${program.popular
                                        ? "bg-white text-black group-hover:bg-black group-hover:text-white shadow-xl shadow-white/5"
                                        : "bg-white text-black group-hover:bg-black group-hover:text-white shadow-xl shadow-white/5"
                                    }
                                `}
                            >
                                {program.cta}
                            </a>
                        </motion.div>
                    ))}
                </div>
            </SectionWrapper>

            {/* ── DITCH EFFORT / GET CLARITY CTA ── */}
            <SectionWrapper className="bg-white text-black py-24 sm:py-32 md:py-40 lg:py-48 text-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span className="text-[18vw] font-black italic opacity-[0.05] tracking-tighter leading-none">
                        CLARITY.
                    </span>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto relative z-10 px-4 sm:px-6"
                >
                    {/*
                     *  mobile  → 2.5rem
                     *  sm      → 4rem
                     *  md      → 6rem
                     *  lg      → 7rem
                     *  xl/1280 → 8rem
                     *  2xl     → 9rem
                     */}
                    <h2 className="
                        text-[2.5rem] leading-[0.95]
                        sm:text-[4rem]
                        md:text-[6rem]
                        lg:text-[7rem]
                        xl:text-[7rem]
                        2xl:text-9xl
                        font-black uppercase tracking-tighter mb-8 sm:mb-10 md:mb-12 italic
                    ">
                        DITCH EFFORT.<br />GET CLARITY.
                    </h2>

                    <p className="
                        text-sm sm:text-base md:text-lg lg:text-xl
                        mb-10 sm:mb-12 md:mb-16 font-light uppercase tracking-[0.25em] sm:tracking-[0.3em]
                        max-w-xs sm:max-w-lg md:max-w-2xl mx-auto
                    ">
                        You don&apos;t need more effort. You need clarity to see the right move.
                    </p>

                    <a
                        href="https://cal.id/bhadrik-panchal-business-coach"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            inline-flex items-center justify-center
                            bg-black text-white rounded-full
                            /* Font */
                            text-[9px] sm:text-[10px] md:text-[11px] xl:text-[10px] 2xl:text-[12px]
                            uppercase tracking-[0.5em] sm:tracking-[0.6em] font-black
                            /* Padding */
                            px-8 py-3.5 sm:px-10 sm:py-4 md:px-10 md:py-5 xl:px-10 xl:py-5 2xl:px-12 2xl:py-6
                            /* Min height */
                            min-h-11 sm:min-h-12.5 md:min-h-14 xl:min-h-15
                            hover:scale-110 active:scale-95 transition-all shadow-2xl
                        "
                    >
                        Start Your First Step
                    </a>
                </motion.div>

                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-gray-100 to-transparent z-0" />
            </SectionWrapper>

            {/* ── FAQ SECTION ── */}
            <SectionWrapper className="pb-24 sm:pb-32 md:pb-40 lg:pb-48 pt-16 sm:pt-20 md:pt-24">
                <div className="max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl 2xl:max-w-5xl mx-auto px-4 sm:px-6">

                    {/* FAQ heading */}
                    <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 text-center">
                        <p className="text-[10px] sm:text-xs uppercase tracking-[0.5em] text-gray-500 mb-4 sm:mb-6 font-medium">
                            Common Intel
                        </p>
                        {/*
                         *  mobile  → 3rem
                         *  sm      → 5rem
                         *  md      → 7rem
                         *  lg      → 7rem
                         *  xl/1280 → 8rem
                         *  2xl     → 9rem
                         */}
                        <h2 className="
                            text-[3rem] leading-[0.9]
                            sm:text-[5rem]
                            md:text-[7rem]
                            lg:text-[7rem]
                            xl:text-[8rem]
                            2xl:text-9xl
                            font-black uppercase mb-8 sm:mb-10 italic
                        ">
                            QUESTIONS.
                        </h2>
                    </div>

                    {/* FAQ items */}
                    <div className="space-y-4">
                        {faqs.map((faq, i) => {
                            const isActive = activeIndex === i;

                            return (
                                <div key={i} className="border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-xl">
                                    <button
                                        onClick={() => setActiveIndex(isActive ? null : i)}
                                        className="w-full p-6 sm:p-8 md:p-10 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                    >
                                        <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter uppercase italic pr-4">{faq.q}</span>
                                        {isActive ? <Minus className="w-5 h-5 sm:w-6 sm:h-6" /> : <Plus className="w-5 h-5 sm:w-6 sm:h-6" />}
                                    </button>
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                                            >
                                                <div className="px-6 sm:px-10 pb-8 sm:pb-10 text-gray-400 text-base sm:text-lg leading-relaxed font-medium">
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </SectionWrapper>

        </main>
    );
}
