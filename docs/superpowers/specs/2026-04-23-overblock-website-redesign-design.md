# OverBlock Website Redesign — Design Spec
**Date:** 2026-04-23
**Status:** Approved

---

## Overview

Full visual rebuild of the OverBlock landing page. The current site is functional but visually underwhelming. This redesign replaces the color system, typography, and component design entirely. The Astro project structure and existing component breakdown are preserved; only the visual implementation changes.

**Goal:** Make overblock.app feel like a premium, polished software product — not an aviation utility. The benchmark is Stripe-level cleanliness: generous whitespace, strong type hierarchy, restrained color, product-first.

---

## Design Philosophy

- **Product-first.** The app screenshots are the primary visual asset. Everything else serves them.
- **Light base, dark accents.** White/near-white background throughout. Dark navy sections used sparingly (2 sections max) for contrast and brand echo.
- **One accent color.** Teal green, used in 3 places per viewport maximum. When it appears, it means something.
- **Typography does the work.** Hierarchy, weight, and spacing carry the premium feeling — not decoration.
- **Restraint over decoration.** No icons unless absolutely necessary. No gradient blobs. No stock photos. Motion is subtle and settles immediately.

---

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#FAFBFC` | Page background |
| `--color-text` | `#0A0F1E` | Headlines, body |
| `--color-text-muted` | `#5A6A7E` | Subtext, labels |
| `--color-accent` | `#00C896` | CTAs, highlights, active states |
| `--color-accent-hover` | `#00A87A` | Hover state for accent |
| `--color-surface` | `#F0F4F8` | Card backgrounds, section fills |
| `--color-border` | `#E4EAF0` | Dividers, card borders |
| `--color-dark` | `#0B1120` | Dark sections (matches app background) |
| `--color-dark-text` | `#FFFFFF` | Text on dark sections |
| `--color-dark-muted` | `#8A9AB0` | Muted text on dark sections |

The teal accent (`#00C896`) is pulled directly from the app UI so the website and app feel like one visual system.

### Typography

**Font family:** Plus Jakarta Sans (preferred) or Inter as fallback.
- Both are available via `@fontsource`. Drop Montserrat.
- Weight 400 for body, 600 for labels/subheadings, 700 for section headings, 800 for H1/hero.

| Scale | Size | Weight | Usage |
|-------|------|--------|-------|
| Hero H1 | `clamp(2.75rem, 6vw, 4.5rem)` | 800 | Hero headline |
| H2 | `clamp(2rem, 4vw, 3rem)` | 700 | Section headings |
| H3 | `1.375rem` | 600 | Card titles, step labels |
| Body | `1.0625rem` | 400 | Paragraph copy |
| Small | `0.875rem` | 400 | Labels, trust text, footnotes |

Letter spacing: `-0.02em` on headings 800w, `-0.01em` on 700w, `0` on body.

### Motion

- **Scroll entrance:** `opacity 0 → 1` + `translateY(16px → 0)`, duration `400ms`, easing `cubic-bezier(0.16, 1, 0.3, 1)`. Trigger at 80% scroll threshold.
- **Hover (cards):** `translateY(-2px)` + subtle shadow increase, `200ms ease`.
- **Hover (CTAs):** background color shift to `--color-accent-hover`, `150ms ease`.
- No parallax. No bounce. No repeating animation. No rotation.

### Spacing

- Max content width: `1120px`
- Section vertical padding: `clamp(72px, 10vw, 120px)`
- Card gap: `24px`
- Mobile breakpoint: `768px`

---

## Page Structure

### Section 1 — Nav

**Behavior:** Transparent over hero section. Transitions to `background: rgba(250,251,252,0.92)` + `backdrop-filter: blur(12px)` on scroll (threshold: 40px).

**Layout:** Logo left → nav links center → CTA right.

**Nav links:** Features · How It Works · Privacy · FAQ — all anchor links to sections on the same page (`#features`, `#how-it-works`, `#privacy`, `#faq`).

**CTA:** "Download on the App Store" — pill button, `--color-accent` background, white text, 14px, rounded-full.

**Mobile:** Hamburger menu. Links stack vertically in a slide-down drawer.

---

### Section 2 — Hero

**This is the most important section.** It must communicate the value proposition immediately and feel premium on first load.

**Layout:** Two-column grid on desktop (text left, phone right). Single column on mobile (phone first, then text).

**Left column:**
- Eyebrow: `FOR AIRLINE PILOTS · FREE ON iOS` — small caps, muted, letter-spaced
- H1: *"Know exactly what you're earning the moment block goes long."*
- Subtext (max 2 sentences): Explains the core mechanic — enter your rate and block time, OverBlock tracks the second overblock begins and shows real-time earnings.
- CTA: App Store badge (SVG) + "Free on the App Store" trust micro-copy beneath it
- Secondary trust line: "No account. No tracking. Your data stays on your device."

**Right column:**
- **Primary visual:** Single live earnings screenshot (`$97.53` screen) — large, slight clockwise rotation (3–5°), prominent drop shadow (`0 32px 80px rgba(11, 17, 32, 0.20)`)
- The dark phone on the light background is the hero moment. Do not add background shapes, blobs, or gradients behind it.

**Background:** `--color-bg` (near-white). No decoration.

---

### Section 3 — Three Value Props

**Purpose:** Reinforce the three core reasons to download. Comes immediately after hero so momentum doesn't drop.

