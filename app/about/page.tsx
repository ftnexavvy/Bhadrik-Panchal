"use client";

import React from "react";
import { motion } from "framer-motion";
import FloatingElement from "../../components/FloatingElement";
import TextReveal from "../../components/TextReveal";
import Magnet from "../../components/Magnet";
import Link from "next/link";
import { Target, Rocket, Zap, Shield } from "lucide-react";
export default function AboutPage() {
    return (
        <main className="bg-[#050505] text-white min-h-screen selection:bg-white selection:text-black">

            {/* Hero Section */}
            <section className="relative pt-40 md:pt-56 xl:pt-64 4xl:pt-80 px-6 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                    <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] bg-white/5 rounded-full blur-[100px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-[2.2rem] sm:text-6xl md:text-9xl xl:text-[4rem] 2xl:text-[10rem] 4xl:text-11xl font-black tracking-tighter uppercase mb-8 leading-[1.1] md:leading-[0.9] italic">
                        Bhadrik <span className="text-gray-500">Panchal</span>
                    </h1>
                </motion.div>

                <div className="max-w-3xl">
                    <TextReveal
                        text="A business strategist, growth mentor, and system builder helping entrepreneurs move from confusion to clarity — and clarity to scale."
                        className="text-xl xl:text-xl 2xl:text-2xl text-gray-400 font-medium leading-relaxed justify-center"
                        delay={0.5}
                    />
                </div>
            </section>

            {/* The Story - PR Style */}
            <section className="py-20 md:py-28 xl:py-36 2xl:py-44 3xl:py-56 px-5 md:px-8 xl:px-12">
                <div className="
    max-w-360 mx-auto
    grid md:grid-cols-2
    gap-12 md:gap-16 xl:gap-20 2xl:gap-28 3xl:gap-36
    items-center
  ">

                    {/* ── LEFT: IMAGE ── */}
                    <FloatingElement duration={8} yRange={[0, -20]} xRange={[0, 10]}>
                        <div className="relative aspect-4/5 md:aspect-5/6 rounded-2xl overflow-hidden group">
                            <picture className="absolute inset-0 block h-full w-full">
                                <source srcSet="/assets/images/profile1.webp" type="image/webp" />
                                <source srcSet="/assets/images/profile1.jpg" type="image/jpeg" />
                                <img
                                    src="/assets/images/profile1.jpg"
                                    alt="Bhadrik Panchal"
                                    width={960}
                                    height={1088}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-[1.03]"
                                />
                            </picture>
                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/35 to-transparent z-10" />
                            <div className="
          absolute inset-0 flex items-center justify-center z-10 pointer-events-none
          text-white/4 font-black tracking-tighter uppercase select-none
          text-[5rem] md:text-[6rem] xl:text-[8rem] 2xl:text-[10rem] 3xl:text-[12rem]
         ">
                                BHADRIK
                            </div>
                            <div className="absolute bottom-8 left-8 xl:bottom-10 xl:left-10 2xl:bottom-14 2xl:left-14 z-20">
                                <p className="text-[9px] xl:text-[10px] 2xl:text-xs uppercase tracking-[0.5em] font-black text-white/35 mb-2">
                                    Since 2009
                                </p>
                                <p className="text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl font-black tracking-tighter uppercase italic">
                                    Built on Clarity
                                </p>
                            </div>
                        </div>
                    </FloatingElement>

                    {/* ── RIGHT: CONTENT ── */}
                    <div className="flex flex-col gap-8 xl:gap-10 2xl:gap-14">

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="
          text-[2.25rem] md:text-[2.75rem] xl:text-[3.5rem] 2xl:text-[4.25rem] 3xl:text-[5.5rem]
          font-black tracking-tighter uppercase italic leading-[1.05]
          mb-6 xl:mb-8 2xl:mb-10
        ">
                                From Struggle <br />
                                To{" "}
                                <span className="text-white/30">Structured Scale</span>
                            </h2>

                            <div className="
          text-white/50 font-medium leading-relaxed
          text-base xl:text-lg 2xl:text-xl 3xl:text-2xl
          flex flex-col gap-5 xl:gap-6
        ">
                                <p>
                                    Bhadrik Panchal is a business growth mentor focused on one thing — turning confusion into clarity.
                                    Instead of chasing trends, he helps entrepreneurs build strong systems, clear direction, and
                                    businesses that actually scale.
                                </p>
                                <p>
                                    In 2009, I started with nothing but energy. I explored multiple ventures, failed often, and
                                    navigated the same noise every founder faces. I worked harder than everyone, but the results
                                    were inconsistent. The business wasn&apos;t growing; it was just surviving on my manual effort.
                                </p>
                                <p>
                                    Today, I don&apos;t teach motivation. I teach structure. I help entrepreneurs who are technically
                                    good at what they do but are drowning in the daily chaos of their own success. We build systems
                                    that turn confusion into predictable growth.
                                </p>
                            </div>
                        </motion.div>

                        {/* ── STATS BAR ── */}
                        <div className="flex flex-wrap md:flex-nowrap border-t border-b border-white/[0.07]">
                            {[
                                { label: "Experience", value: "15+ Yrs", code: "EXP-09" },
                                { label: "Entrepreneurs", value: "1000+", code: "ENT-24" },
                                { label: "Revenue Goal", value: "7-Fig", code: "REV-MS" },
                                { label: "Presence", value: "Pan-India", code: "LOC-IN" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="
              group relative flex flex-col justify-center
              w-1/2 md:flex-1
              px-5 py-6
              xl:px-6 xl:py-7
              2xl:px-8 2xl:py-9
              3xl:px-10 3xl:py-11
              hover:bg-white/3 transition-colors duration-300
              nth-[n+3]:border-t nth-[n+3]:border-white/[0.07] md:nth-[n+3]:border-t-0
              even:border-l even:border-white/[0.07]
              md:not-first:border-l md:not-first:border-white/[0.07]
              md:even:border-l-0
            "
                                >
                                    <span className="font-mono text-[8px] xl:text-[9px] 2xl:text-[10px] tracking-[0.4em] uppercase text-white/20 mb-2">
                                        {stat.code}
                                    </span>
                                    <p className="
              font-black tracking-tighter uppercase italic leading-none mb-1.5
              text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl
              text-white/80 group-hover:text-white transition-colors duration-300
            ">
                                        {stat.value}
                                    </p>
                                    <p className="text-[9px] xl:text-[10px] 2xl:text-[11px] tracking-[0.3em] uppercase font-bold text-white/30">
                                        {stat.label}
                                    </p>
                                    <div className="mt-2.5 h-px bg-white/40 w-0 group-hover:w-5 transition-all duration-300 ease-out" />
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* Press / Media Features */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-350 mx-auto">
                    <p className="text-[9px] uppercase tracking-[0.6em] font-black text-black/90 text-center mb-10">As Featured In</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {[
                             {
                                outlet: "ABP Live",
                                img: "/assets/images/abp live bhadrik panchal.webp",
                                href: "https://news.abplive.com/brand-wire/champions-of-tomorrow-india-s-emerging-leader-to-watch-in-2025-1794897",
                                label: "Champions of Tomorrow - India’s Emerging Leader To Watch In 2025"
                            },
                            {
                                outlet: "Ahmedabad Mirror",
                                img: "/assets/images/ahmedabad mirror bhadrik panchal.webp",
                                href: "https://news.abplive.com/brand-wire/champions-of-tomorrow-india-s-emerging-leader-to-watch-in-2025-1794897",
                                label: "Champions of Tomorrow — India's Emerging Leader to Watch in 2025"
                            },
                            {
                                outlet: "Loktej",
                                img: "/assets/images/loktej bhadrik panchal.webp",
                                href: "https://english.loktej.com/article/20194/india%E2%80%99s-top-10-visionary-personalities-who-made-headlines-in-2025",
                                label: "India's Top 10 Visionary Personalities Who Made Headlines in 2025"
                            },
                            {
                                outlet: "Mid-Day",
                                img: "/assets/images/mid day bhadrik panchal.webp",
                                href: "https://www.mid-day.com/buzzfeed/article/indias-10-visionary-personalities-who-made-headlines-in-2025-6852",
                                label: "India's 10 Visionary Personalities Who Made Headlines in 2025"
                            },
                            {
                                outlet: "UP18 News",
                                img: "/assets/images/up 18 bhadrik panchal.webp",
                                href: "https://up18news.com/champions-of-tomorrow-indias-emerging-leader-to-watch-in-2025/",
                                label: "Champions of Tomorrow — India's Emerging Leader to Watch in 2025"
                            },
                        ].map((item, i) => (
                            <motion.a
                                key={i}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="group flex flex-col gap-3 p-5 border border-black/10 rounded-2xl hover:border-black/30 hover:bg-black/3 transition-all duration-500 overflow-hidden"
                            >
                                <div className="relative w-full overflow-hidden rounded-lg">
                                    <img
                                        src={item.img}
                                        alt={item.outlet}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-auto object-contain grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-black transition-colors duration-300">{item.outlet}</span>
                                <span className="text-[12px] text-black/60 group-hover:text-black/90 leading-relaxed transition-colors flex-1 font-medium">{item.label}</span>
                                <span className="text-[9px] uppercase tracking-[0.4em] text-black/40 group-hover:text-black transition-colors font-bold">Read Article →</span>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-32 px-6 border-t border-white/5 bg-[#080808]">
                <div className="max-w-300 mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl xl:text-7xl 4xl:text-9xl font-black tracking-tighter uppercase italic mb-12">
                            HOW I <span className="text-gray-500">THINK</span>
                        </h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            {[
                                "Clarity creates power. Confusion destroys businesses.",
                                "Most people don’t fail — they never get clear enough to win.",
                                "Systems scale what effort never can.",
                                "If your business isn’t simple, it isn’t scalable.",
                                "Discipline builds growth. Luck only delays failure."
                            ].map((belief, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="w-2 h-2 rounded-full bg-white mt-3 shrink-0" />
                                    <p className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight leading-tight uppercase italic">{belief}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="xl:py-15 2xl:py-32 bg-white text-black relative overflow-hidden">
                <div className="max-w-300 mx-auto px-6 grid md:grid-cols-3 gap-12 relative z-10">
                    <div className="col-span-full mb-16">
                        <h2 className="text-6xl md:text-8xl xl:text-8xl 2xl:text-9xl 4xl:text-11xl font-black tracking-tighter uppercase italic text-center">
                            CLARITY CREATES <br /> <span className="text-gray-400">CONTROL</span>
                        </h2>
                    </div>
                    {[
                        {
                            icon: <Target className="w-10 h-10" />,
                            title: "Business Clarity",
                            desc: "Understand what to focus on, what to ignore, and how to build a business that actually makes sense."
                        },
                        {
                            icon: <Rocket className="w-10 h-10" />,
                            title: "Digital Leverage",
                            desc: "Use digital systems to scale your reach, generate demand, and grow without constant effort."
                        },
                        {
                            icon: <Zap className="w-10 h-10" />,
                            title: "Mental Discipline",
                            desc: "Build the focus, consistency, and decision-making needed to grow beyond your current limits."
                        }
                    ].map((item, i) => (
                        <FloatingElement key={i} delay={i * 0.2} yRange={[0, -15]}>
                            <div className="p-12 border border-black/5 rounded-3xl h-full hover:bg-black hover:text-white transition-all duration-700 group">

                                {/* Icon */}
                                <div className="mb-8 text-black group-hover:text-white transition-colors duration-500">
                                    {item.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tight">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-500 group-hover:text-gray-400 font-medium leading-relaxed transition-colors duration-500">
                                    {item.desc}
                                </p>

                            </div>
                        </FloatingElement>
                    ))}
                </div>
            </section>

            {/* Audience Targeting */}
            <section className="xl:py-15 2xl:py-32 px-6 bg-white text-black">
                <div className="max-w-300 mx-auto grid md:grid-cols-2 gap-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-black uppercase italic mb-10 tracking-tight">THIS IS FOR YOU IF</h3>
                        <ul className="space-y-6">
                            {[
                                "You have a working business but feel stuck in a loop of inconsistency.",
                                "You are tired of 'hustling' without seeing a clear path to the next level.",
                                "You have a great product but lack the systems to scale it.",
                                "You want to transition from a manual operator to a strategic owner.",
                                "You value truth and structure over hype and motivation."
                            ].map((point, i) => (
                                <li key={i} className="flex items-start gap-4 group">
                                    <Target className="w-5 h-5 mt-1 shrink-0 opacity-20 group-hover:opacity-100 transition-opacity" />
                                    <p className="text-lg font-medium leading-relaxed">{point}</p>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-black uppercase italic mb-10 tracking-tight">THIS IS NOT FOR YOU IF</h3>
                        <ul className="space-y-6">
                            {[
                                "You are looking for a get-rich-quick scheme or a 'magic' marketing trick.",
                                "You aren't willing to dismantle your current way of working to build better.",
                                "You prefer motivational quotes over actual business data and systems.",
                                "You aren't ready to take 100% responsibility for your direction."
                            ].map((point, i) => (
                                <li key={i} className="flex items-start gap-4 group">
                                    <Shield className="w-5 h-5 mt-1 shrink-0 opacity-20 group-hover:opacity-100 transition-opacity" />
                                    <p className="text-lg font-medium leading-relaxed text-gray-500">{point}</p>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Authority Section */}
            <section className="py-32 px-6 border-y border-white/5 bg-black">
                <div className="max-w-300 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        <p className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-tight">
                            15 Years. 1000+ Founders. <br />
                            <span className="text-gray-500">No Hype. Just Structured Scale.</span>
                        </p>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                            Worked with founders across industries to simplify their logic, build their systems, and reclaim control of their growth.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Signature Quote */}
            <section className="py-40 px-6 text-center bg-black">
                <div className="max-w-4xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic mb-8"
                    >
                        &quot;Tumhari soch hi, <br />
                        <span className="text-gray-500">tumhari limit hai.&quot;</span>
                    </motion.p>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "200px" }}
                        viewport={{ once: true }}
                        className="h-0.5 bg-white mx-auto mb-12"
                    />
                    <p className="text-lg md:text-xl xl:text-xl 2xl:text-2xl text-white/70 uppercase tracking-[0.2em] font-black max-w-2xl mx-auto">
                        AHMEDABAD’S LEADING BUSINESS GROWTH MENTOR — BHADRIK PANCHAL
                    </p>

                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 px-6 bg-white text-black text-center relative overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
    <span className="text-[18vw] font-black italic opacity-[0.05] tracking-tighter leading-none">
      SCALE.
    </span>
  </div>
                <div className="max-w-300 mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic mb-8 leading-[0.9]">
                            STOP CHASING. <br /> START SCALING.
                        </h2>
                        <p className="text-xl md:text-2xl font-medium mb-16 text-gray-600 max-w-2xl mx-auto">
                            If you are ready to move from confusion to a 7-figure system, let&apos;s talk. No fluff, no long-winded pitches. Just a direct path to clarity.
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                            <Magnet strength={0.2}>
                                <Link
                                    href="/contact"
                                    className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 xl:px-6 xl:py-3 2xl:px-8 2xl:py-4 4xl:px-12 4xl:py-6 bg-black text-white text-[9px] sm:text-[10px] md:text-[12px] xl:text-[8px] 2xl:text-[10px] 4xl:text-[14px] font-black tracking-widest uppercase italic hover:bg-gray-900 transition-all duration-300 rounded-full inline-block items-center justify-center active:scale-95 shadow-xl"
                                >
                                    Book a Clarity Call
                                </Link>
                            </Magnet>

                            <Link
                                href="/case-studies"
                                className="text-lg font-black tracking-widest uppercase italic border-b-2 border-black hover:pb-2 transition-all duration-300"
                            >
                                View My Systems
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
