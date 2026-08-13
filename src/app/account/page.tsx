import AccountForm from "@/components/AccountForm";
import TicketNumbers from "@/components/TicketNumbers";
import { getSessionProfile } from "@/app/actions/auth";
import { getMyEntries } from "@/lib/entries";
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

  const entries = await getMyEntries(user.id);
  const totalEntries = entries.reduce((n, e) => n + e.ticketNumbers.length, 0);

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

      <section
        className="mt-12 border border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-10 md:px-10 md:py-12"
        aria-labelledby="my-entries-heading"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2
            id="my-entries-heading"
            className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--fg)]"
          >
            Your entries
          </h2>
          {totalEntries > 0 ? (
            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--champagne)]">
              {totalEntries.toLocaleString("en-US")} ticket
              {totalEntries === 1 ? "" : "s"}
            </p>
          ) : null}
        </div>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          Every entry carries its own number, unique to that competition. These are the numbers
          entered into the draw.
        </p>

        <div className="mt-8">
          <TicketNumbers
            entries={entries}
            emptyMessage="You have no entries yet. Browse the current collection to enter a competition."
          />
        </div>
      </section>

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
