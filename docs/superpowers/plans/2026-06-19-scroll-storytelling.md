# Scroll Storytelling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the homepage into a 3-act scroll-driven narrative using GSAP ScrollTrigger, with a Higgsfield-generated cinematic AI visualization image in the hero right column.

**Architecture:** `about-hero` section becomes `250vh` tall with a `position: sticky` inner container (`100vh`). A single GSAP timeline driven by ScrollTrigger maps scroll progress to three acts: avatar entrance (Act 0, 0–25%), bio + Higgsfield image reveal (Act 1, 25–65%), badges + CTA glow (Act 2, 65–100%). All GSAP code lives in one `useEffect` in `about-hero.tsx`. Higgsfield generates one 9:16 cinematic image saved to `public/images/ai-visual.jpg`.

**Tech Stack:** GSAP 3 + ScrollTrigger (already installed), React 19 `useRef`/`useEffect`, Next.js 16 App Router.

## Global Constraints

- GSAP already in `node_modules` — no new deps (`import { gsap } from "gsap"`, `import { ScrollTrigger } from "gsap/ScrollTrigger"`)
- Accent colours: `#ffa032` (orange), `#b450ff` (purple) — no other accent colours
- `"use client"` already on `components/about-hero.tsx`
- No changes to `app/projects/`, `app/resume/`, or any page other than the homepage
- Higgsfield budget: ≤ 10 credits total (z_image draft ~2 cr + cinematic_studio_2_5 final ~5 cr ≈ 7 cr used)
- Generated image saved to `public/images/ai-visual.jpg` (`images.unoptimized: true` already set in `next.config.mjs`)
- Package manager: `pnpm`

---

### Task 1: Generate Higgsfield AI visual and save to public/

**Files:**
- Create: `public/images/ai-visual.jpg`

**Interfaces:**
- Produces: `/images/ai-visual.jpg` consumed as `src` in Task 2

- [ ] **Step 1: Generate z_image draft (cheap test)**

Call `mcp__higgsfield__generate_image` with:
```json
{
  "model_id": "z_image",
  "prompt": "Dark cinematic AI visualization. Abstract neural network nodes and glowing edges in deep black space. Orange accent light (#ffa032) on connection points, faint purple (#b450ff) ambient glow on background. Multi-agent graph structure, minimal, no humans, no text, futuristic.",
  "aspect_ratio": "9:16"
}
```

- [ ] **Step 2: Poll until complete and review**

Call `mcp__higgsfield__job_status` (or `job_display`) with the returned `job_id`. When status is `completed`, open the result image URL and visually check: dark background, orange glow, abstract nodes. If direction is wrong, note what to adjust and re-generate with same model before spending on the cinematic model.

- [ ] **Step 3: Generate cinematic_studio_2_5 final**

Call `mcp__higgsfield__generate_image` with:
```json
{
  "model_id": "cinematic_studio_2_5",
  "prompt": "Dark cinematic AI visualization. Abstract neural network nodes and glowing edges in deep black space. Orange accent light on connection points, faint purple ambient glow. Multi-agent graph, minimal, no humans, no text, futuristic. Film still quality.",
  "aspect_ratio": "9:16",
  "resolution": "1k"
}
```

- [ ] **Step 4: Download image to public/**

Poll `job_status` until complete, then download:
```bash
curl -L -o /Users/weihong/Documents/profile/public/images/ai-visual.jpg "<image_url_from_result>"
```
Verify: `ls -lh /Users/weihong/Documents/profile/public/images/ai-visual.jpg` should show a non-zero file.

- [ ] **Step 5: Commit asset**

```bash
git add public/images/ai-visual.jpg
git commit -m "feat: add higgsfield cinematic AI visualization for hero"
```

---

### Task 2: Restructure about-hero for 250vh scroll container + add refs

**Files:**
- Modify: `components/about-hero.tsx`

**Interfaces:**
- Produces (all `React.RefObject`): `sectionRef` (`HTMLElement`), `avatarWrapRef` (`HTMLDivElement`), `bioLine1Ref` (`HTMLParagraphElement`), `bioLine2Ref` (`HTMLParagraphElement`), `badgesRef` (`HTMLDivElement`), `ctaRef` (`HTMLDivElement`), `higgsfieldRef` (`HTMLDivElement`)

- [ ] **Step 1: Add GSAP imports and refs**

At the top of `components/about-hero.tsx`, add to the existing React import:
```tsx
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
```

Inside `AboutHero()`, after the existing `useState`/`useRouter` lines, add:
```tsx
const sectionRef   = useRef<HTMLElement>(null)
const avatarWrapRef = useRef<HTMLDivElement>(null)
const bioLine1Ref  = useRef<HTMLParagraphElement>(null)
const bioLine2Ref  = useRef<HTMLParagraphElement>(null)
const badgesRef    = useRef<HTMLDivElement>(null)
const ctaRef       = useRef<HTMLDivElement>(null)
const higgsfieldRef = useRef<HTMLDivElement>(null)
```

- [ ] **Step 2: Replace section wrapper with 250vh outer + sticky inner**

Replace the current opening `<section style={{ minHeight: "100vh", paddingTop: "86px", ... }}>` with:
```tsx
<section ref={sectionRef} style={{
  height: "250vh",
  position: "relative",
  background: "#000000",
}}>
  {/* Sticky viewport — stays fixed while scrolling through 250vh */}
  <div style={{
    position: "sticky",
    top: 0,
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  }}>
```

Add the matching closing `</div>` before `</section>` at the end. The rest of the inner content (GlassFilterProvider, PortfolioBackground, 2-column grid) stays exactly the same, just nested inside the sticky div.

Update the 2-column grid's `padding` from `"0 4vw"` to `"86px 4vw 0"` to preserve navbar clearance inside the sticky container.

- [ ] **Step 3: Attach refs and set initial opacity on animated elements**

In the **left column**:
- First `<p>` bio: add `ref={bioLine1Ref}` and `style={{ ..., opacity: 0 }}`
- Second `<p>` bio: add `ref={bioLine2Ref}` and `style={{ ..., opacity: 0 }}`
- Badges `<div>`: add `ref={badgesRef}` and append `opacity: 0` to its existing style
- CTA `<div>`: add `ref={ctaRef}` and append `opacity: 0` to its existing style

In the **right column**, wrap the `<Perspective>` in a div with ref and initial opacity:
```tsx
<div ref={avatarWrapRef} style={{ opacity: 0 }}>
  <Perspective ...>
    {/* existing avatar image */}
  </Perspective>
