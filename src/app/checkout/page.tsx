import Link from "next/link";

type PageProps = {
  searchParams: Promise<{ session?: string }>;
};

export default async function CheckoutPage({ searchParams }: PageProps) {
  const { session } = await searchParams;
  const ticketCount = session ? session.split(",").filter(Boolean).length : 0;

  return (
    <main className="flex min-h-[80svh] items-center justify-center px-6 pt-28 pb-24">
      <div className="w-full max-w-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-10 py-14 text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
          Checkout
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-wide text-[var(--fg)] md:text-4xl">
          Entries secured
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
          {ticketCount > 0
            ? `${ticketCount} entr${ticketCount === 1 ? "y" : "ies"} held for you. Stripe Custom Elements checkout will complete payment here.`
            : "Stripe Custom Elements checkout will live on this page. Reserve tickets from a competition to begin."}
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
