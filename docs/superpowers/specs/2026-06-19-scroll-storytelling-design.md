# Scroll Storytelling + Higgsfield Visual — Design Spec

**Date:** 2026-06-19  
**Scope:** Homepage (`app/page.tsx` + `components/about-hero.tsx`) only. Projects/Resume pages unchanged.

---

## Goal

Convert the homepage into a 3-act scroll-controlled narrative. Scroll progress drives animation (Type C — storytelling), not just triggers it. Higgsfield generates one cinematic dark AI visualization image to fill the hero right-column void below the avatar.

---

## Higgsfield Budget (10 credits total)

| Step | Model | Est. Credits | Purpose |
|------|-------|-------------|---------|
| Draft | `z_image` | ~2 | Test prompt direction, fast |
| Final | `cinematic_studio_2_5` | ~4–5 | Hero right-column visual (9:16) |
| Buffer | — | 3–4 | Unused reserve |

**Prompt direction:** Black background, orange (`#ffa032`) and purple (`#b450ff`) glowing nodes and edges forming an abstract multi-agent graph / neural network. Cinematic, dark, minimal.

**Output:** Saved to `public/images/ai-visual.jpg`, referenced in `about-hero.tsx`.

---

## Scroll Narrative Structure

GSAP ScrollTrigger handles all animation. The section is pinned during Acts 1–2; Act 3 unpins and flows naturally.

```
Scroll 0%–20%   Act 0 — Landing (no pin)
  - TextScramble plays on load (already exists)
  - Avatar enters: scale 0.85 → 1.0, opacity 0 → 1 (scrubbed)
  - Background shader color tint shifts slightly orange on scroll

Scroll 20%–65%  Act 1 — Identity (PINNED)
  - Bio paragraph 1 reveals line-by-line (clip-path reveal, scroll-driven)
  - Bio paragraph 2 reveals after paragraph 1 completes
  - Tech badges stagger in from left (opacity + translateX)
  - Higgsfield image slides in from right with parallax offset

Scroll 65%–100% Act 2 — Projects Preview (PINNED → UNPIN)
  - 3 project cards stagger up from below (translateY 40px → 0, opacity 0 → 1)
  - CTA buttons: border-color pulses to orange glow
  - At 100%: section unpins, normal scroll resumes
```

---

## Component Changes

**`components/about-hero.tsx`**
- Wrap section in GSAP ScrollTrigger pin
- Split bio text into individual lines for reveal
- Add Higgsfield image below avatar in right column
- Add project preview cards (mini versions, 3 items) in Act 2 overlay

**No new files** — all changes in `about-hero.tsx`. GSAP already installed.

---

## Visual Design

- Higgsfield image: `9:16`, placed below avatar in right column, `border-radius: 12px`, `border: 1px solid rgba(255,255,255,0.08)`
- Text reveal: `clip-path: inset(0 0 100% 0)` → `inset(0 0 0% 0)` per line
- Badge stagger: 80ms delay between each, `translateX(-20px)` → `0`
- Project cards: same glass card style as `project-card.tsx`, but compact (no description list)
- CTA orange glow: `box-shadow: 0 0 20px rgba(255,160,50,0.3)` on Act 2 entry

---

## Constraints

- `next.config.mjs` has `images.unoptimized: true` — Higgsfield image saved to `public/` works fine
- No mobile breakpoint handling in this spec (existing responsive behavior preserved)
- GSAP ScrollTrigger requires `"use client"` — `about-hero.tsx` already has it
- `GlassFilterProvider` stays at top of section (existing)

---

## Out of Scope

- Projects and Resume pages (unchanged)
- Mobile-specific scroll behavior
- Audio / video Higgsfield generation (over budget)
- Dark/light mode toggle (site is dark-only)
