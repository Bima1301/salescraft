import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
    return (
        <section className="bg-[#1F2B35] py-20 px-6">
            <div className="max-w-2xl mx-auto text-center">
                <motion.h2
                    className="text-3xl md:text-[42px] font-bold tracking-tight text-white mb-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Ready to craft your sales page?
                </motion.h2>
                <motion.p
                    className="text-[#6F8394] mb-8 text-base"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Join founders and marketers using SalesCraft to build
                    high-converting pages in minutes.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                >
                    <Link
                        href="/register"
                        className="inline-flex items-center gap-2 px-10 py-3.5 text-base font-bold text-white rounded gradient-secondary btn-shadow-pink hover:opacity-90 transition-opacity"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Start for free
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
