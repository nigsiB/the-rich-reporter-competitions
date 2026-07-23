import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment successful — The Rich Reporter",
};

export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-[80svh] items-center justify-center px-6 pb-24 pt-28">
      <div className="w-full max-w-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-10 py-14 text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">Confirmed</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-wide text-[var(--fg)] md:text-4xl">
          You are entered
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
          Payment succeeded. Your ticket numbers are secured and a receipt is on its way. Official
          draw details appear in your confirmation email.
        </p>
        <Link
          href="/#competitions"
          className="mt-10 inline-block border border-[var(--border)] px-8 py-3.5 text-[10px] uppercase tracking-[0.24em] text-[var(--fg)] transition-colors hover:border-[var(--champagne)] hover:text-[var(--champagne)]"
        >
          Return to collection
        </Link>
      </div>
    </main>
  );
}
