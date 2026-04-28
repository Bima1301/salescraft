"use client";

import Link from "next/link";
import { SalesPagePreview } from "@/app/(protected)/dashboard/sales-pages/_components/sales-page-preview";
import type { GeneratedContent, SalesPage } from "@/app/(protected)/dashboard/sales-pages/_server/type";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function PublicSalesPagePreview({
    page,
}: {
    page: {
        id: string;
        productName: string;
        template: string;
        generatedContent: unknown;
    };
}) {
    const hydratedPage = {
        id: page.id,
        productName: page.productName,
        template: page.template,
        generatedContent: page.generatedContent,
    } as unknown as SalesPage;

    return (
        <div className="relative">
            {/* minimal overlay controls */}
            <div className="pointer-events-none fixed left-4 top-4 z-50 flex gap-2">
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="pointer-events-auto rounded-xl bg-white/90 backdrop-blur border-[#E2E8ED] shadow-sm"
                >
                    <Link href="/" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Home
                    </Link>
                </Button>
            </div>

            <SalesPagePreview
                page={hydratedPage}
                content={page.generatedContent as GeneratedContent}
            />
        </div>
    );
}

