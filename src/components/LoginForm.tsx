"use client";

import { useState, type FormEvent } from "react";
import { signInAction } from "@/app/actions/auth";
import { fieldClass, labelClass, primaryBtnClass } from "@/components/formStyles";
import Link from "next/link";

type LoginFormProps = {
  nextPath?: string;
};

export default function LoginForm({ nextPath = "/" }: LoginFormProps) {
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
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
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
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-sm text-[var(--muted)]">
        New here?{" "}
        <Link href="/membership" className="text-[var(--champagne)] underline-offset-4 hover:underline">
          Apply for membership
        </Link>
      </p>
    </form>
  );
}
