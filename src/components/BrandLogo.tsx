import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  className?: string;
  priority?: boolean;
  showCompetitionsLabel?: boolean;
};

export default function BrandLogo({
  href = "/",
  className = "",
  priority = false,
  showCompetitionsLabel = true,
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex flex-col gap-1 ${className}`}
      aria-label="The Rich Reporter Competitions — Home"
    >
      <Image
        src="/logos/rich-reporter-champagne.png"
        alt="The Rich Reporter"
        width={900}
        height={370}
        priority={priority}
        // Stacked two-line lockup (2.43:1), so it needs far more height than
        // the old single-line mark to stay legible.
        className="h-11 w-auto md:h-12"
      />
      {showCompetitionsLabel ? (
        <span className="text-[9px] uppercase tracking-[0.35em] text-[var(--muted)] transition-colors group-hover:text-[var(--champagne)]">
          Competitions
        </span>
      ) : null}
    </Link>
  );
}
