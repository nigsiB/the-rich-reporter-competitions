import Link from "next/link";

import type { EntryGroup } from "@/lib/entries";

/**
 * The member's ticket numbers. Every ticket is individually numbered and
 * unique per competition (UNIQUE(competition_id, ticket_number)), so these are
 * the actual identifiers that go into the draw — worth showing plainly rather
 * than just a count.
 */
export default function TicketNumbers({
  entries,
  emptyMessage = "No entries yet.",
}: {
  entries: EntryGroup[];
  emptyMessage?: string;
}) {
  if (!entries.length) {
    return <p className="text-sm text-[var(--muted)]">{emptyMessage}</p>;
  }

  return (
    <ul className="space-y-8">
      {entries.map((entry) => (
        <li key={entry.competitionId}>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-[family-name:var(--font-display)] text-xl tracking-wide text-[var(--fg)]">
              <Link
                href={`/competitions/${entry.competitionId}`}
                className="nav-link focus-ring transition-colors hover:text-[var(--champagne)]"
              >
                {entry.title}
              </Link>
            </h3>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              {entry.ticketNumbers.length}{" "}
              {entry.ticketNumbers.length === 1 ? "entry" : "entries"}
              {entry.reserved > 0 ? (
                <span className="text-[var(--champagne)]"> · {entry.reserved} awaiting payment</span>
              ) : null}
            </p>
          </div>

          {entry.drawDate ? (
            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]/70">
              Draw{" "}
              {new Date(entry.drawDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          ) : null}

          <ul className="mt-4 flex flex-wrap gap-2">
            {entry.ticketNumbers.map((n) => (
              <li
                key={n}
                className="border border-[var(--border-strong)] px-3 py-1.5 font-mono text-xs tabular-nums text-[var(--fg)]"
              >
                #{n.toLocaleString("en-US")}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
