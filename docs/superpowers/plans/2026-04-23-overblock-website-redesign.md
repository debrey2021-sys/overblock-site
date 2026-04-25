# OverBlock Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all visual styling on the OverBlock landing page with a Refined Light design system — new color tokens, Plus Jakarta Sans typography, three new section components, and real app screenshots as primary visuals.

**Architecture:** Full visual rebuild preserving the Astro project structure. Old section components (Problem, HowItWorks, VideoSection, Features, Screenshots, FromAPilot) are deleted and replaced with three new components (ValueProps, ProductDeepDive, PrivacyCallout). All design tokens live in `src/styles/global.css`. Scroll animations use a single IntersectionObserver script in BaseLayout. No new dependencies beyond the font package.

**Tech Stack:** Astro 5, scoped `<style>` per component, `@fontsource/plus-jakarta-sans`, IntersectionObserver API, vanilla JS for Nav scroll + FAQ accordion.

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/styles/global.css` | All CSS custom properties (design tokens), reset, animation baseline |
| Modify | `src/layouts/BaseLayout.astro` | Font imports removed (moved to global.css), scroll animation observer script |
| Modify | `src/components/Nav.astro` | Full rewrite: transparent→frosted-glass scroll, anchor nav links, mobile hamburger |
| Modify | `src/components/Hero.astro` | Full rewrite: two-column, rotated phone screenshot, eyebrow + H1 + trust lines |
| Create | `src/components/ValueProps.astro` | Three feature cards with hover states |
| Create | `src/components/ProductDeepDive.astro` | Three-step layout with app screenshots |
| Create | `src/components/PrivacyCallout.astro` | Dark section with centered privacy statement |
| Modify | `src/components/FAQ.astro` | Full rewrite: new questions, CSS grid accordion |
| Modify | `src/components/DownloadCTA.astro` | Full rewrite: dark section, centered CTA |
| Modify | `src/components/Footer.astro` | Full rewrite: minimal, continuous with CTA dark bg |
| Modify | `src/pages/index.astro` | Remove 6 old components, import 3 new ones, correct order |
| Delete | `src/components/Problem.astro` | Replaced by ValueProps |
| Delete | `src/components/HowItWorks.astro` | Merged into ProductDeepDive |
| Delete | `src/components/VideoSection.astro` | Not in new design |
| Delete | `src/components/Features.astro` | Replaced by ValueProps |
| Delete | `src/components/Screenshots.astro` | Merged into ProductDeepDive |
| Delete | `src/components/FromAPilot.astro` | Not in new design |
| Add | `public/mockups/` (6 images) | App screenshots used in Hero and ProductDeepDive |

---

## Task 1: Add App Screenshot Images

**This is a manual step — no code is written here.**

The 6 iPhone mockup images shared during design review need to be saved into the project. Create the directory and save each file with the exact filename specified below.

**Files:**
- Create directory: `public/mockups/`
- Add: `public/mockups/live-solo.png` — Single live earnings screen (CA, $97.53, teal number)
- Add: `public/mockups/setup-light.png` — Setup screen on white background mockup
- Add: `public/mockups/countdown.png` — Countdown screen (amber accent, 00:29:30)
- Add: `public/mockups/live-crew.png` — Two-crew live earnings (CA + FO split screen)
- Add: `public/mockups/setup-dark.png` — Setup screen on dark background mockup
- Add: `public/mockups/session-complete.png` — Session complete screen ($97.76)

- [ ] **Step 1: Create the mockups directory**

```bash
mkdir -p public/mockups
```

- [ ] **Step 2: Save each screenshot from the design review into `public/mockups/` using the exact filenames above**

These are the 6 iPhone mockup images shared in the design conversation. Drag or copy them into `public/mockups/`.

- [ ] **Step 3: Verify all 6 files exist**

```bash
ls public/mockups/
```

Expected output:
```
countdown.png
live-crew.png
live-solo.png
session-complete.png
setup-dark.png
setup-light.png
```

- [ ] **Step 4: Commit**

```bash
git add public/mockups/
git commit -m "feat: add app screenshot mockups for website redesign"
```

---

## Task 2: Install Font and Rewrite global.css

Replace `@fontsource/montserrat` with `@fontsource/plus-jakarta-sans`. Rewrite all CSS custom properties with the new design tokens.

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Install Plus Jakarta Sans, remove Montserrat**

```bash
npm install @fontsource/plus-jakarta-sans
npm uninstall @fontsource/montserrat
```

- [ ] **Step 2: Verify font package installed**

```bash
ls node_modules/@fontsource/ | grep plus
```

Expected: `plus-jakarta-sans`

- [ ] **Step 3: Replace `src/styles/global.css` entirely**

```css
@import '@fontsource/plus-jakarta-sans/400.css';
@import '@fontsource/plus-jakarta-sans/600.css';
@import '@fontsource/plus-jakarta-sans/700.css';
@import '@fontsource/plus-jakarta-sans/800.css';

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --color-bg: #FAFBFC;
  --color-text: #0A0F1E;
  --color-text-muted: #5A6A7E;
  --color-accent: #00C896;
  --color-accent-hover: #00A87A;
  --color-surface: #F0F4F8;
  --color-border: #E4EAF0;
  --color-dark: #0B1120;
  --color-dark-text: #FFFFFF;
  --color-dark-muted: #8A9AB0;
  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
  --max-width: 1120px;
  --section-pad: clamp(72px, 10vw, 120px);
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

