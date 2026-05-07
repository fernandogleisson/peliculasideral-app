---
version: alpha
name: Pelicula Sideral
description: Design system editorial cinematográfico para o app Pelicula Sideral. Astrologia contemplativa em PWA mobile-first.

colors:
  # Primary brand (roxo) — dark mode
  primary: '#7C5CBF'
  primary-light: '#9B7FD4'
  primary-dark: '#5A3F99'
  on-primary: '#FFFFFF'

  # Surfaces — dark
  surface: '#000000'
  surface-1: '#1A1A1A'
  surface-2: '#2A2A2A'
  surface-3: '#3A3A3A'

  # Ink — dark (6-digit equivalents of white-on-black with alpha)
  ink: '#FFFFFF'
  ink-2: '#B3B3B3' # white 70% on black
  ink-3: '#808080' # white 50% on black
  ink-muted: '#888888'
  ink-disabled: '#404040' # white 25% on black

  # Elementais (semantic — glifos, badges, mandala) — dark
  fogo: '#FF6B7A'
  fogo-light: '#FFA4AC'
  fogo-dark: '#A02029'
  terra: '#7AB071'
  terra-light: '#A7CFA0'
  terra-dark: '#3A5A3A'
  ar: '#FFD66E'
  ar-light: '#FFE6A1'
  ar-dark: '#B07F00'
  agua: '#5DA9CD'
  agua-light: '#92C5DC'
  agua-dark: '#04527E'

  # System semantics (reuso elementais)
  success: '{colors.terra}'
  warning: '{colors.ar}'
  danger: '{colors.fogo}'
  info: '{colors.agua}'

  # Borders + utilitários — dark (6-digit equivalents on black surface)
  border: '#1A1A1A' # white 10% on black ≈ surface-1
  border-strong: '#404040' # white 25% on black
  overlay: '#000000' # black overlay (use opacity in CSS)
  overlay-strong: '#000000' # black overlay strong (use opacity in CSS)

  # Light mode (acessível via prefix `light-` ou via CSS var swap)
  light-primary: '#3D2E8C'
  light-primary-light: '#5A46AC'
  light-primary-dark: '#2A1F66'
  light-surface: '#F0E4C8'
  light-surface-1: '#E8DCC0'
  light-surface-2: '#DFD3B6'
  light-surface-3: '#D6CAAD'
  light-ink: '#1A1A1A'
  light-ink-2: '#404040' # 75% black on cream parchment
  light-ink-3: '#737373' # 55% black on cream parchment
  light-fogo: '#C73848'
  light-terra: '#4A6B45'
  light-ar: '#B07F00'
  light-agua: '#04527E'

typography:
  display-lg:
    fontFamily: '"Playfair Display", Georgia, Cambria, serif'
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 1.05
    letterSpacing: -0.02em
  display-md:
    fontFamily: '"Playfair Display", Georgia, Cambria, serif'
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 1.10
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: '"Playfair Display", Georgia, Cambria, serif'
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 1.15
    letterSpacing: -0.01em
  headline-md:
    fontFamily: '"Playfair Display", Georgia, Cambria, serif'
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 1.20
    letterSpacing: 0em
  headline-sm:
    fontFamily: '"Playfair Display", Georgia, Cambria, serif'
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 1.30
    letterSpacing: 0em
  body-lg:
    fontFamily: '"Playfair Display", Georgia, Cambria, serif'
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 1.50
    letterSpacing: 0em
  body-md:
    fontFamily: '"Playfair Display", Georgia, Cambria, serif'
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 1.50
    letterSpacing: 0em
  body-sm:
    fontFamily: '"Playfair Display", Georgia, Cambria, serif'
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 1.45
    letterSpacing: 0em
  label-lg:
    fontFamily: '"JetBrains Mono", "SF Mono", Menlo, Consolas, monospace'
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 1.40
    letterSpacing: 0.15em
  label-md:
    fontFamily: '"JetBrains Mono", "SF Mono", Menlo, Consolas, monospace'
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 1.40
    letterSpacing: 0.20em
  label-sm:
    fontFamily: '"JetBrains Mono", "SF Mono", Menlo, Consolas, monospace'
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 1.40
    letterSpacing: 0.30em
  label-xs:
    fontFamily: '"JetBrains Mono", "SF Mono", Menlo, Consolas, monospace'
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 1.40
    letterSpacing: 0.40em
  numeric-display:
    fontFamily: '"JetBrains Mono", "SF Mono", Menlo, Consolas, monospace'
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 1.00
    letterSpacing: -0.02em

