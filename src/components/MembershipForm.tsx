"use client";

import { useState, type FormEvent } from "react";
import { signUpMemberAction } from "@/app/actions/auth";
import { fieldClass, labelClass, primaryBtnClass } from "@/components/formStyles";
import { useRouter } from "next/navigation";

export default function MembershipForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const form = new FormData(e.currentTarget);
    const result = await signUpMemberAction({
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      fullName: String(form.get("fullName") ?? ""),
      phone: String(form.get("phone") ?? ""),
      addressLine1: String(form.get("addressLine1") ?? ""),
      addressLine2: String(form.get("addressLine2") ?? ""),
      city: String(form.get("city") ?? ""),
      state: String(form.get("state") ?? ""),
      postalCode: String(form.get("postalCode") ?? ""),
      country: String(form.get("country") ?? "US"),
      dateOfBirth: String(form.get("dateOfBirth") ?? ""),
      marketingOptIn: form.get("marketingOptIn") === "on",
    });

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setSuccess(result.message ?? "Membership created.");
    router.push("/#competitions");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <fieldset className="space-y-5">
        <legend className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--fg)]">
          Account
        </legend>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="fullName" className={labelClass}>
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              required
              autoComplete="name"
              className={fieldClass}
              placeholder="As it appears on official ID"
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
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
          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className={fieldClass}
              placeholder="Minimum 8 characters"
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="dateOfBirth" className={labelClass}>
              Date of birth
            </label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              required
              className={fieldClass}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--fg)]">
          Mailing address
        </legend>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="addressLine1" className={labelClass}>
              Address line 1
            </label>
            <input
              id="addressLine1"
              name="addressLine1"
              required
              autoComplete="address-line1"
              className={fieldClass}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="addressLine2" className={labelClass}>
              Address line 2
            </label>
            <input
              id="addressLine2"
              name="addressLine2"
              autoComplete="address-line2"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="city" className={labelClass}>
              City
            </label>
            <input id="city" name="city" required autoComplete="address-level2" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="state" className={labelClass}>
              State
            </label>
            <input
              id="state"
              name="state"
              required
              autoComplete="address-level1"
              className={fieldClass}
              placeholder="e.g. CA"
            />
          </div>
          <div>
            <label htmlFor="postalCode" className={labelClass}>
              ZIP / Postal code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              required
              autoComplete="postal-code"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="country" className={labelClass}>
              Country
            </label>
            <select id="country" name="country" defaultValue="US" className={fieldClass}>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
            </select>
          </div>
        </div>
      </fieldset>

      <label className="flex items-start gap-3 text-sm text-[var(--muted)]">
        <input
          type="checkbox"
          name="marketingOptIn"
          className="mt-1 accent-[var(--champagne)]"
        />
        <span>
          Send me editorial notes and new competition announcements from The Rich Reporter.
        </span>
      </label>

      <p className="text-xs leading-relaxed text-[var(--muted)]">
        By joining you confirm you are 18+, a legal resident of an eligible jurisdiction, and agree
        to the official rules. No purchase necessary.
      </p>

      {error ? (
        <p className="text-sm text-red-400/90" role="alert">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="text-sm text-[var(--champagne)]" role="status">
          {success}
        </p>
      ) : null}

      <button type="submit" disabled={loading} className={primaryBtnClass}>
        {loading ? "Creating membership…" : "Become a member"}
      </button>
    </form>
  );
}
