"use client";

import { useSalesPages } from "../_server";
import { SalesPageCard } from "./sales-page-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { PlusCircle, Sparkles, SearchX } from "lucide-react";
import { useState } from "react";

export function SalesPagesClient() {
  const { data: pages, isLoading, isError } = useSalesPages();
  const [search, setSearch] = useState("");

  const filtered = pages?.filter(
    (p) =>
      p.productName.toLowerCase().includes(search.toLowerCase()) ||
      p.targetAudience.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-card p-5 space-y-4"
          >
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-12 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-border bg-card p-10 text-center">
        <p className="text-muted-foreground">
          Failed to load sales pages. Please try again.
        </p>
      </div>
    );
  }

  if (!pages || pages.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-14 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-primary-1)]/20 bg-[var(--color-primary-1)]/5">
          <Sparkles className="h-7 w-7 text-[var(--color-primary-1)]" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No sales pages yet</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
          Create your first AI-powered sales page. Enter your product details
          and let SalesCraft craft the perfect pitch.
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
    );
  }

  return (
    <div className="space-y-5">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by product name or audience..."
        className="flex w-full max-w-sm rounded-md border border-border bg-background px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder:text-muted-foreground"
      />

      {filtered && filtered.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-10 text-center">
          <SearchX className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            No pages match &ldquo;{search}&rdquo;
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(filtered ?? pages).map((page) => (
            <SalesPageCard key={page.id} page={page} />
          ))}
        </div>
      )}
    </div>
  );
}
