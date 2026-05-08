/**
 * Supabase admin client — uses SERVICE_ROLE_KEY. SERVER-ONLY.
 *
 * Throws at module load time if imported in a browser bundle.
 */
import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';

if (typeof window !== 'undefined') {
  throw new Error('supabase admin client can only be used server-side');
}

if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
  // Defer the error to first call so the file can still be imported during
  // build steps that don't actually use admin powers.
}

export function createSupabaseAdminClient() {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase URL/service-role key not configured for admin client');
  }
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
