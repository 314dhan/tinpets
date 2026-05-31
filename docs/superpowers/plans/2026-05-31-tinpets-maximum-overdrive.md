# TinPets Maximum Overdrive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform TinPets landing page into a premium, cinematic experience using colorize + animate + bolder + delight + overdrive skills.

**Architecture:** Pure vanilla HTML/CSS/JS, no build tools. Changes span 3 files only: `index.html` (structure), `css/styles.css` (all visual styles + animations), `js/script.js` (orchestration, interactions). Each task targets one concern and can be verified immediately by opening `index.html` in a browser.

**Tech Stack:** HTML5, CSS (OKLCH colors, scroll-driven animations, clip-path, @keyframes), Vanilla JS (IntersectionObserver, Web Animations API, mousemove), Google Fonts (Playfair Display added), Bootstrap 5 (kept for grid/responsive only)

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html` | Structure: font link, hero mesh div + particles, features grid restructure, testimonials 3-card markup, pricing badge |
| `css/styles.css` | All visual styles: OKLCH tokens, Playfair typography, section layouts, @keyframes, scroll-driven rules, clip-path, ripple, reduced-motion |
| `js/script.js` | Behaviour: page-load orchestration, IntersectionObserver reveals, cursor trail, 3D tilt, button ripple |

---

## Task 1: CSS Color Tokens

**Files:**
- Modify: `css/styles.css` (lines 1–7, `:root` block)

- [ ] **Step 1: Replace `:root` color variables**

Replace the existing `:root` block at the top of `css/styles.css`:

```css
:root {
  --primary:        oklch(58% 0.24 25);
  --primary-light:  oklch(72% 0.20 25);
  --primary-muted:  oklch(85% 0.06 25);
  --accent:         oklch(68% 0.14 192);
  --accent-light:   oklch(78% 0.10 192);
  --dark:           oklch(17% 0.025 25);
  --dark-secondary: oklch(22% 0.025 25);
  --surface:        oklch(97% 0.012 60);
  --surface-tinted: oklch(94% 0.018 60);
  --text-primary:   oklch(15% 0.02 25);
  --text-muted:     oklch(52% 0.02 25);
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
}
```

- [ ] **Step 2: Update any hardcoded hex references**

Find and replace in `css/styles.css`:
- `background-color: var(--accent-color)` in `#press` → `background-color: var(--surface-tinted)`
- `background-color: var(--light-color)` in `#features` → `background-color: var(--surface)`
- `background-color: var(--dark-color)` anywhere → `background-color: var(--dark)`
- `color: var(--dark-color)` anywhere → `color: var(--text-primary)`
- `var(--primary-color)` anywhere → `var(--primary)`
- `var(--secondary-color)` anywhere → `var(--primary-light)`
- `#1a1f24` in `.btn-primary:hover` → `var(--dark-secondary)`
- `#3A4750` in `#cta` gradient → `var(--dark-secondary)`

- [ ] **Step 3: Update `body` base styles**

Replace the `body` rule:

```css
body {
  font-family: 'Poppins', sans-serif;
  overflow-x: hidden;
  color: var(--text-primary);
  background-color: var(--surface);
}
```

- [ ] **Step 4: Verify**

Open `index.html` in browser. Page should render — colors will shift slightly warmer/deeper. No layout breaks. DevTools console: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add css/styles.css
git commit -m "feat: update color system to OKLCH warm palette"
```

---

## Task 2: Typography — Add Playfair Display

**Files:**
- Modify: `index.html` (line 12, font `<link>` tag)
- Modify: `css/styles.css` (heading rules, hero title, section headings)

- [ ] **Step 1: Add Playfair Display to font link in `index.html`**

Replace the existing Google Fonts `<link>` (line 12) with:

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Poppins:wght@300;400;500;600;700&family=Fredoka+One&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Update heading font stack in `css/styles.css`**

Replace the existing `h1, h2, h3, h4, h5, h6` rule:

```css
h1, h2, h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
}

h4, h5, h6 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
}
```

- [ ] **Step 3: Update hero title size**

Replace `.hero-title` rule:

```css
.hero-title {
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: white;
}
```

- [ ] **Step 4: Update section heading sizes**

After the `.hero-title` rule, add:

```css
.section-heading {
  font-size: clamp(2rem, 4vw, 3.2rem);
  letter-spacing: -0.01em;
  line-height: 1.15;
}
```

Then in `index.html`, add class `section-heading` to the `<h2>` in features, testimonials, pricing, and CTA sections:
- `<h2 class="display-4 mb-3 section-heading">Why Choose TinPets?</h2>`
- `<h2 class="text-center mb-5 text-white fade-in section-heading">What Pet Owners Say</h2>`
- `<h2 class="display-4 mb-3 section-heading">Simple Pricing</h2>`
- `<h2 class="cta-title fade-in section-heading">Find the True Love of Your Pet's Life Today</h2>`

