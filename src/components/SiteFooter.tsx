import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-deep)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg tracking-wide text-[var(--fg)]">
            The Rich Reporter
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
            Exclusive competitions for members of the magazine. No purchase necessary — see Alternative
            Method of Entry.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
          <Link href="/#amoe" className="transition-colors hover:text-[var(--champagne)]">
            Free Entry
          </Link>
          <Link href="/#competitions" className="transition-colors hover:text-[var(--champagne)]">
            Competitions
          </Link>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
