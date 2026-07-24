import type { CompetitionTranslations } from "@/lib/types";

export type Competition = {
  id: string;
  title: string;
  prizeDescription: string;
  /** Manual per-locale copy from competitions.translations (es/fr/de/pt/it). */
  translations?: CompetitionTranslations | null;
  /** When true, skip locale overrides and show English title/description. */
  translationsCascade?: boolean;
  totalEntries: number;
  entriesRemaining: number;
  pricePerEntry: number;
  /** Tax-free cash alternative offered in lieu of the physical prize (USD). */
  cashAlternative: number;
  /** Approximate retail value of the prize (USD), for rules / display. */
  retailValue: number;
  drawDate: string;
  imageUrl: string;
  /** Additional images; empty keeps single-image presentation. */
  galleryUrls?: string[];
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
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=85&w=1200",
    galleryUrls: [
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&q=85&w=1200",
    ],
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
      "https://images.unsplash.com/photo-1716782494065-e9268365ef9f?auto=format&fit=crop&q=85&w=1200",
    galleryUrls: [
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?auto=format&fit=crop&q=85&w=1200",
    ],
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
      "https://images.unsplash.com/photo-1762512949121-c1fc05b36e1a?auto=format&fit=crop&q=85&w=1200",
    galleryUrls: [
      "https://images.unsplash.com/photo-1759588071847-6ba0f3dbd16e?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1758467700508-1de0ab755248?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1758186361602-c3f23037eb95?auto=format&fit=crop&q=85&w=1200",
    ],
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
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=85&w=1200",
    galleryUrls: [
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1542759564-7ccbb6ac450a?auto=format&fit=crop&q=85&w=1200",
    ],
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
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=85&w=1200",
    galleryUrls: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=85&w=1200",
    ],
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
