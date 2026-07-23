"use client";

import { useState } from "react";
import { createMonthlySubscriptionCheckout } from "@/app/actions/subscriptions";
import { useRouter } from "next/navigation";

export const SUB_SECRET_KEY = "trr_sub_cs";

type Props = {
  isAuthenticated: boolean;
  label: string;
  loginLabel: string;
};

export default function SubscribeMonthlyBtn({ isAuthenticated, label, loginLabel }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onClick = async () => {
    if (!isAuthenticated) {
      router.push("/login?next=/membership");
      return;
    }
    setLoading(true);
    setError("");
    const res = await createMonthlySubscriptionCheckout();
    if (!res.success) {
      setError(res.error);
      setLoading(false);
      return;
    }
    try {
      sessionStorage.setItem(
        SUB_SECRET_KEY,
        JSON.stringify({
          subscriptionId: res.data?.subscriptionId,
          clientSecret: res.data?.clientSecret,
          at: Date.now(),
        }),
      );
    } catch {
      // sessionStorage unavailable — checkout will re-fetch via action if needed
    }
    router.push(`/checkout?sub=${encodeURIComponent(res.data?.subscriptionId ?? "")}`);
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="border border-[var(--champagne)]/50 bg-transparent px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--champagne)] transition-all duration-500 hover:bg-[var(--champagne)] hover:text-[var(--bg-deep)] disabled:opacity-40"
      >
        {loading ? "…" : isAuthenticated ? label : loginLabel}
      </button>
      {error ? (
        <p className="text-sm text-red-400/90" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
