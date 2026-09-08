"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { signInAction } from "@/app/actions/auth";
import { fieldClass, labelClass, primaryBtnClass } from "@/components/formStyles";
import type { Dictionary } from "@/i18n/dictionaries";

type LoginFormProps = {
  nextPath?: string;
  dict: Dictionary;
};

export default function LoginForm({ nextPath = "/", dict }: LoginFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);

    try {
      const result = await signInAction(
        String(form.get("email") ?? ""),
        String(form.get("password") ?? ""),
        nextPath,
      );
      if (result && !result.success) {
        setError(result.error);
        setLoading(false);
      }
    } catch {
      // redirect() throws — treat as success
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className={labelClass}>
          {dict.accountEmail}
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
      </div>
      <div>
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <label htmlFor="password" className={`${labelClass} mb-0`}>
            {dict.formPassword}
          </label>
          <Link
            href="/forgot-password"
            className="text-[10px] uppercase tracking-[0.2em] text-[var(--champagne)] transition-colors hover:text-[var(--fg)]"
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={fieldClass}
        />
      </div>

      {error ? (
        <p className="text-sm text-red-400/90" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={loading} className={primaryBtnClass}>
        {loading ? dict.signingIn : dict.signIn}
      </button>
    </form>
  );
}
