'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { OnboardingStep } from '@/components/onboarding/OnboardingStep';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { BR_CITIES, type CityEntry } from './cities-br';
import { submitOnboarding, type OnboardingInput } from './actions';
import { checkEmailExists } from '@/features/auth/check-email-exists';
import { signUpInline } from '@/features/auth/actions';

type Step =
  | 'email'
  | 'password'
  | 'name'
  | 'username'
  | 'date'
  | 'time'
  | 'city'
  | 'consent'
  | 'generating';

interface FormState {
  email: string;
  password: string;
  displayName: string;
  username: string;
  birthDate: string;
  birthTime: string;
  birthTimeKnown: boolean;
  cityIdx: number;
  lgpdAccept: boolean;
}

const INITIAL: FormState = {
  email: '',
  password: '',
  displayName: '',
  username: '',
  birthDate: '',
  birthTime: '',
  birthTimeKnown: true,
  cityIdx: 0,
  lgpdAccept: false,
};

interface OnboardingClientProps {
  /** Se true, user já está autenticado: pula steps email/password. */
  alreadyLoggedIn?: boolean;
}

export function OnboardingClient({ alreadyLoggedIn = false }: OnboardingClientProps = {}) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(alreadyLoggedIn ? 'name' : 'email');
  const [form, setForm] = useState<FormState>(INITIAL);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function next(target: Step) {
    setError(null);
    setStep(target);
  }

  function submit() {
    const city = BR_CITIES[form.cityIdx] as CityEntry;
    const payload: OnboardingInput = {
      displayName: form.displayName.trim(),
      username: form.username.trim().toLowerCase(),
      birthDate: form.birthDate,
      birthTime: form.birthTimeKnown ? form.birthTime : undefined,
      birthTimeKnown: form.birthTimeKnown,
      birthCity: `${city.city} - ${city.state}`,
      birthCountry: 'BR',
      birthLat: city.lat,
      birthLng: city.lng,
      birthTz: city.tz,
      locale: 'pt-BR',
      lgpdAccept: true,
    };

    setStep('generating');
    startTransition(async () => {
      const result = await submitOnboarding(payload);
      if (!result.ok) {
        setError(result.error);
        setStep('consent');
      }
    });
  }

  if (step === 'email') {
    function onSubmitEmail() {
      setError(null);
      startTransition(async () => {
        const { exists } = await checkEmailExists(form.email.trim());
        if (exists) {
          router.replace(`/entrar?email=${encodeURIComponent(form.email.trim())}&from=onboarding`);
          return;
        }
        next('password');
      });
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

    return (
      <OnboardingStep
        variant="input"
        title="Vamos começar pelo seu email"
        subtitle="Pra criar sua conta e salvar seu mapa."
        showBack={false}
        nextLabel={pending ? 'Verificando…' : 'Continuar'}
        nextDisabled={!emailValid || pending}
        onNext={onSubmitEmail}
      >
        <Input
          autoFocus
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="seu@email.com"
          autoComplete="email"
        />
        {error && <p className="mt-2 text-sm text-danger">{error}</p>}
        <p className="mt-4 text-xs text-ink-3 text-center">
          Já tem conta?{' '}
          <Link href="/entrar" className="text-primary underline">
            Entrar
          </Link>
        </p>
      </OnboardingStep>
    );
  }

  if (step === 'password') {
    function onSubmitPassword() {
      setError(null);
      startTransition(async () => {
        const result = await signUpInline({
          email: form.email.trim(),
          password: form.password,
        });
        if (!result.ok) {
          setError(result.error);
          return;
        }
        next('name');
      });
    }

    const passwordOk = form.password.length >= 8;

    return (
      <OnboardingStep
        variant="input"
        title="Cria uma senha"
        subtitle="Mínimo 8 caracteres. Vai usar isso pra entrar de volta."
        nextLabel={pending ? 'Criando…' : 'Criar conta'}
        nextDisabled={!passwordOk || pending}
        onNext={onSubmitPassword}
      >
        <Input
          autoFocus
          type="password"
          value={form.password}
          onChange={(e) => update('password', e.target.value)}
          placeholder="••••••••"
          minLength={8}
          autoComplete="new-password"
        />
        {error && <p className="mt-2 text-sm text-danger">{error}</p>}
      </OnboardingStep>
    );
  }

  if (step === 'name') {
    return (
      <OnboardingStep
        variant="input"
        title="Como você quer ser chamada?"
        subtitle="Esse é o nome que vai aparecer no seu mapa."
        showBack={false}
        nextLabel="Continuar"
        nextDisabled={form.displayName.trim().length < 2}
        onNext={() => next('username')}
      >
        <Input
          autoFocus
          value={form.displayName}
          onChange={(e) => update('displayName', e.target.value)}
          placeholder="Maria"
          autoComplete="given-name"
        />
      </OnboardingStep>
    );
  }

  if (step === 'username') {
    const usernameSanitized = form.username.replace(/[^a-z0-9_]/g, '');
    const usernameInvalid = usernameSanitized.length > 0 && usernameSanitized !== form.username;
    return (
      <OnboardingStep
        variant="input"
        title="Escolhe um @"
        subtitle="Único e curto. Só letras, números e underline (_). Sem espaços, acentos ou pontos."
        nextDisabled={usernameSanitized.length < 3}
        onNext={() => {
          // Garante que o que vai pro submit já está sanitizado.
          update('username', usernameSanitized);
          next('date');
        }}
      >
        <Input
          autoFocus
          value={form.username}
          onChange={(e) =>
            update('username', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))
          }
          placeholder="maria"
          pattern="[a-z0-9_]+"
          error={usernameInvalid}
          aria-invalid={usernameInvalid}
        />
        {usernameInvalid && (
          <p className="mt-2 text-xs text-danger">
            Removemos caracteres não permitidos. Use só a-z, 0-9 e _.
          </p>
        )}
      </OnboardingStep>
    );
  }

  if (step === 'date') {
    return (
      <OnboardingStep
        variant="input"
        title="Que dia você nasceu?"
        nextDisabled={!form.birthDate}
        onNext={() => next('time')}
      >
        <Input
          autoFocus
          type="date"
          value={form.birthDate}
          onChange={(e) => update('birthDate', e.target.value)}
        />
      </OnboardingStep>
    );
  }

  if (step === 'time') {
    return (
      <OnboardingStep
        variant="input"
        title="E em que horário?"
        subtitle="A hora muda casas e ascendente. Se não souber, vamos focar no mapa diurno aproximado."
        nextDisabled={form.birthTimeKnown && !form.birthTime}
        onNext={() => next('city')}
      >
        <div className="flex flex-col gap-4">
          <Input
            type="time"
            value={form.birthTime}
            onChange={(e) => update('birthTime', e.target.value)}
            disabled={!form.birthTimeKnown}
            autoFocus={form.birthTimeKnown}
          />
          <label className="flex items-center gap-2 text-sm text-ink-2">
            <Checkbox
              checked={!form.birthTimeKnown}
              onCheckedChange={(v) => update('birthTimeKnown', !v)}
            />
            <span>Não sei meu horário exato</span>
          </label>
        </div>
      </OnboardingStep>
    );
  }

  if (step === 'city') {
    return (
      <OnboardingStep
        variant="input"
        title="Onde você nasceu?"
        subtitle="Beta fechado: cidades brasileiras. Mais lugares vêm em breve."
        onNext={() => next('consent')}
      >
        <select
          value={form.cityIdx}
          onChange={(e) => update('cityIdx', Number(e.target.value))}
          className="w-full bg-surface-1 text-ink h-12 px-4 rounded-sm font-serif text-base border border-border focus:outline-none focus:border-primary"
          autoFocus
        >
          {BR_CITIES.map((c, idx) => (
            <option key={`${c.city}-${c.state}`} value={idx}>
              {c.city} – {c.state}
            </option>
          ))}
        </select>
      </OnboardingStep>
    );
  }

  if (step === 'consent') {
    return (
      <OnboardingStep
        variant="input"
        title="Última coisa"
        subtitle="Pra criar seu perfil, precisamos do seu OK."
        nextDisabled={!form.lgpdAccept || pending}
        nextLabel={pending ? 'Gerando…' : 'Concluir'}
        onNext={submit}
      >
        <label className="flex items-start gap-3 text-sm text-ink-2 leading-relaxed">
          <Checkbox
            checked={form.lgpdAccept}
            onCheckedChange={(v) => update('lgpdAccept', !!v)}
            className="mt-1"
          />
          <span>
            Aceito os{' '}
            <Link href="/termos" className="text-primary underline">
              Termos
            </Link>{' '}
            e{' '}
            <Link href="/privacidade" className="text-primary underline">
              Política de Privacidade
            </Link>
            . Concordo que dados de nascimento sejam usados pra calcular o mapa.
          </span>
        </label>
        {error && <p className="text-sm text-danger mt-3">{error}</p>}
      </OnboardingStep>
    );
  }

  // step === 'generating'
  return (
    <OnboardingStep
      variant="animation"
      title="Lendo o céu da sua estreia…"
      subtitle="Pode levar alguns segundos."
    />
  );
}
