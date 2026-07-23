import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official Rules — The Rich Reporter Competitions",
};

export default function OfficialRulesPage() {
  return (
    <article className="prose-invert space-y-8 text-sm leading-relaxed text-[var(--muted)]">
      <header>
        <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">Legal</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)]">
          Official Rules
        </h1>
        <p className="mt-3 text-xs uppercase tracking-[0.18em]">Last updated: July 2026</p>
      </header>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          1. Sponsor
        </h2>
        <p>
          Competitions are sponsored by Rich Reporter Magazine (“Sponsor”). Specific prize details,
          entry caps, and draw dates appear on each competition page.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          2. Eligibility
        </h2>
        <p>
          Open to legal residents of the United States (and where expressly stated, Canada excluding
          Quebec) who are 18 years of age or older at the time of entry. Employees of Sponsor and
          their immediate family members are not eligible. Void where prohibited.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          3. How to enter
        </h2>
        <p>
          Paid entry: registered members may purchase entries subject to the competition’s entry
          limit and pricing. Alternative Method of Entry (AMOE): free mail-in forms are available
          at /amoe. Limit one free mail-in entry per outer envelope unless a competition page states
          otherwise. Purchase does not improve odds of winning relative to a free entry.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          4. Winner selection & odds
        </h2>
        <p>
          Winners are selected at random from all eligible entries after the stated draw date. Odds
          depend on the number of eligible entries received. Sponsor’s decisions are final.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          5. Prizes & taxes
        </h2>
        <p>
          Prizes are as described on the competition page. Winners are responsible for all
          applicable taxes and any costs not expressly included. Sponsor may require an affidavit of
          eligibility and publicity release where lawful.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          6. General
        </h2>
        <p>
          Sponsor reserves the right to cancel, suspend, or modify a competition if fraud,
          technical failures, or any other factor impairs integrity. By entering, you agree to these
          Official Rules and Sponsor’s Privacy Policy.
        </p>
      </section>

      <p className="text-xs">
        This page is a working legal stub for launch review. Counsel should finalize jurisdiction-
        specific language before paid public launch.
      </p>
    </article>
  );
}
