# Tercer tiempo Ubaté — Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the visual layer of the Tercer tiempo landing page following Direction A ("Modern Bold" — dark + neon-green) per the spec at `docs/superpowers/specs/2026-05-18-redesign-design.md`. Architecture from the prior refactor stays; only visual code changes.

**Architecture:** All 9 sections live in `src/components/sections/`. Two new sections (Galería, Visítanos) plus three new global components (`OpenNowBadge`, `StickyMobileCTA`, `Wordmark`) and one new hook (`useOpenNow`). All site data — hours, address, hero copy, gallery — flows through `src/lib/site-config.ts` and `src/lib/images.ts`.

**Tech Stack:** Next.js 15.2.1 App Router · React 19 · TypeScript (strict) · Tailwind CSS v4 (theme in `globals.css`) · shadcn/ui · Radix Dialog (for lightbox) · Lucide icons · Geist + Geist Mono fonts.

**Verification model:** No automated tests in repo. Each task's verification = `npm run build` passes + manual inspection at `http://localhost:3000` (dev server). When a task adds interactive behavior, the verification step lists the exact manual checks.

---

## Task 0: Baseline — commit the prior architecture refactor

The previous session refactored architecture (asset renames, section components, site-config, hooks) but those changes were never committed. Land them as the baseline before starting the redesign so we have a clean diff per task.

**Files:**
- Modify: `.gitignore`, `src/app/layout.tsx`, `src/app/page.tsx`, `package-lock.json`
- Create (untracked): `CLAUDE.md`, `src/components/sections/*.tsx`, `src/hooks/use-section-navigation.ts`, `src/lib/images.ts`, `src/lib/site-config.ts`
- Renamed: `src/app/imgs/*` (kebab-case)
- Deleted: root `index.html` + `styles.css`, `public/*.svg` defaults, unused `Bare Organics.zip - *.svg`

- [ ] **Step 1: Verify current working-tree state**

Run: `git status --short`
Expected: shows the changes above (renames `R`, deletes `D`, new untracked files `??`, modified `M`).

- [ ] **Step 2: Verify build passes on the refactored state**

Run: `npm run build`
Expected: `✓ Compiled successfully`, `✓ Generating static pages (5/5)`. If errors appear, stop and resolve before committing.

- [ ] **Step 3: Stage everything**

```bash
git add -A
```

- [ ] **Step 4: Commit**

```bash
git commit -m "refactor(structure): extract sections, centralize site config, clean dead assets"
```

Expected: hook accepts message (conventional format), commit lands cleanly.

- [ ] **Step 5: Verify clean tree**

Run: `git status --short`
Expected: nothing tracked-and-dirty. May still show `.superpowers/` and `node_modules/` as ignored.

---

## Task 1: Rewrite design tokens in `globals.css`

Replace the existing oklch palette with the Direction A tokens. shadcn primitives consume `--background`, `--foreground`, `--primary`, etc., so we remap those to the new tokens — components don't need to change.

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the entire contents of `src/app/globals.css`**

```css
@import "tailwindcss";

@plugin "tailwindcss-animate";

@theme inline {
  /* --- Brand tokens (Direction A) --- */
  --color-ink: #0A0F0D;
  --color-surface: #11181A;
  --color-elevated: #1A2426;
  --color-lime: #C6FF5B;
  --color-lime-deep: #8FC92E;
  --color-fg: #F4FFF5;
  --color-muted: #6B7775;
  --color-hairline: rgba(255, 255, 255, 0.08);
  --color-status-warn: #FFD43B;
  --color-status-closed: #FF6B5B;

  /* Fonts (already loaded in layout.tsx) */
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);

  /* Radii */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  /* --- shadcn aliases: point at the brand tokens --- */
  --color-background: var(--color-ink);
  --color-foreground: var(--color-fg);
  --color-card: var(--color-surface);
  --color-card-foreground: var(--color-fg);
  --color-popover: var(--color-elevated);
  --color-popover-foreground: var(--color-fg);
  --color-primary: var(--color-lime);
  --color-primary-foreground: var(--color-ink);
  --color-secondary: var(--color-elevated);
  --color-secondary-foreground: var(--color-fg);
  --color-muted: var(--color-elevated);
  --color-muted-foreground: var(--color-muted);
  --color-accent: var(--color-lime);
  --color-accent-foreground: var(--color-ink);
  --color-destructive: var(--color-status-closed);
  --color-destructive-foreground: var(--color-ink);
  --color-border: var(--color-hairline);
  --color-input: var(--color-hairline);
  --color-ring: var(--color-lime);
}

:root {
  color-scheme: dark;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: "ss01", "cv11";
  }

  /* Smooth scroll for in-page anchor navigation */
  html {
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Selection */
  ::selection {
    background: var(--color-lime);
    color: var(--color-ink);
  }
}
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: `✓ Compiled successfully`. The site will look broken (existing components still use Tailwind classes that no longer match), but TypeScript and lint should pass.

- [ ] **Step 3: Verify in browser**

Run: `npm run dev` and open `http://localhost:3000`.
Expected: page renders with dark background, lime CTAs. Sections will look misaligned/ugly — that's expected and gets fixed in later tasks.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(design): rewrite design tokens for Direction A palette"
```

---

## Task 2: Expand `site-config.ts` with new data

Add `businessHours`, `location`, `hero`, and `gallery` to the central config so subsequent tasks can read from one place.

**Files:**
- Modify: `src/lib/site-config.ts`

- [ ] **Step 1: Add the new exports** at the top of `src/lib/site-config.ts`, *immediately after* the existing `site` const:

```ts
export const businessHours = {
  open: { hour: 15, minute: 0 },  // 3:00 PM
  close: { hour: 21, minute: 0 }, // 9:00 PM
} as const;

export const location = {
  street: "Carrera 9 #10-51",
  city: "Ubaté",
  country: "Colombia",
  mapsUrl: "https://maps.app.goo.gl/WXS2wrak5dmdEYWk6",
  /**
   * Resolved Google Maps embed URL. If empty, the Visit section falls back
   * to a styled card with a "Ver en Maps →" CTA.
   */
  mapEmbedUrl: "",
} as const;

