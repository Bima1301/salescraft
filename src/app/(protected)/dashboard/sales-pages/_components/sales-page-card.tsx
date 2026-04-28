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
  modern: "text-[#0081F6] bg-[#0081F6]/10",
  bold: "text-[#FF4D79] bg-[#FF4D79]/10",
  elegant: "text-emerald-600 bg-[#5FFAD0]/20",
};

export function SalesPageCard({ page }: SalesPageCardProps) {
  const deleteMutation = useDeleteSalesPage();

  return (
    <div className="rounded-sm bg-white card-shadow p-5 flex flex-col gap-4 hover:translate-y-[-2px] transition-transform duration-200 group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-sm shrink-0 ${templateColors[page.template] ?? "text-[#0081F6] bg-[#0081F6]/10"}`}
          >
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold truncate text-[#1F2B35] group-hover:text-[#0081F6] transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}>
              {page.productName}
            </p>
            <p className="text-xs text-[#6F8394] mt-0.5 truncate">
              For: {page.targetAudience}
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="capitalize shrink-0 text-xs">
          {page.template}
        </Badge>
      </div>

      <p className="text-sm text-[#6F8394] line-clamp-2">
        {page.productDescription}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {page.features.slice(0, 3).map((f) => (
          <span
            key={f}
            className="rounded-sm bg-[#F6F8FA] border border-[#E2E8ED] px-2 py-0.5 text-xs text-[#6F8394]"
          >
            {f}
          </span>
        ))}
        {page.features.length > 3 && (
          <span className="rounded-sm bg-[#F6F8FA] border border-[#E2E8ED] px-2 py-0.5 text-xs text-[#6F8394]">
            +{page.features.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#E2E8ED]">
        <span className="text-xs text-[#6F8394] flex items-center gap-1">
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
                className="h-8 w-8 rounded-sm text-[#6F8394] hover:text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-sm bg-white card-shadow">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-[#1F2B35]">Delete sales page?</AlertDialogTitle>
                <AlertDialogDescription className="text-[#6F8394]">
                  This will permanently delete &ldquo;{page.productName}&rdquo;
                  and all its generated content. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-sm">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteMutation.mutate(page.id)}
                  className="rounded-sm bg-red-500 text-white hover:bg-red-600"
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
            className="rounded-sm h-8 text-xs gap-1.5 border-[#E2E8ED] text-[#0081F6] hover:bg-[#0081F6]/5"
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
