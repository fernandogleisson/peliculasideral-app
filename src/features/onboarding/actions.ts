'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { profiles, lgpdConsentLog } from '@/db/schema';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { generateMapaForProfile } from '@/features/mapa-natal/generate';

const onboardingSchema = z.object({
  displayName: z.string().min(2, 'Mínimo de 2 caracteres'),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9_]+$/i, 'Apenas letras, números e _'),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  birthTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional(),
  birthTimeKnown: z.boolean(),
  birthCity: z.string().min(2),
  birthCountry: z.string().min(2).default('BR'),
  birthLat: z.number().min(-90).max(90),
  birthLng: z.number().min(-180).max(180),
  birthTz: z.string().min(3),
  locale: z.enum(['pt-BR', 'en-US', 'es-419']).default('pt-BR'),
  lgpdAccept: z.literal(true),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;

export type OnboardingResult = { ok: true } | { ok: false; error: string };

const FIELD_LABELS_PT: Record<string, string> = {
  displayName: 'Nome',
  username: '@ (username)',
  birthDate: 'Data de nascimento',
  birthTime: 'Hora de nascimento',
  birthCity: 'Cidade de nascimento',
  birthLat: 'Coordenada (lat)',
  birthLng: 'Coordenada (lng)',
  birthTz: 'Fuso horário',
  lgpdAccept: 'Aceite dos termos',
};

export async function submitOnboarding(input: OnboardingInput): Promise<OnboardingResult> {
  const parse = onboardingSchema.safeParse(input);
  if (!parse.success) {
    const issue = parse.error.issues[0];
    const field = issue?.path?.[0]?.toString() ?? '';
    const label = FIELD_LABELS_PT[field] ?? field ?? 'Campo';
    const message = issue?.message ?? 'inválido';
    return { ok: false, error: `${label}: ${message}` };
  }
  const data = parse.data;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: 'Sessão expirada — entre novamente.' };
  }

  // Check uniqueness of username
  const [existing] = await db
    .select({ id: profiles.id })
    .from(profiles)
    .where(eq(profiles.username, data.username))
    .limit(1);
  if (existing && existing.id !== user.id) {
    return { ok: false, error: 'Esse usuário já está em uso.' };
  }

  // Insert profile (or update if user retried)
  await db
    .insert(profiles)
    .values({
      id: user.id,
      username: data.username,
      displayName: data.displayName,
      birthDate: data.birthDate,
      birthTime: data.birthTimeKnown ? data.birthTime : null,
      birthTimeKnown: data.birthTimeKnown,
      birthCity: data.birthCity,
      birthCountry: data.birthCountry,
      birthLat: data.birthLat.toString(),
      birthLng: data.birthLng.toString(),
      birthTz: data.birthTz,
      locale: data.locale,
    })
    .onConflictDoUpdate({
      target: profiles.id,
      set: {
        username: data.username,
        displayName: data.displayName,
        birthDate: data.birthDate,
        birthTime: data.birthTimeKnown ? data.birthTime : null,
        birthTimeKnown: data.birthTimeKnown,
        birthCity: data.birthCity,
        birthCountry: data.birthCountry,
        birthLat: data.birthLat.toString(),
        birthLng: data.birthLng.toString(),
        birthTz: data.birthTz,
        locale: data.locale,
        updatedAt: new Date(),
      },
    });

  // LGPD consent log (one record per consent type, immutable)
  await db.insert(lgpdConsentLog).values([
    { profileId: user.id, consentType: 'terms', granted: true, version: 'v1' },
    { profileId: user.id, consentType: 'privacy', granted: true, version: 'v1' },
  ]);

  // Trigger mapa generation in background (continues even if cookie write fails)
  await generateMapaForProfile(user.id);

  revalidatePath('/', 'layout');
  redirect('/eu');
}
