"use client";

import { useState, type FormEvent } from "react";
import {
  createCompetitionAction,
  updateCompetitionAction,
} from "@/app/actions/admin";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { fieldClass, labelClass, primaryBtnClass, secondaryBtnClass } from "@/components/formStyles";
import { LOCALE_LABELS, type Locale } from "@/i18n/dictionaries";
import type { CompetitionAdminInput, CompetitionTranslations } from "@/lib/types";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LANG_TABS = ["en", "es", "fr", "de", "pt", "it"] as const satisfies readonly Locale[];
const TRANSLATION_LOCALES = ["es", "fr", "de", "pt", "it"] as const;

type CompetitionFormProps = {
  mode: "create" | "edit";
  competitionId?: string;
  initial?: Partial<CompetitionAdminInput>;
};

export default function CompetitionForm({ mode, competitionId, initial }: CompetitionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [langTab, setLangTab] = useState<Locale>("en");
  const [translations, setTranslations] = useState<CompetitionTranslations>(
    () => initial?.translations ?? {},
  );

  const setLocaleField = (
    locale: (typeof TRANSLATION_LOCALES)[number],
    field: "title" | "prize_description",
    value: string,
  ) => {
    setTranslations((prev) => ({
      ...prev,
      [locale]: {
        title: field === "title" ? value : (prev[locale]?.title ?? ""),
        prize_description:
          field === "prize_description" ? value : (prev[locale]?.prize_description ?? ""),
      },
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);

    const imageUrl = String(form.get("imageUrl") ?? "").trim();
    if (!imageUrl) {
      setLoading(false);
      setError("Please upload an image or paste an image URL.");
      return;
    }

    const payload: CompetitionAdminInput = {
      title: String(form.get("title") ?? ""),
      prizeDescription: String(form.get("prizeDescription") ?? ""),
      translations,
      totalEntries: Number(form.get("totalEntries") ?? 0),
      pricePerEntry: Number(form.get("pricePerEntry") ?? 0),
      cashAlternative: Number(form.get("cashAlternative") ?? 0),
      retailValue: Number(form.get("retailValue") ?? 0),
      isMonthly: form.get("isMonthly") === "on",
      drawDate: String(form.get("drawDate") ?? ""),
      imageUrl,
      displayOrder: Number(form.get("displayOrder") ?? 0),
      status: String(form.get("status") ?? "active") as CompetitionAdminInput["status"],
      generateTickets: form.get("generateTickets") === "on",
    };

    const result =
      mode === "create"
        ? await createCompetitionAction(payload)
        : await updateCompetitionAction(competitionId!, payload);

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    if (mode === "create" && result.data?.id) {
      router.push(`/admin/competitions/${result.data.id}`);
    } else {
      router.push("/admin");
    }
    router.refresh();
  };

  const drawDefault = initial?.drawDate ? initial.drawDate.slice(0, 16) : "";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className={labelClass}>Title & prize description</p>
        <div
          role="tablist"
          aria-label="Language"
          className="mb-4 flex flex-wrap gap-1 border-b border-[var(--border)]"
        >
          {LANG_TABS.map((locale) => {
            const active = langTab === locale;
            const hasCopy =
              locale === "en"
                ? Boolean(initial?.title || initial?.prizeDescription)
                : Boolean(
                    translations[locale]?.title?.trim() ||
                      translations[locale]?.prize_description?.trim(),
                  );
            return (
              <button
                key={locale}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setLangTab(locale)}
                className={`relative px-3 py-2.5 text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  active
                    ? "text-[var(--champagne)]"
                    : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                {LOCALE_LABELS[locale]}
                {locale !== "en" && hasCopy ? (
                  <span
                    className="ml-1.5 inline-block h-1 w-1 rounded-full bg-[var(--champagne)]/70"
                    aria-hidden
                  />
                ) : null}
                {active ? (
                  <span className="absolute inset-x-2 -bottom-px h-px bg-[var(--champagne)]" />
                ) : null}
              </button>
            );
          })}
        </div>

        <div role="tabpanel" className="space-y-5">
          {langTab === "en" ? (
            <>
              <div>
                <label htmlFor="title" className={labelClass}>
                  Title (English)
                </label>
                <input
                  id="title"
                  name="title"
                  required
                  defaultValue={initial?.title}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="prizeDescription" className={labelClass}>
                  Prize description (English)
                </label>
                <textarea
                  id="prizeDescription"
                  name="prizeDescription"
                  required
                  rows={4}
                  defaultValue={initial?.prizeDescription}
                  className={fieldClass}
                />
              </div>
            </>
          ) : (
            (() => {
              const locale = langTab as (typeof TRANSLATION_LOCALES)[number];
              return (
                <>
                  <p className="text-xs leading-relaxed text-[var(--muted)]">
                    Optional. Leave blank to show the English title and description for{" "}
                    {LOCALE_LABELS[locale]} visitors.
                  </p>
                  <div>
                    <label htmlFor={`title-${locale}`} className={labelClass}>
                      Title ({LOCALE_LABELS[locale]})
                    </label>
                    <input
                      id={`title-${locale}`}
                      value={translations[locale]?.title ?? ""}
                      onChange={(e) => setLocaleField(locale, "title", e.target.value)}
                      className={fieldClass}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label htmlFor={`prize-${locale}`} className={labelClass}>
                      Prize description ({LOCALE_LABELS[locale]})
                    </label>
                    <textarea
                      id={`prize-${locale}`}
                      rows={4}
                      value={translations[locale]?.prize_description ?? ""}
                      onChange={(e) =>
                        setLocaleField(locale, "prize_description", e.target.value)
                      }
                      className={fieldClass}
                    />
                  </div>
                </>
              );
            })()
          )}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="totalEntries" className={labelClass}>
            Total entries
          </label>
          <input
            id="totalEntries"
            name="totalEntries"
            type="number"
            min={1}
            required
            defaultValue={initial?.totalEntries ?? 1000}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="pricePerEntry" className={labelClass}>
            Price per entry (USD)
          </label>
          <input
            id="pricePerEntry"
            name="pricePerEntry"
            type="number"
            min={0.01}
            step="0.01"
            required
            defaultValue={initial?.pricePerEntry ?? 0.25}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="retailValue" className={labelClass}>
            Approx. retail value (USD)
          </label>
          <input
            id="retailValue"
            name="retailValue"
            type="number"
            min={0}
            step="0.01"
            required
            defaultValue={initial?.retailValue ?? 0}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="cashAlternative" className={labelClass}>
            Cash alternative (USD)
          </label>
          <input
            id="cashAlternative"
            name="cashAlternative"
            type="number"
            min={0}
            step="0.01"
            required
            defaultValue={initial?.cashAlternative ?? 0}
            className={fieldClass}
          />
          <p className="mt-2 text-xs text-[var(--muted)]">
            Typically below retail (e.g. $1,200 retail → ~$1,000 cash).
          </p>
        </div>
        <div>
          <label htmlFor="drawDate" className={labelClass}>
            Draw date
          </label>
          <input
            id="drawDate"
            name="drawDate"
            type="datetime-local"
            defaultValue={drawDefault}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="displayOrder" className={labelClass}>
            Display order
          </label>
          <input
            id="displayOrder"
            name="displayOrder"
            type="number"
            defaultValue={initial?.displayOrder ?? 0}
            className={fieldClass}
          />
          <p className="mt-2 text-xs text-[var(--muted)]">Lower numbers appear first.</p>
        </div>
        <div>
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={initial?.status ?? "active"}
            className={fieldClass}
          >
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <ImageUploadField initialUrl={initial?.imageUrl ?? ""} required />
      </div>

      <label className="flex items-start gap-3 text-sm text-[var(--muted)]">
        <input
          type="checkbox"
          name="isMonthly"
          defaultChecked={initial?.isMonthly ?? false}
          className="mt-1 accent-[var(--champagne)]"
        />
        <span>Rolling monthly draw (e.g. magazine advert)</span>
      </label>

      {mode === "create" ? (
        <label className="flex items-start gap-3 text-sm text-[var(--muted)]">
          <input
            type="checkbox"
            name="generateTickets"
            defaultChecked
            className="mt-1 accent-[var(--champagne)]"
          />
          <span>Generate ticket inventory now (recommended)</span>
        </label>
      ) : null}

      {error ? (
        <p className="text-sm text-red-400/90" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-4">
        <button type="submit" disabled={loading} className={primaryBtnClass}>
          {loading ? "Saving…" : mode === "create" ? "Create competition" : "Save changes"}
        </button>
        <Link href="/admin" className={secondaryBtnClass}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
