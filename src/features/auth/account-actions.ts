'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { profiles, mapas, lgpdConsentLog, birthDataChangeLog } from '@/db/schema';
import { createSupabaseServerClient } from '@/lib/supabase/server';

/**
 * Apaga profile, mapas e logs do user atual (mantém auth.users e cookies),
 * forçando o redirect pra /onboarding na próxima request.
 *
 * Útil quando o user quer refazer os dados natais do zero. Não desloga.
 */
export async function resetOnboarding(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/entrar');
  }

  await db.delete(mapas).where(eq(mapas.profileId, user.id));
  await db.delete(lgpdConsentLog).where(eq(lgpdConsentLog.profileId, user.id));
  await db.delete(birthDataChangeLog).where(eq(birthDataChangeLog.profileId, user.id));
  await db.delete(profiles).where(eq(profiles.id, user.id));

  revalidatePath('/', 'layout');
  redirect('/onboarding');
}
