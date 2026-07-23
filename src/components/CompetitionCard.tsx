import Image from "next/image";
import Link from "next/link";
import type { Competition } from "@/data/competitions";
import CountdownTimer from "@/components/CountdownTimer";
import InventoryBar from "@/components/InventoryBar";

type CompetitionCardProps = {
  competition: Competition;
  index: number;
};

export default function CompetitionCard({ competition, index }: CompetitionCardProps) {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(competition.pricePerEntry);

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
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          priority={index < 2}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-transparent to-transparent opacity-80"
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--champagne)]">
            Limited to {competition.totalEntries.toLocaleString("en-US")} entries
          </p>
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
              per entry
            </span>
          </p>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
          {competition.prizeDescription}
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
        </div>
      </div>
    </article>
  );
}
