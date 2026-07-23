# Turn membership + payments on for real

## 1. Create a Supabase project

1. Go to https://supabase.com/dashboard → New project
2. **Project Settings → API** — copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (server only)
3. **Authentication → Providers → Email** — enable
4. **Authentication → URL Configuration**
   - Site URL: `https://the-rich-reporter-competitions.vercel.app`
   - Redirect URLs: `https://the-rich-reporter-competitions.vercel.app/**` and `http://localhost:3000/**`
5. **Database → Replication** — enable Realtime for table `tickets` (for live inventory)

## 2. Run SQL (in order)

In the Supabase SQL Editor:

1. Entire `supabase/schema.sql`
2. Entire `supabase/seed.sql` (optional demo competitions + tickets)
3. If you already ran an older schema without payments: also run `supabase/migrations/003_payments_expiry.sql`

## 3. Env vars

### Local `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESERVATION_EXPIRY_MINUTES=15
CRON_SECRET=long-random-string
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Vercel → Project → Settings → Environment Variables

Add the same keys for Production (and Preview if desired). Redeploy after saving.

## 4. Stripe

1. Create a Stripe account / use test mode keys
2. Developers → Webhooks → Add endpoint:
   `https://the-rich-reporter-competitions.vercel.app/api/stripe/webhook`
   Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
3. Paste signing secret into `STRIPE_WEBHOOK_SECRET`

## 5. Promote an admin

1. Sign up at `/membership`
2. In SQL Editor:

```sql
UPDATE profiles SET is_admin = true WHERE email = 'your-client@email.com';
```

3. Sign in → `/admin`

## 6. Cron (reservation expiry)

`vercel.json` runs `/api/cron/release-reservations` every 5 minutes.
Set `CRON_SECRET` in Vercel so the job can authorize.
