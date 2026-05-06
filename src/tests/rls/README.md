# RLS Test Suite

Tests RLS policies against a real Postgres + Supabase Auth instance.

## Status: SKELETON

Tests are stubbed. To activate after Task A8 (Supabase provisioning):

1. Set `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`
2. Apply migrations: `pnpm db:push`
3. Apply policies (in order):
   - `psql $DATABASE_URL_DIRECT -f src/db/policies/0001_profiles.sql`
   - ... 0002 through 0006
4. Apply triggers: `psql $DATABASE_URL_DIRECT -f src/db/migrations/9999_triggers.sql`
5. Configure Auth Hook in Supabase Dashboard:
   - Authentication → Hooks → Custom Access Token → enable, choose `public.set_tier_claim`
6. Implement `harness.ts` TODOs
7. Run: `pnpm test src/tests/rls/`

## Coverage targets (per plan §E8-E9)

- profiles: own select, public columns of others, no foreign update
- birth_data_change_log: owner select, append-only
- lgpd_consent_log: owner select
- astrologer_chart_cache: public select, service-only writes
- substack_subscribers: admin only via app_meta_data role
- Auth Hook: tier claim injected on JWT renewal