export const hero = {
  kicker: "Tercer tiempo · Ubaté",
  headline: { line1: "Tu cancha.", line2: "Al 100." },
  sub: "La sintética cubierta de Ubaté, abierta todos los días de 3 a 9. Reserva en un mensaje.",
  trust: {
    enabled: true,
    rating: 4.9,
    matchesPlayed: 500,
  },
} as const;

export type GalleryItem = {
  key: string;
  alt: string;
  caption: string;
  span: "wide" | "tall" | "regular";
};

export const gallery: GalleryItem[] = [
  { key: "g-night-1", alt: "Cancha sintética iluminada de noche", caption: "Nocturna", span: "wide" },
  { key: "g-field-1", alt: "Vista de la cancha desde la banca", caption: "Cancha", span: "regular" },
  { key: "g-detail-1", alt: "Detalle del pasto sintético", caption: "Detalle", span: "tall" },
  { key: "g-day-1", alt: "Cancha cubierta durante el día", caption: "Diurna", span: "regular" },
  { key: "g-teams-1", alt: "Equipos jugando un partido", caption: "Equipos", span: "wide" },
];
```

- [ ] **Step 2: Replace the existing `plans` const** in the same file with:

```ts
export const plans = [
  {
    kind: "frequent",
    title: "Cliente frecuente",
    description: "Si has jugado 10 o más veces con nosotros.",
    headline: "1 hora",
    headlineSuffix: "gratis",
    bullets: [
      "Una hora gratis por cada 10 partidos.",
      "Disponible con nuestra tarjeta cliente frecuente.",
    ],
    cta: {
      label: "Inscríbete",
      whatsappMessage: "Hola, quiero ser un cliente frecuente.",
    },
    highlighted: false,
  },
  {
    kind: "reserve",
    title: "Reserva",
    description: "Una hora para tu fútbol sin compromisos.",
    headline: "$50.000",
    headlineSuffix: "/ hora",
    bullets: [
      "Disponibilidad exclusiva durante tu hora.",
      "Suma puntos para tu tarjeta cliente frecuente.",
    ],
    cta: {
      label: "Reservar ya",
      whatsappMessage: "Hola, quiero reservar una cancha.",
    },
    highlighted: true,
  },
  {
    kind: "event",
    title: "Celebra con nosotros",
    description: "Cumpleaños, integraciones, eventos especiales.",
    headline: null,
    headlineSuffix: null,
    bullets: ["Cumpleaños", "Eventos especiales", "Asados e integraciones", "Atención dedicada"],
    cta: {
      label: "Cotizar evento",
      whatsappMessage: "Hola, quiero cotizar un evento.",
    },
    highlighted: false,
  },
] as const;
```

- [ ] **Step 3: Replace the existing `reserveWhatsappMessage` and `moreInfoWhatsappMessage` lines** at the bottom with:

```ts
export const reserveWhatsappMessage = "Hola, quiero reservar una cancha.";
export const moreInfoWhatsappMessage = "Hola, quiero más información.";
export const tonightWhatsappMessage = "Hola, ¿hay cupo para esta noche?";
```

- [ ] **Step 4: Run build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/site-config.ts
git commit -m "feat(config): add business hours, location, hero copy, and gallery items"
```

---

## Task 3: Create `useOpenNow` hook (pure time logic)

The badge needs to recompute "open / closed / opens at" every minute. Keep the logic pure and testable in `useOpenNow`.

**Files:**
- Create: `src/hooks/use-open-now.ts`

- [ ] **Step 1: Create `src/hooks/use-open-now.ts`** with this content:

```ts
"use client";

import { useEffect, useState } from "react";

import { businessHours } from "@/lib/site-config";

export type OpenNowState =
  | { state: "open"; closesAt: string }
  | { state: "opens-today"; opensAt: string }
  | { state: "opens-tomorrow"; opensAt: string };

function formatHourMinute(h: number, m: number): string {
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const mm = m === 0 ? "" : `:${m.toString().padStart(2, "0")}`;
  return `${hour12}${mm} ${period}`;
}

export function computeOpenNow(now: Date): OpenNowState {
  const { open, close } = businessHours;
  const openMinutes = open.hour * 60 + open.minute;
  const closeMinutes = close.hour * 60 + close.minute;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  if (nowMinutes >= openMinutes && nowMinutes < closeMinutes) {
    return { state: "open", closesAt: formatHourMinute(close.hour, close.minute) };
  }
  if (nowMinutes < openMinutes) {
    return { state: "opens-today", opensAt: formatHourMinute(open.hour, open.minute) };
  }
  return { state: "opens-tomorrow", opensAt: formatHourMinute(open.hour, open.minute) };
}

export function useOpenNow(): OpenNowState | null {
  const [state, setState] = useState<OpenNowState | null>(null);

  useEffect(() => {
    const tick = () => setState(computeOpenNow(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return state;
}
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/use-open-now.ts
git commit -m "feat(hooks): add useOpenNow with three-state schedule logic"
```

---

## Task 4: Create `OpenNowBadge` component

Renders the three states from `useOpenNow`. SSR returns a hydration-safe skeleton.

**Files:**
- Create: `src/components/open-now-badge.tsx`

- [ ] **Step 1: Create `src/components/open-now-badge.tsx`**:

