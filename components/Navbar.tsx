"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Insights", href: "/insights" },
    { name: "Contact", href: "/contact" },
];

// Social links moved to footer to keep navbar minimal and high-ticket.

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            const nextScrolled = window.scrollY > 50;
            setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!mobileMenuOpen) return;

        const previousOverflow = document.body.style.overflow;
        const previousTouchAction = document.body.style.touchAction;

        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";

        return () => {
            document.body.style.overflow = previousOverflow;
            document.body.style.touchAction = previousTouchAction;
        };
    }, [mobileMenuOpen]);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-100 transition-all duration-700 ${scrolled
                    ? isHome
                        ? "py-4 bg-[#030712]/85 backdrop-blur-2xl border-b border-white/10"
                        : "py-4 bg-black/40 backdrop-blur-2xl border-b border-white/5"
                    : "py-8 bg-transparent"
                    }`}
            >
                <div className="max-w-375 mx-auto px-6 md:px-12 flex justify-between items-center">
                    <Link href="/" className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white flex items-center gap-2 group">
                        <span className="bg-white text-black px-2 py-0.5 rounded-sm">BHADRIK</span>
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-500">PANCHAL</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex gap-4 xl:gap-8 items-center ml-auto">
                        <div className="flex gap-4 xl:gap-8 items-center mr-4 xl:mr-8 border-r border-white/10 pr-4 xl:pr-8 ml-8 xl:ml-12">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    prefetch={false}
                                    className={`relative text-[10px] lg:text-[11px] uppercase tracking-widest lg:tracking-widest xl:tracking-[0.25em] 2xl:tracking-[0.4em] font-bold transition-all duration-300 group py-2 ${isHome ? "text-white/70 hover:text-white" : "text-gray-500 hover:text-white"
                                        }`}
                                >
                                    {item.name}
                                    <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
                                </Link>
                            ))}
                        </div>

                        <a
                            href="/book-call"
                            rel="noopener noreferrer"
                            data-track-event="cta_nav_booking_desktop"
                            data-track-category="lead"
                            className="px-6 lg:px-10 whitespace-nowrap py-3 lg:py-4 bg-white text-black text-[9px] lg:text-[10px] uppercase lg:tracking-[0.2em] xl:tracking-[0.4em] font-black rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-500"
                        >
                            Book Call
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        type="button"
                        className="lg:hidden flex flex-col gap-1.5 z-110 p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-nav-menu"
                    >
                        <span className={`w-8 h-px bg-white block transition-transform duration-300 ${mobileMenuOpen ? "translate-y-1.75 rotate-45" : ""}`} />
                        <span className={`w-8 h-px bg-white block transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
                        <span className={`w-8 h-px bg-white block transition-transform duration-300 ${mobileMenuOpen ? "-translate-y-1.75 -rotate-45" : ""}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    id="mobile-nav-menu"
                    className="fixed inset-0 z-90 bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-start gap-8 sm:gap-12 lg:hidden overflow-y-auto pt-36 pb-20"
                >
                    <div className="flex flex-col items-center gap-8">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                prefetch={false}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl sm:text-4xl uppercase sm:tracking-[0.5em] tracking-[0.3em] font-black text-white hover:text-gray-400 transition-colors py-2 sm:py-4 px-8 w-full text-center block"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <a
                        href="/book-call"
                        rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}
                        data-track-event="cta_nav_booking_mobile"
                        data-track-category="lead"
                        className="px-10 sm:px-16 py-4 sm:py-6 bg-white text-black text-[10px] sm:text-[12px] uppercase sm:tracking-[0.5em] tracking-[0.3em] font-black rounded-full whitespace-nowrap"
                    >
                        Book Strategic Call
                    </a>
                </div>
            )}
        </>
    );
}
