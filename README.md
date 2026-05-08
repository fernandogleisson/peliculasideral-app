This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Design System

Source of truth: [`DESIGN.md`](./DESIGN.md) na raiz do repo.

### Para humanos

- YAML frontmatter define tokens (cores, typography, rounded, spacing, components)
- Markdown body explica filosofia visual, do's and don'ts
- Mudanças via PR; CI valida via `@google/design.md lint`

### Para agentes IA

Subagents que tocam UI/CSS DEVEM seguir este protocolo:

1. **Antes de implementar:** ler `DESIGN.md` na raiz do repo
2. **Usar APENAS tokens declarados.** Nada de `text-red-500`, `white/40`, `rounded-xl` em buttons
3. **Components em §8 são fonte de verdade** — não inventar novos sem atualizar DESIGN.md
4. **Glifos astrológicos via `<PlanetGlyph>` / `<AspectGlyph>` / `<ElementBadge>`**, nunca SVG inline
5. **Ícones via Lucide** (`lucide-react`), nunca SVG inline
6. **Reading width 65ch** em prosa longa
7. **Mobile-first sempre**

Se precisar de algo não documentado, **pause e proponha** via comentário no PR.

### Comandos

    pnpm design:lint    # Valida DESIGN.md (broken-ref, contrast-ratio, missing-primary)
    pnpm design:export  # Gera src/app/design-tokens.css (Tailwind v4 @theme block)
    pnpm design:diff    # Compara com versão anterior (para PRs grandes)