.fade-up {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 400ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 4: Run dev server and verify font loaded**

```bash
npm run dev
```

Open `http://localhost:4321` in a browser. All text should render in Plus Jakarta Sans (rounded, geometric sans-serif). If text looks identical to before, the font is not loading — check the `@fontsource` import path.

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css package.json package-lock.json
git commit -m "feat: replace Montserrat with Plus Jakarta Sans, update design tokens"
```

---

## Task 3: Update BaseLayout.astro

Add the scroll animation IntersectionObserver script. Remove the unused `APP_STORE_ID` import if the Smart App Banner meta tag is a placeholder.

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Add IntersectionObserver script before `</body>` in `src/layouts/BaseLayout.astro`**

The file currently ends with `<slot />\n  </body>\n</html>`. Replace the closing body section:

```astro
    <slot />
    <script>
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    </script>
  </body>
</html>
```

- [ ] **Step 2: Verify animations work**

```bash
npm run dev
```

Open `http://localhost:4321`. Scroll down — any element with class `fade-up` should fade in as it enters the viewport. (Currently no elements have this class yet; it will be exercised in later tasks.)

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: `✓ Completed in` with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add scroll animation IntersectionObserver to BaseLayout"
```

---

## Task 4: Rebuild Nav.astro

Transparent nav that transitions to frosted glass on scroll. Logo left, anchor links center, CTA pill right. Mobile hamburger with slide-down drawer.

**Files:**
- Modify: `src/components/Nav.astro`

- [ ] **Step 1: Replace `src/components/Nav.astro` entirely**

```astro
---
import { APP_STORE_URL } from '../config';
---

<nav class="nav" id="nav">
  <div class="nav-inner">
    <a href="/" class="nav-logo">OverBlock</a>
    <ul class="nav-links">
      <li><a href="#features">Features</a></li>
      <li><a href="#how-it-works">How It Works</a></li>
      <li><a href="#privacy">Privacy</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
    <a href={APP_STORE_URL} class="nav-cta">Download on iOS</a>
    <button class="nav-hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="nav-drawer" id="nav-drawer">
    <ul>
      <li><a href="#features">Features</a></li>
      <li><a href="#how-it-works">How It Works</a></li>
      <li><a href="#privacy">Privacy</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
    <a href={APP_STORE_URL} class="nav-cta">Download on iOS</a>
  </div>
</nav>

<script>
  const nav = document.getElementById('nav');
  const hamburger = document.querySelector('.nav-hamburger') as HTMLButtonElement | null;
  const drawer = document.getElementById('nav-drawer');

  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    drawer?.classList.toggle('open');
  });

  drawer?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });
