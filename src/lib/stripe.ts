import Stripe from "stripe";

let stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes("sk_test_...")) return null;
  if (!stripe) {
    stripe = new Stripe(key);
  }
  return stripe;
}

export function isStripeConfigured(): boolean {
  const pub = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const secret = process.env.STRIPE_SECRET_KEY;
  return Boolean(
    pub &&
      secret &&
      !pub.includes("pk_test_...") &&
      !secret.includes("sk_test_..."),
  );
}
