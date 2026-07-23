"use client";

import { useState, type FormEvent } from "react";
import {
  createCompetitionAction,
  updateCompetitionAction,
} from "@/app/actions/admin";
import { fieldClass, labelClass, primaryBtnClass, secondaryBtnClass } from "@/components/formStyles";
import type { CompetitionAdminInput } from "@/lib/types";
import { useRouter } from "next/navigation";
import Link from "next/link";

type CompetitionFormProps = {
  mode: "create" | "edit";
  competitionId?: string;
  initial?: Partial<CompetitionAdminInput>;
};

export default function CompetitionForm({ mode, competitionId, initial }: CompetitionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);

    const payload: CompetitionAdminInput = {
      title: String(form.get("title") ?? ""),
      prizeDescription: String(form.get("prizeDescription") ?? ""),
      totalEntries: Number(form.get("totalEntries") ?? 0),
      pricePerEntry: Number(form.get("pricePerEntry") ?? 0),
      drawDate: String(form.get("drawDate") ?? ""),
      imageUrl: String(form.get("imageUrl") ?? ""),
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

  const drawDefault = initial?.drawDate
    ? initial.drawDate.slice(0, 16)
    : "";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className={labelClass}>
          Title
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
          Prize description
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
        <div>
          <label htmlFor="imageUrl" className={labelClass}>
            Image URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            required
            defaultValue={initial?.imageUrl}
            className={fieldClass}
            placeholder="https://images.unsplash.com/..."
          />
        </div>
      </div>

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
