-- Run AFTER 014_public_completed_competitions.sql.
--
-- Records which closing reminders have been sent for a competition, so the
-- job that sends them can run as often as it likes without emailing twice.
--
-- The UNIQUE constraint is the whole mechanism: sending is "insert the row,
-- and only send if the insert succeeded". Two overlapping runs cannot both
-- win that insert, so a duplicate email is impossible even if the scheduler
-- fires twice or a deploy overlaps a run.

CREATE TABLE IF NOT EXISTS competition_reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
    -- Hours before the draw this reminder represents: 48, 12 or 1.
    milestone_hours INT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    sent_to TEXT,
    UNIQUE (competition_id, milestone_hours)
);

CREATE INDEX IF NOT EXISTS idx_competition_reminders_competition
    ON competition_reminders(competition_id);

ALTER TABLE competition_reminders ENABLE ROW LEVEL SECURITY;

-- Operational data. Nothing public reads it; the cron uses the service role,
-- which bypasses RLS, and admins can look at it if they need to.
DROP POLICY IF EXISTS "competition_reminders_admin" ON competition_reminders;
CREATE POLICY "competition_reminders_admin" ON competition_reminders
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Verification:
--
--   SELECT c.title, r.milestone_hours, r.sent_at, r.sent_to
--     FROM competition_reminders r
--     JOIN competitions c ON c.id = r.competition_id
--    ORDER BY r.sent_at DESC;
