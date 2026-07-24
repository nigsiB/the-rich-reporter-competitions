import AdminNav from "@/components/admin/AdminNav";
import { getDictionary } from "@/i18n/getDictionary";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { dict } = await getDictionary();

  return (
    <main className="mx-auto max-w-6xl px-6 pb-28 pt-32 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
            {dict.adminEyebrow}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)]">
            {dict.adminHeading}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-[var(--muted)]">{dict.adminIntro}</p>
        </div>
        <Link
          href="/account"
          className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)]"
        >
          {dict.adminAccountLink}
        </Link>
      </div>
      <div className="mt-10">
        <AdminNav />
        {children}
      </div>
    </main>
  );
}
