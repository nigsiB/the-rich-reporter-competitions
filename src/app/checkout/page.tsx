import CheckoutClient from "@/components/CheckoutClient";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<{ session?: string; sub?: string }>;
};

export default async function CheckoutPage({ searchParams }: PageProps) {
  const { session, sub } = await searchParams;
  const ticketIds = session
    ? session
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean)
    : [];

  const nextPath =
    ticketIds.length > 0
      ? `/checkout?session=${encodeURIComponent(ticketIds.join(","))}`
      : sub
        ? `/checkout?sub=${encodeURIComponent(sub)}`
        : "/checkout";

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      redirect(`/login?next=${encodeURIComponent(nextPath)}`);
    }
  }

  return (
    <main className="flex min-h-[80svh] items-center justify-center px-6 pb-24 pt-28">
      <CheckoutClient ticketIds={ticketIds} subscriptionId={sub} />
    </main>
  );
}
