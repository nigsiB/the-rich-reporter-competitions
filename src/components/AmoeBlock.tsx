export default function AmoeBlock() {
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
        No purchase is necessary to enter or win. To request a free mail-in entry form for any active
        competition, write to Rich Reporter Magazine — Competitions Desk, with your full name, return
        address, email, and the competition title. Limit one free entry request per outer envelope.
        Forms will be fulfilled by post. Void where prohibited. See official rules for eligibility,
        odds, and state restrictions.
      </p>
      <p className="mt-8 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
        Mail-in form download — coming soon
      </p>
    </section>
  );
}
