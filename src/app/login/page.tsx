import LoginForm from "@/components/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in — The Rich Reporter",
};

type PageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const { next } = await searchParams;

  return (
    <main className="mx-auto flex min-h-[80svh] max-w-md flex-col justify-center px-6 pb-24 pt-32">
      <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">Members</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)]">
        Sign in
      </h1>
      <p className="mt-4 text-sm text-[var(--muted)]">
        Access your membership to secure competition entries.
      </p>
      <div className="mt-10 border border-[var(--border)] bg-[var(--bg-elevated)] px-8 py-10">
        <LoginForm nextPath={next || "/"} />
      </div>
    </main>
  );
}
