import Link from "next/link";
import type { Metadata } from "next";

import TicketNumbers from "@/components/TicketNumbers";
import { getSessionProfile } from "@/app/actions/auth";
import { getEntriesByPaymentIntent, getMyEntries } from "@/lib/entries";
import { getDictionary } from "@/i18n/getDictionary";

export const metadata: Metadata = {
  title: "Payment successful — The Rich Reporter",
};

type PageProps = {
  searchParams: Promise<{ payment_intent?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { dict } = await getDictionary();
  const { user } = await getSessionProfile();
  const { payment_intent: paymentIntent } = await searchParams;

  // Stripe appends payment_intent to the return_url, which pins the receipt to
  // exactly what was just bought. The in-page confirmation flow does not always
  // redirect, so fall back to everything the member holds.
  const entries = user
    ? paymentIntent
      ? await getEntriesByPaymentIntent(user.id, paymentIntent)
      : await getMyEntries(user.id)
    : [];

  const justBought = Boolean(paymentIntent) && entries.length > 0;
  const total = entries.reduce((n, e) => n + e.ticketNumbers.length, 0);

  return (
    <main className="mx-auto w-full max-w-2xl px-6 pb-24 pt-32 md:px-10">
      <div className="border border-[var(--border)] bg-[var(--bg-elevated)] px-8 py-12 md:px-10">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
            {dict.checkoutConfirmed}
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-wide text-[var(--fg)] md:text-4xl">
            {dict.checkoutEntered}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
            {dict.checkoutSuccessBody}
          </p>
        </div>

        {entries.length > 0 ? (
          <section className="mt-10 border-t border-[var(--border)] pt-10" aria-labelledby="numbers">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2
                id="numbers"
                className="font-[family-name:var(--font-display)] text-xl tracking-wide text-[var(--fg)]"
              >
                {justBought ? "Your ticket numbers" : "Your entries"}
              </h2>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--champagne)]">
                {total.toLocaleString("en-US")} ticket{total === 1 ? "" : "s"}
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              Each number below is uniquely yours for that competition and cannot be issued twice.
              Keep them for your records — they are also on your account page.
            </p>
            <div className="mt-8">
              <TicketNumbers entries={entries} />
            </div>
          </section>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 border-t border-[var(--border)] pt-10">
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
