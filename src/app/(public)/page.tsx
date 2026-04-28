"use client";

import Link from "next/link";
import Hero from "./_components/hero";
import Features from "./_components/features";
import HowItWorks from "./_components/how-it-works";
import Testimonials from "./_components/testimonials";
import CTA from "./_components/cta";

export default function Home() {
    return (
        <div className="bg-[#F6F8FA] min-h-screen overflow-x-hidden">
            {/* ── Boxed wrapper ── */}
            <div className="max-w-[1440px] mx-auto bg-white overflow-hidden card-shadow">

                {/* ── Nav ── */}
                <header className="relative z-10 px-6 py-6">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="relative w-10 h-7 flex-shrink-0">
                                <svg width="40" height="28" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient x1="0%" y1="100%" y2="0%" id="logo-a">
                                            <stop stopColor="#007CFE" stopOpacity="0" offset="0%" />
                                            <stop stopColor="#007DFF" offset="100%" />
                                        </linearGradient>
                                        <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="logo-b">
                                            <stop stopColor="#FF4F7A" stopOpacity="0" offset="0%" />
                                            <stop stopColor="#FF4F7A" offset="100%" />
                                        </linearGradient>
                                    </defs>
                                    <g fill="none" fillRule="evenodd">
                                        <rect fill="url(#logo-a)" width="32" height="32" rx="16" />
                                        <rect fill="url(#logo-b)" x="16" width="32" height="32" rx="16" />
                                    </g>
                                </svg>
                            </div>
                            <span
                                className="text-lg font-bold tracking-tight text-[#1F2B35]"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                SalesCraft
                            </span>
                        </Link>
                    </div>
                </header>
                <Hero />
                <Features />
                <HowItWorks />
                <Testimonials />
                <CTA />

                {/* ── Footer ── */}
                <footer className="bg-[#1F2B35] px-6 py-10 top-divider">
                    <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
                        <Link href="/" className="flex items-center gap-2.5">
                            <svg width="40" height="28" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient x1="0%" y1="100%" y2="0%" id="logo-footer-a">
                                        <stop stopColor="#007CFE" stopOpacity="0" offset="0%" />
                                        <stop stopColor="#007DFF" offset="100%" />
                                    </linearGradient>
                                    <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="logo-footer-b">
                                        <stop stopColor="#FF4F7A" stopOpacity="0" offset="0%" />
                                        <stop stopColor="#FF4F7A" offset="100%" />
                                    </linearGradient>
                                </defs>
                                <g fill="none" fillRule="evenodd">
                                    <rect fill="url(#logo-footer-a)" width="32" height="32" rx="16" />
                                    <rect fill="url(#logo-footer-b)" x="16" width="32" height="32" rx="16" />
                                </g>
                            </svg>
                            <span
                                className="text-base font-bold text-white"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                SalesCraft
                            </span>
                        </Link>

                        <p className="text-xs text-[#6F8394] text-center">
                            © {new Date().getFullYear()} SalesCraft. Built with Next.js, Elysia &amp;
                            OpenAI.
                        </p>

                        <div className="flex items-center gap-5 text-xs text-[#6F8394]">
                            <Link href="/login" className="hover:text-white transition-colors">
                                Sign in
                            </Link>
                            <Link href="/register" className="hover:text-white transition-colors">
                                Register
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
