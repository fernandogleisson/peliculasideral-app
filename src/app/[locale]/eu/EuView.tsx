'use client';

import { Settings, Share2 } from 'lucide-react';

import { Avatar } from '@/components/identity/Avatar';
import { Divider } from '@/components/identity/Divider';
import { Sparkle } from '@/components/identity/Sparkle';
import { ElementBadge } from '@/components/astro/ElementBadge';
import { PlanetGlyph } from '@/components/astro/glyphs/PlanetGlyph';
import { AspectGlyph } from '@/components/astro/glyphs/AspectGlyph';
import { SIGN_TO_ELEMENT } from '@/components/astro/ElementColors';
import type { Planet } from '@/components/astro/glyphs/planet-paths';
import type { Sign } from '@/components/astro/ElementColors';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Card } from '@/components/ui/Card';
import { Mandala, type ChartData } from '@/components/mapa/Mandala';
import { HouseRing } from '@/components/mapa/HouseRing';
import { MapMetadata } from '@/components/mapa/MapMetadata';
import { InterpretationCard } from '@/components/mapa/InterpretationCard';
import type { Aspect } from '@/components/astro/glyphs/aspect-paths';
import type { PlanetGroups, PlanetEntry } from '@/features/mapa-natal/transforms';

const SIGN_LABELS_PT: Record<Sign, string> = {
  aries: 'Áries',
  taurus: 'Touro',
  gemini: 'Gêmeos',
  cancer: 'Câncer',
  leo: 'Leão',
  virgo: 'Virgem',
  libra: 'Libra',
  scorpio: 'Escorpião',
  sagittarius: 'Sagitário',
  capricorn: 'Capricórnio',
  aquarius: 'Aquário',
  pisces: 'Peixes',
};

const PLANET_LABELS: Record<Planet, string> = {
  sun: 'Sol',
  moon: 'Lua',
  mercury: 'Mercúrio',
  venus: 'Vênus',
  mars: 'Marte',
  jupiter: 'Júpiter',
  saturn: 'Saturno',
  uranus: 'Urano',
  neptune: 'Netuno',
  pluto: 'Plutão',
  north_node: 'Nodo Norte',
  chiron: 'Quirão',
  lilith: 'Lilith',
  south_node: 'Nodo Sul',
};

export interface ShortInterp {
  type: string;
  key: string;
  shortText: string;
}

export interface EuViewProps {
  displayName: string;
  username: string;
  birthDate: string;
  birthTime: string | null;
  birthCity: string;
  birthState?: string;
  isPremium: boolean;
  sunSummary: { sign: Sign; house: number; degree: number } | null;
  groups: PlanetGroups;
  chartData: ChartData;
  houseCards: Array<{ house: number; sign: Sign; degree: number; summary?: string }>;
  aspectCards: Array<{
    from: Planet;
    fromSign: Sign;
    to: Planet;
    toSign: Sign;
    aspect: Aspect;
    label: string;
    summary?: string;
  }>;
  paywallSample: ShortInterp | null;
}

function PlanetRow({ entry }: { entry: PlanetEntry }) {
  return (
    <li className="flex items-center gap-3 py-3 border-b border-border last:border-0">
      <PlanetGlyph
        planet={entry.planet}
        sign={entry.sign}
        retrograde={entry.retrograde}
        size={28}
      />
      <div className="flex-1 min-w-0">
        <p className="font-serif text-base text-ink leading-tight">
          {PLANET_LABELS[entry.planet]} em {SIGN_LABELS_PT[entry.sign]}
          {entry.retrograde && (
            <span className="ml-2 font-mono text-[10px] tracking-[0.3em] text-warning uppercase">
              · retrógrado
            </span>
          )}
        </p>
        <p className="font-mono text-[11px] tracking-[0.2em] text-ink-3 uppercase mt-0.5">
          Casa {entry.house} · {entry.degree}°
        </p>
      </div>
    </li>
  );
}

function PlanetGroupCard({ label, planets }: { label: string; planets: PlanetEntry[] }) {
  if (planets.length === 0) return null;
  return (
    <Card>
      <p className="font-mono text-[11px] font-bold tracking-[0.3em] text-ink-3 uppercase mb-2">
        {label}
      </p>
      <ul>
        {planets.map((p) => (
          <PlanetRow key={p.planet} entry={p} />
        ))}
      </ul>
    </Card>
  );
}

function HouseCard({
  house,
  sign,
  degree,
  summary,
}: {
  house: number;
  sign: Sign;
  degree: number;
  summary?: string;
}) {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <span className="font-mono text-3xl font-bold text-primary leading-none">{house}</span>
        <div className="flex-1">
          <p className="font-serif text-xl text-ink leading-tight">
            Casa {house} · {SIGN_LABELS_PT[sign]} {degree}°
          </p>
          {summary && (
            <p className="mt-2 font-serif text-base text-ink-2 leading-relaxed">{summary}</p>
          )}
        </div>
      </div>
    </Card>
  );
}

