import Link from "next/link";

const links = [
  { href: "/admin", label: "Competitions" },
  { href: "/admin/competitions/new", label: "Add new" },
  { href: "/admin/messages", label: "Messages" },
];

export default function AdminNav() {
  return (
    <nav
      aria-label="Admin"
      className="mb-10 flex flex-wrap gap-6 border-b border-[var(--border)] pb-6"
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)]"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
