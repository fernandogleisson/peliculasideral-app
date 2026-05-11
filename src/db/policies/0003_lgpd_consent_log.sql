-- 0003_lgpd_consent_log.sql
ALTER TABLE public.lgpd_consent_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lgpd_consent_owner_select" ON public.lgpd_consent_log
  FOR SELECT
  TO authenticated
  USING (auth.uid() = profile_id);

-- INSERT via server-action service_role
