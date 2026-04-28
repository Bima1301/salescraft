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
    <div className="mx-auto max-w-6xl space-y-6 py-5 w-full">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1F2B35]"
          style={{ fontFamily: "var(--font-heading)" }}>Settings</h1>
        <p className="mt-1 text-sm text-[#6F8394]">Manage your account and preferences.</p>
      </div>

      <div className="rounded-sm bg-white card-shadow p-6 space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <User className="h-4 w-4 text-[#0081F6]" />
          <h2 className="font-semibold text-[#1F2B35]" style={{ fontFamily: "var(--font-heading)" }}>Profile</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0081F6] text-white text-2xl font-black shrink-0"
            style={{ fontFamily: "var(--font-heading)" }}>
            {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
          </div>
          <div>
            <p className="font-semibold text-lg text-[#1F2B35]">{user?.name ?? "—"}</p>
            <p className="text-sm text-[#6F8394]">{user?.email ?? "—"}</p>
          </div>
        </div>
        <div className="space-y-3 pt-2 border-t border-[#E2E8ED]">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#0081F6]/10">
              <Mail className="h-4 w-4 text-[#0081F6]" />
            </div>
            <div>
              <p className="text-xs text-[#6F8394]">Email address</p>
              <p className="font-medium text-[#1F2B35]">{user?.email ?? "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#FF4D79]/10">
              <User className="h-4 w-4 text-[#FF4D79]" />
            </div>
            <div>
              <p className="text-xs text-[#6F8394]">Display name</p>
              <p className="font-medium text-[#1F2B35]">{user?.name ?? "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#5FFAD0]/20">
              <Calendar className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-[#6F8394]">Member since</p>
              <p className="font-medium text-[#1F2B35]">
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

      <div className="rounded-sm bg-white card-shadow p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-[#0081F6]" />
          <h2 className="font-semibold text-[#1F2B35]" style={{ fontFamily: "var(--font-heading)" }}>Security</h2>
        </div>
        <div className="rounded-sm bg-[#F6F8FA] p-4 text-sm text-[#6F8394]">
          <p>
            Your account is secured with email and password authentication via
            Better Auth. Password changes and additional security settings can be added here.
          </p>
        </div>
      </div>

    </div>
  );
}
