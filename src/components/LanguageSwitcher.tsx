"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setLocaleAction } from "@/i18n/setLocale";
import {
  LOCALE_COOKIE,
  LOCALE_LABELS,
  LOCALES,
  type Locale,
} from "@/i18n/dictionaries";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
};

export default function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onChange = (next: string) => {
    if (!LOCALES.includes(next as Locale) || next === locale) return;

    // Mirror for client-side persistence / diagnostics (server cookie is source of truth).
    try {
      localStorage.setItem(LOCALE_COOKIE, next);
    } catch {
      /* ignore */
    }

    startTransition(async () => {
      await setLocaleAction(next);
      router.refresh();
    });
  };

  return (
    <label className="relative inline-flex items-center gap-2">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={locale}
        disabled={pending}
        onChange={(e) => onChange(e.target.value)}
        className="inline-flex h-8 w-auto min-w-[8.5rem] cursor-pointer appearance-none border border-[var(--border)] bg-[var(--bg-elevated)] px-3 pr-8 text-[10px] uppercase leading-none tracking-[0.18em] text-[var(--fg)] outline-none transition-colors focus:border-[var(--champagne)]/60 disabled:opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%238a8680' stroke-width='1.2'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.65rem center",
        }}
      >
        {LOCALES.map((code) => (
          <option key={code} value={code}>
            {LOCALE_LABELS[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
