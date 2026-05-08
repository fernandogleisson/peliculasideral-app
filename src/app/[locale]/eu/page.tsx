// /eu — Tela do mapa natal (mock visual). Hardcoded data para validação UX.
// Quando F1 implementar dados reais, este page vira um RSC consumindo o mapa do user.
'use client';

import { Settings, Share2 } from 'lucide-react';

import { Avatar } from '@/components/identity/Avatar';
import { Divider } from '@/components/identity/Divider';
import { Sparkle } from '@/components/identity/Sparkle';
import { ElementBadge } from '@/components/astro/ElementBadge';
import { PlanetGlyph } from '@/components/astro/glyphs/PlanetGlyph';
import { AspectGlyph } from '@/components/astro/glyphs/AspectGlyph';
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

// ─────────────────────────────────────────────────────────────────────────────
// Mock chart data — Maria Silva, 14/02/1990, 03:42, Belo Horizonte/MG
// ─────────────────────────────────────────────────────────────────────────────

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

interface PlanetEntry {
  planet: Planet;
  sign: Sign;
  house: number;
  degree: number;
  retrograde?: boolean;
}

const LUMINARIES: PlanetEntry[] = [
  { planet: 'sun', sign: 'aquarius', house: 1, degree: 24 },
  { planet: 'moon', sign: 'cancer', house: 6, degree: 12 },
];

const PERSONAL: PlanetEntry[] = [
  { planet: 'mercury', sign: 'aquarius', house: 1, degree: 18 },
  { planet: 'venus', sign: 'aries', house: 3, degree: 9, retrograde: true },
  { planet: 'mars', sign: 'sagittarius', house: 11, degree: 22 },
];

const SOCIAL: PlanetEntry[] = [
  { planet: 'jupiter', sign: 'cancer', house: 6, degree: 4 },
  { planet: 'saturn', sign: 'capricorn', house: 12, degree: 16 },
];

const TRANSPERSONAL: PlanetEntry[] = [
  { planet: 'uranus', sign: 'capricorn', house: 12, degree: 8 },
  { planet: 'neptune', sign: 'capricorn', house: 12, degree: 14 },
  { planet: 'pluto', sign: 'scorpio', house: 9, degree: 17 },
];

const ASTEROIDS: PlanetEntry[] = [
  { planet: 'north_node', sign: 'aquarius', house: 1, degree: 4 },
  { planet: 'chiron', sign: 'cancer', house: 6, degree: 11 },
  { planet: 'lilith', sign: 'pisces', house: 2, degree: 20 },
];

const HOUSE_CARDS = [
  {
    house: 1,
    sign: 'aquarius' as Sign,
    degree: 14,
    summary:
      'Você se apresenta ao mundo com uma originalidade fria, lúcida. O ego veste capa de teórica.',
  },
  {
    house: 6,
    sign: 'cancer' as Sign,
    degree: 12,
    summary:
      'A casa nutre. Trabalho diário e cuidado caminham juntos — método com afeto, rotina com sentimento.',
  },
  {
    house: 11,
    sign: 'sagittarius' as Sign,
    degree: 22,
    summary:
      'Os amigos chegam de longe. Causas, viagens, projetos coletivos. Há uma tribo que pulsa.',
  },
];

const ASPECT_CARDS = [
  {
    from: 'sun' as Planet,
    fromSign: 'aquarius' as Sign,
    to: 'mars' as Planet,
    toSign: 'sagittarius' as Sign,
    aspect: 'trine' as const,
    label: 'Sol trígono Marte',
    summary: 'Vontade e expressão alinhadas. A ação flui com naturalidade.',
  },
  {
    from: 'sun' as Planet,
    fromSign: 'aquarius' as Sign,
    to: 'saturn' as Planet,
    toSign: 'capricorn' as Sign,
    aspect: 'square' as const,
    label: 'Sol quadratura Saturno',
    summary: 'O ego encontra paredes — convite à disciplina e à autoridade interna.',
  },
];

// Chart data para Mandala
const CHART_DATA: ChartData = {
  planets: [...LUMINARIES, ...PERSONAL, ...SOCIAL, ...TRANSPERSONAL].map((p) => ({
    name: p.planet,
    sign: p.sign,
    house: p.house,
    degree: p.degree,
    isRetrograde: p.retrograde,
  })),
  houses: Array.from({ length: 12 }, (_, i) => ({
    number: i + 1,
    sign: (
      [
        'aquarius',
        'pisces',
        'aries',
        'taurus',
        'gemini',
        'cancer',
        'leo',
        'virgo',
        'libra',
        'scorpio',
        'sagittarius',
        'capricorn',
      ] as const
    )[i],
    cuspDegree: i * 30,
  })),
};

// ─────────────────────────────────────────────────────────────────────────────
// Componentes locais
// ─────────────────────────────────────────────────────────────────────────────

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

