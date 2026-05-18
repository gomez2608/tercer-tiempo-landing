# Tercer tiempo Ubaté — full visual redesign (2026-05-18)

## Goal

Replace the current generic-template-looking landing page with a distinctive, current visual identity that converts WhatsApp clicks. Direction: **"Modern Bold" — dark base, oversized typography, neon-green accent, sports-brand energy.** Architecture from the prior refactor (`src/components/sections/`, `src/lib/site-config.ts`, `src/lib/images.ts`, `src/hooks/use-section-navigation.ts`) stays. Visual layer is rebuilt from scratch.

## Out of scope

- Real booking widget / availability backend (locked in as future work)
- Light mode (dark-only)
- English / language toggle (Spanish-only)
- Logo illustration (replaced by typographic wordmark)
- Tests (none in repo today; not adding for a marketing page)

## Design system

### Color tokens (Tailwind v4 `@theme inline` in `globals.css`)

| Token | Hex | Role |
|---|---|---|
| `--color-ink` | `#0A0F0D` | Page background |
| `--color-surface` | `#11181A` | Card / section background |
| `--color-elevated` | `#1A2426` | Raised surfaces (nav blur, lightbox) |
| `--color-lime` | `#C6FF5B` | Primary CTA, accent, headline lime words |
| `--color-lime-deep` | `#8FC92E` | Lime hover state |
| `--color-fg` | `#F4FFF5` | Body text |
| `--color-muted` | `#6B7775` | Secondary text |
| `--color-hairline` | `rgba(255,255,255,0.08)` | Borders |
| `--color-status-warn` | `#FFD43B` | "Cerrado / abre mañana" badge |
| `--color-status-closed` | `#FF6B5B` | "Cerrado" badge |

Existing `--background`, `--foreground`, `--primary`, etc. are rewritten to point at these tokens so shadcn primitives pick up the new palette without component-level overrides.

### Typography

| Style | Font | Size | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|---|
| Display 1 (hero) | Geist | 96px → clamp(56, 8vw, 112) | 900 | -0.045em | 0.88 |
| Display 2 | Geist | 64px | 800 | -0.035em | 0.92 |
| H1 (section title) | Geist | 40px | 800 | -0.02em | 1.0 |
| H2 | Geist | 28px | 700 | -0.015em | 1.1 |
| Body | Geist | 16px | 400 | normal | 1.55 |
| Mono kicker | Geist Mono | 11px | 500 | 0.25em uppercase | 1.0 |

All fonts already loaded in `layout.tsx` (Geist, Geist Mono, Inter). Inter becomes unused — remove from layout.

### Spacing & radius

- Page max-width: `1200px` content, full-bleed sections
- Section vertical padding: `py-24` desktop, `py-16` mobile
- Card radius: `rounded-2xl` (16px)
- CTA radius: `rounded-full`
- Border: 1px hairline `--color-hairline`

### Motion

- Scroll fade-up: 400ms ease-out, 24px translate. Triggered with `IntersectionObserver` (one-shot, no re-trigger).
- Hover scale: 1.02 on cards and CTAs, 150ms ease-out.
- Sticky CTA on mobile: slides up from bottom 250ms when hero leaves viewport.
- `prefers-reduced-motion: reduce` disables every animation; elements appear in place.
- No parallax, no scroll-jacking, no cursor effects.

## Component additions

### `OpenNowBadge` (new, in `src/components/open-now-badge.tsx`)

Client component. Reads the current local time, compares against `BUSINESS_HOURS` from `site-config.ts`, renders one of:

- `● ABIERTO AHORA · CIERRA A LAS 9:00 PM` (lime, pulsing dot) — when inside hours
- `● CERRADO · ABRE HOY A LAS 3:00 PM` (warn yellow) — same day, before opening
- `● CERRADO · ABRE MAÑANA A LAS 3:00 PM` (warn yellow) — after closing

Uses `useEffect` + `setInterval(60_000)` to recompute every minute. Initial render is a placeholder skeleton to avoid hydration mismatch.

### `GalleryMosaic` (new, in `src/components/sections/gallery.tsx`)

