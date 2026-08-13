import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PrintButton from "@/components/PrintButton";
import { getLiveCompetitionById } from "@/lib/competitions";
import { getDictionary } from "@/i18n/getDictionary";
import { localizeCompetition } from "@/i18n/competitions";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { competition: raw } = await getLiveCompetitionById(id);
  if (!raw) return { title: "AMOE form — The Rich Reporter" };
  const { locale } = await getDictionary();
  const competition = localizeCompetition(raw, locale);
  return {
    title: `AMOE — ${competition.title}`,
  };
}

export default async function AmoeFormPage({ params }: PageProps) {
  const { id } = await params;
  const { competition: raw } = await getLiveCompetitionById(id);
  if (!raw) notFound();

  const { locale, dict } = await getDictionary();
  const competition = localizeCompetition(raw, locale);

  const mailTo = "Rich Reporter Magazine — Competitions Desk, AMOE Processing, United States";

  return (
    <main className="mx-auto max-w-3xl px-6 pb-28 pt-32 md:px-10 print:px-0 print:pt-8">
      <div className="print-hide mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href="/amoe"
          className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] hover:text-[var(--champagne)]"
        >
          ← All forms
        </Link>
        <PrintButton />
      </div>

      <article className="paper px-8 py-10 shadow-[0_18px_60px_rgba(0,0,0,0.45)] md:px-12 md:py-14">
        <header className="flex items-start justify-between gap-6 border-b paper-rule pb-6">
          <div>
            <p className="paper-accent text-[10px] uppercase tracking-[0.3em]">{dict.amoe}</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-wide md:text-4xl">
              {competition.title}
            </h1>
          </div>
          {/* Navy mark, not the champagne one — this sheet is ink on paper. */}
          <Image
            src="/logos/rich-reporter-navy.png"
            alt="The Rich Reporter"
            width={900}
            height={370}
            className="h-12 w-auto shrink-0"
          />
        </header>

        <p className="paper-muted mt-6 text-sm leading-relaxed">
          {competition.prizeDescription}
        </p>

        <section className="mt-10 space-y-4 text-sm leading-relaxed">
          <h2 className="paper-accent text-[10px] uppercase tracking-[0.22em]">Instructions</h2>
          <ol className="paper-muted list-decimal space-y-2 pl-5">
            <li>Print this form or write the same information clearly on a postcard or letter.</li>
            <li>Complete every field below in ink.</li>
            <li>
              Mail to: <strong className="text-[#14140f]">{mailTo}</strong>
            </li>
            <li>
              Limit one free entry per outer mailing envelope unless Official Rules provide
              otherwise.
            </li>
            <li>
              Entries must be postmarked by the competition draw date and received within seven days
              thereafter.
            </li>
          </ol>
        </section>

        <section className="mt-10 space-y-6">
          <h2 className="paper-accent text-[10px] uppercase tracking-[0.22em]">Entrant details</h2>
          {[
            "Full legal name",
            "Date of birth (must be 18+)",
            "Street address",
            "City",
            "State / Province / Region",
            "Postal / ZIP code",
            "Country",
            "Email address",
            "Telephone",
          ].map((label) => (
            <div key={label}>
              <p className="paper-muted text-[10px] uppercase tracking-[0.18em]">{label}</p>
              <div className="paper-rule mt-2 h-10 border-b" />
            </div>
          ))}
        </section>

        <section className="paper-muted mt-10 space-y-3 border-t paper-rule pt-6 text-xs leading-relaxed">
          <p>
            Competition ID: {competition.id} · Draw date:{" "}
            {new Date(competition.drawDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>
            By submitting this form you confirm you meet eligibility requirements in the Official
            Rules. Void where prohibited. Odds depend on the number of eligible entries received.
          </p>
          <p>
            Full terms: Official Rules at /legal/official-rules on The Rich Reporter Competitions
            site.
          </p>
        </section>
      </article>
    </main>
  );
}
