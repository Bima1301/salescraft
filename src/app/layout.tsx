import type { Metadata } from "next";
import { Mukta, Hind_Vadodara } from "next/font/google";
import "./globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryProvider from "@/components/rect-query-provider";
import { cn } from "@/lib/utils";
import { SonnerToaster } from "@/components/sonner-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const hindVadodara = Hind_Vadodara({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-sans",
    display: "swap",
});

const mukta = Mukta({
    subsets: ["latin"],
    weight: ["500", "700"],
    variable: "--font-heading",
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
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(hindVadodara.variable, mukta.variable)}
            suppressHydrationWarning
        >
            <body className={cn(hindVadodara.className, "antialiased")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
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
