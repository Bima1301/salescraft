import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/index";
import { salesPages } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  PlusCircle,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  Layers,
} from "lucide-react";
import { formatDistanceToNow } from "@/lib/utils";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  const pages = await db
    .select()
    .from(salesPages)
    .where(eq(salesPages.userId, user.id))
    .orderBy(desc(salesPages.createdAt))
    .limit(5);

  const totalPages = pages.length;

  const templateCounts = pages.reduce(
    (acc, p) => {
      acc[p.template] = (acc[p.template] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <main className="flex-1 p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome back, {user.name?.split(" ")[0] ?? "there"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Here&apos;s an overview of your SalesCraft workspace.
            </p>
          </div>
          <Button
            asChild
            className="bg-[var(--color-secondary-1)] text-white border-0 hover:bg-[var(--color-secondary-2)] shrink-0"
          >
            <Link href="/dashboard/sales-pages/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Page
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-muted-foreground">
                Total Pages
              </p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary-1)]/10">
                <FileText className="h-4 w-4 text-[var(--color-primary-1)]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">{totalPages}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Sales pages created
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-muted-foreground">
                Templates
              </p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                <Layers className="h-4 w-4 text-violet-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {Object.keys(templateCounts).length || 0}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Different templates used
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-muted-foreground">
                AI Generations
              </p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">{totalPages}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Pages generated with AI
            </p>
          </div>
        </div>

        {/* Recent Pages */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Recent pages
            </h2>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
            >
              <Link href="/dashboard/sales-pages">
                View all
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {pages.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-primary-1)]/20 bg-[var(--color-primary-1)]/5">
                <Sparkles className="h-6 w-6 text-[var(--color-primary-1)]" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">
                No sales pages yet
              </h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                Create your first AI-powered sales page in seconds. Just enter
                your product details and let SalesCraft do the rest.
              </p>
              <Button
                asChild
                className="bg-[var(--color-secondary-1)] text-white border-0 hover:bg-[var(--color-secondary-2)]"
              >
                <Link href="/dashboard/sales-pages/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create your first page
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {pages.map((page) => (
                <Link
                  key={page.id}
                  href={`/dashboard/sales-pages/${page.id}`}
                  className="rounded-lg border border-border bg-card p-4 flex items-center gap-4 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary-1)]/10 border border-[var(--color-primary-1)]/20 shrink-0">
                    <FileText className="h-5 w-5 text-[var(--color-primary-1)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-foreground group-hover:text-[var(--color-primary-1)] transition-colors">
                      {page.productName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {page.targetAudience}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant="secondary" className="capitalize text-xs">
                      {page.template}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(page.createdAt))}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[var(--color-primary-1)] transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Quick actions
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/dashboard/sales-pages/new"
              className="rounded-lg border border-border bg-card p-5 flex items-center gap-4 hover:shadow-md transition-all group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-secondary-1)] shrink-0">
                <PlusCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground group-hover:text-[var(--color-primary-1)] transition-colors">
                  Create sales page
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Generate AI copy for your product
                </p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-[var(--color-primary-1)] transition-colors" />
            </Link>

            <Link
              href="/dashboard/sales-pages"
              className="rounded-lg border border-border bg-card p-5 flex items-center gap-4 hover:shadow-md transition-all group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20 shrink-0">
                <FileText className="h-5 w-5 text-violet-500" />
              </div>
              <div>
                <p className="font-medium text-foreground group-hover:text-[var(--color-primary-1)] transition-colors">
                  View all pages
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Manage your saved sales pages
                </p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-[var(--color-primary-1)] transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
