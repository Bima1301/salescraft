"use client";

import Link from "next/link";
import { useSalesPage } from "../_server";
import { SalesPagePreview } from "./sales-page-preview";
import type { GeneratedContent } from "../_server/type";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

export function SalesPageFullPreview({ id }: { id: string }) {
    const { data: page, isLoading } = useSalesPage(id);

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-[#F6F8FA]">
                <div className="flex items-center gap-2 text-sm text-[#6F8394]">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading preview...
                </div>
            </div>
        );
    }

    if (!page || !page.generatedContent) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F6F8FA] px-6 text-center">
                <p className="text-sm text-[#6F8394]">No generated content found.</p>
                <Button asChild variant="link" className="mt-2">
                    <Link href={`/dashboard/sales-pages/${id}`}>Go back</Link>
                </Button>
            </div>
        );
    }

    const content = page.generatedContent as GeneratedContent;

    return (
        <div className="relative">
            {/* Minimal top-left back button for full-page preview */}
            <div className="pointer-events-none fixed left-4 top-4 z-50">
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="pointer-events-auto rounded-xl bg-white/90 backdrop-blur border-[#E2E8ED] shadow-sm"
                >
                    <Link href={`/dashboard/sales-pages/${id}`} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>
                </Button>
            </div>

            <SalesPagePreview page={page} content={content} />
        </div>
    );
}

