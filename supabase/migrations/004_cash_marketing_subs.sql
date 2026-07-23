-- Migration 004: cash alternatives, marketing emails, subscriptions, monthly flag

ALTER TABLE competitions
  ADD COLUMN IF NOT EXISTS cash_alternative DECIMAL(10, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS retail_value DECIMAL(10, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_monthly BOOLEAN DEFAULT false;

-- Durable email store for marketing / future prize outreach
CREATE TABLE IF NOT EXISTS marketing_emails (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    full_name TEXT,
    source TEXT NOT NULL DEFAULT 'signup'
      CHECK (source IN ('signup', 'contact', 'checkout', 'subscription', 'import')),
    opted_in BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (email)
);

CREATE INDEX IF NOT EXISTS idx_marketing_emails_opted
  ON marketing_emails (opted_in) WHERE opted_in = true;

ALTER TABLE marketing_emails ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "marketing_admin_read" ON marketing_emails;
CREATE POLICY "marketing_admin_read" ON marketing_emails
  FOR SELECT USING (public.is_admin());

-- Upsert helper (callable from authenticated flows / service role)
CREATE OR REPLACE FUNCTION upsert_marketing_email(
  p_email TEXT,
  p_full_name TEXT DEFAULT NULL,
  p_source TEXT DEFAULT 'signup',
  p_opted_in BOOLEAN DEFAULT true
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id UUID;
BEGIN
  INSERT INTO marketing_emails (email, full_name, source, opted_in, updated_at)
  VALUES (
    lower(trim(p_email)),
    NULLIF(trim(COALESCE(p_full_name, '')), ''),
    p_source,
    COALESCE(p_opted_in, true),
    NOW()
  )
  ON CONFLICT (email) DO UPDATE SET
    full_name = COALESCE(EXCLUDED.full_name, marketing_emails.full_name),
    opted_in = marketing_emails.opted_in OR EXCLUDED.opted_in,
    updated_at = NOW(),
    source = CASE
      WHEN marketing_emails.source = 'signup' THEN marketing_emails.source
      ELSE EXCLUDED.source
    END
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

GRANT EXECUTE ON FUNCTION upsert_marketing_email TO authenticated, anon, service_role;

-- Stripe subscription / large monthly payments foundation
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    email TEXT NOT NULL,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT UNIQUE,
    stripe_price_id TEXT,
    status TEXT DEFAULT 'incomplete'
      CHECK (status IN ('incomplete', 'active', 'past_due', 'canceled', 'unpaid', 'trialing')),
    amount_cents INT NOT NULL DEFAULT 0,
    currency TEXT DEFAULT 'usd',
    interval TEXT DEFAULT 'month',
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "subscriptions_select_own" ON subscriptions;
CREATE POLICY "subscriptions_select_own" ON subscriptions
  FOR SELECT USING (user_id = auth.uid() OR public.is_admin());
