import Link from "next/link";
import { notFound } from "next/navigation";
import PrintButton from "@/components/PrintButton";
import { getLiveCompetitionById } from "@/lib/competitions";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { competition } = await getLiveCompetitionById(id);
  return {
    title: competition ? `AMOE — ${competition.title}` : "AMOE form — The Rich Reporter",
  };
}

export default async function AmoeFormPage({ params }: PageProps) {
  const { id } = await params;
  const { competition } = await getLiveCompetitionById(id);
  if (!competition) notFound();

  const mailTo = "Rich Reporter Magazine — Competitions Desk, AMOE Processing, United States";

  return (
    <main className="mx-auto max-w-3xl px-6 pb-28 pt-32 md:px-10 print:px-0 print:pt-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href="/amoe"
          className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] hover:text-[var(--champagne)]"
        >
          ← All forms
        </Link>
        <PrintButton />
      </div>

      <article className="border border-[var(--border)] bg-[var(--bg-elevated)] px-8 py-10 text-[var(--fg)] md:px-12 md:py-14 print:border-black print:bg-white print:text-black">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--champagne)] print:text-neutral-600">
          Alternative Method of Entry
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-wide md:text-4xl">
          {competition.title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] print:text-neutral-700">
          {competition.prizeDescription}
        </p>

        <section className="mt-10 space-y-4 text-sm leading-relaxed">
          <h2 className="text-[10px] uppercase tracking-[0.22em] text-[var(--champagne)] print:text-neutral-600">
            Instructions
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-[var(--muted)] print:text-neutral-700">
            <li>Print this form or write the same information clearly on a postcard or letter.</li>
            <li>Complete every field below in ink.</li>
            <li>
              Mail to: <strong className="text-[var(--fg)] print:text-black">{mailTo}</strong>
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
          <h2 className="text-[10px] uppercase tracking-[0.22em] text-[var(--champagne)] print:text-neutral-600">
            Entrant details
          </h2>
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
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] print:text-neutral-600">
                {label}
              </p>
              <div className="mt-2 h-10 border-b border-[var(--border-strong)] print:border-neutral-400" />
            </div>
          ))}
        </section>

        <section className="mt-10 space-y-3 text-xs leading-relaxed text-[var(--muted)] print:text-neutral-600">
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