</div>
```

Add Higgsfield image block after the avatar div, before the contact pills `<div>`:
```tsx
<div ref={higgsfieldRef} style={{
  opacity: 0,
  marginTop: "16px",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.08)",
  width: "160px",
  alignSelf: "center",
}}>
  <Image
    src="/images/ai-visual.jpg"
    alt="AI Visualization"
    width={160}
    height={284}
    style={{ width: "100%", height: "auto", display: "block" }}
  />
</div>
```

- [ ] **Step 4: Add scroll-down hint**

Inside the sticky `<div>`, after the 2-column grid, add:
```tsx
<div id="scroll-hint" style={{
  position: "absolute", bottom: "28px", left: "50%",
  transform: "translateX(-50%)",
  color: "rgba(255,255,255,0.2)", fontSize: "10px",
  letterSpacing: "3px", display: "flex", flexDirection: "column",
  alignItems: "center", gap: "6px", pointerEvents: "none",
}}>
  <span>SCROLL</span>
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
</div>
```

- [ ] **Step 5: Verify build compiles**

```bash
cd /Users/weihong/Documents/profile && pnpm build
```
Expected: build succeeds (TypeScript errors don't block build per `next.config.mjs`). If the image file `public/images/ai-visual.jpg` doesn't exist yet, add a temporary 1×1 placeholder:
```bash
# Only if Task 1 hasn't run yet:
cp public/images/profile.jpg public/images/ai-visual.jpg
```

- [ ] **Step 6: Commit**

```bash
git add components/about-hero.tsx
git commit -m "refactor: restructure about-hero for 250vh sticky scroll container"
```

---

### Task 3: GSAP scroll timeline — Act 0 (avatar entrance)

**Files:**
- Modify: `components/about-hero.tsx`

**Interfaces:**
- Consumes: `sectionRef`, `avatarWrapRef` from Task 2
- Produces: `tl` (GSAP Timeline) defined in `useEffect` — extended by Tasks 4 and 5 (same `useEffect` block)

- [ ] **Step 1: Add useEffect with master timeline and Act 0**

Inside `AboutHero()`, after the refs, add:
```tsx
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger)

  const section = sectionRef.current
  if (!section) return

  // Master timeline — scroll progress (0→1) drives entire narrative
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
    },
  })

  // ── Act 0 (0–25%): Avatar fades and scales in ──
  tl.fromTo(
    avatarWrapRef.current,
    { opacity: 0, scale: 0.82 },
    { opacity: 1, scale: 1, ease: "power2.out", duration: 0.25 },
    0
  )

  // ── Scroll hint fades out immediately on scroll ──
  tl.fromTo(
    "#scroll-hint",
    { opacity: 1 },
    { opacity: 0, duration: 0.08 },
    0.02
  )

  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill())
  }
}, [])
```

- [ ] **Step 2: Verify Act 0 in browser**

```bash
pnpm dev
```
Open http://localhost:3000. Before scrolling: avatar is invisible, "SCROLL" hint visible. Scroll slowly through the first ~25% of the page height — avatar should scale up from 82% and fade in. Scroll hint should disappear immediately on scroll.

- [ ] **Step 3: Commit**

```bash
git add components/about-hero.tsx
git commit -m "feat: act 0 - avatar entrance scroll animation"
```

---

### Task 4: GSAP scroll timeline — Act 1 (bio reveal + Higgsfield image)

**Files:**
- Modify: `components/about-hero.tsx`

**Interfaces:**
- Consumes: `tl` (from Task 3 useEffect), `bioLine1Ref`, `bioLine2Ref`, `higgsfieldRef` from Task 2

- [ ] **Step 1: Add Act 1 animations inside the same useEffect, after the Act 0 block**

```tsx
// ── Act 1 (25–60%): Bio reveals, Higgsfield image enters ──
tl.fromTo(
  bioLine1Ref.current,
  { opacity: 0, y: 24 },
  { opacity: 1, y: 0, ease: "power2.out", duration: 0.18 },
  0.25
)
tl.fromTo(
  bioLine2Ref.current,
  { opacity: 0, y: 24 },
  { opacity: 1, y: 0, ease: "power2.out", duration: 0.18 },
  0.36
)
tl.fromTo(
  higgsfieldRef.current,
  { opacity: 0, x: 36 },
  { opacity: 1, x: 0, ease: "power3.out", duration: 0.2 },
  0.42
)
```

- [ ] **Step 2: Verify Act 1 in browser**

```bash
pnpm dev
```
Scroll through 25–60% of page:
- Bio paragraph 1 should fade up into view
- Then bio paragraph 2 follows
- Then the Higgsfield image (or placeholder) slides in from the right in the avatar column

- [ ] **Step 3: Commit**

```bash
git add components/about-hero.tsx
git commit -m "feat: act 1 - bio paragraph reveal and higgsfield image entrance"
```

---

### Task 5: GSAP scroll timeline — Act 2 (badges stagger + CTA orange glow)

**Files:**
- Modify: `components/about-hero.tsx`

**Interfaces:**
- Consumes: `tl` (from Task 3 useEffect), `badgesRef`, `ctaRef` from Task 2

- [ ] **Step 1: Add Act 2 animations inside the same useEffect, after the Act 1 block**

```tsx
// ── Act 2 (60–100%): Badges stagger in, CTA appears with orange glow ──
const badgeEls = badgesRef.current
  ? Array.from(badgesRef.current.querySelectorAll("button"))
  : []

