"use client";

import { useEffect, useState } from "react";
import { COUNTRIES, isValidCountryCode } from "@/data/countries";
import { fieldClass } from "@/components/formStyles";

type CountrySelectProps = {
  id?: string;
  name?: string;
  /** Prefer leaving unset so locale detection / explicit choice can apply. */
  defaultValue?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
};

function guessCountryFromLocale(): string {
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale || navigator.language || "";
    const region = new Intl.Locale(locale).region;
    if (region && isValidCountryCode(region)) return region.toUpperCase();
  } catch {
    /* ignore */
  }
  // Common browser language tags without region
  const lang = (navigator.language || "").toLowerCase();
  if (lang === "en-gb" || lang.startsWith("en-gb")) return "GB";
  if (lang === "en-au") return "AU";
  if (lang === "en-ca" || lang.startsWith("fr-ca")) return "CA";
  if (lang.startsWith("en-us")) return "US";
  return "";
}

/** Shared ISO country dropdown — keep all address forms on the same list. */
export default function CountrySelect({
  id = "country",
  name = "country",
  defaultValue,
  required = true,
  className = fieldClass,
  disabled,
}: CountrySelectProps) {
  const initial =
    defaultValue && isValidCountryCode(defaultValue) ? defaultValue.toUpperCase() : "";
  const [value, setValue] = useState(initial);

  useEffect(() => {
    if (initial) return;
    const guessed = guessCountryFromLocale();
    if (guessed) setValue(guessed);
  }, [initial]);

  return (
    <select
      id={id}
      name={name}
      required={required}
      disabled={disabled}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      autoComplete="country"
      className={className}
    >
      <option value="" disabled>
        Select country
      </option>
      {COUNTRIES.map((c) => (
        <option key={c.code} value={c.code}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
