"use client";

import { type GeneratedContent, type SalesPage } from "../_server/type";
import {
    CheckCircle,
    Star,
    Zap,
    Shield,
    Rocket,
    ArrowRight,
    TrendingUp,
    Target,
    Sparkles,
    Award,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Zap,
    Shield,
    Rocket,
    CheckCircle,
    ArrowRight,
    TrendingUp,
    Target,
    Sparkles,
    Star,
    Award,
};

function LucideIcon({ name, className }: { name: string; className?: string }) {
    const Icon = iconMap[name] ?? Zap;
    return <Icon className={className} />;
}

const templateThemes = {
    modern: {
        heroFrom: "#2563eb",
        heroTo: "#60a5fa",
        ctaFrom: "#2563eb",
        ctaTo: "#60a5fa",
        sectionBg: "bg-background",
        cardBg: "bg-card border border-border",
        featureBg: "bg-[#2563eb]/10 text-[#2563eb]",
        ctaBg: "bg-[#1F2B35]",
        accent: "text-[#2563eb]",
        priceAccent: "text-[#2563eb]",
    },
    bold: {
        heroFrom: "#f97316",
        heroTo: "#ef4444",
        ctaFrom: "#f97316",
        ctaTo: "#ef4444",
        sectionBg: "bg-background",
        cardBg: "bg-card border border-border",
        featureBg: "bg-[#f97316]/10 text-[#f97316]",
        ctaBg: "bg-[#1F2B35]",
        accent: "text-[#f97316]",
        priceAccent: "text-[#f97316]",
    },
    elegant: {
        heroFrom: "#10b981",
        heroTo: "#14b8a6",
        ctaFrom: "#10b981",
        ctaTo: "#14b8a6",
        sectionBg: "bg-background",
        cardBg: "bg-card border border-border",
        featureBg: "bg-[#10b981]/10 text-[#10b981]",
        ctaBg: "bg-[#1F2B35]",
        accent: "text-[#10b981]",
        priceAccent: "text-[#10b981]",
    },
};

interface SalesPagePreviewProps {
    page: SalesPage;
    content: GeneratedContent;
}

