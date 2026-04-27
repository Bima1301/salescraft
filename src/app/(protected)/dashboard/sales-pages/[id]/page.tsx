import { SalesPageDetail } from "../_components/sales-page-detail";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sales Page Detail",
};

export default async function SalesPageDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <SalesPageDetail id={id} />;
}
