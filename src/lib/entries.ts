import { createClient } from "@/utils/supabase/server";

export type EntryGroup = {
  competitionId: string;
  title: string;
  drawDate: string | null;
  /** Ascending. Each number is unique within its competition. */
  ticketNumbers: number[];
  sold: number;
  reserved: number;
};

type Row = {
  ticket_number: number;
  status: string;
  competition_id: string;
  competitions: { title: string; draw_date: string | null } | null;
};

function group(rows: Row[]): EntryGroup[] {
  const byCompetition = new Map<string, EntryGroup>();

  for (const row of rows) {
    let entry = byCompetition.get(row.competition_id);
    if (!entry) {
      entry = {
        competitionId: row.competition_id,
        title: row.competitions?.title ?? "Competition",
        drawDate: row.competitions?.draw_date ?? null,
        ticketNumbers: [],
        sold: 0,
        reserved: 0,
      };
      byCompetition.set(row.competition_id, entry);
    }
    entry.ticketNumbers.push(row.ticket_number);
    if (row.status === "sold") entry.sold += 1;
    if (row.status === "reserved") entry.reserved += 1;
  }

  for (const entry of byCompetition.values()) {
    entry.ticketNumbers.sort((a, b) => a - b);
  }
  return [...byCompetition.values()];
}

const SELECT = "ticket_number,status,competition_id,competitions(title,draw_date)";

/**
 * Every entry the signed-in member holds, grouped by competition.
 *
 * Filtered on user_id explicitly: RLS also exposes rows with status
 * 'available' to everyone, so relying on the policy alone would return the
 * entire unsold pool.
 */
export async function getMyEntries(userId: string): Promise<EntryGroup[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("tickets")
      .select(SELECT)
      .eq("user_id", userId)
      .in("status", ["reserved", "sold"])
      .order("ticket_number", { ascending: true });

    if (error || !data) return [];
    return group(data as unknown as Row[]);
  } catch {
    return [];
  }
}

/** Just the entries bought in one payment, for the post-checkout receipt. */
export async function getEntriesByPaymentIntent(
  userId: string,
  paymentIntentId: string,
): Promise<EntryGroup[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("tickets")
      .select(SELECT)
      .eq("user_id", userId)
      .eq("payment_intent_id", paymentIntentId)
      .order("ticket_number", { ascending: true });

    if (error || !data) return [];
    return group(data as unknown as Row[]);
  } catch {
    return [];
  }
}
