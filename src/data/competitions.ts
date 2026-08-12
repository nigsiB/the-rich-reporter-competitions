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
/** Local seed — mirrors supabase/seed.sql and the live `competitions` table.
 *  Only used when Supabase is unconfigured; the live DB is the source of truth. */
export const competitions: Competition[] = [
  {
    id: "b2000000-0000-4000-8000-000000000001",
    title: "iPhone 17",
    prizeDescription:
      "A brand-new Apple iPhone 17, factory sealed. Worldwide courier delivery — or take the cash alternative.",
    totalEntries: 9600,
    entriesRemaining: 7872,
    pricePerEntry: 0.25,
    cashAlternative: 1000,
    retailValue: 1200,
    drawDate: daysFromNow(30),
    imageUrl:
      "https://images.unsplash.com/photo-1762512949121-c1fc05b36e1a?auto=format&fit=crop&q=85&w=1200&sat=-30&bri=-20",
    galleryUrls: [
      "https://images.unsplash.com/photo-1759588071847-6ba0f3dbd16e?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1758467700508-1de0ab755248?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1758186361602-c3f23037eb95?auto=format&fit=crop&q=85&w=1200",
    ],
    displayOrder: 0,
    status: "active",
  },
  {
    id: "b2000000-0000-4000-8000-000000000002",
    title: "Dodge Family SUV",
    prizeDescription:
      "A brand-new Dodge family SUV, taxes and delivery arranged. Seven seats, full manufacturer warranty — or take the cash alternative.",
    totalEntries: 180000,
    entriesRemaining: 147600,
    pricePerEntry: 0.5,
    cashAlternative: 40000,
    retailValue: 45000,
    drawDate: daysFromNow(60),
    // Client-supplied press shot. Source is 2400x1600 landscape and the cards
    // are 4:5, so a centre crop lost the back of the car — letterboxed onto
    // --bg-elevated instead, which reads as part of the dark card.
    imageUrl: "/prizes/dodge-card-contain.jpg",
    galleryUrls: [
      "/prizes/dodge-full.jpg",
      "https://images.unsplash.com/photo-1630586692962-88b49ca2617d?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1675976916879-844eaa3944b2?auto=format&fit=crop&q=85&w=1200",
    ],
    displayOrder: 1,
    status: "active",
  },
  {
    id: "b2000000-0000-4000-8000-000000000003",
    title: "A Condo in Los Angeles",
    prizeDescription:
      "A luxury condominium in Los Angeles, purchased outright and transferred free of mortgage. All transfer costs covered — or take the cash alternative.",
    totalEntries: 600000,
    entriesRemaining: 492000,
    pricePerEntry: 2.5,
    cashAlternative: 700000,
    retailValue: 750000,
    drawDate: daysFromNow(90),
    imageUrl:
      "https://images.unsplash.com/photo-1727672951734-2406581ebb39?auto=format&fit=crop&q=85&w=1200&sat=-20&bri=-10",
    galleryUrls: [
      "https://images.unsplash.com/photo-1711419181192-21ed8907e2be?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1759264244827-1dde5bee00a5?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1652900438190-7445bec3fd00?auto=format&fit=crop&q=85&w=1200",
    ],
    displayOrder: 2,
    status: "active",
  },
  {
    id: "b2000000-0000-4000-8000-000000000004",
    title: "Cash Prize $1,000",
    prizeDescription:
      "One thousand US dollars, paid to the sole winner. Tax-free cash transfer arranged after verification.",
    totalEntries: 8000,
    entriesRemaining: 6560,
    pricePerEntry: 0.25,
    cashAlternative: 1000,
    retailValue: 1000,
    drawDate: daysFromNow(30),
    imageUrl:
      "https://images.unsplash.com/photo-1716782494065-e9268365ef9f?auto=format&fit=crop&q=85&w=1200&sat=-20&bri=-15",
    galleryUrls: [
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?auto=format&fit=crop&q=85&w=1200",
    ],
    displayOrder: 3,
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
