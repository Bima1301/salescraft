import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDistanceToNow(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function extractErrorMessage(fallback: string, error: unknown): string {
  if (!error) return fallback;

  const raw = (error as { value?: unknown; message?: string }).value ?? error;

  if (Array.isArray(raw) && raw.length > 0) {
    const first = raw[0] as { message?: string };
    if (typeof first?.message === "string") {
      return first.message;
    }
  }

  if (typeof raw === "string") return raw;
  if (typeof (raw as any).message === "string") return (raw as any).message;

  return fallback;
}