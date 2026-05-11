/**
 * Magic-link & email-confirmation callback.
 *
 * Supabase redirects here after the user clicks the link in their inbox.
 * We exchange the URL `code` for a session, then bounce them to the
 * onboarding flow (if they have no profile yet) or /eu (if returning user).
 */
import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/eu';

  if (!code) {
    return NextResponse.redirect(`${origin}/signup?error=missing_code`);
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/signup?error=${encodeURIComponent(error.message)}`);
  }

  // Decide first-run destination: if profile row exists, go to /eu; else /onboarding.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${origin}/signup?error=no_session`);
  }

  // Profile exists → user has onboarded; send to next (default /eu).
  // No profile → user hasn't completed onboarding yet; send to /onboarding.
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  const dest = profile ? next : '/onboarding';
  return NextResponse.redirect(`${origin}${dest}`);
}
