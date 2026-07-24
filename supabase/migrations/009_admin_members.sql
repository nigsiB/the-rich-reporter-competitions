-- Admin member management: lock down is_admin changes to admins only.
-- Existing RLS already allows admins to SELECT/UPDATE all profiles
-- (see 005_fix_profile_rls_signup.sql). This trigger prevents non-admins
-- from elevating themselves via a direct client update.

CREATE OR REPLACE FUNCTION public.protect_is_admin_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.is_admin IS DISTINCT FROM OLD.is_admin THEN
    IF NOT COALESCE(
      (SELECT is_admin FROM public.profiles WHERE id = auth.uid()),
      false
    ) THEN
      RAISE EXCEPTION 'Only admins can change is_admin';
    END IF;

    -- Block demoting the last remaining admin
    IF OLD.is_admin = true AND NEW.is_admin = false THEN
      IF (
        SELECT COUNT(*)::int
        FROM public.profiles
        WHERE is_admin = true
          AND id IS DISTINCT FROM OLD.id
      ) = 0 THEN
        RAISE EXCEPTION 'Cannot revoke the last remaining admin';
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_is_admin_column ON public.profiles;
CREATE TRIGGER protect_is_admin_column
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_is_admin_column();

-- Reaffirm admin can list/update all profiles (idempotent)
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;

CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE
  USING (auth.uid() = id OR public.is_admin())
  WITH CHECK (auth.uid() = id OR public.is_admin());
