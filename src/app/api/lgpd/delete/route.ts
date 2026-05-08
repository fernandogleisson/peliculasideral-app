import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { sendEmail } from '@/lib/resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DELETION_GRACE_DAYS = 7;

/**
 * Schedules account deletion 7 days into the future.
 *
 * The actual deletion is performed by a cron job (TODO: see Phase F1) that
 * scans `app_metadata.deletion_scheduled_at` and removes user data after the
 * grace window. The user receives an email with a cancel link.
 *
 * Cron stub: src/app/api/cron/process-deletions/route.ts (not implemented yet).
 */
export async function POST() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new NextResponse('unauthorized', { status: 401 });

  const scheduledAt = new Date(Date.now() + DELETION_GRACE_DAYS * 86_400_000).toISOString();

  // Mark on app_metadata so server-side jobs can act on it.
  const admin = createSupabaseAdminClient();
  const { error } = await admin.auth.admin.updateUserById(user.id, {
    app_metadata: { deletion_scheduled_at: scheduledAt },
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Best-effort confirmation email; we don't fail the request if email fails.
  if (user.email) {
    try {
      await sendEmail({
        to: user.email,
        subject: 'Solicitação de exclusão de conta agendada',
        text: `Sua conta será excluída em ${DELETION_GRACE_DAYS} dias (${scheduledAt}).\n\nPara cancelar, acesse https://peliculasideral.com.br/conta/cancelar-exclusao`,
      });
    } catch (e) {
      console.warn('[lgpd/delete] confirmation email failed', e);
    }
  }

  return NextResponse.json({ scheduled_at: scheduledAt, grace_days: DELETION_GRACE_DAYS });
}
