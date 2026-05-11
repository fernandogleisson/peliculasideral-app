'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';

const emailSchema = z.string().email();

export type AuthActionResult = { ok: true; message?: string } | { ok: false; error: string };

/**
 * Send a magic link to the email. Used for both signup AND signin
 * (Supabase auto-creates user on first magic-link click).
 */
export async function sendMagicLink(formData: FormData): Promise<AuthActionResult> {
  const emailRaw = formData.get('email');
  const parse = emailSchema.safeParse(emailRaw);
  if (!parse.success) {
    return { ok: false, error: 'Email inválido.' };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parse.data,
    options: {
      emailRedirectTo: `${env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      shouldCreateUser: true,
    },
  });

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, message: 'Te enviamos um link mágico — confere o email.' };
}

const passwordSignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Senha precisa de pelo menos 8 caracteres'),
});

export async function signInWithPassword(formData: FormData): Promise<AuthActionResult> {
  const parse = passwordSignupSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!parse.success) {
    return { ok: false, error: 'Email ou senha inválidos.' };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parse.data);
  if (error) {
    return { ok: false, error: 'Email ou senha incorretos.' };
  }
  revalidatePath('/', 'layout');
  redirect('/eu');
}

export async function signOut(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}

const signUpInlineSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Senha precisa de pelo menos 8 caracteres'),
});

/**
 * Cria conta e estabelece sessão em uma chamada. Usado no step 1b do
 * onboarding. Requer Supabase project com email_confirm=OFF, senão
 * o user fica em estado "criado mas sem sessão até confirmar".
 */
export async function signUpInline(input: {
  email: string;
  password: string;
}): Promise<AuthActionResult> {
  const parse = signUpInlineSchema.safeParse(input);
  if (!parse.success) {
    return { ok: false, error: parse.error.issues[0]?.message ?? 'Dados inválidos.' };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signUp({
    email: parse.data.email,
    password: parse.data.password,
  });
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
