"use client";

import { useMemo, useState, useTransition } from "react";
import { setMemberAdminAction, type AdminMember } from "@/app/actions/admin";
import { fieldClass } from "@/components/formStyles";

type Props = {
  members: AdminMember[];
  currentUserId: string | null;
  error?: string;
};

function formatAddress(m: AdminMember): string | null {
  const parts = [
    m.address_line1,
    m.address_line2,
    [m.city, m.state].filter(Boolean).join(", "),
    m.postal_code,
    m.country,
  ].filter((p) => p && String(p).trim());
  return parts.length ? parts.join(" · ") : null;
}

export default function AdminMembersList({ members, currentUserId, error }: Props) {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [rows, setRows] = useState(members);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((m) => {
      const email = (m.email ?? "").toLowerCase();
      const name = (m.full_name ?? "").toLowerCase();
      return email.includes(q) || name.includes(q);
    });
  }, [rows, query]);

  const adminCount = rows.filter((m) => m.is_admin).length;

  const toggleAdmin = (member: AdminMember) => {
    const next = !member.is_admin;
    if (!next && member.id === currentUserId && adminCount <= 1) {
      setMessage("You cannot revoke your own admin access while you are the only admin.");
      return;
    }
    if (!next && adminCount <= 1) {
      setMessage("Cannot revoke the last remaining admin.");
      return;
    }

    const label = next ? "grant admin to" : "revoke admin from";
    const who = member.email || member.full_name || member.id;
    if (!window.confirm(`Are you sure you want to ${label} ${who}?`)) return;

    setMessage("");
    setPendingId(member.id);
    startTransition(async () => {
      const result = await setMemberAdminAction(member.id, next);
      setPendingId(null);
      if (!result.success) {
        setMessage(result.error);
        return;
      }
      setRows((prev) =>
        prev.map((m) => (m.id === member.id ? { ...m, is_admin: next } : m)),
      );
      setMessage(result.message ?? (next ? "Admin granted." : "Admin revoked."));
    });
  };

  if (error) {
    return (
      <p className="text-sm text-red-400/90" role="alert">
        {error}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-[var(--muted)]">
            {filtered.length} of {rows.length} members · {adminCount} admin
            {adminCount === 1 ? "" : "s"}
          </p>
        </div>
        <label className="block w-full max-w-md">
          <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Search email or name
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search members…"
            className={fieldClass}
            autoComplete="off"
          />
        </label>
      </div>

      {message ? (
        <p className="text-sm text-[var(--champagne)]" role="status">
          {message}
        </p>
      ) : null}

      {filtered.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">No members match your search.</p>
      ) : (
        <ul className="divide-y divide-[var(--border)] border border-[var(--border)]">
          {filtered.map((member) => {
            const address = formatAddress(member);
            const isSelf = member.id === currentUserId;
            const busy = isPending && pendingId === member.id;
            const expanded = expandedId === member.id;

            return (
              <li
                key={member.id}
                className="bg-[var(--bg-elevated)] px-5 py-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <p className="font-[family-name:var(--font-display)] text-xl text-[var(--fg)]">
                        {member.full_name?.trim() || "Unnamed member"}
                      </p>
                      {member.is_admin ? (
                        <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--champagne)]">
                          Admin
                        </span>
                      ) : null}
                      {isSelf ? (
                        <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                          You
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 truncate text-sm text-[var(--muted)]">
                      {member.email ?? "No email"}
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                      {member.country || "—"} ·{" "}
                      {member.created_at
                        ? new Date(member.created_at).toLocaleDateString("en-US")
                        : "—"}{" "}
                      · marketing {member.marketing_opt_in ? "on" : "off"} ·{" "}
                      {member.ticket_count} ticket
                      {member.ticket_count === 1 ? "" : "s"}
                    </p>
                    {expanded && address ? (
                      <p className="mt-3 text-sm leading-relaxed text-[var(--fg)]/80">
                        {address}
                        {member.phone ? ` · ${member.phone}` : ""}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {(address || member.phone) && (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId(expanded ? null : member.id)
                        }
                        className="border border-[var(--border)] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--champagne)]"
                      >
                        {expanded ? "Hide address" : "Address"}
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => toggleAdmin(member)}
                      className={
                        member.is_admin
                          ? "border border-[var(--border)] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:border-red-400/50 hover:text-red-300 disabled:opacity-40"
                          : "border border-[var(--champagne)]/50 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--champagne)] transition-colors hover:border-[var(--champagne)] hover:text-[var(--fg)] disabled:opacity-40"
                      }
                    >
                      {busy
                        ? "Saving…"
                        : member.is_admin
                          ? "Revoke admin"
                          : "Grant admin"}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