- [ ] **Step 5: Verify**

Open `index.html` in browser. Headlines should now render in Playfair Display (serif). Hero title should be dramatically larger. Check all section headings changed.

- [ ] **Step 6: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add Playfair Display typography with dramatic scale"
```

---

## Task 3: Navigation Polish

**Files:**
- Modify: `css/styles.css` (`.navbar` and `.navbar.scrolled` rules)
- Modify: `index.html` (navbar `style` attribute)

- [ ] **Step 1: Update nav base style in `index.html`**

Change the nav's inline style from `style="background-color: var(--dark-color);"` to `style="background-color: var(--dark);"`.

- [ ] **Step 2: Replace navbar scrolled rule in `css/styles.css`**

Replace `.navbar.scrolled`:

```css
.navbar.scrolled {
  background-color: oklch(17% 0.025 25 / 0.92) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 10px 0;
  box-shadow: 0 4px 24px oklch(17% 0.025 25 / 0.15);
}
```

- [ ] **Step 3: Verify**

Open `index.html`. Scroll down — nav should blur/tint. Check DevTools console: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: nav scrolled state with warm backdrop blur"
```

---

## Task 4: Hero HTML Structure

**Files:**
- Modify: `index.html` (hero section inner markup)

- [ ] **Step 1: Add mesh overlay and particles to hero**

Replace the `<section id="hero">` block entirely:

```html
<!-- Hero Section -->
<section id="hero">
  <!-- Animated mesh background -->
  <div class="hero-mesh" aria-hidden="true"></div>

  <!-- Floating paw particles -->
  <div class="hero-particles" aria-hidden="true">
    <svg class="particle" style="--x:8%;--delay:0s;--dur:7s;--size:28px" viewBox="0 0 100 85" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="62" rx="22" ry="18"/><ellipse cx="22" cy="40" rx="11" ry="13"/><ellipse cx="78" cy="40" rx="11" ry="13"/><ellipse cx="36" cy="26" rx="10" ry="12"/><ellipse cx="64" cy="26" rx="10" ry="12"/></svg>
    <svg class="particle" style="--x:20%;--delay:1.2s;--dur:9s;--size:18px" viewBox="0 0 100 85" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="62" rx="22" ry="18"/><ellipse cx="22" cy="40" rx="11" ry="13"/><ellipse cx="78" cy="40" rx="11" ry="13"/><ellipse cx="36" cy="26" rx="10" ry="12"/><ellipse cx="64" cy="26" rx="10" ry="12"/></svg>
    <svg class="particle" style="--x:35%;--delay:2.5s;--dur:6.5s;--size:22px" viewBox="0 0 100 85" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="62" rx="22" ry="18"/><ellipse cx="22" cy="40" rx="11" ry="13"/><ellipse cx="78" cy="40" rx="11" ry="13"/><ellipse cx="36" cy="26" rx="10" ry="12"/><ellipse cx="64" cy="26" rx="10" ry="12"/></svg>
    <svg class="particle" style="--x:50%;--delay:0.8s;--dur:8s;--size:16px" viewBox="0 0 100 85" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="62" rx="22" ry="18"/><ellipse cx="22" cy="40" rx="11" ry="13"/><ellipse cx="78" cy="40" rx="11" ry="13"/><ellipse cx="36" cy="26" rx="10" ry="12"/><ellipse cx="64" cy="26" rx="10" ry="12"/></svg>
    <svg class="particle" style="--x:65%;--delay:3.5s;--dur:7.5s;--size:24px" viewBox="0 0 100 85" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="62" rx="22" ry="18"/><ellipse cx="22" cy="40" rx="11" ry="13"/><ellipse cx="78" cy="40" rx="11" ry="13"/><ellipse cx="36" cy="26" rx="10" ry="12"/><ellipse cx="64" cy="26" rx="10" ry="12"/></svg>
    <svg class="particle" style="--x:78%;--delay:1.8s;--dur:10s;--size:20px" viewBox="0 0 100 85" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="62" rx="22" ry="18"/><ellipse cx="22" cy="40" rx="11" ry="13"/><ellipse cx="78" cy="40" rx="11" ry="13"/><ellipse cx="36" cy="26" rx="10" ry="12"/><ellipse cx="64" cy="26" rx="10" ry="12"/></svg>
    <svg class="particle" style="--x:88%;--delay:4s;--dur:6s;--size:14px" viewBox="0 0 100 85" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="62" rx="22" ry="18"/><ellipse cx="22" cy="40" rx="11" ry="13"/><ellipse cx="78" cy="40" rx="11" ry="13"/><ellipse cx="36" cy="26" rx="10" ry="12"/><ellipse cx="64" cy="26" rx="10" ry="12"/></svg>
    <svg class="particle" style="--x:42%;--delay:5s;--dur:8.5s;--size:26px" viewBox="0 0 100 85" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="62" rx="22" ry="18"/><ellipse cx="22" cy="40" rx="11" ry="13"/><ellipse cx="78" cy="40" rx="11" ry="13"/><ellipse cx="36" cy="26" rx="10" ry="12"/><ellipse cx="64" cy="26" rx="10" ry="12"/></svg>
  </div>

  <div class="container" style="position:relative;z-index:2;">
    <div class="row align-items-center">
      <div class="col-lg-6">
        <div class="hero-content">
          <h1 class="hero-title" data-entrance="0">Meet new and interesting pets nearby</h1>
          <p class="lead mb-4" data-entrance="100">The perfect companion for your furry friend is just a swipe away!</p>
          <div class="d-flex flex-wrap gap-3" data-entrance="200">
            <button class="btn btn-primary">
              <i class="fab fa-apple me-2"></i> Download
            </button>
            <button class="btn btn-outline-light">
              <i class="fab fa-google-play me-2"></i> Download
            </button>
          </div>
        </div>
      </div>
      <div class="col-lg-6" data-entrance="150">
        <div class="pet-images-container">
          <img src="images/iphone6.png" alt="TinPets app on iPhone" class="title-image">
          <img src="images/cat.jpg" alt="Happy cat" class="cat-image">
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify structure**

Open `index.html`. Hero should look similar to before (mesh and particles have no CSS yet). No console errors. `data-entrance` attributes visible in DevTools Elements panel.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: hero HTML — mesh overlay, paw particles, entrance data attrs"
```

