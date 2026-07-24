import LoginForm from "@/components/LoginForm";
import { getDictionary } from "@/i18n/getDictionary";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign in — The Rich Reporter",
};

type PageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const { next } = await searchParams;
  const { dict } = await getDictionary();

  return (
    <main className="mx-auto flex min-h-[80svh] max-w-md flex-col justify-center px-6 pb-24 pt-32">
      <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
        {dict.loginEyebrow}
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)]">
        {dict.loginHeading}
      </h1>
      <p className="mt-4 text-sm text-[var(--muted)]">{dict.loginIntro}</p>
      <div className="mt-10 border border-[var(--border)] bg-[var(--bg-elevated)] px-8 py-10">
        <LoginForm nextPath={next || "/"} dict={dict} />
      </div>
      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        {dict.loginNewHere}{" "}
        <Link
          href="/membership"
          className="text-[var(--champagne)] underline-offset-4 hover:underline"
        >
          {dict.loginApply}
        </Link>
        {" · "}
        <Link
          href="/account"
          className="text-[var(--champagne)] underline-offset-4 hover:underline"
        >
          {dict.navAccount}
        </Link>
      </p>
    </main>
  );
}
