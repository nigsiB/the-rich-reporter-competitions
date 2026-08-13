-- Run AFTER 011_ticket_generation_chunked.sql.
--
-- The homepage had to count available tickets per competition on every cold
-- request. An exact count is O(rows) and measured ~3.4s against the
-- 600,000-ticket competition, so first load cost ~4-6s while every other route
-- answered in ~0.25s. Caching hid it from repeat visitors but the first
-- visitor in each window still paid it.
--
-- This keeps a running count on the competition row instead, so the read is a
-- single indexed lookup and nothing counts at request time.
--
-- The triggers are STATEMENT level and use transition tables. A row-level
-- trigger would fire 600,000 times when generating a competition's inventory
-- and make ticket generation far worse than the problem being solved.

ALTER TABLE competitions
  ADD COLUMN IF NOT EXISTS entries_remaining INT;

-- Backfill. Slow (it is the very count we are eliminating) but runs once, here
-- in the SQL editor where the statement timeout is generous.
UPDATE competitions c
SET entries_remaining = (
  SELECT count(*)
  FROM tickets t
  WHERE t.competition_id = c.id
    AND t.status = 'available'
);

-- INSERT: add newly created available tickets.
CREATE OR REPLACE FUNCTION public.tickets_remaining_after_insert()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE competitions c
  SET entries_remaining = COALESCE(c.entries_remaining, 0) + d.n
  FROM (
    SELECT competition_id, count(*) AS n
    FROM new_rows
    WHERE status = 'available'
    GROUP BY competition_id
  ) d
  WHERE c.id = d.competition_id;
  RETURN NULL;
END;
$$;

-- DELETE: remove them again.
CREATE OR REPLACE FUNCTION public.tickets_remaining_after_delete()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE competitions c
  SET entries_remaining = GREATEST(COALESCE(c.entries_remaining, 0) - d.n, 0)
  FROM (
    SELECT competition_id, count(*) AS n
    FROM old_rows
    WHERE status = 'available'
    GROUP BY competition_id
  ) d
  WHERE c.id = d.competition_id;
  RETURN NULL;
END;
$$;

-- UPDATE: this is the one that matters in normal use — reserve_tickets moving
-- rows available -> reserved, and the webhook moving reserved -> sold.
CREATE OR REPLACE FUNCTION public.tickets_remaining_after_update()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE competitions c
  SET entries_remaining = GREATEST(COALESCE(c.entries_remaining, 0) + d.delta, 0)
  FROM (
    SELECT
      n.competition_id,
      count(*) FILTER (WHERE n.status = 'available' AND o.status <> 'available')
      - count(*) FILTER (WHERE o.status = 'available' AND n.status <> 'available') AS delta
    FROM new_rows n
    JOIN old_rows o ON o.id = n.id
    GROUP BY n.competition_id
  ) d
  WHERE c.id = d.competition_id
    AND d.delta <> 0;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS tickets_remaining_ins ON tickets;
CREATE TRIGGER tickets_remaining_ins
  AFTER INSERT ON tickets
  REFERENCING NEW TABLE AS new_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.tickets_remaining_after_insert();

DROP TRIGGER IF EXISTS tickets_remaining_del ON tickets;
CREATE TRIGGER tickets_remaining_del
  AFTER DELETE ON tickets
  REFERENCING OLD TABLE AS old_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.tickets_remaining_after_delete();

DROP TRIGGER IF EXISTS tickets_remaining_upd ON tickets;
CREATE TRIGGER tickets_remaining_upd
  AFTER UPDATE ON tickets
  REFERENCING OLD TABLE AS old_rows NEW TABLE AS new_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.tickets_remaining_after_update();

-- Verification: these two must agree for every competition.
--
--   SELECT c.title, c.entries_remaining,
--          (SELECT count(*) FROM tickets t
--            WHERE t.competition_id = c.id AND t.status = 'available') AS actual
--   FROM competitions c ORDER BY c.display_order;
