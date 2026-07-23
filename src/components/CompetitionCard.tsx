import Image from "next/image";
import Link from "next/link";
import type { Competition } from "@/data/competitions";
import { formatUsd } from "@/data/competitions";
import CountdownTimer from "@/components/CountdownTimer";
import InventoryBar from "@/components/InventoryBar";
import type { Dictionary } from "@/i18n/dictionaries";
import { t } from "@/i18n/dictionaries";

type CompetitionCardProps = {
  competition: Competition;
  index: number;
  dict: Dictionary;
};

export default function CompetitionCard({ competition, index, dict }: CompetitionCardProps) {
  const price = formatUsd(competition.pricePerEntry);

  return (
    <article className="group flex flex-col" style={{ animationDelay: `${index * 60}ms` }}>
      <Link
        href={`/competitions/${competition.id}`}
        className="relative block aspect-[4/5] overflow-hidden bg-[var(--bg-elevated)]"
      >
        <Image
          src={competition.imageUrl}
          alt={competition.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover brightness-[0.72] contrast-[1.12] saturate-[0.85] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          priority={index < 2}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-[var(--bg-deep)]/25 to-[var(--bg-deep)]/15 opacity-90"
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--champagne)]">
            {dict.limitedTo} {competition.totalEntries.toLocaleString("en-US")} {dict.entriesWord}
          </p>
          {competition.isMonthly ? (
            <p className="mt-2 text-[9px] uppercase tracking-[0.22em] text-[var(--fg)]/80">
              {dict.monthly}
            </p>
          ) : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 border border-t-0 border-[var(--border)] px-6 py-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-[family-name:var(--font-display)] text-2xl leading-tight tracking-wide text-[var(--fg)]">
            <Link
              href={`/competitions/${competition.id}`}
              className="transition-colors duration-300 hover:text-[var(--champagne)]"
            >
              {competition.title}
            </Link>
          </h3>
          <p className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
            {price}
            <span className="block text-[9px] tracking-[0.14em] text-[var(--muted)]/70">
              {dict.perEntry}
            </span>
          </p>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
          {competition.prizeDescription}
        </p>

        <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--champagne)]/80">
          {dict.cashAlternative}: {formatUsd(competition.cashAlternative)}
        </p>

        <div className="mt-auto space-y-3 pt-2">
          <div className="flex justify-end">
            <CountdownTimer drawDate={competition.drawDate} />
          </div>
          <InventoryBar
            competitionId={competition.id}
            totalEntries={competition.totalEntries}
            initialAvailable={competition.entriesRemaining}
          />
          <p className="sr-only">
            {t(dict, "cashAltLine", { amount: formatUsd(competition.cashAlternative) })}
          </p>
        </div>
      </div>
    </article>
  );
}
