"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Custom high-fidelity brand icons
const InstagramIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
);

const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" />
    </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const GoogleIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09zM12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23zM5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84zM12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Services", href: "/services" },
    { name: "Insights", href: "/insights" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Entrepreneur", href: "/entrepreneur" },
    { name: "Business Coach", href: "/business-coach" },
    { name: "Motivational Speaker", href: "/motivational-speaker" },
];

const offerings = [
    "Inner Circle",
    "Keynote Speaking",
    "Growth & Gap Audit",
    "Business Workshops",
    "Strategic 1:1 Mastery",
];

const socialLinks = [
    { icon: <GoogleIcon className="w-4 h-4" />, href: "https://maps.app.goo.gl/9yxjdLKcRqmfL76T9", label: "Google" },
    { icon: <InstagramIcon className="w-5 h-5" />, href: "https://www.instagram.com/bhadrikpanchal/", label: "Instagram" },
    { icon: <FacebookIcon className="w-5 h-5" />, href: "https://facebook.com/panchalbhadrik", label: "Facebook" },
    { icon: <XIcon className="w-4 h-4" />, href: "https://x.com/panchalbhadrik", label: "X" },
    { icon: <LinkedinIcon className="w-5 h-5" />, href: "https://www.linkedin.com/in/panchalbhadrik/", label: "LinkedIn" },
    { icon: <YoutubeIcon className="w-5 h-5" />, href: "https://www.youtube.com/@bhadrikpanchal", label: "YouTube" },

];

const footerPaths = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5} -${189 + i * 6}C-${380 - i * 5} -${189 + i * 6} -${312 - i * 5} ${216 - i * 6} ${152 - i * 5} ${343 - i * 6}C${616 - i * 5} ${470 - i * 6} ${684 - i * 5} ${875 - i * 6} ${684 - i * 5} ${875 - i * 6}`,
    width: 0.5 + i * 0.05,
    opacity: 0.12 + i * 0.012,
}));

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-20 pb-10 px-6 relative overflow-hidden border-t border-white/10">
            <div className="absolute inset-0 pointer-events-none z-0">
                <svg
                    className="w-full h-full text-white opacity-[0.15]"
                    viewBox="-200 -200 1096 716"
                    fill="none"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    {footerPaths.map((path) => (
                        <path
                            key={path.id}
                            d={path.d}
                            stroke="currentColor"
                            strokeWidth={path.width}
                            strokeOpacity={path.opacity}
                        />
                    ))}
                </svg>
            </div>

            {/* Soft Ambient Glow */}
            <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-150 h-50 bg-white/2 blur-[100px] rounded-full pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl xl:max-w-350 2xl:max-w-400 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20">

                    {/* Brand & CTA Unified */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <Link href="/" prefetch={false} className="text-2xl font-black uppercase tracking-tighter">
                                BHADRIK <span className="text-gray-500 italic">PANCHAL</span>
                            </Link>
                            <p className="text-[10px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[13px] uppercase tracking-[0.5em] text-white/30 font-bold mt-2">
                                Clarity. Systems. Scale.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-black italic leading-tight uppercase tracking-tighter">
                                READY TO SCALE <br />
                                <span className="text-gray-500">WITHOUT LIMITS?</span>
                            </h2>
                            <a
                                href="/book-call"
                                rel="noopener noreferrer"
                                data-track-event="cta_footer_booking"
                                data-track-category="lead"
                                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] group text-white hover:text-gray-400 transition-colors"
                            >
                                START YOUR GROWTH <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
                        {/* Nav */}
                        <div className="space-y-6">
                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/65 font-black">Menu</h3>
                            <div className="flex flex-col gap-3">
                                {navLinks.map((link) => (
                                    <Link key={link.name} href={link.href} prefetch={false} className="text-xs text-gray-500 hover:text-white transition uppercase tracking-widest font-bold">
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Offerings */}
                        <div className="space-y-6">
                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/65 font-black">Specialties</h3>
                            <div className="flex flex-col gap-3">
                                {offerings.map((item) => (
                                    <span key={item} className="text-xs text-gray-500 hover:text-white transition cursor-default uppercase tracking-widest font-bold">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="space-y-6 col-span-2 md:col-span-1">
                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/65 font-black">Hold</h3>
                            <div className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                                <a href="mailto:hello@bhadrikpanchal.com" className="block hover:text-white transition lowercase">hello@bhadrikpanchal.com</a>
                                <p>Ahmedabad, Gujarat, India</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-black flex items-center gap-4">
                        <span>© {new Date().getFullYear()} bhadrik panchal | business coach • motivational speaker • entrepreneur</span>
                        <span className="hidden md:block w-8 h-px bg-white/10" />
                        <span className="hidden md:block italic text-white/50">Built for the elite</span>
                    </div>

                    <div className="flex gap-4">
                        {socialLinks.map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 hover:scale-110 active:scale-95 transition-all duration-300"
                                aria-label={social.label}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