```tsx
"use client";

import { useOpenNow } from "@/hooks/use-open-now";
import { cn } from "@/lib/utils";

type Variant = "eyebrow" | "pill";

export function OpenNowBadge({ variant = "eyebrow" }: { variant?: Variant }) {
  const state = useOpenNow();

  if (!state) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]",
          variant === "pill" && "rounded-full border border-hairline bg-elevated px-3 py-1.5",
        )}
        aria-live="polite"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-muted" />
        <span className="opacity-50">Cargando…</span>
      </span>
    );
  }

  const isOpen = state.state === "open";
  const dotColor = isOpen ? "bg-lime shadow-[0_0_10px_var(--color-lime)]" : "bg-[var(--color-status-warn)]";
  const textColor = isOpen ? "text-lime" : "text-[var(--color-status-warn)]";

  const label =
    state.state === "open"
      ? `Abierto ahora · cierra ${state.closesAt}`
      : state.state === "opens-today"
        ? `Cerrado · abre hoy ${state.opensAt}`
        : `Cerrado · abre mañana ${state.opensAt}`;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]",
        variant === "pill" && "rounded-full border border-hairline bg-elevated px-3 py-1.5",
      )}
      aria-live="polite"
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          dotColor,
          isOpen && "motion-safe:animate-pulse",
        )}
      />
      <span className={textColor}>{label}</span>
    </span>
  );
}
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Commit**

```bash
git add src/components/open-now-badge.tsx
git commit -m "feat(components): add OpenNowBadge with eyebrow and pill variants"
```

---

## Task 5: Create `Wordmark` component (replaces logo image)

Pure typography. Takes a `size` prop and an `withKicker` toggle.

**Files:**
- Create: `src/components/wordmark.tsx`

- [ ] **Step 1: Create `src/components/wordmark.tsx`**:

```tsx
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

const sizeMap: Record<Size, string> = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-3xl",
};

export function Wordmark({
  size = "md",
  withKicker = false,
  className,
}: {
  size?: Size;
  withKicker?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-black tracking-[-0.02em]",
          sizeMap[size],
        )}
      >
        Tercer<span className="text-lime"> tiempo</span>
      </span>
      {withKicker && (
        <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.28em] text-fg/55">
          Ubaté · Colombia
        </span>
      )}
    </span>
  );
}
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Commit**

```bash
git add src/components/wordmark.tsx
git commit -m "feat(components): add typographic Wordmark replacing logo image"
```

---

## Task 6: Rebuild Header section

New nav style: transparent over hero, sticky with backdrop blur after scroll, mono-uppercase links, lime CTA.

**Files:**
- Modify: `src/components/sections/header.tsx`

- [ ] **Step 1: Replace the entire contents of `src/components/sections/header.tsx`**:

