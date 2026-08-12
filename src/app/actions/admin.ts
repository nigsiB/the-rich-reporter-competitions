"use server";

import { createClient } from "@/utils/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type {
  ActionResult,
  CompetitionAdminInput,
  CompetitionLocaleCopy,
  CompetitionTranslations,
} from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const TRANSLATION_LOCALES = ["es", "fr", "de", "pt", "it"] as const;

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

function normalizeTranslations(
  input: CompetitionTranslations | undefined,
): CompetitionTranslations {
  const out: CompetitionTranslations = {};
  for (const locale of TRANSLATION_LOCALES) {
    const entry = input?.[locale];
    const title = entry?.title?.trim() ?? "";
    const prize_description = entry?.prize_description?.trim() ?? "";
    if (!title && !prize_description) continue;
    const cleaned: CompetitionLocaleCopy = { title, prize_description };
    out[locale] = cleaned;
  }
  return out;
}

function normalizeGalleryUrls(urls: string[] | undefined, mainUrl: string): string[] {
  if (!urls?.length) return [];
  const seen = new Set<string>([mainUrl.trim()]);
  const out: string[] = [];
  for (const raw of urls) {
    const url = raw.trim();
    if (!url || seen.has(url)) continue;
    seen.add(url);
    out.push(url);
  }
  return out;
}

async function requireAdmin() {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured." as const, supabase: null, userId: null };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "You must be signed in." as const, supabase: null, userId: null };
  }
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();
  if (!profile?.is_admin) {
    return { error: "Admin access required." as const, supabase: null, userId: null };
  }
  return { error: null, supabase, userId: user.id };
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/jpg"]);

function extensionForMime(mime: string): string {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}

export async function uploadCompetitionImageAction(
  formData: FormData,
): Promise<ActionResult<{ publicUrl: string; path: string }>> {
  const { error, supabase } = await requireAdmin();
  if (error || !supabase) return { success: false, error };

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { success: false, error: "No image file provided." };
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return { success: false, error: "Please choose a JPG, PNG, or WebP image." };
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return { success: false, error: "Image must be 5MB or smaller." };
  }

  const ext = extensionForMime(file.type);
  const path = `${crypto.randomUUID()}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from("competition-images")
    .upload(path, bytes, {
      contentType: file.type,
      upsert: false,
      cacheControl: "3600",
    });

  if (uploadError) {
    return { success: false, error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("competition-images").getPublicUrl(path);

  return { success: true, data: { publicUrl, path } };
}

export async function createCompetitionAction(
  input: CompetitionAdminInput,
): Promise<ActionResult<{ id: string }>> {
  const { error, supabase } = await requireAdmin();
  if (error || !supabase) return { success: false, error };

  const cascade = Boolean(input.translationsCascade);
  const imageUrl = input.imageUrl.trim();
  const galleryUrls = normalizeGalleryUrls(input.galleryUrls, imageUrl);

  const { data, error: insertError } = await supabase
    .from("competitions")
    .insert({
      title: input.title.trim(),
      prize_description: input.prizeDescription.trim(),
      translations: cascade ? {} : normalizeTranslations(input.translations),
      translations_cascade: cascade,
      total_entries: input.totalEntries,
      price_per_entry: input.pricePerEntry,
      cash_alternative: input.cashAlternative,
      retail_value: input.retailValue,
      is_monthly: input.isMonthly,
      draw_date: input.drawDate || null,
      image_url: imageUrl,
      gallery_urls: galleryUrls,
      display_order: input.displayOrder,
      status: input.status,
    })
    .select("id")
    .single();

  if (insertError || !data) {
    return { success: false, error: insertError?.message ?? "Failed to create competition." };
  }

  if (input.generateTickets) {
    const ticketError = await generateTickets(supabase, data.id, input.totalEntries);
    if (ticketError) {
      revalidatePath("/admin");
      return { success: false, error: ticketError };
    }
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, data: { id: data.id } };
}

/**
 * Create the ticket inventory and prove it actually landed.
 *
 * The RPC error was previously discarded, so a failed generation still
 * reported success and published a competition nobody could enter. Older
 * databases still run the row-at-a-time version of
 * generate_tickets_for_competition, which is killed by statement_timeout
 * (57014) well before 180,000 rows — see migrations/010. Counting afterwards
 * catches that, and any other partial write, regardless of which version of
 * the function the database happens to have.
 *
 * Returns an error message, or null on success.
 */
async function generateTickets(
  supabase: SupabaseClient,
  competitionId: string,
  totalEntries: number,
): Promise<string | null> {
  const { error: rpcError } = await supabase.rpc("generate_tickets_for_competition", {
    p_competition_id: competitionId,
    p_total: totalEntries,
  });

  const { count, error: countError } = await supabase
    .from("tickets")
    .select("id", { count: "exact", head: true })
    .eq("competition_id", competitionId);

  if (countError) {
    return `The competition was created, but its tickets could not be verified: ${countError.message}. Check the competition before publishing it.`;
  }

  if ((count ?? 0) >= totalEntries) return null;

  const created = count ?? 0;
  const detail = rpcError
    ? rpcError.message
    : "ticket generation stopped early (most likely a database statement timeout)";

  return (
    `The competition was created but only ${created.toLocaleString()} of ` +
    `${totalEntries.toLocaleString()} tickets were generated — ${detail}. ` +
    `It is saved as-is and nobody can enter it yet. Run the migration in ` +
    `supabase/migrations/010_fast_ticket_generation.sql, then delete and ` +
    `recreate this competition.`
  );
}

export async function updateCompetitionAction(
  id: string,
  input: CompetitionAdminInput,
): Promise<ActionResult> {
  const { error, supabase } = await requireAdmin();
  if (error || !supabase) return { success: false, error };

  const cascade = Boolean(input.translationsCascade);
  const imageUrl = input.imageUrl.trim();
  const galleryUrls = normalizeGalleryUrls(input.galleryUrls, imageUrl);

  const { error: updateError } = await supabase
    .from("competitions")
    .update({
      title: input.title.trim(),
      prize_description: input.prizeDescription.trim(),
      translations: cascade ? {} : normalizeTranslations(input.translations),
      translations_cascade: cascade,
      total_entries: input.totalEntries,
      price_per_entry: input.pricePerEntry,
      cash_alternative: input.cashAlternative,
      retail_value: input.retailValue,
      is_monthly: input.isMonthly,
      draw_date: input.drawDate || null,
      image_url: imageUrl,
      gallery_urls: galleryUrls,
      display_order: input.displayOrder,
      status: input.status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/competitions/${id}`);
  revalidatePath(`/admin/competitions/${id}`);
  return { success: true, message: "Competition updated." };
}

