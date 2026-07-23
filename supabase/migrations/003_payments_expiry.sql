-- Run AFTER schema.sql (or 002 migration). Adds payment + reservation expiry support.

ALTER TABLE tickets ADD COLUMN IF NOT EXISTS payment_intent_id TEXT;
CREATE INDEX IF NOT EXISTS idx_tickets_reserved_at ON tickets(reserved_at)
  WHERE status = 'reserved';

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    competition_id UUID REFERENCES competitions(id),
    stripe_payment_intent_id TEXT UNIQUE NOT NULL,
    amount_cents INT NOT NULL,
    currency TEXT DEFAULT 'usd',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'canceled')),
    ticket_ids UUID[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "payments_select_own" ON payments;
CREATE POLICY "payments_select_own" ON payments
    FOR SELECT USING (user_id = auth.uid() OR public.is_admin());

-- Release unpaid reservations older than p_minutes (default 15)
CREATE OR REPLACE FUNCTION release_expired_reservations(p_minutes INT DEFAULT 15)
RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_count INT;
BEGIN
    WITH released AS (
        UPDATE tickets
        SET
            status = 'available',
            user_id = NULL,
            reserved_at = NULL,
            payment_intent_id = NULL
        WHERE status = 'reserved'
          AND reserved_at IS NOT NULL
          AND reserved_at < NOW() - make_interval(mins => p_minutes)
        RETURNING id
    )
    SELECT COUNT(*) INTO v_count FROM released;
    RETURN v_count;
END;
$$;

-- Mark tickets sold after successful Stripe payment
CREATE OR REPLACE FUNCTION mark_tickets_sold(
    p_ticket_ids UUID[],
    p_payment_intent_id TEXT
)
RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_count INT;
BEGIN
    WITH sold AS (
        UPDATE tickets
        SET
            status = 'sold',
            payment_intent_id = p_payment_intent_id,
            reserved_at = NULL
        WHERE id = ANY(p_ticket_ids)
          AND status IN ('reserved', 'available')
        RETURNING id
    )
    SELECT COUNT(*) INTO v_count FROM sold;
    RETURN v_count;
END;
$$;

-- Available entry counts for realtime inventory
CREATE OR REPLACE FUNCTION get_competition_availability(p_competition_id UUID)
RETURNS JSONB
LANGUAGE sql
STABLE
AS $$
    SELECT jsonb_build_object(
        'competition_id', p_competition_id,
        'total_entries', (SELECT total_entries FROM competitions WHERE id = p_competition_id),
        'available', (
            SELECT COUNT(*)::INT FROM tickets
            WHERE competition_id = p_competition_id AND status = 'available'
        ),
        'reserved', (
            SELECT COUNT(*)::INT FROM tickets
            WHERE competition_id = p_competition_id AND status = 'reserved'
        ),
        'sold', (
            SELECT COUNT(*)::INT FROM tickets
            WHERE competition_id = p_competition_id AND status = 'sold'
        )
    );
$$;
