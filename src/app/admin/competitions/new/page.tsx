import CompetitionForm from "@/components/admin/CompetitionForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add competition — Admin",
};

export default function NewCompetitionPage() {
  return (
    <div>
      <h2 className="mb-8 font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--fg)]">
        New competition
      </h2>
      <div className="border border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-10 md:px-10">
        <CompetitionForm mode="create" />
      </div>
    </div>
  );
}
