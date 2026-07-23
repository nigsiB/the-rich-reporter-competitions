"use client";

import { useEffect, useMemo, useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutPaymentIntent } from "@/app/actions/tickets";
import { SUB_SECRET_KEY } from "@/components/SubscribeMonthlyBtn";
import { primaryBtnClass } from "@/components/formStyles";
import Link from "next/link";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

type CheckoutClientProps = {
  ticketIds: string[];
  subscriptionId?: string;
};

function PaymentForm({
  amountCents,
  mode,
}: {
  amountCents: number;
  mode: "tickets" | "subscription";
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [succeeded, setSucceeded] = useState(false);

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amountCents / 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Unable to validate payment details.");
      setLoading(false);
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message ?? "Payment failed.");
      setLoading(false);
      return;
    }

    if (result.paymentIntent?.status === "succeeded") {
      try {
        sessionStorage.removeItem(SUB_SECRET_KEY);
      } catch {
        /* ignore */
      }
      setSucceeded(true);
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  if (succeeded) {
    return (
      <div className="space-y-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">Confirmed</p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-[var(--fg)]">
          Payment received
        </h2>
        <p className="text-sm text-[var(--muted)]">
          {mode === "subscription"
            ? "Your Patron Circle subscription is active."
            : "Your entries are being finalized. A receipt will arrive by email."}
        </p>
        <Link
          href="/#competitions"
          className="inline-block border border-[var(--border)] px-8 py-3.5 text-[10px] uppercase tracking-[0.24em] text-[var(--fg)] transition-colors hover:border-[var(--champagne)] hover:text-[var(--champagne)]"
        >
          Return to collection
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />
      <p className="text-xs leading-relaxed text-[var(--muted)]">
        International cards and local payment methods (where enabled) accepted. Charged in USD via
        Stripe Custom Elements — you stay on this page unless your bank requires verification.
      </p>
      {error ? (
        <p className="text-sm text-red-400/90" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={!stripe || loading} className={primaryBtnClass}>
        {loading ? "Processing…" : amountCents > 0 ? `Pay ${formatted}` : "Confirm payment"}
      </button>
    </form>
  );
}

export default function CheckoutClient({ ticketIds, subscriptionId }: CheckoutClientProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubscription, setIsSubscription] = useState(Boolean(subscriptionId));

  const stripePromise = useMemo(() => {
    if (!publishableKey || publishableKey.includes("pk_test_...")) return null;
    return loadStripe(publishableKey);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (subscriptionId) {
        try {
          const raw = sessionStorage.getItem(SUB_SECRET_KEY);
          if (raw) {
            const parsed = JSON.parse(raw) as {
              subscriptionId?: string;
              clientSecret?: string;
              at?: number;
            };
            const fresh = parsed.at && Date.now() - parsed.at < 30 * 60 * 1000;
            if (
              fresh &&
              parsed.clientSecret &&
              (!parsed.subscriptionId || parsed.subscriptionId === subscriptionId)
            ) {
              if (!cancelled) {
                setClientSecret(parsed.clientSecret);
                setIsSubscription(true);
                setLoading(false);
              }
              return;
            }
          }
        } catch {
          /* fall through */
        }
        if (!cancelled) {
          setError(
            "Subscription checkout expired. Return to Membership and start the monthly subscribe flow again.",
          );
          setIsSubscription(true);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      const result = await createCheckoutPaymentIntent(ticketIds);
      if (cancelled) return;
      if (!result.success) {
        setError(result.error);
        setLoading(false);
        return;
      }
      setClientSecret(result.data!.clientSecret);
      setAmount(result.data!.amount);
      setIsSubscription(false);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [ticketIds, subscriptionId]);

  if (!ticketIds.length && !subscriptionId) {
    return (
      <div className="space-y-6 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-[var(--fg)]">
          No entries held
        </h1>
        <p className="text-sm text-[var(--muted)]">
          Reserve tickets from a competition to begin checkout.
        </p>
        <Link
          href="/#competitions"
          className="inline-block text-[10px] uppercase tracking-[0.24em] text-[var(--champagne)]"
        >
          Browse collection
        </Link>
      </div>
    );
  }

  if (!stripePromise) {
    return (
      <div className="space-y-4 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-[var(--fg)]">
          Checkout
        </h1>
        <p className="text-sm text-[var(--muted)]">
          Add Stripe keys to enable Custom Elements payment (international cards, USD).
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <p className="text-center text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
        Preparing secure checkout…
      </p>
    );
  }

  if (error || !clientSecret) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-sm text-red-400/90" role="alert">
          {error || "Unable to start checkout."}
        </p>
        <Link
          href={isSubscription ? "/membership" : "/#competitions"}
          className="text-[10px] uppercase tracking-[0.24em] text-[var(--champagne)]"
        >
          {isSubscription ? "Back to membership" : "Return to collection"}
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg">
      <p className="text-center text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
        Checkout
      </p>
      <h1 className="mt-4 text-center font-[family-name:var(--font-display)] text-3xl tracking-wide text-[var(--fg)] md:text-4xl">
        {isSubscription ? "Patron Circle" : "Complete your entry"}
      </h1>
      <p className="mt-4 text-center text-sm text-[var(--muted)]">
        {isSubscription
          ? "Monthly subscription · international payments via Stripe"
          : `${ticketIds.length} entr${ticketIds.length === 1 ? "y" : "ies"} held · payment processed securely by Stripe`}
      </p>
      <div className="mt-10 border border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-8 md:px-8">
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "night",
              variables: {
                colorPrimary: "#c4a574",
                colorBackground: "#141412",
                colorText: "#f4f1ea",
                colorDanger: "#f87171",
                fontFamily: "Outfit, system-ui, sans-serif",
                borderRadius: "0px",
              },
            },
          }}
        >
          <PaymentForm
            amountCents={amount}
            mode={isSubscription ? "subscription" : "tickets"}
          />
        </Elements>
      </div>
    </div>
  );
}
