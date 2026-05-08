'use client';

import { useState, useTransition } from 'react';
import { Sparkle } from '@/components/identity/Sparkle';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { sendMagicLink, signInWithPassword, signUpWithPassword } from './actions';

type Mode = 'magic' | 'password';
type Tab = 'signin' | 'signup';

export function SignupForm() {
  const [mode, setMode] = useState<Mode>('magic');
  const [tab, setTab] = useState<Tab>('signin');
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  function onSubmitMagic(formData: FormData) {
    setFeedback(null);
    startTransition(async () => {
      const result = await sendMagicLink(formData);
      setFeedback(
        result.ok
          ? { ok: true, text: result.message ?? 'Link enviado.' }
          : { ok: false, text: result.error },
      );
    });
  }

  function onSubmitPassword(formData: FormData) {
    setFeedback(null);
    startTransition(async () => {
      const action = tab === 'signup' ? signUpWithPassword : signInWithPassword;
      const result = await action(formData);
      // signIn redireciona via redirect(); só veremos retorno em erro.
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
          <h1 className="font-serif text-3xl text-ink leading-tight">
            {tab === 'signup' ? 'Bem-vinda à Pelicula' : 'Entrar na Pelicula'}
          </h1>
          <p className="font-serif text-base text-ink-2 leading-relaxed">
            O filme do céu, narrado pra você.
          </p>
        </header>

        <div className="grid grid-cols-2 rounded-sm border border-border overflow-hidden text-sm">
          <button
            type="button"
            className={`py-2 ${tab === 'signin' ? 'bg-primary text-on-primary' : 'bg-surface-1 text-ink-2'}`}
            onClick={() => setTab('signin')}
          >
            Já tenho conta
          </button>
          <button
            type="button"
            className={`py-2 ${tab === 'signup' ? 'bg-primary text-on-primary' : 'bg-surface-1 text-ink-2'}`}
            onClick={() => setTab('signup')}
          >
            Criar conta
          </button>
        </div>

        {mode === 'magic' ? (
          <form action={onSubmitMagic} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-ink-2">Email</span>
              <Input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="seu@email.com"
              />
            </label>
            <Button variant="primary" type="submit" disabled={pending}>
              {pending ? 'Enviando…' : 'Receber link mágico'}
            </Button>
            <Button variant="link" type="button" onClick={() => setMode('password')}>
              Usar senha
            </Button>
          </form>
        ) : (
          <form action={onSubmitPassword} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-ink-2">Email</span>
              <Input name="email" type="email" required autoComplete="email" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-ink-2">Senha</span>
              <Input
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete={tab === 'signup' ? 'new-password' : 'current-password'}
              />
            </label>
            <Button variant="primary" type="submit" disabled={pending}>
              {pending ? 'Aguarde…' : tab === 'signup' ? 'Criar conta' : 'Entrar'}
            </Button>
            <Button variant="link" type="button" onClick={() => setMode('magic')}>
              Voltar pro link mágico
            </Button>
          </form>
        )}

        {feedback && (
          <p
            role="status"
            aria-live="polite"
            className={`text-sm text-center ${feedback.ok ? 'text-success' : 'text-danger'}`}
          >
            {feedback.text}
          </p>
        )}
      </div>
    </main>
  );
}
