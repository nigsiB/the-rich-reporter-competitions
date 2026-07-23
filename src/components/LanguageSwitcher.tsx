"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
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

  const setLocale = (next: Locale) => {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div
      className="relative inline-flex items-center rounded-sm border border-[var(--border)] bg-[var(--bg-elevated)]/80 p-0.5 backdrop-blur-sm"
      role="group"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      {LOCALES.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            disabled={pending}
            onClick={() => setLocale(code)}
            aria-pressed={active}
            title={LOCALE_LABELS[code]}
            className={`relative min-w-[2.25rem] px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.22em] transition-all duration-400 ${
              active
                ? "bg-[var(--champagne)]/15 text-[var(--champagne)] shadow-[inset_0_0_0_1px_rgba(212,175,120,0.35)]"
                : "text-[var(--muted)] hover:text-[var(--fg)]"
            } disabled:opacity-50`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
