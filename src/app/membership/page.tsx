import MembershipForm from "@/components/MembershipForm";
import SubscribeMonthlyBtn from "@/components/SubscribeMonthlyBtn";
import { getDictionary } from "@/i18n/getDictionary";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Membership — The Rich Reporter",
  description:
    "Join The Rich Reporter Competitions. Membership required to enter exclusive draws.",
};

export default async function MembershipPage() {
  const { dict } = await getDictionary();
  let isAuthenticated = false;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    isAuthenticated = Boolean(user);
  }

  return (
    <main className="mx-auto max-w-3xl px-6 pb-28 pt-32 md:px-10">
      <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
        {dict.membershipEyebrow}
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)] md:text-5xl">
        {dict.membershipHeading}
      </h1>
      <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
        {dict.membershipIntro}
      </p>
      {isAuthenticated ? (
        <p className="mt-3 text-sm text-[var(--muted)]">
          {dict.membershipLoggedIn}{" "}
          <Link
            href="/account"
            className="text-[var(--champagne)] underline-offset-4 hover:underline"
          >
            {dict.navAccount}
          </Link>
        </p>
      ) : (
        <p className="mt-3 text-sm text-[var(--muted)]">
          {dict.alreadyMember}{" "}
          <Link
            href="/login?next=/membership"
            className="text-[var(--champagne)] underline-offset-4 hover:underline"
          >
            {dict.signIn}
          </Link>
        </p>
      )}

      <section className="mt-14 border border-[var(--champagne)]/25 bg-[var(--bg-elevated)] px-6 py-10 md:px-10 md:py-12">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--champagne)]">
          {dict.monthlyClub}
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-wide text-[var(--fg)]">
          {dict.membershipStandingTitle}
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
          {dict.monthlyClubBody}
        </p>
        <div className="mt-8">
          <SubscribeMonthlyBtn
            isAuthenticated={isAuthenticated}
            label={dict.subscribeMonthly}
            loginLabel={dict.signIn}
          />
        </div>
      </section>

      {!isAuthenticated ? (
        <div className="mt-10 border border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-10 md:px-10 md:py-12">
          <MembershipForm dict={dict} />
        </div>
      ) : null}
    </main>
  );
}
