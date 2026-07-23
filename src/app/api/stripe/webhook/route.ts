import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createServiceClient } from "@/utils/supabase/admin";

export const runtime = "nodejs";

async function fulfillPayment(paymentIntent: Stripe.PaymentIntent) {
  const ticketIds = (paymentIntent.metadata.ticket_ids ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (!ticketIds.length) return;

  const supabase = createServiceClient();

  await supabase.rpc("mark_tickets_sold", {
    p_ticket_ids: ticketIds,
    p_payment_intent_id: paymentIntent.id,
  });

  await supabase
    .from("payments")
    .update({
      status: "succeeded",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_payment_intent_id", paymentIntent.id);
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook not configured" }, { status: 500 });
  }

  const body = await request.text();
  const headerList = await headers();
  const signature = headerList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    await fulfillPayment(event.data.object as Stripe.PaymentIntent);
  }

  if (event.type === "payment_intent.payment_failed") {
    const pi = event.data.object as Stripe.PaymentIntent;
    try {
      const supabase = createServiceClient();
      await supabase
        .from("payments")
        .update({ status: "failed", updated_at: new Date().toISOString() })
        .eq("stripe_payment_intent_id", pi.id);
    } catch {
      // ignore when service role missing in local demo
    }
  }

  return NextResponse.json({ received: true });
}
