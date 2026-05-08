'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { OnboardingStep } from '@/components/onboarding/OnboardingStep';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { BR_CITIES, type CityEntry } from './cities-br';
import { submitOnboarding, type OnboardingInput } from './actions';

type Step = 'name' | 'username' | 'date' | 'time' | 'city' | 'consent' | 'generating';

interface FormState {
  displayName: string;
  username: string;
  birthDate: string;
  birthTime: string;
  birthTimeKnown: boolean;
  cityIdx: number;
  lgpdAccept: boolean;
}

const INITIAL: FormState = {
  displayName: '',
  username: '',
  birthDate: '',
  birthTime: '',
  birthTimeKnown: true,
  cityIdx: 0,
  lgpdAccept: false,
};

export function OnboardingClient() {
  const [step, setStep] = useState<Step>('name');
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
    return (
      <OnboardingStep
        variant="input"
        title="Escolhe um @"
        subtitle="Único e curto. Só letras, números e _."
        nextDisabled={form.username.trim().length < 3}
        onNext={() => next('date')}
      >
        <Input
          autoFocus
          value={form.username}
          onChange={(e) => update('username', e.target.value.toLowerCase())}
          placeholder="maria"
          pattern="[a-z0-9_]+"
        />
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