---

## Task 5: Hero CSS — Mesh, Particles, Entrance

**Files:**
- Modify: `css/styles.css` (hero section rules + new @keyframes)

- [ ] **Step 1: Replace `#hero` and hero-related rules**

Replace the entire hero block (from `/* Hero Section */` through `.cat-image:hover`) with:

```css
/* Hero Section */
#hero {
  background: var(--primary);
  color: white;
  padding: 130px 0 90px;
  position: relative;
  overflow: hidden;
}

/* Animated mesh background */
.hero-mesh {
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(ellipse 55% 45% at 82% 12%, oklch(75% 0.18 35 / 0.55) 0%, transparent 65%),
    radial-gradient(ellipse 45% 55% at 12% 88%, oklch(65% 0.13 192 / 0.45) 0%, transparent 65%),
    radial-gradient(ellipse 38% 48% at 58% 55%, oklch(55% 0.20 15 / 0.35) 0%, transparent 60%);
  animation: heroMesh 14s ease-in-out infinite alternate;
  z-index: 0;
}

@keyframes heroMesh {
  0%   { transform: translate(0%,   0%)   scale(1);    }
  33%  { transform: translate(-3%,  5%)   scale(1.05); }
  66%  { transform: translate(4%,  -3%)   scale(1.03); }
  100% { transform: translate(-2%, -5%)   scale(1.08); }
}

.hero-content {
  position: relative;
  z-index: 2;
}

/* Floating paw particles */
.hero-particles {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.particle {
  position: absolute;
  bottom: -40px;
  left: var(--x, 50%);
  width: var(--size, 20px);
  height: var(--size, 20px);
  fill: white;
  opacity: 0.15;
  animation: floatPaw var(--dur, 7s) var(--ease-out-quart) var(--delay, 0s) infinite;
}

@keyframes floatPaw {
  0%   { transform: translateY(0)   rotate(0deg)   scale(0.8); opacity: 0;    }
  10%  { opacity: 0.15; }
  80%  { opacity: 0.15; }
  100% { transform: translateY(-110vh) rotate(25deg) scale(1.1); opacity: 0;  }
}

/* Hero text */
.hero-title {
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: white;
}

/* Hero images */
.pet-images-container {
  position: relative;
  height: 420px;
}

.title-image {
  width: 58%;
  transform: rotate(25deg);
  position: absolute;
  right: 8%;
  z-index: 1;
  box-shadow: 0 24px 48px oklch(17% 0.025 25 / 0.35);
  border-radius: 20px;
  transition: transform 0.5s var(--ease-out-quart), box-shadow 0.5s var(--ease-out-quart);
}

.cat-image {
  width: 58%;
  transform: rotate(-25deg);
  position: absolute;
  right: 30%;
  z-index: 2;
  box-shadow: 0 24px 48px oklch(17% 0.025 25 / 0.35);
  border-radius: 20px;
  transition: transform 0.5s var(--ease-out-quart), box-shadow 0.5s var(--ease-out-quart);
}

.title-image:hover,
.cat-image:hover {
  transform: rotate(0deg) scale(1.05);
  z-index: 3;
  box-shadow: 0 32px 64px oklch(17% 0.025 25 / 0.45);
}

/* Entrance animation classes */
[data-entrance] {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.7s var(--ease-out-expo),
    transform 0.7s var(--ease-out-expo);
}

body.loaded [data-entrance] {
  opacity: 1;
  transform: translateY(0);
}

body.loaded [data-entrance="0"]   { transition-delay: 0ms;   }
body.loaded [data-entrance="100"] { transition-delay: 100ms; }
body.loaded [data-entrance="150"] { transition-delay: 150ms; }
body.loaded [data-entrance="200"] { transition-delay: 200ms; }
body.loaded [data-entrance="300"] { transition-delay: 300ms; }
```

