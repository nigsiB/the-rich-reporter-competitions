"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type InventoryBarProps = {
  competitionId: string;
  totalEntries: number;
  initialAvailable: number;
  availableLabel?: string;
  remainingLabel?: string;
  ariaLabelTemplate?: string;
};

export default function InventoryBar({
  competitionId,
  totalEntries,
  initialAvailable,
  availableLabel = "available",
  remainingLabel = "remaining",
  ariaLabelTemplate = "{pct} percent of entries still available",
}: InventoryBarProps) {
  const [available, setAvailable] = useState(initialAvailable);

  useEffect(() => {
    setAvailable(initialAvailable);
  }, [initialAvailable]);

  useEffect(() => {
    // Client-side: only subscribe when public env looks configured
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key || url.includes("your-project")) return;

    const supabase = createClient();

    const refresh = async () => {
      const { count } = await supabase
        .from("tickets")
        .select("*", { count: "exact", head: true })
        .eq("competition_id", competitionId)
        .eq("status", "available");
      if (typeof count === "number") setAvailable(count);
    };

    const channel = supabase
      .channel(`inventory:${competitionId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tickets",
          filter: `competition_id=eq.${competitionId}`,
        },
        () => {
          void refresh();
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [competitionId]);

  const pct = totalEntries > 0 ? Math.round((available / totalEntries) * 100) : 0;
  const ariaLabel = ariaLabelTemplate.replace("{pct}", String(pct));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
          {pct}% {availableLabel}
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
          {available.toLocaleString("en-US")} {remainingLabel}
        </span>
      </div>
      <div
        className="h-px w-full bg-[var(--border)]"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        <div className="h-px bg-[var(--champagne)] transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
