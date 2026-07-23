import CompetitionCard from "@/components/CompetitionCard";
import type { Competition } from "@/data/competitions";
import type { Dictionary } from "@/i18n/dictionaries";

type CompetitionGridProps = {
  competitions: Competition[];
  dict: Dictionary;
};

export default function CompetitionGrid({ competitions, dict }: CompetitionGridProps) {
  return (
    <section id="competitions" className="scroll-mt-24" aria-labelledby="competitions-heading">
      <div className="mb-14 max-w-xl">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
          {dict.competitionsEyebrow}
        </p>
        <h2
          id="competitions-heading"
          className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)] md:text-5xl"
        >
          {dict.competitionsHeading}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] md:text-base">
          {dict.competitionsIntro}
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {competitions.map((competition, index) => (
          <CompetitionCard
            key={competition.id}
            competition={competition}
            index={index}
            dict={dict}
          />
        ))}
      </div>
    </section>
  );
}
