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
        <div className="mx-auto max-w-6xl space-y-6 py-5 w-full py-5 w-full">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1
                        className="text-2xl font-bold tracking-tight text-[#1F2B35]"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Welcome back, {user.name?.split(" ")[0] ?? "there"}
                    </h1>
                    <p className="mt-1 text-sm text-[#6F8394]">
                        Here&apos;s an overview of your SalesCraft workspace.
                    </p>
                </div>
                <Button
                    asChild
                    className="gradient-secondary text-white border-0 hover:opacity-90 btn-shadow-pink shrink-0"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    <Link href="/dashboard/sales-pages/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Page
                    </Link>
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-sm bg-white card-shadow p-5">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-[#6F8394]">Total Pages</p>
                        <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#0081F6]/10">
                            <FileText className="h-4 w-4 text-[#0081F6]" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-[#1F2B35]"
                        style={{ fontFamily: "var(--font-heading)" }}>{totalPages}</p>
                    <p className="mt-1 text-xs text-[#6F8394]">Sales pages created</p>
                </div>

                <div className="rounded-sm bg-white card-shadow p-5">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-[#6F8394]">Templates</p>
                        <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#FF4D79]/10">
                            <Layers className="h-4 w-4 text-[#FF4D79]" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-[#1F2B35]"
                        style={{ fontFamily: "var(--font-heading)" }}>
                        {Object.keys(templateCounts).length || 0}
                    </p>
                    <p className="mt-1 text-xs text-[#6F8394]">Different templates used</p>
                </div>

                <div className="rounded-sm bg-white card-shadow p-5">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-[#6F8394]">AI Generations</p>
                        <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#5FFAD0]/20">
                            <TrendingUp className="h-4 w-4 text-emerald-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-[#1F2B35]"
                        style={{ fontFamily: "var(--font-heading)" }}>{totalPages}</p>
                    <p className="mt-1 text-xs text-[#6F8394]">Pages generated with AI</p>
                </div>
            </div>

            {/* Recent Pages */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2
                        className="text-lg font-semibold text-[#1F2B35]"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Recent pages
                    </h2>
                    <Button asChild variant="ghost" size="sm" className="text-[#6F8394] hover:text-[#1F2B35]">
                        <Link href="/dashboard/sales-pages">
                            View all
                            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Link>
                    </Button>
                </div>

                {pages.length === 0 ? (
                    <div className="rounded-sm bg-white card-shadow p-10 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#0081F6]/20 bg-[#0081F6]/5">
                            <Sparkles className="h-6 w-6 text-[#0081F6]" />
                        </div>
                        <h3
                            className="font-semibold mb-2 text-[#1F2B35]"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            No sales pages yet
                        </h3>
                        <p className="text-sm text-[#6F8394] mb-6 max-w-sm mx-auto">
                            Create your first AI-powered sales page in seconds. Just enter your product
                            details and let SalesCraft do the rest.
                        </p>
                        <Button
                            asChild
                            className="gradient-secondary text-white border-0 hover:opacity-90 btn-shadow-pink"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            <Link href="/dashboard/sales-pages/new">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Create your first page
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {pages.map((page) => (
                            <Link
                                key={page.id}
                                href={`/dashboard/sales-pages/${page.id}`}
                                className="rounded-sm bg-white card-shadow p-4 flex items-center gap-4 hover:translate-y-[-1px] transition-transform duration-200 group"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#0081F6]/10 shrink-0">
                                    <FileText className="h-5 w-5 text-[#0081F6]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p
                                        className="font-semibold truncate text-[#1F2B35] group-hover:text-[#0081F6] transition-colors"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {page.productName}
                                    </p>
                                    <p className="text-xs text-[#6F8394] truncate mt-0.5">{page.targetAudience}</p>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <Badge variant="secondary" className="capitalize text-xs">
                                        {page.template}
                                    </Badge>
                                    <span className="text-xs text-[#6F8394] flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {formatDistanceToNow(new Date(page.createdAt))}
                                    </span>
                                </div>
                                <ArrowRight className="h-4 w-4 text-[#6F8394] group-hover:text-[#0081F6] transition-colors shrink-0" />
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div>
                <h2
                    className="text-lg font-semibold mb-4 text-[#1F2B35]"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Quick actions
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Link
                        href="/dashboard/sales-pages/new"
                        className="rounded-sm bg-white card-shadow p-5 flex items-center gap-4 hover:translate-y-[-1px] transition-transform duration-200 group"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-sm gradient-secondary shrink-0">
                            <PlusCircle className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p
                                className="font-semibold text-[#1F2B35] group-hover:text-[#0081F6] transition-colors"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Create sales page
                            </p>
                            <p className="text-xs text-[#6F8394] mt-0.5">Generate AI copy for your product</p>
                        </div>
                        <ArrowRight className="ml-auto h-4 w-4 text-[#6F8394] group-hover:text-[#0081F6] transition-colors" />
                    </Link>

                    <Link
                        href="/dashboard/sales-pages"
                        className="rounded-sm bg-white card-shadow p-5 flex items-center gap-4 hover:translate-y-[-1px] transition-transform duration-200 group"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#0081F6]/10 border border-[#0081F6]/20 shrink-0">
                            <FileText className="h-5 w-5 text-[#0081F6]" />
                        </div>
                        <div>
                            <p
                                className="font-semibold text-[#1F2B35] group-hover:text-[#0081F6] transition-colors"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                View all pages
                            </p>
                            <p className="text-xs text-[#6F8394] mt-0.5">Manage your saved sales pages</p>
                        </div>
                        <ArrowRight className="ml-auto h-4 w-4 text-[#6F8394] group-hover:text-[#0081F6] transition-colors" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
