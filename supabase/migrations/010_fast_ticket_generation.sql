-- Ticket generation could not create inventory for a large competition.
--
-- generate_tickets_for_competition looped 1..p_total issuing one INSERT per
-- ticket. Measured at ~0.1ms/row that is fine for a few thousand, but the
-- statement is killed by Postgres' statement_timeout long before it finishes a
-- realistic draw: creating 180,000 tickets failed with
--
--     57014  canceling statement due to statement timeout
--
-- and 600,000 likewise. The admin panel calls this function when creating a
-- competition, so the client could publish a competition with zero tickets.
--
-- Replaced with a single set-based INSERT over generate_series. Same name,
-- signature and ON CONFLICT behaviour, so callers need no change — it just
-- completes in one statement instead of p_total of them.

CREATE OR REPLACE FUNCTION generate_tickets_for_competition(
    p_competition_id UUID,
    p_total INT
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    IF p_total IS NULL OR p_total < 1 THEN
        RETURN;
    END IF;

    INSERT INTO tickets (competition_id, ticket_number, status)
    SELECT p_competition_id, gs, 'available'
    FROM generate_series(1, p_total) AS gs
    ON CONFLICT (competition_id, ticket_number) DO NOTHING;
END;
$$;

-- Sanity check after running this: should complete in seconds, not time out.
--
--   SELECT generate_tickets_for_competition(
--     '00000000-0000-4000-8000-0000000000ff'::uuid, 500000);
--   SELECT count(*) FROM tickets
--     WHERE competition_id = '00000000-0000-4000-8000-0000000000ff';
--   DELETE FROM tickets
--     WHERE competition_id = '00000000-0000-4000-8000-0000000000ff';
