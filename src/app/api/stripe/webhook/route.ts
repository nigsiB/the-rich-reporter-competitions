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

async function syncSubscription(subscription: Stripe.Subscription) {
  const supabase = createServiceClient();
  const price = subscription.items.data[0]?.price;
  const periodEnd =
    "current_period_end" in subscription && typeof subscription.current_period_end === "number"
      ? new Date(subscription.current_period_end * 1000).toISOString()
      : null;

  await supabase.from("subscriptions").upsert(
    {
      user_id: subscription.metadata.user_id || null,
      email:
        typeof subscription.customer === "string"
          ? ""
          : ((subscription.customer as Stripe.Customer)?.email ?? ""),
      stripe_customer_id:
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id,
      stripe_subscription_id: subscription.id,
      stripe_price_id: price?.id ?? null,
      status: subscription.status,
      amount_cents: price?.unit_amount ?? 0,
      currency: price?.currency ?? "usd",
      interval: price?.recurring?.interval ?? "month",
      current_period_end: periodEnd,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" },
  );
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

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await fulfillPayment(event.data.object as Stripe.PaymentIntent);
        break;
      case "payment_intent.payment_failed": {
        const pi = event.data.object as Stripe.PaymentIntent;
        const supabase = createServiceClient();
        await supabase
          .from("payments")
          .update({ status: "failed", updated_at: new Date().toISOString() })
          .eq("stripe_payment_intent_id", pi.id);
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await syncSubscription(event.data.object as Stripe.Subscription);
        break;
      case "invoice.payment_succeeded":
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subRef =
          "subscription" in invoice ? (invoice as { subscription?: string | Stripe.Subscription | null }).subscription : null;
        const subId =
          typeof subRef === "string" ? subRef : subRef && typeof subRef === "object" ? subRef.id : null;
        if (subId) {
          const subscription = await stripe.subscriptions.retrieve(subId);
          await syncSubscription(subscription);
        }
        break;
      }
      default:
        break;
    }
  } catch {
    // Avoid failing Stripe retries on local/demo missing service role — log via status still 200 once configured
  }

  return NextResponse.json({ received: true });
}