Server component for the grid. Click handlers delegate to a sibling `GalleryLightbox` client component that uses Radix Dialog (already in `@radix-ui/react-dialog`).

- Grid: `grid-cols-6 grid-rows-2` desktop with tiles spanning `col-span-{2,3}` and rows. Mobile collapses to `grid-cols-2` with `aspect-square` tiles, full set scrollable.
- Tiles render `next/image` with `priority={false}` and `sizes` hints.
- Lightbox: full-screen overlay, prev/next arrows, keyboard nav (arrow keys + ESC), tap-to-close.

### `HoursTable` + `LocationMap` (new, in `src/components/sections/visit.tsx`)

- `HoursTable`: renders the schedule from `BUSINESS_HOURS`. Highlights "today" row with lime background. Re-uses `OpenNowBadge`.
- `LocationMap`: Google Maps `<iframe>` embed centered on Carrera 9 #10-51, Ubaté. `loading="lazy"` + `referrerpolicy="no-referrer-when-downgrade"`. Below the iframe: link to the existing `maps.app.goo.gl/WXS2wrak5dmdEYWk6` short URL for "Cómo llegar".

### `StickyMobileCTA` (new, in `src/components/sticky-mobile-cta.tsx`)

Client component. Visible only at `< md` breakpoint. Slides up after `IntersectionObserver` detects the hero has fully left the viewport. Single button: "Reservar por WhatsApp →".

### Wordmark (replaces logo image)

New `src/components/wordmark.tsx`. Pure SVG/CSS — no image file. "Tercer **tiempo**" with the second word in lime, optional kicker line "UBATÉ · COLOMBIA" below in Geist Mono. Renders responsively at any size.

## Section-by-section spec

| # | Section | id | Status |
|---|---|---|---|
| 01 | Header / Nav | (sticky, no id) | Rewrite |
| 02 | Hero | `#about` | Rewrite |
| 03 | Pricing / Servicios | `#services` | Restyle |
| 04 | Características / Features | `#features` | Restyle, drop side image |
| 05 | Galería | `#gallery` | **New** |
| 06 | Testimonios | `#testimonials` | Restyle |
| 07 | Visítanos (hours + location) | `#visit` | **New** |
| 08 | CTA final | `#contact` | Restyle, sharper copy |
| 09 | Footer | (no id) | Restyle |

### 01 · Header
Sticky, transparent over hero, gains backdrop-blur background after scroll. Wordmark on the left, mono-uppercase link list center-right, lime pill CTA "Reservar →" on the far right. Mobile: wordmark + hamburger → Sheet.

### 02 · Hero
- Full-bleed dark background: `radial-gradient(ellipse at 70% 30%, rgba(198,255,91,.18), transparent 55%)` over `#0A0F0D` base. Subtle 32px grid overlay masked with a radial gradient. **No photo background** in v1 — pure CSS. Can be swapped for a real photo later.
- `OpenNowBadge` as eyebrow.
- Display 1 headline: **"Tu cancha." / "Al 100."** with the second line in lime. The headline is editable in `site-config.ts` (single property `hero.headline`).
- Sub: "La sintética cubierta de Ubaté, abierta todos los días de 3 a 9. Reserva en un mensaje."
- Primary CTA: "Reservar por WhatsApp →" (lime). Secondary: "Cómo llegar" (ghost outline).
- Bottom trust strip: "★ 4.9 / 5 · +500 partidos jugados · Carrera 9 #10-51". **Numbers are placeholders** — Sebastián to replace with real values, or this strip is removed if there's no source.

### 03 · Pricing
Three cards in a row (stack on mobile). Middle card "Reserva" is elevated (lime border, "Más popular" pill, slightly larger). Each card: title, description, price headline (large, lime), bullet list with lime checkmarks, single lime CTA opening WhatsApp with plan-specific message. Reads from `plans` array in `site-config.ts` — no change to data shape.

### 04 · Features
Drop the side-by-side photo layout. New: 2×2 grid of feature cards. Each card: lime icon (Lucide), title (H2 weight), short description. Drop `balon.jpg` from imports. Add a 4th feature to fill the grid — proposed: **"Iluminación profesional"** ("LED de alta potencia para jugar tan bien de noche como de día"). Sebastián to confirm or replace.

