import Link from "next/link";
import AmoeBlock from "@/components/AmoeBlock";
import CompetitionGrid from "@/components/CompetitionGrid";
import { getActiveCompetitions } from "@/lib/competitions";
import { getDictionary } from "@/i18n/getDictionary";

export default async function HomePage() {
  const { competitions } = await getActiveCompetitions();
  const { dict } = await getDictionary();

  return (
    <main>
      <section
        className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-20 pt-32 md:px-10 md:pb-28"
        aria-labelledby="hero-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[url('https://images.unsplash.com/photo-1697636979792-fb057f6cbe8d?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[var(--bg-deep)]/45"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-[var(--bg-deep)]/88 to-[var(--bg-deep)]/50"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--bg-deep)]/70 via-transparent to-[var(--bg-deep)]/30"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--champagne)]">
            {dict.membersOnly}
          </p>
          <h1
            id="hero-heading"
            className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[1.05] tracking-wide text-[var(--fg)] md:text-7xl lg:text-8xl"
          >
            {dict.heroHeadline}
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--muted)] md:text-base">
            {dict.heroSub}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href="#competitions"
              className="border border-[var(--champagne)]/60 bg-[var(--champagne)] px-9 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--bg-deep)] transition-opacity duration-300 hover:opacity-90"
            >
              {dict.viewCollection}
            </Link>
            <Link
              href="/membership"
              className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--champagne)]"
            >
              {dict.becomeMember}
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-28 px-6 py-24 md:px-10 md:py-32">
        <CompetitionGrid competitions={competitions} dict={dict} />

        <section id="how-it-works" className="scroll-mt-24" aria-labelledby="membership-heading">
          <div className="grid gap-12 md:grid-cols-2 md:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
                {dict.howItWorks}
              </p>
              <h2
                id="membership-heading"
                className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)] md:text-5xl"
              >
                {dict.howHeading}
              </h2>
            </div>
            <ol className="space-y-8 text-sm leading-relaxed text-[var(--muted)]">
              <li className="border-l border-[var(--border)] pl-6">
                <span className="block text-[10px] uppercase tracking-[0.22em] text-[var(--champagne)]">
                  01
                </span>
                <span className="mt-2 block text-[var(--fg)]">{dict.step1Title}</span>
                {dict.step1Body}
              </li>
              <li className="border-l border-[var(--border)] pl-6">
                <span className="block text-[10px] uppercase tracking-[0.22em] text-[var(--champagne)]">
                  02
                </span>
                <span className="mt-2 block text-[var(--fg)]">{dict.step2Title}</span>
                {dict.step2Body}
              </li>
              <li className="border-l border-[var(--border)] pl-6">
                <span className="block text-[10px] uppercase tracking-[0.22em] text-[var(--champagne)]">
                  03
                </span>
                <span className="mt-2 block text-[var(--fg)]">{dict.step3Title}</span>
                {dict.step3Body}
              </li>
            </ol>
          </div>
        </section>

        <p className="max-w-2xl text-center text-xs leading-relaxed tracking-wide text-[var(--muted)] md:mx-auto">
          {dict.worldwide}
        </p>

        <AmoeBlock />
      </div>
    </main>
  );
}
