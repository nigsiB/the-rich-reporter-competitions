-- Run AFTER 013_draw_winner.sql.
--
-- draw_winner() closes a competition by setting status = 'completed'. But the
-- read policy was:
--
--     USING (status = 'active' OR public.is_admin())
--
-- so the moment a competition was drawn it vanished for everyone except
-- admins — taking the public winner announcement with it. The result page
-- would 404 for the very entrants it exists to inform.
--
-- Completed competitions are now publicly readable. They still do not appear
-- on the homepage, which queries status = 'active' explicitly; they are
-- reachable at their own URL so a winner can be verified after the fact.
--
-- 'paused' remains admin-only, which is what makes it useful for staging a
-- competition before it goes live.

DROP POLICY IF EXISTS "competitions_public_read" ON competitions;
CREATE POLICY "competitions_public_read" ON competitions
    FOR SELECT USING (status IN ('active', 'completed') OR public.is_admin());

-- Verification:
--
--   -- as an anonymous caller, a completed competition should now be visible:
--   SELECT title, status FROM competitions WHERE status = 'completed';
