"use client";

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
        <label htmlFor="password" className={labelClass}>
          {dict.formPassword}
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
        {loading ? dict.signingIn : dict.signIn}
      </button>
    </form>
  );
}
