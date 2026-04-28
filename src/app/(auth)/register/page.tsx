import { RegisterForm } from "./_components/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function RegisterPage() {
  return (
    <RegisterForm />
  );
}