- [ ] **Step 2: Remove old `.fade-in`, `.delay-1`, `.delay-2`, `.delay-3` rules**

Delete these from `css/styles.css` (bottom of file, `/* Animations */` section):

```css
/* DELETE these: */
@keyframes fadeIn { ... }
.fade-in { ... }
.delay-1 { ... }
.delay-2 { ... }
.delay-3 { ... }
```

- [ ] **Step 3: Remove `fade-in` classes from `index.html` hero section**

The hero elements now use `data-entrance` (done in Task 4). Remove any remaining `class="fade-in"` or `class="fade-in delay-N"` from hero elements only. Leave other sections' `fade-in` classes for now — they'll be replaced in later tasks.

- [ ] **Step 4: Verify**

Open `index.html`. The hero section should show:
- Animated colour blobs moving slowly behind the hero gradient (subtle, not distracting)
- Tiny paw icons floating upward
- Images and text are invisible on page load (will be fixed in Task 6 when JS adds `body.loaded`)
- No console errors

- [ ] **Step 5: Commit**

```bash
git add css/styles.css index.html
git commit -m "feat: hero animated mesh background and floating paw particles"
```

---

## Task 6: JS — Page Load Orchestration & Scroll Reveals

**Files:**
- Modify: `js/script.js` (full rewrite)

- [ ] **Step 1: Replace `js/script.js` entirely**

```javascript
/* ─── Page Load Orchestration ─── */
function initPageLoad() {
  // Trigger entrance animations after first paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.add('loaded');
    });
  });
}

/* ─── Scroll Reveal (IntersectionObserver) ─── */
function initScrollReveal() {
  // Replace legacy fade-in classes with reveal system
  document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.classList.remove('fade-in', 'delay-1', 'delay-2', 'delay-3');
    el.classList.add('reveal');
    el.style.transitionDelay = `${i % 3 * 80}ms`;
  });

  // Add reveal class to section headings not already covered
  document.querySelectorAll('section h2, section h3, .feature-card, .pricing-card, .testimonial-card').forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ─── Navbar scroll class ─── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  initPageLoad();
  initScrollReveal();
  initNavbar();
});
```

- [ ] **Step 2: Add `.reveal` CSS rules to `css/styles.css`**

Add after the entrance animation block:

```css
/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity 0.65s var(--ease-out-expo),
    transform 0.65s var(--ease-out-expo);
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 3: Verify**

Open `index.html`. Hero content should now be visible on page load (body gets `.loaded` class). Scroll down — feature cards, pricing cards, testimonials should fade+slide into view. Check DevTools console: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add js/script.js css/styles.css
git commit -m "feat: page load orchestration and IntersectionObserver scroll reveals"
```

---

## Task 7: Custom Cursor Trail

**Files:**
- Modify: `js/script.js` (add `initCursorTrail` function)
- Modify: `css/styles.css` (add cursor trail styles)

- [ ] **Step 1: Add cursor trail CSS to `css/styles.css`**

Add at the end of the file (before the `@media prefers-reduced-motion` rule if present):

```css
/* Cursor trail */
.cursor-paw {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  width: 20px;
  height: 20px;
  fill: white;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.5);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.cursor-paw.active {
  opacity: 0.7;
  transform: translate(-50%, -50%) scale(1);
}

.cursor-paw.fading {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.4) rotate(20deg);
}
```

- [ ] **Step 2: Add `initCursorTrail` to `js/script.js`**

Add this function before the `document.addEventListener('DOMContentLoaded', ...)` call, and call it from the init block:

