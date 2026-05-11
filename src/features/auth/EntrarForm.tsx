'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Sparkle } from '@/components/identity/Sparkle';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { sendMagicLink, signInWithPassword } from './actions';

export interface EntrarFormProps {
  initialEmail?: string;
  fromOnboarding?: boolean;
}

export function EntrarForm({ initialEmail = '', fromOnboarding = false }: EntrarFormProps) {
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [mode, setMode] = useState<'password' | 'magic'>('password');

  function onSubmit(formData: FormData) {
    setFeedback(null);
    startTransition(async () => {
      const action = mode === 'password' ? signInWithPassword : sendMagicLink;
      const result = await action(formData);
      if (result && !result.ok) {
        setFeedback({ ok: false, text: result.error });
      } else if (result?.ok && result.message) {
        setFeedback({ ok: true, text: result.message });
      }
    });
  }

  return (
    <main className="min-h-dvh flex flex-col px-6 py-6 max-w-md mx-auto">
      <div className="flex-1 flex flex-col justify-center gap-8">
        <header className="text-center flex flex-col items-center gap-3">
          <Sparkle size="lg" className="text-primary" />
          <h1 className="font-serif text-3xl text-ink leading-tight">Entrar na Pelicula</h1>
          <p className="font-serif text-base text-ink-2 leading-relaxed">
            O filme do céu, narrado pra você.
          </p>
        </header>

        {fromOnboarding && (
          <div className="rounded-sm border border-primary/40 bg-primary/5 px-4 py-3 text-sm text-ink-2">
            Achamos que você já tem conta com esse email. Entra aqui.
          </div>
        )}

        <form action={onSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-ink-2">Email</span>
            <Input
              name="email"
              type="email"
              required
              autoComplete="email"
              defaultValue={initialEmail}
            />
          </label>

          {mode === 'password' && (
            <label className="flex flex-col gap-2">
              <span className="text-sm text-ink-2">Senha</span>
              <Input
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="current-password"
              />
            </label>
          )}

          <Button variant="primary" type="submit" disabled={pending}>
            {pending ? 'Aguarde…' : mode === 'password' ? 'Entrar' : 'Receber link mágico'}
          </Button>

          <Button
            variant="link"
            type="button"
            onClick={() => setMode((m) => (m === 'password' ? 'magic' : 'password'))}
          >
            {mode === 'password' ? 'Prefiro link no email' : 'Voltar pra senha'}
          </Button>
        </form>

        {feedback && (
          <p
            role="status"
            aria-live="polite"
            className={`text-sm text-center ${feedback.ok ? 'text-success' : 'text-danger'}`}
          >
            {feedback.text}
          </p>
        )}

        <div className="text-center text-sm text-ink-3">
          Não tem conta?{' '}
          <Link href="/onboarding" className="text-primary underline">
            Criar agora
          </Link>
        </div>
      </div>
    </main>
  );
}
