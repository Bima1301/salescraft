"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Settings,
    LogOut,
    PlusCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Sales Pages", href: "/dashboard/sales-pages", icon: FileText },
    { label: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar({ user }: { user: { name: string; email: string } }) {
    const pathname = usePathname();
    const router = useRouter();
    const { isMobile, setOpenMobile, state } = useSidebar();

    async function handleLogout() {
        await authClient.signOut();
        router.push("/login");
    }

    const closeMobile = () => {
        if (isMobile) setOpenMobile(false);
    };

    const isActive = (href: string) =>
        href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(href);

    return (
        <Sidebar
            collapsible="icon"
            className="bg-white border-r border-[#E2E8ED]"
        >
            <SidebarHeader className={cn("border-b border-[#E2E8ED] py-5", state === "expanded" ? "px-5" : "px-2")}>
                <div className={cn("flex items-center gap-2.5", state === "expanded" ? "" : "justify-center")}>
                    <svg
                        width="32"
                        height="22"
                        viewBox="0 0 48 32"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient
                                x1="0%"
                                y1="100%"
                                y2="0%"
                                id="app-sidebar-logo-a"
                            >
                                <stop
                                    stopColor="#007CFE"
                                    stopOpacity="0"
                                    offset="0%"
                                />
                                <stop stopColor="#007DFF" offset="100%" />
                            </linearGradient>
                            <linearGradient
                                x1="100%"
                                y1="50%"
                                x2="0%"
                                y2="50%"
                                id="app-sidebar-logo-b"
                            >
                                <stop
                                    stopColor="#FF4F7A"
                                    stopOpacity="0"
                                    offset="0%"
                                />
                                <stop stopColor="#FF4F7A" offset="100%" />
                            </linearGradient>
                        </defs>
                        <g fill="none" fillRule="evenodd">
                            <rect
                                fill="url(#app-sidebar-logo-a)"
                                width="32"
                                height="32"
                                rx="16"
                            />
                            <rect
                                fill="url(#app-sidebar-logo-b)"
                                x="16"
                                width="32"
                                height="32"
                                rx="16"
                            />
                        </g>
                    </svg>
                    {state === "expanded" && (
                        <span
                            className="text-base font-bold text-[#1F2B35]"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            SalesCraft
                        </span>
                    )}
                </div>
            </SidebarHeader>

            <SidebarContent className="px-0 py-4">
                <SidebarGroup className="p-0">
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1 px-3">
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive(item.href)}
                                        className="h-11 w-full justify-start rounded-sm px-4 text-[15px] data-[active=true]:bg-[#0081F6]/10 data-[active=true]:text-[#0081F6] hover:bg-[#F6F8FA] hover:text-[#1F2B35]"
                                        tooltip={item.label}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={closeMobile}
                                            style={{
                                                fontFamily:
                                                    "var(--font-heading)",
                                            }}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <div className="px-3 pt-4">
                    <SidebarMenu className="gap-1">
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className="h-11 w-full justify-start rounded-sm px-4 text-[15px] text-white gradient-secondary btn-shadow-pink hover:opacity-90"
                                tooltip="New Sales Page"
                            >
                                <Link
                                    href="/dashboard/sales-pages/new"
                                    onClick={closeMobile}
                                    style={{
                                        fontFamily: "var(--font-heading)",
                                    }}
                                >
                                    <PlusCircle className="h-4 w-4" />
                                    <span>New Sales Page</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </div>
            </SidebarContent>

            <SidebarFooter className="mt-auto border-t border-[#E2E8ED] p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleLogout}
                            className="rounded-sm text-[#6F8394] hover:bg-[#F6F8FA] hover:text-[#1F2B35]"
                            tooltip="Sign out"
                        >
                            <LogOut className="h-4 w-4" />
                            <span style={{ fontFamily: "var(--font-heading)" }}>
                                Sign out
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}

