-- 0002_birth_data_change_log.sql
ALTER TABLE public.birth_data_change_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "birth_change_owner_select" ON public.birth_data_change_log
  FOR SELECT
  TO authenticated
  USING (auth.uid() = profile_id);

-- INSERT vem só via server-action service_role (rate limit logic).
-- Sem UPDATE/DELETE — append-only audit trail.
