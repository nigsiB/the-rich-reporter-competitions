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
          entry caps, retail values, cash alternatives, and draw dates appear on each competition
          page.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          2. Eligibility
        </h2>
        <p>
          Open to natural persons aged 18 years or older (or the age of majority in their place of
          residence, if higher) at the time of entry, except where prohibited by law. Employees of
          Sponsor and their immediate family members are not eligible. Void where prohibited.
          Eligibility on any given competition page may be narrowed by jurisdiction; where a page
          does not restrict entry, international participation is permitted subject to local law.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          3. How to enter
        </h2>
        <p>
          Paid entry: registered members may purchase entries subject to the competition’s entry
          limit and pricing (standard entry price USD $0.25 unless a page states otherwise).
          Alternative Method of Entry (AMOE): free mail-in forms are available at /amoe. Limit one
          free mail-in entry per outer envelope unless a competition page states otherwise. Purchase
          does not improve odds of winning relative to a free entry.
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
          5. Prizes, cash alternatives & taxes
        </h2>
        <p>
          Prizes are as described on the competition page. Every prize offers a tax-free cash
          alternative (shown on the competition page and typically set below approximate retail
          value — for example, an iPhone with ~USD $1,200 retail may carry a ~USD $1,000 cash
          alternative). The sole winner may elect either the stated prize or the published cash
          alternative. Election must be made within the timeframe stated in winner notification (or
          within 14 days if none is stated). Cash alternatives are paid in USD by bank transfer or
          other method Sponsor reasonably designates after identity verification.
        </p>
        <p>
          Winners are responsible for any taxes, duties, or fees not expressly included, except that
          cash alternatives are described as tax-free from Sponsor’s side to the extent permitted by
          law — winners should seek their own tax advice. Sponsor may require an affidavit of
          eligibility and publicity release where lawful.
        </p>
        <p className="text-[var(--fg)]/90">
          Illustrative lineup (subject to live competition pages): (1) monthly rolling free magazine
          advert — cash alt USD $1,000; (2) cash prize USD $1,000; (3) iPhone 17 — retail ~USD
          $1,200 / cash alt USD $1,000; (4) iPad — retail ~USD $849 / cash alt USD $700; (5) Samsung
          laptop — retail ~USD $1,299 / cash alt USD $1,000.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          6. Worldwide delivery
        </h2>
        <p>
          <strong className="font-medium text-[var(--fg)]">
            We deliver prizes worldwide.
          </strong>{" "}
          Sponsor arranges shipping and fulfilment of physical prizes to the winner’s verified
          address wherever practicable. Delivery timing varies by destination, customs, and carrier.
          Import duties or local taxes at destination, if any, are the winner’s responsibility unless
          Sponsor expressly agrees otherwise in writing. If delivery to a particular location is
          unlawful or commercially impracticable, Sponsor may offer the cash alternative instead.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          7. General
        </h2>
        <p>
          Sponsor reserves the right to cancel, suspend, or modify a competition if fraud, technical
          failures, or any other factor impairs integrity. By entering, you agree to these Official
          Rules and Sponsor’s Privacy Policy.
        </p>
      </section>

      <p className="text-xs">
        This page is a working legal stub for launch review. Counsel should finalize jurisdiction-
        specific language before paid public launch.
      </p>
    </article>
  );
}
