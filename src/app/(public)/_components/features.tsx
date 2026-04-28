"use client";

import { motion } from 'framer-motion'
import { stagger, fadeIn } from './const'
import { features } from '@/lib/static'

export default function Features() {
    return (
        <section className="relative py-20 px-6">
            <div className="hidden md:block absolute top-0 left-0 h-60 w-[44%] bg-[#F6F8FA]" />

            <div className="relative max-w-6xl mx-auto">
                <motion.h2
                    className="text-center text-3xl md:text-[42px] font-bold tracking-tight text-[#1F2B35] mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    Everything you need to sell
                </motion.h2>
                <motion.p
                    className="text-center text-[#6F8394] mb-14 max-w-lg mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                >
                    A complete toolkit for generating, managing, and exporting
                    high-converting sales pages.
                </motion.p>

                <motion.div
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {features.map((f) => (
                        <motion.div
                            key={f.title}
                            variants={fadeIn}
                            className="bg-white rounded-sm p-10 card-shadow hover:translate-y-[-2px] transition-transform duration-200"
                        >
                            <div className="flex justify-center mb-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-sm gradient-secondary shadow-sm">
                                    <f.icon className="h-5 w-5 text-white" />
                                </div>
                            </div>
                            <h4
                                className="text-center text-[20px] font-semibold text-[#1F2B35] mt-3 mb-2"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {f.title}
                            </h4>
                            <p className="text-center text-[#6F8394] text-sm leading-relaxed">
                                {f.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
