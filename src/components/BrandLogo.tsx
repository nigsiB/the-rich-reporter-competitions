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
        src="/logos/rich-reporter-logo.png"
        alt="The Rich Reporter"
        width={300}
        height={42}
        priority={priority}
        className="h-7 w-auto md:h-8"
      />
      {showCompetitionsLabel ? (
        <span className="text-[9px] uppercase tracking-[0.35em] text-[var(--muted)] transition-colors group-hover:text-[var(--champagne)]">
          Competitions
        </span>
      ) : null}
    </Link>
  );
}
