import Link from "next/link";
import type { Metadata } from "next";

import AdminWinnersList from "@/components/admin/AdminWinnersList";
import { getAdminWinners } from "@/app/actions/admin";

export const metadata: Metadata = {
  title: "Winners — Admin",
};

export default async function AdminWinnersPage() {
  const { winners, error } = await getAdminWinners();

  return (
    <>
      <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">Admin</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)] md:text-5xl">
        Winners
      </h1>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        Every completed draw, with the contact details needed to award the prize. The public
        result page shows only an initialled name and the winning ticket number — full names and
        email addresses appear here and nowhere else.
      </p>

      {error ? (
        <div className="mt-10 border border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-8">
          <p className="text-sm text-[var(--muted)]">
            Could not load winners: <span className="text-[var(--champagne)]">{error}</span>
          </p>
          <p className="mt-3 text-xs text-[var(--muted)]">
            If this mentions a missing table, run{" "}
            <code className="text-[var(--champagne)]">
              supabase/migrations/013_draw_winner.sql
            </code>
            .
          </p>
        </div>
      ) : (
        <div className="mt-10">
          <AdminWinnersList winners={winners} />
        </div>
      )}

      <p className="mt-10 text-xs text-[var(--muted)]">
        To draw a competition, use <Link href="/admin" className="text-[var(--champagne)] hover:underline">Competitions</Link>.
      </p>
    </>
  );
}
