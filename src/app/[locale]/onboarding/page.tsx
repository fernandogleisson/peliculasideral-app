import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { OnboardingClient } from '@/features/onboarding/OnboardingClient';

export const metadata = {
  title: 'Onboarding · Pelicula Sideral',
};

export default async function OnboardingPage() {
  const supabase = await createSupabaseServerClient().catch(() => null);
  if (!supabase) {
    return <OnboardingClient />;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/signup');
  }

  // If already onboarded, skip to /eu
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();
  if (profile) {
    redirect('/eu');
  }

  return <OnboardingClient />;
}
