export type Competition = {
  id: string;
  title: string;
  prizeDescription: string;
  totalEntries: number;
  entriesRemaining: number;
  pricePerEntry: number;
  drawDate: string;
  imageUrl: string;
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
    title: "Porsche 911 GT3 RS",
    prizeDescription:
      "A track-honed icon finished in Guards Red. Private delivery arranged coast-to-coast for the sole winner.",
    totalEntries: 2500,
    entriesRemaining: 1625,
    pricePerEntry: 250,
    drawDate: daysFromNow(28),
    imageUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000002",
    title: "Malibu Modern Estate",
    prizeDescription:
      "Seven thousand square feet of glass, stone, and Pacific light. Keys and title transfer included.",
    totalEntries: 5000,
    entriesRemaining: 3800,
    pricePerEntry: 500,
    drawDate: daysFromNow(45),
    imageUrl:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000003",
    title: "Rolex Cosmograph Daytona",
    prizeDescription:
      "The steel Daytona in its most coveted configuration. Authenticated, insured, and presented in-person.",
    totalEntries: 1500,
    entriesRemaining: 520,
    pricePerEntry: 175,
    drawDate: daysFromNow(21),
    imageUrl:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800",
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000004",
    title: "Mediterranean Superyacht Week",
    prizeDescription:
      "Seven nights aboard a 50-metre yacht between Capri and Portofino. Crew, chef, and tender included.",
    totalEntries: 3000,
    entriesRemaining: 2550,
    pricePerEntry: 350,
    drawDate: daysFromNow(35),
    imageUrl:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=800",
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000005",
    title: "Private Jet Charter Pack",
    prizeDescription:
      "Twenty-five flight hours on a light jet network. Board anywhere in the continental United States.",
    totalEntries: 2000,
    entriesRemaining: 1400,
    pricePerEntry: 400,
    drawDate: daysFromNow(40),
    imageUrl:
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800",
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000006",
    title: "Vintage Champagne Cellar",
    prizeDescription:
      "A curated vault of Krug, Dom Pérignon, and rare growers — professionally stored and delivered.",
    totalEntries: 1200,
    entriesRemaining: 480,
    pricePerEntry: 125,
    drawDate: daysFromNow(18),
    imageUrl:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000007",
    title: "Luxury Safari Experience",
    prizeDescription:
      "Ten days across Botswana and Kenya with private guides, fly-camps, and conservation access.",
    totalEntries: 1800,
    entriesRemaining: 1440,
    pricePerEntry: 300,
    drawDate: daysFromNow(50),
    imageUrl:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800",
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000008",
    title: "Savile Row Wardrobe",
    prizeDescription:
      "A full seasonal wardrobe from a house on the Row — fittings in London, shipping worldwide.",
    totalEntries: 1000,
    entriesRemaining: 590,
    pricePerEntry: 200,
    drawDate: daysFromNow(30),
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=800",
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000009",
    title: "Audemars Piguet Royal Oak",
    prizeDescription:
      "The iconic steel Royal Oak. Sourced through authorised channels and presented with papers.",
    totalEntries: 1600,
    entriesRemaining: 720,
    pricePerEntry: 225,
    drawDate: daysFromNow(25),
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    status: "active",
  },
  {
    id: "a1000000-0000-4000-8000-000000000010",
    title: "Aston Martin Vantage",
    prizeDescription:
      "The Vantage in Racing Green. Performance pack, ceramic brakes, and white-glove handover.",
    totalEntries: 2800,
    entriesRemaining: 2100,
    pricePerEntry: 275,
    drawDate: daysFromNow(32),
    imageUrl:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800",
    status: "active",
  },
];

export function getCompetitionById(id: string): Competition | undefined {
  return competitions.find((c) => c.id === id);
}

export function availabilityPercent(competition: Competition): number {
  return Math.round((competition.entriesRemaining / competition.totalEntries) * 100);
}
