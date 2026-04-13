"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";

const STAGES = ["Starter", "Growing", "Scaling", "7-Figure+"] as const;
type Stage = typeof STAGES[number] | null;

const contactInfo = [
    { label: "General Inquiries", value: "hello@bhadrikpanchal.com" },
    { label: "Support & Systems", value: "support@bhadrikpanchal.com" },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "", phone: "" });
    const [stage, setStage] = useState<Stage>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = "Required";
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            e.email = "Invalid email";
        if (!form.message.trim()) e.message = "Required";
        if (!form.phone.trim()) e.phone = "Required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus("loading");

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    access_key: "689939a2-ada8-4503-ad05-874fd136ef83", // 🔥 yaha apni key daal

                    name: form.name,
                    email: form.email,
                    stage: stage || "Not selected",
                    phone: form.phone,
                    message: form.message,

                    subject: "New Lead - Bhadrik Panchal 🚀",
                    from_name: "Bhadrik Panchal Website"
                }),
            });

            const data = await res.json();

            if (data.success) {
                setStatus("success");
                setForm({ name: "", email: "", message: "", phone: "" });
                setStage(null);
            } else {
                setStatus("idle");
            }

        } catch {
            setStatus("idle");
        }

        setTimeout(() => setStatus("idle"), 5000);
    };

    return (
        <main className="bg-[#080808] min-h-screen text-white overflow-hidden">

            {/* ── HERO SPLIT ── */}
            <SectionWrapper className="pt-28 md:pt-36 pb-0">
                <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-12 xl:gap-20 items-start pb-20 xl:pb-28">

                    {/* LEFT */}
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-bold mb-7 block"
                        >
                            The Commitment
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] xl:text-[7.5rem] 2xl:text-[9rem]
                         font-black uppercase tracking-tighter leading-[0.9] italic mb-8 xl:mb-10"
                        >
                            Let&apos;s<br />Scale.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-[11px] uppercase tracking-[0.2em] text-white/35 leading-relaxed
                         max-w-sm mb-12 xl:mb-16 font-medium"
                        >
                            This is for founders who are done playing small. We build scalable
                            systems and unstoppable leaders.
                        </motion.p>

                        {/* Contact items — fixed hover */}
                        <div className="flex flex-col gap-3">
                            {contactInfo.map((info, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="group relative pl-6 py-5 cursor-default overflow-hidden"
                                >
                                    {/* animated left border line */}
                                    <span className="absolute left-0 top-0 w-px h-full bg-white/10
                                   before:content-[''] before:absolute before:left-0 before:bottom-0
                                   before:w-full before:h-0 before:bg-white
                                   group-hover:before:h-full before:transition-all before:duration-500 before:ease-out" />

                                    <p className="text-[8px] uppercase tracking-[0.45em] text-white/25 font-bold mb-2.5">
                                        {info.label}
                                    </p>
                                    {/* ✅ FIX: use <a> so email is a real link, no translateX overflow bug */}
                                    <a
                                        href={`mailto:${info.value}`}
                                        className="text-base md:text-xl font-black tracking-tight text-white/60
                                    group-hover:text-white transition-colors duration-300
                                    group-hover:pl-2 transition-all duration-400 block lowercase"
                                    >
                                        {info.value}
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — FORM CARD */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="relative"
                    >
                        {/* Card highlight ring on focus-within */}
                        <div className="relative rounded-[2rem] border border-white/10
                            focus-within:border-white/25 transition-colors duration-500
                            bg-white/[0.03] backdrop-blur-2xl overflow-hidden">

                            {/* Top accent line */}
                            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                            <div className="p-8 md:p-12 xl:p-14">
                                <AnimatePresence mode="wait">
                                    {status === "success" ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center justify-center text-center py-14"
                                        >
                                            <div className="w-14 h-14 rounded-full border border-white/20 flex items-center
                                      justify-center mb-6">
                                                <CheckCircle2 className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-3">
                                                Transmission Received.
                                            </h3>
                                            <p className="text-[9px] uppercase tracking-[0.4em] text-white/30">
                                                A strategist will review your application within 24 hours.
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="form"
                                            onSubmit={handleSubmit}
                                            className="flex flex-col gap-8 xl:gap-9"
                                        >
                                            {/* Name */}
                                            <div>
                                                <div className="flex justify-between items-center mb-2.5">
                                                    <label className="text-[8px] uppercase tracking-[0.45em] text-white/25 font-bold">
                                                        The Name
                                                    </label>
                                                    {errors.name && (
                                                        <span className="text-[8px] uppercase tracking-widest text-red-500 font-bold">
                                                            {errors.name}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="relative after:content-[''] after:absolute after:bottom-0 after:left-0
                                        after:w-0 after:h-px after:bg-white focus-within:after:w-full
                                        after:transition-all after:duration-500">
                                                    <input
                                                        value={form.name}
                                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                                        placeholder="Your name"
                                                        className={`w-full bg-transparent py-4 text-white text-[11px] font-bold
                                       tracking-[0.2em] uppercase outline-none border-b placeholder:text-white/15
                                       transition-colors duration-300
                                       ${errors.name ? "border-red-500/40" : "border-white/[0.08] focus:border-white/15"}`}
                                                    />
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <div className="flex justify-between items-center mb-2.5">
                                                    <label className="text-[8px] uppercase tracking-[0.45em] text-white/25 font-bold">
                                                        The Email
                                                    </label>
                                                    {errors.email && (
                                                        <span className="text-[8px] uppercase tracking-widest text-red-500 font-bold">
                                                            {errors.email}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="relative after:content-[''] after:absolute after:bottom-0 after:left-0
                                        after:w-0 after:h-px after:bg-white focus-within:after:w-full
                                        after:transition-all after:duration-500">
                                                    <input
                                                        type="email"
                                                        value={form.email}
                                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                                        placeholder="your@email.com"
                                                        className={`w-full bg-transparent py-4 text-white text-[11px] font-bold
                                       tracking-[0.2em] lowercase outline-none border-b placeholder:text-white/15
                                       transition-colors duration-300
                                       ${errors.email ? "border-red-500/40" : "border-white/[0.08] focus:border-white/15"}`}
                                                    />
                                                </div>
                                            </div>
                                            {/* Phone */}
                                            <div>
                                                <div className="flex justify-between items-center mb-2.5">
                                                    <label className="text-[8px] uppercase tracking-[0.45em] text-white/25 font-bold">
                                                        Contact Number
                                                    </label>
                                                </div>

                                                <div className="relative after:content-[''] after:absolute after:bottom-0 after:left-0
    after:w-0 after:h-px after:bg-white focus-within:after:w-full
    after:transition-all after:duration-500">

                                                    <input
                                                        type="tel"
                                                        value={form.phone}
                                                        onChange={e => setForm({ ...form, phone: e.target.value })}
                                                        placeholder="Your phone number"
                                                        className="w-full bg-transparent py-4 text-white text-[11px] font-bold
      tracking-[0.2em] outline-none border-b placeholder:text-white/15
      transition-colors duration-300 border-white/[0.08] focus:border-white/15"
                                                    />

                                                </div>
                                            </div>
                                            {/* Stage — pill selector instead of dropdown */}
                                            <div>
                                                <label className="text-[8px] uppercase tracking-[0.45em] text-white/25 font-bold mb-3 block">
                                                    Business Stage
                                                </label>
                                                <div className="flex flex-wrap gap-2">
                                                    {STAGES.map(s => (
                                                        <button
                                                            key={s}
                                                            type="button"
                                                            onClick={() => setStage(s)}
                                                            className={`px-4 py-2 rounded-full border text-[8px] font-bold
                                         tracking-[0.3em] uppercase transition-all duration-250
                                         ${stage === s
                                                                    ? "bg-white text-black border-white"
                                                                    : "border-white/10 text-white/30 hover:border-white/30 hover:text-white/60"
                                                                }`}
                                                        >
                                                            {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Message */}
                                            <div>
                                                <div className="flex justify-between items-center mb-2.5">
                                                    <label className="text-[8px] uppercase tracking-[0.45em] text-white/25 font-bold">
                                                        Main Challenge
                                                    </label>
                                                    {errors.message && (
                                                        <span className="text-[8px] uppercase tracking-widest text-red-500 font-bold">
                                                            {errors.message}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="relative after:content-[''] after:absolute after:bottom-0 after:left-0
                                        after:w-0 after:h-px after:bg-white focus-within:after:w-full
                                        after:transition-all after:duration-500">
                                                    <textarea
                                                        rows={3}
                                                        value={form.message}
                                                        onChange={e => setForm({ ...form, message: e.target.value })}
                                                        placeholder="What is your biggest bottleneck right now?"
                                                        className={`w-full bg-transparent py-4 text-white text-[11px] font-bold
                                       tracking-[0.15em] uppercase outline-none border-b resize-none
                                       placeholder:text-white/15 transition-colors duration-300
                                       ${errors.message ? "border-red-500/40" : "border-white/[0.08] focus:border-white/15"}`}
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={status === "loading"}
                                                className="w-full bg-white text-black rounded-full py-4 xl:py-5 text-[10px]
                                   font-black uppercase tracking-[0.45em] flex items-center justify-center
                                   gap-3 hover:scale-[1.02] active:scale-[0.98] transition-transform
                                   duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                                            >
                                                {status === "loading" ? (
                                                    <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                                                ) : (
                                                    "Request Strategy Call"
                                                )}
                                            </button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </SectionWrapper>

            {/* ── TRUST STRIP ── */}
            <div className="border-y border-white/5 py-12">
                <div className="mx-auto px-10">
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-gray-500 font-bold text-center">
                        Trusted by 1000+ Entrepreneurs <span className="mx-8 opacity-20">|</span> 15+ Years Experience <span className="mx-8 opacity-20">|</span> Built 7-Figure Systems
                    </p>
                </div>
            </div>

            {/* ── FINAL CTA ── */}
            <section className="bg-white text-black py-28 md:py-40 xl:py-52 text-center relative overflow-hidden px-6">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span className="text-[18vw] font-black italic opacity-[0.06] tracking-tighter leading-none">
                        DECIDE.
                    </span>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.94 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] xl:text-[7rem] 2xl:text-[8.5rem]
                       font-black uppercase tracking-tighter leading-[0.88] italic mb-12 xl:mb-16"
                    >
                        Your Next Level<br />Requires a Decision.
                    </motion.h2>
                    <a
                        href="https://cal.id/bhadrik-panchal-business-coach"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-black text-white px-10 py-5 xl:px-12 xl:py-6
            rounded-full text-[10px] font-black uppercase tracking-[0.45em]
            hover:scale-105 active:scale-95 transition-transform duration-200"
                    >
                        Book Your Call
                    </a>
                </div>
            </section >
        </main >
    );
}