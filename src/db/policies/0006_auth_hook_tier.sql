-- 0006_auth_hook_tier.sql
CREATE OR REPLACE FUNCTION public.set_tier_claim(event jsonb)
RETURNS jsonb AS $$
DECLARE
  user_tier text;
BEGIN
  SELECT tier INTO user_tier
    FROM public.profiles
    WHERE id = (event->>'user_id')::uuid
      AND (tier_expires_at IS NULL OR tier_expires_at > now());

  RETURN jsonb_build_object(
    'claims', jsonb_build_object('tier', COALESCE(user_tier, 'free'))
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.set_tier_claim(jsonb) TO supabase_auth_admin;
