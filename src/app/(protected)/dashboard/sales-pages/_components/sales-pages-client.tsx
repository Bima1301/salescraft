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
            className="rounded-sm bg-white card-shadow p-5 space-y-4"
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
      <div className="rounded-sm bg-white card-shadow p-10 text-center">
        <p className="text-[#6F8394]">Failed to load sales pages. Please try again.</p>
      </div>
    );
  }

  if (!pages || pages.length === 0) {
    return (
      <div className="rounded-sm bg-white card-shadow p-14 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#0081F6]/20 bg-[#0081F6]/5">
          <Sparkles className="h-7 w-7 text-[#0081F6]" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-[#1F2B35]">No sales pages yet</h3>
        <p className="text-sm text-[#6F8394] mb-6 max-w-sm mx-auto">
          Create your first AI-powered sales page. Enter your product details
          and let SalesCraft craft the perfect pitch.
        </p>
        <Button
          asChild
          className="gradient-secondary text-white border-0 hover:opacity-90 btn-shadow-pink"
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
        className="flex w-full max-w-sm rounded-sm border border-[#E2E8ED] bg-white px-4 py-2.5 text-sm text-[#1F2B35] focus:outline-none focus:border-[#0081F6] focus:ring-2 focus:ring-[#0081F6]/20 placeholder:text-[#6F8394]"
      />

      {filtered && filtered.length === 0 ? (
        <div className="rounded-sm bg-white card-shadow p-10 text-center">
          <SearchX className="h-10 w-10 text-[#6F8394] mx-auto mb-3" />
          <p className="text-[#6F8394] text-sm">
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
