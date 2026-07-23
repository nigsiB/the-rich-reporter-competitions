-- Fix membership signup when email confirmation leaves auth.uid() null.
-- Profile is created by handle_new_user (SECURITY DEFINER) from raw_user_meta_data.
-- Authenticated users can then UPDATE their own row; upsert needs UPDATE + INSERT policies.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        phone,
        address_line1,
        address_line2,
        city,
        state,
        postal_code,
        country,
        date_of_birth,
        marketing_opt_in,
        updated_at
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        NULLIF(COALESCE(NEW.raw_user_meta_data->>'phone', ''), ''),
        NULLIF(COALESCE(NEW.raw_user_meta_data->>'address_line1', ''), ''),
        NULLIF(COALESCE(NEW.raw_user_meta_data->>'address_line2', ''), ''),
        NULLIF(COALESCE(NEW.raw_user_meta_data->>'city', ''), ''),
        NULLIF(COALESCE(NEW.raw_user_meta_data->>'state', ''), ''),
        NULLIF(COALESCE(NEW.raw_user_meta_data->>'postal_code', ''), ''),
        COALESCE(NULLIF(NEW.raw_user_meta_data->>'country', ''), 'US'),
        CASE
            WHEN COALESCE(NEW.raw_user_meta_data->>'date_of_birth', '') ~ '^\d{4}-\d{2}-\d{2}$'
                THEN (NEW.raw_user_meta_data->>'date_of_birth')::date
            ELSE NULL
        END,
        COALESCE((NEW.raw_user_meta_data->>'marketing_opt_in')::boolean, false),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(NULLIF(EXCLUDED.full_name, ''), profiles.full_name),
        phone = COALESCE(EXCLUDED.phone, profiles.phone),
        address_line1 = COALESCE(EXCLUDED.address_line1, profiles.address_line1),
        address_line2 = COALESCE(EXCLUDED.address_line2, profiles.address_line2),
        city = COALESCE(EXCLUDED.city, profiles.city),
        state = COALESCE(EXCLUDED.state, profiles.state),
        postal_code = COALESCE(EXCLUDED.postal_code, profiles.postal_code),
        country = COALESCE(EXCLUDED.country, profiles.country),
        date_of_birth = COALESCE(EXCLUDED.date_of_birth, profiles.date_of_birth),
        marketing_opt_in = EXCLUDED.marketing_opt_in,
        updated_at = NOW();

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS: own-row read / insert / update (WITH CHECK required for upsert UPDATE path)
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
