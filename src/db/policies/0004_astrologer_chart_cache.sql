-- 0004_astrologer_chart_cache.sql
ALTER TABLE public.astrologer_chart_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "astrologer_cache_public_select" ON public.astrologer_chart_cache
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- INSERT/UPDATE só via service_role
