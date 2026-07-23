# The Rich Reporter — Competitions

Luxury competition platform for Rich Reporter Magazine.

**Live:** https://the-rich-reporter-competitions.vercel.app  
**Repo:** https://github.com/nigsiB/the-rich-reporter-competitions

## Stack

- Next.js App Router + Tailwind CSS v4
- Supabase (Auth, PostgreSQL, Realtime, RPC)
- Stripe Custom Elements checkout (+ Patron Circle monthly subscriptions)
- Vercel Cron (reservation expiry)
- i18n: English, Español, Français

## Quick start

```bash
npm install
cp .env.example .env.local
# Fill Supabase + Stripe keys — see supabase/SETUP.md
npm run dev
```

## Features

- Membership signup + profile capture (`/membership`)
- Patron Circle monthly Stripe subscriptions
- Contact desk (`/contact`) + admin inbox
- Admin competition CRUD + cash alternatives + display order (`/admin`)
- Ticket reserve → Stripe checkout → mark sold (webhook)
- Marketing email capture (`profiles` + `marketing_emails`)
- Reservation expiry (15 min default, cron)
- Live DB marketplace when Supabase is configured (falls back to local seed)
- AMOE printable forms (`/amoe`)
- Official Rules / Privacy / Terms (`/legal/*`)
- Realtime inventory bars (Supabase Realtime on `tickets`)

## Custom domain (Vercel)

We cannot purchase a domain for you. Recommended brand-aligned hosts:

1. **`competitions.therichreporter.com`** (preferred — under the magazine domain)
2. Alternatives: `enter.therichreporter.com`, `win.therichreporter.com`

### Attach on Vercel

1. Vercel → Project **the-rich-reporter-competitions** → **Settings → Domains**
2. Add `competitions.therichreporter.com` (or your chosen host)
3. At your DNS provider for `therichreporter.com`, create the records Vercel shows (usually a CNAME to `cname.vercel-dns.com`, or A records for apex)
4. Wait for TLS / “Valid Configuration”
5. Set `NEXT_PUBLIC_SITE_URL` to `https://competitions.therichreporter.com` in Vercel env and redeploy
6. Update Supabase **Authentication → URL Configuration** Site URL + Redirect URLs to the custom domain
7. Update the Stripe webhook endpoint URL to the custom domain `/api/stripe/webhook`

## Enable for real

Follow **`supabase/SETUP.md`** (SQL, env, Stripe webhook, admin promotion).
