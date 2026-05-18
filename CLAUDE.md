# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing landing page for **Tercer tiempo Ubaté**, a synthetic football pitch business in Ubaté, Colombia. Single-page Next.js site with Spanish copy and WhatsApp/email CTAs (no backend, no forms — all conversions go through `wa.me` deep links and `mailto:`).

## Commands

```bash
npm run dev      # Next dev server with Turbopack on http://localhost:3000
npm run build    # Production build (also runs lint + typecheck)
npm run start    # Serve the production build
npm run lint     # Next/ESLint (next/core-web-vitals + next/typescript)
```

There are no tests in this repo. `npm run build` is the closest thing to a verification gate — it lints and typechecks.

## Stack

- **Next.js 15.2.1** App Router, **React 19**, **TypeScript** (strict). Dev uses Turbopack (`next dev --turbopack`).
- **Tailwind CSS v4** — note: there is **no `tailwind.config.*`**. Theme tokens are declared inline in `src/app/globals.css` via `@import "tailwindcss"` + `@theme inline { ... }`. PostCSS plugin is `@tailwindcss/postcss`. When changing colors/spacing/radius, edit `globals.css`, not a config file.
- **shadcn/ui** (style: `new-york`, baseColor: `neutral`, CSS variables on) configured in `components.json`. Primitives live in `src/components/ui/`. Add new components with `npx shadcn@latest add <name>` — it will respect the aliases below.
- **Radix UI** primitives (accordion, dialog, navigation-menu, slot) underlie the shadcn components.
- **lucide-react** for icons (set as `iconLibrary` in `components.json`).
- `tailwind-merge` + `clsx` via the `cn()` helper in `src/lib/utils.ts` — use it whenever composing class names conditionally.

## Architecture

The page is composed of **section components** assembled in `src/app/page.tsx`. Each section is independent and reads from a single source of truth.

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata, lang="es"
│   ├── page.tsx            # Composes Header + sections + Footer
│   ├── globals.css         # Tailwind v4 theme + design tokens
│   └── imgs/               # Static image assets (imported as ES modules)
├── components/
│   ├── sections/           # One file per landing section
│   │   ├── header.tsx      # Sticky nav (desktop + mobile Sheet)
│   │   ├── hero.tsx        # #about
│   │   ├── pricing.tsx     # #services — renders from `plans` config
│   │   ├── features.tsx    # #features — features list inlined here
│   │   ├── testimonials.tsx# #testimonials — renders from `testimonials` config
│   │   ├── cta.tsx         # #contact
│   │   └── footer.tsx
│   └── ui/                 # shadcn primitives
├── hooks/
│   └── use-section-navigation.ts  # Smooth-scroll + active-link state
└── lib/
    ├── site-config.ts      # Single source of truth: phone, email, socials, nav, plans, testimonials
    ├── images.ts           # Centralized image imports
    └── utils.ts            # `cn()` helper
```

### Key conventions

- **Editing copy or contact info**: change `src/lib/site-config.ts`. WhatsApp number, email, social URLs, plan prices/copy, testimonials, and nav labels all live there. There are no hardcoded `wa.me` URLs in components.
- **WhatsApp links**: use `whatsappUrl(message)` from `site-config.ts` — it handles URL encoding correctly. Don't write `https://wa.me/...?text=...` literals.
- **Nav links**: the desktop nav and mobile `Sheet` are rendered from a single `navLinks` array in `site-config.ts`. Adding a new section is a one-line addition there — but you still need to render the section in `page.tsx` and use the matching `id`.
- **Active-section highlight**: lives in `useSectionNavigation()`. It tracks the last *clicked* link and the URL hash on mount — it does **not** observe scroll position. If you want true scroll-spy behavior, swap in an `IntersectionObserver`.
- **Images**: import via `@/lib/images` (`images.logo`, `images.fondo`, etc.) instead of importing directly from `@/app/imgs/...`. Keeps asset paths in one place. Filenames are kebab-case — keep them that way.
- **External links**: always include `target="_blank" rel="noopener noreferrer"` together. The `whatsappUrl()` helper assumes its result is opened in a new tab.
- **`"use client"`**: only `header.tsx`, `footer.tsx`, and `use-section-navigation.ts` are client components (they need DOM access for smooth scroll). Sections without interactivity stay server components.

## Path aliases

`tsconfig.json` and `components.json` agree on:

- `@/*` → `./src/*`
- `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`

## Git workflow

The default branch is `main`. Recent history shows feature work merged via PRs from a `dev` branch on the `gomez2608` fork. Keep that pattern (PR from a branch into `main`) rather than pushing directly.
