export type Competition = {
  id: string;
  title: string;
  prizeDescription: string;
  totalEntries: number;
  entriesRemaining: number;
  pricePerEntry: number;
  drawDate: string;
  imageUrl: string;
  displayOrder: number;
  status: "active" | "paused" | "completed";
};

function daysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

/** Local seed data — mirrors supabase/seed.sql for UI development without a live DB. */
export const competitions: Competition[] = [
  {
    id: "a1000000-0000-4000-8000-000000000001",
    title: "Brand New iPhone",
    prizeDescription:
      "The latest flagship iPhone, factory sealed. Discrete courier delivery arranged for the sole winner.",
    totalEntries: 5000,
    entriesRemaining: 3125,
    pricePerEntry: 0.25,
    drawDate: daysFromNow(28),
    imageUrl:
      "https://images.unsplash.com/photo-1697636979792-fb057f6cbe8d?auto=format&fit=crop&q=80&w=800",
    displayOrder: 1,
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000002",
    title: "Coastal Weekend Escape",
    prizeDescription:
      "Two nights at a boutique seaside hotel — breakfast, late checkout, and a quiet view included.",
    totalEntries: 4000,
    entriesRemaining: 2800,
    pricePerEntry: 0.5,
    drawDate: daysFromNow(35),
    imageUrl:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800",
    displayOrder: 2,
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000003",
    title: "Premium Noise-Cancelling Headphones",
    prizeDescription:
      "Flagship over-ears in midnight black. Studio-grade quiet for travel, work, and late listening.",
    totalEntries: 3500,
    entriesRemaining: 2100,
    pricePerEntry: 0.25,
    drawDate: daysFromNow(21),
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    displayOrder: 3,
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000004",
    title: "Michelin Dining for Two",
    prizeDescription:
      "A reserved table for two at a starred kitchen — tasting menu and paired wines, one evening only.",
    totalEntries: 3000,
    entriesRemaining: 1950,
    pricePerEntry: 0.35,
    drawDate: daysFromNow(30),
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
    displayOrder: 4,
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000005",
    title: "Designer Leather Weekender",
    prizeDescription:
      "A full-grain leather weekender in cognac — hand-finished, brass hardware, and lifetime care kit.",
    totalEntries: 2800,
    entriesRemaining: 1680,
    pricePerEntry: 0.3,
    drawDate: daysFromNow(40),
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    displayOrder: 5,
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000006",
    title: "Wireless Earbuds Pro",
    prizeDescription:
      "Spatial audio, adaptive ANC, and a charging case — sealed, current generation, ready to ship.",
    totalEntries: 4500,
    entriesRemaining: 2700,
    pricePerEntry: 0.15,
    drawDate: daysFromNow(18),
    imageUrl:
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?auto=format&fit=crop&q=80&w=800",
    displayOrder: 6,
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000007",
    title: "Spa Day Ritual",
    prizeDescription:
      "A full-day wellness ritual for one — massage, thermal suite, and a quiet lounge afternoon.",
    totalEntries: 3200,
    entriesRemaining: 2400,
    pricePerEntry: 0.4,
    drawDate: daysFromNow(42),
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800",
    displayOrder: 7,
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000008",
    title: "Espresso Atelier Kit",
    prizeDescription:
      "A compact espresso machine with ceramic cups and a curated bean selection — barista at home.",
    totalEntries: 2500,
    entriesRemaining: 1500,
    pricePerEntry: 0.3,
    drawDate: daysFromNow(25),
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
    displayOrder: 8,
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000009",
    title: "Titanium Smartwatch",
    prizeDescription:
      "A titanium smartwatch with cellular and adventure bands — sealed retail box, full warranty.",
    totalEntries: 3800,
    entriesRemaining: 2280,
    pricePerEntry: 0.25,
    drawDate: daysFromNow(32),
    imageUrl:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800",
    displayOrder: 9,
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000010",
    title: "Acetate Sunglasses",
    prizeDescription:
      "Hand-polished acetate frames with polarized lenses — a quiet signature for bright days.",
    totalEntries: 2200,
    entriesRemaining: 1320,
    pricePerEntry: 0.2,
    drawDate: daysFromNow(22),
    imageUrl:
      "https://images.unsplash.com/photo-1511499767150-a48a237ac008?auto=format&fit=crop&q=80&w=800",
    displayOrder: 10,
    status: "active",
  },
];

export function getCompetitionById(id: string): Competition | undefined {
  return competitions.find((c) => c.id === id);
}

export function availabilityPercent(competition: Competition): number {
  return Math.round((competition.entriesRemaining / competition.totalEntries) * 100);
}
