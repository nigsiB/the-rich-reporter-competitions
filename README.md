# The Rich Reporter — Competitions

Luxury competition platform for Rich Reporter Magazine. Built from the outreach Next.js boilerplate.

## Stack

- Next.js App Router + Tailwind CSS v4
- Supabase (PostgreSQL + `reserve_tickets` RPC)
- Framer Motion (available for page transitions)
- Stripe Custom Elements (checkout placeholder)

## Getting started

```bash
npm install
cp .env.example .env.local
# Fill NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

## Supabase setup

1. Open the Supabase SQL Editor.
2. Run `supabase/schema.sql`.
3. Run `supabase/seed.sql`.

Until Supabase is connected, the UI uses local seed data from `src/data/competitions.ts`.

## Key paths

| Path | Purpose |
|------|---------|
| `src/app/actions/tickets.ts` | `reserveTicketsAction` server action |
| `src/components/TicketCheckoutBtn.tsx` | Luxury checkout CTA |
| `src/data/competitions.ts` | 10 dummy competitions |
| `supabase/schema.sql` | Tables + concurrency RPC |
| `supabase/seed.sql` | Seed competitions + tickets |
