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
    await supabase.rpc("generate_tickets_for_competition", {
      p_competition_id: data.id,
      p_total: input.totalEntries,
    });
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, data: { id: data.id } };
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
