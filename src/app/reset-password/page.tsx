import Link from "next/link";
import type { Metadata } from "next";

import ResetPasswordForm from "@/components/ResetPasswordForm";
import { getSessionProfile } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "Set a new password — The Rich Reporter",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage() {
  // Arriving here without a session means the link expired, was already used,
  // or someone reached the URL directly.
  const { user } = await getSessionProfile();

  return (
    <main className="mx-auto w-full max-w-md px-6 pb-28 pt-32 md:px-10">
      <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">Membership</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)]">
        Set a new password
      </h1>

      <div className="mt-10 border border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-10 md:px-8">
        {user ? (
          <ResetPasswordForm />
        ) : (
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              This reset link is no longer valid. Links expire after a short while and can only be
              used once.
            </p>
            <Link
              href="/forgot-password"
              className="inline-block border border-[var(--champagne)]/60 bg-[var(--champagne)] px-8 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--bg-deep)] transition-opacity hover:opacity-90"
            >
              Request a new link
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
