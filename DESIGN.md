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