export function SalesPagePreview({ page, content }: SalesPagePreviewProps) {
    const theme = templateThemes[page.template as keyof typeof templateThemes] ?? templateThemes.modern;
    const heroGradient = `linear-gradient(to top right, ${theme.heroFrom} 0%, ${theme.heroTo} 100%)`;
    const ctaGradient = `linear-gradient(65deg, ${theme.ctaFrom} 0%, ${theme.ctaTo} 100%)`;

    return (
        <div className="bg-[#F6F8FA] p-4 sm:p-6">
            <div className="mx-auto max-w-[1440px] overflow-hidden bg-white card-shadow">
                {/* Hero — match `(public)/_components/hero.tsx` layout + palette */}
                <section className="relative text-center pt-10 pb-10 md:text-left md:pt-[92px] md:pb-20">
                    <div
                        className="absolute bottom-0 right-0 w-4/5 h-[230px] md:left-[50%] md:h-[800px] md:w-full pointer-events-none"
                        style={{
                            background: heroGradient,
                        }}
                    />

                    <div className="relative max-w-6xl mx-auto px-6">
                        <div className="md:flex md:items-center">
                            <div className="flex-shrink-0 min-w-full md:max-w-[50%] md:pr-12 lg:min-w-[552px] lg:pr-20">
                                <h1
                                    className="mt-0 text-[42px] leading-[52px] md:text-[56px] md:leading-[66px] font-bold tracking-tight text-[#1F2B35] mb-4"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {content.headline}
                                </h1>
                                <p className="text-[#6F8394] text-[18px] leading-[27px] mb-6 max-w-xl mx-auto md:mx-0">
                                    {content.subHeadline}
                                </p>
                                <p className="text-[#6F8394] text-[15px] leading-[24px] mb-8 max-w-xl mx-auto md:mx-0">
                                    {content.productDescription}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-6">
                                    <button
                                        className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-bold text-white rounded btn-shadow-pink hover:opacity-90 transition-opacity"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        <span
                                            className="absolute inset-0 rounded opacity-100"
                                            style={{ background: ctaGradient }}
                                        />
                                        <span className="relative">
                                        {content.cta.text}
                                        <ArrowRight className="h-4 w-4" />
                                        </span>
                                    </button>
                                    <button
                                        className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-[#0081F6] bg-white rounded border border-[#E2E8ED] card-shadow hover:shadow-md transition-shadow"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        Learn more
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-[#6F8394]">
                                    {content.benefits.slice(0, 3).map((b) => (
                                        <span key={b.title} className="flex items-center gap-1.5">
                                            <CheckCircle className="h-4 w-4 text-[#5FFAD0]" />
                                            {b.title}
                                        </span>
                                    ))}
                                </div>
                                <p className="mt-4 text-xs text-[#6F8394]">
                                    {content.cta.subtext}
                                </p>
                            </div>

                            <div className="mt-10 md:-mt-[68px] flex-1 flex justify-center md:justify-end">
                                <div className="relative w-full max-w-[420px] md:w-[420px]">
                                    <div className="bg-white rounded-lg card-shadow overflow-hidden">
                                        <div className="flex items-center gap-1.5 px-4 py-3 bg-[#F6F8FA] border-b border-[#E2E8ED]">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                            <div className="ml-3 flex-1 bg-white rounded text-xs text-[#6F8394] px-3 py-1 border border-[#E2E8ED]">
                                                preview.salescraft
                                            </div>
                                        </div>
                                        <div className="p-5 bg-gradient-to-br from-[#0f1b35] to-[#0a0f1e] text-white">
                                            <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 bg-white/10 text-white/80 border border-white/20">
                                                ✦ Generated
                                            </div>
                                            <h3
                                                className="text-lg font-bold leading-tight mb-2"
                                                style={{ fontFamily: "var(--font-heading)" }}
                                            >
                                                {content.subHeadline}
                                            </h3>
                                            <p className="text-white/60 text-xs mb-4 leading-relaxed line-clamp-3">
                                                {content.productDescription}
                                            </p>
                                            <div className="grid grid-cols-3 gap-2 mb-4">
                                                {content.pricing.highlights.slice(0, 3).map((s) => (
                                                    <div
                                                        key={s}
                                                        className="bg-white/5 border border-white/10 rounded p-2 text-center text-[10px] text-white/70 line-clamp-2"
                                                    >
                                                        {s}
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                className="relative overflow-hidden w-full py-2 rounded text-xs font-bold text-white btn-shadow-pink hover:opacity-90 transition-opacity"
                                                style={{ fontFamily: "var(--font-heading)" }}
                                            >
                                                <span
                                                    className="absolute inset-0 rounded opacity-100"
                                                    style={{ background: ctaGradient }}
                                                />
                                                <span className="relative">
                                                {content.cta.text} →
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div
                                        className="absolute -top-4 -right-4 bg-white rounded-lg px-3 py-2 card-shadow flex items-center gap-2 text-xs font-semibold text-[#1F2B35]"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        <Sparkles className="h-3.5 w-3.5 text-[#FF4D79]" />
                                        Generated
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            {/* Benefits */}
            <section className={`${theme.sectionBg} px-8 py-16`}>
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold tracking-tight mb-3">
                            Why choose{" "}
                            <span className={theme.accent}>{page.productName}</span>?
                        </h2>
                        <p className="text-muted-foreground max-w-lg mx-auto">
                            Here&apos;s what makes us different — and better.
                        </p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-3">
                        {content.benefits.map((benefit, i) => (
                            <div key={i} className={`rounded-xl p-6 ${theme.cardBg}`}>
                                <div
                                    className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${theme.featureBg}`}
                                >
                                    <CheckCircle className="h-5 w-5" />
                                </div>
                                <h3 className="font-semibold mb-1.5">{benefit.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="bg-muted/30 px-8 py-16">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold tracking-tight mb-3">
                            Powerful Features
                        </h2>
                        <p className="text-muted-foreground">Everything you need, nothing you don&apos;t.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {content.features.map((feature, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
                            >
                                <div
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${theme.featureBg}`}
                                >
                                    <LucideIcon name={feature.icon} className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">{feature.title}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className={`${theme.sectionBg} px-8 py-16`}>
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold tracking-tight mb-3">
                            What our customers say
                        </h2>
                        <p className="text-muted-foreground">Don&apos;t just take our word for it.</p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-3">
                        {content.socialProof.map((testimonial, i) => (
                            <div key={i} className={`rounded-xl p-6 ${theme.cardBg}`}>
                                <div className="mb-3 flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <Star
                                            key={j}
                                            className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-2">
                                    <div
                                        className="flex h-8 w-8 items-center justify-center rounded-full text-white text-xs font-bold"
                                        style={{ background: ctaGradient }}
                                    >
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold">{testimonial.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="bg-muted/30 px-8 py-16">
                <div className="mx-auto max-w-md text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-3">Simple pricing</h2>
                    <p className="text-muted-foreground mb-8">
                        One price. All features. No surprises.
                    </p>
                    <div className={`rounded-2xl border-2 border-primary/20 ${theme.cardBg} p-8`}>
                        <div className="mb-6">
                            <p className={`text-5xl font-black ${theme.priceAccent}`}>
                                {content.pricing.price}
                            </p>
                            <p className="text-muted-foreground text-sm mt-1">
                                {content.pricing.period}
                            </p>
                        </div>
                        <ul className="space-y-3 mb-8 text-left">
                            {content.pricing.highlights.map((h, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className={`h-4 w-4 shrink-0 ${theme.accent}`} />
                                    {h}
                                </li>
                            ))}
                        </ul>
                        <button
                            className="w-full rounded-xl py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                            style={{ background: ctaGradient }}
                        >
                            {content.cta.text}
                        </button>
                        <p className="mt-2 text-xs text-muted-foreground">{content.cta.subtext}</p>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className={`${theme.ctaBg} px-8 py-16 text-white text-center`}>
                <div className="mx-auto max-w-2xl">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to get started with {page.productName}?
                    </h2>
                    <p className="text-white/70 mb-8 text-base">
                        Join thousands of satisfied customers. Start today.
                    </p>
                    <button
                        className="rounded-xl px-10 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-lg"
                        style={{ background: ctaGradient }}
                    >
                        {content.cta.text} →
                    </button>
                </div>
            </section>
                {/* Footer — match public landing page footer */}
                <footer className="bg-[#1F2B35] px-6 py-10 top-divider">
                    <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
                        <div className="flex items-center gap-2.5">
                            <svg width="40" height="28" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient x1="0%" y1="100%" y2="0%" id="preview-footer-a">
                                        <stop stopColor="#007CFE" stopOpacity="0" offset="0%" />
                                        <stop stopColor="#007DFF" offset="100%" />
                                    </linearGradient>
                                    <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="preview-footer-b">
                                        <stop stopColor="#FF4F7A" stopOpacity="0" offset="0%" />
                                        <stop stopColor="#FF4F7A" offset="100%" />
                                    </linearGradient>
                                </defs>
                                <g fill="none" fillRule="evenodd">
                                    <rect fill="url(#preview-footer-a)" width="32" height="32" rx="16" />
                                    <rect fill="url(#preview-footer-b)" x="16" width="32" height="32" rx="16" />
                                </g>
                            </svg>
                            <span
                                className="text-base font-bold text-white"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                SalesCraft
                            </span>
                        </div>

                        <p className="text-xs text-[#6F8394] text-center">
                            © {new Date().getFullYear()} SalesCraft. Built with Next.js, Elysia &amp; OpenAI.
                        </p>

                        <div className="flex items-center gap-5 text-xs text-[#6F8394]">
                            <a href="#features" className="hover:text-white transition-colors">
                                Features
                            </a>
                            <a href="#pricing" className="hover:text-white transition-colors">
                                Pricing
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
