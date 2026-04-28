import { PublicSalesPagePreview } from "@/components/public-sales-page-preview";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Sales Page Preview",
};

export default async function PublicSalesPagePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    const proto = h.get("x-forwarded-proto") ?? "http";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? (host ? `${proto}://${host}` : "");

    if (!baseUrl) return notFound();

    const res = await fetch(`${baseUrl}/api/sales-pages/public/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) return notFound();

    const page = (await res.json()) as {
        id: string;
        productName: string;
        template: string;
        generatedContent: unknown;
        updatedAt: string;
    };

    return <PublicSalesPagePreview page={page} />;
}

