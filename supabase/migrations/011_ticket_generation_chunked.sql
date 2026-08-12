-- Run AFTER 010_fast_ticket_generation.sql.
--
-- 010 made ticket generation set-based, which was necessary but not
-- sufficient. Supabase applies an 8 second statement_timeout to the API role,
-- and measured throughput against this database is ~16,000 rows/sec:
--
--     25,000 rows   4.5s   OK
--     50,000 rows   3.2s   OK
--    100,000 rows   6.2s   OK
--    200,000 rows   7.7s   57014 statement timeout
--
-- So roughly 130,000 rows is the hard ceiling for ANY single call over
-- PostgREST, no matter how the insert is written. A 600,000 ticket draw
-- cannot be generated in one request and must be chunked.
--
-- generate_tickets_for_competition always starts at 1 and leans on
-- ON CONFLICT to skip what exists, so calling it repeatedly to build up a
-- large competition re-scans everything already inserted and gets slower each
-- time. This range variant inserts only the window asked for.

CREATE OR REPLACE FUNCTION generate_tickets_range(
    p_competition_id UUID,
    p_from INT,
    p_to INT
)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
    v_inserted INT;
BEGIN
    IF p_from IS NULL OR p_to IS NULL OR p_to < p_from OR p_from < 1 THEN
        RETURN 0;
    END IF;

    INSERT INTO tickets (competition_id, ticket_number, status)
    SELECT p_competition_id, gs, 'available'
    FROM generate_series(p_from, p_to) AS gs
    ON CONFLICT (competition_id, ticket_number) DO NOTHING;

    GET DIAGNOSTICS v_inserted = ROW_COUNT;
    RETURN v_inserted;
END;
$$;

-- Sanity check. Needs a real competition row — tickets.competition_id is a
-- foreign key, so generating against an arbitrary UUID fails.
--
--   SELECT generate_tickets_range(id, 1, 50000) FROM competitions LIMIT 1;
--   -- expect: 50000 (or 0 if those numbers already exist), in a few seconds
