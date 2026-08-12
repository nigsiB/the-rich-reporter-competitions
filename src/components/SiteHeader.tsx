import BrandLogo from "@/components/BrandLogo";
import FloatingNavShell from "@/components/FloatingNavShell";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getSessionProfile, signOutAction } from "@/app/actions/auth";
import { getDictionary } from "@/i18n/getDictionary";
import Link from "next/link";

const linkClass =
  "nav-link focus-ring text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--champagne)]";
// `display` must not live in the shared base: an element carrying both
// `inline-flex` and `hidden` resolves by stylesheet order, not class order,
// so `inline-flex` wins and `hidden` silently does nothing.
const utilityBase =
  "nav-link focus-ring items-center leading-none text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)]";
const utilityClass = `inline-flex ${utilityBase}`;
/** Hidden on phones, where the top bar has no room for it. */
const utilityClassSmUp = `hidden sm:inline-flex ${utilityBase}`;
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
      {/* Phones only — the switcher is ~136px wide and will not fit the bar. */}
      <div className="mt-3 border-t border-[var(--border)] pt-4 sm:hidden">
        <LanguageSwitcher locale={locale} label={dict.language} />
      </div>
    </>
  );

  const utilities = (
    <>
      {user ? (
        <>
          <Link href="/account" className={utilityClassSmUp}>
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
          <Link href="/login" className={utilityClassSmUp}>
            {dict.signIn}
          </Link>
          <Link href="/membership" className={utilityClass}>
            {dict.join}
          </Link>
        </>
      )}
      <span className="hidden sm:inline-flex">
        <LanguageSwitcher locale={locale} label={dict.language} />
      </span>
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
