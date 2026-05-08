# UI Task — Subagent Prompt Template

Use this template when dispatching a subagent for any UI/component work.

## Required preamble (paste verbatim at the top of any UI task prompt)

> **Before touching any TSX/CSS, you MUST:**
>
> 1. Read `DESIGN.md` in the repo root — it is the source of truth for the design system.
> 2. Use ONLY tokens declared in DESIGN.md. NEVER use:
>    - Tailwind cor utilities cruas (`text-red-500`, `bg-blue-500`)
>    - Opacidades arbitrárias (`white/40`, `black/30`) — use `ink-3`, `overlay`
>    - `rounded-xl` ou `rounded-full` em buttons (são `rounded` DEFAULT 6px)
>    - Heavy shadows (`shadow-2xl`) — use `border` 1px (cosmic-depth signature)
>    - Glassmorphism (`backdrop-blur` strong) — Pelicula é editorial sólido
>    - Emojis em interpretações ou conteúdo — use SVG components
> 3. Components catalogados em DESIGN.md §8 são fonte de verdade. NÃO invente novos componentes sem antes propor via PR comment.
> 4. Glifos astrológicos: usar `<PlanetGlyph>`, `<AspectGlyph>`, `<ElementBadge>`. NUNCA SVG inline.
> 5. Ícones (não-astrológicos): usar `lucide-react`. NUNCA SVG inline.
> 6. Letter-spacing wide (0.2em+) APENAS em mono labels. Body em serif sempre `tracking-0` a `tracking-[-0.02em]`.
> 7. Reading width 65ch em prosa longa.
> 8. Mobile-first sempre.
>
> Se precisar de algo não documentado, PARE e proponha via task report (DONE_WITH_CONCERNS).

## Task body

[Paste actual task description here. Reference specific components from DESIGN.md §8 by name when appropriate.]

## Verification before reporting DONE

Run all of:

    pnpm design:lint
    pnpm lint
    pnpm typecheck
    pnpm test

Confirm:

- No new arbitrary opacities
- No new SVG inline (used component or Lucide)
- All tokens used appear in DESIGN.md
- Reading width respected in prose
- Mobile breakpoint tested
