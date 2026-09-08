import { unstable_cache } from "next/cache";

import { createPublicClient } from "@/utils/supabase/public";

export type Winner = {
  competitionId: string;
  ticketNumber: number;
  displayName: string | null;
  eligibleTickets: number;
  drawnAt: string;
};

type Row = {
  competition_id: string;
  ticket_number: number;
  display_name: string | null;
  eligible_tickets: number;
  drawn_at: string;
};

const map = (r: Row): Winner => ({
  competitionId: r.competition_id,
  ticketNumber: r.ticket_number,
  displayName: r.display_name,
  eligibleTickets: r.eligible_tickets,
  drawnAt: r.drawn_at,
});

const SELECT = "competition_id,ticket_number,display_name,eligible_tickets,drawn_at";

/**
 * Winners are public — announcing them is the point — and they never change
 * once drawn, so this is cached like the competition data.
 *
 * Returns an empty result rather than throwing when the winners table does not
 * exist yet, so the site keeps working before migration 013 is applied.
 */
const fetchWinners = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase.from("winners").select(SELECT);
    if (error || !data) return [] as Winner[];
    return (data as Row[]).map(map);
  },
  ["winners"],
  { revalidate: 60, tags: ["winners"] },
);

export async function getWinners(): Promise<Winner[]> {
  try {
    return await fetchWinners();
  } catch {
    return [];
  }
}

export async function getWinnerFor(competitionId: string): Promise<Winner | null> {
  const all = await getWinners();
  return all.find((w) => w.competitionId === competitionId) ?? null;
}
