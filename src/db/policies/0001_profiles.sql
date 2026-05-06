-- 0001_profiles.sql
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Self-select
CREATE POLICY "profiles_self_select" ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Self-update
CREATE POLICY "profiles_self_update" ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Column privileges: usernames públicos pra futuro (ver perfil de outros)
REVOKE ALL ON public.profiles FROM authenticated, anon;
GRANT SELECT (id, username, display_name, avatar_url, locale) ON public.profiles TO authenticated, anon;
GRANT SELECT (
  id, username, display_name, avatar_url, whatsapp, instagram,
  birth_date, birth_time, birth_time_known,
  birth_city, birth_state, birth_country, birth_lat, birth_lng, birth_tz,
  locale, currency_pref, tier, tier_expires_at,
  substack_migrated, substack_subscriber_id,
  created_at, updated_at
) ON public.profiles TO authenticated;
GRANT UPDATE (
  display_name, avatar_url, whatsapp, instagram,
  birth_date, birth_time, birth_time_known,
  birth_city, birth_state, birth_country, birth_lat, birth_lng, birth_tz,
  locale, currency_pref
) ON public.profiles TO authenticated;
