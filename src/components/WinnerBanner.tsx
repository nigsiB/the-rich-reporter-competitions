import type { Winner } from "@/lib/winners";

/**
 * Public announcement of a completed draw.
 *
 * Shows the winning ticket number, how many tickets were in the hat and when
 * it was drawn — enough for an entrant to check the result against their own
 * numbers. The name is only ever the denormalised "Nigel B." form recorded at
 * draw time; full names are never exposed.
 */
export default function WinnerBanner({ winner }: { winner: Winner }) {
  return (
    <section
      className="border border-[var(--champagne)]/40 bg-[var(--bg-elevated)] px-6 py-8 md:px-10"
      aria-labelledby="winner-heading"
    >
      <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
        Draw complete
      </p>
      <h2
        id="winner-heading"
        className="mt-3 font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--fg)] md:text-3xl"
      >
        Winning ticket{" "}
        <span className="font-mono tabular-nums text-[var(--champagne)]">
          #{winner.ticketNumber.toLocaleString("en-US")}
        </span>
      </h2>

      {winner.displayName ? (
        <p className="mt-3 text-sm text-[var(--muted)]">
          Held by <span className="text-[var(--fg)]">{winner.displayName}</span>
        </p>
      ) : null}

      <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
        <div>
          <dt className="text-[var(--muted)]/70">Tickets in the draw</dt>
          <dd className="mt-1 text-[var(--fg)]">
            {winner.eligibleTickets.toLocaleString("en-US")}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]/70">Drawn</dt>
          <dd className="mt-1 text-[var(--fg)]">
            {new Date(winner.drawnAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </dd>
        </div>
      </dl>

      <p className="mt-6 text-xs leading-relaxed text-[var(--muted)]">
        The winner is contacted using the details on their membership account. If you hold this
        number and have not heard from us, get in touch via the contact desk.
      </p>
    </section>
  );
}
