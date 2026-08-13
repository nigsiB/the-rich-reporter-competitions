import type { Competition } from "@/data/competitions";
import { competitions as localCompetitions } from "@/data/competitions";
import { isSupabaseConfigured } from "@/lib/env";
import type { CompetitionTranslations } from "@/lib/types";
import { createPublicClient } from "@/utils/supabase/public";
import { unstable_cache } from "next/cache";

/** Drop Unsplash sat/bri crush params so product photos stay vibrant. */
function normalizeImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  try {
    const u = new URL(url);
    u.searchParams.delete("sat");
    u.searchParams.delete("bri");
    return u.toString();
  } catch {
    return url
      .replace(/[&?]sat=-?\d+/g, "")
      .replace(/[&?]bri=-?\d+/g, "")
      .replace(/\?&/, "?")
      .replace(/\?$/, "");
  }
}

type DbCompetition = {
  id: string;
  title: string;
  prize_description: string;
  translations?: CompetitionTranslations | null;
  translations_cascade?: boolean | null;
  total_entries: number;
  price_per_entry: number | string;
  cash_alternative?: number | string | null;
  retail_value?: number | string | null;
  is_monthly?: boolean | null;
  draw_date: string | null;
  image_url: string | null;
  gallery_urls?: string[] | null;
  display_order: number | null;
  status: "active" | "paused" | "completed";
};

function mapCompetition(row: DbCompetition, entriesRemaining: number): Competition {
  const gallery = Array.isArray(row.gallery_urls)
    ? row.gallery_urls
        .filter((u): u is string => typeof u === "string" && u.trim().length > 0)
        .map(normalizeImageUrl)
    : [];
  return {
    id: row.id,
    title: row.title,
    prizeDescription: row.prize_description,
    translations: row.translations ?? null,
    // DB default is true for new rows; missing/legacy rows keep locale overrides (static map).
    translationsCascade: row.translations_cascade ?? false,
    totalEntries: row.total_entries,
    entriesRemaining,
    pricePerEntry: Number(row.price_per_entry),
    cashAlternative: Number(row.cash_alternative ?? 0),
    retailValue: Number(row.retail_value ?? row.cash_alternative ?? 0),
    drawDate: row.draw_date ?? new Date().toISOString(),
    imageUrl: normalizeImageUrl(row.image_url),
    galleryUrls: gallery,
    displayOrder: row.display_order ?? 0,
    status: row.status,
    isMonthly: Boolean(row.is_monthly),
  };
}

type CountClient = ReturnType<typeof createPublicClient>;

/**
 * An exact count is unavoidably O(rows) — measured at ~3.4s for a
 * 600,000-ticket competition, and the homepage previously did one of these per
 * competition, sequentially, on every request. Callers must pass a shared
 * client and run these concurrently; see getActiveCompetitions.
 */
async function countAvailable(
  supabase: CountClient,
  competitionId: string,
): Promise<number | null> {
  try {
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

const localFallback = () => ({
  competitions: [...localCompetitions]
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .slice(0, HOMEPAGE_LIMIT),
  source: "local" as const,
});

/**
 * Cached because the ticket counts are expensive and identical for everyone.
 *
 * Uncached, the homepage spent ~6s server-side: four exact counts, run one
 * after another, over 797,600 ticket rows. Every other route answers in
 * ~0.25s. Sixty seconds of staleness is harmless here — InventoryBar
 * subscribes to Supabase Realtime on `tickets`, so the bars correct
 * themselves in the browser as tickets sell.
 */
const fetchActiveCompetitions = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("competitions")
      .select("*")
      .eq("status", "active")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(HOMEPAGE_LIMIT);

    if (error || !data?.length) return localFallback();

    const rows = data as DbCompetition[];
    // Concurrent, not sequential: total time is now the slowest count rather
    // than the sum of all of them.
    const counts = await Promise.all(rows.map((row) => countAvailable(supabase, row.id)));

    return {
      competitions: rows
        .map((row, i) => mapCompetition(row, counts[i] ?? row.total_entries))
        .slice(0, HOMEPAGE_LIMIT),
      source: "live" as const,
    };
  },
  ["active-competitions"],
  { revalidate: 60, tags: ["competitions"] },
);

export async function getActiveCompetitions(): Promise<{
  competitions: Competition[];
  source: "live" | "local";
}> {
  if (!isSupabaseConfigured()) return localFallback();

  try {
    return await fetchActiveCompetitions();
  } catch {
    return localFallback();
  }
}

/** Cached for the same reason as the homepage — see fetchActiveCompetitions. */
const fetchCompetitionById = unstable_cache(
  async (id: string) => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("competitions")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;

    const available = await countAvailable(supabase, id);
    return mapCompetition(data as DbCompetition, available ?? data.total_entries);
  },
  ["competition-by-id"],
  { revalidate: 60, tags: ["competitions"] },
);

export async function getLiveCompetitionById(
  id: string,
): Promise<{ competition: Competition | null; source: "live" | "local" }> {
  const local = () => ({
    competition: localCompetitions.find((c) => c.id === id) ?? null,
    source: "local" as const,
  });

  if (!isSupabaseConfigured()) return local();

  try {
    const competition = await fetchCompetitionById(id);
    return competition ? { competition, source: "live" } : local();
  } catch {
    return local();
  }
}
