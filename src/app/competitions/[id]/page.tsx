import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CountdownTimer from "@/components/CountdownTimer";
import InventoryBar from "@/components/InventoryBar";
import TicketCheckoutBtn from "@/components/TicketCheckoutBtn";
import { competitions, formatUsd } from "@/data/competitions";
import { getLiveCompetitionById } from "@/lib/competitions";
import { getSessionProfile } from "@/app/actions/auth";
import { getDictionary } from "@/i18n/getDictionary";
import { t } from "@/i18n/dictionaries";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return competitions.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const { competition } = await getLiveCompetitionById(id);
  if (!competition) return { title: "Competition" };
  return {
    title: `${competition.title} — The Rich Reporter`,
    description: competition.prizeDescription,
  };
}

export default async function CompetitionPage({ params }: PageProps) {
  const { id } = await params;
  const { competition } = await getLiveCompetitionById(id);
  if (!competition) notFound();

  const { dict } = await getDictionary();
  const { user } = await getSessionProfile();
  const price = formatUsd(competition.pricePerEntry);
  const cashAlt = formatUsd(competition.cashAlternative);
  const returnPath = `/competitions/${competition.id}`;

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
            className="object-cover brightness-[0.72] contrast-[1.12] saturate-[0.85]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)]/55 via-transparent to-[var(--bg-deep)]/20"
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-col justify-center py-4">
          <Link
            href="/#competitions"
            className="mb-8 w-fit text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)]"
          >
            {dict.backCollection}
          </Link>

          <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
            {dict.limitedTo} {competition.totalEntries.toLocaleString("en-US")} {dict.entriesWord}
            {competition.isMonthly ? " · Monthly" : ""}
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
                {dict.liveInventory}
              </span>
              <CountdownTimer drawDate={competition.drawDate} />
            </div>
            <InventoryBar
              competitionId={competition.id}
              totalEntries={competition.totalEntries}
              initialAvailable={competition.entriesRemaining}
            />
            <p className="text-sm text-[var(--muted)]">
              <span className="text-[var(--fg)]">{price}</span> {dict.perEntry} · {dict.chooseQty}
            </p>
            <p className="text-xs leading-relaxed text-[var(--muted)]">
              {t(dict, "cashAltLine", { amount: cashAlt })}
            </p>
            <p className="text-xs leading-relaxed text-[var(--muted)]">{dict.worldwide}</p>
          </div>

          <div className="mt-10">
            <TicketCheckoutBtn
              competitionId={competition.id}
              pricePerEntry={competition.pricePerEntry}
              isAuthenticated={Boolean(user)}
              returnPath={returnPath}
              dict={dict}
            />
          </div>

          <p className="mt-6 text-xs leading-relaxed text-[var(--muted)]">
            {dict.noPurchase}{" "}
            <Link href="/amoe" className="text-[var(--champagne)] underline-offset-4 hover:underline">
              {dict.amoe}
            </Link>{" "}
            {dict.and}{" "}
            <Link
              href="/legal/official-rules"
              className="text-[var(--champagne)] underline-offset-4 hover:underline"
            >
              {dict.officialRules}
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
