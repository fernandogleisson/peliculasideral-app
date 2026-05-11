-- 0010_interpretation_review_assists.sql
-- Histórico de assistências IA (Paperclip) na revisão de interpretações.
-- Acesso restrito a editores. Não é visível pra usuários comuns.
ALTER TABLE public.interpretation_review_assists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "interp_assists_editor_all" ON public.interpretation_review_assists
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'editor'
    OR (auth.jwt() ->> 'role') = 'editor'
  )
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'editor'
    OR (auth.jwt() ->> 'role') = 'editor'
  );

REVOKE ALL ON public.interpretation_review_assists FROM authenticated, anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.interpretation_review_assists TO authenticated;
