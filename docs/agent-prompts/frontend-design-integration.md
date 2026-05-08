# frontend-design skill + DESIGN.md integration

When invoking `superpowers:frontend-design` for work in `peliculasideral-app/`:

## Required argument template

    Skill arguments:
      spec: [task description]
      design-system: DESIGN.md (root of peliculasideral-app)
      constraints:
        - All visual tokens MUST come from DESIGN.md YAML frontmatter
        - Component catalog in §8 is the inventory — propose new components via PR comment, don't invent
        - Filosofia visual in §1 = "editorial cinematográfico" — no glassmorphism, no bubble buttons, no Material/Apple cliché
        - Reading width 65ch in long prose
        - Mobile-first PWA
        - Dark-first with light toggle

## Pre-flight check by skill

Before generating code, the skill should:

1. `cat DESIGN.md | head -200` — confirm tokens accessible
2. List components touched
3. For each: check if exists in §8 catalog
4. If not: STOP and propose addition via brainstorming skill

## Acceptable outputs

- TSX components using ONLY DESIGN.md tokens (via Tailwind classes mapped to @theme)
- Tests using `@testing-library/react` + Vitest
- Storybook stories (when Storybook is added — not yet, future)

## Unacceptable outputs

- Hardcoded hex colors
- Tailwind opacity utilities (`white/40`)
- Heavy shadows
- Glassmorphism
- Emojis in content
- New components not in §8 catalog (without proposal)
