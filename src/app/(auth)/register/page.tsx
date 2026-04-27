import { RegisterForm } from "./_components/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-6">
      <RegisterForm />
    </div>
  );
}
