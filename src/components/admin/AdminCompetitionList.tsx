"use client";

import { useState } from "react";
import { drawWinnerAction, updateDisplayOrderAction } from "@/app/actions/admin";
import { primaryBtnClass } from "@/components/formStyles";
import Link from "next/link";

type AdminCompetition = {
  id: string;
  title: string;
  status: string;
  display_order: number;
  price_per_entry: number | string;
  total_entries: number;
  draw_date: string | null;
};

type Props = {
  competitions: AdminCompetition[];
  source: "live" | "demo" | "error";
  error?: string;
};

export default function AdminCompetitionList({ competitions, source, error }: Props) {
  const [items, setItems] = useState(
    [...competitions].sort((a, b) => a.display_order - b.display_order),
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [drawing, setDrawing] = useState<string | null>(null);

  const runDraw = async (id: string, title: string) => {
    // Irreversible: the winner row is unique per competition, so there is no
    // second attempt if the wrong competition is picked.
    const ok = window.confirm(
      `Draw the winner for "${title}"?\n\n` +
        "This picks a winning ticket at random from the sold entries, records " +
        "it publicly and closes the competition. It cannot be undone.",
    );
    if (!ok) return;

    setDrawing(id);
    setMessage("");
    const result = await drawWinnerAction(id);
    setDrawing(null);

    if (!result.success || !result.data) {
      setMessage(result.success ? "The draw returned no result." : result.error);
      return;
    }
    const { ticketNumber, eligible, displayName } = result.data;
    setMessage(
      `${title}: ticket #${ticketNumber.toLocaleString("en-US")} won` +
        (displayName ? ` (${displayName})` : "") +
        ` — drawn from ${eligible.toLocaleString("en-US")} sold tickets.`,
    );
  };

  const move = (index: number, direction: -1 | 1) => {
    const next = index + direction;
    if (next < 0 || next >= items.length) return;
    const copy = [...items];
    const tmp = copy[index];
    copy[index] = copy[next];
    copy[next] = tmp;
    setItems(copy.map((item, i) => ({ ...item, display_order: i })));
  };

  const saveOrder = async () => {
    setSaving(true);
    setMessage("");
    const result = await updateDisplayOrderAction(
      items.map((item, i) => ({ id: item.id, displayOrder: i })),
    );
    setSaving(false);
    setMessage(result.success ? "Display order saved." : result.error);
  };

  if (source === "demo") {
    return (
      <div className="border border-[var(--border)] bg-[var(--bg-elevated)] px-8 py-10">
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          Admin is ready, but Supabase is not connected yet. Add credentials to{" "}
          <code className="text-[var(--champagne)]">.env.local</code>, run the schema SQL, create a
          member account, then promote it with:
        </p>
        <pre className="mt-4 overflow-x-auto bg-[var(--bg-deep)] p-4 text-xs text-[var(--champagne)]">
          {`UPDATE profiles SET is_admin = true WHERE email = 'you@example.com';`}
        </pre>
      </div>
    );
  }

  if (source === "error") {
    return (
      <p className="text-sm text-red-400/90" role="alert">
        {error ?? "Unable to load competitions."}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-[var(--muted)]">{items.length} competitions</p>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={saveOrder} disabled={saving} className={primaryBtnClass}>
            {saving ? "Saving order…" : "Save display order"}
          </button>
          <Link
            href="/admin/competitions/new"
            className="border border-[var(--border)] px-6 py-4 text-[11px] uppercase tracking-[0.24em] text-[var(--fg)] transition-colors hover:border-[var(--champagne)] hover:text-[var(--champagne)]"
          >
            Add competition
          </Link>
        </div>
      </div>

      {message ? (
        <p className="text-sm text-[var(--champagne)]" role="status">
          {message}
        </p>
      ) : null}

      <ul className="divide-y divide-[var(--border)] border border-[var(--border)]">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="flex flex-col gap-4 bg-[var(--bg-elevated)] px-5 py-5 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="font-[family-name:var(--font-display)] text-xl text-[var(--fg)]">
                {item.title}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                {item.status} · order {item.display_order} · ${Number(item.price_per_entry)} ·{" "}
                {item.total_entries.toLocaleString("en-US")} entries
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => move(index, -1)}
                className="border border-[var(--border)] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--champagne)]"
                aria-label="Move up"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                className="border border-[var(--border)] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--champagne)]"
                aria-label="Move down"
              >
                ↓
              </button>
              <Link
                href={`/admin/competitions/${item.id}`}
                className="text-[10px] uppercase tracking-[0.22em] text-[var(--champagne)] hover:text-[var(--fg)]"
              >
                Edit
              </Link>
              {item.status === "completed" ? (
                <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  Drawn
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => runDraw(item.id, item.title)}
                  disabled={drawing === item.id}
                  className="border border-[var(--champagne)]/50 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--champagne)] transition-colors hover:bg-[var(--champagne)] hover:text-[var(--bg-deep)] disabled:opacity-40"
                >
                  {drawing === item.id ? "Drawing…" : "Draw winner"}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
