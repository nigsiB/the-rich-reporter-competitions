import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-28 pt-32 md:px-10">
      <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">Private</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)]">
        Admin
      </h1>
      <p className="mt-3 max-w-xl text-sm text-[var(--muted)]">
        Manage competitions, display order, and member enquiries.
      </p>
      <div className="mt-10">
        <AdminNav />
        {children}
      </div>
    </main>
  );
}
