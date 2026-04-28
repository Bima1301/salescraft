"use client";

import { motion } from 'framer-motion'
import { stagger, fadeIn } from './const'
import { testimonials } from '@/lib/static'
import { Star } from 'lucide-react'

export default function Testimonials() {
    return (
        <section className="relative overflow-hidden py-20 px-6">
            <div className="absolute bottom-0 left-0 w-full h-[200px] bg-[#1F2B35]" />

            <div className="relative max-w-6xl mx-auto">
                <motion.h2
                    className="text-center text-3xl md:text-[42px] font-bold tracking-tight text-[#1F2B35] mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Loved by marketers
                </motion.h2>
                <motion.p
                    className="text-center text-[#6F8394] mb-14"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Don&apos;t just take our word for it.
                </motion.p>
                <motion.div
                    className="grid gap-6 md:grid-cols-3"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {testimonials.map((t) => (
                        <motion.div
                            key={t.name}
                            variants={fadeIn}
                            className="bg-white rounded-sm p-8 card-shadow"
                        >
                            <div className="flex gap-0.5 mb-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="h-4 w-4 fill-[#5FFAD0] text-[#5FFAD0]" />
                                ))}
                            </div>
                            <p className="text-[#6F8394] text-sm leading-relaxed mb-6">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div>
                                <p
                                    className="text-sm font-bold text-[#1F2B35]"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {t.name}
                                </p>
                                <p className="text-xs text-[#6F8394] mt-0.5">{t.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
