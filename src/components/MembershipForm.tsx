"use client";

import { useState, type FormEvent } from "react";
import { signUpMemberAction } from "@/app/actions/auth";
import CountrySelect from "@/components/CountrySelect";
import { fieldClass, labelClass, primaryBtnClass } from "@/components/formStyles";
import type { Dictionary } from "@/i18n/dictionaries";
import { useRouter } from "next/navigation";

type MembershipFormProps = {
  dict: Dictionary;
};

export default function MembershipForm({ dict }: MembershipFormProps) {
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
    // Opt-out checkbox: unchecked = stay opted in (default true).
    const optedOut = form.get("marketingOptOut") === "on";
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
      country: String(form.get("country") ?? ""),
      dateOfBirth: String(form.get("dateOfBirth") ?? ""),
      marketingOptIn: !optedOut,
    });

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    const message = result.message ?? dict.membershipCreated;
    setSuccess(message);

    // Stay on page when user must confirm email so the success message is readable.
    const needsEmailConfirm = /check your email/i.test(message);
    if (!needsEmailConfirm) {
      router.push("/#competitions");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <fieldset className="space-y-5">
        <legend className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--fg)]">
          {dict.formAccountLegend}
        </legend>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="fullName" className={labelClass}>
              {dict.accountFullName}
            </label>
            <input
              id="fullName"
              name="fullName"
              required
              autoComplete="name"
              className={fieldClass}
              placeholder={dict.formIdPlaceholder}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              {dict.accountEmail}
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
              {dict.formPassword}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className={fieldClass}
              placeholder={dict.accountPasswordHint}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              {dict.accountPhone}
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
              {dict.accountDob}
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
          {dict.accountAddressHeading}
        </legend>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="addressLine1" className={labelClass}>
              {dict.accountAddress1}
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
              {dict.accountAddress2}
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
              {dict.accountCity}
            </label>
            <input id="city" name="city" required autoComplete="address-level2" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="state" className={labelClass}>
              {dict.accountState}
            </label>
            <input
              id="state"
              name="state"
              required
              autoComplete="address-level1"
              className={fieldClass}
              placeholder={dict.formStatePlaceholder}
            />
          </div>
          <div>
            <label htmlFor="postalCode" className={labelClass}>
              {dict.accountPostal}
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
              {dict.accountCountry}
            </label>
            <CountrySelect id="country" name="country" />
          </div>
        </div>
      </fieldset>

      <div className="space-y-2">
        <label className="flex items-start gap-3 text-sm text-[var(--muted)]">
          <input
            type="checkbox"
            name="marketingOptOut"
            className="mt-1 accent-[var(--champagne)]"
          />
          <span>{dict.marketingOptOut}</span>
        </label>
        <p className="pl-7 text-xs leading-relaxed text-[var(--muted)]/80">
          {dict.marketingOptOutHint}
        </p>
      </div>

      <p className="text-xs leading-relaxed text-[var(--muted)]">{dict.membershipLegalConfirm}</p>

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
        {loading ? dict.membershipCreating : dict.becomeMember}
      </button>
    </form>
  );
}
