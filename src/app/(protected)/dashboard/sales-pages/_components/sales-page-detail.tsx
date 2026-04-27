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
            {/* Regenerate dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl gap-1.5"
                onClick={() => setRegenerateOpen(!regenerateOpen)}
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
              {regenerateOpen && (
                <div className="absolute right-0 top-full mt-1 z-50 w-44 rounded-lg border border-border bg-card shadow-lg overflow-hidden">
                  {regenerateSections.map((s) => (
                    <button
                      key={s.id}
                      className={cn(
                        "flex w-full items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-left",
                        s.id === "all" && "font-medium text-primary",
                      )}
                      onClick={async () => {
                        setRegenerateOpen(false);
                        await regenerateMutation.mutateAsync(
                          s.id === "all" ? undefined : s.id,
                        );
                      }}
                    >
                      {s.id === "all" && <Sparkles className="h-3.5 w-3.5" />}
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
  const themeColors = {
    modern: { from: "#7c3aed", to: "#4f46e5", accent: "#8b5cf6" },
    bold: { from: "#ea580c", to: "#dc2626", accent: "#f97316" },
    elegant: { from: "#059669", to: "#0d9488", accent: "#10b981" },
  };
  const colors =
    themeColors[template as keyof typeof themeColors] ?? themeColors.modern;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${productName} — Sales Page</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0f; color: #f5f5f5; line-height: 1.6; }
    .container { max-width: 900px; margin: 0 auto; padding: 0 24px; }
    /* Hero */
    .hero { background: linear-gradient(135deg, #1e1b4b, #0f172a); padding: 80px 24px; text-align: center; }
    .badge { display: inline-block; background: rgba(124,58,237,0.2); border: 1px solid rgba(124,58,237,0.4); color: #a78bfa; padding: 6px 16px; border-radius: 999px; font-size: 12px; margin-bottom: 24px; }
    .hero h1 { font-size: 3rem; font-weight: 900; margin-bottom: 16px; }
    .hero .sub { font-size: 1.25rem; color: ${colors.accent}; margin-bottom: 12px; font-weight: 600; }
    .hero .desc { color: rgba(245,245,245,0.6); max-width: 520px; margin: 0 auto 32px; }
    .btn { display: inline-block; background: linear-gradient(135deg, ${colors.from}, ${colors.to}); color: white; padding: 14px 36px; border-radius: 12px; font-weight: 700; font-size: 15px; text-decoration: none; border: none; cursor: pointer; }
    .btn-ghost { display: inline-block; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); color: white; padding: 14px 36px; border-radius: 12px; font-weight: 600; font-size: 15px; text-decoration: none; margin-left: 12px; }
    .sub-cta { color: rgba(245,245,245,0.4); font-size: 12px; margin-top: 8px; }
    /* Sections */
    section { padding: 72px 24px; }
    section.alt { background: rgba(255,255,255,0.02); }
    section h2 { text-align: center; font-size: 2rem; font-weight: 800; margin-bottom: 8px; }
    section .subtitle { text-align: center; color: rgba(245,245,245,0.5); margin-bottom: 40px; }
    /* Cards */
    .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
    .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; }
    .icon { width: 40px; height: 40px; background: linear-gradient(135deg, ${colors.from}, ${colors.to}); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; font-size: 18px; }
    .card h3 { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
    .card p { font-size: 13px; color: rgba(245,245,245,0.5); }
    /* Stars */
    .stars { color: #facc15; margin-bottom: 10px; font-size: 13px; letter-spacing: 2px; }
    /* Price */
    .price-card { background: rgba(255,255,255,0.04); border: 2px solid ${colors.accent}33; border-radius: 20px; padding: 40px; text-align: center; max-width: 380px; margin: 0 auto; }
    .price-num { font-size: 3.5rem; font-weight: 900; color: ${colors.accent}; }
    .price-period { color: rgba(245,245,245,0.4); font-size: 13px; }
    .features-list { list-style: none; margin: 24px 0; text-align: left; }
    .features-list li { padding: 6px 0; font-size: 14px; color: rgba(245,245,245,0.7); }
    .features-list li::before { content: '✓  '; color: ${colors.accent}; font-weight: 700; }
    /* CTA */
    .cta-section { background: linear-gradient(135deg, ${colors.from}22, ${colors.to}22); text-align: center; padding: 80px 24px; }
    .avatar { width: 36px; height: 36px; background: linear-gradient(135deg, ${colors.from}, ${colors.to}); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: 700; margin-right: 10px; vertical-align: middle; }
  </style>
</head>
<body>
  <!-- Hero -->
  <section class="hero">
    <div class="container">
      <span class="badge">✦ AI-Powered Sales Page</span>
      <h1>${content.headline}</h1>
      <p class="sub">${content.subHeadline}</p>
      <p class="desc">${content.productDescription}</p>
      <a href="#pricing" class="btn">${content.cta.text}</a>
      <a href="#features" class="btn-ghost">Learn more</a>
      <p class="sub-cta">${content.cta.subtext}</p>
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
      <p style="color:${colors.accent};margin:12px 0 32px;font-size:1.1rem;">Join thousands of satisfied customers. Start today.</p>
      <a href="#" class="btn">${content.cta.text} →</a>
    </div>
  </section>
</body>
</html>`;
}
