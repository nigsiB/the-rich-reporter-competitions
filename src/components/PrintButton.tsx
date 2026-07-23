"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="border border-[var(--champagne)]/50 px-6 py-3 text-[10px] uppercase tracking-[0.24em] text-[var(--champagne)] transition-colors hover:border-[var(--champagne)] hover:bg-[var(--champagne)] hover:text-[var(--bg-deep)] print:hidden"
    >
      Print / Save PDF
    </button>
  );
}
