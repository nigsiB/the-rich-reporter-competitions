# The Rich Reporter — Competitions

Luxury competition platform for Rich Reporter Magazine.

**Live:** https://the-rich-reporter-competitions.vercel.app  
**Repo:** https://github.com/nigsiB/the-rich-reporter-competitions

## Stack

- Next.js App Router + Tailwind CSS v4
- Supabase (Auth, PostgreSQL, Realtime, RPC)
- Stripe Custom Elements checkout
- Vercel Cron (reservation expiry)

## Quick start

```bash
npm install
cp .env.example .env.local
# Fill Supabase + Stripe keys — see supabase/SETUP.md
npm run dev
```

## Features

- Membership signup + profile capture (`/membership`)
- Contact desk (`/contact`) + admin inbox
- Admin competition CRUD + display order (`/admin`)
- Ticket reserve → Stripe checkout → mark sold (webhook)
- Reservation expiry (15 min default, cron every 5 min)
- Live DB marketplace when Supabase is configured (falls back to local seed)
- AMOE printable forms (`/amoe`)
- Official Rules / Privacy / Terms (`/legal/*`)
- Realtime inventory bars (Supabase Realtime on `tickets`)

## Enable for real

Follow **`supabase/SETUP.md`** (SQL, env, Stripe webhook, admin promotion).
