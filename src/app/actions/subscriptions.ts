"use server";

import { createClient } from "@/utils/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { recordMarketingEmail } from "@/lib/marketing";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import type { ActionResult } from "@/lib/types";

/**
 * Patron Circle — foundation for substantial monthly Stripe subscriptions.
 * Requires STRIPE_MONTHLY_PRICE_ID (Dashboard → Products → recurring price).
 */
export async function createMonthlySubscriptionCheckout(): Promise<
  ActionResult<{ clientSecret: string; subscriptionId: string }>
> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Supabase is not configured." };
  }
  if (!isStripeConfigured()) {
    return { success: false, error: "Stripe is not configured." };
  }

  const priceId = process.env.STRIPE_MONTHLY_PRICE_ID;
  if (!priceId || priceId.includes("price_...")) {
    return {
      success: false,
      error:
        "Monthly pricing is not live yet. Create a recurring Price in Stripe and set STRIPE_MONTHLY_PRICE_ID.",
    };
  }

  const stripe = getStripe();
  if (!stripe) return { success: false, error: "Stripe unavailable." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { success: false, error: "You must be signed in to subscribe." };
  }

  let customerId: string | undefined;
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id, full_name")
    .eq("id", user.id)
    .single();

  if (profile?.stripe_customer_id) {
    customerId = profile.stripe_customer_id;
  } else {
    const customer = await stripe.customers.create({
      email: user.email,
      name: profile?.full_name ?? undefined,
      metadata: { user_id: user.id },
    });
    customerId = customer.id;
    await supabase
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  // Payment Element + Dashboard-enabled APMs (cards, Link, local methods, etc.)
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
    payment_settings: {
      save_default_payment_method: "on_subscription",
      payment_method_types: ["card", "link"],
    },
    expand: ["latest_invoice.payment_intent"],
    metadata: { user_id: user.id },
  });

  const invoice = subscription.latest_invoice;
  const paymentIntent =
    typeof invoice === "object" && invoice && "payment_intent" in invoice
      ? invoice.payment_intent
      : null;
  const clientSecret =
    typeof paymentIntent === "object" && paymentIntent && "client_secret" in paymentIntent
      ? (paymentIntent.client_secret as string | null)
      : null;

  if (!clientSecret) {
    return { success: false, error: "Unable to start subscription payment." };
  }

  const amount =
    typeof invoice === "object" && invoice && "amount_due" in invoice
      ? Number(invoice.amount_due)
      : 0;

  await supabase.from("subscriptions").upsert(
    {
      user_id: user.id,
      email: user.email,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      stripe_price_id: priceId,
      status: subscription.status,
      amount_cents: amount,
      currency: "usd",
      interval: "month",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" },
  );

  await recordMarketingEmail({
    email: user.email,
    fullName: profile?.full_name,
    source: "subscription",
    optedIn: true,
  });

  return {
    success: true,
    data: { clientSecret, subscriptionId: subscription.id },
  };
}
