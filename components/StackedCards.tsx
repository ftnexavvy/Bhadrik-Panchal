"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpRight, X, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";


gsap.registerPlugin(ScrollTrigger);

interface Case {
    client: string;
    sector: string;
    result: string;
    before: string;
    after: string;
    timeline: string;
    story: string;
    process: string[];
    image?: string;
}

const PALETTES = [
    ["#f4f4f4", "#ececec", "#f9f9f9"],
    ["#f6f6f6", "#efefef", "#fafafa"],
    ["#f3f3f3", "#ededed", "#f8f8f8"],
    ["#f5f5f5", "#ebebeb", "#f7f7f7"],
    ["#f4f4f4", "#f0f0f0", "#fafafa"],
    ["#f6f6f6", "#eeeeee", "#f9f9f9"],
];

export default function StackedCards({ cases }: { cases: Case[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIdx, setActiveIdx] = useState(0);
    const [hoveredIdx, setHoveredIdx] = useState(-1);
    const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
    const [hintVisible, setHintVisible] = useState(true); // onboarding hint
    const [hintDismissed, setHintDismissed] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const mouse = useRef({ x: 0, y: 0, cx: 0, cy: 0 });
    const [isMobileView, setIsMobileView] = useState(false);
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth <= 1024);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const N = cases.length;
    const DIAG_X = 130;
    const DIAG_Y = -75;
    const DIAG_Z = -50;

    // Auto-hide hint after 4s
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hintDismissed) setHintVisible(false);
        }, 4000);
        return () => clearTimeout(timer);
    }, [hintDismissed]);



    useEffect(() => {
        if (expandedIdx !== null) {
            document.body.style.overflow = "hidden";
            lenisRef.current?.stop();
        } else {
            document.body.style.overflow = "";
            lenisRef.current?.start();
        }
        return () => { document.body.style.overflow = ""; };
    }, [expandedIdx]);

    useEffect(() => {
        const mm = gsap.matchMedia();
        const lenis = new Lenis({ lerp: 0.08 });
        lenisRef.current = lenis;

        function lenisRaf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(lenisRaf);
        }
        requestAnimationFrame(lenisRaf);

        const cardEls = cardRefs.current.filter(Boolean) as HTMLDivElement[];

        mm.add({
            isDesktop: "(min-width: 1025px)",
            isMobile: "(max-width: 1024px)"
        }, (context) => {
            const conditions = context.conditions as { isMobile: boolean; isDesktop: boolean };
            const isMobile = conditions.isMobile;
            const activeDiagX = isMobile ? 5 : DIAG_X;
            const activeDiagY = isMobile ? -60 : DIAG_Y;
            const activeDiagZ = isMobile ? -40 : DIAG_Z;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${N * (isMobile ? 80 : 110)}vh`,
                    scrub: 1.2,
                    pin: stickyRef.current,
                    pinSpacing: true,
                    onUpdate: (self) => {
                        const idx = Math.min(N - 1, Math.floor(self.progress * N));
                        setActiveIdx(idx);
                    },
                },
            });

            cardEls.forEach((card, i) => {
                const diag = i / (N - 1);
                const xTarget = (diag - 0.5) * activeDiagX * 2;
                const yTarget = (diag - 0.5) * activeDiagY * 2;
                const zTarget = i * activeDiagZ;

                tl.fromTo(
                    card,
                    {
                        y: isMobile ? 250 : 380,
                        x: xTarget * 0.3,
                        z: zTarget - (isMobile ? 80 : 150),
                        scale: isMobile ? 0.9 : 0.84,
                        opacity: 0,
                        rotateX: 18
                    },
                    {
                        y: yTarget,
                        x: xTarget,
                        z: zTarget,
                        scale: 1 - i * (isMobile ? 0.015 : 0.02),
                        opacity: 1,
                        rotateX: 0,
                        ease: "power2.out"
                    },
                    i * 0.55
                );
            });
        });

        const scene = stickyRef.current;
        const handleMouseMove = (e: MouseEvent) => {
            if (!scene) return;
            const rect = scene.getBoundingClientRect();
            mouse.current.x = e.clientX - rect.left;
            mouse.current.y = e.clientY - rect.top;
        };
        scene?.addEventListener("mousemove", handleMouseMove);

        function animCursor() {
            const m = mouse.current;
            m.cx += (m.x - m.cx) * 0.14;
            m.cy += (m.y - m.cy) * 0.14;
            if (cursorRef.current) {
                cursorRef.current.style.left = m.cx + "px";
                cursorRef.current.style.top = m.cy + "px";
            }
            if (stageRef.current && scene) {
                const mx = m.x / (scene.offsetWidth || 1) - 0.5;
                const my = m.y / (scene.offsetHeight || 1) - 0.5;

                // Adjust perspective/rotation for mobile
                const isMobile = window.innerWidth <= 1024;
                const baseRotX = isMobile ? 15 : 28;
                const baseRotY = isMobile ? -8 : -18;
                const baseRotZ = isMobile ? 3 : 6;

                stageRef.current.style.transform =
                    `translate(-50%, -50%) rotateX(${baseRotX + my * -8}deg) rotateY(${baseRotY + mx * 12}deg) rotateZ(${baseRotZ}deg)`;
            }
            rafRef.current = requestAnimationFrame(animCursor);
        }
        animCursor();

        return () => {
            mm.revert();
            lenis.destroy();
            cancelAnimationFrame(rafRef.current);
            scene?.removeEventListener("mousemove", handleMouseMove);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [N, DIAG_X, DIAG_Y, DIAG_Z]);

    const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, i: number) => {
        const el = cardRefs.current[i];
        if (!el || expandedIdx !== null) return;
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        const diag = i / (N - 1);
        const xBase = (diag - 0.5) * DIAG_X * 2;
        const yBase = (diag - 0.5) * DIAG_Y * 2;
        const zBase = i * DIAG_Z;

        gsap.to(el, {
            rotateX: -dy * 12,
            rotateY: dx * 12,
            z: zBase + 90,
            x: xBase,
            y: yBase - 10,
            boxShadow: `${-dx * 30}px ${-dy * 30}px 80px rgba(0,0,0,0.45), 0 60px 120px rgba(0,0,0,0.35)`,
            duration: 0.18,
            ease: "power2.out",
            overwrite: "auto",
        });
    }, [N, DIAG_X, DIAG_Y, DIAG_Z, expandedIdx]);

    const handleCardMouseLeave = useCallback((i: number) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const diag = i / (N - 1);
        const xBase = (diag - 0.5) * DIAG_X * 2;
        const yBase = (diag - 0.5) * DIAG_Y * 2;
        const zBase = i * DIAG_Z;

        gsap.to(el, {
            rotateX: 0,
            rotateY: 0,
            z: zBase,
            x: xBase,
            y: yBase,
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            duration: 0.8,
            ease: "expo.out",
            overwrite: "auto",
        });
        setHoveredIdx(-1);
    }, [N, DIAG_X, DIAG_Y, DIAG_Z]);

    const data = expandedIdx !== null ? cases[expandedIdx] : null;

    return (
        <>
            <div ref={containerRef} className="relative">
                <div
                    ref={stickyRef}
                    className="sticky top-0 w-full overflow-visible"
                    style={{ height: "100dvh", cursor: "none" }}
                >
                    {/* Custom cursor */}
                    <div
                        ref={cursorRef}
                        className="pointer-events-none absolute z-[999] rounded-full"
                        style={{
                            width: hoveredIdx >= 0 ? 48 : 7,
                            height: hoveredIdx >= 0 ? 48 : 7,
                            background: hoveredIdx >= 0 ? "rgba(255,255,255,0.07)" : "#f0ede6",
                            border: hoveredIdx >= 0 ? "1px solid rgba(255,255,255,0.3)" : "none",
                            transform: "translate(-50%,-50%)",
                            mixBlendMode: "difference",
                            transition: "width 0.3s, height 0.3s, background 0.3s, opacity 0.2s",
                            opacity: expandedIdx !== null ? 0 : 1,
                        }}
                    />

                    {/* ── ONBOARDING HINT ── appears on load, fades out after 4s or on first hover */}
                    <AnimatePresence>
                        {hintVisible && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute bottom-16 left-1/2 z-50 pointer-events-none"
                                style={{ transform: "translateX(-50%)" }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        background: "rgba(255,255,255,0.07)",
                                        border: "1px solid rgba(255,255,255,0.14)",
                                        borderRadius: 100,
                                        padding: "8px 18px",
                                        backdropFilter: "blur(10px)",
                                    }}
                                >
                                    {/* animated click icon */}
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                                        <circle cx="7" cy="7" r="2" fill="rgba(255,255,255,0.7)" />
                                    </svg>
                                    <span style={{
                                        fontSize: 11, letterSpacing: "0.18em",
                                        textTransform: "uppercase", color: "rgba(255,255,255,0.55)",
                                    }} className="font-dm">
                                        Hover &amp; click any card to explore
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 3D Stage */}
                    <div style={{ perspective: "1400px", width: "100%", height: "100%" }}>
                        <div
                            ref={stageRef}
                            className="absolute top-[32%] left-1/2"
                            style={{
                                transformStyle: "preserve-3d",
                                transform: "translate(-50%,-50%) rotateX(28deg) rotateY(-18deg) rotateZ(6deg)",
                                transition: "transform 1.4s cubic-bezier(.16,1,.3,1)",
                            }}
                        >
                            {cases.map((c, i) => {
                                const diag = i / (N - 1);
                                const xOff = (diag - 0.5) * DIAG_X * 2;
                                const yOff = (diag - 0.5) * DIAG_Y * 2;
                                const zOff = i * DIAG_Z;
                                const isHov = hoveredIdx === i;

                                return (
                                    <div
                                        key={i}
                                        ref={el => { cardRefs.current[i] = el; }}
                                        className="absolute"
                                        style={{
                                            width: isMobileView ? "clamp(140px, 70vw, 290px)" : "clamp(180px, 45vw, 290px)",
                                            height: isMobileView ? "clamp(200px, 100vw, 400px)" : "clamp(260px, 60vw, 400px)",
                                            left: isMobileView ? "50%" : `calc(50% + ${xOff}px - 145px)`,
                                            top: isMobileView ? "50%" : `calc(50% + ${yOff}px - 200px)`,
                                            marginLeft: isMobileView ? "-35vw" : "0",
                                            marginTop: isMobileView ? "-50vw" : "0",
                                            zIndex: N - i + (isHov ? 20 : 0),
                                            transformStyle: "preserve-3d",
                                            transform: `translateZ(${zOff}px) scale(${1 - i * 0.02})`,
                                            borderRadius: 8,
                                            overflow: "hidden",
                                            opacity: 0,
                                            border: isHov
                                                ? "1px solid rgba(255,255,255,0.14)"
                                                : "1px solid rgba(255,255,255,0.05)",
                                            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                                            transition: "border-color 0.4s",
                                            cursor: "none",
                                        }}
                                        onMouseEnter={() => {
                                            setHoveredIdx(i);
                                            if (!hintDismissed) {
                                                setHintVisible(false);
                                                setHintDismissed(true);
                                            }
                                        }}
                                        onMouseMove={e => handleCardMouseMove(e, i)}
                                        onMouseLeave={() => handleCardMouseLeave(i)}
                                        onClick={() => setExpandedIdx(i)}
                                    >
                                        {/* Card base with Image */}
                                        {c.image ? (
                                            <Image
                                                src={c.image}
                                                alt={c.client}
                                                fill
                                                loading="lazy"
                                                sizes="(max-width: 1024px) 70vw, 290px"
                                                className="absolute inset-0 h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-[#f5f5f4]" />
                                        )}

                                        {/* SVG texture overlay (reduced opacity for image context) */}
                                        <svg
                                            className={`absolute inset-0 w-full h-full ${c.image ? 'opacity-20' : 'opacity-100'}`}
                                            viewBox="0 0 290 400"
                                            preserveAspectRatio="xMidYMid slice"
                                        >
                                            {PALETTES[i % 6].map((col, j) => (
                                                <rect key={j} x={`${j * 34}%`} y="0" width="35%" height="100%" fill={c.image ? 'transparent' : col} />
                                            ))}
                                            <circle cx="84%" cy="16%" r="28%" fill="none" stroke={c.image ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.045)"} strokeWidth="0.8" />
                                            <circle cx="84%" cy="16%" r="15%" fill={c.image ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.025)"} />
                                            <path d="M 258 10 L 280 10 L 280 34" fill="none" stroke={c.image ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} strokeWidth="0.7" />
                                        </svg>

                                        {/* Gradient veil */}
                                        <div
                                            className="absolute inset-0 z-10"
                                            style={{
                                                background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)",
                                                opacity: isHov ? 1 : 0.88,
                                                transition: "opacity 0.45s",
                                            }}
                                        />

                                        {/* Index number */}
                                        <span className="absolute top-[14px] left-[14px] z-20 font-dm" style={{
                                            fontSize: 9, letterSpacing: "0.2em",
                                            textTransform: "uppercase", color: "rgba(0,0,0,0.28)",
                                        }}>
                                            0{i + 1}
                                        </span>

                                        {/* Timeline — visible on hover */}
                                        <span className="absolute top-[14px] right-[12px] z-20 font-dm" style={{
                                            fontSize: 9, letterSpacing: "0.16em",
                                            color: isHov ? (c.image ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)") : "transparent",
                                            opacity: isHov ? 1 : 0,
                                            transition: "opacity 0.35s",
                                        }}>
                                            {c.timeline}
                                        </span>

                                        {/* ── "VIEW CASE" CTA PILL — appears on hover ── */}
                                        <div
                                            className="absolute z-30"
                                            style={{
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                opacity: isHov ? 1 : 0,
                                                transition: "opacity 0.3s, transform 0.3s cubic-bezier(.16,1,.3,1)",
                                                pointerEvents: "none",
                                                // subtle lift when hovered
                                                ...(isHov ? {} : { transform: "translate(-50%, -44%)" }),
                                            }}
                                        >
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6,
                                                background: "rgba(255,255,255,0.12)",
                                                border: "1px solid rgba(255,255,255,0.28)",
                                                borderRadius: 100,
                                                padding: "7px 16px",
                                                backdropFilter: "blur(8px)",
                                                whiteSpace: "nowrap",
                                            }}>
                                                <span style={{
                                                    fontSize: 9,
                                                    letterSpacing: "0.22em",
                                                    textTransform: "uppercase",
                                                    color: "rgba(255,255,255,0.9)",
                                                }} className="font-dm">
                                                    View Case
                                                </span>
                                                <ArrowUpRight size={10} color="rgba(255,255,255,0.8)" />
                                            </div>
                                        </div>

                                        {/* Info panel bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                                            <span style={{
                                                fontSize: 8, letterSpacing: "0.22em",
                                                textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
                                                display: "block", marginBottom: 4,
                                            }} className="font-dm">
                                                {c.sector}
                                            </span>
                                            <div style={{
                                                fontSize: 19, fontWeight: 300, fontStyle: "italic",
                                                color: "#ffffff", lineHeight: 1.1,
                                            }} className="font-sans">
                                                {c.client}
                                            </div>
                                            <div className="flex justify-between items-center mt-3">
                                                <span style={{
                                                    fontSize: 8, letterSpacing: "0.14em",
                                                    textTransform: "uppercase", color: "rgba(255,255,255,0.42)",
                                                }} className="font-dm">
                                                    {c.result}
                                                </span>
                                                {/* Small animated arrow on hover */}
                                                <ChevronRight
                                                    size={10}
                                                    color="rgba(255,255,255,0.45)"
                                                    style={{
                                                        transform: isHov ? "translateX(3px)" : "translateX(0)",
                                                        transition: "transform 0.3s",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Dot nav */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-[7px]">
                        {cases.map((_, i) => (
                            <div key={i} style={{
                                width: activeIdx === i ? 6 : 4,
                                height: activeIdx === i ? 6 : 4,
                                borderRadius: "50%",
                                background: activeIdx === i ? "#ffffff" : "rgba(255,255,255,0.22)",
                                transform: activeIdx === i ? "scale(1.35)" : "scale(1)",
                                transition: "all 0.3s",
                            }} />
                        ))}
                    </div>

                    {/* Counter */}
                    <div className="absolute bottom-0 left-0 right-0 z-50 flex px-8 py-6 pointer-events-none">
                        <span style={{
                            fontSize: 11, letterSpacing: "0.14em", color: "rgba(255,255,255,0.28)",
                        }} className="font-sans">
                            {String(activeIdx + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                        </span>
                    </div>
                </div>
            </div>

            {/* ── EXPANDED MODAL ── */}
            <AnimatePresence>
                {expandedIdx !== null && data && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
                        style={{ background: "rgba(6,6,5,0.92)", backdropFilter: "blur(22px)", cursor: "auto" }}
                        onClick={() => setExpandedIdx(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.86, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 28, opacity: 0 }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-[900px] rounded-[3px] overflow-visible"
                            style={{
                                background: "#ffffff",
                                border: "1px solid rgba(0,0,0,0.08)",
                                boxShadow: "0 80px 220px rgba(0,0,0,0.85)",
                                maxHeight: "90vh", overflowY: "auto",
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid slice">
                                {PALETTES[expandedIdx % 6].map((col, j) => (
                                    <rect key={j} x={`${j * 34}%`} y="0" width="35%" height="100%" fill={col} />
                                ))}
                                <circle cx="80%" cy="12%" r="26%" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                                <circle cx="80%" cy="12%" r="14%" fill="rgba(0,0,0,0.025)" />
                                <path d="M 842 18 L 878 18 L 878 58" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                            </svg>

                            <button
                                onClick={() => setExpandedIdx(null)}
                                className="absolute top-6 right-6 z-20 flex items-center justify-center rounded-full"
                                style={{
                                    width: 36, height: 36,
                                    background: "rgba(0,0,0,0.05)",
                                    border: "1px solid rgba(0,0,0,0.12)",
                                    cursor: "pointer", transition: "background 0.3s",
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.12)")}
                                onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")}
                            >
                                <X size={14} color="#0a0a0a" />
                            </button>

                            <div className="relative z-10 p-8 sm:p-10 md:p-14">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 sm:gap-6 mb-8 md:mb-10">
                                    <div>
                                        <span style={{
                                            fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase",
                                            color: "rgba(0,0,0,0.38)",
                                            display: "block", marginBottom: 12,
                                        }} className="font-dm">
                                            Case Study // 0{expandedIdx + 1}
                                        </span>
                                        <h2 style={{
                                            fontSize: "clamp(32px, 8vw, 68px)",
                                            fontWeight: 900, fontStyle: "italic",
                                            color: "#0a0a0a", lineHeight: 0.95, margin: 0,
                                        }} className="font-sans uppercase">
                                            {data.client}
                                        </h2>
                                        <p style={{
                                            fontSize: 9, letterSpacing: "0.42em",
                                            textTransform: "uppercase", color: "rgba(0,0,0,0.42)",
                                            marginTop: 8,
                                        }} className="font-dm">
                                            {data.sector}
                                        </p>
                                    </div>
                                    <div className="md:text-right border-t border-black/5 md:border-0 pt-6 md:pt-0">
                                        <span style={{
                                            fontSize: 8, letterSpacing: "0.5em", textTransform: "uppercase",
                                            color: "rgba(0,0,0,0.38)",
                                            display: "block", marginBottom: 6,
                                        }} className="font-dm">
                                            Result
                                        </span>
                                        <div style={{
                                            fontSize: "clamp(24px, 5vw, 38px)",
                                            fontWeight: 900, fontStyle: "italic", color: "#0a0a0a",
                                        }} className="font-sans uppercase">
                                            {data.result}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ height: 1, background: "rgba(0,0,0,0.08)", marginBottom: 32 }} />

                                <div className="grid md:grid-cols-2 gap-10 items-start">
                                    <div>
                                        <p style={{
                                            fontSize: "clamp(15px, 1.7vw, 19px)",
                                            fontStyle: "italic", fontWeight: 400,
                                            color: "rgba(0,0,0,0.62)", lineHeight: 1.7,
                                        }} className="font-sans">
                                            &quot;{data.story}&quot;
                                        </p>
                                        <div className="flex gap-2 flex-wrap mt-7">
                                            {data.process.map((p, pi) => (
                                                <span key={pi} style={{
                                                    fontSize: 9, letterSpacing: "0.22em",
                                                    textTransform: "uppercase", color: "rgba(0,0,0,0.48)",
                                                    border: "1px solid rgba(0,0,0,0.1)",
                                                    padding: "5px 13px", borderRadius: 2,
                                                }} className="font-dm">
                                                    {p}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div style={{
                                                background: "rgba(0,0,0,0.04)",
                                                border: "1px solid rgba(0,0,0,0.08)",
                                                padding: "20px 18px", borderRadius: 3,
                                            }}>
                                                <span style={{
                                                    fontSize: 8, letterSpacing: "0.32em", textTransform: "uppercase",
                                                    color: "rgba(0,0,0,0.32)", display: "block", marginBottom: 9,
                                                }} className="font-dm">Before</span>
                                                <p style={{
                                                    fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
                                                    color: "rgba(0,0,0,0.55)", lineHeight: 1.5,
                                                }} className="font-dm">
                                                    {data.before}
                                                </p>
                                            </div>
                                            <div style={{ background: "#0a0a0a", padding: "20px 18px", borderRadius: 3 }}>
                                                <span style={{
                                                    fontSize: 8, letterSpacing: "0.32em", textTransform: "uppercase",
                                                    color: "rgba(255,255,255,0.38)", display: "block", marginBottom: 9,
                                                }} className="font-dm">After</span>
                                                <p style={{
                                                    fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
                                                    color: "rgba(255,255,255,0.82)", lineHeight: 1.5,
                                                }} className="font-dm">
                                                    {data.after}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center" style={{
                                            borderTop: "1px solid rgba(0,0,0,0.07)",
                                            paddingTop: 18, marginTop: 6,
                                        }}>
                                            <div>
                                                <span style={{
                                                    fontSize: 8, letterSpacing: "0.32em", textTransform: "uppercase",
                                                    color: "rgba(0,0,0,0.32)", display: "block",
                                                }} className="font-dm">Timeline</span>
                                                <span style={{
                                                    fontSize: 22, fontStyle: "italic", fontWeight: 700, color: "#0a0a0a",
                                                }} className="font-sans">
                                                    {data.timeline}
                                                </span>
                                            </div>
                                            <button
                                                style={{
                                                    display: "flex", alignItems: "center", gap: 8,
                                                    fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase",
                                                    color: "rgba(0,0,0,0.5)",
                                                    background: "none", border: "1px solid rgba(0,0,0,0.15)",
                                                    padding: "10px 18px", borderRadius: 2, cursor: "pointer",
                                                    transition: "all 0.3s",
                                                }}
                                                className="font-dm"
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.background = "#0a0a0a";
                                                    e.currentTarget.style.color = "#ffffff";
                                                    e.currentTarget.style.borderColor = "#0a0a0a";
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.background = "none";
                                                    e.currentTarget.style.color = "rgba(0,0,0,0.5)";
                                                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)";
                                                }}
                                            >
                                                Full Case <ArrowUpRight size={11} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
