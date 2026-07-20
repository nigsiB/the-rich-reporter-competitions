import Link from "next/link";

const links = [
  { href: "/#competitions", label: "Competitions" },
  { href: "/#how-it-works", label: "Membership" },
  { href: "/#amoe", label: "Free Entry" },
];

export default function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 md:px-10">
        <Link
          href="/"
          className="group flex flex-col gap-0.5"
          aria-label="The Rich Reporter Competitions — Home"
        >
          <span className="font-[family-name:var(--font-display)] text-xl tracking-[0.08em] text-[var(--fg)] transition-colors group-hover:text-[var(--champagne)] md:text-2xl">
            The Rich Reporter
          </span>
          <span className="text-[9px] uppercase tracking-[0.35em] text-[var(--muted)]">
            Competitions
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--champagne)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#competitions"
          className="border border-[var(--border)] px-5 py-2.5 text-[10px] uppercase tracking-[0.24em] text-[var(--fg)] transition-all duration-300 hover:border-[var(--champagne)] hover:text-[var(--champagne)]"
        >
          Enter
        </Link>
      </div>
    </header>
  );
}
