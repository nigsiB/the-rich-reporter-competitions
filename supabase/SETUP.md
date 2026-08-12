# Turn membership + payments on for real

## 1. Create a Supabase project

1. Go to https://supabase.com/dashboard → New project
2. **Project Settings → API** — copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` / `publishable` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY` (JWT `eyJ…` or `sb_publishable_…`)
   - `service_role` / `secret` key → `SUPABASE_SERVICE_ROLE_KEY` (server only — JWT `eyJ…` or `sb_secret_…`, **not** the Postgres connection string)
3. **Authentication → Providers → Email** — enable
4. **Authentication → URL Configuration** (required — wrong Site URL sends confirm emails to localhost)
   - Site URL: `https://the-rich-reporter-competitions.vercel.app` (or your custom domain)
   - Redirect URLs (allow list), one per line or comma-separated:
     - `https://the-rich-reporter-competitions.vercel.app/**`
     - `https://the-rich-reporter-competitions.vercel.app/login`
     - `http://localhost:3000/**` (local dev only)
   - Signup uses `emailRedirectTo: ${NEXT_PUBLIC_SITE_URL}/login` — Site URL + allow list must match production
5. **Database → Replication** — enable Realtime for table `tickets` (for live inventory)

## 2. Run SQL (in order)

In the Supabase SQL Editor (or `psql` against the Postgres URI):

1. Entire `supabase/schema.sql` (includes cash alternatives, marketing emails, subscriptions)
2. Entire `supabase/seed.sql` (exactly 5 demo competitions + tickets)
3. Existing projects that already ran an older schema: run migrations in order:
   - `supabase/migrations/003_payments_expiry.sql` (if needed)
   - `supabase/migrations/004_cash_marketing_subs.sql` (cash / marketing / subs)

## 3. Env vars

### Local `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_MONTHLY_PRICE_ID=price_...
RESERVATION_EXPIRY_MINUTES=15
CRON_SECRET=long-random-string
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Vercel → Project → Settings → Environment Variables

Add the same keys for Production (and Preview if desired). Redeploy after saving.

## 4. Stripe

1. Create a Stripe account / use test mode keys
2. Create a Product with a **recurring monthly Price** for Patron Circle → copy Price ID → `STRIPE_MONTHLY_PRICE_ID`
3. Enable international payment methods you want in Dashboard → Settings → Payment methods (cards + Link are wired in code; add local APMs as needed)
4. Developers → Webhooks → Add endpoint:
   `https://the-rich-reporter-competitions.vercel.app/api/stripe/webhook`
   Events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Paste signing secret into `STRIPE_WEBHOOK_SECRET`

## 5. Promote an admin

The person being promoted must have signed up at `/membership` first — these
match on an existing `profiles` row and affect zero rows otherwise.

### Normal case — you already have an admin

Sign in as an existing admin → **`/admin/members`** → **Make admin** on their row.

Use this whenever it's available. It runs with an authenticated admin session,
which is what the `protect_is_admin_column` trigger
(`migrations/009_admin_members.sql`) requires.

### Bootstrapping the very first admin

A bare `UPDATE ... SET is_admin = true` **will fail** — including in the SQL
Editor and with the `service_role` key. The trigger checks `auth.uid()` against
the admin list, and `auth.uid()` is `NULL` in both, so it raises
`Only admins can change is_admin`.

Drop the trigger for the one statement:

```sql
ALTER TABLE profiles DISABLE TRIGGER protect_is_admin_column;
UPDATE profiles SET is_admin = true WHERE email = 'your-client@email.com';
ALTER TABLE profiles ENABLE TRIGGER protect_is_admin_column;
```

Re-enabling is not optional — left disabled, any signed-in member could make
themselves an admin with a direct client update.

Then sign in → `/admin`.

## 6. Cron (reservation expiry)

`vercel.json` schedules `/api/cron/release-reservations` daily at 04:00 UTC (Hobby plan limit).
Unpaid holds are also released whenever someone reserves tickets.
Set `CRON_SECRET` in Vercel so the cron endpoint can authorize.

## 7. Custom domain

See root `README.md` — recommend `competitions.therichreporter.com`.
