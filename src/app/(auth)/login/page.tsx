import { LoginForm } from "./_components/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-6">
      <LoginForm />
    </div>
  );
}
