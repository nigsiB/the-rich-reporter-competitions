import Image from "next/image";
import Link from "next/link";

import type { Competition } from "@/data/competitions";
import type { Winner } from "@/lib/winners";

/**
 * Finished draws, shown beneath the live competitions.
 *
 * Without this a competition simply vanished the moment it was drawn, which
 * looks like a bug and hides the results — the one thing that shows entries
 * really are drawn and prizes really are awarded.
 */
export default function PastDraws({
  competitions,
  winners,
}: {
  competitions: Competition[];
  winners: Winner[];
}) {
  if (!competitions.length) return null;

  const byCompetition = new Map(winners.map((w) => [w.competitionId, w]));

  return (
    <section id="past-draws" className="scroll-mt-28" aria-labelledby="past-draws-heading">
      <div className="mb-10 max-w-xl">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
          Completed draws
        </p>
        <h2
          id="past-draws-heading"
          className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-wide text-[var(--fg)] md:text-4xl"
        >
          Recent winners
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
          Every draw is published with its winning ticket number and the number of tickets it was
          drawn from, so any entrant can check the result against their own numbers.
        </p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {competitions.map((competition) => {
          const winner = byCompetition.get(competition.id);
          return (
            <li key={competition.id}>
              <Link
                href={`/competitions/${competition.id}`}
                className="focus-ring hover-lift group flex h-full gap-4 border border-[var(--border)] bg-[var(--bg-elevated)] p-4"
              >
                <span className="relative block h-24 w-20 shrink-0 overflow-hidden bg-[var(--bg-deep)]">
                  {competition.imageUrl ? (
                    <Image
                      src={competition.imageUrl}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  ) : null}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-[family-name:var(--font-display)] text-lg leading-tight text-[var(--fg)]">
                    {competition.title}
                  </span>

                  {winner ? (
                    <>
                      <span className="mt-2 block text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                        Winning ticket{" "}
                        <span className="font-mono tabular-nums text-[var(--champagne)]">
                          #{winner.ticketNumber.toLocaleString("en-US")}
                        </span>
                      </span>
                      {winner.displayName ? (
                        <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]/80">
                          {winner.displayName}
                        </span>
                      ) : null}
                      <span className="mt-2 block text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]/60">
                        From {winner.eligibleTickets.toLocaleString("en-US")} tickets
                      </span>
                    </>
                  ) : (
                    <span className="mt-2 block text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                      Closed — winner to be announced
                    </span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
