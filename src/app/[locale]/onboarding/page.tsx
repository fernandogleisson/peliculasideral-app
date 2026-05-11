import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { OnboardingClient } from '@/features/onboarding/OnboardingClient';

export const metadata = {
  title: 'Onboarding · Pelicula Sideral',
};

export default async function OnboardingPage() {
  const supabase = await createSupabaseServerClient().catch(() => null);

  // Visitante sem session: renderiza com step inicial (email).
  if (!supabase) {
    return <OnboardingClient alreadyLoggedIn={false} />;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Sem session: começa pelo step email.
  if (!user) {
    return <OnboardingClient alreadyLoggedIn={false} />;
  }

  // Já logado: se profile completo → /eu; senão continua onboarding a partir
  // do step `name`.
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();
  if (profile) {
    redirect('/eu');
  }

  return <OnboardingClient alreadyLoggedIn={true} />;
}
