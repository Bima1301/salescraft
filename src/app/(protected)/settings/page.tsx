import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { User, Mail, Calendar, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function Settings() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <main className="flex-1 p-6 lg:p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your account and preferences.
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-lg border border-border bg-card p-6 space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <User className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Profile</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-1)] text-white text-2xl font-black shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
            </div>
            <div>
              <p className="font-semibold text-lg">{user?.name ?? "—"}</p>
              <p className="text-sm text-muted-foreground">
                {user?.email ?? "—"}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-border/40">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email address</p>
                <p className="font-medium">{user?.email ?? "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                <User className="h-4 w-4 text-violet-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Display name</p>
                <p className="font-medium">{user?.name ?? "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                <Calendar className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Member since</p>
                <p className="font-medium">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Security</h2>
          </div>
          <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground">
            <p>
              Your account is secured with email and password authentication via
              Better Auth. Password changes and additional security settings can
              be added here.
            </p>
          </div>
        </div>

        {/* API / OpenAI */}
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center">
              <span className="text-sm font-black gradient-text">AI</span>
            </div>
            <h2 className="font-semibold">AI Configuration</h2>
          </div>
          <div className="rounded-xl bg-muted/50 p-4 text-sm">
            <p className="text-muted-foreground">
              SalesCraft uses{" "}
              <span className="font-medium text-foreground">GPT-4o mini</span>{" "}
              to generate sales page content. The OpenAI API key is configured
              server-side via the{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">
                OPENAI_API_KEY
              </code>{" "}
              environment variable.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