```javascript
/* ─── Cursor Paw Trail (hero only) ─── */
function initCursorTrail() {
  // Skip on touch devices and reduced motion
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hero = document.getElementById('hero');
  if (!hero) return;

  const PAW_SVG = `<svg viewBox="0 0 100 85" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="62" rx="22" ry="18"/>
    <ellipse cx="22" cy="40" rx="11" ry="13"/>
    <ellipse cx="78" cy="40" rx="11" ry="13"/>
    <ellipse cx="36" cy="26" rx="10" ry="12"/>
    <ellipse cx="64" cy="26" rx="10" ry="12"/>
  </svg>`;

  const pool = [];
  const MAX = 8;

  function createPaw(x, y) {
    const el = document.createElement('div');
    el.className = 'cursor-paw';
    el.innerHTML = PAW_SVG;
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    document.body.appendChild(el);

    requestAnimationFrame(() => el.classList.add('active'));

    const timer = setTimeout(() => {
      el.classList.add('fading');
      el.classList.remove('active');
      setTimeout(() => el.remove(), 600);
    }, 300);

    pool.push({ el, timer });
    if (pool.length > MAX) {
      const oldest = pool.shift();
      clearTimeout(oldest.timer);
      oldest.el.remove();
    }
  }

  let lastX = 0, lastY = 0, lastTime = 0;

  hero.addEventListener('mousemove', (e) => {
    const now = Date.now();
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 28 && now - lastTime > 60) {
      createPaw(e.clientX, e.clientY);
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
    }
  });
}
```

Also add `initCursorTrail();` inside the `DOMContentLoaded` handler.

- [ ] **Step 3: Verify**

Open `index.html`. Move mouse over hero section — small white paw prints should appear and fade out. No trail outside hero. No console errors.

- [ ] **Step 4: Commit**

```bash
git add js/script.js css/styles.css
git commit -m "feat: paw cursor trail in hero section"
```

---

## Task 8: Features Section Redesign

**Files:**
- Modify: `index.html` (features grid structure)
- Modify: `css/styles.css` (feature card styles)

- [ ] **Step 1: Restructure features grid in `index.html`**

Replace the features `<div class="row g-4">` block:

```html
<div class="row g-4 align-items-stretch">
  <div class="col-md-6 reveal">
    <div class="feature-card feature-card--large">
      <i class="feature-icon fas fa-paw"></i>
      <h3>Easy to Use</h3>
      <p>Our intuitive interface makes it simple for both you and your pet to find new friends with just a few taps.</p>
    </div>
  </div>
  <div class="col-md-3 reveal" style="transition-delay:80ms">
    <div class="feature-card">
      <i class="feature-icon fas fa-users"></i>
      <h3>Active Community</h3>
      <p>Join thousands of pet owners using TinPets to connect their pets with compatible companions.</p>
    </div>
  </div>
  <div class="col-md-3 reveal" style="transition-delay:160ms">
    <div class="feature-card">
      <i class="feature-icon fas fa-heart"></i>
      <h3>Perfect Matches</h3>
      <p>Our advanced algorithm finds the most compatible pets based on personality, breed, and location.</p>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Update feature card CSS in `css/styles.css`**

Replace the `/* Features */` block:

```css
/* Features */
#features {
  padding: 100px 0;
  background-color: var(--surface);
}

.feature-card {
  background: white;
  border-radius: 16px;
  padding: 32px 28px;
  box-shadow: 0 8px 32px oklch(17% 0.025 25 / 0.06);
  transition: transform 0.35s var(--ease-out-quart), box-shadow 0.35s var(--ease-out-quart);
  height: 100%;
  border-top: 3px solid transparent;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease-out-quart);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 48px oklch(17% 0.025 25 / 0.12);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-card--large {
  padding: 40px 36px;
}

.feature-card--large h3 {
  font-size: 1.6rem;
}

.feature-icon {
  font-size: 2.6rem;
  color: var(--primary);
  margin-bottom: 18px;
  display: block;
  transition: transform 0.3s var(--ease-out-quart), color 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.12) rotate(-5deg);
  color: var(--accent);
}
```

- [ ] **Step 3: Remove old `fade-in` classes from features section heading in `index.html`**

Change:
```html
<div class="text-center mb-5 fade-in">
```
to:
```html
<div class="text-center mb-5 reveal">
```

- [ ] **Step 4: Verify**

Open `index.html`. Features section: first card should be wider (spans 2 columns). Hover over cards — gradient line should sweep in from left, icon should rotate slightly. Scroll reveal works. No console errors.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: features section — asymmetric grid and animated cards"
```

---

## Task 9: Testimonials Redesign

**Files:**
- Modify: `index.html` (replace carousel with 3-card grid)
- Modify: `css/styles.css` (testimonial card styles)

- [ ] **Step 1: Replace testimonials section markup in `index.html`**

Replace the entire `<section id="testimonials">` block:

