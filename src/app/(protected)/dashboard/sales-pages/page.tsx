import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { SalesPagesClient } from "./_components/sales-pages-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Pages",
};

export default function SalesPagesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 py-5 w-full">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales Pages</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage all your AI-generated sales pages.
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

      <SalesPagesClient />
    </div>
  );
}