</script>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    transition: background 250ms ease, box-shadow 250ms ease;
  }

  .nav.scrolled {
    background: rgba(250, 251, 252, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 1px 0 var(--color-border);
  }

  .nav-inner {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .nav-logo {
    font-weight: 800;
    font-size: 1.125rem;
    letter-spacing: -0.02em;
    color: var(--color-text);
    margin-right: auto;
  }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 32px;
  }

  .nav-links a {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text-muted);
    transition: color 150ms ease;
  }

  .nav-links a:hover {
    color: var(--color-text);
  }

  .nav-cta {
    font-size: 0.875rem;
    font-weight: 700;
    background: var(--color-accent);
    color: #fff;
    padding: 8px 18px;
    border-radius: 9999px;
    transition: background 150ms ease;
    white-space: nowrap;
  }

  .nav-cta:hover {
    background: var(--color-accent-hover);
  }

  .nav-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }

  .nav-hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--color-text);
    border-radius: 2px;
  }

  .nav-drawer {
    display: none;
    flex-direction: column;
    gap: 16px;
    padding: 16px 24px 24px;
    background: var(--color-bg);
    border-top: 1px solid var(--color-border);
  }

  .nav-drawer.open {
    display: flex;
  }

  .nav-drawer ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .nav-drawer a {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
  }

  @media (max-width: 768px) {
    .nav-links,
    .nav-inner > .nav-cta {
      display: none;
    }

    .nav-hamburger {
      display: flex;
    }
  }
</style>
```

- [ ] **Step 2: Verify nav appearance and scroll behavior**

```bash
npm run dev
```

Open `http://localhost:4321`. Verify:
- Nav is transparent on page load
- Scrolling down 40px triggers the frosted glass transition
- On mobile (< 768px), nav links are hidden and hamburger appears
- Tapping hamburger opens the drawer

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: rebuild Nav with frosted-glass scroll behavior and mobile drawer"
```

---

## Task 5: Rebuild Hero.astro

Two-column layout: content left, rotated app screenshot right. Dark phone on light background is the visual centerpiece.

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Replace `src/components/Hero.astro` entirely**

```astro
---
import { APP_STORE_URL } from '../config';
---

<section class="hero">
  <div class="hero-inner">
    <div class="hero-content fade-up">
      <p class="eyebrow">For airline pilots · Free on iOS</p>
      <h1>Know exactly what you're earning the moment block goes long.</h1>
      <p class="sub">
        Enter your rate and scheduled block time. OverBlock tracks the second overblock begins and shows your earnings in real time — for you and your crew.
      </p>
      <div class="hero-cta">
        <a href={APP_STORE_URL} class="badge-link" aria-label="Download OverBlock on the App Store">
          <img src="/app-store-badge.svg" alt="Download on the App Store" width="156" height="52" />
        </a>
        <span class="trust-micro">Free on the App Store</span>
      </div>
      <p class="trust-line">No account. No tracking. Your data stays on your device.</p>
    </div>
    <div class="hero-visual fade-up" style="transition-delay: 120ms">
      <img
        src="/mockups/live-solo.png"
        alt="OverBlock live earnings screen showing $97.53 updating in real time"
        width="300"
        height="620"
        class="hero-phone"
      />
    </div>
  </div>
</section>

