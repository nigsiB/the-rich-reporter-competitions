import CheckoutClient from "@/components/CheckoutClient";

type PageProps = {
  searchParams: Promise<{ session?: string }>;
};

export default async function CheckoutPage({ searchParams }: PageProps) {
  const { session } = await searchParams;
  const ticketIds = session ? session.split(",").map((id) => id.trim()).filter(Boolean) : [];

  return (
    <main className="flex min-h-[80svh] items-center justify-center px-6 pb-24 pt-28">
      <CheckoutClient ticketIds={ticketIds} />
    </main>
  );
}