```html
<!-- Testimonials Section -->
<section id="testimonials">
  <div class="container">
    <h2 class="text-center mb-5 text-white reveal section-heading">What Pet Owners Say</h2>
    <div class="row g-4">
      <div class="col-md-4 reveal">
        <div class="testimonial-card">
          <span class="quote-mark">&ldquo;</span>
          <p class="lead mb-4">I no longer have to sniff other dogs for love. I've found the hottest Corgi on TinPets. Woof.</p>
          <div class="d-flex align-items-center gap-3">
            <img src="images/dog-img.jpg" alt="Pebbles" class="testimonial-image">
            <h5 class="mb-0">Pebbles, New York</h5>
          </div>
        </div>
      </div>
      <div class="col-md-4 reveal" style="transition-delay:80ms">
        <div class="testimonial-card">
          <span class="quote-mark">&ldquo;</span>
          <p class="lead mb-4">My dog used to be so lonely, but with TinPets's help, they've found the love of their life. I think.</p>
          <div class="d-flex align-items-center gap-3">
            <img src="images/lady-img.jpg" alt="Beverly" class="testimonial-image">
            <h5 class="mb-0">Beverly, Illinois</h5>
          </div>
        </div>
      </div>
      <div class="col-md-4 reveal" style="transition-delay:160ms">
        <div class="testimonial-card">
          <span class="quote-mark">&ldquo;</span>
          <p class="lead mb-4">As a busy professional, I struggled to socialize my dog. TinPets made it so easy to connect with other owners in my area.</p>
          <div class="d-flex align-items-center gap-3">
            <img src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Jessica" class="testimonial-image">
            <h5 class="mb-0">Jessica L., San Francisco</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Replace testimonial CSS in `css/styles.css`**

Replace the `/* Testimonials */` block:

```css
/* Testimonials */
#testimonials {
  background: linear-gradient(135deg, var(--primary) 0%, oklch(52% 0.20 10) 100%);
  padding: 100px 0;
  color: white;
}

.testimonial-card {
  background: oklch(100% 0 0 / 0.1);
  border-radius: 20px;
  padding: 36px 32px;
  height: 100%;
  position: relative;
  border-top: 3px solid oklch(100% 0 0 / 0.3);
  transition: transform 0.35s var(--ease-out-quart), background 0.35s ease;
}

.testimonial-card:hover {
  background: oklch(100% 0 0 / 0.16);
  transform: translateY(-6px);
}

.quote-mark {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 5rem;
  line-height: 1;
  color: oklch(100% 0 0 / 0.3);
  display: block;
  margin-bottom: -12px;
}

.testimonial-image {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid oklch(100% 0 0 / 0.4);
  flex-shrink: 0;
}
```

- [ ] **Step 3: Verify**

Open `index.html`. Testimonials section: 3 cards side-by-side (stacked on mobile). Large decorative quote marks. Hover lifts cards. Scroll reveal works. No carousel controls visible. No console errors.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: testimonials redesign — 3-card grid with quote marks"
```

---

## Task 10: Press Section Marquee

**Files:**
- Modify: `index.html` (press section inner markup)
- Modify: `css/styles.css` (marquee animation)

- [ ] **Step 1: Wrap press logos in marquee structure in `index.html`**

Replace the `<section id="press">` block:

```html
<!-- Press Section -->
<section id="press">
  <div class="press-marquee-wrapper">
    <div class="press-track">
      <img src="images/TechCrunch.png" alt="TechCrunch" class="press-logo">
      <img src="images/tnw.png" alt="TNW" class="press-logo">
      <img src="images/bizinsider.png" alt="Business Insider" class="press-logo">
      <img src="images/mashable.png" alt="Mashable" class="press-logo">
      <!-- Duplicate for seamless loop -->
      <img src="images/TechCrunch.png" alt="" aria-hidden="true" class="press-logo">
      <img src="images/tnw.png" alt="" aria-hidden="true" class="press-logo">
      <img src="images/bizinsider.png" alt="" aria-hidden="true" class="press-logo">
      <img src="images/mashable.png" alt="" aria-hidden="true" class="press-logo">
    </div>
  </div>
</section>
```

- [ ] **Step 2: Replace press CSS in `css/styles.css`**

Replace the entire `#press` block (and old `.press-logo` styles):

```css
/* Press */
#press {
  background-color: var(--surface-tinted);
  padding: 40px 0;
  overflow: hidden;
}

.press-marquee-wrapper {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

.press-track {
  display: flex;
  align-items: center;
  gap: 64px;
  width: max-content;
  animation: marqueeScroll 20s linear infinite;
}

@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.press-logo {
  height: 36px;
  width: auto;
  filter: grayscale(100%) opacity(0.45);
  transition: filter 0.3s ease, transform 0.3s var(--ease-out-quart);
  flex-shrink: 0;
}

.press-logo:hover {
  filter: grayscale(0%) opacity(1);
  transform: scale(1.08);
}
```

- [ ] **Step 3: Verify**

