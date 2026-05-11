import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { EntrarForm } from '@/features/auth/EntrarForm';

export const metadata = {
  title: 'Entrar · Pelicula Sideral',
};

interface PageProps {
  searchParams: Promise<{ email?: string; from?: string }>;
}

export default async function EntrarPage({ searchParams }: PageProps) {
  const supabase = await createSupabaseServerClient().catch(() => null);
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect('/eu');
  }

  const { email, from } = await searchParams;
  return <EntrarForm initialEmail={email} fromOnboarding={from === 'onboarding'} />;
}
