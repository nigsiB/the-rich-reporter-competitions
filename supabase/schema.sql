-- Rich Reporter Competitions — Supabase schema
-- Run this entire block in the Supabase SQL Editor (fresh project),
-- or run supabase/migrations/002_membership_admin.sql if schema already applied.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    phone TEXT,
    address_line1 TEXT,
    address_line2 TEXT,
    city TEXT,
    state TEXT,
    postal_code TEXT,
    country TEXT DEFAULT 'US',
    date_of_birth DATE,
    marketing_opt_in BOOLEAN DEFAULT false,
    is_admin BOOLEAN DEFAULT false,
    stripe_customer_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Competitions
CREATE TABLE IF NOT EXISTS competitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    prize_description TEXT NOT NULL DEFAULT '',
    total_entries INT NOT NULL,
    price_per_entry DECIMAL(10, 2) NOT NULL,
    draw_date TIMESTAMP WITH TIME ZONE,
    image_url TEXT,
    display_order INT NOT NULL DEFAULT 0,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_competitions_display_order
    ON competitions(display_order ASC, created_at DESC);

-- 3. Tickets
CREATE TABLE IF NOT EXISTS tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    competition_id UUID REFERENCES competitions(id) ON DELETE CASCADE,
    ticket_number INT NOT NULL,
    user_id UUID,
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold')),
    reserved_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(competition_id, ticket_number)
);

CREATE INDEX IF NOT EXISTS idx_tickets_available
    ON tickets(competition_id)
    WHERE status = 'available';

-- 4. Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', '')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Concurrency engine
CREATE OR REPLACE FUNCTION reserve_tickets(
    p_competition_id UUID,
    p_user_id UUID,
    p_quantity INT
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    v_reserved_ids UUID[];
BEGIN
    WITH locked_tickets AS (
        SELECT id
        FROM tickets
        WHERE competition_id = p_competition_id
          AND status = 'available'
        LIMIT p_quantity
        FOR UPDATE SKIP LOCKED
    ),
    updated AS (
        UPDATE tickets
        SET
            status = 'reserved',
            user_id = p_user_id,
            reserved_at = NOW()
        WHERE id IN (SELECT id FROM locked_tickets)
        RETURNING id
    )
    SELECT ARRAY_AGG(id) INTO v_reserved_ids FROM updated;

    IF array_length(v_reserved_ids, 1) IS NULL OR array_length(v_reserved_ids, 1) < p_quantity THEN
        RAISE EXCEPTION 'Not enough tickets available';
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'reserved_count', array_length(v_reserved_ids, 1),
        'ticket_ids', v_reserved_ids
    );
END;
$$;

-- 7. Generate ticket inventory
CREATE OR REPLACE FUNCTION generate_tickets_for_competition(
    p_competition_id UUID,
    p_total INT
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    i INT;
BEGIN
    FOR i IN 1..p_total LOOP
        INSERT INTO tickets (competition_id, ticket_number, status)
        VALUES (p_competition_id, i, 'available')
        ON CONFLICT (competition_id, ticket_number) DO NOTHING;
    END LOOP;
END;
$$;

-- 8. RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT COALESCE(
        (SELECT is_admin FROM profiles WHERE id = auth.uid()),
        false
    );
$$;

-- Profiles: users read/update self; admins read all
CREATE POLICY "profiles_select_own" ON profiles
    FOR SELECT USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "profiles_update_own" ON profiles
    FOR UPDATE USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "profiles_insert_own" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Competitions: public read active; admins full access
CREATE POLICY "competitions_public_read" ON competitions
    FOR SELECT USING (status = 'active' OR public.is_admin());
CREATE POLICY "competitions_admin_all" ON competitions
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Tickets: users see own; admins all; reserve via RPC
CREATE POLICY "tickets_select_own" ON tickets
    FOR SELECT USING (user_id = auth.uid() OR public.is_admin() OR status = 'available');
CREATE POLICY "tickets_admin_all" ON tickets
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Contact: anyone can insert; admins read
CREATE POLICY "contact_insert_public" ON contact_messages
    FOR INSERT WITH CHECK (true);
CREATE POLICY "contact_admin_read" ON contact_messages
    FOR SELECT USING (public.is_admin());

-- 9. Payments + reservation expiry (see also migrations/003_payments_expiry.sql)
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