rounded:
  none: 0px
  xs: 2px
  sm: 4px
  DEFAULT: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px

spacing:
  unit: 8px
  '0.5x': 4px
  '1x': 8px
  '2x': 16px
  '3x': 24px
  '4x': 32px
  '5x': 40px
  '6x': 48px
  '8x': 64px
  '10x': 80px
  container-padding-mobile: 24px
  container-padding-tablet: 32px
  container-padding-desktop: 48px
  bottom-nav-height: 64px
  header-height: 56px

components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    typography: '{typography.label-lg}'
    rounded: '{rounded.DEFAULT}'
    height: 48px
    padding: 0 24px
  button-secondary:
    backgroundColor: transparent
    textColor: '{colors.primary}'
    typography: '{typography.label-lg}'
    rounded: '{rounded.DEFAULT}'
    height: 48px
    padding: 0 24px
  button-ghost:
    backgroundColor: transparent
    textColor: '{colors.ink}'
    typography: '{typography.label-lg}'
    rounded: '{rounded.DEFAULT}'
    height: 48px
    padding: 0 24px
  button-danger:
    backgroundColor: '{colors.danger}'
    textColor: '{colors.on-primary}'
    typography: '{typography.label-lg}'
    rounded: '{rounded.DEFAULT}'
    height: 48px
    padding: 0 24px
  input-default:
    backgroundColor: '{colors.surface-1}'
    textColor: '{colors.ink}'
    typography: '{typography.body-md}'
    rounded: '{rounded.sm}'
    height: 48px
    padding: 16px
  card-default:
    backgroundColor: '{colors.surface-1}'
    textColor: '{colors.ink}'
    rounded: '{rounded.md}'
    padding: 24px
  card-elevated:
    backgroundColor: '{colors.surface-2}'
    textColor: '{colors.ink}'
    rounded: '{rounded.lg}'
    padding: 24px
  modal-default:
    backgroundColor: '{colors.surface-3}'
    textColor: '{colors.ink}'
    rounded: '{rounded.lg}'
    padding: 32px
  bottom-nav:
    backgroundColor: '{colors.surface-1}'
    textColor: '{colors.ink-2}'
    typography: '{typography.label-md}'
    height: '{spacing.bottom-nav-height}'
  header-sticky:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    height: '{spacing.header-height}'
  element-badge-fogo:
    backgroundColor: '{colors.fogo}'
    textColor: '{colors.on-primary}'
    typography: '{typography.label-xs}'
    rounded: '{rounded.full}'
  element-badge-terra:
    backgroundColor: '{colors.terra}'
    textColor: '{colors.on-primary}'
    typography: '{typography.label-xs}'
    rounded: '{rounded.full}'
  element-badge-ar:
    backgroundColor: '{colors.ar}'
    textColor: '{colors.surface}'
    typography: '{typography.label-xs}'
    rounded: '{rounded.full}'
  element-badge-agua:
    backgroundColor: '{colors.agua}'
    textColor: '{colors.on-primary}'
    typography: '{typography.label-xs}'
    rounded: '{rounded.full}'
---

## Overview

**Pelicula é o filme do céu.**

A interface trata cada mapa, cada interpretação, cada conteúdo diário como cena de um filme autoral — letras grandes que respiram, créditos com letter-spacing largo, hierarquia clara entre título e corpo, escolhas tipográficas que evocam revistas culturais e capas de livros de poesia.

