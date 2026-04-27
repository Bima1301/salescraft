"use client";

import { useRouter } from "next/navigation";
import { SalesPageForm } from "../_components/sales-page-form";
import { useCreateSalesPage } from "../_server";
import type { SalesPageBodyInput } from "../_server/type";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewSalesPagePage() {
  const router = useRouter();
  const createMutation = useCreateSalesPage();

  async function handleSubmit(data: SalesPageBodyInput) {
    const page = await createMutation.mutateAsync(data);
    if (page) {
      router.push(`/dashboard/sales-pages/${page.id}`);
    }
  }

  return (
    <main className="flex-1 p-6 lg:p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="rounded-xl">
            <Link href="/dashboard/sales-pages">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">
                Create Sales Page
              </h1>
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--color-secondary-1)]">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in your product details and AI will generate a full sales
              page.
            </p>
          </div>
        </div>

        <SalesPageForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
        />
      </div>
    </main>
  );
}
