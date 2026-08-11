import BrandLogo from "@/components/BrandLogo";
import FloatingNavShell from "@/components/FloatingNavShell";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getSessionProfile, signOutAction } from "@/app/actions/auth";
import { getDictionary } from "@/i18n/getDictionary";
import Link from "next/link";

const linkClass =
  "nav-link focus-ring text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--champagne)]";
const utilityClass =
  "nav-link focus-ring inline-flex items-center leading-none text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)]";
const utilityButtonClass =
  `${utilityClass} cursor-pointer border-0 bg-transparent p-0 font-[inherit]`;
const mobileLinkClass =
  "block py-2.5 text-[11px] uppercase tracking-[0.28em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)]";

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

  const desktopNav = (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={linkClass}>
          {link.label}
        </Link>
      ))}
      {isAdmin ? (
        <Link href="/admin" className={`${linkClass} text-[var(--champagne)] hover:text-[var(--fg)]`}>
          {dict.navAdmin}
        </Link>
      ) : null}
    </>
  );

  const mobileNav = (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={mobileLinkClass}>
          {link.label}
        </Link>
      ))}
      {isAdmin ? (
        <Link
          href="/admin"
          className={`${mobileLinkClass} text-[var(--champagne)] hover:text-[var(--fg)]`}
        >
          {dict.navAdmin}
        </Link>
      ) : null}
      {user ? (
        <Link href="/account" className={`${mobileLinkClass} sm:hidden`}>
          {dict.navAccount}
        </Link>
      ) : (
        <Link href="/login" className={`${mobileLinkClass} sm:hidden`}>
          {dict.signIn}
        </Link>
      )}
    </>
  );

  const utilities = (
    <>
      {user ? (
        <>
          <Link href="/account" className={`${utilityClass} hidden sm:inline-flex`}>
            {dict.navAccount}
          </Link>
          <form action={signOutAction} className="m-0 inline-flex items-center">
            <button type="submit" className={utilityButtonClass}>
              {dict.signOut}
            </button>
          </form>
        </>
      ) : (
        <>
          <Link href="/login" className={`${utilityClass} hidden sm:inline-flex`}>
            {dict.signIn}
          </Link>
          <Link href="/membership" className={utilityClass}>
            {dict.join}
          </Link>
        </>
      )}
      <LanguageSwitcher locale={locale} label={dict.language} />
    </>
  );

  return (
    <FloatingNavShell
      logo={<BrandLogo priority />}
      desktopNav={desktopNav}
      mobileNav={mobileNav}
      utilities={utilities}
      menuLabel="Menu"
    />
  );
}
