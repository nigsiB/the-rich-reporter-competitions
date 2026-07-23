export type Competition = {
  id: string;
  title: string;
  prizeDescription: string;
  totalEntries: number;
  entriesRemaining: number;
  pricePerEntry: number;
  /** Tax-free cash alternative offered in lieu of the physical prize (USD). */
  cashAlternative: number;
  /** Approximate retail value of the prize (USD), for rules / display. */
  retailValue: number;
  drawDate: string;
  imageUrl: string;
  displayOrder: number;
  status: "active" | "paused" | "completed";
  /** Rolling monthly draw (e.g. magazine advert). */
  isMonthly?: boolean;
};

function daysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

/** Local seed — exactly five homepage prizes. Mirrors supabase/seed.sql. */
export const competitions: Competition[] = [
  {
    id: "a1000000-0000-4000-8000-000000000001",
    title: "Free Magazine Advert",
    prizeDescription:
      "A full-page advert in The Rich Reporter — your brand in print. Rolling monthly draw for members.",
    totalEntries: 4000,
    entriesRemaining: 2800,
    pricePerEntry: 0.25,
    cashAlternative: 1000,
    retailValue: 1500,
    drawDate: daysFromNow(30),
    imageUrl:
      "https://images.unsplash.com/photo-1504711434719-bc93ca84b44c?auto=format&fit=crop&q=85&w=1200&sat=-30&bri=-15",
    displayOrder: 1,
    status: "active",
    isMonthly: true,
  },
  {
    id: "a1000000-0000-4000-8000-000000000002",
    title: "Cash Prize $1,000",
    prizeDescription:
      "One thousand US dollars, paid to the sole winner. Tax-free cash transfer arranged after verification.",
    totalEntries: 5000,
    entriesRemaining: 3200,
    pricePerEntry: 0.25,
    cashAlternative: 1000,
    retailValue: 1000,
    drawDate: daysFromNow(28),
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=85&w=1200&sat=-40&bri=-20",
    displayOrder: 2,
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000003",
    title: "iPhone 17",
    prizeDescription:
      "A brand-new Apple iPhone 17, factory sealed. Worldwide courier delivery — or take the cash alternative.",
    totalEntries: 6000,
    entriesRemaining: 3900,
    pricePerEntry: 0.25,
    cashAlternative: 1000,
    retailValue: 1200,
    drawDate: daysFromNow(35),
    imageUrl:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=85&w=1200&sat=-35&bri=-25",
    displayOrder: 3,
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000004",
    title: "iPad",
    prizeDescription:
      "The latest Apple iPad, sealed retail. Shipped worldwide to the winner, or elect the cash alternative.",
    totalEntries: 4500,
    entriesRemaining: 2700,
    pricePerEntry: 0.25,
    cashAlternative: 700,
    retailValue: 849,
    drawDate: daysFromNow(32),
    imageUrl:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=85&w=1200&sat=-30&bri=-20",
    displayOrder: 4,
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000005",
    title: "Samsung Laptop",
    prizeDescription:
      "A premium Samsung Galaxy Book laptop. White-glove worldwide delivery, or a tax-free cash alternative.",
    totalEntries: 4500,
    entriesRemaining: 3000,
    pricePerEntry: 0.25,
    cashAlternative: 1000,
    retailValue: 1299,
    drawDate: daysFromNow(40),
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=85&w=1200&sat=-40&bri=-25",
    displayOrder: 5,
    status: "active",
  },
];

export function getCompetitionById(id: string): Competition | undefined {
  return competitions.find((c) => c.id === id);
}

export function availabilityPercent(competition: Competition): number {
  return Math.round((competition.entriesRemaining / competition.totalEntries) * 100);
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
