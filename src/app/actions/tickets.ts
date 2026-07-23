"use server";

import { createClient } from "@/utils/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import type { ActionResult } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function reserveTicketsAction(competitionId: string, quantity: number) {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: "Ticketing is not connected. Add Supabase credentials to enable entry.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "You must be logged in to enter." };
  }

  // Release any expired holds before reserving
  await supabase.rpc("release_expired_reservations", {
    p_minutes: Number(process.env.RESERVATION_EXPIRY_MINUTES ?? 15),
  });

  try {
    const { data, error } = await supabase.rpc("reserve_tickets", {
      p_competition_id: competitionId,
      p_user_id: user.id,
      p_quantity: quantity,
    });

    if (error) {
      return {
        success: false,
        error: error.message.includes("Not enough tickets")
          ? "Sorry, this competition has sold out or not enough tickets remain."
          : "Failed to secure tickets. Please try again.",
      };
    }

    revalidatePath(`/competitions/${competitionId}`);
    revalidatePath("/");

    return { success: true, data: data };
  } catch {
    return { success: false, error: "An unexpected system error occurred." };
  }
}

export async function createCheckoutPaymentIntent(
  ticketIds: string[],
): Promise<ActionResult<{ clientSecret: string; amount: number; competitionId: string }>> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Supabase is not configured." };
  }
  if (!isStripeConfigured()) {
    return {
      success: false,
      error: "Stripe is not configured. Add STRIPE_SECRET_KEY and publishable key.",
    };
  }

  const stripe = getStripe();
  if (!stripe) return { success: false, error: "Stripe unavailable." };

  if (!ticketIds.length) {
    return { success: false, error: "No reserved tickets found." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "You must be logged in to checkout." };
  }

  const { data: tickets, error } = await supabase
    .from("tickets")
    .select("id, competition_id, status, user_id")
    .in("id", ticketIds);

  if (error || !tickets?.length) {
    return { success: false, error: "Reserved tickets not found." };
  }

  const invalid = tickets.some(
    (t) => t.status !== "reserved" || t.user_id !== user.id,
  );
  if (invalid) {
    return { success: false, error: "One or more tickets are no longer reserved for you." };
  }

  const competitionId = tickets[0].competition_id as string;
  if (tickets.some((t) => t.competition_id !== competitionId)) {
    return { success: false, error: "Tickets must belong to a single competition." };
  }

  const { data: competition } = await supabase
    .from("competitions")
    .select("title, price_per_entry")
    .eq("id", competitionId)
    .single();

  if (!competition) {
    return { success: false, error: "Competition not found." };
  }

  const unitAmount = Math.round(Number(competition.price_per_entry) * 100);
  const amount = unitAmount * tickets.length;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    metadata: {
      user_id: user.id,
      competition_id: competitionId,
      ticket_ids: tickets.map((t) => t.id).join(","),
    },
    receipt_email: user.email ?? undefined,
  });

  await supabase.from("tickets").update({ payment_intent_id: paymentIntent.id }).in(
    "id",
    tickets.map((t) => t.id),
  );

  await supabase.from("payments").upsert(
    {
      user_id: user.id,
      competition_id: competitionId,
      stripe_payment_intent_id: paymentIntent.id,
      amount_cents: amount,
      currency: "usd",
      status: "pending",
      ticket_ids: tickets.map((t) => t.id),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_payment_intent_id" },
  );

  if (!paymentIntent.client_secret) {
    return { success: false, error: "Unable to start payment." };
  }

  return {
    success: true,
    data: {
      clientSecret: paymentIntent.client_secret,
      amount,
      competitionId,
    },
  };
}
