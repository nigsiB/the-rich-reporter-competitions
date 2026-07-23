import BrandLogo from "@/components/BrandLogo";
import { getDictionary } from "@/i18n/getDictionary";
import Link from "next/link";

export default async function SiteFooter() {
  const { dict } = await getDictionary();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-deep)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <BrandLogo showCompetitionsLabel={false} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
            {dict.footerBlurb}
          </p>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-[var(--muted)]/80">
            {dict.worldwide}
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
          <Link href="/membership" className="transition-colors hover:text-[var(--champagne)]">
            {dict.navMembership}
          </Link>
          <Link href="/contact" className="transition-colors hover:text-[var(--champagne)]">
            {dict.navContact}
          </Link>
          <Link href="/amoe" className="transition-colors hover:text-[var(--champagne)]">
            {dict.navFreeEntry}
          </Link>
          <Link
            href="/legal/official-rules"
            className="transition-colors hover:text-[var(--champagne)]"
          >
            {dict.footerRules}
          </Link>
          <Link href="/legal/privacy" className="transition-colors hover:text-[var(--champagne)]">
            {dict.footerPrivacy}
          </Link>
          <Link href="/legal/terms" className="transition-colors hover:text-[var(--champagne)]">
            {dict.footerTerms}
          </Link>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