Open `index.html`. Press logos should scroll continuously from right to left. Hover on a logo pauses filter, shows color. Edges fade with mask. No console errors.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: press section continuous marquee with fade edges"
```

---

## Task 11: Pricing — Popular Badge & 3D Tilt

**Files:**
- Modify: `index.html` (add Most Popular badge to Labrador card)
- Modify: `css/styles.css` (pricing styles, popular badge)
- Modify: `js/script.js` (3D tilt function)

- [ ] **Step 1: Add Most Popular badge to Labrador card in `index.html`**

Replace the Labrador pricing header:
```html
<div class="pricing-header text-center py-4">
  <h3>Labrador</h3>
</div>
```
with:
```html
<div class="pricing-header text-center py-4 pricing-header--popular">
  <span class="popular-badge">Most Popular</span>
  <h3>Labrador</h3>
</div>
```

Also add `pricing-card--popular` class to the Labrador `.pricing-card` div:
```html
<div class="pricing-card pricing-card--popular">
```

- [ ] **Step 2: Update pricing CSS in `css/styles.css`**

Replace the `/* Pricing */` block:

```css
/* Pricing */
#pricing {
  padding: 100px 0;
  background-color: var(--surface);
}

.pricing-card {
  border: none;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 32px oklch(17% 0.025 25 / 0.07);
  transition: transform 0.35s var(--ease-out-quart), box-shadow 0.35s var(--ease-out-quart);
  margin-bottom: 30px;
  transform-style: preserve-3d;
  will-change: transform;
}

.pricing-card:hover {
  box-shadow: 0 20px 48px oklch(17% 0.025 25 / 0.14);
}

.pricing-card--popular {
  box-shadow: 0 12px 40px oklch(58% 0.24 25 / 0.25);
}

.pricing-header {
  background: linear-gradient(135deg, var(--dark) 0%, var(--dark-secondary) 100%);
  color: white;
  padding: 24px 20px;
  position: relative;
}

.pricing-header--popular {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
}

.popular-badge {
  display: inline-block;
  background: white;
  color: var(--primary);
  font-family: 'Poppins', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 100px;
  margin-bottom: 10px;
}

.pricing-body {
  padding: 32px 28px;
  background: white;
}

.price {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--text-primary);
}
```

- [ ] **Step 3: Add `initPricingTilt` to `js/script.js`**

Add before the `DOMContentLoaded` handler, then call it from init:

```javascript
/* ─── Pricing Card 3D Tilt ─── */
function initPricingTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;  // -0.5 to 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    });
  });
}
```

Add `initPricingTilt();` to the `DOMContentLoaded` handler.

- [ ] **Step 4: Verify**

Open `index.html`. Pricing section: Labrador card has "Most Popular" badge and coral gradient header. Move mouse over any pricing card — it should tilt toward cursor in 3D. Mouse leave resets smoothly. No console errors.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css js/script.js
git commit -m "feat: pricing cards — popular badge and 3D mouse tilt"
```

---

## Task 12: CTA Clip-Path & Button Ripple

**Files:**
- Modify: `css/styles.css` (CTA clip-path, button ripple styles)
- Modify: `js/script.js` (ripple function)

- [ ] **Step 1: Update CTA CSS in `css/styles.css`**

Replace the `/* CTA */` block:

```css
/* CTA */
#cta {
  background: linear-gradient(135deg, var(--dark) 0%, var(--dark-secondary) 100%);
  padding: 110px 0 90px;
  color: white;
  clip-path: polygon(0 5%, 100% 0, 100% 100%, 0 100%);
  margin-top: -40px;
}

.cta-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  margin-bottom: 32px;
  letter-spacing: -0.01em;
  line-height: 1.15;
}
```

- [ ] **Step 2: Add button ripple CSS to `css/styles.css`**

Replace the `/* Buttons */` block:

```css
/* Buttons */
.btn-primary {
  background-color: var(--dark);
  border: none;
  padding: 13px 32px;
  border-radius: 50px;
  font-weight: 600;
  transition: background-color 0.25s ease, transform 0.25s var(--ease-out-quart), box-shadow 0.25s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  background-color: var(--dark-secondary);
  transform: translateY(-3px);
  box-shadow: 0 10px 28px oklch(17% 0.025 25 / 0.28);
}

.btn-primary:active {
  transform: translateY(0px);
}

.btn-outline-light {
  border: 2px solid white;
  padding: 11px 28px;
  border-radius: 50px;
  font-weight: 600;
  transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s var(--ease-out-quart);
  position: relative;
  overflow: hidden;
}

.btn-outline-light:hover {
  background-color: white;
  color: var(--primary) !important;
  transform: translateY(-3px);
}

/* Ripple */
.ripple-effect {
  position: absolute;
  border-radius: 50%;
  background: oklch(100% 0 0 / 0.3);
  transform: scale(0);
  animation: ripple 0.6s var(--ease-out-expo) forwards;
  pointer-events: none;
}

@keyframes ripple {
  to { transform: scale(4); opacity: 0; }
}
```

