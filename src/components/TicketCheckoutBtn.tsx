"use client";

import { useState } from "react";
import { reserveTicketsAction } from "@/app/actions/tickets";
import { useRouter } from "next/navigation";
import type { Dictionary } from "@/i18n/dictionaries";

type TicketCheckoutBtnProps = {
  competitionId: string;
  pricePerEntry: number;
  maxQuantity?: number;
  isAuthenticated: boolean;
  returnPath: string;
  dict: Pick<
    Dictionary,
    "entries" | "total" | "each" | "buyTickets" | "enterNow" | "securing" | "loginRequired"
  >;
};

export default function TicketCheckoutBtn({
  competitionId,
  pricePerEntry,
  maxQuantity = 1000,
  isAuthenticated,
  returnPath,
  dict,
}: TicketCheckoutBtnProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const total = pricePerEntry * quantity;
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(total);

  const unitFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(pricePerEntry);

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      const next = encodeURIComponent(returnPath);
      router.push(`/login?next=${next}`);
      return;
    }

    setLoading(true);
    setError("");

    const res = await reserveTicketsAction(competitionId, quantity);

    if (!res.success) {
      if (res.error?.toLowerCase().includes("logged in")) {
        const next = encodeURIComponent(returnPath);
        router.push(`/login?next=${next}`);
        return;
      }
      setError(res.error ?? "Unable to secure entry.");
      setLoading(false);
      return;
    }

    const ticketIds = (res.data as { ticket_ids?: string[] })?.ticket_ids ?? [];
    router.push(`/checkout?session=${ticketIds.join(",")}`);
  };

  const progress = ((quantity - 1) / Math.max(maxQuantity - 1, 1)) * 100;
  const ctaLabel = isAuthenticated
    ? `${dict.buyTickets} — ${formatted}`
    : dict.loginRequired;

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
              {dict.entries}
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl tracking-wide text-[var(--fg)]">
              {quantity.toLocaleString("en-US")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
              {dict.total}
            </p>
            <p className="mt-2 text-lg tracking-wide text-[var(--champagne)]">{formatted}</p>
            <p className="mt-1 text-[10px] tracking-[0.18em] text-[var(--muted)]/70">
              {unitFormatted} {dict.each}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <label htmlFor="ticket-quantity" className="sr-only">
            {dict.entries}
          </label>
          <input
            id="ticket-quantity"
            type="range"
            min={1}
            max={maxQuantity}
            step={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="ticket-slider w-full cursor-pointer appearance-none bg-transparent"
            style={{
              background: `linear-gradient(to right, var(--champagne) 0%, var(--champagne) ${progress}%, rgba(196, 165, 116, 0.18) ${progress}%, rgba(196, 165, 116, 0.18) 100%)`,
              height: "2px",
              borderRadius: 0,
            }}
            aria-valuemin={1}
            aria-valuemax={maxQuantity}
            aria-valuenow={quantity}
            aria-label={dict.entries}
          />
          <div className="flex justify-between text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]/60">
            <span>1</span>
            <span>500</span>
            <span>1,000</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePurchase}
        disabled={loading}
        aria-busy={loading}
        className="group relative overflow-hidden border border-[var(--champagne)]/50 bg-transparent px-10 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--champagne)] transition-all duration-500 hover:border-[var(--champagne)] hover:bg-[var(--champagne)] hover:text-[var(--bg-deep)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="relative z-10">{loading ? dict.securing : ctaLabel}</span>
      </button>
      {error ? (
        <p className="text-sm tracking-wide text-red-400/90" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
