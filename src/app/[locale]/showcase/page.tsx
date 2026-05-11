// /showcase — catálogo navegável de todos os components do Design System.
// Mock data hardcoded. Dados ilustrativos para validação visual.
'use client';

import { useState } from 'react';

import { Sparkle } from '@/components/identity/Sparkle';
import { Avatar } from '@/components/identity/Avatar';
import { Divider } from '@/components/identity/Divider';

import { ElementBadge } from '@/components/astro/ElementBadge';
import { PlanetGlyph } from '@/components/astro/glyphs/PlanetGlyph';
import { AspectGlyph } from '@/components/astro/glyphs/AspectGlyph';
import type { Planet } from '@/components/astro/glyphs/planet-paths';
import type { Aspect } from '@/components/astro/glyphs/aspect-paths';

import { Header } from '@/components/layout/Header';
import { BackButton } from '@/components/layout/BackButton';
import { PageHeader } from '@/components/layout/PageHeader';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Radio, RadioItem } from '@/components/ui/Radio';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/Sheet';
import { Modal } from '@/components/ui/Modal';
import { ToastProvider, toast } from '@/components/ui/Toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';

import { ContentCard } from '@/components/content/ContentCard';
import { HeroBanner } from '@/components/content/HeroBanner';
import { AudioPlayer } from '@/components/content/AudioPlayer';
import { LessonList } from '@/components/content/LessonList';

import { Mandala, type ChartData } from '@/components/mapa/Mandala';
import { MandalaSegment } from '@/components/mapa/MandalaSegment';
import { HouseRing } from '@/components/mapa/HouseRing';
import { MapMetadata } from '@/components/mapa/MapMetadata';
import { InterpretationCard } from '@/components/mapa/InterpretationCard';

import { PaywallOverlay } from '@/components/paywall/PaywallOverlay';
import { OnboardingStep } from '@/components/onboarding/OnboardingStep';
import { RateLimitMessage } from '@/components/feedback/RateLimitMessage';

import { Settings, Heart, Share2 } from 'lucide-react';

// Placeholder image as data URL: SVG gradient (purple → black) — no Next/Image remote allowlist needed.
const PLACEHOLDER_GRADIENT_PURPLE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7c5cbf"/>
          <stop offset="100%" stop-color="#000000"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#g)"/>
      <circle cx="600" cy="120" r="40" fill="#fff" opacity="0.18"/>
      <circle cx="200" cy="320" r="80" fill="#fff" opacity="0.10"/>
    </svg>`,
  );

const PLACEHOLDER_GRADIENT_AMBER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffd66e"/>
          <stop offset="100%" stop-color="#1a1a1a"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#g2)"/>
    </svg>`,
  );

