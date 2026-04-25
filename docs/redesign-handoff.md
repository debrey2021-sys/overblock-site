# OverBlock Redesign Handoff

This file is the continuity layer for future Codex chats on this project.

## Project Intent

- This repo started as an early placeholder site and should not be treated as the desired design direction.
- The current effort is a full landing-page redesign for OverBlock.
- The site should feel:
  - light-first
  - premium
  - restrained
  - product-led
  - modern, clean, and software-like
- The site should not feel:
  - aviation-themed
  - generic SaaS
  - icon-driven
  - over-animated

## Core Source Of Truth

Use these in this order:

1. Newest approved section comp from the user
   - Any newer uploaded design image for a specific section overrides older docs for that section.
2. [2026-04-23-overblock-website-redesign-design.md](C:/Users/debre/OneDrive/Desktop/overblock-site-main/docs/superpowers/specs/2026-04-23-overblock-website-redesign-design.md)
3. [2026-04-23-overblock-website-redesign.md](C:/Users/debre/OneDrive/Desktop/overblock-site-main/docs/superpowers/plans/2026-04-23-overblock-website-redesign.md)

## Approved Direction So Far

### General

- Astro structure should be preserved.
- Redesign should be implemented in real HTML/CSS/Astro components, not as flat baked images.
- Section-by-section workflow is preferred.
- The user has approved the idea of using a repo memory/handoff file like this one to carry context across chats.

### Hero / Nav

- The uploaded hero comp is the source of truth for Hero and Nav.
- The approved Hero/Nav direction includes:
  - solid light nav on load
  - thin divider under nav
  - centered nav links
  - green rounded App Store CTA in the nav
  - eyebrow: `FOR AIRLINE PILOTS · FREE ON iOS`
  - headline:
    - `Track`
    - `overblock pay`
    - `in real time.`
  - shorter supporting copy
  - App Store badge without extra trust-strip clutter
  - oversized angled phone visual on the right
- Hero is intentionally staying static for now.
- The user asked about using a video/screen recording in Hero, but the current decision is:
  - keep the Hero static
  - revisit video polish later

### Value Props

- A newer approved comp was provided for the section directly after Hero.
- That comp is now the source of truth for `ValueProps`.
- It shows:
  - eyebrow: `WHY PILOTS USE OVERBLOCK`
  - large centered headline: `Built for speed, accuracy, and privacy.`
  - centered two-line intro copy
  - three tall cards
  - centered teal top trim on each card
  - subtle dotted side texture near the outer edges
  - card content:
    - `Live & Accurate`
    - `Setup in Seconds`
    - `Private by Design`

### User's Preferred Workflow

- User wants to provide approved comps for each section.
- Codex should implement each section faithfully and then iterate from browser feedback.
- This is not a one-shot "invent the rest" redesign process.

## Human-Reviewed Overrides

These came from the user-provided prompt and still apply unless a newer approved comp overrides them:

- Hero: use the cleaner approved version, remove extra trust lines
- Value Props: use heading above cards, subtle side texture, centered teal trim
- Product Deep Dive: use approved 3-step horizontal layout, not a regressed version
- Privacy: use `Designed around your privacy.` with tighter approved copy

## Current Implementation Status

The redesign has already been partially implemented in code.

### Global foundation already updated

- [global.css](C:/Users/debre/OneDrive/Desktop/overblock-site-main/src/styles/global.css)
  - Plus Jakarta Sans
  - new color tokens
  - shared scroll animation class
  - `overflow-x: hidden`
- [BaseLayout.astro](C:/Users/debre/OneDrive/Desktop/overblock-site-main/src/layouts/BaseLayout.astro)
  - shared IntersectionObserver reveal behavior
  - conditional Smart App Banner based on non-placeholder App Store ID

### New landing page structure already wired

- [index.astro](C:/Users/debre/OneDrive/Desktop/overblock-site-main/src/pages/index.astro)
  - `Nav`
  - `Hero`
  - `ValueProps`
  - `ProductDeepDive`
  - `PrivacyCallout`
  - `FAQ`
  - `DownloadCTA`
  - `Footer`

### New / rewritten components currently in place