```tsx
"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Wordmark } from "@/components/wordmark";
import { useSectionNavigation } from "@/hooks/use-section-navigation";
import {
  navLinks,
  reserveWhatsappMessage,
  whatsappUrl,
  type NavId,
} from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const { activeSection, handleNavClick } = useSectionNavigation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (id: NavId) =>
    cn(
      "font-mono text-[11px] uppercase tracking-[0.22em] transition-colors",
      activeSection === id ? "text-lime" : "text-fg/70 hover:text-fg",
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex items-center justify-between px-6 py-4 transition-colors md:px-10",
        scrolled
          ? "border-b border-hairline bg-ink/80 backdrop-blur"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Link href="#about" onClick={(e) => handleNavClick("about", e)}>
        <Wordmark size="md" withKicker className="hidden md:inline-flex" />
        <Wordmark size="md" className="md:hidden" />
      </Link>

      <nav className="hidden gap-7 md:flex">
        {navLinks
          .filter((l) => l.id !== "about")
          .map(({ id, label }) => (
            <Link
              key={id}
              href={`#${id}`}
              className={linkClass(id)}
              onClick={(e) => handleNavClick(id, e)}
            >
              {label}
            </Link>
          ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href={whatsappUrl(reserveWhatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex"
        >
          <Button size="sm" className="rounded-full px-5 font-bold">
            Reservar →
          </Button>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-ink">
            <nav className="mt-8 flex flex-col gap-5">
              {navLinks.map(({ id, label }) => (
                <Link
                  key={id}
                  href={`#${id}`}
                  className="font-mono text-sm uppercase tracking-[0.22em] text-fg/80 hover:text-lime"
                  onClick={(e) => handleNavClick(id, e)}
                >
                  {label}
                </Link>
              ))}
              <Link
                href={whatsappUrl(reserveWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4"
              >
                <Button className="w-full rounded-full font-bold">Reservar →</Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Add "visit" and "gallery" to `navLinks`** — open `src/lib/site-config.ts` and replace the existing `navLinks` const with:

```ts
export const navLinks = [
  { id: "about", label: "Inicio" },
  { id: "services", label: "Servicios" },
  { id: "gallery", label: "Galería" },
  { id: "testimonials", label: "Opiniones" },
  { id: "visit", label: "Visítanos" },
] as const;
```

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Visual check in dev server**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: header shows new Wordmark with lime "tiempo", mono nav links, lime "Reservar →" pill. After scrolling 24px the header gains a dark blur background.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/header.tsx src/lib/site-config.ts
git commit -m "feat(header): rewrite nav with wordmark, mono links, and scroll-blur"
```

---

## Task 7: Rebuild Hero section

Full-bleed CSS gradient background, oversized headline, `OpenNowBadge` eyebrow, dual CTAs, trust strip.

**Files:**
- Modify: `src/components/sections/hero.tsx`

- [ ] **Step 1: Replace the entire contents of `src/components/sections/hero.tsx`**:

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { OpenNowBadge } from "@/components/open-now-badge";
import { Button } from "@/components/ui/button";
import {
  hero,
  location,
  reserveWhatsappMessage,
  whatsappUrl,
} from "@/lib/site-config";

export function Hero() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-ink"
      aria-label="Bienvenido a Tercer tiempo"
    >
      {/* Gradient + grid background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 70% 30%, rgba(198,255,91,0.18), transparent 55%), radial-gradient(ellipse 70% 70% at 20% 80%, rgba(143,201,46,0.12), transparent 60%), linear-gradient(180deg, #0a0f0d 0%, #11181a 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(198,255,91,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(198,255,91,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at 60% 40%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 60% 40%, black 30%, transparent 80%)",
        }}
      />

      <div className="mx-auto flex min-h-[88vh] max-w-[1200px] flex-col justify-center px-6 pb-32 pt-20 md:px-10 md:pb-40 md:pt-32">
        <OpenNowBadge />

        <h1 className="mt-8 font-black leading-[0.88] tracking-[-0.045em]">
          <span className="block text-[clamp(56px,9vw,128px)]">
            {hero.headline.line1}
          </span>
          <span className="block text-[clamp(56px,9vw,128px)] text-lime">
            {hero.headline.line2}
          </span>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-fg/80 md:text-lg">
          {hero.sub}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href={whatsappUrl(reserveWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="rounded-full px-7 font-bold">
              Reservar por WhatsApp
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href={location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-fg/25 bg-transparent px-7 font-semibold text-fg hover:bg-fg/5 hover:text-fg"
            >
              Cómo llegar
            </Button>
          </Link>
        </div>

        {hero.trust.enabled && (
          <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/55">
            <span>
              <span className="text-lime">★★★★★</span> {hero.trust.rating} / 5
            </span>
            <span className="h-3 w-px bg-hairline" aria-hidden />
            <span>+{hero.trust.matchesPlayed} partidos jugados</span>
            <span className="h-3 w-px bg-hairline" aria-hidden />
            <span>{location.street}</span>
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `src/app/imgs/images.ts`** — verify the file does NOT import `fondo` anymore in places that reference the old hero. Check current usage with:

```bash
grep -n "images.fondo" src/components/sections/*.tsx
```

Expected: only `hero.tsx` may still reference it, and the new hero.tsx doesn't. So nothing to change here.

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Visual check**

Open `http://localhost:3000`. Expected:
- Hero fills the viewport
- Dark gradient with subtle lime glow top-right + bottom-left
- 32px grid overlay faint in the middle
- "ABIERTO AHORA · CIERRA 9 PM" eyebrow with pulsing dot (if current time is within 3pm–9pm) or warning "CERRADO" variant
- Huge "Tu cancha." / "Al 100." with the second line in lime
- Two CTAs: lime pill "Reservar por WhatsApp" + ghost outline "Cómo llegar"
- Trust strip at bottom: stars, rating, matches, address

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/hero.tsx
git commit -m "feat(hero): rebuild with oversized type, lime accent, open-now badge"
```

---

## Task 8: Restyle Pricing section

Dark cards with hairline borders, lime accents, highlighted middle card. No structural change — `plans` data flows through unchanged.

**Files:**
- Modify: `src/components/sections/pricing.tsx`

- [ ] **Step 1: Replace the entire contents of `src/components/sections/pricing.tsx`**:

```tsx
import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { plans, whatsappUrl } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="services" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-lime">
            Servicios
          </span>
          <h2 className="mt-4 text-4xl font-extrabold leading-[0.95] tracking-[-0.02em] md:text-6xl">
            3 maneras de jugar.
          </h2>
          <p className="mt-5 max-w-lg text-base text-fg/70 md:text-lg">
            Precios justos, sin sorpresas. Reserva una hora, suma puntos cada
            partido, o monta tu evento.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.kind}
              className={cn(
                "relative flex h-full flex-col border-hairline bg-surface text-fg",
                plan.highlighted &&
                  "border-lime/40 ring-1 ring-lime/40 md:-translate-y-3",
              )}
            >
              {plan.highlighted && (
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                  Más popular
                </span>
              )}
              <CardHeader className="pt-7">
                <CardTitle className="text-2xl font-bold">
                  {plan.title}
                </CardTitle>
                <CardDescription className="text-fg/60">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                {plan.headline && (
                  <div className="mb-6 flex items-baseline gap-1.5">
                    <span className="text-5xl font-black tracking-[-0.03em] text-lime">
                      {plan.headline}
                    </span>
                    {plan.headlineSuffix && (
                      <span className="text-sm text-fg/55">
                        {plan.headlineSuffix}
                      </span>
                    )}
                  </div>
                )}
                <ul className="space-y-3">
                  {plan.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-sm text-fg/85"
                    >
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-lime" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-2">
                <Link
                  href={whatsappUrl(plan.cta.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    variant={plan.highlighted ? "default" : "outline"}
                    className={cn(
                      "w-full rounded-full font-bold",
                      !plan.highlighted &&
                        "border-fg/25 bg-transparent text-fg hover:bg-fg/5 hover:text-fg",
                    )}
                  >
                    {plan.cta.label}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Visual check**

Open `http://localhost:3000#services`. Expected:
- 3 cards in a row on desktop, stacked on mobile
- Middle card "Reserva" has a lime ring, raises slightly, and shows "Más popular" pill on top
- Prices appear in big lime numbers
- Lime checkmarks on bullets
- Middle card has lime CTA, others have ghost outline

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/pricing.tsx
git commit -m "feat(pricing): restyle plans with dark cards and lime accents"
```

---

## Task 9: Restyle Features section (drop side photo, add 4th feature)

**Files:**
- Modify: `src/components/sections/features.tsx`

- [ ] **Step 1: Replace the entire contents of `src/components/sections/features.tsx`**:

```tsx
import {
  Clock,
  CloudRainWind,
  Lightbulb,
  Users,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: CloudRainWind,
    title: "Cubierta contra la lluvia",
    description:
      "¿Tiempo difícil? Nuestra cancha cubierta deja que juegues incluso en las peores condiciones.",
  },
  {
    icon: Lightbulb,
    title: "Iluminación profesional",
    description:
      "LEDs de alta potencia para que tus partidos de noche se vean tan bien como los de día.",
  },
  {
    icon: Clock,
    title: "Tiempo cronometrado",
    description:
      "Sistema de cronometrado preciso. Hasta el último segundo cuenta — sin discusiones.",
  },
  {
    icon: Users,
    title: "Atención dedicada",
    description:
      "Nuestro personal te recibe, te atiende durante el partido, y te despide.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-lime">
            Por qué Tercer tiempo
          </span>
          <h2 className="mt-4 text-4xl font-extrabold leading-[0.95] tracking-[-0.02em] md:text-6xl">
            Lleva tus partidos al <span className="text-lime">100%</span>.
          </h2>
          <p className="mt-5 max-w-lg text-base text-fg/70 md:text-lg">
            Cuatro razones por las que la gente vuelve cada semana.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-2xl border border-hairline bg-surface p-7 transition-colors hover:border-lime/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime/12 text-lime">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold leading-tight tracking-[-0.015em]">
                {title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-fg/70">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Visual check**

Open `http://localhost:3000#features`. Expected:
- 2×2 grid of feature cards on desktop, 1-col on mobile
- Lime icon in a rounded square at the top of each card
- No image on the side (old `balon.jpg` gone)
- Hairline border, hover lights up to lime
- 4 features total — the new "Iluminación profesional" is in the second slot

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/features.tsx
git commit -m "feat(features): rebuild as 2x2 grid, drop side photo, add lighting feature"
```

---

## Task 10: Create Gallery section + Lightbox

**Files:**
- Create: `src/components/sections/gallery.tsx`
- Create: `src/components/gallery-lightbox.tsx`
- Modify: `src/lib/images.ts`
- Modify: `src/app/page.tsx` (add `<Gallery />` to page)

**Note on photos:** for v1 we reuse images already in the repo plus optional curated stock. To keep this plan self-contained without external downloads, we'll reuse `fondo`, `balon`, and the testimonial photos as the 5 gallery tiles. If/when real photos arrive they go into `src/app/imgs/gallery/` and `gallery` items in `site-config.ts` are updated.

- [ ] **Step 1: Add gallery image map** — modify `src/lib/images.ts` to append below the existing exports:

```ts
import type { StaticImageData as _SID } from "next/image";

// Gallery images (v1: reuses existing assets; replace with curated photos later)
export const galleryImages: Record<string, _SID> = {
  "g-night-1": fondo,
  "g-field-1": balon,
  "g-detail-1": andres,
  "g-day-1": santiago,
  "g-teams-1": luis,
};
```

Note: this uses the same local consts (`fondo`, `balon`, `andres`, `santiago`, `luis`) that are already imported at the top of `images.ts`. No new imports needed.

- [ ] **Step 2: Create `src/components/gallery-lightbox.tsx`** (client component):

```tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { galleryImages } from "@/lib/images";
import { gallery } from "@/lib/site-config";

export function GalleryLightbox({
  open,
  onOpenChange,
  startIndex,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startIndex: number;
}) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  const item = gallery[index];

  const next = useCallback(
    () => setIndex((i) => (i + 1) % gallery.length),
    [],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + gallery.length) % gallery.length),
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 backdrop-blur">
        <DialogTitle className="sr-only">{item.alt}</DialogTitle>

        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-5 top-5 rounded-full border border-hairline bg-elevated p-2.5 text-fg/80 hover:text-fg"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>

        <button
          onClick={prev}
          className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full border border-hairline bg-elevated p-2.5 text-fg/80 hover:text-fg"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={next}
          className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full border border-hairline bg-elevated p-2.5 text-fg/80 hover:text-fg"
          aria-label="Siguiente"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="relative h-[80vh] w-full max-w-5xl">
          <Image
            src={galleryImages[item.key]!}
            alt={item.alt}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="rounded-2xl object-contain"
          />
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/55">
          {index + 1} / {gallery.length} · {item.caption}
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 3: Create `src/components/sections/gallery.tsx`** (client wrapper because of the click handler):

```tsx
"use client";

import Image from "next/image";
import { useState } from "react";

import { GalleryLightbox } from "@/components/gallery-lightbox";
import { galleryImages } from "@/lib/images";
import { gallery } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const spanClass: Record<(typeof gallery)[number]["span"], string> = {
  wide: "md:col-span-3 md:row-span-1",
  regular: "md:col-span-2 md:row-span-1",
  tall: "md:col-span-1 md:row-span-2",
};

export function Gallery() {
  const [openAt, setOpenAt] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-lime">
            La cancha
          </span>
          <h2 className="mt-4 text-4xl font-extrabold leading-[0.95] tracking-[-0.02em] md:text-6xl">
            En <span className="text-lime">acción</span>.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-6 md:grid-rows-[220px_180px]">
          {gallery.map((item, i) => (
            <button
              key={item.key}
              onClick={() => setOpenAt(i)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-hairline bg-surface transition-transform hover:scale-[1.015]",
                spanClass[item.span],
                "aspect-square md:aspect-auto",
              )}
              aria-label={`Abrir ${item.caption}`}
            >
              <Image
                src={galleryImages[item.key]!}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-opacity group-hover:opacity-95"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg/85">
                  {item.caption}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <GalleryLightbox
        open={openAt !== null}
        onOpenChange={(o) => !o && setOpenAt(null)}
        startIndex={openAt ?? 0}
      />
    </section>
  );
}
```

- [ ] **Step 4: Wire Gallery into the page** — modify `src/app/page.tsx`:

```tsx
import { CallToAction } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Gallery } from "@/components/sections/gallery";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Pricing />
        <Features />
        <Gallery />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 5: Run build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 6: Visual + interaction check**

Open `http://localhost:3000#gallery`. Expected:
- 5 tiles in an asymmetric 3+2 mosaic on desktop, 2-col grid on mobile
- Each tile has a caption strip at the bottom
- Clicking a tile opens a full-screen dark lightbox
- Lightbox: ← / → buttons, ESC to close, arrow keys navigate, counter "1 / 5 · Nocturna" at bottom

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/gallery.tsx src/components/gallery-lightbox.tsx src/lib/images.ts src/app/page.tsx
git commit -m "feat(gallery): add mosaic gallery section with lightbox"
```

---

## Task 11: Restyle Testimonials section

**Files:**
- Modify: `src/components/sections/testimonials.tsx`

- [ ] **Step 1: Replace the entire contents of `src/components/sections/testimonials.tsx`**:

```tsx
import Image from "next/image";
import { Star } from "lucide-react";

import { testimonialImages } from "@/lib/images";
import { testimonials } from "@/lib/site-config";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-lime">
            Opiniones
          </span>
          <h2 className="mt-4 text-4xl font-extrabold leading-[0.95] tracking-[-0.02em] md:text-6xl">
            La cancha favorita de <span className="text-lime">Ubaté</span>.
          </h2>
          <p className="mt-5 max-w-lg text-base text-fg/70 md:text-lg">
            No solo lo decimos nosotros. Lo que dicen quienes ya jugaron aquí.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-2xl border border-hairline bg-surface p-7"
            >
              <div className="flex gap-0.5" aria-label="5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-lime text-lime"
                    aria-hidden
                  />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-fg/85">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3">
                <Image
                  src={testimonialImages[t.image]!}
                  alt={`Foto de ${t.name}`}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-fg">{t.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg/55">
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Visual check**

Open `http://localhost:3000#testimonials`. Expected: 3 dark cards with lime stars, mono-uppercase role line, circular avatars, hairline borders.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/testimonials.tsx
git commit -m "feat(testimonials): restyle with dark cards and lime stars"
```

---

## Task 12: Create Visit section (Hours + Location)

**Files:**
- Create: `src/components/sections/visit.tsx`
- Modify: `src/app/page.tsx` (add `<Visit />`)

- [ ] **Step 1: Create `src/components/sections/visit.tsx`**:

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { OpenNowBadge } from "@/components/open-now-badge";
import { Button } from "@/components/ui/button";
import { businessHours, location } from "@/lib/site-config";

const DAY_GROUPS = [
  { label: "Lun – Vie", ids: [1, 2, 3, 4, 5] },
  { label: "Sáb", ids: [6] },
  { label: "Dom", ids: [0] },
] as const;

function formatHour(h: number) {
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:00 ${period}`;
}

export function Visit() {
  const todayDow = new Date().getDay();
  const hoursLabel = `${formatHour(businessHours.open.hour)} — ${formatHour(businessHours.close.hour)}`;
  const hasMapEmbed = location.mapEmbedUrl.length > 0;

  return (
    <section id="visit" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="overflow-hidden rounded-3xl border border-hairline bg-surface md:grid md:grid-cols-2">
          {/* Info column */}
          <div className="flex flex-col gap-7 p-8 md:p-12">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-lime">
                Visítanos
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-[0.95] tracking-[-0.02em] md:text-5xl">
                {location.street.split(" #")[0]}{" "}
                <span className="text-lime">
                  #{location.street.split(" #")[1]}
                </span>
                .
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <OpenNowBadge variant="pill" />
              <span className="rounded-full border border-hairline bg-elevated px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-fg/70">
                Cubierta
              </span>
              <span className="rounded-full border border-hairline bg-elevated px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-fg/70">
                Sintética
              </span>
            </div>

            <div className="rounded-2xl border border-hairline bg-elevated p-5">
              {DAY_GROUPS.map((group) => {
                const isToday = group.ids.includes(todayDow);
                return (
                  <div
                    key={group.label}
                    className={
                      isToday
                        ? "-mx-3 flex items-center justify-between rounded-xl bg-lime/8 px-3 py-2.5"
                        : "flex items-center justify-between border-b border-hairline py-2.5 last:border-b-0"
                    }
                  >
                    <span
                      className={
                        isToday
                          ? "font-bold text-fg before:mr-2 before:text-lime before:content-['●']"
                          : "text-fg/75"
                      }
                    >
                      {isToday ? `Hoy · ${group.label}` : group.label}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.1em] text-lime">
                      {hoursLabel}
                    </span>
                  </div>
                );
              })}
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg/55">
                Dirección
              </div>
              <div className="mt-1.5 text-lg font-bold tracking-[-0.015em]">
                {location.street}, {location.city}
              </div>
              <Link
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block"
              >
                <Button className="rounded-full font-bold">
                  Cómo llegar
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Map column */}
          <div className="relative min-h-[320px] bg-elevated md:min-h-full">
            {hasMapEmbed ? (
              <iframe
                src={location.mapEmbedUrl}
                title={`Mapa de Tercer tiempo ${location.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <Link
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-elevated p-8 text-center"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse at 60% 45%, rgba(198,255,91,0.08) 0%, transparent 55%), linear-gradient(rgba(244,255,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(244,255,245,0.04) 1px, transparent 1px)",
                  backgroundSize: "auto, 40px 40px, 40px 40px",
                }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-2xl text-ink shadow-[0_0_0_8px_rgba(198,255,91,0.15)]">
                  ⚽
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg/70">
                  {location.street}
                </div>
                <Button
                  variant="outline"
                  className="rounded-full border-fg/25 bg-transparent font-bold text-fg hover:bg-fg/5 hover:text-fg"
                >
                  Ver en Google Maps
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire Visit into the page** — modify `src/app/page.tsx`:

```tsx
import { CallToAction } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Gallery } from "@/components/sections/gallery";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { Visit } from "@/components/sections/visit";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Pricing />
        <Features />
        <Gallery />
        <Testimonials />
        <Visit />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Visual check**

Open `http://localhost:3000#visit`. Expected:
- Two-column card on desktop, stacked on mobile
- Left: kicker, headline "Carrera 9 #10-51." (with lime "#10-51"), pill row (open badge + Cubierta + Sintética), hours table with today's row highlighted lime, address card with "Cómo llegar" CTA
- Right: dark map placeholder with lime pulsing pin (until `mapEmbedUrl` is filled in)
- Clicking "Cómo llegar" opens the `maps.app.goo.gl/WXS2wrak5dmdEYWk6` URL in a new tab

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/visit.tsx src/app/page.tsx
git commit -m "feat(visit): add hours + location section with map fallback"
```

---

## Task 13: Restyle CTA section

**Files:**
- Modify: `src/components/sections/cta.tsx`

- [ ] **Step 1: Replace the entire contents of `src/components/sections/cta.tsx`**:

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  mailtoUrl,
  site,
  tonightWhatsappMessage,
  whatsappUrl,
} from "@/lib/site-config";

export function CallToAction() {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-ink py-28 md:py-40">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(198,255,91,0.12), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-2xl px-6 text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-lime">
          Cierre
        </span>
        <h2 className="mt-5 text-4xl font-extrabold leading-[0.95] tracking-[-0.025em] md:text-6xl">
          El cupo de esta noche se{" "}
          <span className="text-lime">llena rápido</span>.
        </h2>
        <p className="mt-5 text-base text-fg/70 md:text-lg">
          Reserva en un mensaje y deja el resto a nosotros.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3">
          <Link
            href={whatsappUrl(tonightWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="rounded-full px-8 font-bold">
              Reservar por WhatsApp
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href={mailtoUrl}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg/55 hover:text-fg"
          >
            o escríbenos a {site.email}
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/cta.tsx
git commit -m "feat(cta): sharpen final CTA copy and layout"
```

---

## Task 14: Restyle Footer

**Files:**
- Modify: `src/components/sections/footer.tsx`

- [ ] **Step 1: Replace the entire contents of `src/components/sections/footer.tsx`**:

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";

import { Wordmark } from "@/components/wordmark";
import { useSectionNavigation } from "@/hooks/use-section-navigation";
import { images } from "@/lib/images";
import {
  businessHours,
  moreInfoWhatsappMessage,
  navLinks,
  site,
  whatsappUrl,
} from "@/lib/site-config";

const productLinkIds = ["services", "gallery", "testimonials", "visit"] as const;

const socialLinks = [
  { href: site.socials.facebook, image: images.facebook, label: "Facebook" },
  { href: site.socials.instagram, image: images.instagram, label: "Instagram" },
  {
    href: whatsappUrl(moreInfoWhatsappMessage),
    image: images.whatsapp,
    label: "WhatsApp",
  },
] as const;

export function Footer() {
  const { handleNavClick } = useSectionNavigation();
  const year = new Date().getFullYear();
  const productLinks = navLinks.filter((l) =>
    (productLinkIds as readonly string[]).includes(l.id),
  );

  const hoursLabel = `${businessHours.open.hour - 12}:00 PM — ${businessHours.close.hour - 12}:00 PM`;

  return (
    <footer className="border-t border-hairline bg-ink py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-5">
            <Wordmark size="md" withKicker />
            <p className="max-w-xs text-sm text-fg/55">{site.description}</p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-hairline bg-elevated p-2.5 transition-colors hover:border-lime/40"
                >
                  <Image
                    src={s.image}
                    alt={`${s.label} ${site.name}`}
                    width={20}
                    height={20}
                    className="opacity-80"
                  />
                  <span className="sr-only">{s.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg/55">
              Horario
            </h4>
            <p className="mt-4 text-base text-fg/80">Todos los días</p>
            <p className="font-mono text-sm text-lime">{hoursLabel}</p>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg/55">
              Navegación
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {productLinks.map(({ id, label }) => (
                <li key={id}>
                  <Link
                    href={`#${id}`}
                    className="text-fg/75 transition-colors hover:text-lime"
                    onClick={(e) => handleNavClick(id, e)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-hairline pt-7 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-fg/45">
          © {year} {site.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/footer.tsx
git commit -m "feat(footer): rebuild with wordmark, hours summary, and refined links"
```

---

## Task 15: Create `StickyMobileCTA`

**Files:**
- Create: `src/components/sticky-mobile-cta.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/sticky-mobile-cta.tsx`**:

```tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { reserveWhatsappMessage, whatsappUrl } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("about");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry?.isIntersecting),
      { rootMargin: "0px 0px -80% 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 transition-transform duration-250 md:hidden",
        visible ? "translate-y-0" : "translate-y-[120%]",
      )}
    >
      <Link
        href={whatsappUrl(reserveWhatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Button className="w-full rounded-2xl py-6 font-bold shadow-[0_-10px_30px_rgba(0,0,0,0.4)]">
          Reservar por WhatsApp
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Wire into `src/app/page.tsx`** — add the import and place `<StickyMobileCTA />` outside `<main>` so it doesn't affect layout:

```tsx
import { CallToAction } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Gallery } from "@/components/sections/gallery";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { Visit } from "@/components/sections/visit";
import { StickyMobileCTA } from "@/components/sticky-mobile-cta";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Pricing />
        <Features />
        <Gallery />
        <Testimonials />
        <Visit />
        <CallToAction />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
```

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Visual check (mobile viewport)**

Open `http://localhost:3000` and shrink the browser to <768px (or use device emulation). Expected:
- Sticky button is hidden over the hero
- Scroll down past 80% of the hero — the lime "Reservar por WhatsApp" button slides up from the bottom
- Button stays visible at the bottom for the rest of the page
- On desktop (>=768px) the button never appears

- [ ] **Step 5: Commit**

```bash
git add src/components/sticky-mobile-cta.tsx src/app/page.tsx
git commit -m "feat(mobile): add sticky WhatsApp CTA that appears after hero"
```

---

## Task 16: Wire scroll fade-up animations

Single shared component that wraps any section. Honors `prefers-reduced-motion`.

**Files:**
- Create: `src/components/scroll-reveal.tsx`
- Modify: each section file to wrap its content with `<ScrollReveal>`

- [ ] **Step 1: Create `src/components/scroll-reveal.tsx`**:

```tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export function ScrollReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.unobserve(node);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-[600ms] ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Wrap each section's primary content** — for each of these files, wrap the inner `<div class="mx-auto max-w-[1200px] ...">` (or the section's main content block) with `<ScrollReveal>`. Edit each file to:

1. Add import: `import { ScrollReveal } from "@/components/scroll-reveal";`
2. Convert the section to a client component if needed (add `"use client"` at the top — required for `Pricing`, `Features`, `Testimonials`, `Visit`, `CallToAction` because they're currently server components).

Files to update:
- `src/components/sections/pricing.tsx`
- `src/components/sections/features.tsx`
- `src/components/sections/testimonials.tsx`
- `src/components/sections/visit.tsx`
- `src/components/sections/cta.tsx`

For each one, add `"use client";` at the top, import `ScrollReveal`, and wrap the inner container.

**Example** for `pricing.tsx`:

Change:
```tsx
<section id="services" className="bg-ink py-24 md:py-32">
  <div className="mx-auto max-w-[1200px] px-6 md:px-10">
    {/* ... */}
  </div>
</section>
```

To:
```tsx
<section id="services" className="bg-ink py-24 md:py-32">
  <ScrollReveal>
    <div className="mx-auto max-w-[1200px] px-6 md:px-10">
      {/* ... */}
    </div>
  </ScrollReveal>
</section>
```

Hero and Header stay un-revealed (already visible on load). Gallery already uses `"use client"` — just add the wrap. Footer can be wrapped or left alone (low priority).

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Visual check**

Open `http://localhost:3000` and scroll slowly down. Expected:
- Each section content fades in + lifts up by 6px as it enters the viewport
- With `prefers-reduced-motion: reduce` set in OS / browser, all content appears immediately with no animation

- [ ] **Step 5: Commit**

```bash
git add src/components/scroll-reveal.tsx src/components/sections/*.tsx
git commit -m "feat(motion): add scroll-reveal wrapper that respects reduced-motion"
```

---

## Task 17: Drop Inter font, update metadata, update CLAUDE.md

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Replace the entire contents of `src/app/layout.tsx`**:

```tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { site } from "@/lib/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    title: site.name,
    description: site.description,
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-ink text-fg antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Update `CLAUDE.md`** — replace the "Stack" and "Architecture" sections with versions that reflect the new structure. Open `CLAUDE.md` and make the following edits:

Replace the **Stack** bullet about Tailwind v4 with:
```md
- **Tailwind CSS v4** — no `tailwind.config.*`. Design tokens (`--color-ink`, `--color-lime`, `--color-surface`, etc.) live in `src/app/globals.css` under `@theme inline`. shadcn primitives consume those via aliases (`--color-primary` → `--color-lime`, etc.) so you don't need to override components — change the token.
```

Add a new section after "Architecture" called **Visual system**:
```md
## Visual system

The site uses a **dark-only Direction A palette**: Ink `#0A0F0D` background, Surface `#11181A` cards, Lime `#C6FF5B` accent, white-mint `#F4FFF5` text. Headlines use Geist Display weight 800–900 with negative tracking; kicker labels use Geist Mono uppercase at `letter-spacing: 0.25em`. Motion is disciplined: scroll fade-up via `<ScrollReveal>`, hover scale 1.02, sticky mobile CTA. All animations honor `prefers-reduced-motion`.

Global components:
- `<Wordmark />` — typographic logo (no image)
- `<OpenNowBadge />` — live "Abierto / Cerrado" pill driven by `useOpenNow`
- `<StickyMobileCTA />` — appears after hero on mobile
- `<ScrollReveal>` — wraps section content for fade-up entrance
```

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: `✓ Compiled successfully`. The Inter font import warning should be gone.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx CLAUDE.md
git commit -m "chore(layout): drop unused Inter font and update CLAUDE.md visual notes"
```

---

## Task 18: Final QA pass

Manual checks. No commits — just verify the system works end-to-end.

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Desktop pass (1280×800)**

- Hero: gradient + grid render, headline correct size, OpenNowBadge state correct for current time, both CTAs work
- Pricing: 3 cards, middle one elevated with "Más popular" pill, all 3 CTAs open WhatsApp with correct prefilled message
- Features: 2×2 grid, 4 features including new "Iluminación profesional", lime icons
- Gallery: 3+2 mosaic, click any tile opens lightbox, ← / → / ESC all work, counter updates
- Testimonials: 3 cards, lime stars, dark backgrounds
- Visit: address shows correctly, OpenNowBadge pill renders, today's row in hours table is highlighted lime, "Cómo llegar" opens the maps short URL
- CTA: urgent copy, single lime CTA + email text link
- Footer: wordmark, social pills, hours summary, nav links

- [ ] **Step 3: Mobile pass (375×667)**

- Header collapses to hamburger; Sheet menu opens with all 5 links + "Reservar →" CTA
- Hero text scales down (clamp), CTAs stack
- Pricing cards stack vertically
- Features goes 1-col
- Gallery goes 2-col
- Testimonials stack
- Visit stacks (info on top, map below)
- **Sticky CTA bar** slides up after passing hero, stays visible to bottom

- [ ] **Step 4: Time-of-day check**

Manually verify the `OpenNowBadge`:
- Currently inside 3pm–9pm → "ABIERTO AHORA · CIERRA 9 PM" (lime)
- Before 3pm same day → "CERRADO · ABRE HOY 3 PM" (warn yellow)
- After 9pm or anytime not in range → "CERRADO · ABRE MAÑANA 3 PM" (warn yellow)

Easiest test: change your system clock or temporarily edit `businessHours.open.hour` in `site-config.ts` to a different value (revert before committing).

- [ ] **Step 5: Reduced-motion check**

In the OS / browser, enable "Reduce motion". Reload. Expected: ScrollReveal sections appear immediately. OpenNowBadge dot does not pulse. Hover scale still works (CSS transition is short enough to not be jarring).

- [ ] **Step 6: Final build + lint**

Run:
```bash
npm run build
npm run lint
```
Expected: build succeeds, lint clean.

- [ ] **Step 7: Push (when ready)**

Wait for user approval before pushing. The redesign is complete locally.

---

## Plan self-review

Spec coverage check:
- Design system tokens → Task 1 ✓
- `OpenNowBadge` (3 states) → Tasks 3 + 4 ✓
- `Wordmark` replacing logo → Task 5 ✓
- All 9 sections rebuilt → Tasks 6, 7, 8, 9, 10, 11, 12, 13, 14 ✓
- `StickyMobileCTA` → Task 15 ✓
- Scroll fade-up motion + reduced-motion → Task 16 ✓
- Drop Inter, update CLAUDE.md → Task 17 ✓
- Manual QA across desktop, mobile, time-of-day, reduced-motion → Task 18 ✓
- Map embed fallback when `mapEmbedUrl` is empty → Task 12 ✓
- Spanish-only `lang="es"` → Task 17 ✓
- Dark-only (`color-scheme: dark`, html `className="dark"`) → Tasks 1 + 17 ✓
- New `navLinks` array including `gallery` and `visit` → Task 6 ✓

Placeholder scan: no "TBD", "TODO", "implement later" in any code block. Open items from the spec (trust strip numbers, 4th feature copy, `mapEmbedUrl`) are documented in their respective task notes — they're product decisions, not engineering placeholders.

Type-consistency check: `OpenNowState` discriminated union used in Task 3 matches consumption in Task 4. `navLinks` ids (`about`, `services`, `gallery`, `testimonials`, `visit`) match section ids in Tasks 7–14. `GalleryItem` type defined in Task 2 matches consumption in Task 10. `businessHours` shape defined in Task 2 matches consumption in Tasks 3 and 14.

All clean.
