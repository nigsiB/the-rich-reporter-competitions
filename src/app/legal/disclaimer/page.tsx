import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer — The Rich Reporter Competitions",
  description:
    "Legal disclaimer for The Rich Reporter Competitions: prize values, eligibility, no affiliation with prize manufacturers, and limitation of liability.",
};

export default function DisclaimerPage() {
  return (
    <article className="space-y-8 text-sm leading-relaxed text-[var(--muted)]">
      <header>
        <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">Legal</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)]">
          Disclaimer
        </h1>
      </header>

      <p>
        This disclaimer governs your use of The Rich Reporter Competitions. By entering a
        competition you accept it in full, together with our{" "}
        <Link href="/legal/terms" className="text-[var(--champagne)] underline-offset-4 hover:underline">
          Terms of Use
        </Link>{" "}
        and the{" "}
        <Link href="/legal/official-rules" className="text-[var(--champagne)] underline-offset-4 hover:underline">
          Official Rules
        </Link>
        .
      </p>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          Age restriction
        </h2>
        <p>
          Entrants must be 18 years of age or older. We may require proof of age and identity
          before releasing any prize, and entries from anyone under 18 are void.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          No affiliation with prize manufacturers
        </h2>
        <p>
          Prizes may reference third-party brands, products or property. Those brands are not
          sponsors of, affiliated with, or in any way associated with these competitions, and no
          endorsement is implied. All trademarks remain the property of their respective owners.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          Prize values and substitution
        </h2>
        <p>
          Stated values are approximate retail estimates at the time of listing and may differ from
          the price you would pay. Specification, colour and model may vary from the images shown,
          which are illustrative. Where a cash alternative is offered, a winner may elect to take it
          instead of the physical prize. We reserve the right to substitute a prize of equal or
          greater value where circumstances outside our control require it.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          Taxes and associated costs
        </h2>
        <p>
          Winners are responsible for any tax, duty, registration, insurance, transfer or ongoing
          ownership cost arising from a prize, unless a competition&rsquo;s listing expressly states
          otherwise. Prize values are quoted in US dollars. Where property or a vehicle is awarded,
          the winner is responsible for satisfying any local eligibility or licensing requirement.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          Not gambling advice or investment advice
        </h2>
        <p>
          Nothing on this site is financial, investment, legal or tax advice. Entry is a
          discretionary purchase and should never be treated as an investment. Please enter
          responsibly and only for amounts you are comfortable spending.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          Free entry route
        </h2>
        <p>
          No purchase is necessary. A free postal entry route is available for every competition and
          carries the same chance of winning as a paid entry — see{" "}
          <Link href="/amoe" className="text-[var(--champagne)] underline-offset-4 hover:underline">
            free entry
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          Availability and accuracy
        </h2>
        <p>
          We take care to keep listings, ticket counts and draw dates accurate, but we do not
          warrant that the site will be uninterrupted or error-free. Where an obvious error affects
          a listing or a draw, we reserve the right to correct it and, if necessary, to void
          affected entries and refund them.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          Limitation of liability
        </h2>
        <p>
          To the fullest extent permitted by law, our liability in connection with a competition is
          limited to the value of the entries you purchased for it. Nothing here excludes liability
          for fraud, for death or personal injury caused by negligence, or for any other liability
          that cannot lawfully be excluded. This does not affect your statutory rights.
        </p>
      </section>

      <p className="border-t border-[var(--border)] pt-6 text-xs">
        Questions about this disclaimer? Use the{" "}
        <Link href="/contact" className="text-[var(--champagne)] underline-offset-4 hover:underline">
          contact desk
        </Link>
        .
      </p>
    </article>
  );
}