### 05 · Galería (new)
- Section kicker "LA CANCHA" + title "En **acción**."
- Mosaic per `GalleryMosaic` spec above.
- Image set: 5 hero tiles in the grid + up to 9 more in the lightbox set. Source mix:
  - Reuse `fondo.jpg`, `balon.jpg`, `testimonial-andres.png`, `testimonial-santiago.jpg`, `testimonial-luis.jpg` where appropriate
  - Add curated Unsplash photos (license-free): synthetic-pitch night shots, indoor 5-a-side, player closeups. Files dropped into `src/app/imgs/gallery/` with kebab-case names.
- All assets defined in `src/lib/site-config.ts` `gallery` array.

### 06 · Testimonios
Same data, restyled cards: dark `--color-surface` background, lime stars, mono-uppercase role line, larger quote. Photos circular, 56px.

### 07 · Visítanos (new)
- Two-column layout. Left: kicker "VISÍTANOS", title "Carrera 9 **#10-51**.", status badge row (`OpenNowBadge` + `Cubierta` + `Sintética`), `HoursTable`, address card with "Cómo llegar" lime CTA.
- Right: `LocationMap` iframe embed.
- Mobile: stacks; map appears below the info block.
- **Open questions resolved as:** drop "Parqueadero" badge (unknown) and drop "Copiar dirección" button (cleaner). Easy to add back in `site-config.ts` if Sebastián wants.

### 08 · CTA final
- Headline: "¿Listo para reservar?" → tightened to "El cupo de esta noche se llena rápido."
- One primary lime CTA: "Reservar por WhatsApp →".
- Secondary text link below: "o escríbenos a [email]".
- Drops the outline "Contáctanos" button — duplicates the email link.

### 09 · Footer
- Three columns desktop: wordmark + tagline + social row | hours summary | nav links.
- Bottom rule with © year.
- Drop the small thumbnail logo (uses wordmark text instead).

## Site config additions (`src/lib/site-config.ts`)

```ts
export const businessHours = {
  // 24-hour times, applies every day of the week
  open: { hour: 15, minute: 0 },   // 3:00 PM
  close: { hour: 21, minute: 0 },  // 9:00 PM
} as const;

export const location = {
  street: "Carrera 9 #10-51",
  city: "Ubaté",
  country: "Colombia",
  mapsUrl: "https://maps.app.goo.gl/WXS2wrak5dmdEYWk6",
  // Embed URL derived from the place; verified at build time
  mapEmbedUrl: "https://www.google.com/maps/embed?...", // to be filled
} as const;

export const hero = {
  headline: { line1: "Tu cancha.", line2: "Al 100." },
  sub: "La sintética cubierta de Ubaté, abierta todos los días de 3 a 9. Reserva en un mensaje.",
  trust: {
    rating: 4.9,
    matchesPlayed: 500,
  },
} as const;

export const gallery = [
  { src: "/* import */", alt: "...", caption: "Nocturna" },
  // ...
] as const;
```

The existing `plans`, `testimonials`, `navLinks` arrays stay, with minor copy edits to match the new tone.

## File structure changes

```
src/
├── app/
│   ├── layout.tsx              # Drop Inter font, keep Geist + Geist Mono
│   ├── page.tsx                # Add <Gallery />, <Visit />, <StickyMobileCTA />
│   ├── globals.css             # Rewrite @theme tokens, drop .dark variant (dark is default)
│   └── imgs/
│       └── gallery/            # NEW — curated stock + reused photos
├── components/
│   ├── open-now-badge.tsx      # NEW
│   ├── sticky-mobile-cta.tsx   # NEW
│   ├── wordmark.tsx            # NEW (replaces images.logo usage)
│   └── sections/
│       ├── header.tsx          # Rewrite for new nav style
│       ├── hero.tsx            # Rewrite (CSS background, no photo)
│       ├── pricing.tsx         # Restyle (no structural change)
│       ├── features.tsx        # Drop side image, 2x2 grid, +1 feature
│       ├── gallery.tsx         # NEW (GalleryMosaic + GalleryLightbox)
│       ├── testimonials.tsx    # Restyle
│       ├── visit.tsx           # NEW (HoursTable + LocationMap)
│       ├── cta.tsx             # Restyle, sharper copy
│       └── footer.tsx          # Restyle
├── hooks/
│   ├── use-section-navigation.ts
│   └── use-open-now.ts         # NEW — pure logic, returns {state, label}
└── lib/
    ├── site-config.ts          # Add businessHours, location, hero, gallery
    ├── images.ts               # Add gallery imports
    └── utils.ts                # unchanged
```

