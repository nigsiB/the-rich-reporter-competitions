"use client";

import { useState } from "react";
import { reserveTicketsAction } from "@/app/actions/tickets";
import { useRouter } from "next/navigation";

type TicketCheckoutBtnProps = {
  competitionId: string;
  pricePerEntry: number;
  quantity?: number;
};

export default function TicketCheckoutBtn({
  competitionId,
  pricePerEntry,
  quantity = 5,
}: TicketCheckoutBtnProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const total = pricePerEntry * quantity;
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(total);

  const handlePurchase = async () => {
    setLoading(true);
    setError("");

    const res = await reserveTicketsAction(competitionId, quantity);

    if (!res.success) {
      setError(res.error ?? "Unable to secure entry.");
      setLoading(false);
      return;
    }

    const ticketIds = (res.data as { ticket_ids?: string[] })?.ticket_ids ?? [];
    router.push(`/checkout?session=${ticketIds.join(",")}`);
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={handlePurchase}
        disabled={loading}
        aria-busy={loading}
        className="group relative overflow-hidden border border-[var(--champagne)]/50 bg-transparent px-10 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--champagne)] transition-all duration-500 hover:border-[var(--champagne)] hover:bg-[var(--champagne)] hover:text-[var(--bg-deep)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="relative z-10">
          {loading ? "Securing Entry…" : `Enter Now — ${formatted}`}
        </span>
      </button>
      {error ? (
        <p className="text-sm tracking-wide text-red-400/90" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
