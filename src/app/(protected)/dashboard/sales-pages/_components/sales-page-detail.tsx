"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useSalesPage,
  useUpdateSalesPage,
  useDeleteSalesPage,
  useRegenerateSalesPage,
} from "../_server";
import { SalesPagePreview } from "./sales-page-preview";
import { SalesPageForm } from "./sales-page-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Download,
  ExternalLink,
  Sparkles,
  Loader2,
  Clock,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import type { GeneratedContent, SalesPageBodyInput } from "../_server/type";
import { formatDistanceToNow } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface SalesPageDetailProps {
  id: string;
}

const regenerateSections = [
  { id: "all", label: "Entire page" },
  { id: "headline", label: "Headline" },
  { id: "subHeadline", label: "Sub-headline" },
  { id: "productDescription", label: "Description" },
  { id: "benefits", label: "Benefits" },
  { id: "features", label: "Features" },
  { id: "socialProof", label: "Testimonials" },
  { id: "pricing", label: "Pricing" },
  { id: "cta", label: "Call to Action" },
];

export function SalesPageDetail({ id }: SalesPageDetailProps) {
  const router = useRouter();
  const { data: page, isLoading } = useSalesPage(id);
  const updateMutation = useUpdateSalesPage(id);
  const deleteMutation = useDeleteSalesPage();
  const regenerateMutation = useRegenerateSalesPage(id);
  const [regenerateSection, setRegenerateSection] = useState<string>("all");
  const [regenerateOpen, setRegenerateOpen] = useState(false);

  async function handleUpdate(data: SalesPageBodyInput) {
    await updateMutation.mutateAsync(data);
  }

  async function handleDelete() {
    await deleteMutation.mutateAsync(id);
    router.push("/dashboard/sales-pages");
  }

  function handleExportHtml() {
    if (!page?.generatedContent) return;
    const content = page.generatedContent as GeneratedContent;
    const html = generateHtmlExport(page.productName, content, page.template);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${page.productName.toLowerCase().replace(/\s+/g, "-")}-sales-page.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (isLoading) {
    return (
      <main className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-xl" />
            <div>
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-32 mt-1" />
            </div>
          </div>
          <Skeleton className="h-[600px] w-full rounded-xl" />
        </div>
      </main>
    );
  }

  if (!page) {
    return (
      <main className="flex-1 p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Sales page not found.</p>
          <Button asChild variant="link" className="mt-2">
            <Link href="/dashboard/sales-pages">Go back</Link>
          </Button>
        </div>
      </main>
    );
  }

  const content = page.generatedContent as GeneratedContent | null;

  return (
    <main className="flex-1 p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="rounded-xl shrink-0"
            >
              <Link href="/dashboard/sales-pages">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold truncate">
                  {page.productName}
                </h1>
                <Badge
                  variant="secondary"
                  className="capitalize text-xs shrink-0"
                >
                  {page.template}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Updated {formatDistanceToNow(new Date(page.updatedAt))}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Regenerate (shadcn Popover, Agnes-style dropdown) */}
            <Popover open={regenerateOpen} onOpenChange={setRegenerateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl gap-1.5"
                  disabled={regenerateMutation.isPending}
                >
                  {regenerateMutation.isPending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <RefreshCw className="h-3.5 w-3.5" />
                  )}
                  Regenerate
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-52 p-1.5 rounded-lg border border-border bg-card shadow-lg"
              >
                {regenerateSections.map((s) => {
                  const selected = regenerateSection === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-left transition-colors",
                        "hover:bg-muted",
                        selected && "bg-muted/70 font-medium",
                        s.id === "all" && selected && "text-primary",
                      )}
                      onClick={async () => {
                        setRegenerateSection(s.id);
                        setRegenerateOpen(false);
                        await regenerateMutation.mutateAsync(
                          s.id === "all" ? undefined : s.id,
                        );
                      }}
                    >
                      {s.id === "all" ? (
                        <Sparkles className="h-3.5 w-3.5" />
                      ) : null}
                      <span className="flex-1">{s.label}</span>
                      {selected ? (
                        <span className="text-xs text-muted-foreground">
                          Selected
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </PopoverContent>
            </Popover>

            <Button
              variant="outline"
              size="sm"
              className="rounded-xl gap-1.5"
              onClick={handleExportHtml}
              disabled={!content}
            >
              <Download className="h-3.5 w-3.5" />
              Export HTML
            </Button>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-xl gap-1.5"
              disabled={!content}
            >
              <Link
                href={`/sales-pages/${id}`}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Full Preview
              </Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl gap-1.5 text-destructive hover:bg-destructive/10 hover:border-destructive/50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete sales page?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete &ldquo;{page.productName}
                    &rdquo;. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-xl">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="preview">
          <TabsList className="rounded-lg border border-border bg-card">
            <TabsTrigger value="preview" className="rounded-lg gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="edit" className="rounded-lg gap-1.5">
              <Edit className="h-3.5 w-3.5" />
              Edit & Regenerate
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-4">
            {content ? (
              <SalesPagePreview page={page} content={content} />
            ) : (
              <div className="rounded-lg border border-border bg-card p-10 text-center">
                <Sparkles className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  No content generated yet. Regenerate to create content.
                </p>
                <Button
                  className="mt-4 gradient-bg border-0 text-white hover:opacity-90"
                  onClick={() => regenerateMutation.mutate(undefined)}
                  disabled={regenerateMutation.isPending}
                >
                  {regenerateMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Generate now
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="edit" className="mt-4">
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-6">
                Update your product details and re-generate the entire sales
                page with new AI content.
              </p>
              <SalesPageForm
                defaultValues={{
                  productName: page.productName,
                  productDescription: page.productDescription,
                  features: page.features,
                  targetAudience: page.targetAudience,
                  price: page.price,
                  uniqueSellingPoints: page.uniqueSellingPoints,
                  template: page.template as "modern" | "bold" | "elegant",
                }}
                onSubmit={handleUpdate}
                isLoading={updateMutation.isPending}
                submitLabel="Update & Regenerate"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

function generateHtmlExport(
  productName: string,
  content: GeneratedContent,
  template: string,
): string {
  const base = {
    text1: "#1F2B35",
    text2: "#6F8394",
    bg1: "#FFFFFF",
    bg2: "#F6F8FA",
    bg3: "#E2E8ED",
    footer: "#1F2B35",
    accent: "#5FFAD0",
  };

  const paletteByTemplate: Record<
    string,
    { heroFrom: string; heroTo: string; ctaFrom: string; ctaTo: string }
  > = {
    modern: {
      heroFrom: "#2563eb",
      heroTo: "#60a5fa",
      ctaFrom: "#2563eb",
      ctaTo: "#60a5fa",
    },
    bold: {
      heroFrom: "#f97316",
      heroTo: "#ef4444",
      ctaFrom: "#f97316",
      ctaTo: "#ef4444",
    },
    elegant: {
      heroFrom: "#10b981",
      heroTo: "#14b8a6",
      ctaFrom: "#10b981",
      ctaTo: "#14b8a6",
    },
  };

  const palette = paletteByTemplate[template] ?? paletteByTemplate.modern;
  const colors = { ...base, ...palette };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${productName} — Sales Page</title>
  <link href="https://fonts.googleapis.com/css?family=Hind+Vadodara:400,700|Mukta:500,700" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: "Hind Vadodara", system-ui, -apple-system, Segoe UI, sans-serif; background: ${colors.bg2}; color: ${colors.text2}; line-height: 1.6; }
    h1,h2,h3 { font-family: "Mukta", system-ui, -apple-system, Segoe UI, sans-serif; color: ${colors.text1}; }
    a { color: inherit; }
    .boxed { max-width: 1440px; margin: 0 auto; background: ${colors.bg1}; box-shadow: 0 16px 48px ${colors.bg3}; overflow: hidden; min-height: 100vh; }
    .container { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
    /* Hero (Agnes) */
    .hero { position: relative; padding: 92px 24px 80px; }
    .hero::before { content: ""; position: absolute; bottom: 0; right: 0; height: 520px; width: 100%; background: linear-gradient(to top right, ${colors.heroFrom} 0%, ${colors.heroTo} 100%); }
    @media (min-width: 1025px) { .hero::before { width: 43%; } }
    .hero-inner { position: relative; display: grid; gap: 40px; align-items: center; }
    @media (min-width: 860px) { .hero-inner { grid-template-columns: 1.1fr 0.9fr; } }
    .badge { display: inline-flex; align-items: center; gap: 8px; border: 1px solid ${colors.bg3}; background: ${colors.bg1}; color: ${colors.text2}; padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 700; margin-bottom: 16px; }
    .hero h1 { font-size: 56px; line-height: 66px; letter-spacing: -0.1px; font-weight: 700; margin-bottom: 12px; }
    @media (max-width: 640px) { .hero h1 { font-size: 42px; line-height: 52px; } }
    .hero .sub { font-size: 18px; line-height: 27px; color: ${colors.text2}; margin-bottom: 18px; }
    .hero .desc { font-size: 14px; color: ${colors.text2}; max-width: 560px; }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: linear-gradient(65deg, ${colors.ctaFrom} 0%, ${colors.ctaTo} 100%); color: white; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; border: none; cursor: pointer; box-shadow: 0 8px 16px rgba(31,43,53,0.12); }
    .btn:hover { opacity: 0.93; }
    .btn-ghost { display: inline-flex; align-items: center; justify-content: center; border: 1px solid ${colors.bg3}; background: ${colors.bg1}; color: ${colors.heroFrom}; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; }
    .sub-cta { color: ${colors.text2}; font-size: 12px; margin-top: 10px; }
    .hero-card { background: ${colors.bg1}; border: 1px solid ${colors.bg3}; box-shadow: 0 16px 48px ${colors.bg3}; border-radius: 8px; overflow: hidden; }
    .hero-card-head { background: ${colors.bg2}; border-bottom: 1px solid ${colors.bg3}; padding: 14px 16px; font-size: 12px; font-weight: 700; color: ${colors.text2}; font-family: "Mukta", sans-serif; }
    .hero-card-body { padding: 18px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .mini { background: ${colors.bg2}; border: 1px solid ${colors.bg3}; border-radius: 6px; padding: 10px; }
    .mini strong { display:block; font-size: 12px; color: ${colors.text1}; margin-bottom: 4px; }
    .mini span { font-size: 12px; color: ${colors.text2}; }
    /* Sections */
    section { padding: 72px 24px; }
    section.alt { background: ${colors.bg2}; }
    section h2 { text-align: center; font-size: 42px; line-height: 52px; letter-spacing: -0.1px; font-weight: 700; margin-bottom: 8px; }
    @media (max-width: 640px) { section h2 { font-size: 36px; line-height: 46px; } }
    section .subtitle { text-align: center; color: ${colors.text2}; margin-bottom: 40px; }
    /* Cards */
    .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
    .card { background: ${colors.bg1}; border: 1px solid ${colors.bg3}; box-shadow: 0 16px 48px ${colors.bg3}; border-radius: 8px; padding: 24px; }
    .icon { width: 40px; height: 40px; background: linear-gradient(65deg, ${colors.ctaFrom} 0%, ${colors.ctaTo} 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; font-size: 18px; color: white; }
    .card h3 { font-size: 16px; font-weight: 700; margin-bottom: 6px; color: ${colors.text1}; font-family: "Mukta", sans-serif; }
    .card p { font-size: 14px; color: ${colors.text2}; }
    /* Stars */
    .stars { color: ${colors.accent}; margin-bottom: 10px; font-size: 13px; letter-spacing: 2px; }
    /* Price */
    .price-card { background: ${colors.bg1}; border: 2px solid ${colors.heroFrom}22; border-radius: 12px; padding: 40px; text-align: center; max-width: 420px; margin: 0 auto; box-shadow: 0 16px 48px ${colors.bg3}; }
    .price-num { font-size: 56px; font-weight: 900; color: ${colors.heroFrom}; font-family: "Mukta", sans-serif; }
    .price-period { color: ${colors.text2}; font-size: 13px; }
    .features-list { list-style: none; margin: 24px 0; text-align: left; }
    .features-list li { padding: 6px 0; font-size: 14px; color: ${colors.text2}; }
    .features-list li::before { content: '✓  '; color: ${colors.accent}; font-weight: 700; }
    /* CTA */
    .cta-section { background: ${colors.footer}; text-align: center; padding: 80px 24px; color: white; }
    .cta-section h2 { color: white; }
    .avatar { width: 36px; height: 36px; background: linear-gradient(65deg, ${colors.ctaFrom}, ${colors.ctaTo}); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: 700; margin-right: 10px; vertical-align: middle; }
    /* Footer */
    .footer { background: ${colors.footer}; padding: 40px 24px; color: ${colors.text2}; }
    .footer-inner { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; display: flex; gap: 16px; flex-wrap: wrap; justify-content: space-between; align-items: center; }
  </style>
</head>
<body>
  <div class="boxed">
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <div class="hero-inner">
          <div>
            <span class="badge">✦ AI Generated</span>
            <h1>${content.headline}</h1>
            <p class="sub">${content.subHeadline}</p>
            <p class="desc">${content.productDescription}</p>
            <div class="actions">
              <a href="#pricing" class="btn">${content.cta.text} →</a>
              <a href="#features" class="btn-ghost">Learn more</a>
            </div>
            <p class="sub-cta">${content.cta.subtext}</p>
          </div>
          <div class="hero-card">
            <div class="hero-card-head">Preview</div>
            <div class="hero-card-body">
              ${content.benefits.slice(0,4).map((b) => `<div class="mini"><strong>${b.title}</strong><span>${b.description}</span></div>`).join("")}
            </div>
          </div>
        </div>
      </div>
    </section>

  <!-- Benefits -->
  <section>
    <div class="container">
      <h2>Why choose ${productName}?</h2>
      <p class="subtitle">Here's what makes us different — and better.</p>
      <div class="grid-3">
        ${content.benefits.map((b) => `<div class="card"><div class="icon">✓</div><h3>${b.title}</h3><p>${b.description}</p></div>`).join("")}
      </div>
    </div>
  </section>

  <!-- Features -->
  <section class="alt" id="features">
    <div class="container">
      <h2>Powerful Features</h2>
      <p class="subtitle">Everything you need, nothing you don't.</p>
      <div class="grid-3">
        ${content.features.map((f) => `<div class="card"><div class="icon">⚡</div><h3>${f.title}</h3><p>${f.description}</p></div>`).join("")}
      </div>
    </div>
  </section>

  <!-- Social Proof -->
  <section>
    <div class="container">
      <h2>What our customers say</h2>
      <p class="subtitle">Don't just take our word for it.</p>
      <div class="grid-3">
        ${content.socialProof
      .map(
        (t) => `<div class="card">
          <div class="stars">★★★★★</div>
          <p style="font-size:13px;color:rgba(245,245,245,0.6);margin-bottom:16px;font-style:italic;">"${t.quote}"</p>
          <span class="avatar">${t.name.charAt(0)}</span>
          <strong style="font-size:13px;">${t.name}</strong>
          <span style="font-size:12px;color:rgba(245,245,245,0.4);"> · ${t.role}</span>
        </div>`,
      )
      .join("")}
      </div>
    </div>
  </section>

  <!-- Pricing -->
  <section class="alt" id="pricing">
    <div class="container">
      <h2>Simple pricing</h2>
      <p class="subtitle">One price. All features. No surprises.</p>
      <div class="price-card">
        <p class="price-num">${content.pricing.price}</p>
        <p class="price-period">${content.pricing.period}</p>
        <ul class="features-list">
          ${content.pricing.highlights.map((h) => `<li>${h}</li>`).join("")}
        </ul>
        <a href="#" class="btn" style="display:block;text-align:center;">${content.cta.text}</a>
        <p class="sub-cta" style="margin-top:8px;">${content.cta.subtext}</p>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="cta-section">
    <div class="container">
      <h2>Ready to get started with ${productName}?</h2>
      <p style="color:${colors.text2};margin:12px 0 32px;font-size:1.05rem;">Join thousands of satisfied customers. Start today.</p>
      <a href="#" class="btn">${content.cta.text} →</a>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-inner">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="display:inline-block;width:18px;height:18px;border-radius:999px;background:linear-gradient(65deg, ${colors.heroFrom}, ${colors.ctaFrom});"></span>
          <strong style="font-family:Mukta,sans-serif;color:#fff;">${productName}</strong>
        </div>
        <div style="font-size:12px;">© ${new Date().getFullYear()} ${productName}. Generated with SalesCraft.</div>
      </div>
    </div>
  </footer>
  </div>
</body>
</html>`;
}
