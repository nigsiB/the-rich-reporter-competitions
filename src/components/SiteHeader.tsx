import BrandLogo from "@/components/BrandLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getSessionProfile, signOutAction } from "@/app/actions/auth";
import { getDictionary } from "@/i18n/getDictionary";
import Link from "next/link";

export default async function SiteHeader() {
  const { user, profile } = await getSessionProfile();
  const isAdmin = Boolean(profile?.is_admin);
  const { locale, dict } = await getDictionary();

  const links = [
    { href: "/#competitions", label: dict.navCompetitions },
    { href: "/membership", label: dict.navMembership },
    { href: "/contact", label: dict.navContact },
    { href: "/#amoe", label: dict.navFreeEntry },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-6 md:px-10">
        <BrandLogo priority />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--champagne)]"
            >
              {link.label}
            </Link>
          ))}
          {isAdmin ? (
            <Link
              href="/admin"
              className="text-[10px] uppercase tracking-[0.28em] text-[var(--champagne)] transition-colors duration-300 hover:text-[var(--fg)]"
            >
              {dict.navAdmin}
            </Link>
          ) : null}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher locale={locale} label={dict.language} />
          {user ? (
            <form action={signOutAction}>
              <button
                type="submit"
                className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)]"
              >
                {dict.signOut}
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="hidden text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)] sm:inline"
            >
              {dict.signIn}
            </Link>
          )}
          <Link
            href={user ? "/#competitions" : "/membership"}
            className="border border-[var(--border)] px-5 py-2.5 text-[10px] uppercase tracking-[0.24em] text-[var(--fg)] transition-all duration-300 hover:border-[var(--champagne)] hover:text-[var(--champagne)]"
          >
            {user ? dict.enter : dict.join}
          </Link>
        </div>
      </div>
    </header>
  );
}