tl.fromTo(
  badgeEls,
  { opacity: 0, x: -18 },
  { opacity: 1, x: 0, ease: "power2.out", duration: 0.12, stagger: 0.04 },
  0.62
)
tl.fromTo(
  ctaRef.current,
  { opacity: 0, y: 14 },
  { opacity: 1, y: 0, ease: "power2.out", duration: 0.14 },
  0.76
)
// Orange glow on CTA buttons at end of scroll
const ctaBtns = ctaRef.current
  ? Array.from(ctaRef.current.querySelectorAll("button"))
  : []
tl.fromTo(
  ctaBtns,
  { boxShadow: "0 0 0px rgba(255,160,50,0)" },
  { boxShadow: "0 0 22px rgba(255,160,50,0.35)", duration: 0.12 },
  0.86
)
```

- [ ] **Step 2: Verify full narrative in browser**

```bash
pnpm dev
```
Full scroll test on http://localhost:3000:
- Load: name + subtitle visible, avatar hidden, "SCROLL" hint visible
- 0–25%: Avatar scales and fades in, hint disappears
- 25–45%: Bio paragraph 1 fades up
- 36–55%: Bio paragraph 2 fades up
- 42–62%: Higgsfield image slides in from right
- 62–80%: Tech badges stagger in from left (LangGraph, Multi-Agent, FastAPI, Vue 3, Solidity)
- 76–90%: CTA buttons (RESUME, PROJECTS) appear
- 86–100%: Orange glow pulses onto CTA buttons
- Past 250vh: page reaches bottom naturally

- [ ] **Step 3: Final build check**

```bash
pnpm build
```
Expected: ✓ Compiled successfully.

- [ ] **Step 4: Commit**

```bash
git add components/about-hero.tsx
git commit -m "feat: act 2 - tech badges stagger and CTA orange glow"
```

---

## Self-Review

**Spec coverage:**
- ✓ Higgsfield generates 9:16 dark AI visualization (Task 1)
- ✓ Budget ≤10 credits: z_image ~2cr + cinematic_studio_2_5 ~5cr = ~7cr (Task 1)
- ✓ 3-act scroll narrative with GSAP ScrollTrigger (Tasks 3–5)
- ✓ Act 0: avatar entrance (Task 3)
- ✓ Act 1: bio reveal + Higgsfield image (Task 4)
- ✓ Act 2: badges stagger + CTA orange glow (Task 5)
- ✓ Scroll hint disappears on scroll (Task 3)
- ✓ Existing components preserved — LiquidButton, TextScramble, Perspective, PortfolioBackground (Task 2)
- ✓ Only `about-hero.tsx` modified — Projects/Resume pages unchanged

**Type consistency:**
- All refs typed via `useRef<T>(null)` in Task 2 and consumed by name in Tasks 3–5
- `tl` is defined in Task 3's `useEffect` and Tasks 4–5 describe adding to the same block
- `querySelectorAll("button")` targets LiquidButton's rendered `<button>` DOM elements — valid

**No placeholders:** All steps contain concrete code, exact commands, and expected outputs.
