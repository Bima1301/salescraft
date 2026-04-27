"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type SalesPage } from "../_server/type";
import { formatDistanceToNow } from "@/lib/utils";
import { FileText, Clock, ArrowRight, Trash2 } from "lucide-react";
import { useDeleteSalesPage } from "../_server";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SalesPageCardProps {
  page: SalesPage;
}

const templateColors: Record<string, string> = {
  modern: "text-violet-500 bg-violet-500/10",
  bold: "text-orange-500 bg-orange-500/10",
  elegant: "text-emerald-500 bg-emerald-500/10",
};

export function SalesPageCard({ page }: SalesPageCardProps) {
  const deleteMutation = useDeleteSalesPage();

  return (
    <div className="rounded-lg border border-border bg-card p-5 flex flex-col gap-4 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${templateColors[page.template] ?? "text-[var(--color-primary-1)] bg-[var(--color-primary-1)]/10"}`}
          >
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold truncate group-hover:text-[var(--color-primary-1)] transition-colors">
              {page.productName}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              For: {page.targetAudience}
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="capitalize shrink-0 text-xs">
          {page.template}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2">
        {page.productDescription}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {page.features.slice(0, 3).map((f) => (
          <span
            key={f}
            className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
          >
            {f}
          </span>
        ))}
        {page.features.length > 3 && (
          <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            +{page.features.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {formatDistanceToNow(new Date(page.createdAt))}
        </span>

        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-lg border border-border bg-card">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete sales page?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete &ldquo;{page.productName}&rdquo;
                  and all its generated content. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-md">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteMutation.mutate(page.id)}
                  className="rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            asChild
            size="sm"
            variant="outline"
            className="rounded-md h-8 text-xs gap-1.5"
          >
            <Link href={`/dashboard/sales-pages/${page.id}`}>
              View
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
