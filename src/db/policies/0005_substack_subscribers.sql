-- 0005_substack_subscribers.sql
ALTER TABLE public.substack_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "substack_admin_all" ON public.substack_subscribers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM auth.users
            WHERE id = auth.uid()
              AND raw_app_meta_data->>'role' IN ('admin','editor','publisher'))
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM auth.users
            WHERE id = auth.uid()
              AND raw_app_meta_data->>'role' IN ('admin','editor','publisher'))
  );
