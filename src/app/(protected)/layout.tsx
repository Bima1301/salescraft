import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    const user = {
        name: session.user.name ?? "User",
        email: session.user.email ?? "",
    };

    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar user={user} />
            <SidebarInset className="bg-[#F6F8FA]">
                <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-[#E2E8ED] bg-white/90 px-4 backdrop-blur md:h-16">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <div
                            className="text-sm font-semibold text-[#1F2B35]"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            SalesCraft
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex flex-col items-end leading-tight">
                            <span
                                className="text-sm font-semibold text-[#1F2B35] max-w-[180px] truncate"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {user.name}
                            </span>
                            <span className="text-xs text-[#6F8394] max-w-[220px] truncate">
                                {user.email}
                            </span>
                        </div>
                        <div
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0081F6] text-white text-xs font-bold shrink-0"
                            style={{ fontFamily: "var(--font-heading)" }}
                            aria-label="User"
                            title={user.name}
                        >
                            {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                        </div>
                    </div>
                </header>
                <div className="md:px-5 px-3">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
