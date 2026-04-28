"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const inputCls = cn(
    "flex h-11 w-full rounded-sm border border-[#E2E8ED] bg-white pl-10 pr-4 text-sm text-[#1F2B35]",
    "transition-colors placeholder:text-[#6F8394]",
    "focus:outline-none focus:border-[#0081F6] focus:ring-2 focus:ring-[#0081F6]/20",
);

export function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const { error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/dashboard",
        });

        if (error) {
            setError(error.message ?? "Login failed. Please check your credentials.");
            setIsSubmitting(false);
            return;
        }

        router.push("/dashboard");
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
        >
            <div className="text-center mb-8">
                <h1
                    className="text-[28px] font-bold tracking-tight text-[#1F2B35]"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Welcome back
                </h1>
                <p className="mt-2 text-sm text-[#6F8394]">
                    Sign in to continue to SalesCraft
                </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
                <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-semibold text-[#1F2B35]">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6F8394]" />
                        <input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            className={inputCls}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="password" className="text-sm font-semibold text-[#1F2B35]">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6F8394]" />
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            required
                            autoComplete="current-password"
                            className={cn(inputCls, "pr-10")}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F8394] hover:text-[#1F2B35] transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-3">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 rounded-sm text-sm font-bold text-white gradient-secondary btn-shadow-pink disabled:opacity-60 transition-opacity hover:opacity-90"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Signing in...
                        </span>
                    ) : (
                        "Sign in"
                    )}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#6F8394]">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[#0081F6] font-semibold hover:underline underline-offset-4">
                    Create one free
                </Link>
            </p>
        </motion.div>
    );
}