const PLACEHOLDER_GRADIENT_TEAL =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5da9cd"/>
          <stop offset="100%" stop-color="#000000"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#g3)"/>
    </svg>`,
  );

const ALL_PLANETS: Planet[] = [
  'sun',
  'moon',
  'mercury',
  'venus',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'pluto',
  'north_node',
  'south_node',
  'chiron',
  'lilith',
];

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
  north_node: 'Nodo N',
  south_node: 'Nodo S',
  chiron: 'Quirão',
  lilith: 'Lilith',
};

const ALL_ASPECTS: Aspect[] = [
  'conjunction',
  'opposition',
  'trine',
  'square',
  'sextile',
  'semi_sextile',
  'semi_square',
  'sesquiquadrate',
  'quincunx',
];

const ASPECT_LABELS: Record<Aspect, string> = {
  conjunction: 'Conjunção',
  opposition: 'Oposição',
  trine: 'Trígono',
  square: 'Quadratura',
  sextile: 'Sextil',
  semi_sextile: 'Semi-sextil',
  semi_square: 'Semi-quadratura',
  sesquiquadrate: 'Sesqui-quadr.',
  quincunx: 'Quincunce',
};

const SECTIONS = [
  { id: 'identity', label: '01 Identity' },
  { id: 'glyphs', label: '02 Glyphs' },
  { id: 'layout', label: '03 Layout' },
  { id: 'forms', label: '04 Forms' },
  { id: 'cards', label: '05 Cards' },
  { id: 'mandala', label: '06 Mandala' },
  { id: 'conteudo', label: '07 Conteúdo' },
  { id: 'overlays', label: '08 Overlays' },
  { id: 'specials', label: '09 Specials F1' },
];

// Mock chart for Mandala
const MANDALA_CHART: ChartData = {
  planets: [
    { name: 'sun', sign: 'aquarius', house: 1, degree: 24 },
    { name: 'moon', sign: 'cancer', house: 6, degree: 12 },
  ],
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

const HERO_SLIDES = [
  {
    imageSrc: PLACEHOLDER_GRADIENT_PURPLE,
    title: 'Eclipse Lunar em Virgem',
    href: '#',
    meta: 'PELICULA DA SEMANA',
  },
  {
    imageSrc: PLACEHOLDER_GRADIENT_AMBER,
    title: 'Vênus em Áries: o desejo escancarado',
    href: '#',
    meta: 'CURSO NOVO',
  },
  {
    imageSrc: PLACEHOLDER_GRADIENT_TEAL,
    title: 'Mercúrio retrógrado em Peixes',
    href: '#',
    meta: 'NOTAS DA SEMANA',
  },
];

const AUDIO_TRACKS = [
  { src: '#', title: 'Áries — primeiro fogo', signSymbol: '♈' },
  { src: '#', title: 'Touro — sentido na pele', signSymbol: '♉' },
  { src: '#', title: 'Gêmeos — duas vozes', signSymbol: '♊' },
];

const LESSON_MODULES = [
  {
    id: 'm1',
    title: 'Módulo 1 — Os 4 elementos',
    lessons: [
      { id: 'l1', title: 'Aula 1 — O fogo das paixões', duration: '12:34', completed: true },
      { id: 'l2', title: 'Aula 2 — A terra que sustenta', duration: '15:02', completed: true },
      { id: 'l3', title: 'Aula 3 — O ar que circula', duration: '11:48' },
      { id: 'l4', title: 'Aula 4 — A água que sente', duration: '13:11', locked: true },
    ],
  },
  {
    id: 'm2',
    title: 'Módulo 2 — Os 12 signos',
    lessons: [
      { id: 'l5', title: 'Aula 1 — Áries', duration: '10:00', locked: true },
      { id: 'l6', title: 'Aula 2 — Touro', duration: '10:24', locked: true },
    ],
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-semibold tracking-[0.3em] text-ink-3 uppercase">
      {children}
    </p>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-mono text-base font-bold tracking-[0.3em] text-ink uppercase border-b border-border pb-3 mb-6"
    >
      {children}
    </h2>
  );
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 p-4 border border-border rounded-md bg-surface-1">
      <SectionLabel>{label}</SectionLabel>
      <div className="flex items-center justify-center min-h-[48px]">{children}</div>
    </div>
  );
}

export default function ShowcasePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <TooltipProvider>
      <ToastProvider />

      <main className="min-h-dvh bg-surface text-ink">
        {/* Header */}
        <header className="border-b border-border-strong px-6 py-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Sparkle size="lg" className="text-primary" />
            <p className="font-mono text-[11px] font-bold tracking-[0.4em] text-ink-3 uppercase">
              Pelicula Sideral · Design System
            </p>
          </div>
          <h1 className="font-serif text-5xl text-ink leading-tight">
            Catálogo visual dos 32 components.
          </h1>
          <p className="mt-3 font-serif text-base text-ink-2 max-w-2xl">
            Cada section abaixo lista os components disponíveis e suas variants. Mock data
            ilustrativo. Tokens via Tailwind v4 <code className="font-mono">@theme</code> em{' '}
            <code className="font-mono">design-tokens.css</code>.
          </p>
        </header>

        {/* Sumário */}
        <nav className="sticky top-0 z-10 backdrop-blur-md bg-surface/80 border-b border-border px-6 py-3 max-w-5xl mx-auto">
          <ul className="flex flex-wrap gap-3">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="font-mono text-[10px] font-bold tracking-[0.3em] text-ink-2 hover:text-primary uppercase"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-6 py-12 max-w-5xl mx-auto space-y-20">
          {/* 01 IDENTITY */}
          <section>
            <H2 id="identity">01 · Identity</H2>
            <div className="space-y-8">
              <div>
                <SectionLabel>Sparkle · 3 sizes</SectionLabel>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <Cell label="size sm">
                    <Sparkle size="sm" className="text-primary" />
                  </Cell>
                  <Cell label="size md">
                    <Sparkle size="md" className="text-primary" />
                  </Cell>
                  <Cell label="size lg · animated">
                    <Sparkle size="lg" animated className="text-primary" />
                  </Cell>
                </div>
              </div>

              <div>
                <SectionLabel>Avatar · 4 estados</SectionLabel>
                <div className="mt-3 grid grid-cols-4 gap-3">
                  <Cell label="initials">
                    <Avatar alt="Maria Silva" />
                  </Cell>
                  <Cell label="initials · sign aquarius">
                    <Avatar alt="Maria Silva" sign="aquarius" />
                  </Cell>
                  <Cell label="size 56 · sign leo">
                    <Avatar alt="Joana Souza" sign="leo" size={56} />
                  </Cell>
                  <Cell label="size 72 · sign cancer">
                    <Avatar alt="Pedro Mar" sign="cancer" size={72} />
                  </Cell>
                </div>
              </div>

              <div>
                <SectionLabel>Divider · 3 variants</SectionLabel>
                <div className="mt-3 space-y-6">
                  <Cell label="default">
                    <div className="w-full">
                      <Divider />
                    </div>
                  </Cell>
                  <Cell label="dotted">
                    <div className="w-full">
                      <Divider variant="dotted" />
                    </div>
                  </Cell>
                  <Cell label="with-glyph">
                    <div className="w-full">
                      <Divider variant="with-glyph" />
                    </div>
                  </Cell>
                </div>
              </div>
            </div>
          </section>

          {/* 02 GLYPHS */}
          <section>
            <H2 id="glyphs">02 · Glyphs</H2>

            <div className="space-y-8">
              <div>
                <SectionLabel>PlanetGlyph · 13 planetas + retrograde + uncertain</SectionLabel>
                <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {ALL_PLANETS.map((p) => (
                    <Cell key={p} label={PLANET_LABELS[p]}>
                      <PlanetGlyph planet={p} sign="aquarius" size={32} />
                    </Cell>
                  ))}
                  <Cell label="venus retrógrado">
                    <PlanetGlyph planet="venus" sign="aries" size={32} retrograde />
                  </Cell>
                  <Cell label="mercury uncertain">
                    <PlanetGlyph planet="mercury" sign="gemini" size={32} uncertain />
                  </Cell>
                </div>
              </div>

              <div>
                <SectionLabel>AspectGlyph · 9 aspects (major + minor)</SectionLabel>
                <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {ALL_ASPECTS.map((a) => (
                    <Cell key={a} label={ASPECT_LABELS[a]}>
                      <AspectGlyph aspect={a} size={28} />
                    </Cell>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>ElementBadge · 4 elementos</SectionLabel>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Cell label="fogo">
                    <ElementBadge element="fogo" />
                  </Cell>
                  <Cell label="terra">
                    <ElementBadge element="terra" />
                  </Cell>
                  <Cell label="ar">
                    <ElementBadge element="ar" />
                  </Cell>
                  <Cell label="agua">
                    <ElementBadge element="agua" />
                  </Cell>
                </div>
              </div>
            </div>
          </section>

          {/* 03 LAYOUT */}
          <section>
            <H2 id="layout">03 · Layout</H2>

            <div className="space-y-8">
              <div>
                <SectionLabel>Header · sticky / transparent</SectionLabel>
                <div className="mt-3 space-y-3">
                  <div className="border border-border rounded-md overflow-hidden">
                    <Header variant="sticky" className="!sticky-none !static">
                      <Sparkle className="text-primary mr-3" />
                      <span className="font-mono text-xs tracking-[0.2em] text-ink">
                        HEADER · STICKY
                      </span>
                    </Header>
                  </div>
                  <div className="border border-border rounded-md overflow-hidden bg-surface-2">
                    <Header variant="transparent" className="!sticky-none !static">
                      <Sparkle className="text-primary mr-3" />
                      <span className="font-mono text-xs tracking-[0.2em] text-ink">
                        HEADER · TRANSPARENT
                      </span>
                    </Header>
                  </div>
                </div>
              </div>

              <div>
                <SectionLabel>BottomNav · live preview</SectionLabel>
                <p className="mt-2 font-serif text-sm text-ink-3 italic">
                  BottomNav fica fixo no rodapé desta página. Note as 4 abas.
                </p>
              </div>

              <div>
                <SectionLabel>BackButton · 2 variants</SectionLabel>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Cell label="default · with label">
                    <BackButton variant="default" />
                  </Cell>
                  <Cell label="ghost · icon only">
                    <BackButton variant="ghost" showLabel={false} />
                  </Cell>
                </div>
              </div>

              <div>
                <SectionLabel>PageHeader · default + with-action</SectionLabel>
                <div className="mt-3 space-y-4">
                  <Card>
                    <PageHeader title="Mapa Natal" subtitle="Sua película sideral completa." />
                  </Card>
                  <Card>
                    <PageHeader
                      title="Cursos"
                      subtitle="Aulas de astrologia poética com Victor Dhornelas."
                      variant="with-action"
                      action={<Button variant="secondary">Ver todos</Button>}
                    />
                  </Card>
                </div>
              </div>

              <div>
                <SectionLabel>Breadcrumb</SectionLabel>
                <div className="mt-3">
                  <Cell label="3 níveis">
                    <Breadcrumb
                      items={[
                        { label: 'CURSOS', href: '#' },
                        { label: 'ASTROLOGIA POÉTICA', href: '#' },
                        { label: 'MÓDULO 1' },
                      ]}
                    />
                  </Cell>
                </div>
              </div>
            </div>
          </section>

          {/* 04 FORMS */}
          <section>
            <H2 id="forms">04 · Forms</H2>

            <div className="space-y-8">
              <div>
                <SectionLabel>Button · 5 variants</SectionLabel>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <Cell label="primary">
                    <Button variant="primary">Continuar</Button>
                  </Cell>
                  <Cell label="secondary">
                    <Button variant="secondary">Alterar</Button>
                  </Cell>
                  <Cell label="ghost">
                    <Button variant="ghost">Pular</Button>
                  </Cell>
                  <Cell label="danger">
                    <Button variant="danger">Excluir</Button>
                  </Cell>
                  <Cell label="link">
                    <Button variant="link">Saiba mais</Button>
                  </Cell>
                  <Cell label="disabled">
                    <Button variant="primary" disabled>
                      Indisponível
                    </Button>
                  </Cell>
                </div>
              </div>

              <div>
                <SectionLabel>IconButton · 2 variants</SectionLabel>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Cell label="default">
                    <IconButton aria-label="Configurações">
                      <Settings size={20} />
                    </IconButton>
                  </Cell>
                  <Cell label="ghost">
                    <IconButton aria-label="Curtir" variant="ghost">
                      <Heart size={20} />
                    </IconButton>
                  </Cell>
                </div>
              </div>

              <div>
                <SectionLabel>Input · default + error</SectionLabel>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Cell label="default">
                    <Input placeholder="seu@email.com" />
                  </Cell>
                  <Cell label="error">
                    <Input error placeholder="email inválido" defaultValue="errado" />
                  </Cell>
                </div>
              </div>

              <div>
                <SectionLabel>Textarea</SectionLabel>
                <div className="mt-3">
                  <Cell label="default">
                    <Textarea placeholder="Conte sua dúvida..." className="w-full" />
                  </Cell>
                </div>
              </div>

              <div>
                <SectionLabel>Select</SectionLabel>
                <div className="mt-3">
                  <Cell label="signs">
                    <Select>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Escolha um signo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aries">Áries</SelectItem>
                        <SelectItem value="taurus">Touro</SelectItem>
                        <SelectItem value="gemini">Gêmeos</SelectItem>
                        <SelectItem value="cancer">Câncer</SelectItem>
                      </SelectContent>
                    </Select>
                  </Cell>
                </div>
              </div>

              <div>
                <SectionLabel>Checkbox</SectionLabel>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Cell label="default">
                    <label className="flex items-center gap-2 text-ink">
                      <Checkbox /> Aceito os termos
                    </label>
                  </Cell>
                  <Cell label="checked">
                    <label className="flex items-center gap-2 text-ink">
                      <Checkbox checked /> Receber novidades
                    </label>
                  </Cell>
                </div>
              </div>

              <div>
                <SectionLabel>Radio</SectionLabel>
                <div className="mt-3">
                  <Cell label="3 options">
                    <Radio defaultValue="solar" className="w-full max-w-xs">
                      <label className="flex items-center gap-2 text-ink">
                        <RadioItem value="solar" /> Mapa solar
                      </label>
                      <label className="flex items-center gap-2 text-ink">
                        <RadioItem value="natal" /> Mapa natal completo
                      </label>
                      <label className="flex items-center gap-2 text-ink">
                        <RadioItem value="transit" /> Trânsitos do dia
                      </label>
                    </Radio>
                  </Cell>
                </div>
              </div>
            </div>
          </section>

          {/* 05 CARDS */}
          <section>
            <H2 id="cards">05 · Cards</H2>

            <div className="space-y-8">
              <div>
                <SectionLabel>Card · 3 variants</SectionLabel>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Card variant="default">
                    <SectionLabel>default</SectionLabel>
                    <p className="mt-2 font-serif text-base text-ink">
                      Conteúdo padrão. Surface-1 com border.
                    </p>
                  </Card>
                  <Card variant="elevated">
                    <SectionLabel>elevated</SectionLabel>
                    <p className="mt-2 font-serif text-base text-ink">
                      Surface-2 com shadow-md, rounded-lg.
                    </p>
                  </Card>
                  <Card variant="interactive">
                    <SectionLabel>interactive</SectionLabel>
                    <p className="mt-2 font-serif text-base text-ink">Hover muda surface.</p>
                  </Card>
                </div>
              </div>

              <div>
                <SectionLabel>ContentCard · 4 variants</SectionLabel>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ContentCard
                    variant="course"
                    href="#"
                    title="Astrologia Poética I — Os 4 elementos"
                    meta="CURSO · 12 AULAS"
                    description="Dos planetas aos elementos: a base de qualquer leitura."
                    imageSrc={PLACEHOLDER_GRADIENT_PURPLE}
                  />
                  <ContentCard
                    variant="article"
                    href="#"
                    title="O ascendente como porta de entrada"
                    meta="ARTIGO · 6 MIN"
                    description="A primeira coisa que o mundo vê. E o que você deixa ver."
                    imageSrc={PLACEHOLDER_GRADIENT_AMBER}
                  />
                  <ContentCard
                    variant="pelicula-do-dia"
                    href="#"
                    title="Mercúrio em Peixes — palavras que viram água"
                    meta="DA SEMANA"
                    description="Trânsito sutil, fala simbólica."
                    imageSrc={PLACEHOLDER_GRADIENT_TEAL}
                    aspectRatio="9:16"
                  />
                  <ContentCard
                    variant="pelicula-da-semana"
                    href="#"
                    title="Eclipse Lunar em Virgem"
                    meta="EVENTO ASTRAL"
                    description="O que a sombra mostra."
                    imageSrc={PLACEHOLDER_GRADIENT_PURPLE}
                  />
                </div>
              </div>

              <div>
                <SectionLabel>InterpretationCard · 3 variants</SectionLabel>
                <div className="mt-3 space-y-6">
                  <Card>
                    <InterpretationCard
                      variant="short"
                      title="Sol em Aquário · Casa 1"
                      shortText="Você se apresenta ao mundo com uma originalidade fria, lúcida. O ego veste capa de teórica."
                    />
                  </Card>
                  <Card>
                    <InterpretationCard
                      variant="long"
                      title="Lua em Câncer · Casa 6"
                      shortText="A casa nutre. O cuidado acontece pela rotina, pelos pequenos gestos diários."
                      longText="A Lua em Câncer na 6 ama através do trabalho, do que se serve à mesa, do que se cuida no corpo. Há um sentimentalismo no fazer; a tarefa vira ritual. A vulnerabilidade pede método."
                    />
                  </Card>
                  <Card>
                    <InterpretationCard
                      variant="paywall-locked"
                      title="Vênus em Áries · Casa 3"
                      shortText="Desejo escancarado. Comunicação que beija primeiro pra depois pensar."
                      paywallCta={<Button variant="primary">Assinar agora</Button>}
                    />
                  </Card>
                </div>
              </div>

              <div>
                <SectionLabel>Skeleton</SectionLabel>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <Cell label="text line">
                    <Skeleton className="h-4 w-full" />
                  </Cell>
                  <Cell label="card">
                    <Skeleton className="h-24 w-full" />
                  </Cell>
                  <Cell label="circle avatar">
                    <Skeleton className="h-12 w-12 rounded-full" />
                  </Cell>
                </div>
              </div>

              <div>
                <SectionLabel>Sheet (drawer)</SectionLabel>
                <div className="mt-3">
                  <Cell label="trigger drawer bottom">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="secondary">Abrir Sheet</Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Sobre este aspecto</SheetTitle>
                        </SheetHeader>
                        <div className="px-6 pb-6">
                          <p className="font-serif text-base text-ink-2">
                            Sheet é um drawer que sobe pelo bottom. Usa Vaul + tokens DESIGN.md.
                          </p>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </Cell>
                </div>
              </div>
            </div>
          </section>

          {/* 06 MANDALA */}
          <section>
            <H2 id="mandala">06 · Mandala</H2>

            <div className="space-y-8">
              <div>
                <SectionLabel>Mandala (full)</SectionLabel>
                <div className="mt-3 flex justify-center">
                  <Cell label="variant=full · 12 casas">
                    <div className="relative">
                      <Mandala chart={MANDALA_CHART} size={320} />
                      <svg
                        viewBox="0 0 400 400"
                        width={320}
                        height={320}
                        className="absolute inset-0 pointer-events-none"
                      >
                        {MANDALA_CHART.houses && <HouseRing houses={MANDALA_CHART.houses} />}
                      </svg>
                    </div>
                  </Cell>
                </div>
              </div>

              <div>
                <SectionLabel>MandalaSegment · 3 states</SectionLabel>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {(['default', 'highlighted', 'dimmed'] as const).map((v) => (
                    <Cell key={v} label={v}>
                      <svg viewBox="0 0 100 100" width={80} height={80}>
                        <MandalaSegment
                          element="fogo"
                          variant={v}
                          pathD="M50 50 L50 10 A40 40 0 0 1 88.3 30 Z"
                        />
                      </svg>
                    </Cell>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>HouseRing</SectionLabel>
                <div className="mt-3">
                  <Cell label="default 12 casas">
                    <svg viewBox="0 0 400 400" width={240} height={240}>
                      <circle
                        cx="200"
                        cy="200"
                        r="190"
                        fill="none"
                        stroke="var(--color-surface-2)"
                      />
                      <circle
                        cx="200"
                        cy="200"
                        r="120"
                        fill="none"
                        stroke="var(--color-surface-1)"
                      />
                      {MANDALA_CHART.houses && <HouseRing houses={MANDALA_CHART.houses} />}
                    </svg>
                  </Cell>
                </div>
              </div>

              <div>
                <SectionLabel>MapMetadata</SectionLabel>
                <div className="mt-3">
                  <MapMetadata
                    birthDate="1990-02-14"
                    birthTime="03:42"
                    birthCity="Belo Horizonte"
                    birthState="MG"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 07 CONTEÚDO */}
          <section>
            <H2 id="conteudo">07 · Conteúdo</H2>

            <div className="space-y-8">
              <div>
                <SectionLabel>HeroBanner · carousel · 3 slides · 10s</SectionLabel>
                <div className="mt-3">
                  <HeroBanner slides={HERO_SLIDES} />
                </div>
              </div>

              <div>
                <SectionLabel>AudioPlayer · 3 tracks com sign symbols</SectionLabel>
                <div className="mt-3">
                  <AudioPlayer tracks={AUDIO_TRACKS} />
                </div>
              </div>

              <div>
                <SectionLabel>LessonList · 2 modules · expansíveis</SectionLabel>
                <div className="mt-3">
                  <LessonList modules={LESSON_MODULES} />
                </div>
              </div>

              <div>
                <SectionLabel>VideoPlayer · placeholder</SectionLabel>
                <div className="mt-3">
                  <Card>
                    <Skeleton className="aspect-video w-full" />
                    <p className="mt-3 font-serif text-sm text-ink-3 italic">
                      VideoPlayer (Mux) — exige playbackId real para renderizar. Mostrando skeleton
                      no lugar.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* 08 OVERLAYS */}
          <section>
            <H2 id="overlays">08 · Overlays</H2>

            <div className="space-y-8">
              <div>
                <SectionLabel>Modal · trigger</SectionLabel>
                <div className="mt-3">
                  <Cell label="open dialog">
                    <Button variant="secondary" onClick={() => setModalOpen(true)}>
                      Abrir Modal
                    </Button>
                  </Cell>
                  <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="Sobre Pelicula Sideral"
                  >
                    <p className="font-serif text-base text-ink-2">
                      Modal default. Usa Base UI Dialog + tokens DESIGN.md.
                    </p>
                  </Modal>
                </div>
              </div>

              <div>
                <SectionLabel>Toast · triggers (Sonner)</SectionLabel>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Cell label="success">
                    <Button variant="secondary" onClick={() => toast.success('Mapa salvo')}>
                      Trigger
                    </Button>
                  </Cell>
                  <Cell label="warning">
                    <Button variant="secondary" onClick={() => toast.warning('Atenção')}>
                      Trigger
                    </Button>
                  </Cell>
                  <Cell label="error">
                    <Button variant="secondary" onClick={() => toast.error('Erro ao salvar')}>
                      Trigger
                    </Button>
                  </Cell>
                  <Cell label="info">
                    <Button variant="secondary" onClick={() => toast.info('Trânsito hoje')}>
                      Trigger
                    </Button>
                  </Cell>
                </div>
              </div>

              <div>
                <SectionLabel>PaywallOverlay · 3 variants</SectionLabel>
                <div className="mt-3 space-y-6">
                  <Card>
                    <SectionLabel>variant=default</SectionLabel>
                    <PaywallOverlay
                      variant="default"
                      benefits={[
                        '12 leituras por signo',
                        'Aulas com Victor Dhornelas',
                        'Pelicula da semana exclusiva',
                      ]}
                      socialProof="+ DE 800 ASSINANTES"
                      ctaHref="#"
                    />
                  </Card>
                  <Card>
                    <SectionLabel>variant=inline-card</SectionLabel>
                    <PaywallOverlay
                      variant="inline-card"
                      benefits={['Acesso completo', 'Cancela quando quiser']}
                      ctaHref="#"
                    />
                  </Card>
                  <Card>
                    <SectionLabel>variant=full-screen (preview inline)</SectionLabel>
                    <p className="font-serif text-sm text-ink-3 italic mb-3">
                      Em produção, fixed inset-0. Aqui mostro como inline-card pra não bloquear o
                      catálogo.
                    </p>
                    <PaywallOverlay
                      variant="inline-card"
                      benefits={['Variante full-screen na rota real']}
                      socialProof="DEMO"
                      ctaHref="#"
                    />
                  </Card>
                </div>
              </div>

              <div>
                <SectionLabel>ConsentBanner</SectionLabel>
                <div className="mt-3">
                  <Card>
                    <p className="font-serif text-sm text-ink-2">
                      ConsentBanner está montado no <code className="font-mono">LocaleLayout</code>.
                      Aparece na primeira visita até consentimento ser registrado em localStorage.
                    </p>
                  </Card>
                </div>
              </div>

              <div>
                <SectionLabel>Tooltip · 1 variant</SectionLabel>
                <div className="mt-3">
                  <Cell label="hover trigger">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <IconButton aria-label="Compartilhar">
                          <Share2 size={20} />
                        </IconButton>
                      </TooltipTrigger>
                      <TooltipContent>COMPARTILHAR</TooltipContent>
                    </Tooltip>
                  </Cell>
                </div>
              </div>
            </div>
          </section>

          {/* 09 SPECIALS F1 */}
          <section>
            <H2 id="specials">09 · Specials F1</H2>

            <div className="space-y-8">
              <div>
                <SectionLabel>OnboardingStep · variant=input</SectionLabel>
                <div className="mt-3 border border-border rounded-md overflow-hidden">
                  <div className="bg-surface">
                    <OnboardingStep
                      variant="input"
                      title="Qual seu nome?"
                      subtitle="A pessoa que apresenta a sua película sideral."
                    >
                      <Input placeholder="Maria Silva" />
                    </OnboardingStep>
                  </div>
                </div>
              </div>

              <div>
                <SectionLabel>OnboardingStep · variant=animation</SectionLabel>
                <div className="mt-3 border border-border rounded-md overflow-hidden">
                  <div className="bg-surface">
                    <OnboardingStep
                      variant="animation"
                      title="Calculando sua pelicula sideral..."
                      subtitle="Aguarde alguns segundos."
                      showBack={false}
                    />
                  </div>
                </div>
              </div>

              <div>
                <SectionLabel>RateLimitMessage · 2 cases</SectionLabel>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <RateLimitMessage retryAfterSeconds={3600 * 6} />
                  <RateLimitMessage retryAfterSeconds={3600 * 24 * 5} />
                </div>
              </div>
            </div>
          </section>

          <div className="pt-12 pb-32 text-center">
            <Sparkle size="lg" className="text-primary" />
            <p className="mt-3 font-mono text-[10px] font-bold tracking-[0.4em] text-ink-3 uppercase">
              FIM DO CATÁLOGO · 32 components
            </p>
          </div>
        </div>
      </main>
    </TooltipProvider>
  );
}