- [Nav.astro](C:/Users/debre/OneDrive/Desktop/overblock-site-main/src/components/Nav.astro)
- [Hero.astro](C:/Users/debre/OneDrive/Desktop/overblock-site-main/src/components/Hero.astro)
- [ValueProps.astro](C:/Users/debre/OneDrive/Desktop/overblock-site-main/src/components/ValueProps.astro)
- [ProductDeepDive.astro](C:/Users/debre/OneDrive/Desktop/overblock-site-main/src/components/ProductDeepDive.astro)
- [PrivacyCallout.astro](C:/Users/debre/OneDrive/Desktop/overblock-site-main/src/components/PrivacyCallout.astro)
- [FAQ.astro](C:/Users/debre/OneDrive/Desktop/overblock-site-main/src/components/FAQ.astro)
- [DownloadCTA.astro](C:/Users/debre/OneDrive/Desktop/overblock-site-main/src/components/DownloadCTA.astro)
- [Footer.astro](C:/Users/debre/OneDrive/Desktop/overblock-site-main/src/components/Footer.astro)

### Current visual status

- `Nav` and `Hero` have gone through multiple visual refinement passes in-browser.
- Hero currently includes:
  - approved headline copy
  - improved App Store button treatment
  - subtle animated background motion
  - soft phone glow
  - adjusted phone positioning
  - slight background texture
- Hero is in a good stopping state for now, though it may get a final polish round later.
- `ValueProps` has been updated to match the approved comp more closely and is the current completed next section.

### Old components already removed

- `Problem.astro`
- `HowItWorks.astro`
- `VideoSection.astro`
- `Features.astro`
- `Screenshots.astro`
- `FromAPilot.astro`

## Assets And Git Status

The project is now connected to the user's GitHub repo:

- [overblock-site.git](https://github.com/debrey2021-sys/overblock-site.git)

The local folder was initialized as git and `origin` was connected/fetched.

### Mockup assets

- The old placeholder mockups were replaced by files pulled from the user's GitHub repo.
- Current local `public/mockups/` reflects the newer remote assets.
- Current known files:
  - `public/mockups/live-solo.png`
  - `public/mockups/setup-light.png`
  - `public/mockups/countdown.png`
  - `public/mockups/live-crew.png`
  - `public/mockups/session-complete.png`
  - `public/mockups/session-complete-crew.png`

### Remaining caveat

- Asset quality is much better now, but future approved exports can still override them.
- The local code should keep using `public/mockups/` as the main asset location.

## Local Dev Workflow

- Dev server has been run successfully with `npm.cmd run dev -- --host 0.0.0.0`
- Local URL: `http://localhost:4321/`
- Browser-based iteration is expected:
  1. user opens local site
  2. user compares section to approved comp
  3. Codex adjusts section code
  4. user reloads and gives visual feedback

## Known Config State

- [config.ts](C:/Users/debre/OneDrive/Desktop/overblock-site-main/src/config.ts)
  - `APP_STORE_URL` is still placeholder `"#"`
  - `APP_STORE_ID` is still placeholder
  - `SUPPORT_EMAIL` is set
- This placeholder App Store state is acceptable during redesign.

## What To Do In A New Chat

When resuming in a fresh thread:

1. Read this file first.
2. Then read:
   - [2026-04-23-overblock-website-redesign-design.md](C:/Users/debre/OneDrive/Desktop/overblock-site-main/docs/superpowers/specs/2026-04-23-overblock-website-redesign-design.md)
   - [2026-04-23-overblock-website-redesign.md](C:/Users/debre/OneDrive/Desktop/overblock-site-main/docs/superpowers/plans/2026-04-23-overblock-website-redesign.md)
3. Ask the user which section comp is the current focus if they have not already provided one in-thread.
4. Treat the latest approved section image as the primary source of truth for that section.
5. Verify the dev server is running before telling the user to inspect `localhost:4321`.

## Best Next Moves

The best continuation path is:

1. Leave Hero as-is for now unless the user wants another Hero polish pass
2. Treat the approved `ValueProps` comp as implemented for this round
3. Move to the next approved section comp from the user
4. Most likely next focus: `ProductDeepDive`

## Notes To Future Codex

- Do not assume the current live implementation is finished just because the structure is in place.
- The right mindset is faithful implementation of approved section comps.
- Prefer concrete visual iteration over broad redesign theorizing.
- If the user asks how to continue after context gets long, update this file rather than relying on chat memory alone.
- Best short prompt for a fresh chat: `Use overblock-resume and continue the OverBlock redesign`
