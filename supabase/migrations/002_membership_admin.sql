-- Migration for projects that already ran the original schema.sql
-- Safe to re-run (IF NOT EXISTS / ADD COLUMN IF NOT EXISTS patterns).

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address_line1 TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address_line2 TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS state TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS postal_code TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'US';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS marketing_opt_in BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE competitions ADD COLUMN IF NOT EXISTS display_order INT NOT NULL DEFAULT 0;
ALTER TABLE competitions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_competitions_display_order
    ON competitions(display_order ASC, created_at DESC);

CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', '')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT COALESCE(
        (SELECT is_admin FROM profiles WHERE id = auth.uid()),
        false
    );
$$;

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "competitions_public_read" ON competitions;
DROP POLICY IF EXISTS "competitions_admin_all" ON competitions;
DROP POLICY IF EXISTS "tickets_select_own" ON tickets;
DROP POLICY IF EXISTS "tickets_admin_all" ON tickets;
DROP POLICY IF EXISTS "contact_insert_public" ON contact_messages;
DROP POLICY IF EXISTS "contact_admin_read" ON contact_messages;

CREATE POLICY "profiles_select_own" ON profiles
    FOR SELECT USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "profiles_update_own" ON profiles
    FOR UPDATE USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "profiles_insert_own" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "competitions_public_read" ON competitions
    FOR SELECT USING (status = 'active' OR public.is_admin());
CREATE POLICY "competitions_admin_all" ON competitions
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "tickets_select_own" ON tickets
    FOR SELECT USING (user_id = auth.uid() OR public.is_admin() OR status = 'available');
CREATE POLICY "tickets_admin_all" ON tickets
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "contact_insert_public" ON contact_messages
    FOR INSERT WITH CHECK (true);
CREATE POLICY "contact_admin_read" ON contact_messages
    FOR SELECT USING (public.is_admin());

-- After first admin signs up via /membership, promote them:
-- UPDATE profiles SET is_admin = true WHERE email = 'your-client@email.com';
