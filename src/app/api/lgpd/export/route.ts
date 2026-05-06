import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import JSZip from 'jszip';
import { db } from '@/db/client';
import { profiles, birthDataChangeLog, lgpdConsentLog } from '@/db/schema';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * LGPD data export — returns a ZIP with the user's personal data:
 * profile.json, consents.json, birth_changes.json.
 *
 * Mapas natais and interpretations are added in Phase F1 once those tables
 * exist. This endpoint is intentionally additive.
 */
export async function POST() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new NextResponse('unauthorized', { status: 401 });

  const [profile] = await db.select().from(profiles).where(eq(profiles.id, user.id));
  const consents = await db
    .select()
    .from(lgpdConsentLog)
    .where(eq(lgpdConsentLog.profileId, user.id));
  const birthChanges = await db
    .select()
    .from(birthDataChangeLog)
    .where(eq(birthDataChangeLog.profileId, user.id));

  const zip = new JSZip();
  zip.file(
    'README.txt',
    [
      'Pelicula Sideral — LGPD data export',
      `User: ${user.id} (${user.email ?? 'no email'})`,
      `Generated at: ${new Date().toISOString()}`,
      '',
      'Files:',
      '  profile.json       — your profile row',
      '  consents.json      — LGPD consent log entries',
      '  birth_changes.json — birth data change history',
      '',
      'Mapas natais and interpretations will be added in Phase F1.',
    ].join('\n'),
  );
  zip.file('profile.json', JSON.stringify(profile ?? null, null, 2));
  zip.file('consents.json', JSON.stringify(consents, null, 2));
  zip.file('birth_changes.json', JSON.stringify(birthChanges, null, 2));

  const buf = await zip.generateAsync({ type: 'nodebuffer' });

  return new NextResponse(new Uint8Array(buf), {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="dados-${user.id}.zip"`,
      'Cache-Control': 'no-store',
    },
  });
}
