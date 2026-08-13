import BrandLogo from "@/components/BrandLogo";
import { getDictionary } from "@/i18n/getDictionary";
import Link from "next/link";

export default async function SiteFooter() {
  const { dict } = await getDictionary();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-deep)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <BrandLogo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
            {dict.footerBlurb}
          </p>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-[var(--muted)]/80">
            {dict.worldwide}
          </p>
          <div className="mt-5 flex items-center gap-3">
            {/* SVG rather than a bordered span: the ring keeps its weight at
                any size and the glyph stays optically centred. */}
            <svg
              viewBox="0 0 40 40"
              className="h-10 w-10 shrink-0"
              role="img"
              aria-label="Eighteen plus"
            >
              <circle
                cx="20"
                cy="20"
                r="17"
                fill="none"
                stroke="var(--champagne)"
                strokeWidth="2.75"
              />
              <text
                x="20"
                y="20"
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--champagne)"
                fontSize="15"
                fontWeight="600"
                letterSpacing="0.5"
                fontFamily="var(--font-sans), system-ui, sans-serif"
              >
                18+
              </text>
            </svg>
            {/* text-balance lets the browser even the two lines out, rather
                than a long first line and a short orphan. */}
            <p
              aria-hidden="true"
              className="max-w-[11rem] text-balance text-[10px] uppercase leading-[1.7] tracking-[0.22em] text-[var(--muted)]"
            >
              Entrants must be 18 or over
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-4 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] md:max-w-xl md:justify-end">
          <Link href="/membership" className="transition-colors hover:text-[var(--champagne)]">
            {dict.navMembership}
          </Link>
          <Link href="/account" className="transition-colors hover:text-[var(--champagne)]">
            {dict.navAccount}
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
          <Link
            href="/legal/disclaimer"
            className="transition-colors hover:text-[var(--champagne)]"
          >
            Disclaimer
          </Link>
          <Link href="/legal/mission" className="transition-colors hover:text-[var(--champagne)]">
            Mission Statement
          </Link>
        </div>
      </div>

      {/* Copyright sits on its own baseline below the links, so the links can
          space themselves evenly across the full width instead of leaving a
          ragged gap where the year used to sit. */}
      <div className="mx-auto max-w-7xl px-6 pb-10 md:px-10">
        <p className="border-t border-[var(--border)] pt-6 text-center text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]/70">
          © {new Date().getFullYear()} The Rich Reporter
        </p>
      </div>
    </footer>
  );
}
