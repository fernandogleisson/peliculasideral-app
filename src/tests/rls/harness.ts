import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * RLS test harness. Requires a real Supabase project (or Postgres descartável)
 * with auth.users + profiles + RLS policies applied.
 *
 * STATUS: SKELETON — to be wired up once Supabase project is provisioned (Task A8).
 *
 * Pattern:
 * 1. Create user via supabase.auth.admin.createUser
 * 2. Sign in with magic link or OTP to get session
 * 3. Return supabase client impersonating that user
 * 4. afterAll: cleanup — delete test users via admin API
 */

const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function adminClient(): SupabaseClient {
  if (!SERVICE_ROLE || !URL) {
    throw new Error('RLS harness requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY');
  }
  return createClient(URL, SERVICE_ROLE, { auth: { persistSession: false } });
}

export async function createTestUser(opts: {
  email: string;
  tier?: 'free' | 'premium';
  role?: 'admin' | 'editor' | 'publisher';
}): Promise<{ userId: string; client: SupabaseClient; password: string }> {
  // TODO: implement when Supabase available
  void opts;
  void ANON;
  void adminClient;
  throw new Error('createTestUser not yet implemented — Supabase project pending (Task A8)');
}

export async function cleanupTestUsers(emails: string[]) {
  // TODO: implement when Supabase available
  for (const _email of emails) {
    // const admin = adminClient();
    // const { data } = await admin.auth.admin.listUsers();
    // const u = data.users.find((u) => u.email === _email);
    // if (u) await admin.auth.admin.deleteUser(u.id);
    void _email;
  }
}
