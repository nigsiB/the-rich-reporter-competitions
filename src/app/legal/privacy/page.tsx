import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — The Rich Reporter Competitions",
};

export default function PrivacyPage() {
  return (
    <article className="space-y-8 text-sm leading-relaxed text-[var(--muted)]">
      <header>
        <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">Legal</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)]">
          Privacy Policy
        </h1>
        <p className="mt-3 text-xs uppercase tracking-[0.18em]">Last updated: July 2026</p>
      </header>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          Information we collect
        </h2>
        <p>
          Account details (name, email, phone, mailing address, date of birth), competition entry
          records, payment metadata processed by Stripe, and messages you send via Contact.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          How we use information
        </h2>
        <p>
          To operate competitions, verify eligibility, fulfill prizes, process payments, respond to
          enquiries, and—only with consent—send editorial or competition announcements.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          Sharing
        </h2>
        <p>
          We use processors such as Supabase (hosting/database/auth) and Stripe (payments). We do
          not sell personal information. We may disclose information when required by law.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          Your choices
        </h2>
        <p>
          Contact the competitions desk to update profile details, withdraw marketing consent, or
          request access/deletion subject to legal retention needs for sweepstakes compliance.
        </p>
      </section>
    </article>
  );
}
