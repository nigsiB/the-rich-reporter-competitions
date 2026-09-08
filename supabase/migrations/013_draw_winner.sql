-- Run AFTER 012_entries_remaining_counter.sql.
--
-- The site sold entries into draws it had no way of running: no winners
-- table, no winner column, no selection logic. When a draw date passed the
-- countdown said "closed" and nothing else happened.
--
-- This adds the draw itself, in the database rather than the application, so
-- that it is atomic and cannot be raced or run twice.

CREATE TABLE IF NOT EXISTS winners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    -- UNIQUE is the guard against a competition being drawn twice.
    competition_id UUID NOT NULL UNIQUE REFERENCES competitions(id) ON DELETE CASCADE,
    ticket_id UUID NOT NULL REFERENCES tickets(id),
    ticket_number INT NOT NULL,
    user_id UUID,
    -- Denormalised at draw time ("Nigel B."). Keeps the public winner display
    -- from having to read `profiles`, which is private under RLS.
    display_name TEXT,
    -- How many tickets were in the hat. Lets anyone sanity-check the result.
    eligible_tickets INT NOT NULL,
    drawn_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    drawn_by UUID,
    notified_at TIMESTAMP WITH TIME ZONE,
    claimed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_winners_competition ON winners(competition_id);

ALTER TABLE winners ENABLE ROW LEVEL SECURITY;

-- Winners are announced publicly; only admins may change the record, and even
-- they cannot insert one by hand in practice because draw_winner() is the only
-- sensible path.
DROP POLICY IF EXISTS "winners_public_read" ON winners;
CREATE POLICY "winners_public_read" ON winners
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "winners_admin_write" ON winners;
CREATE POLICY "winners_admin_write" ON winners
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- The draw.
--
-- SECURITY DEFINER so it can read profiles for the display name, with an
-- explicit admin check first — never rely on the caller having been gated in
-- the UI.
CREATE OR REPLACE FUNCTION draw_winner(p_competition_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_eligible   INT;
    v_offset     INT;
    v_ticket_id  UUID;
    v_number     INT;
    v_user       UUID;
    v_name       TEXT;
    v_title      TEXT;
BEGIN
    IF NOT COALESCE((SELECT is_admin FROM profiles WHERE id = auth.uid()), false) THEN
        RAISE EXCEPTION 'Only admins can draw a winner';
    END IF;

    SELECT title INTO v_title FROM competitions WHERE id = p_competition_id;
    IF v_title IS NULL THEN
        RAISE EXCEPTION 'Competition not found';
    END IF;

    IF EXISTS (SELECT 1 FROM winners WHERE competition_id = p_competition_id) THEN
        RAISE EXCEPTION 'This competition has already been drawn';
    END IF;

    -- Only paid-for tickets are in the hat. Reserved-but-unpaid holds are not
    -- entries, and available ones obviously are not either.
    SELECT count(*) INTO v_eligible
      FROM tickets
     WHERE competition_id = p_competition_id AND status = 'sold';

    IF v_eligible = 0 THEN
        RAISE EXCEPTION 'No sold tickets for this competition — nothing to draw';
    END IF;

    -- Uniform pick over the sold tickets. OFFSET rather than ORDER BY random()
    -- so we do not sort the whole set; a draw runs once, but the condo
    -- competition has 600,000 rows and sorting them is needless work.
    v_offset := floor(random() * v_eligible)::INT;

    SELECT id, ticket_number, user_id
      INTO v_ticket_id, v_number, v_user
      FROM tickets
     WHERE competition_id = p_competition_id AND status = 'sold'
     ORDER BY ticket_number
     OFFSET v_offset
     LIMIT 1;

    -- "Nigel B." — enough to announce publicly without publishing a full name.
    SELECT NULLIF(
             trim(split_part(COALESCE(p.full_name, ''), ' ', 1)) ||
             CASE
               WHEN trim(split_part(COALESCE(p.full_name, ''), ' ', 2)) <> ''
               THEN ' ' || left(trim(split_part(p.full_name, ' ', 2)), 1) || '.'
               ELSE ''
             END, '')
      INTO v_name
      FROM profiles p
     WHERE p.id = v_user;

    INSERT INTO winners (competition_id, ticket_id, ticket_number, user_id,
                         display_name, eligible_tickets, drawn_by)
    VALUES (p_competition_id, v_ticket_id, v_number, v_user,
            v_name, v_eligible, auth.uid());

    UPDATE competitions
       SET status = 'completed', updated_at = NOW()
     WHERE id = p_competition_id;

    RETURN jsonb_build_object(
        'competition', v_title,
        'ticket_number', v_number,
        'eligible_tickets', v_eligible,
        'display_name', v_name
    );
END;
$$;

-- Verification after running this:
--
--   SELECT c.title, c.status, w.ticket_number, w.display_name,
--          w.eligible_tickets, w.drawn_at
--     FROM competitions c
--     LEFT JOIN winners w ON w.competition_id = c.id
--    ORDER BY c.display_order;