function PlanetGroup({ label, planets }: { label: string; planets: PlanetEntry[] }) {
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
  summary: string;
}) {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <span className="font-mono text-3xl font-bold text-primary leading-none">{house}</span>
        <div className="flex-1">
          <p className="font-serif text-xl text-ink leading-tight">
            Casa {house} · {SIGN_LABELS_PT[sign]} {degree}°
          </p>
          <p className="mt-2 font-serif text-base text-ink-2 leading-relaxed">{summary}</p>
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
}: (typeof ASPECT_CARDS)[number]) {
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
      <p className="font-serif text-base text-ink-2 leading-relaxed">{summary}</p>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function EuPage() {
  return (
    <>
      <main className="min-h-dvh bg-surface text-ink pb-24">
        {/* Header */}
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
          {/* Avatar + Identidade */}
          <section className="flex items-center gap-4">
            <Avatar alt="Maria Silva" sign="aquarius" size={64} />
            <div className="flex-1 min-w-0">
              <h1 className="font-serif text-2xl text-ink leading-tight">Maria Silva</h1>
              <p className="font-mono text-[11px] tracking-[0.2em] text-ink-3 uppercase">@maria</p>
              <div className="mt-2 flex items-center gap-2">
                <ElementBadge element="ar" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-ink-2 uppercase">
                  Aquário · Casa 1 · 24°
                </span>
              </div>
            </div>
          </section>

          {/* Birth metadata */}
          <MapMetadata
            birthDate="1990-02-14"
            birthTime="03:42"
            birthCity="Belo Horizonte"
            birthState="MG"
          />

          {/* Compartilhar */}
          <Button variant="secondary" className="w-full">
            <Share2 size={16} />
            Compartilhar mapa
          </Button>

          {/* Tabs (visual only) */}
          <div role="tablist" className="flex border-b border-border">
            <button
              type="button"
              role="tab"
              aria-selected="true"
              className="flex-1 py-3 font-mono text-xs font-bold tracking-[0.3em] text-primary uppercase border-b-2 border-primary"
            >
              Mandala
            </button>
            <button
              type="button"
              role="tab"
              aria-selected="false"
              className="flex-1 py-3 font-mono text-xs font-bold tracking-[0.3em] text-ink-3 uppercase"
            >
              Tabela
            </button>
          </div>

          {/* Mandala */}
          <section className="flex justify-center">
            <div className="relative">
              <Mandala chart={CHART_DATA} size={320} />
              <svg
                viewBox="0 0 400 400"
                width={320}
                height={320}
                className="absolute inset-0 pointer-events-none"
              >
                {CHART_DATA.houses && <HouseRing houses={CHART_DATA.houses} />}
                {/* Mock planet positions */}
                <g>
                  <circle cx="200" cy="50" r="14" fill="var(--color-surface-1)" />
                  <circle cx="320" cy="280" r="14" fill="var(--color-surface-1)" />
                  <circle cx="80" cy="280" r="14" fill="var(--color-surface-1)" />
                </g>
              </svg>
            </div>
          </section>

          <Divider variant="with-glyph" />

          {/* Planet groups */}
          <div className="space-y-4">
            <h2 className="font-mono text-[11px] font-bold tracking-[0.3em] text-ink-3 uppercase">
              Planetas
            </h2>
            <PlanetGroup label="Luminares" planets={LUMINARIES} />
            <PlanetGroup label="Pessoais" planets={PERSONAL} />
            <PlanetGroup label="Sociais" planets={SOCIAL} />
            <PlanetGroup label="Transpessoais" planets={TRANSPERSONAL} />
            <PlanetGroup label="Asteroides" planets={ASTEROIDS} />
          </div>

          <Divider variant="with-glyph" />

          {/* Houses */}
          <div className="space-y-4">
            <h2 className="font-mono text-[11px] font-bold tracking-[0.3em] text-ink-3 uppercase">
              Casas
            </h2>
            {HOUSE_CARDS.map((h) => (
              <HouseCard key={h.house} {...h} />
            ))}
          </div>

          <Divider variant="with-glyph" />

          {/* Aspects */}
          <div className="space-y-4">
            <h2 className="font-mono text-[11px] font-bold tracking-[0.3em] text-ink-3 uppercase">
              Aspectos
            </h2>
            {ASPECT_CARDS.map((a) => (
              <AspectCard key={a.label} {...a} />
            ))}
          </div>

          <Divider variant="with-glyph" />

          {/* Interpretation paywall */}
          <div className="space-y-4">
            <h2 className="font-mono text-[11px] font-bold tracking-[0.3em] text-ink-3 uppercase">
              Leitura completa
            </h2>
            <Card>
              <InterpretationCard
                variant="paywall-locked"
                title="Sol em Aquário · Casa 1"
                shortText="Você se apresenta ao mundo com uma originalidade fria, lúcida. O ego veste capa de teórica — mas o brilho é real."
                paywallCta={<Button variant="primary">Assinar agora</Button>}
              />
            </Card>
          </div>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