Files removed: nothing further (the prior refactor already cleaned this up).

## Accessibility

- Color contrast: lime on ink = 12.4:1 (passes AAA). White on ink = 18.5:1 (passes AAA).
- `OpenNowBadge` and `StickyMobileCTA` use `aria-live="polite"` for state changes.
- Gallery lightbox traps focus, ESC closes, has `role="dialog"` (Radix handles this).
- Every image has descriptive `alt`. Decorative-only elements use `aria-hidden`.
- `prefers-reduced-motion` honored for all animations.
- Map iframe gets `title="Mapa de Tercer tiempo Ubaté"`.

## Performance

- No image background in hero → faster LCP (CSS gradient renders instantly).
- Gallery images use `next/image` with proper `sizes` hints. Lightbox images preloaded on hover.
- Map iframe `loading="lazy"` — defers until scrolled near.
- Wordmark is SVG inline — zero network cost.
- Drop unused Inter font import (saves ~15KB).

## Non-goals / open items

1. **Hero photo background:** v1 ships with CSS gradient only. When Sebastián provides real night-shot photos, swap in a `<Image priority>` with the same overlay.
2. **Real Google Maps embed URL:** the embed `iframe src` will be derived from `maps.app.goo.gl/WXS2wrak5dmdEYWk6` at implementation time. If it can't be resolved cleanly, the section falls back to a "Ver en Maps →" CTA over a styled placeholder.
3. **4th feature copy:** "Iluminación profesional" is proposed. Sebastián to confirm or replace.
4. **Trust strip numbers (4.9 / +500):** placeholders. Replace with real numbers or drop the strip entirely.
5. **Parking + "Copiar dirección":** dropped from v1. Re-add via `site-config.ts` if Sebastián wants.

## Implementation order (high level)

1. Rewrite `globals.css` design tokens
2. Replace logo with `<Wordmark />`
3. Rebuild `Header` + `Hero` (most visible, easiest to verify)
4. Restyle `Pricing` + `Features` + `Testimonials` + `Footer` + `CTA` (no new components needed)
5. Build `OpenNowBadge`, `useOpenNow` hook
6. Build `Gallery` section + `GalleryLightbox`
7. Build `Visit` section (`HoursTable`, `LocationMap`)
8. Build `StickyMobileCTA`
9. Wire scroll fade-up animations
10. Drop Inter font from `layout.tsx`
11. Update `CLAUDE.md` to reflect new structure
12. Manual QA: desktop + mobile, motion off + on, dark only

## Decision log

| Decision | Choice | Rationale |
|---|---|---|
| Visual direction | A · Modern Bold | User selected over Warm Community / Editorial Minimal |
| Booking flow | WhatsApp-only (no widget) | Out of scope per user; future work |
| New sections | Galería + Horarios + Ubicación | User selected; FAQ/Rules/About dropped |
| Imagery | Mix stock + existing | User preference; avoids photo-shoot dependency |
| Logo | Typographic wordmark (new) | Current "Bare Organics" SVG is a template artifact |
| Light mode | Not supported | Dark-only matches Direction A; doubles work otherwise |
| Language | Spanish only | Business is in Colombia, single audience |
| Hero background | CSS gradient (no photo) v1 | Faster LCP; swap later when real photos exist |
| Parking badge | Dropped | Unknown; default to safer |
| "Copiar dirección" button | Dropped | Cleaner; `mapsUrl` CTA already covers this |
