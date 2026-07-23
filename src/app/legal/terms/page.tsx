import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — The Rich Reporter Competitions",
};

export default function TermsPage() {
  return (
    <article className="space-y-8 text-sm leading-relaxed text-[var(--muted)]">
      <header>
        <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">Legal</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)]">
          Terms of Use
        </h1>
        <p className="mt-3 text-xs uppercase tracking-[0.18em]">Last updated: July 2026</p>
      </header>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          Acceptance
        </h2>
        <p>
          By using The Rich Reporter Competitions site you agree to these Terms, the Official Rules
          for any competition you enter, and our Privacy Policy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          Accounts
        </h2>
        <p>
          You are responsible for safeguarding login credentials and for activity under your
          membership. Provide accurate information; false details may void entries.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          Payments
        </h2>
        <p>
          Paid entries are processed by Stripe. Reserved tickets that are not paid within the hold
          window return to inventory. Refunds, if any, are governed by the Official Rules and
          applicable law.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          Disclaimers
        </h2>
        <p>
          The site is provided “as is.” To the fullest extent permitted by law, Sponsor disclaims
          warranties and limits liability arising from use of the site or participation in
          competitions, except where such limitation is prohibited.
        </p>
      </section>
    </article>
  );
}
