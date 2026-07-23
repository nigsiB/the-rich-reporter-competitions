import type { Competition } from "@/data/competitions";
import { competitions as localCompetitions } from "@/data/competitions";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/utils/supabase/server";

type DbCompetition = {
  id: string;
  title: string;
  prize_description: string;
  total_entries: number;
  price_per_entry: number | string;
  cash_alternative?: number | string | null;
  retail_value?: number | string | null;
  is_monthly?: boolean | null;
  draw_date: string | null;
  image_url: string | null;
  display_order: number | null;
  status: "active" | "paused" | "completed";
};

function mapCompetition(row: DbCompetition, entriesRemaining: number): Competition {
  return {
    id: row.id,
    title: row.title,
    prizeDescription: row.prize_description,
    totalEntries: row.total_entries,
    entriesRemaining,
    pricePerEntry: Number(row.price_per_entry),
    cashAlternative: Number(row.cash_alternative ?? 0),
    retailValue: Number(row.retail_value ?? row.cash_alternative ?? 0),
    drawDate: row.draw_date ?? new Date().toISOString(),
    imageUrl: row.image_url ?? "",
    displayOrder: row.display_order ?? 0,
    status: row.status,
    isMonthly: Boolean(row.is_monthly),
  };
}

async function countAvailable(competitionId: string): Promise<number | null> {
  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from("tickets")
      .select("*", { count: "exact", head: true })
      .eq("competition_id", competitionId)
      .eq("status", "available");
    if (error) return null;
    return count ?? 0;
  } catch {
    return null;
  }
}

/** Homepage shows exactly five prizes. */
const HOMEPAGE_LIMIT = 5;

export async function getActiveCompetitions(): Promise<{
  competitions: Competition[];
  source: "live" | "local";
}> {
  if (!isSupabaseConfigured()) {
    return {
      competitions: [...localCompetitions]
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .slice(0, HOMEPAGE_LIMIT),
      source: "local",
    };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("competitions")
      .select("*")
      .eq("status", "active")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(HOMEPAGE_LIMIT);

    if (error || !data?.length) {
      return {
        competitions: [...localCompetitions]
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .slice(0, HOMEPAGE_LIMIT),
        source: "local",
      };
    }

    const mapped: Competition[] = [];
    for (const row of data as DbCompetition[]) {
      const available = await countAvailable(row.id);
      mapped.push(mapCompetition(row, available ?? row.total_entries));
    }

    return { competitions: mapped.slice(0, HOMEPAGE_LIMIT), source: "live" };
  } catch {
    return {
      competitions: [...localCompetitions]
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .slice(0, HOMEPAGE_LIMIT),
      source: "local",
    };
  }
}

export async function getLiveCompetitionById(
  id: string,
): Promise<{ competition: Competition | null; source: "live" | "local" }> {
  if (!isSupabaseConfigured()) {
    const local = localCompetitions.find((c) => c.id === id) ?? null;
    return { competition: local, source: "local" };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("competitions")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      const local = localCompetitions.find((c) => c.id === id) ?? null;
      return { competition: local, source: "local" };
    }

    const available = await countAvailable(id);
    return {
      competition: mapCompetition(data as DbCompetition, available ?? data.total_entries),
      source: "live",
    };
  } catch {
    const local = localCompetitions.find((c) => c.id === id) ?? null;
    return { competition: local, source: "local" };
  }
}
