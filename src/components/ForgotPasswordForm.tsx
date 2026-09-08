"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { requestPasswordResetAction } from "@/app/actions/auth";
import { fieldClass, labelClass, primaryBtnClass } from "@/components/formStyles";

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const result = await requestPasswordResetAction(String(form.get("email") ?? ""));
    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }
    setSent(true);
  };

  // Deliberately the same message whether or not the address has an account —
  // saying "no account found" would let anyone test which emails are members.
  if (sent) {
    return (
      <div className="space-y-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--champagne)]">Check your inbox</p>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          If that address has an account, a password reset link is on its way. It expires after a
          short while, so use it soon — and check your spam folder if it does not appear.
        </p>
        <Link
          href="/login"
          className="inline-block text-[10px] uppercase tracking-[0.24em] text-[var(--champagne)] transition-colors hover:text-[var(--fg)]"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className={labelClass}>
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </div>

      {error ? (
        <p className="text-sm text-red-400/90" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={loading} className={primaryBtnClass}>
        {loading ? "Sending…" : "Send reset link"}
      </button>

      <p className="text-xs text-[var(--muted)]">
        Remembered it?{" "}
        <Link href="/login" className="text-[var(--champagne)] underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
