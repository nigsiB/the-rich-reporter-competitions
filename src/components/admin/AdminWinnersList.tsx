"use client";

import Link from "next/link";
import { useState } from "react";

import { markWinnerNotifiedAction, type AdminWinner } from "@/app/actions/admin";

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminWinnersList({ winners }: { winners: AdminWinner[] }) {
  const [items, setItems] = useState(winners);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const markNotified = async (competitionId: string) => {
    setBusy(competitionId);
    setMessage("");
    const result = await markWinnerNotifiedAction(competitionId);
    setBusy(null);
    if (!result.success) {
      setMessage(result.error);
      return;
    }
    const now = new Date().toISOString();
    setItems((prev) =>
      prev.map((w) => (w.competitionId === competitionId ? { ...w, notifiedAt: now } : w)),
    );
  };

  if (!items.length) {
    return (
      <div className="border border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-10">
        <p className="text-sm text-[var(--muted)]">
          No draws have been run yet. Once a competition is drawn from the Competitions tab, the
          winner appears here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {message ? (
        <p className="text-sm text-[var(--champagne)]" role="status">
          {message}
        </p>
      ) : null}

      <ul className="divide-y divide-[var(--border)] border border-[var(--border)]">
        {items.map((w) => (
          <li key={w.competitionId} className="bg-[var(--bg-elevated)] px-5 py-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-[family-name:var(--font-display)] text-xl text-[var(--fg)]">
                  {w.competitionTitle}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                  Ticket{" "}
                  <span className="font-mono tabular-nums text-[var(--champagne)]">
                    #{w.ticketNumber.toLocaleString("en-US")}
                  </span>{" "}
                  · drawn from {w.eligibleTickets.toLocaleString("en-US")} sold ·{" "}
                  {formatDate(w.drawnAt)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {w.notifiedAt ? (
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                    Notified {formatDate(w.notifiedAt)}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => markNotified(w.competitionId)}
                    disabled={busy === w.competitionId}
                    className="border border-[var(--champagne)]/50 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--champagne)] transition-colors hover:bg-[var(--champagne)] hover:text-[var(--bg-deep)] disabled:opacity-40"
                  >
                    {busy === w.competitionId ? "Saving…" : "Mark notified"}
                  </button>
                )}
                <Link
                  href={`/competitions/${w.competitionId}`}
                  className="text-[10px] uppercase tracking-[0.22em] text-[var(--champagne)] hover:text-[var(--fg)]"
                >
                  Public page
                </Link>
              </div>
            </div>

            <dl className="mt-5 grid gap-4 border-t border-[var(--border)] pt-5 sm:grid-cols-3">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]/70">
                  Winner
                </dt>
                <dd className="mt-1 text-sm text-[var(--fg)]">
                  {w.fullName ?? w.displayName ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]/70">
                  Email
                </dt>
                <dd className="mt-1 break-all text-sm text-[var(--fg)]">
                  {w.email ? (
                    <a
                      href={`mailto:${w.email}?subject=${encodeURIComponent(
                        `You've won: ${w.competitionTitle}`,
                      )}`}
                      className="text-[var(--champagne)] underline-offset-4 hover:underline"
                    >
                      {w.email}
                    </a>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]/70">
                  Shown publicly as
                </dt>
                <dd className="mt-1 text-sm text-[var(--fg)]">{w.displayName ?? "—"}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