- [ ] **Step 3: Add `initButtonRipple` to `js/script.js`**

Add before the `DOMContentLoaded` handler, then call it from init:

```javascript
/* ─── Button Ripple ─── */
function initButtonRipple() {
  document.querySelectorAll('.btn-primary, .btn-outline-light').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top  - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
}
```

Add `initButtonRipple();` to the `DOMContentLoaded` handler.

- [ ] **Step 4: Verify**

Open `index.html`. CTA section: should have a diagonal top edge (clip-path). Click any button — ripple should spread out from click point. Hover buttons — lift effect. No console errors.

- [ ] **Step 5: Commit**

```bash
git add css/styles.css js/script.js
git commit -m "feat: CTA clip-path diagonal and button ripple effect"
```

---

## Task 13: Footer Polish & Accessibility Final Pass

**Files:**
- Modify: `css/styles.css` (footer, social icons, reduced-motion)

- [ ] **Step 1: Replace footer CSS in `css/styles.css`**

Replace the `/* Footer */` block:

```css
/* Footer */
#footer {
  background-color: var(--dark);
  color: oklch(90% 0.01 60);
  padding: 64px 0 24px;
}

#footer h3, #footer h4 {
  color: white;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background-color: oklch(100% 0 0 / 0.08);
  color: white;
  border-radius: 50%;
  margin: 0 8px 16px;
  transition: background-color 0.25s ease, transform 0.25s var(--ease-out-quart);
  text-decoration: none;
}

.social-icon:hover {
  background-color: var(--primary);
  transform: translateY(-4px);
  color: white;
}
```

- [ ] **Step 2: Add `prefers-reduced-motion` block to `css/styles.css`**

Add at the very end of `css/styles.css`:

```css
/* Accessibility — reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .hero-mesh,
  .particle,
  .press-track {
    animation: none !important;
  }

  .reveal,
  [data-entrance] {
    opacity: 1 !important;
    transform: none !important;
  }
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .hero-title { font-size: clamp(2.4rem, 5vw, 3.5rem); }
}

@media (max-width: 768px) {
  .pet-images-container {
    height: auto;
    margin-top: 50px;
  }

  .title-image,
  .cat-image {
    position: static;
    transform: rotate(10deg);
    width: 80%;
    margin-bottom: -60px;
  }

  .cat-image {
    transform: rotate(-10deg);
    margin-left: 20%;
  }

  #cta {
    clip-path: polygon(0 2%, 100% 0, 100% 100%, 0 100%);
  }
}
```

- [ ] **Step 3: Remove stale `/* Responsive Adjustments */` block**

Delete the old `@media` blocks at the bottom of `css/styles.css` (they're now replaced by the block above).

- [ ] **Step 4: Final smoke test**

Open `index.html` in browser and check each section:
- [ ] Hero: mesh animates, particles float, text enters on load, cursor trail works on mousemove
- [ ] Features: asymmetric grid, gradient line on hover
- [ ] Testimonials: 3 cards, quote marks, no carousel
- [ ] Press: logos scroll continuously
- [ ] Pricing: Popular badge on Labrador, 3D tilt on hover
- [ ] CTA: diagonal top edge, button ripple on click
- [ ] Footer: warm dark, social hover
- [ ] Resize to mobile: layout adapts, no overflow
- [ ] DevTools console: 0 errors

- [ ] **Step 5: Final commit**

```bash
git add css/styles.css js/script.js index.html
git commit -m "feat: footer polish, accessibility reduced-motion, responsive final pass"
```

---

## Self-Review Notes

**Spec coverage check:**
- ✅ OKLCH color tokens (Task 1)
- ✅ Playfair Display typography (Task 2)
- ✅ Nav backdrop blur (Task 3)
- ✅ Hero animated mesh + particles HTML (Task 4)
- ✅ Hero CSS mesh + particles + entrance (Task 5)
- ✅ Page load orchestration + scroll reveals (Task 6)
- ✅ Cursor paw trail (Task 7)
- ✅ Features asymmetric grid (Task 8)
- ✅ Testimonials 3-card redesign (Task 9)
- ✅ Press marquee (Task 10)
- ✅ Pricing 3D tilt + popular badge (Task 11)
- ✅ CTA clip-path + button ripple (Task 12)
- ✅ Footer + reduced-motion + responsive (Task 13)

**No placeholders present.** All steps contain actual working code.

**Type consistency:** CSS custom properties (`--primary`, `--accent`, `--dark`, `--ease-out-expo`, `--ease-out-quart`) defined in Task 1 and used consistently throughout. JS function names (`initPageLoad`, `initScrollReveal`, `initNavbar`, `initCursorTrail`, `initPricingTilt`, `initButtonRipple`) each unique, all called from `DOMContentLoaded`.