<style>
  .hero {
    padding: calc(var(--section-pad) + 64px) 24px var(--section-pad);
    background: var(--color-bg);
  }

  .hero-inner {
    max-width: var(--max-width);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 64px;
    align-items: center;
  }

  .eyebrow {
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    margin-bottom: 20px;
  }

  h1 {
    font-size: clamp(2.75rem, 6vw, 4.5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--color-text);
    margin-bottom: 24px;
    max-width: 14ch;
  }

  .sub {
    font-size: 1.0625rem;
    color: var(--color-text-muted);
    line-height: 1.7;
    max-width: 480px;
    margin-bottom: 36px;
  }

  .hero-cta {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  .trust-micro {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  .trust-line {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }

  .hero-phone {
    width: 300px;
    border-radius: 36px;
    box-shadow: 0 32px 80px rgba(11, 17, 32, 0.20);
    transform: rotate(3deg);
  }

  @media (max-width: 768px) {
    .hero-inner {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .hero-visual {
      display: flex;
      justify-content: center;
      order: -1;
    }

    .hero-phone {
      width: 220px;
    }

    h1 {
      max-width: none;
    }
  }
</style>
```

- [ ] **Step 2: Verify hero appearance**

```bash
npm run dev
```

Open `http://localhost:4321`. Verify:
- Phone screenshot appears on the right, slightly rotated
- H1 is large (≥ 2.75rem) and bold weight 800
- Eyebrow text is small-caps uppercase above the headline
- On mobile, phone appears above the text content

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: rebuild Hero with two-column layout and rotated phone screenshot"
```

---

## Task 6: Create ValueProps.astro

Three feature cards immediately after the hero. This section has the anchor `id="features"`.

**Files:**
- Create: `src/components/ValueProps.astro`

- [ ] **Step 1: Create `src/components/ValueProps.astro`**

```astro
<section class="value-props" id="features">
  <div class="inner">
    <div class="cards">
      <div class="card fade-up">
        <h3>Live & Accurate</h3>
        <p>Earnings update in real time from the exact second overblock starts. No estimates, no mental math.</p>
      </div>
      <div class="card fade-up" style="transition-delay: 80ms">
        <h3>Setup in Seconds</h3>
        <p>Enter your hourly rate and scheduled block time. That's the entire setup.</p>
      </div>
      <div class="card fade-up" style="transition-delay: 160ms">
        <h3>Private by Design</h3>
        <p>No account required. Your pay data never leaves your device.</p>
      </div>
    </div>
  </div>
</section>

<style>
  .value-props {
    padding: var(--section-pad) 24px;
    background: var(--color-bg);
  }

  .inner {
    max-width: var(--max-width);
    margin: 0 auto;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 32px;
    transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(11, 17, 32, 0.08);
    border-color: rgba(0, 200, 150, 0.3);
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--color-text);
    margin-bottom: 12px;
  }

  p {
    font-size: 0.9375rem;
    color: var(--color-text-muted);
    line-height: 1.65;
  }

  @media (max-width: 768px) {
    .cards {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 2: Temporarily add to `src/pages/index.astro` to preview (will be finalized in Task 12)**

Add `import ValueProps from '../components/ValueProps.astro';` in the frontmatter and `<ValueProps />` after `<Hero />` temporarily.

- [ ] **Step 3: Verify cards appearance**

```bash
npm run dev
```

Open `http://localhost:4321`. Scroll to value props. Verify:
- Three cards in a horizontal row on desktop
- Cards have visible background, border, and generous padding
- Hover causes a subtle lift and faint teal border
- Stacks to single column on mobile

- [ ] **Step 4: Remove the temporary import from index.astro (will be added back properly in Task 12)**

- [ ] **Step 5: Commit**

```bash
git add src/components/ValueProps.astro
git commit -m "feat: create ValueProps section with three feature cards"
```

---

## Task 7: Create ProductDeepDive.astro

Three-step product walkthrough using real app screenshots. This is the visual centerpiece section. Anchor `id="how-it-works"`.

**Files:**
- Create: `src/components/ProductDeepDive.astro`

- [ ] **Step 1: Create `src/components/ProductDeepDive.astro`**

```astro
<section class="product" id="how-it-works">
  <div class="inner">
    <h2 class="fade-up">Three taps. Then watch.</h2>
    <div class="steps">
      <div class="step fade-up">
        <div class="step-header">
          <span class="step-num">01</span>
          <h3>Enter your details</h3>
        </div>
        <img
          src="/mockups/setup-light.png"
          alt="OverBlock setup screen: role, hourly rate, and block time entry"
          width="280"
          height="580"
        />
        <p class="caption">Your role, your rate, your scheduled block time. 30 seconds.</p>
      </div>
      <div class="step fade-up" style="transition-delay: 80ms">
        <div class="step-header">
          <span class="step-num">02</span>
          <h3>Start your session</h3>
        </div>
        <img
          src="/mockups/countdown.png"
          alt="OverBlock countdown screen showing time remaining until overblock begins"
          width="280"
          height="580"
        />
        <p class="caption">OverBlock watches the clock so you don't have to.</p>
      </div>
      <div class="step fade-up" style="transition-delay: 160ms">
        <div class="step-header">
          <span class="step-num">03</span>
          <h3>Watch earnings update live</h3>
        </div>
        <img
          src="/mockups/live-crew.png"
          alt="OverBlock live earnings showing real-time pay for Captain and First Officer"
          width="280"
          height="580"
        />
        <p class="caption">Real-time earnings for you and your crew.</p>
      </div>
    </div>
  </div>
</section>

<style>
  .product {
    padding: var(--section-pad) 24px;
    background: var(--color-surface);
  }

  .inner {
    max-width: var(--max-width);
    margin: 0 auto;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--color-text);
    text-align: center;
    margin-bottom: 64px;
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    align-items: start;
  }

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    text-align: center;
  }

  .step-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .step-num {
    font-size: 4.5rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
    color: rgba(0, 200, 150, 0.15);
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--color-text);
  }

  .step img {
    width: 100%;
    max-width: 260px;
    border-radius: 32px;
    box-shadow: 0 24px 56px rgba(11, 17, 32, 0.14);
  }

  .caption {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    max-width: 220px;
  }

  @media (max-width: 768px) {
    .steps {
      grid-template-columns: 1fr;
      gap: 56px;
    }
  }
</style>
```

- [ ] **Step 2: Verify product section appearance**

```bash
npm run dev
```

Open `http://localhost:4321`. The section is not yet wired into index.astro — temporarily add `import ProductDeepDive from '../components/ProductDeepDive.astro';` and `<ProductDeepDive />` in index.astro to preview, then remove the temporary addition.

Verify:
- Three columns on desktop, single column on mobile
- Step numbers render large and light teal
- Screenshots have consistent sizing and drop shadows

- [ ] **Step 3: Remove temporary import from index.astro**

- [ ] **Step 4: Commit**

```bash
git add src/components/ProductDeepDive.astro
git commit -m "feat: create ProductDeepDive section with 3-step UI walkthrough"
```

---

## Task 8: Create PrivacyCallout.astro

Short, dark section that echoes the app's own background color. Anchor `id="privacy"`.

**Files:**
- Create: `src/components/PrivacyCallout.astro`

- [ ] **Step 1: Create `src/components/PrivacyCallout.astro`**

```astro
<section class="privacy" id="privacy">
  <div class="inner fade-up">
    <h2>Designed around your privacy.</h2>
    <p>
      No account required. No data collected. Your pay information is stored only on your device and never transmitted anywhere.
    </p>
    <ul class="points">
      <li>No account</li>
      <li>No cloud</li>
      <li>No tracking</li>
      <li>No subscription</li>
    </ul>
  </div>
</section>

<style>
  .privacy {
    padding: var(--section-pad) 24px;
    background: var(--color-dark);
  }

  .inner {
    max-width: 680px;
    margin: 0 auto;
    text-align: center;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--color-dark-text);
    margin-bottom: 20px;
  }

  p {
    font-size: 1.0625rem;
    color: var(--color-dark-muted);
    line-height: 1.7;
    margin-bottom: 36px;
  }

  .points {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0;
    list-style: none;
  }

  .points li {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-accent);
    letter-spacing: 0.02em;
  }

  .points li:not(:last-child)::after {
    content: '·';
    margin: 0 10px;
    color: var(--color-dark-muted);
    font-weight: 400;
  }
</style>
```

- [ ] **Step 2: Verify dark section appearance**

```bash
npm run dev
```

Temporarily add `import PrivacyCallout from '../components/PrivacyCallout.astro';` and `<PrivacyCallout />` to index.astro to preview, then remove.

Verify:
- Dark navy background (`#0B1120`) — should match the app screenshots
- Headline is white, body text is muted
- Trust points render in teal accent with separator dots

- [ ] **Step 3: Remove temporary import from index.astro**

- [ ] **Step 4: Commit**

```bash
git add src/components/PrivacyCallout.astro
git commit -m "feat: create PrivacyCallout dark section"
```

---

## Task 9: Rebuild FAQ.astro

CSS grid accordion with 7 real questions. Anchor `id="faq"`.

**Files:**
- Modify: `src/components/FAQ.astro`

- [ ] **Step 1: Replace `src/components/FAQ.astro` entirely**

```astro
---
const faqs = [
  {
    q: "What is overblock pay?",
    a: "Overblock pay is the additional compensation airline pilots earn when a flight's actual block time exceeds the scheduled block time. OverBlock tracks exactly how much you've earned from the moment your block goes long."
  },
  {
    q: "Who is OverBlock for?",
    a: "OverBlock is for airline pilots — Captains and First Officers — who want to know exactly what they're earning during overblock without doing manual calculations mid-flight."
  },
  {
    q: "Do I need to create an account?",
    a: "No. OverBlock requires no account, no sign-in, and no registration of any kind. Open the app and start tracking."
  },
  {
    q: "Is my pay data private and secure?",
    a: "Yes. All data is stored locally on your device. Nothing is transmitted to any server. OverBlock has no backend infrastructure."
  },
  {
    q: "Does it work for a full crew, not just me?",
    a: "Yes. You can add a crewmember so OverBlock tracks real-time earnings for both Captain and First Officer simultaneously."
  },
  {
    q: "How quickly can I start using it?",
    a: "About 30 seconds. Enter your role, hourly rate, and scheduled block time — then tap Start Session."
  },
  {
    q: "Is it really free?",
    a: "Yes. OverBlock is free to download and use. There are no in-app purchases, subscriptions, or ads."
  },
];
---

<section class="faq" id="faq">
  <div class="inner">
    <h2 class="fade-up">Common questions</h2>
    <ul class="faq-list">
      {faqs.map(item => (
        <li class="faq-item fade-up">
          <button class="faq-q" aria-expanded="false">
            {item.q}
            <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="faq-a">
            <p>{item.a}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
</section>

<script>
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-q').forEach(b => b.setAttribute('aria-expanded', 'false'));
      if (!isOpen) btn.setAttribute('aria-expanded', 'true');
    });
  });
</script>

<style>
  .faq {
    padding: var(--section-pad) 24px;
    background: var(--color-bg);
  }

  .inner {
    max-width: 720px;
    margin: 0 auto;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--color-text);
    margin-bottom: 48px;
  }

  .faq-list {
    list-style: none;
    border-top: 1px solid var(--color-border);
  }

  .faq-item {
    border-bottom: 1px solid var(--color-border);
  }

  .faq-q {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 20px 0;
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-sans);
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
    text-align: left;
    transition: color 150ms ease;
  }

  .faq-q:hover {
    color: var(--color-accent);
  }

  .chevron {
    flex-shrink: 0;
    color: var(--color-text-muted);
    transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .faq-q[aria-expanded="true"] .chevron {
    transform: rotate(180deg);
  }

  .faq-a {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: grid-template-rows 250ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .faq-q[aria-expanded="true"] + .faq-a {
    grid-template-rows: 1fr;
  }

  .faq-a p {
    min-height: 0;
    font-size: 0.9375rem;
    color: var(--color-text-muted);
    line-height: 1.7;
    padding-bottom: 20px;
  }
</style>
```

- [ ] **Step 2: Verify FAQ accordion**

```bash
npm run dev
```

Open `http://localhost:4321` (FAQ is already in index.astro). Verify:
- 7 questions render with border dividers
- Clicking a question expands the answer smoothly (grid-template-rows animation)
- Clicking the same question again collapses it
- Clicking a different question collapses the previous one
- Chevron rotates on open

- [ ] **Step 3: Commit**

```bash
git add src/components/FAQ.astro
git commit -m "feat: rebuild FAQ with CSS grid accordion and real questions"
```

---

## Task 10: Rebuild DownloadCTA.astro

Dark section that bookends the hero. Centered layout, white App Store badge variant.

**Files:**
- Modify: `src/components/DownloadCTA.astro`

- [ ] **Step 1: Replace `src/components/DownloadCTA.astro` entirely**

The App Store badge needs to appear white on the dark background. Use CSS `filter: brightness(0) invert(1)` — this converts any opaque dark SVG to pure white without needing a separate asset file.

```astro
---
import { APP_STORE_URL } from '../config';
---

<section class="cta">
  <div class="inner fade-up">
    <h2>Your overblock pay, tracked in real time.</h2>
    <p>Free on iOS. No account. Start in 30 seconds.</p>
    <a href={APP_STORE_URL} class="badge-link" aria-label="Download OverBlock on the App Store">
      <img
        src="/app-store-badge.svg"
        alt="Download on the App Store"
        width="156"
        height="52"
        class="badge-white"
      />
    </a>
  </div>
</section>

<style>
  .cta {
    padding: var(--section-pad) 24px;
    background: var(--color-dark);
  }

  .inner {
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--color-dark-text);
    max-width: 18ch;
  }

  p {
    font-size: 1rem;
    color: var(--color-dark-muted);
  }

  .badge-white {
    filter: brightness(0) invert(1);
    transition: opacity 150ms ease;
  }

  .badge-link:hover .badge-white {
    opacity: 0.85;
  }
</style>
```

- [ ] **Step 2: Verify CTA appearance**

```bash
npm run dev
```

Open `http://localhost:4321`. Scroll to the bottom CTA. Verify:
- Dark navy background matches Privacy Callout section
- Headline and body text are white/muted
- App Store badge renders white (not dark) against the dark background
- Badge has a subtle opacity change on hover

- [ ] **Step 3: Commit**

```bash
git add src/components/DownloadCTA.astro
git commit -m "feat: rebuild DownloadCTA as dark bookend section with white badge"
```

---

## Task 11: Update Footer.astro

Minimal. Continues the dark background from the CTA section without a visible seam.

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Replace `src/components/Footer.astro` entirely**

```astro
---
import { SUPPORT_EMAIL } from '../config';
---

<footer class="footer">
  <div class="inner">
    <span class="wordmark">OverBlock</span>
    <span class="copy">© 2026 OverBlock</span>
    <nav class="links" aria-label="Footer links">
      <a href="/privacy">Privacy Policy</a>
      <a href={`mailto:${SUPPORT_EMAIL}`}>Support</a>
    </nav>
  </div>
</footer>

<style>
  .footer {
    background: var(--color-dark);
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding: 32px 24px;
  }

  .inner {
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .wordmark {
    font-weight: 800;
    font-size: 1rem;
    letter-spacing: -0.02em;
    color: var(--color-dark-text);
  }

  .copy {
    font-size: 0.8125rem;
    color: var(--color-dark-muted);
    margin-right: auto;
  }

  .links {
    display: flex;
    gap: 24px;
  }

  .links a {
    font-size: 0.8125rem;
    color: var(--color-dark-muted);
    transition: color 150ms ease;
  }

  .links a:hover {
    color: var(--color-dark-text);
  }
</style>
```

- [ ] **Step 2: Verify footer appearance**

```bash
npm run dev
```

Scroll to the footer. Verify:
- Footer continues the dark background from DownloadCTA — no visible gap or seam between them
- The thin `rgba(255,255,255,0.06)` border-top provides a subtle divider without breaking the dark theme

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: rebuild Footer as minimal dark strip continuous with CTA"
```

---

## Task 12: Update index.astro and Delete Old Components

Wire all components into the correct order. Remove the 6 old components that are no longer part of the design.

**Files:**
- Modify: `src/pages/index.astro`
- Delete: `src/components/Problem.astro`
- Delete: `src/components/HowItWorks.astro`
- Delete: `src/components/VideoSection.astro`
- Delete: `src/components/Features.astro`
- Delete: `src/components/Screenshots.astro`
- Delete: `src/components/FromAPilot.astro`

- [ ] **Step 1: Replace `src/pages/index.astro` entirely**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import ValueProps from '../components/ValueProps.astro';
import ProductDeepDive from '../components/ProductDeepDive.astro';
import PrivacyCallout from '../components/PrivacyCallout.astro';
import FAQ from '../components/FAQ.astro';
import DownloadCTA from '../components/DownloadCTA.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout>
  <Nav />
  <main>
    <Hero />
    <ValueProps />
    <ProductDeepDive />
    <PrivacyCallout />
    <FAQ />
    <DownloadCTA />
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Delete old components**

```bash
rm src/components/Problem.astro
rm src/components/HowItWorks.astro
rm src/components/VideoSection.astro
rm src/components/Features.astro
rm src/components/Screenshots.astro
rm src/components/FromAPilot.astro
```

- [ ] **Step 3: Verify full page renders without errors**

```bash
npm run dev
```

Open `http://localhost:4321`. The complete page should render with all 6 sections in order: Hero → ValueProps → ProductDeepDive → PrivacyCallout → FAQ → DownloadCTA + Footer.

Check the browser console for any errors.

- [ ] **Step 4: Verify nav anchor links**

Click each nav link (Features, How It Works, Privacy, FAQ) and confirm they scroll to the correct section. Section IDs: `#features`, `#how-it-works`, `#privacy`, `#faq`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro
git rm src/components/Problem.astro src/components/HowItWorks.astro src/components/VideoSection.astro src/components/Features.astro src/components/Screenshots.astro src/components/FromAPilot.astro
git commit -m "feat: wire redesigned sections into index, remove old components"
```

---

## Task 13: Final Integration — Build, Responsive, and Animation Check

Full end-to-end verification before the redesign is considered complete.

**Files:** No changes — verification only.

- [ ] **Step 1: Production build**

```bash
npm run build
```

Expected: `✓ Completed in` with no errors or warnings. If there are TypeScript or Astro errors, fix them before continuing.

- [ ] **Step 2: Preview the production build**

```bash
npm run preview
```

Open `http://localhost:4321`. This serves the actual built output (not the dev server). Verify the page looks identical to the dev server preview.

- [ ] **Step 3: Scroll animation check**

Reload the page. Scroll slowly from top to bottom. Each major section element should fade in as it enters the viewport. Verify:
- Hero content fades in on load (IntersectionObserver threshold is low, so it triggers immediately)
- Value prop cards stagger in (80ms delay between each)
- Product Deep Dive steps stagger in
- Privacy Callout fades in
- FAQ items fade in

- [ ] **Step 4: Mobile responsive check**

In browser DevTools, enable the responsive design mode (usually F12 → Toggle device toolbar). Test at:
- 375px (iPhone SE)
- 390px (iPhone 14)
- 768px (tablet)

For each breakpoint verify:
- Nav shows hamburger, links are hidden
- Hamburger opens/closes the drawer
- Hero stacks phone above text
- Value Props cards stack to single column
- Product Deep Dive steps stack vertically
- No horizontal overflow / no content clipped

- [ ] **Step 5: Check dark sections on scroll**

The page rhythm should be: light → light → light (surface) → dark → light → dark → dark (footer). Scroll through and confirm the visual contrast between light and dark sections feels intentional and creates a natural pause.

- [ ] **Step 6: Commit final state**

```bash
git add -A
git commit -m "feat: complete OverBlock website redesign — Refined Light design system"
```

---

## Known Remaining Items (Post-Launch)

These are not blocking the redesign but should be completed when the app is live:

1. **App Store URL** — update `APP_STORE_URL` in `src/config.ts` from `"#"` to the real App Store link
2. **App Store ID** — update `APP_STORE_ID` in `src/config.ts` — this enables the iOS Safari Smart App Banner
3. **OG image** — the `/public/og-image.png` should be updated to reflect the new dark design system for social share previews
