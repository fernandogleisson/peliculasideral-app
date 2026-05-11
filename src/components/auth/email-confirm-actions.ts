'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export type ResendResult = { ok: true; message: string } | { ok: false; error: string };

export async function resendEmailConfirmation(): Promise<ResendResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { ok: false, error: 'Sessão expirada — entre novamente.' };
  }
  if (user.email_confirmed_at) {
    return { ok: false, error: 'Email já está confirmado.' };
  }

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: user.email,
  });
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, message: 'Link reenviado. Confere o inbox.' };
}
