import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-deep)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <BrandLogo showCompetitionsLabel={false} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
            Exclusive competitions for members of the magazine. No purchase necessary — see
            Alternative Method of Entry.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
          <Link href="/membership" className="transition-colors hover:text-[var(--champagne)]">
            Membership
          </Link>
          <Link href="/contact" className="transition-colors hover:text-[var(--champagne)]">
            Contact
          </Link>
          <Link href="/amoe" className="transition-colors hover:text-[var(--champagne)]">
            Free Entry
          </Link>
          <Link href="/legal/official-rules" className="transition-colors hover:text-[var(--champagne)]">
            Rules
          </Link>
          <Link href="/legal/privacy" className="transition-colors hover:text-[var(--champagne)]">
            Privacy
          </Link>
          <Link href="/legal/terms" className="transition-colors hover:text-[var(--champagne)]">
            Terms
          </Link>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
