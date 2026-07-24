"use client";

import { useState, type FormEvent } from "react";
import { submitContactAction } from "@/app/actions/contact";
import { fieldClass, labelClass, primaryBtnClass } from "@/components/formStyles";
import type { Dictionary } from "@/i18n/dictionaries";

type ContactFormProps = {
  dict: Dictionary;
};

export default function ContactForm({ dict }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const form = new FormData(e.currentTarget);

    const result = await submitContactAction({
      fullName: String(form.get("fullName") ?? ""),
      email: String(form.get("email") ?? ""),
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? ""),
    });

    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }

    setSuccess(result.message ?? dict.contactSent);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            {dict.accountFullName}
          </label>
          <input id="fullName" name="fullName" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            {dict.accountEmail}
          </label>
          <input id="email" name="email" type="email" required className={fieldClass} />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className={labelClass}>
          {dict.contactSubject}
        </label>
        <input id="subject" name="subject" required className={fieldClass} />
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>
          {dict.contactMessage}
        </label>
        <textarea id="message" name="message" required rows={6} className={fieldClass} />
      </div>

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
        {loading ? dict.contactSending : dict.contactSend}
      </button>
    </form>
  );
}
