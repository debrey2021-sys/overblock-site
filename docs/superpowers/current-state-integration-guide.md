# OverBlock Memory Integration Guide

**Purpose:** Translate the two `docs/superpowers` memory files into a practical workflow for the current Astro codebase.

## What The Two Memory Files Should Mean

- `docs/superpowers/specs/2026-04-23-overblock-website-redesign-design.md`
  This is the visual source of truth. Use it to decide **what the site should feel like**: layout, typography, color system, section order, and the role of screenshots.
- `docs/superpowers/plans/2026-04-23-overblock-website-redesign.md`
  This is the execution source of truth. Use it to decide **what to change, in what order, and in which files**.

The best way to work with these is:

1. Treat the design spec as the product brief.
2. Treat the implementation plan as the backlog.
3. Treat the current Astro files as the real delivery surface.

## Current Repo Status

The repo is still on the earlier first-pass version, not the approved redesign.

### Already in place

- Astro project structure is clean and usable.
- Core landing-page component breakdown already exists in `src/components/`.
- Metadata/config files already exist in `src/layouts/BaseLayout.astro` and `src/config.ts`.
- App Store badge and older screenshots already exist in `public/`.

### Still on the old pass

- `src/styles/global.css`
  Still uses Montserrat and the older token set.
- `src/components/Nav.astro`
  Still uses the simpler sticky nav instead of the transparent-to-frosted anchor nav in the memory docs.
- `src/components/Hero.astro`
  Still uses the older screenshot treatment and trust-strip layout.
- `src/pages/index.astro`
  Still wires the old section stack:
  `Problem`, `HowItWorks`, `VideoSection`, `Features`, `Screenshots`, `FromAPilot`.

### Missing from the approved redesign

- `src/components/ValueProps.astro`
- `src/components/ProductDeepDive.astro`
- `src/components/PrivacyCallout.astro`
- `public/mockups/` with the six approved screenshots
- `@fontsource/plus-jakarta-sans` dependency
- Scroll-reveal behavior in `src/layouts/BaseLayout.astro`

## Recommended Integration Strategy

Do not try to "blend" the old version and the new memory docs section-by-section forever. That usually creates a half-old, half-new page.

Instead, use the memory files as a controlled replacement plan in three passes:

### Pass 1: Foundation

Update the shared system first so every section you touch after that inherits the new direction.

- Add the approved screenshots to `public/mockups/`
- Replace Montserrat with Plus Jakarta Sans in `package.json`
- Rewrite `src/styles/global.css` with the new design tokens
- Add the fade-in observer to `src/layouts/BaseLayout.astro`

### Pass 2: High-leverage sections

Rebuild the sections that define the feel of the page.

- `src/components/Nav.astro`
- `src/components/Hero.astro`
- Create `src/components/ValueProps.astro`
- Create `src/components/ProductDeepDive.astro`
- Create `src/components/PrivacyCallout.astro`

This gets the site visually aligned fast and gives you a much better preview than tweaking the smaller sections first.

### Pass 3: Cleanup and wire-up

Once the new system is visible, finish the lower-risk integration work.

- Rewrite `src/components/FAQ.astro`
- Rewrite `src/components/DownloadCTA.astro`
- Rewrite `src/components/Footer.astro`
- Update `src/pages/index.astro` to the new section order
- Delete the retired components after the new page renders correctly

## How To Use The Memory Files During Real Work

For each implementation session:

1. Open the design spec to remind yourself what the page is trying to communicate.
2. Open the plan doc to identify the exact task and file list.
3. Only then edit the Astro component involved in that task.

That keeps the memory files from becoming passive notes. They become your decision filter before each code change.

## Section Mapping: Old To New

Use this mapping so the redesign feels manageable:

- `Problem.astro` + `Features.astro` -> `ValueProps.astro`
- `HowItWorks.astro` + `Screenshots.astro` -> `ProductDeepDive.astro`
- `VideoSection.astro` -> removed
- `FromAPilot.astro` -> removed
- Existing `FAQ.astro` -> rewritten in place
- Existing `DownloadCTA.astro` -> rewritten in place
- Existing `Footer.astro` -> rewritten in place

## Best Next Move

The single best next move is to complete the foundation pass before touching more section copy.

If you skip straight into rewriting sections first, you will be judging new components with the wrong fonts, wrong spacing system, wrong screenshots, and wrong global styling.

Start here:

1. Add `public/mockups/`
2. Install `@fontsource/plus-jakarta-sans`
3. Rewrite `src/styles/global.css`
4. Update `src/layouts/BaseLayout.astro`

After that, the Hero and Nav become much easier to judge correctly.

## Notes For Later

- `src/config.ts` is still using placeholder App Store values, which is fine for now.
- `public/og-image.png` is still the old version and can be updated after the landing page redesign is stable.
- The old screenshots in `public/screenshots/` are useful as fallback reference, but they are not the approved visuals for the redesign.
