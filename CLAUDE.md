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
- **Tailwind CSS v4** — no `tailwind.config.*`. Design tokens (`--color-ink`, `--color-lime`, `--color-surface`, etc.) live in `src/app/globals.css` under `@theme inline`. shadcn primitives consume those via aliases (`--color-primary` → `--color-lime`, etc.) so you don't need to override components — change the token.
- **shadcn/ui** (style: `new-york`, baseColor: `neutral`, CSS variables on) configured in `components.json`. Primitives live in `src/components/ui/`. Add new components with `npx shadcn@latest add <name>` — it will respect the aliases below.
- **Radix UI** primitives (accordion, dialog, navigation-menu, slot) underlie the shadcn components.
- **lucide-react** for icons (set as `iconLibrary` in `components.json`).
- `tailwind-merge` + `clsx` via the `cn()` helper in `src/lib/utils.ts` — use it whenever composing class names conditionally.

## Architecture

The page is composed of **section components** assembled in `src/app/page.tsx`. Each section is independent and reads from a single source of truth.

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata, lang="es", html.dark
│   ├── page.tsx            # Composes Header + 7 sections + Footer + StickyMobileCTA
│   ├── globals.css         # Tailwind v4 theme + Direction A design tokens
│   └── imgs/               # Static image assets (imported as ES modules)
├── components/
│   ├── sections/           # One file per landing section
│   │   ├── header.tsx      # Sticky nav (desktop + mobile Sheet)
│   │   ├── hero.tsx        # #about — CSS gradient bg, OpenNowBadge eyebrow
│   │   ├── pricing.tsx     # #services — renders from `plans` config
│   │   ├── features.tsx    # #features — 2x2 grid, features inlined here
│   │   ├── gallery.tsx     # #gallery — mosaic + lightbox
│   │   ├── testimonials.tsx# #testimonials — renders from `testimonials` config
│   │   ├── visit.tsx       # #visit — hours table + Google Maps embed/fallback
│   │   ├── cta.tsx         # #contact — final CTA
│   │   └── footer.tsx
│   ├── ui/                 # shadcn primitives
│   ├── gallery-lightbox.tsx # Radix Dialog lightbox (keyboard nav)
│   ├── open-now-badge.tsx  # Eyebrow/pill badge driven by useOpenNow
│   ├── scroll-reveal.tsx   # IntersectionObserver fade-up wrapper
│   ├── sticky-mobile-cta.tsx # Sticky WhatsApp button (mobile only)
│   └── wordmark.tsx        # Typographic logo (no image)
├── hooks/
│   ├── use-section-navigation.ts # Smooth-scroll + active-link state
│   └── use-open-now.ts     # Reads businessHours, returns open/closed state
└── lib/
    ├── site-config.ts      # Single source of truth: phone, email, socials, nav, plans, testimonials, hero, gallery, location, businessHours
    ├── images.ts           # Centralized image imports + galleryImages map
    ├── format-time.ts      # formatHour() helper used by Visit and Footer
    └── utils.ts            # `cn()` helper
```

### Key conventions

- **Editing copy or contact info**: change `src/lib/site-config.ts`. WhatsApp number, email, social URLs, plan prices/copy, testimonials, and nav labels all live there. There are no hardcoded `wa.me` URLs in components.
- **WhatsApp links**: use `whatsappUrl(message)` from `site-config.ts` — it handles URL encoding correctly. Don't write `https://wa.me/...?text=...` literals.
- **Nav links**: the desktop nav and mobile `Sheet` are rendered from a single `navLinks` array in `site-config.ts`. Adding a new section is a one-line addition there — but you still need to render the section in `page.tsx` and use the matching `id`.
- **Active-section highlight**: lives in `useSectionNavigation()`. It tracks the last *clicked* link and the URL hash on mount — it does **not** observe scroll position. If you want true scroll-spy behavior, swap in an `IntersectionObserver`.
- **Images**: import via `@/lib/images` (`images.logo`, `images.fondo`, etc.) instead of importing directly from `@/app/imgs/...`. Keeps asset paths in one place. Filenames are kebab-case — keep them that way.
- **External links**: always include `target="_blank" rel="noopener noreferrer"` together. The `whatsappUrl()` helper assumes its result is opened in a new tab.
- **`"use client"`**: most sections are client components because they wrap their content in `<ScrollReveal>` (IntersectionObserver). The exception is `hero.tsx`, which stays a server component — its only interactive child (`OpenNowBadge`) is itself a client island. The hero is above the fold so it doesn't need scroll-reveal anyway. Header, Footer, Gallery, and Visit are also client because of their own DOM/state needs (scroll-blur, smooth-scroll nav, lightbox state, day-of-week computation).

## Visual system

The site uses a **dark-only Direction A palette**: Ink `#0A0F0D` background, Surface `#11181A` cards, Lime `#C6FF5B` accent, white-mint `#F4FFF5` text. Headlines use Geist Display weight 800–900 with negative tracking; kicker labels use Geist Mono uppercase at `letter-spacing: 0.25em`. Motion is disciplined: scroll fade-up via `<ScrollReveal>`, hover scale 1.02, sticky mobile CTA. All animations honor `prefers-reduced-motion`.

Global components:
- `<Wordmark />` — typographic logo (no image)
- `<OpenNowBadge />` — live "Abierto / Cerrado" pill driven by `useOpenNow`
- `<StickyMobileCTA />` — appears after hero on mobile
- `<ScrollReveal>` — wraps section content for fade-up entrance

## Path aliases

`tsconfig.json` and `components.json` agree on:

- `@/*` → `./src/*`
- `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`

## Git workflow

The default branch is `main`. Recent history shows feature work merged via PRs from a `dev` branch on the `gomez2608` fork. Keep that pattern (PR from a branch into `main`) rather than pushing directly.
