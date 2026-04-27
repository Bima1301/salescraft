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
        heroBg: "bg-gradient-to-br from-violet-950 via-indigo-950 to-slate-900",
        heroAccent: "text-violet-300",
        badge: "bg-violet-500/20 text-violet-200 border border-violet-500/30",
        buttonBg: "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500",
        sectionBg: "bg-background",
        cardBg: "bg-card border border-border",
        featureBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
        ctaBg: "bg-gradient-to-br from-violet-900 to-indigo-900",
        accent: "text-violet-600 dark:text-violet-400",
        priceAccent: "text-violet-600 dark:text-violet-300",
    },
    bold: {
        heroBg: "bg-gradient-to-br from-orange-950 via-red-950 to-slate-900",
        heroAccent: "text-orange-300",
        badge: "bg-orange-500/20 text-orange-200 border border-orange-500/30",
        buttonBg: "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500",
        sectionBg: "bg-background",
        cardBg: "bg-card border border-border",
        featureBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
        ctaBg: "bg-gradient-to-br from-orange-900 to-red-900",
        accent: "text-orange-600 dark:text-orange-400",
        priceAccent: "text-orange-600 dark:text-orange-300",
    },
    elegant: {
        heroBg: "bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900",
        heroAccent: "text-emerald-300",
        badge: "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30",
        buttonBg: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500",
        sectionBg: "bg-background",
        cardBg: "bg-card border border-border",
        featureBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        ctaBg: "bg-gradient-to-br from-emerald-900 to-teal-900",
        accent: "text-emerald-600 dark:text-emerald-400",
        priceAccent: "text-emerald-600 dark:text-emerald-300",
    },
};

interface SalesPagePreviewProps {
    page: SalesPage;
    content: GeneratedContent;
}

export function SalesPagePreview({ page, content }: SalesPagePreviewProps) {
    const theme = templateThemes[page.template as keyof typeof templateThemes] ?? templateThemes.modern;

    return (
        <div className="overflow-hidden rounded-xl border border-border shadow-xl">
            {/* Hero */}
            <section className={`${theme.heroBg} px-8 py-20 text-white text-center`}>
                <div className="mx-auto max-w-3xl">
                    <span
                        className={`inline-block rounded-full px-4 py-1.5 text-xs font-medium mb-6 ${theme.badge}`}
                    >
                        ✦ AI Generated Sales Page
                    </span>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl leading-tight mb-4">
                        {content.headline}
                    </h1>
                    <p className={`text-lg ${theme.heroAccent} mb-6 font-medium`}>
                        {content.subHeadline}
                    </p>
                    <p className="text-white/70 text-base max-w-xl mx-auto leading-relaxed mb-8">
                        {content.productDescription}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            className={`rounded-xl px-8 py-3 text-sm font-bold text-white transition-all shadow-lg ${theme.buttonBg}`}
                        >
                            {content.cta.text}
                        </button>
                        <button className="rounded-xl border border-white/20 bg-white/5 px-8 py-3 text-sm font-medium text-white hover:bg-white/10 transition-all backdrop-blur-sm">
                            Learn more
                        </button>
                    </div>
                    <p className="mt-4 text-xs text-white/50">{content.cta.subtext}</p>
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
                                        className={`flex h-8 w-8 items-center justify-center rounded-full text-white text-xs font-bold ${theme.buttonBg}`}
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
                            className={`w-full rounded-xl py-3 text-sm font-bold text-white transition-all ${theme.buttonBg}`}
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
                    <p className={`${theme.heroAccent} mb-8 text-base`}>
                        Join thousands of satisfied customers. Start today.
                    </p>
                    <button
                        className={`rounded-xl px-10 py-3.5 text-sm font-bold text-white transition-all shadow-lg ${theme.buttonBg}`}
                    >
                        {content.cta.text} →
                    </button>
                </div>
            </section>
        </div>
    );
}
