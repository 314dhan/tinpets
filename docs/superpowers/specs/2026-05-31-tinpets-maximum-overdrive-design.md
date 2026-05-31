# TinPets — Maximum Overdrive Redesign

**Date:** 2026-05-31  
**Skills applied:** colorize, animate, bolder, delight, overdrive  
**Brand direction:** Premium & Polished with warmth  
**Files changed:** `css/styles.css`, `index.html`, `js/script.js`

---

## Design Context

TinPets is a pet matchmaking/social landing page for pet owners. Brand personality: **refined, warm, confident**. Elevated consumer app feel — not a generic Bootstrap template, not cold luxury. Premium with genuine personality.

---

## Color System

All colors in OKLCH for perceptual uniformity. No pure black or white.

| Token | Value | Use |
|-------|-------|-----|
| `--primary` | `oklch(58% 0.24 25)` | Deep coral — primary actions, hero gradient |
| `--primary-light` | `oklch(72% 0.20 25)` | Lighter coral for gradients |
| `--accent` | `oklch(68% 0.14 192)` | Rich teal — accent, feature icons |
| `--dark` | `oklch(17% 0.025 25)` | Warm dark — nav, footer, CTA bg |
| `--surface` | `oklch(97% 0.012 60)` | Warm off-white — light section bg |
| `--muted` | `oklch(85% 0.06 25)` | Coral blush — subtle tinted backgrounds |
| `--text-primary` | `oklch(15% 0.02 25)` | Warm near-black for body text |
| `--text-muted` | `oklch(55% 0.02 25)` | Warm gray for secondary text |

All color pairs pass WCAG AA (4.5:1 for text, 3:1 for UI).

---

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Logo | Fredoka One | 400 | 2rem |
| Hero headline | Playfair Display | 700 | `clamp(3.2rem, 7vw, 6rem)` |
| Section headings | Playfair Display | 700 | `clamp(2rem, 4vw, 3.2rem)` |
| Sub-headings | Poppins | 600 | 1.25rem |
| Body | Poppins | 400 | 1rem |
| Labels/caps | Poppins | 500 | 0.75rem uppercase |

Google Fonts load: add Playfair Display to existing `<link>` tag.

---

## Overdrive Techniques

### 1. Animated SVG Turbulence Mesh (Hero Background)
- Inline SVG with `<feTurbulence>` + `<feDisplacementMap>` filter applied to a rect
- CSS `@keyframes` animates `baseFrequency` via `animate` SVG attribute
- Overlaid on hero gradient at 15% opacity — organic, non-distracting
- Fallback: plain gradient (works everywhere without SVG filters)

### 2. Scroll-Driven Section Reveals
- Primary: CSS `animation-timeline: scroll()` with `@keyframes` fade+slide for each section
- Fallback: JS `IntersectionObserver` adds `.revealed` class, CSS handles animation
- All sections: opacity 0 → 1, translateY(30px) → 0, staggered by section index
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo)

### 3. Custom Paw-Print Cursor Trail (Hero Only)
- JS mousemove listener creates SVG paw elements at cursor position
- Elements fade out and scale down over 600ms via CSS transition
- Max 8 trail elements in DOM at once (oldest removed)
- Disabled on touch devices (`pointer: coarse`) and reduced motion

### 4. Clip-Path Section Reveals
- CTA and testimonials sections enter via diagonal `clip-path` sweep
- `clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%)` → full rect on scroll
- Triggered by IntersectionObserver

### 5. 3D Pricing Card Tilt
- JS `mousemove` on `.pricing-card` elements
- `transform: perspective(800px) rotateX(Xdeg) rotateY(Ydeg)` — max ±8deg
- Spring-like CSS transition: `transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)`
- `mouseleave` resets to `rotateX(0) rotateY(0)`
- Disabled on touch, reduced motion

### 6. Floating Paw Particles (Hero)
- 10 SVG paw icons, absolutely positioned in hero
- Each has unique `@keyframes` float path (translateY -80px to -160px, slight X drift)
- Staggered `animation-delay` 0–4s, `animation-duration` 4–8s, `animation-iteration-count: infinite`
- Opacity 0.12–0.2 — subtle, decorative

### 7. Page-Load Orchestration
- Remove `.fade-in` Bootstrap-style class, replace with JS-driven entrance
- `DOMContentLoaded`: add `.loaded` to `<body>`
- CSS: nav (0ms), hero headline (100ms), hero sub (200ms), hero CTAs (300ms), hero images (250ms)
- All use `opacity + translateY` with ease-out-expo

### 8. Button Ripple + Lift
- `.btn-primary` hover: `translateY(-3px)` + box-shadow bloom
- Click: JS adds `.ripple` pseudo-element at click coordinates, animates scale 0→3 + opacity 1→0
- Duration: 100ms press, 600ms ripple fade

### 9. Counter Animations (Stats implied in testimonials/hero)
- If any numeric stats exist, IntersectionObserver triggers count-up animation
- Pure JS, no library

---

## Section-by-Section Changes

### Navigation
- Keep structure, update colors to `var(--dark)` with warm tint
- Scrolled state: `backdrop-filter: blur(12px)` + `background: oklch(17% 0.025 25 / 0.92)` (functional, not decorative glass)

### Hero
- Gradient: `var(--primary)` → `var(--primary-light)` (refined)
- Add animated SVG turbulence layer
- Headline → Playfair Display, dramatic scale
- Add floating paw particles
- Pet images get drop-shadow refinement + subtle float animation
- Paw cursor trail on hover

### Features
- Break identical card grid: first feature spans `col-md-6`, other two share remaining row
- Add teal left-border accent to feature cards instead of just bottom hover
- Icons animate on card hover (scale 1.1 + color shift to accent)
- Staggered clip-path reveal on scroll

### Testimonials
- Replace Bootstrap carousel with CSS-grid 3-card layout
- Large decorative `"` quote mark in `var(--primary)` per card
- Teal top-border accent line on each card
- Cards: `background: rgba(255,255,255,0.08)` on gradient bg — not glassmorphism, just translucency
- Scroll-reveal with stagger

### Press
- Add subtle horizontal scroll marquee animation (CSS `@keyframes scroll-x`) for logo row
- Logos get grayscale filter, color on hover

### Pricing
- "Labrador" card gets `--primary` header (was same as others) + "Most Popular" badge
- 3D tilt interaction
- Price font → Playfair Display
- Deeper `var(--dark)` header on all cards

### CTA
- Diagonal clip-path top edge (instead of flat section break)
- Playfair Display heading, larger scale

### Footer
- Warm dark bg `var(--dark)`, refined spacing
- Social icons: hover fills with `var(--primary)` + scale

---

## Accessibility & Fallbacks

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- All scroll-driven effects fall back to IntersectionObserver
- Custom cursor / particle trail disabled on `pointer: coarse` (touch)
- 3D tilt disabled on touch + reduced motion
- No functionality hidden behind animation states

---

## Files Changed

| File | Changes |
|------|---------|
| `index.html` | Add Playfair Display font link, floating paw particle SVGs in hero, restructure features grid, replace testimonials carousel markup |
| `css/styles.css` | Full color token update, typography scale, all animation @keyframes, scroll-driven rules, clip-path, particle styles, button ripple, 3D card CSS |
| `js/script.js` | Page-load orchestration, IntersectionObserver reveals, custom cursor trail, 3D tilt, button ripple, counter animations |
