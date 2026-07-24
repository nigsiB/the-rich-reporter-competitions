import Link from "next/link";
import type { Metadata } from "next";
import { getActiveCompetitions } from "@/lib/competitions";
import { getDictionary } from "@/i18n/getDictionary";
import { localizeCompetitions } from "@/i18n/competitions";

export const metadata: Metadata = {
  title: "AMOE — Free mail-in entry",
  description: "Download Alternative Method of Entry forms for The Rich Reporter competitions.",
};

export default async function AmoeIndexPage() {
  const { competitions: raw } = await getActiveCompetitions();
  const { dict, locale } = await getDictionary();
  const competitions = localizeCompetitions(raw, locale);

  return (
    <main className="mx-auto max-w-3xl px-6 pb-28 pt-32 md:px-10">
      <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
        {dict.amoeIndexEyebrow}
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)] md:text-5xl">
        {dict.amoeIndexHeading}
      </h1>
      <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">{dict.amoeIndexIntro}</p>
      <ul className="mt-12 divide-y divide-[var(--border)] border border-[var(--border)]">
        {competitions.map((c) => (
          <li key={c.id}>
            <Link
              href={`/amoe/${c.id}`}
              className="flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-[var(--bg-elevated)]"
            >
              <span className="font-[family-name:var(--font-display)] text-xl text-[var(--fg)]">
                {c.title}
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--champagne)]">
                {dict.amoeFormLabel}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
