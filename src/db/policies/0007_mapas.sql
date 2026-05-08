-- 0007_mapas.sql
-- Mapas natais: self-only access. User só vê e modifica os próprios.
ALTER TABLE public.mapas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "mapas_self_select" ON public.mapas
  FOR SELECT
  TO authenticated
  USING (auth.uid() = profile_id);

CREATE POLICY "mapas_self_insert" ON public.mapas
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "mapas_self_update" ON public.mapas
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = profile_id)
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "mapas_self_delete" ON public.mapas
  FOR DELETE
  TO authenticated
  USING (auth.uid() = profile_id);

-- Column privileges
REVOKE ALL ON public.mapas FROM authenticated, anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mapas TO authenticated;
