import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { resendEmailConfirmation } from './email-confirm-actions';
import { EmailConfirmBannerActions } from './EmailConfirmBannerActions';

const DISMISS_COOKIE = 'pelicula_email_banner_dismissed_at';
const DISMISS_TTL_MS = 24 * 60 * 60 * 1000;

export async function EmailConfirmBanner() {
  const supabase = await createSupabaseServerClient().catch(() => null);
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.email_confirmed_at) return null;

  const cookieStore = await cookies();
  const dismissed = cookieStore.get(DISMISS_COOKIE);
  if (dismissed) {
    const ts = parseInt(dismissed.value, 10);
    // eslint-disable-next-line react-hooks/purity
    const now = Date.now();
    if (!Number.isNaN(ts) && now - ts < DISMISS_TTL_MS) return null;
  }

  return (
    <div
      role="status"
      className="border-l-4 border-l-warning bg-surface-1 px-4 py-2 flex items-center gap-3 text-sm"
    >
      <span aria-hidden>⚠️</span>
      <p className="flex-1 text-ink-2">
        <strong className="text-ink">Confirme teu email</strong> pra garantir acesso.
      </p>
      <EmailConfirmBannerActions resendAction={resendEmailConfirmation} />
    </div>
  );
}
