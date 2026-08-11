import CompetitionCard from "@/components/CompetitionCard";
import FadeIn from "@/components/motion/FadeIn";
import type { Competition } from "@/data/competitions";
import type { Dictionary, Locale } from "@/i18n/dictionaries";

type CompetitionGridProps = {
  competitions: Competition[];
  dict: Dictionary;
  locale: Locale;
};

export default function CompetitionGrid({ competitions, dict, locale }: CompetitionGridProps) {
  return (
    <section id="competitions" className="scroll-mt-28" aria-labelledby="competitions-heading">
      <FadeIn>
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
      </FadeIn>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {competitions.map((competition, index) => (
          // Stagger caps at 4 so a long grid never trails far behind the scroll.
          <FadeIn key={competition.id} className="h-full" delay={Math.min(index, 3) * 0.08}>
            <CompetitionCard
              competition={competition}
              index={index}
              dict={dict}
              locale={locale}
            />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
