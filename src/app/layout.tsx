import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryProvider from "@/components/rect-query-provider";
import { cn } from "@/lib/utils";
import { SonnerToaster } from "@/components/sonner-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "SalesCraft — AI Sales Page Generator",
        template: "%s | SalesCraft",
    },
    description:
        "Transform raw product information into compelling, conversion-optimized sales pages instantly with AI.",
    keywords: ["AI", "sales page", "copywriting", "marketing", "landing page generator"],
    openGraph: {
        title: "SalesCraft — AI Sales Page Generator",
        description: "Transform product info into persuasive sales pages with AI.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn("font-sans", inter.variable)} suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TooltipProvider>
                        <ReactQueryProvider>
                            {children}
                            <ReactQueryDevtools initialIsOpen={false} />
                            <SonnerToaster />
                        </ReactQueryProvider>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
