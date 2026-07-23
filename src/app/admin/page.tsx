import AdminCompetitionList from "@/components/admin/AdminCompetitionList";
import { listAdminCompetitions } from "@/app/actions/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Competitions",
};

export default async function AdminPage() {
  const result = await listAdminCompetitions();

  return (
    <AdminCompetitionList
      competitions={result.competitions as never[]}
      source={result.source}
      error={"error" in result ? result.error : undefined}
    />
  );
}
