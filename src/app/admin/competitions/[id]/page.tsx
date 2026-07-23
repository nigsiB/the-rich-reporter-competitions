import CompetitionForm from "@/components/admin/CompetitionForm";
import { getAdminCompetition } from "@/app/actions/admin";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCompetitionPage({ params }: PageProps) {
  const { id } = await params;
  const competition = await getAdminCompetition(id);
  if (!competition) notFound();

  return (
    <div>
      <h2 className="mb-8 font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--fg)]">
        Edit competition
      </h2>
      <div className="border border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-10 md:px-10">
        <CompetitionForm
          mode="edit"
          competitionId={id}
          initial={{
            title: competition.title,
            prizeDescription: competition.prize_description,
            totalEntries: competition.total_entries,
            pricePerEntry: Number(competition.price_per_entry),
            drawDate: competition.draw_date ?? "",
            imageUrl: competition.image_url ?? "",
            displayOrder: competition.display_order ?? 0,
            status: competition.status,
          }}
        />
      </div>
    </div>
  );
}
