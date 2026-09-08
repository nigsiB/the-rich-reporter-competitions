import type { Metadata } from "next";

import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset your password — The Rich Reporter",
  description: "Request a password reset link for your membership account.",
};

export default function ForgotPasswordPage() {
  return (
    <main className="mx-auto w-full max-w-md px-6 pb-28 pt-32 md:px-10">
      <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">Membership</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)]">
        Reset your password
      </h1>
      <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
        Enter the email address on your account and we will send you a link to set a new password.
      </p>

      <div className="mt-10 border border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-10 md:px-8">
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
