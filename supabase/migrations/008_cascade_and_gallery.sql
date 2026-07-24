-- Cascading English translations + multi-image gallery support.

ALTER TABLE competitions
  ADD COLUMN IF NOT EXISTS translations_cascade BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE competitions
  ADD COLUMN IF NOT EXISTS gallery_urls TEXT[] NOT NULL DEFAULT '{}'::text[];

COMMENT ON COLUMN competitions.translations_cascade IS
  'When true, other locales fall back to English title/prize_description; translations JSONB is unused.';
COMMENT ON COLUMN competitions.gallery_urls IS
  'Additional competition images (main image remains image_url). Empty = single-image behaviour.';

-- Existing rows with manual locale copy should keep custom-copy mode.
UPDATE competitions
SET translations_cascade = false
WHERE translations IS NOT NULL
  AND translations <> '{}'::jsonb
  AND translations_cascade = true;
