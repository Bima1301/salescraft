import type { ReactNode } from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        redirect("/dashboard");
    }
    return (
        <div className="min-h-screen bg-[#F6F8FA] flex flex-col">
            {/* Simple nav */}
            <header className="px-6 py-5">
                <div className="max-w-6xl mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2.5 group">
                        <svg width="36" height="24" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient x1="0%" y1="100%" y2="0%" id="auth-logo-a">
                                    <stop stopColor="#007CFE" stopOpacity="0" offset="0%" />
                                    <stop stopColor="#007DFF" offset="100%" />
                                </linearGradient>
                                <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="auth-logo-b">
                                    <stop stopColor="#FF4F7A" stopOpacity="0" offset="0%" />
                                    <stop stopColor="#FF4F7A" offset="100%" />
                                </linearGradient>
                            </defs>
                            <g fill="none" fillRule="evenodd">
                                <rect fill="url(#auth-logo-a)" width="32" height="32" rx="16" />
                                <rect fill="url(#auth-logo-b)" x="16" width="32" height="32" rx="16" />
                            </g>
                        </svg>
                        <span
                            className="text-base font-bold text-[#1F2B35] group-hover:text-[#0081F6] transition-colors"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            SalesCraft
                        </span>
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-[440px] bg-white rounded-sm card-shadow p-8 md:p-10">
                    {children}
                </div>
            </main>

            <footer className="py-6 text-center text-xs text-[#6F8394]">
                © {new Date().getFullYear()} SalesCraft
            </footer>
        </div>
    );
}
