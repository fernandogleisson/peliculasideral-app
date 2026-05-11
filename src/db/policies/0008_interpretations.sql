-- 0008_interpretations.sql
-- Interpretations: leitura pública de short_text (published), long_text via RPC com gate de tier.
-- Mutations só pra editores (role 'editor' via custom claim) e Victor (autor principal).
ALTER TABLE public.interpretations ENABLE ROW LEVEL SECURITY;

-- SELECT: qualquer authenticated vê interpretations published
CREATE POLICY "interpretations_published_select" ON public.interpretations
  FOR SELECT
  TO authenticated, anon
  USING (status = 'published');

-- SELECT pra editores (anon/authenticated com claim editor=true): tudo
CREATE POLICY "interpretations_editor_select_all" ON public.interpretations
  FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'editor'
    OR (auth.jwt() ->> 'role') = 'editor'
  );

-- INSERT/UPDATE/DELETE: apenas editores
CREATE POLICY "interpretations_editor_insert" ON public.interpretations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'editor'
    OR (auth.jwt() ->> 'role') = 'editor'
  );

CREATE POLICY "interpretations_editor_update" ON public.interpretations
  FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'editor'
    OR (auth.jwt() ->> 'role') = 'editor'
  )
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'editor'
    OR (auth.jwt() ->> 'role') = 'editor'
  );

CREATE POLICY "interpretations_editor_delete" ON public.interpretations
  FOR DELETE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'editor'
    OR (auth.jwt() ->> 'role') = 'editor'
  );

-- Column privileges:
-- - Free vê: id, type, key, short_text, status, updated_at
-- - long_text fica protegido: SÓ via RPC get_interpretation_long() abaixo
REVOKE ALL ON public.interpretations FROM authenticated, anon;
GRANT SELECT (id, type, key, short_text, status, revision, updated_at)
  ON public.interpretations TO authenticated, anon;

-- Editores ganham acesso completo (long_text + mutations)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.interpretations TO authenticated;

-- ─────────────────────────────────────────────────────────────────────────────
-- RPC: get_interpretation_long(type, key)
-- Retorna long_text se: (1) interpretation publicada E (2) caller é tier=premium OU editor
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_interpretation_long(p_type text, p_key text)
RETURNS TABLE (id uuid, long_text text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller_tier text;
  caller_role text;
BEGIN
  caller_tier := COALESCE(auth.jwt() ->> 'tier', 'free');
  caller_role := COALESCE(
    auth.jwt() -> 'app_metadata' ->> 'role',
    auth.jwt() ->> 'role',
    ''
  );

  IF caller_tier <> 'premium' AND caller_role <> 'editor' THEN
    RAISE EXCEPTION 'paywall: premium tier required'
      USING ERRCODE = '42501';
  END IF;

  RETURN QUERY
  SELECT i.id, i.long_text
    FROM public.interpretations i
    WHERE i.type = p_type
      AND i.key = p_key
      AND i.status = 'published'
    LIMIT 1;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_interpretation_long(text, text) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.get_interpretation_long(text, text) FROM anon;
