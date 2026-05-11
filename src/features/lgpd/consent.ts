'use server';

import { headers } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export type ConsentType =
  | 'terms'
  | 'privacy'
  | 'marketing_email'
  | 'marketing_whatsapp'
  | 'cookies_analytics';

export interface RecordConsentInput {
  consentType: ConsentType;
  granted: boolean;
  version: string;
}

/**
 * Records a granular consent event for the authenticated user.
 *
 * No-op when the visitor is anonymous (only `localStorage` matters then).
 * Returns `{ recorded: false }` so callers can branch without throwing.
 */
export async function recordConsent(
  input: RecordConsentInput,
): Promise<{ recorded: boolean; reason?: string }> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { recorded: false, reason: 'anonymous' };

  const headersList = await headers();
  const { error } = await supabase.from('lgpd_consent_log').insert({
    profile_id: user.id,
    consent_type: input.consentType,
    granted: input.granted,
    version: input.version,
    ip_address: headersList.get('x-forwarded-for') ?? null,
    user_agent: headersList.get('user-agent'),
  });

  if (error) return { recorded: false, reason: error.message };
  return { recorded: true };
}
