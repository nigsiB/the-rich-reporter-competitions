import ContactForm from "@/components/ContactForm";
import { getDictionary } from "@/i18n/getDictionary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — The Rich Reporter",
  description: "Contact The Rich Reporter Competitions desk.",
};

export default async function ContactPage() {
  const { dict } = await getDictionary();

  return (
    <main className="mx-auto max-w-3xl px-6 pb-28 pt-32 md:px-10">
      <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
        {dict.contactEyebrow}
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)] md:text-5xl">
        {dict.contactHeading}
      </h1>
      <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
        {dict.contactIntro}
      </p>

      <div className="mt-14 border border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-10 md:px-10 md:py-12">
        <ContactForm />
      </div>
    </main>
  );
}
