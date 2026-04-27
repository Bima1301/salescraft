import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { DashboardNav } from "@/components/dashboard-nav";

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

    return (
        <div className="flex min-h-screen bg-background">
            <DashboardNav user={user} />
            <div className="flex flex-1 flex-col">
                {children}
            </div>
        </div>
    );
}
