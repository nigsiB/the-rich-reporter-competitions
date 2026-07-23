import { listContactMessages } from "@/app/actions/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages — Admin",
};

export default async function AdminMessagesPage() {
  const messages = await listContactMessages();

  return (
    <div>
      <h2 className="mb-8 font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--fg)]">
        Contact messages
      </h2>
      {messages.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">No messages yet.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className="border border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="font-[family-name:var(--font-display)] text-xl text-[var(--fg)]">
                  {msg.subject}
                </p>
                <time className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                  {new Date(msg.created_at).toLocaleString("en-US")}
                </time>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {msg.full_name} · {msg.email}
              </p>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[var(--fg)]">
                {msg.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
