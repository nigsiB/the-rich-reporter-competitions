import CompetitionCard from "@/components/CompetitionCard";
import type { Competition } from "@/data/competitions";

type CompetitionGridProps = {
  competitions: Competition[];
};

export default function CompetitionGrid({ competitions }: CompetitionGridProps) {
  return (
    <section id="competitions" className="scroll-mt-24" aria-labelledby="competitions-heading">
      <div className="mb-14 max-w-xl">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
          Current Collection
        </p>
        <h2
          id="competitions-heading"
          className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)] md:text-5xl"
        >
          Exclusive draws
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] md:text-base">
          A curated set of prizes reserved for members. Entry caps are intentional — scarcity is part of
          the invitation.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {competitions.map((competition, index) => (
          <CompetitionCard key={competition.id} competition={competition} index={index} />
        ))}
      </div>
    </section>
  );
}
