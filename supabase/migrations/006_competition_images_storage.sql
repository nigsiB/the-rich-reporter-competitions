-- Competition image uploads via Supabase Storage
-- Bucket: competition-images (public read; admin write)

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'competition-images',
  'competition-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "competition_images_public_read" ON storage.objects;
CREATE POLICY "competition_images_public_read"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'competition-images');

DROP POLICY IF EXISTS "competition_images_admin_insert" ON storage.objects;
CREATE POLICY "competition_images_admin_insert"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'competition-images' AND public.is_admin());

DROP POLICY IF EXISTS "competition_images_admin_update" ON storage.objects;
CREATE POLICY "competition_images_admin_update"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'competition-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'competition-images' AND public.is_admin());

DROP POLICY IF EXISTS "competition_images_admin_delete" ON storage.objects;
CREATE POLICY "competition_images_admin_delete"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'competition-images' AND public.is_admin());