export async function updateDisplayOrderAction(
  items: { id: string; displayOrder: number }[],
): Promise<ActionResult> {
  const { error, supabase } = await requireAdmin();
  if (error || !supabase) return { success: false, error };

  for (const item of items) {
    const { error: updateError } = await supabase
      .from("competitions")
      .update({ display_order: item.displayOrder, updated_at: new Date().toISOString() })
      .eq("id", item.id);
    if (updateError) {
      return { success: false, error: updateError.message };
    }
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, message: "Order saved." };
}

export async function deleteCompetitionAction(id: string): Promise<ActionResult> {
  const { error, supabase } = await requireAdmin();
  if (error || !supabase) return { success: false, error };

  const { error: deleteError } = await supabase.from("competitions").delete().eq("id", id);
  if (deleteError) return { success: false, error: deleteError.message };

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function listAdminCompetitions() {
  if (!isSupabaseConfigured()) {
    return { competitions: [], source: "demo" as const };
  }

  const { error, supabase } = await requireAdmin();
  if (error || !supabase) {
    return { competitions: [], source: "error" as const, error };
  }

  const { data } = await supabase
    .from("competitions")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  return { competitions: data ?? [], source: "live" as const };
}

export async function getAdminCompetition(id: string) {
  const { error, supabase } = await requireAdmin();
  if (error || !supabase) return null;

  const { data } = await supabase.from("competitions").select("*").eq("id", id).single();
  return data;
}

export async function listContactMessages() {
  const { error, supabase } = await requireAdmin();
  if (error || !supabase) return [];

  const { data } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return data ?? [];
}

export type AdminMember = {
  id: string;
  email: string | null;
  full_name: string | null;
  country: string | null;
  created_at: string | null;
  marketing_opt_in: boolean | null;
  is_admin: boolean | null;
  phone: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  ticket_count: number;
};

export async function listAdminMembers(): Promise<{
  members: AdminMember[];
  currentUserId: string | null;
  error?: string;
}> {
  const { error, supabase, userId } = await requireAdmin();
  if (error || !supabase) {
    return { members: [], currentUserId: null, error: error ?? "Admin access required." };
  }

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select(
      "id, email, full_name, country, created_at, marketing_opt_in, is_admin, phone, address_line1, address_line2, city, state, postal_code",
    )
    .order("created_at", { ascending: false });

  if (profilesError) {
    return { members: [], currentUserId: userId, error: profilesError.message };
  }

  const ids = (profiles ?? []).map((p) => p.id);
  const ticketCounts = new Map<string, number>();

  if (ids.length > 0) {
    const { data: tickets } = await supabase
      .from("tickets")
      .select("user_id")
      .in("user_id", ids)
      .eq("status", "sold");

    for (const row of tickets ?? []) {
      if (!row.user_id) continue;
      ticketCounts.set(row.user_id, (ticketCounts.get(row.user_id) ?? 0) + 1);
    }
  }

  const members: AdminMember[] = (profiles ?? []).map((p) => ({
    id: p.id,
    email: p.email,
    full_name: p.full_name,
    country: p.country,
    created_at: p.created_at,
    marketing_opt_in: p.marketing_opt_in,
    is_admin: p.is_admin,
    phone: p.phone,
    address_line1: p.address_line1,
    address_line2: p.address_line2,
    city: p.city,
    state: p.state,
    postal_code: p.postal_code,
    ticket_count: ticketCounts.get(p.id) ?? 0,
  }));

  return { members, currentUserId: userId };
}

export async function setMemberAdminAction(
  memberId: string,
  isAdmin: boolean,
): Promise<ActionResult> {
  const { error, supabase, userId } = await requireAdmin();
  if (error || !supabase || !userId) return { success: false, error: error ?? "Admin access required." };

  if (!memberId?.trim()) {
    return { success: false, error: "Member id is required." };
  }

  if (!isAdmin) {
    const { data: admins, error: countError } = await supabase
      .from("profiles")
      .select("id")
      .eq("is_admin", true);

    if (countError) {
      return { success: false, error: countError.message };
    }

    const adminIds = (admins ?? []).map((a) => a.id);
    const isTargetAdmin = adminIds.includes(memberId);
    if (isTargetAdmin && adminIds.length <= 1) {
      return { success: false, error: "Cannot revoke the last remaining admin." };
    }

    if (memberId === userId && adminIds.length <= 1) {
      return { success: false, error: "You cannot revoke your own admin access while you are the only admin." };
    }
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ is_admin: isAdmin, updated_at: new Date().toISOString() })
    .eq("id", memberId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  revalidatePath("/admin/members");
  return {
    success: true,
    message: isAdmin ? "Admin privileges granted." : "Admin privileges revoked.",
  };
}
