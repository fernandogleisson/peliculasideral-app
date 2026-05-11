import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/Button';
import { Sparkle } from '@/components/identity/Sparkle';
import { signOut } from '@/features/auth/actions';
import { resetOnboarding } from '@/features/auth/account-actions';

export const metadata = {
  title: 'Configurações · Pelicula Sideral',
};

export default async function ConfiguracoesPage() {
  const supabase = await createSupabaseServerClient().catch(() => null);
  if (!supabase) redirect('/entrar');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/entrar');

  return (
    <main className="min-h-dvh bg-surface text-ink pb-24">
      <header className="flex items-center gap-3 px-6 py-4 border-b border-border">
        <Link href="/eu" className="text-ink-2 hover:text-ink" aria-label="Voltar pra Eu">
          <ArrowLeft size={20} />
        </Link>
        <Sparkle className="text-primary" />
        <span className="font-mono text-xs tracking-[0.3em] uppercase font-bold">
          Configurações
        </span>
      </header>

      <div className="px-6 py-8 max-w-md mx-auto space-y-8">
        <section>
          <p className="font-mono text-[11px] tracking-[0.3em] text-ink-3 uppercase mb-2">Conta</p>
          <p className="font-serif text-base text-ink">{user.email}</p>
        </section>

        <section className="space-y-4">
          <p className="font-mono text-[11px] tracking-[0.3em] text-ink-3 uppercase">
            Dados natais
          </p>
          <p className="font-serif text-base text-ink-2 leading-relaxed">
            Refaz teus dados natais (nome, @, data, hora, cidade). Mapa atual é apagado e um novo é
            gerado.
          </p>
          <form action={resetOnboarding}>
            <Button type="submit" variant="secondary" className="w-full">
              Refazer dados natais
            </Button>
          </form>
        </section>

        <section className="space-y-4">
          <p className="font-mono text-[11px] tracking-[0.3em] text-ink-3 uppercase">Sessão</p>
          <form action={signOut}>
            <Button type="submit" variant="ghost" className="w-full">
              Sair
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}
