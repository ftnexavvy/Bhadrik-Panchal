"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Script from "next/script";

// Defer heavy components to reduce initial JS payload
const ScrollyCanvas = dynamic(() => import("../components/ScrollyCanvas"), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-black" />
});
const TextReveal = dynamic(() => import("../components/TextReveal"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

import FloatingElement from "../components/FloatingElement";
import Magnet from "../components/Magnet";
import Link from "next/link";
import {
  Zap,
  ChevronRight,
  ArrowRight,
  Star,
  CheckCircle,
  Lock,
  Plus,
  Minus
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Clarity First",
    desc: "Stop guessing. Get clear on what you do, who you serve, and why it matters."
  },
  {
    number: "02",
    title: "Powerful Positioning",
    desc: "Stand out with a clear identity and message that people instantly understand and trust."
  },
  {
    number: "03",
    title: "Trust Building",
    desc: "Build authority and trust by consistently showing up with real value."
  },
  {
    number: "04",
    title: "Visibility System",
    desc: "Be visible to the right people consistently without depending on luck."
  },
  {
    number: "05",
    title: "Growth Systems",
    desc: "Create repeatable systems that generate leads, sales, and consistent growth."
  },
  {
    number: "06",
    title: "Leadership Shift",
    desc: "Move from doing everything yourself to leading with clarity and control."
  },
  {
    number: "07",
    title: "Success Identity",
    desc: "Think, act, and operate like a 7-figure entrepreneur."
  },
];

const results = [
  {
    name: "Rajesh S.",
    role: "Business Owner",
    quote: "I was working hard but going nowhere. Bhadrik gave me clarity, structure, and a system that turned my efforts into real growth.",
    result: "+320% Revenue"
  },
  {
    name: "Aavya P.",
    role: "Entrepreneur",
    quote: "The biggest shift was not in my business, but in my thinking. Once that changed, scaling became natural.",
    result: "7-Figure Breakthrough"
  },
  {
    name: "Vikram M.",
    role: "Founder",
    quote: "I stopped being stuck in operations and started leading with clarity. That mindset shift changed everything within 90 days.",
    result: "Leadership Transformation"
  },
];

const tiers = [
  {
    name: "Strategic 1:1",
    price: "By Application Only",
    desc: "A private, high-impact experience focused on clarity, systems, and real business growth.",
    features: [
      "Weekly 1:1 Strategy Sessions",
      "Direct Access & Priority Support",
      "Personalized Growth Blueprint",
      "Clarity & Decision Framework"
    ]
  },
  {
    name: "Inner Circle",
    price: "Invitation Only",
    desc: "A closed room of serious founders building scalable businesses and long-term legacy.",
    features: [
      "Monthly Mastermind Sessions",
      "High-Level Strategic Discussions",
      "Private Network Access",
      "Long-Term Growth & Scaling Focus"
    ]
  },
];

const faqs = [
  {
    q: "Is this for beginners?",
    a: "Yes — but only for those who are serious. Whether you're starting or scaling, the focus is on clarity, execution, and real growth."
  },
  {
    q: "Why does this approach work?",
    a: "Because most businesses don’t fail due to lack of effort — they fail due to lack of clarity and systems. This approach fixes both."
  },
  {
    q: "How long until I see results?",
    a: "Clarity starts from day one. With proper execution, visible growth typically follows within 30–60 days."
  },
  {
    q: "Is this just coaching?",
    a: "No. This is a transformation process. The goal is not just knowledge — but real business growth, control, and long-term scale."
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-black text-white selection:bg-white selection:text-black">
      {/* Lazy load Cal.com embed script */}
      <Script
        src="https://asset.cal.com/embed/embed.js"
        strategy="lazyOnload"
      />

      <ScrollyCanvas frameCount={80}>
        {/* Hero Content Section */}
        <section className="relative min-h-[100vh] h-auto flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden pt-32 sm:pt-40 md:pt-48 xl:pt-56 4xl:pt-72 pb-24 md:pb-32">
          {/* 🔥 Background Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] bg-white/5 blur-[80px] sm:blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="max-w-[1200px] mx-auto w-full relative z-10">
            {/* 🔥 Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
              className="text-[2.2rem] sm:text-7xl lg:text-[4.5rem] xl:text-[5rem] 2xl:text-[8rem] 4xl:text-[10rem] font-black uppercase leading-[1.1] sm:leading-[0.9] mb-8 sm:mb-10 italic [word-spacing:0.05em] px-2"
            >
              GROWTH IS NOT<br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                LUCK IT’S SYSTEM
                <span className="absolute inset-0 blur-xl bg-white/20 opacity-40"></span>
              </span>
            </motion.h1>

            {/* 🔥 Subtext */}
            <div className="max-w-2xl mx-auto px-4 sm:px-0">
              <TextReveal
                text="15+ years of real execution helping entrepreneurs build, scale and dominate using digital systems."
                className="text-sm sm:text-xl md:text-xl 2xl:text-2xl text-gray-400 font-medium leading-relaxed justify-center mb-10 sm:mb-12"
                delay={0.6}
              />
            </div>
          </div>

          {/* 🔥 CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Magnet strength={0.2}>
              <a
                href="https://cal.id/bhadrik-panchal-business-coach"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 xl:px-6 xl:py-3 2xl:px-8 2xl:py-4 4xl:px-12 4xl:py-6 bg-white text-black text-[9px] sm:text-[10px] md:text-[12px] xl:text-[8px] 2xl:text-[10px] 4xl:text-[14px] uppercase font-black tracking-[0.3em] rounded-full hover:bg-transparent hover:text-white border border-white transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 min-h-[40px] sm:min-h-[48px] md:min-h-[56px] xl:min-h-[48px] 2xl:min-h-[52px] 4xl:min-h-[64px]"
              >
                START YOUR GROWTH
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4 4xl:w-5 4xl:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnet>

            <Link
              href="/case-studies"
              className="group flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 xl:px-6 xl:py-3 2xl:px-8 2xl:py-4 4xl:px-12 4xl:py-6 border border-white/20 text-white text-[9px] sm:text-[10px] md:text-[12px] xl:text-[8px] 2xl:text-[10px] 4xl:text-[14px] uppercase font-black tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all duration-500 active:scale-95 min-h-[40px] sm:min-h-[48px] md:min-h-[56px] xl:min-h-[48px] 2xl:min-h-[52px] 4xl:min-h-[64px]"
            >
              VIEW RESULTS
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4 4xl:w-5 4xl:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* 🔥 Floating Elements */}
          <FloatingElement
            duration={7}
            delay={0}
            yRange={[0, -20]}
            xRange={[0, 10]}
            className="absolute top-[20%] left-[10%] hidden md:block"
          >
            <div className="w-32 h-32 border border-white/10 rounded-full blur-sm" />
          </FloatingElement>

          <FloatingElement
            duration={8}
            delay={1}
            yRange={[0, -30]}
            xRange={[0, -15]}
            className="absolute bottom-[20%] right-[10%] hidden md:block"
          >
            <div className="w-48 h-48 border border-white/10 rounded-full blur-md" />
          </FloatingElement>
        </section>

        {/* The Results - Testimonials */}
        <section className="relative py-32 xl:py-15 4xl:py-64 px-6 overflow-hidden">
          <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 4xl:max-w-[2000px] mx-auto w-full">
            <div className="mb-15 4xl:mb-32 flex items-center gap-4">
              <Star className="w-5 h-5 4xl:w-8 4xl:h-8 text-white animate-pulse" />
              <span className="text-[10px] 4xl:text-sm uppercase tracking-[0.6em] font-black text-white/40">Verified Impact</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 4xl:gap-20">
              {results.map((res, i) => (
                <FloatingElement key={i} delay={i * 0.3} yRange={[0, -15]}>
                  <div className="p-8 md:p-12 xl:p-10 4xl:p-24 border border-white/5 bg-neutral-900/40 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3rem] 4xl:rounded-[5rem] h-full group">
                    <div className="text-xl md:text-2xl 2xl:text-5xl 4xl:text-7xl font-black tracking-normal lg:tracking-tighter uppercase italic text-white mb-6 4xl:mb-10">
                      {res.result}
                    </div>
                    <p className="text-gray-400 text-base xl:text-md 4xl:text-3xl leading-relaxed mb-8 4xl:mb-16 font-medium">
                      &quot;{res.quote}&quot;
                    </p>
                    <div className="pt-8 4xl:pt-16 border-t border-white/5">
                      <p className="text-base md:text-lg 2xl:text-xl 4xl:text-[2rem] font-black tracking-tighter uppercase italic">{res.name}</p>
                      <p className="text-[10px] 4xl:text-sm uppercase tracking-[0.4em] text-white/30">{res.role}</p>
                    </div>
                  </div>
                </FloatingElement>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Section - The 7 Steps */}
        <section className="relative xl:py-15 px-4 sm:px-6">
          <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 4xl:max-w-[2000px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start xl:mb-7 md:items-end gap-8">
              <div className="max-w-xl xl:max-w-2xl text-left">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] font-black text-white/30 mb-4 sm:mb-6 block">Our Methodology</span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl 3xl:text-8xl font-black tracking-tighter uppercase italic leading-none">
                  The 7-Step <br /> <span className="text-gray-500">VELOCITY</span>
                </h2>
              </div>
              <p className="text-gray-400 max-w-sm text-xs sm:text-sm uppercase tracking-widest font-bold leading-relaxed mb-0 md:mb-4">
                A proven system built to turn clarity into growth and effort into predictable results.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="relative p-8 sm:p-10 border border-white/5 bg-neutral-900/50 backdrop-blur-xl rounded-xl sm:rounded-2xl group hover:bg-white hover:text-black transition-all duration-700 h720:p-6"
                >

                  {/* 🔥 OUTLINE NUMBER */}
                  <span className="absolute top-2 left-3 text-4xl sm:text-5xl font-black tracking-tighter uppercase italic text-transparent stroke-text">
                    {step.number}
                  </span>
                  {/* Content */}
                  <h3 className="text-xl sm:text-2xl font-black tracking-tighter uppercase italic mb-4 mt-6 sm:mt-8 h720:mt-10">
                    {step.title}
                  </h3>

                  <p className="text-gray-500 group-hover:text-black/60 text-xs sm:text-sm leading-relaxed font-semibold transition-colors">
                    {step.desc}
                  </p>

                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Section - Tiers */}
        <section className="relative py-24 sm:py-32 xl:py-20 px-4 sm:px-6 bg-white text-black overflow-hidden">
          <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 4xl:max-w-[2000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
            <div className="relative">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] font-black text-black/30 mb-6 sm:mb-8 block">Your Investment</span>
              <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-[6rem] xl:text-8xl 2xl:text-9xl 4xl:text-11xl font-black tracking-tighter uppercase italic leading-[0.85] mb-8 sm:mb-12 h720:text-6xl">
                Scale <br className="hidden sm:block" /> Without <br className="hidden sm:sm:block" /> <span className="text-gray-400">Limits</span>
              </h2>
              <p className="text-gray-500 text-base sm:text-lg max-w-md font-semibold italic">
                This is not coaching. This is transformation. Choose how far you want to go.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {tiers.map((tier, i) => (
                <div key={i} className="p-8 sm:p-10 md:p-12 border border-black/5 rounded-[2rem] sm:rounded-[3rem] bg-neutral-50 hover:bg-black hover:text-white transition-all duration-700 group relative overflow-hidden h720:p-8">
                  <div className="absolute top-8 right-8 sm:top-10 sm:right-10">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 opacity-10 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase italic mb-2">{tier.name}</h3>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 mb-6 sm:mb-8">{tier.price}</p>
                  <p className="text-gray-500 group-hover:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base font-medium">{tier.desc}</p>
                  <ul className="space-y-3 sm:space-y-4">
                    {tier.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold opacity-60 group-hover:opacity-100">
                        <CheckCircle className="w-4 h-4" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Signature Section */}
        <section className="relative py-15 px-6 bg-[#050505] overflow-hidden">
          <div className="max-w-[1500px] mx-auto text-center">
            <div>
              <h2 className="text-6xl md:text-8xl 2xl:text-[8rem] 3xl:text-[10rem] font-black italic mb-12 [word-spacing:0.1em]">
                &quot;नाम नहीं, <br />
                <span className="text-gray-500">मिसाल बनो।&quot;</span>
              </h2>
            </div>
            <div className="h-[2px] w-32 bg-white/20 mx-auto mb-12" />
            <p className="text-lg md:text-xl text-white/40 uppercase tracking-[0.5em] font-black">
              Don&apos;t chase fame, become an example.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-24 sm:py-32 xl:py-15 px-4 sm:px-6">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-16 md:mb-24">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-black text-white/30 mb-4 block">Clearing the Path</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase italic">Frequently <span className="text-gray-500">Asked</span></h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-xl">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-6 sm:p-8 md:p-10 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter uppercase italic pr-4">{faq.q}</span>
                    {openFaq === i ? <Minus className="w-5 h-5 sm:w-6 sm:h-6" /> : <Plus className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
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
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter / Lead Magnet */}
        <section className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
          <div className="max-w-[1200px] mx-auto p-10 xl:p-10 2xl:p-24 border border-white/10 rounded-[2.5rem] sm:rounded-[4rem] bg-gradient-to-b from-neutral-900 to-black text-center group">
            <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-white mb-8 sm:mb-10 mx-auto animate-pulse" />
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-tighter uppercase italic mb-6 sm:mb-8 leading-tight">
              FROM CONFUSION <br /> <span className="text-gray-500">TO CONTROL</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-10 md:mb-12 font-medium max-w-lg mx-auto">
              A simple system to bring clarity, direction, and real growth in your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://cal.id/bhadrik-panchal-business-coach"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 sm:px-10 py-5 bg-white text-black font-black uppercase tracking-wide rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all active:scale-95 inline-block text-[10px] sm:text-[12px] min-h-[56px] flex items-center justify-center"
              >
                START YOUR GROWTH
              </a>
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 sm:px-10 py-5 border border-white/20 text-white font-black uppercase tracking-wide rounded-full hover:bg-white hover:text-black transition-all active:scale-95 inline-block text-[10px] sm:text-[12px] min-h-[56px] flex items-center justify-center"
              >
                VIEW SYSTEM →
              </Link>
            </div>
          </div>
        </section>

        {/* 🚀 NEW IMPACT SECTION */}
        <section className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 overflow-hidden">
          <div className="max-w-[1200px] mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter uppercase italic mb-8 sm:mb-10 leading-none"
            >
              Build Systems <br />
              <span className="text-gray-500">Not Stress</span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg mb-12 sm:mb-16"
            >
              Most businesses stay stuck because they rely on effort. Real growth comes from systems, not struggle.
            </motion.p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

              {[
                {
                  title: "Automation First",
                  desc: "Stop doing everything manually. Build systems that bring leads, follow-ups, and growth automatically."
                },
                {
                  title: "Predictable Growth",
                  desc: "No more guessing. Clear strategy, structured execution, and consistent results you can rely on."
                },
                {
                  title: "High Profit Systems",
                  desc: "Not just revenue — build systems that improve margins, control, and long-term stability."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  className="p-8 sm:p-10 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white hover:text-black transition-all duration-700 group md:min-h-[220px] flex flex-col justify-center"
                >
                  <h3 className="text-xl sm:text-2xl font-black uppercase italic mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 group-hover:text-black/70 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}

            </div>
          </div>

          {/* Floating Glow Effect */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-white/5 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
        </section>

        <Footer />
      </ScrollyCanvas>
    </main>
  );
}