A astrologia aqui não é horóscopo de revista popular nem oráculo místico de Instagram. É observação contemplativa, próxima de quem lê Drummond e assiste Wim Wenders. Por isso: **menos ornamento, mais substância**. Mandalas claras e generosas, glifos clássicos sem estilização barroca, paleta restrita com roxo como protagonista e elementos como coadjuvantes.

### Filtro de decisão

Toda decisão visual passa pelo filtro: **"Isto soaria honesto na voz do Victor?"** Se for adornado demais, é ruído. Se for genérico demais, perde alma.

### Referências

Cinema autoral (Wim Wenders, Chantal Akerman) · revistas culturais (Piauí, The Believer) · capas de livros de poesia (Cosac Naify, Companhia das Letras) · tipografia editorial brasileira (Tipos do Acaso, Plau) · diários astrológicos antigos.

### Anti-referências

Co-Star (minimalismo frio brutalista). AstroFlash (popular, gradients, emojis). Sanctuary/Pattern (wellness Instagram). Material Design / Apple HIG genéricos. Glassmorphism, bubbly buttons, neumorfismo.

## Colors

A paleta é **deliberadamente restrita**. Roxo (#7C5CBF) é a marca; aparece em CTAs, links, focus states, ícones ativos. Surfaces dark (preto + grays) criam camadas via incremento de luminosidade. Inks (texto branco com opacidades validadas em WCAG) garantem legibilidade.

**Elementais** (fogo/terra/ar/água) são reservados pra **glifos astrológicos, badges de signos, segmentos da mandala, e variantes light/dark de cada elemento**. NUNCA aparecem em chrome de UI (botões, headers).

**System semantics reusam elementais**: success=terra (crescimento), warning=ar (atenção/movimento), danger=fogo (urgência), info=água (fluxo). Reduz cognitive load e cria coerência conceitual.

Light mode espelha dark com inversão suave: parchment cream (#F0E4C8) como surface, ink escuro, primary roxo mais saturado pra contraste.

## Typography

**Playfair Display** é a serif principal — display, headlines, body. Alto contraste, letterforms elegantes, leitura editorial. Carregada via `next/font/google` self-hosted pelo Vercel.

**JetBrains Mono** é a mono secundária — labels, créditos, números do mapa, código. Substitui Space Mono (mais técnica, melhor pra labels longos).

### Hierarquia

- **Display** (40-56px) só pra heroes. Tracking negativo (-0.02em) pra coesão visual.
- **Headlines** (20-32px) pra titles e cards. Tracking 0 a -0.01em.
- **Body** (14-18px) sempre tracking 0. Reading width 65ch pra prosa longa.
- **Labels mono** (10-14px) com letter-spacing wide (0.15em-0.40em). Look de capítulo de livro/cinema.

### Aplicação

Body em **serif** (Playfair Display) — diferente de Material/Apple. Pelicula é editorial: prosa lê como livro, não como app. Mono **só** em labels curtos, créditos, números.

Numeric display (mono 48px) pros graus do mapa ("24°"). Tracking -0.02em pra coesão com display headline.

## Layout

Mobile-first PWA. Container padding 24px mobile / 32px tablet / 48px desktop. Reading width 65ch em prosa.

Grid base: **8px**. Toda dimensão (padding, margin, gap, height) é múltiplo de 8.

Safe areas iOS via `env(safe-area-inset-*)` em BottomNav e Header. BottomNav 64px alto + safe-area-bottom.

Breakpoints: 0 (mobile-first), 768px (tablet — container alarga), 1024px (desktop — admin layouts; max-width body 720px pra leitura confortável).

## Elevation & Depth

**Cosmic depth.** Pelicula rejeita glassmorphism (atmospheric-glass-style) e rejeita material-design heavy shadows. Profundidade vem de **gradientes radiais sutis** e **bordas-luz 1px**.

### Camadas (dark)

- **0 — fundo cósmico:** preto puro com radial gradient sutilíssimo (centro #0A0A1A, bordas #000). Aplicado em `<body>`.
- **1 — surface:** #1A1A1A + border 1px white/10. Cards, list items.
- **2 — elevated:** #2A2A2A + border 1px white/15 + shadow 0 4px 16px black/40. Cards interativos hover, popups inline.
- **3 — modal/popup:** #3A3A3A + border 1px white/20 + shadow 0 12px 32px black/60 + backdrop overlay/70. Popup interpretação, modal Assinar.
- **4 — sheet bottom:** igual modal, slide from bottom + handle 32x4px.

### Bordas-luz (signature)

Cada surface acima de 0 ganha **1px border** simulando borda-luz cósmica. Não é glassmorphism — apenas linha fina pra delimitar planos sem usar shadow pesado.

## Shapes

Conservador. Pelicula é editorial, não friendly-saas-startup.

- **none** (0px): cantos retos pra créditos e separators
- **xs** (2px): badges pequenos
- **sm** (4px): inputs, chips
- **DEFAULT** (6px): buttons. **Decisão crítica:** não 12px (bubble). Editorial sóbrio, look Linear/Notion.
- **md** (8px): cards
- **lg** (12px): cards elevated, modais
- **xl** (16px): popups grandes, bottom sheets
- **full** (9999px): avatars, glifos circulares, dots

## Components

Catálogo de 32 components organizados em 8 grupos:

1. **Layout & Navigation** (5): Header, BottomNav, BackButton, PageHeader, Breadcrumb
2. **Forms & Inputs** (6): Button (5 variants), IconButton, Input, Textarea, Select, Checkbox/Radio
3. **Cards & Surfaces** (5): Card, ContentCard, InterpretationCard, Skeleton, Sheet
4. **Mapa Astral** (7): Mandala, MandalaSegment, PlanetGlyph, AspectGlyph, ElementBadge, HouseRing, MapMetadata
5. **Conteúdo** (4): HeroBanner, VideoPlayer, AudioPlayer, LessonList
6. **Feedback & Overlays** (5): Modal, Toast, PaywallOverlay, ConsentBanner, Tooltip
7. **Identidade** (3): Sparkle (✦), Avatar, Divider
8. **Specials Fase 1** (2): OnboardingStep, RateLimitMessage

Cada component declara variants e tokens-chave no YAML acima. Implementação completa via shadcn/ui base + customização Pelicula. Detalhamento por component no plan de implementação ([2026-05-06-pelicula-sideral-design-system-plan.md](docs/superpowers/plans/2026-05-06-pelicula-sideral-design-system-plan.md)).

## Do's and Don'ts

### Do

- Use `ink-2` ou `ink-3` em vez de `white/40` arbitrário
- Use `<Sparkle>` pra loading states, não spinners genéricos
- Letter-spacing wide só em mono labels curtos
- Glifos astrológicos via `<PlanetGlyph>`/`<AspectGlyph>`, nunca SVG inline
- Cores elementais em mandala/glifos/badges. NUNCA em UI chrome
- Border-luz 1px em vez de heavy shadow
- Reading width 65ch em prosa
- Mobile-first sempre
- Ícones via Lucide (`lucide-react`)

### Don't

- Não use opacidades arbitrárias (`white/40`, `black/30`)
- Não use cores fora da paleta (laranja, ciano-neon, verde-lima)
- Não use Tailwind utility cor cru (`text-red-500`)
- Não use glassmorphism
- Não use emojis em interpretações (☉🌙) — use SVG
- Não use letter-spacing em body/serif
- Não invente novos tokens sem atualizar DESIGN.md
- Não use `rounded-xl` ou `full` em buttons (são rounded DEFAULT 6px)
- Não use shadows pesadas (`shadow-2xl`)
- Não traduza glifos astrológicos (☉ é Sol em qualquer idioma)
