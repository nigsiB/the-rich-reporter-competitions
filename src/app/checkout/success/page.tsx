import Link from "next/link";
import { getDictionary } from "@/i18n/getDictionary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment successful — The Rich Reporter",
};

export default async function CheckoutSuccessPage() {
  const { dict } = await getDictionary();

  return (
    <main className="flex min-h-[80svh] items-center justify-center px-6 pb-24 pt-28">
      <div className="w-full max-w-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-10 py-14 text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
          {dict.checkoutConfirmed}
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-wide text-[var(--fg)] md:text-4xl">
          {dict.checkoutEntered}
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
          {dict.checkoutSuccessBody}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#competitions"
            className="inline-block border border-[var(--border)] px-8 py-3.5 text-[10px] uppercase tracking-[0.24em] text-[var(--fg)] transition-colors hover:border-[var(--champagne)] hover:text-[var(--champagne)]"
          >
            {dict.checkoutReturn}
          </Link>
          <Link
            href="/account"
            className="inline-block text-[10px] uppercase tracking-[0.24em] text-[var(--champagne)] transition-colors hover:text-[var(--fg)]"
          >
            {dict.checkoutManageAccount}
          </Link>
        </div>
      </div>
    </main>
  );
}
