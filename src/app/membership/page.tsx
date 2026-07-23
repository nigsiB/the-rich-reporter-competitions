import MembershipForm from "@/components/MembershipForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Membership — The Rich Reporter",
  description: "Join The Rich Reporter Competitions. Membership required to enter exclusive draws.",
};

export default function MembershipPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-28 pt-32 md:px-10">
      <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">Membership</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)] md:text-5xl">
        Join the circle
      </h1>
      <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
        Create your member profile to enter competitions. We capture the details required for
        eligibility, prize fulfilment, and U.S. sweepstakes compliance.
      </p>
      <p className="mt-3 text-sm text-[var(--muted)]">
        Already a member?{" "}
        <Link href="/login" className="text-[var(--champagne)] underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>

      <div className="mt-14 border border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-10 md:px-10 md:py-12">
        <MembershipForm />
      </div>
    </main>
  );
}