**Layout:** Three equal-width cards in a horizontal row. Each card: bold short label, one supporting sentence. Cards sit on `--color-surface` background, subtle `--color-border` border, `12px` border-radius.

**Cards:**
1. **Live & Accurate** — "Earnings update in real time from the exact second overblock starts. No estimates, no mental math."
2. **Setup in Seconds** — "Enter your hourly rate and scheduled block time. That's the entire setup."
3. **Private by Design** — "No account required. Your pay data never leaves your device."

**Hover state:** `translateY(-2px)` + faint teal border (`1px solid rgba(0, 200, 150, 0.3)`).

**Design note:** Cards must feel substantial — generous internal padding (`32px`). Not a thin icon strip.

---

### Section 4 — Product Deep Dive

**Purpose:** Show how the app works using real product screens. This is the visual centerpiece of the page. Merges "How It Works" + "Product Showcase" into one strong section.

**Section heading:** "Three taps. Then watch."

**Layout:** Three-step horizontal layout on desktop. Each step: step number + label above, app screenshot below, short caption beneath image.

| Step | Label | Screenshot | Caption |
|------|-------|-----------|---------|
| 01 | Enter your details | Setup screen | "Your role, your rate, your scheduled block time. 30 seconds." |
| 02 | Start your session | Countdown screen | "OverBlock watches the clock so you don't have to." |
| 03 | Watch earnings update live | Two-crew live earnings screen | "Real-time earnings for you and your crew." |

**Design notes:**
- Screenshots should be displayed at consistent size (~280px wide each on desktop)
- Step numbers in large, light teal (`rgba(0, 200, 150, 0.15)`) behind bold dark step label
- The two-crew screen in step 3 is especially compelling — it shows depth and use case without explanation
- On mobile: vertical stacked layout

---

### Section 5 — Privacy Callout

**Purpose:** Trust builder and visual contrast break. Short, dark, punchy.

**Background:** `--color-dark` (`#0B1120`) — matches the app's own background. This section should feel like you stepped inside the app for a moment.

**Layout:** Centered text, full-width section, generous padding.

**Headline:** "Designed around your privacy."

**Body (max 2 sentences):** "No account required. No data collected. Your pay information is stored only on your device and never transmitted anywhere."

**Optional:** A short horizontal list of trust points: `No account · No cloud · No tracking · No subscription`

**Typography:** White headline, `--color-dark-muted` body text, teal accent for the bullet separators or a single highlighted word.

---

### Section 6 — FAQ

**Purpose:** Handle real objections before the final CTA. Not filler.

**Layout:** Single-column accordion on a light background. Max 7 questions.

**Questions:**
1. What is overblock pay?
2. Who is OverBlock for?
3. Do I need to create an account?
4. Is my pay data private and secure?
5. Does it work for a full crew, not just me?
6. How quickly can I start using it?
7. Is it really free?

**Design:** Clean accordion — question row with chevron, smooth expand/collapse animation (max-height transition). No card styling needed — flat list with `--color-border` dividers is sufficient.

---

### Section 7 — Final CTA

**Purpose:** Strong close. Re-state value, push download.

**Background:** `--color-dark` (`#0B1120`) — bookend with hero. The page opens and closes with premium dark sections.

**Layout:** Centered. Single short headline, one trust line, App Store badge.

**Headline:** "Your overblock pay, tracked in real time."

**Sub-line:** "Free on iOS. No account. Start in 30 seconds."

**CTA:** App Store badge (large, white/light variant — the existing `/public/app-store-badge.svg` is dark; a white version is needed for dark section backgrounds)

---

### Section 8 — Footer

**Minimal.** No bloat.

**Left:** OverBlock wordmark + © 2026 OverBlock

**Right:** Privacy Policy · Support (debrey2021@gmail.com)

**Background:** `--color-dark` (continuous with Final CTA section — they bleed together).

---

## App Screenshots Available

Six high-quality iPhone mockup images confirmed for use:

| Screen | Best used in |
|--------|-------------|
| Live earnings — single (CA, $97.53) | Hero section |
| Setup screen (white background mockup) | Product Deep Dive Step 1 |
| Countdown screen (amber accent, 00:29:30) | Product Deep Dive Step 2 |
| Live earnings — two crew (CA + FO, $162.03 total) | Product Deep Dive Step 3 |
| Setup screen (dark background mockup) | Optional: Privacy section or additional visual |
| Session complete ($97.76) | Optional: FAQ section or additional visual |

---

## App Store CTA

The App Store URL is not yet live. All CTAs use "Download on the App Store" / "Get it on iOS" language pointing to the config constant `APP_STORE_URL` in `src/config.ts`. When the app is approved, this is a single-line update and no redesign is needed.

---

## What This Is NOT

- Not a dark site. Two dark sections max. Everything else is light.
- Not aviation-themed. No cockpit visuals, no instrument dials, no plane icons.
- Not icon-driven. Real product UI replaces generic iconography.
- Not over-animated. One entrance animation type, one hover pattern. That's it.
- Not a long page. 8 sections including nav and footer.

---

## Tech Stack

- **Framework:** Astro (existing)
- **Styling:** Scoped `<style>` per component (existing pattern)
- **Fonts:** Replace `@fontsource/montserrat` with `@fontsource/plus-jakarta-sans` (weights 400, 600, 700, 800)
- **Images:** The 6 iPhone mockup screenshots shared during design review need to be added to `/public/mockups/` — the existing `/public/screenshots/` files are older and lower quality than what was approved for this design
- **Deployment:** Vercel (existing)
