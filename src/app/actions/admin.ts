"use server";

import { createClient } from "@/utils/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { ActionResult, CompetitionAdminInput } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function createCompetitionAction(
  input: CompetitionAdminInput,
): Promise<ActionResult<{ id: string }>> {
  const { error, supabase } = await requireAdmin();
  if (error || !supabase) return { success: false, error };

  const { data, error: insertError } = await supabase
    .from("competitions")
    .insert({
      title: input.title.trim(),
      prize_description: input.prizeDescription.trim(),
      total_entries: input.totalEntries,
      price_per_entry: input.pricePerEntry,
      draw_date: input.drawDate || null,
      image_url: input.imageUrl.trim(),
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

  const { error: updateError } = await supabase
    .from("competitions")
    .update({
      title: input.title.trim(),
      prize_description: input.prizeDescription.trim(),
      total_entries: input.totalEntries,
      price_per_entry: input.pricePerEntry,
      draw_date: input.drawDate || null,
      image_url: input.imageUrl.trim(),
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
