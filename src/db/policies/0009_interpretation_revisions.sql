-- 0009_interpretation_revisions.sql
-- Revisões de interpretações: somente editores leem/escrevem.
ALTER TABLE public.interpretation_revisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "interp_revisions_editor_all" ON public.interpretation_revisions
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

REVOKE ALL ON public.interpretation_revisions FROM authenticated, anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.interpretation_revisions TO authenticated;

-- Trigger: a cada UPDATE de interpretations, snapshot na revisions
CREATE OR REPLACE FUNCTION public.snapshot_interpretation_revision()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (TG_OP = 'UPDATE') AND (
    OLD.short_text IS DISTINCT FROM NEW.short_text
    OR OLD.long_text IS DISTINCT FROM NEW.long_text
    OR OLD.status IS DISTINCT FROM NEW.status
  ) THEN
    INSERT INTO public.interpretation_revisions (
      interpretation_id, revision, short_text, long_text, status_at_save, author_id
    ) VALUES (
      OLD.id, OLD.revision, OLD.short_text, OLD.long_text, OLD.status, OLD.author_id
    );
    NEW.revision := OLD.revision + 1;
    NEW.updated_at := now();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_snapshot_interpretation_revision ON public.interpretations;
CREATE TRIGGER trg_snapshot_interpretation_revision
  BEFORE UPDATE ON public.interpretations
  FOR EACH ROW
  EXECUTE FUNCTION public.snapshot_interpretation_revision();
