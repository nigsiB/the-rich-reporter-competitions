import Link from "next/link";
import { getActiveCompetitions } from "@/lib/competitions";

export default async function AmoeBlock() {
  const { competitions } = await getActiveCompetitions();
  const firstId = competitions[0]?.id;

  return (
    <section
      id="amoe"
      className="scroll-mt-24 border border-[var(--border)] bg-[var(--bg-elevated)] px-8 py-12 md:px-14 md:py-16"
      aria-labelledby="amoe-heading"
    >
      <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
        Legal · United States
      </p>
      <h2
        id="amoe-heading"
        className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-wide text-[var(--fg)] md:text-4xl"
      >
        Alternative Method of Entry
      </h2>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
        No purchase is necessary to enter or win. Download a free mail-in entry form for any active
        competition, complete it by hand, and post it to the address on the form. Limit one free
        entry request per outer envelope, unless official rules state otherwise. Void where
        prohibited.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href={firstId ? `/amoe/${firstId}` : "/amoe"}
          className="border border-[var(--champagne)]/50 px-6 py-3 text-[10px] uppercase tracking-[0.24em] text-[var(--champagne)] transition-colors hover:border-[var(--champagne)] hover:bg-[var(--champagne)] hover:text-[var(--bg-deep)]"
        >
          Download mail-in form
        </Link>
        <Link
          href="/legal/official-rules"
          className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)]"
        >
          Official rules
        </Link>
      </div>
    </section>
  );
}
