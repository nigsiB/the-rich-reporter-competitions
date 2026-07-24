import AccountForm from "@/components/AccountForm";
import { getSessionProfile } from "@/app/actions/auth";
import { getDictionary } from "@/i18n/getDictionary";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Account — The Rich Reporter",
  description: "Update your membership profile, mailing address, and password.",
};

function formatDob(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string") {
    return value.slice(0, 10);
  }
  return null;
}

export default async function AccountPage() {
  const { user, profile } = await getSessionProfile();
  const { dict } = await getDictionary();

  if (!user) {
    redirect("/login?next=/account");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 pb-28 pt-32 md:px-10">
      <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
        {dict.accountEyebrow}
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)] md:text-5xl">
        {dict.accountHeading}
      </h1>
      <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
        {dict.accountIntro}
      </p>

      <div className="mt-12 border border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-10 md:px-10 md:py-12">
        <AccountForm
          dict={dict}
          profile={{
            email: profile?.email ?? user.email ?? "",
            fullName: profile?.full_name ?? "",
            phone: profile?.phone ?? "",
            addressLine1: profile?.address_line1 ?? "",
            addressLine2: profile?.address_line2 ?? "",
            city: profile?.city ?? "",
            state: profile?.state ?? "",
            postalCode: profile?.postal_code ?? "",
            country: profile?.country ?? "",
            dateOfBirth: formatDob(profile?.date_of_birth),
            marketingOptIn: Boolean(profile?.marketing_opt_in),
            isAdmin: Boolean(profile?.is_admin),
          }}
        />
      </div>
    </main>
  );
}
