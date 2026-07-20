import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CountdownTimer from "@/components/CountdownTimer";
import TicketCheckoutBtn from "@/components/TicketCheckoutBtn";
import { availabilityPercent, getCompetitionById, competitions } from "@/data/competitions";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return competitions.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const competition = getCompetitionById(id);
  if (!competition) return { title: "Competition" };
  return {
    title: `${competition.title} — The Rich Reporter`,
    description: competition.prizeDescription,
  };
}

export default async function CompetitionPage({ params }: PageProps) {
  const { id } = await params;
  const competition = getCompetitionById(id);
  if (!competition) notFound();

  const availablePct = availabilityPercent(competition);
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(competition.pricePerEntry);

  return (
    <main className="pt-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-28 md:grid-cols-2 md:gap-16 md:px-10 lg:gap-24">
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-elevated)]">
          <Image
            src={competition.imageUrl}
            alt={competition.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center py-4">
          <Link
            href="/#competitions"
            className="mb-8 w-fit text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)]"
          >
            ← Collection
          </Link>

          <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
            Limited to {competition.totalEntries.toLocaleString("en-US")} entries
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)] md:text-5xl lg:text-6xl">
            {competition.title}
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--muted)] md:text-base">
            {competition.prizeDescription}
          </p>

          <div className="mt-10 space-y-4 border-y border-[var(--border)] py-8">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                {availablePct}% available
              </span>
              <CountdownTimer drawDate={competition.drawDate} />
            </div>
            <div
              className="h-px w-full bg-[var(--border)]"
              role="progressbar"
              aria-valuenow={availablePct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${availablePct} percent of entries still available`}
            >
              <div className="h-px bg-[var(--champagne)]" style={{ width: `${availablePct}%` }} />
            </div>
            <p className="text-sm text-[var(--muted)]">
              <span className="text-[var(--fg)]">{price}</span> per entry · five-entry bundle at
              checkout
            </p>
          </div>

          <div className="mt-10">
            <TicketCheckoutBtn
              competitionId={competition.id}
              pricePerEntry={competition.pricePerEntry}
              quantity={5}
            />
          </div>

          <p className="mt-6 text-xs leading-relaxed text-[var(--muted)]">
            No purchase necessary. See{" "}
            <Link href="/#amoe" className="text-[var(--champagne)] underline-offset-4 hover:underline">
              Alternative Method of Entry
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
