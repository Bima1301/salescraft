"use client";

import { motion } from 'framer-motion'
import { stagger, fadeIn } from './const'
import { steps } from '@/lib/static'

export default function HowItWorks() {
    return (
        <section className="py-20 px-6 bg-[#F6F8FA]">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    className="text-center text-3xl md:text-[42px] font-bold tracking-tight text-[#1F2B35] mb-14"
                    style={{ fontFamily: "var(--font-heading)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Three steps to your sales page
                </motion.h2>
                <motion.div
                    className="grid gap-6 md:grid-cols-3"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {steps.map((s) => (
                        <motion.div
                            key={s.num}
                            variants={fadeIn}
                            className="bg-white rounded-sm p-8 card-shadow"
                        >
                            <span
                                className="block text-5xl font-black text-[#0081F6] opacity-30 mb-4 leading-none"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {s.num}
                            </span>
                            <h3
                                className="text-[20px] font-semibold text-[#1F2B35] mb-2"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {s.title}
                            </h3>
                            <p className="text-[#6F8394] text-sm leading-relaxed">{s.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
