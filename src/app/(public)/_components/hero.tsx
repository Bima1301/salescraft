"use client";

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import { fadeIn, stagger } from './const';


export default function Hero() {
    return (
        <section className="relative text-center pt-10 pb-0 md:text-left md:pt-[92px] md:pb-20">
            <div
                className="absolute bottom-0 right-0 w-4/5 h-[230px] md:left-[50%] md:h-[800px] md:w-full pointer-events-none"
                style={{ background: "linear-gradient(to top right, #0081F6 0%, #44A6FF 100%)" }}
            />

            <div className="relative max-w-6xl mx-auto px-6">
                <div className="md:flex md:items-center">
                    <motion.div
                        className="flex-shrink-0 min-w-full md:max-w-[50%] md:pr-12 lg:min-w-[552px] lg:pr-20"
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.h1
                            variants={fadeIn}
                            className="mt-0 text-[42px] leading-[52px] md:text-[56px] md:leading-[66px] font-bold tracking-tight text-[#1F2B35] mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Turn product info into{" "}
                            <span className="text-[#FF4D79]">sales pages</span>
                            {" "}that convert
                        </motion.h1>
                        <motion.p
                            variants={fadeIn}
                            className="text-[#6F8394] text-[18px] leading-[27px] mb-8 max-w-xl mx-auto md:mx-0"
                        >
                            SalesCraft uses GPT-4o mini to transform raw product details
                            into fully structured, persuasive sales pages in seconds —
                            complete with headlines, benefits, social proof, and a CTA.
                        </motion.p>
                        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-8">
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-bold text-white rounded gradient-secondary btn-shadow-pink"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Get started free
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-[#0081F6] bg-white rounded border border-[#E2E8ED] card-shadow hover:shadow-md transition-shadow"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Sign in
                            </Link>
                        </motion.div>
                        <motion.div
                            variants={fadeIn}
                            className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-[#6F8394]"
                        >
                            {["No credit card required", "Free to start", "Ready in seconds"].map((t) => (
                                <span key={t} className="flex items-center gap-1.5">
                                    <CheckCircle className="h-4 w-4 text-[#5FFAD0]" />
                                    {t}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="mt-10 md:-mt-[68px] flex-1 flex justify-center md:justify-end"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                    >
                        <div className="relative w-full max-w-[420px] md:w-[420px]">
                            <div className="bg-white rounded-lg card-shadow overflow-hidden">
                                <div className="flex items-center gap-1.5 px-4 py-3 bg-[#F6F8FA] border-b border-[#E2E8ED]">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    <div className="ml-3 flex-1 bg-white rounded text-xs text-[#6F8394] px-3 py-1 border border-[#E2E8ED]">
                                        salescraft.app/preview
                                    </div>
                                </div>
                                <div className="p-5 bg-gradient-to-br from-[#0f1b35] to-[#0a0f1e] text-white">
                                    <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 bg-white/10 text-white/80 border border-white/20">
                                        ✦ AI Generated
                                    </div>
                                    <h3
                                        className="text-lg font-bold leading-tight mb-2"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        10× Your Revenue with{" "}
                                        <span className="text-[#44A6FF]">Smart Automation</span>
                                    </h3>
                                    <p className="text-white/60 text-xs mb-4 leading-relaxed">
                                        The all-in-one platform that automates your sales funnel
                                        while you focus on growth.
                                    </p>
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        {["Save 10h/week", "3× More Leads", "99% Uptime"].map((s) => (
                                            <div key={s} className="bg-white/5 border border-white/10 rounded p-2 text-center text-[10px] text-white/70">
                                                {s}
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        className="w-full py-2 rounded text-xs font-bold text-white gradient-secondary btn-shadow-pink"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        Start Free Trial →
                                    </button>
                                </div>
                            </div>

                            <motion.div
                                className="absolute -top-4 -right-4 bg-white rounded-lg px-3 py-2 card-shadow flex items-center gap-2 text-xs font-semibold text-[#1F2B35]"
                                style={{ fontFamily: "var(--font-heading)" }}
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Sparkles className="h-3.5 w-3.5 text-[#FF4D79]" />
                                Generated in 4s
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>

    )
}
