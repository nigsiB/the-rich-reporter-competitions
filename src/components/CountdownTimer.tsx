"use client";

import { useEffect, useState } from "react";

type CountdownTimerProps = {
  drawDate: string;
};

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function getRemaining(drawDate: string): Remaining {
  const diff = new Date(drawDate).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, expired: false };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer({ drawDate }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(getRemaining(drawDate));
    const id = window.setInterval(() => setRemaining(getRemaining(drawDate)), 1000);
    return () => window.clearInterval(id);
  }, [drawDate]);

  // Stable SSR/hydration placeholder — live clock starts after mount
  if (!remaining) {
    return (
      <div
        className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]"
        aria-hidden="true"
      >
        <span className="text-[var(--champagne)]">--d</span>
        <span className="text-[var(--border-strong)]">·</span>
        <span>--:--:--</span>
      </div>
    );
  }

  if (remaining.expired) {
    return (
      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">Draw closed</p>
    );
  }

  return (
    <div
      className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]"
      aria-label={`Draw in ${remaining.days} days, ${remaining.hours} hours`}
    >
      <span className="text-[var(--champagne)]">{pad(remaining.days)}d</span>
      <span aria-hidden="true" className="text-[var(--border-strong)]">
        ·
      </span>
      <span>
        {pad(remaining.hours)}:{pad(remaining.minutes)}:{pad(remaining.seconds)}
      </span>
    </div>
  );
}