function AspectCard({
  from,
  fromSign,
  to,
  toSign,
  aspect,
  label,
  summary,
}: EuViewProps['aspectCards'][number]) {
  return (
    <Card>
      <div className="flex items-center gap-3 mb-3">
        <PlanetGlyph planet={from} sign={fromSign} size={24} />
        <AspectGlyph aspect={aspect} size={20} />
        <PlanetGlyph planet={to} sign={toSign} size={24} />
        <p className="font-mono text-[11px] font-bold tracking-[0.3em] text-ink-3 uppercase ml-auto">
          {label}
        </p>
      </div>
      {summary && <p className="font-serif text-base text-ink-2 leading-relaxed">{summary}</p>}
    </Card>
  );
}

export function EuView(props: EuViewProps) {
  const {
    displayName,
    username,
    birthDate,
    birthTime,
    birthCity,
    birthState,
    isPremium,
    sunSummary,
    groups,
    chartData,
    houseCards,
    aspectCards,
    paywallSample,
  } = props;

  const sunElement = sunSummary ? SIGN_TO_ELEMENT[sunSummary.sign] : null;

  return (
    <>
      <main className="min-h-dvh bg-surface text-ink pb-24">
        <Header>
          <Sparkle className="text-primary mr-3" />
          <span className="font-mono text-xs tracking-[0.3em] text-ink uppercase font-bold">
            EU
          </span>
          <IconButton aria-label="Minha conta" variant="ghost" className="ml-auto">
            <Settings size={20} />
          </IconButton>
        </Header>

        <div className="px-6 py-6 max-w-md mx-auto space-y-6">
          <section className="flex items-center gap-4">
            <Avatar alt={displayName} sign={sunSummary?.sign ?? 'aquarius'} size={64} />
            <div className="flex-1 min-w-0">
              <h1 className="font-serif text-2xl text-ink leading-tight">{displayName}</h1>
              <p className="font-mono text-[11px] tracking-[0.2em] text-ink-3 uppercase">
                @{username}
              </p>
              {sunSummary && sunElement && (
                <div className="mt-2 flex items-center gap-2">
                  <ElementBadge element={sunElement} />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ink-2 uppercase">
                    {SIGN_LABELS_PT[sunSummary.sign]} · Casa {sunSummary.house} ·{' '}
                    {sunSummary.degree}°
                  </span>
                </div>
              )}
            </div>
          </section>

          <MapMetadata
            birthDate={birthDate}
            birthTime={birthTime ?? '—'}
            birthCity={birthCity}
            birthState={birthState ?? ''}
          />

          <Button variant="secondary" className="w-full">
            <Share2 size={16} />
            Compartilhar mapa
          </Button>

          <section className="flex justify-center">
            <div className="relative">
              <Mandala chart={chartData} size={320} />
              <svg
                viewBox="0 0 400 400"
                width={320}
                height={320}
                className="absolute inset-0 pointer-events-none"
              >
                {chartData.houses && <HouseRing houses={chartData.houses} />}
              </svg>
            </div>
          </section>

          <Divider variant="with-glyph" />

          <div className="space-y-4">
            <h2 className="font-mono text-[11px] font-bold tracking-[0.3em] text-ink-3 uppercase">
              Planetas
            </h2>
            <PlanetGroupCard label="Luminares" planets={groups.luminaries} />
            <PlanetGroupCard label="Pessoais" planets={groups.personal} />
            <PlanetGroupCard label="Sociais" planets={groups.social} />
            <PlanetGroupCard label="Transpessoais" planets={groups.transpersonal} />
            <PlanetGroupCard label="Asteroides" planets={groups.asteroids} />
          </div>

          {houseCards.length > 0 && (
            <>
              <Divider variant="with-glyph" />
              <div className="space-y-4">
                <h2 className="font-mono text-[11px] font-bold tracking-[0.3em] text-ink-3 uppercase">
                  Casas
                </h2>
                {houseCards.map((h) => (
                  <HouseCard key={h.house} {...h} />
                ))}
              </div>
            </>
          )}

          {aspectCards.length > 0 && (
            <>
              <Divider variant="with-glyph" />
              <div className="space-y-4">
                <h2 className="font-mono text-[11px] font-bold tracking-[0.3em] text-ink-3 uppercase">
                  Aspectos
                </h2>
                {aspectCards.map((a) => (
                  <AspectCard key={a.label} {...a} />
                ))}
              </div>
            </>
          )}

          {paywallSample && (
            <>
              <Divider variant="with-glyph" />
              <div className="space-y-4">
                <h2 className="font-mono text-[11px] font-bold tracking-[0.3em] text-ink-3 uppercase">
                  Leitura completa
                </h2>
                <Card>
                  <InterpretationCard
                    variant={isPremium ? 'short' : 'paywall-locked'}
                    title={paywallSample.key.replaceAll(':', ' · ')}
                    shortText={paywallSample.shortText}
                    paywallCta={
                      isPremium ? undefined : <Button variant="primary">Assinar agora</Button>
                    }
                  />
                </Card>
              </div>
            </>
          )}
        </div>
      </main>

      <BottomNav />
    </>
  );
}
