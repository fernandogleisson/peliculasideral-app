import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { SignupForm } from '@/features/auth/SignupForm';

export const metadata = {
  title: 'Entrar · Pelicula Sideral',
};

export default async function SignupPage() {
  const supabase = await createSupabaseServerClient().catch(() => null);
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect('/eu');
  }

  return <SignupForm />;
}
