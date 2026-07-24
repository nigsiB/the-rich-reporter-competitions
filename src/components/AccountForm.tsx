"use client";

import { useState, type FormEvent } from "react";
import {
  changePasswordAction,
  signOutAction,
  updateProfileAction,
} from "@/app/actions/auth";
import CountrySelect from "@/components/CountrySelect";
import {
  fieldClass,
  labelClass,
  primaryBtnClass,
  secondaryBtnClass,
} from "@/components/formStyles";
import type { Dictionary } from "@/i18n/dictionaries";
import Link from "next/link";

export type AccountProfileValues = {
  email: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  dateOfBirth: string | null;
  marketingOptIn: boolean;
  isAdmin: boolean;
};

type AccountFormProps = {
  profile: AccountProfileValues;
  dict: Dictionary;
};

export default function AccountForm({ profile, dict }: AccountFormProps) {
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const showDob = profile.dateOfBirth != null && profile.dateOfBirth !== "";

  const handleProfileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError("");
    setProfileSuccess("");

    const form = new FormData(e.currentTarget);
    const result = await updateProfileAction({
      fullName: String(form.get("fullName") ?? ""),
      phone: String(form.get("phone") ?? ""),
      addressLine1: String(form.get("addressLine1") ?? ""),
      addressLine2: String(form.get("addressLine2") ?? ""),
      city: String(form.get("city") ?? ""),
      state: String(form.get("state") ?? ""),
      postalCode: String(form.get("postalCode") ?? ""),
      country: String(form.get("country") ?? ""),
      dateOfBirth: showDob ? String(form.get("dateOfBirth") ?? "") : undefined,
      // Opt-out checkbox: unchecked = stay opted in.
      marketingOptIn: form.get("marketingOptOut") !== "on",
    });

    setProfileLoading(false);

    if (!result.success) {
      setProfileError(result.error);
      return;
    }

    setProfileSuccess(result.message ?? dict.accountProfileSaved);
  };

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError("");
    setPasswordSuccess("");

    const form = new FormData(e.currentTarget);
    const result = await changePasswordAction({
      currentPassword: String(form.get("currentPassword") ?? ""),
      newPassword: String(form.get("newPassword") ?? ""),
      confirmPassword: String(form.get("confirmPassword") ?? ""),
    });

    setPasswordLoading(false);

    if (!result.success) {
      setPasswordError(result.error);
      return;
    }

    setPasswordSuccess(result.message ?? dict.accountPasswordSaved);
    e.currentTarget.reset();
  };

  return (
    <div className="space-y-12">
      {profile.isAdmin ? (
        <p className="border border-[var(--champagne)]/25 bg-[var(--bg-deep)] px-5 py-4 text-sm text-[var(--muted)]">
          {dict.accountAdminNote}{" "}
          <Link
            href="/admin"
            className="text-[var(--champagne)] underline-offset-4 hover:underline"
          >
            {dict.navAdmin}
          </Link>
        </p>
      ) : null}

      <form onSubmit={handleProfileSubmit} className="space-y-8" noValidate>
        <fieldset className="space-y-5">
          <legend className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--fg)]">
            {dict.accountProfileHeading}
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
                defaultValue={profile.fullName}
                autoComplete="name"
                className={fieldClass}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="email" className={labelClass}>
                {dict.accountEmail}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                readOnly
                disabled
                className={`${fieldClass} cursor-not-allowed opacity-70`}
              />
              <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                {dict.accountEmailHint}{" "}
                <Link
                  href="/contact"
                  className="text-[var(--champagne)] underline-offset-4 hover:underline"
                >
                  {dict.navContact}
                </Link>
                .
              </p>
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
                defaultValue={profile.phone}
                autoComplete="tel"
                className={fieldClass}
              />
            </div>
            {showDob ? (
              <div>
                <label htmlFor="dateOfBirth" className={labelClass}>
                  {dict.accountDob}
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  defaultValue={profile.dateOfBirth ?? ""}
                  className={fieldClass}
                />
              </div>
            ) : null}
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
                defaultValue={profile.addressLine1}
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
                defaultValue={profile.addressLine2}
                autoComplete="address-line2"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="city" className={labelClass}>
                {dict.accountCity}
              </label>
              <input
                id="city"
                name="city"
                required
                defaultValue={profile.city}
                autoComplete="address-level2"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="state" className={labelClass}>
                {dict.accountState}
              </label>
              <input
                id="state"
                name="state"
                required
                defaultValue={profile.state}
                autoComplete="address-level1"
                className={fieldClass}
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
                defaultValue={profile.postalCode}
                autoComplete="postal-code"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="country" className={labelClass}>
                {dict.accountCountry}
              </label>
              <CountrySelect
                id="country"
                name="country"
                defaultValue={profile.country || undefined}
              />
            </div>
          </div>
        </fieldset>

        <div className="space-y-2">
          <label className="flex items-start gap-3 text-sm text-[var(--muted)]">
            <input
              type="checkbox"
              name="marketingOptOut"
              defaultChecked={!profile.marketingOptIn}
              className="mt-1 accent-[var(--champagne)]"
            />
            <span>{dict.accountMarketing}</span>
          </label>
          <p className="pl-7 text-xs leading-relaxed text-[var(--muted)]/80">
            {dict.accountMarketingHint}
          </p>
        </div>

        {profileError ? (
          <p className="text-sm text-red-400/90" role="alert">
            {profileError}
          </p>
        ) : null}
        {profileSuccess ? (
          <p className="text-sm text-[var(--champagne)]" role="status">
            {profileSuccess}
          </p>
        ) : null}

        <button type="submit" disabled={profileLoading} className={primaryBtnClass}>
          {profileLoading ? dict.accountSaving : dict.accountSaveProfile}
        </button>
      </form>

      <form onSubmit={handlePasswordSubmit} className="space-y-6 border-t border-[var(--border)] pt-12">
        <fieldset className="space-y-5">
          <legend className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--fg)]">
            {dict.accountPasswordHeading}
          </legend>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="currentPassword" className={labelClass}>
                {dict.accountCurrentPassword}
              </label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                required
                autoComplete="current-password"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="newPassword" className={labelClass}>
                {dict.accountNewPassword}
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                className={fieldClass}
                placeholder={dict.accountPasswordHint}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                {dict.accountConfirmPassword}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                className={fieldClass}
              />
            </div>
          </div>
        </fieldset>

        {passwordError ? (
          <p className="text-sm text-red-400/90" role="alert">
            {passwordError}
          </p>
        ) : null}
        {passwordSuccess ? (
          <p className="text-sm text-[var(--champagne)]" role="status">
            {passwordSuccess}
          </p>
        ) : null}

        <button type="submit" disabled={passwordLoading} className={secondaryBtnClass}>
          {passwordLoading ? dict.accountUpdatingPassword : dict.accountChangePassword}
        </button>
      </form>

      <div className="border-t border-[var(--border)] pt-10">
        <p className="mb-5 text-sm text-[var(--muted)]">{dict.accountSignOutHint}</p>
        <form action={signOutAction}>
          <button type="submit" className={secondaryBtnClass}>
            {dict.signOut}
          </button>
        </form>
      </div>
    </div>
  );
}
