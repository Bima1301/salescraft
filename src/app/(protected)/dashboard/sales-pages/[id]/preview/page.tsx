import type { Metadata } from "next";
import { SalesPageFullPreview } from "../../_components/sales-page-full-preview";

export const metadata: Metadata = {
    title: "Full Preview",
};

export default async function SalesPageFullPreviewPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <SalesPageFullPreview id={id} />;
}

