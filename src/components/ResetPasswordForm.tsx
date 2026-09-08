"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { resetPasswordAction } from "@/app/actions/auth";
import { fieldClass, labelClass, primaryBtnClass } from "@/components/formStyles";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (password !== confirm) {
      setError("Those passwords do not match.");
      return;
    }

    setLoading(true);
    const result = await resetPasswordAction(password);
    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setDone(true);
    // The recovery link already signed them in, so send them somewhere useful.
    router.refresh();
  };

  if (done) {
    return (
      <div className="space-y-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--champagne)]">
          Password updated
        </p>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          You are signed in with your new password.
        </p>
        <Link
          href="/account"
          className="inline-block border border-[var(--champagne)]/60 bg-[var(--champagne)] px-8 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--bg-deep)] transition-opacity hover:opacity-90"
        >
          Go to your account
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="password" className={labelClass}>
          New password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={fieldClass}
        />
        <p className="mt-2 text-xs text-[var(--muted)]">At least 8 characters.</p>
      </div>

      <div>
        <label htmlFor="confirm" className={labelClass}>
          Confirm new password
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={fieldClass}
        />
      </div>

      {error ? (
        <p className="text-sm text-red-400/90" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={loading} className={primaryBtnClass}>
        {loading ? "Saving…" : "Set new password"}
      </button>
    </form>
  );
}
