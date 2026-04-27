import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  FileText,
  RefreshCw,
  Download,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Copy",
    description:
      "GPT-4o mini crafts compelling headlines, descriptions, and CTAs tailored to your product.",
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description:
      "From product info to a full sales page in seconds. No writing skills needed.",
  },
  {
    icon: FileText,
    title: "Structured Output",
    description:
      "Get headlines, benefits, features, social proof, pricing, and CTAs — all in one page.",
  },
  {
    icon: RefreshCw,
    title: "Section Regeneration",
    description:
      "Not happy with a section? Regenerate just the headline or CTA without starting over.",
  },
  {
    icon: Download,
    title: "Export as HTML",
    description:
      "Download your sales page as a standalone HTML file, ready to deploy anywhere.",
  },
  {
    icon: BarChart3,
    title: "Multiple Templates",
    description:
      "Choose from Modern, Bold, or Elegant templates to match your brand's personality.",
  },
];

const testimonials = [
  {
    quote:
      "SalesCraft saved me 6 hours of copywriting. The AI-generated page converted 3x better than my manual effort.",
    name: "Jordan Lee",
    role: "SaaS Founder",
  },
  {
    quote:
      "I used to spend days crafting sales copy. Now I have a polished page in minutes. Absolutely game-changing.",
    name: "Priya Sharma",
    role: "Digital Marketer",
  },
  {
    quote:
      "The design is clean and professional. The AI copy is sharp, persuasive, and spot-on.",
    name: "Marcus Chen",
    role: "Freelance Designer",
  },
];

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary-1)]">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">
              SalesCraft
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {session?.user ? (
              <Button asChild size="sm">
                <Link href="/dashboard">
                  Dashboard <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-[var(--color-secondary-1)] text-white border-0 hover:bg-[var(--color-secondary-2)]"
                >
                  <Link href="/register">Get started free</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section - Agnes Style */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute right-0 top-0 h-[500px] w-[80%] bg-gradient-to-br from-[var(--color-primary-1)] to-[var(--color-primary-2)] opacity-20" />
        </div>
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="flex-1 text-center lg:text-left">
              <Badge
                variant="secondary"
                className="mb-6 gap-1.5 px-3 py-1.5 text-xs font-medium"
              >
                <Sparkles className="h-3 w-3 text-[var(--color-primary-1)]" />
                Powered by GPT-4o mini
              </Badge>

              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-[42px] lg:leading-[52px]">
                Turn product info into{" "}
                <span className="text-[var(--color-primary-1)]">
                  sales pages
                </span>
                <br />
                that actually convert
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-muted-foreground text-lg leading-relaxed lg:mx-0">
                SalesCraft uses AI to transform raw product details into fully
                structured, persuasive sales pages — complete with headlines,
                benefits, social proof, and a compelling CTA.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-8 text-base bg-[var(--color-secondary-1)] text-white border-0 hover:bg-[var(--color-secondary-2)]"
                >
                  <Link
                    href={
                      session?.user ? "/dashboard/sales-pages/new" : "/register"
                    }
                  >
                    Create your first page
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base"
                >
                  <Link href="/login">Sign in</Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground lg:justify-start">
                {[
                  "No credit card required",
                  "Free to start",
                  "Generate in seconds",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-[var(--color-success)]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 flex-1 lg:mt-0">
              <div className="relative mx-auto max-w-md lg:ml-auto lg:mr-0">
                <div className="rounded-lg border border-border bg-card p-6 shadow-lg">
                  <div className="mb-4 flex items-center gap-2 border-b border-border pb-4">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-4 h-6 rounded-md bg-muted text-xs text-muted-foreground flex items-center px-3">
                      salescraft.app/preview/...
                    </div>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-[var(--color-primary-1)] to-[var(--color-primary-2)] p-8 text-white text-center">
                    <Badge className="mb-4 bg-white/20 text-white border-0 text-xs backdrop-blur-sm">
                      AI Generated
                    </Badge>
                    <h2 className="text-2xl font-bold mb-3">
                      10x Your Revenue with{" "}
                      <span className="text-white/80">Smart Automation</span>
                    </h2>
                    <p className="text-white/70 text-sm max-w-md mx-auto mb-6">
                      The all-in-one platform that automates your sales funnel
                      while you focus on what matters most.
                    </p>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {["Save 10+ hrs/week", "3x More Leads", "99% Uptime"].map(
                        (s) => (
                          <div
                            key={s}
                            className="text-center rounded bg-white/10 border border-white/20 p-3 text-xs text-white/80 backdrop-blur-sm"
                          >
                            {s}
                          </div>
                        ),
                      )}
                    </div>
                    <button className="rounded-md bg-white text-[var(--color-primary-1)] px-6 py-2.5 text-sm font-semibold hover:bg-white/90 transition-colors backdrop-blur-sm">
                      Start Free Trial
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Agnes Style */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Everything you need to sell
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              A complete toolkit for generating, managing, and exporting
              high-converting sales pages.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary-1)]">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              How it works
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Three steps to your sales page
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Enter product details",
                description:
                  "Fill in your product name, description, features, audience, and pricing.",
              },
              {
                step: "02",
                title: "AI generates your page",
                description:
                  "GPT-4o mini crafts every section — from headline to CTA — optimized for conversions.",
              },
              {
                step: "03",
                title: "Preview, edit & export",
                description:
                  "See a live preview, regenerate any section, and export as HTML.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="relative rounded-lg border border-border bg-card p-6"
              >
                <span className="text-5xl font-black text-[var(--color-primary-1)] opacity-20 block mb-4">
                  {s.step}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Loved by marketers
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-lg border border-border bg-card p-6"
              >
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              Ready to craft your sales page?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Join thousands of founders and marketers using SalesCraft to build
              high-converting pages in minutes.
            </p>
            <Button
              asChild
              size="lg"
              className="h-12 px-10 text-base bg-[var(--color-secondary-1)] text-white border-0 hover:bg-[var(--color-secondary-2)]"
            >
              <Link href={session?.user ? "/dashboard" : "/register"}>
                {session?.user ? "Go to Dashboard" : "Start for free"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--color-primary-1)]">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              SalesCraft
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SalesCraft. Built with Next.js, Elysia
            &amp; OpenAI.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5" />
            <span>Secure &amp; Private</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
