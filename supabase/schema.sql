-- Rich Reporter Competitions — Supabase schema
-- Run this entire block in the Supabase SQL Editor.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    stripe_customer_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- 4. Concurrency engine (from ticketing_logic.md)
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

-- Helper: generate ticket inventory for a competition
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
