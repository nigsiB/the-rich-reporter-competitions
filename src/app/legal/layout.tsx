import type { ReactNode } from "react";
import Link from "next/link";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-28 pt-32 md:px-10">
      <nav
        aria-label="Legal"
        className="mb-10 flex flex-wrap gap-6 border-b border-[var(--border)] pb-6 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]"
      >
        <Link href="/legal/official-rules" className="hover:text-[var(--champagne)]">
          Official Rules
        </Link>
        <Link href="/legal/privacy" className="hover:text-[var(--champagne)]">
          Privacy
        </Link>
        <Link href="/legal/terms" className="hover:text-[var(--champagne)]">
          Terms
        </Link>
      </nav>
      {children}
    </main>
  );
}
