# GenAI Five-Slide Deck Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a five-slide editable PowerPoint for the 2026-06-11 class presentation using the teacher's original GenAI PPTX template and current website screenshots.

**Architecture:** Use template-following mode. Inspect and duplicate selected source slides, edit inherited placeholders in place with artifact-tool, replace inherited images with actual Home, Projects, and Resume screenshots, then export and render the final PPTX for visual and structural QA.

**Tech Stack:** `@oai/artifact-tool`, presentation JSX/import-export tooling, teacher PPTX template, PNG website screenshots, bundled presentation inspection and fidelity scripts.

---

### Task 1: Lock Source Slides And Content

**Files:**
- Create: `outputs/manual-20260610-genai5/presentations/five-slide-preview/template-audit.txt`
- Create: `outputs/manual-20260610-genai5/presentations/five-slide-preview/claim-spine.txt`
- Create: `outputs/manual-20260610-genai5/presentations/five-slide-preview/template-frame-map.json`
- Create: `outputs/manual-20260610-genai5/presentations/five-slide-preview/deviation-log.txt`

- [ ] **Step 1: Record template rules**

Document the blue header/footer, logo, course title, page marker, typography, reusable text/image layouts, and all example content that must be removed.

- [ ] **Step 2: Record the five slide claims**

Use the exact five claims from the approved design spec and associate each slide with its proof object.

- [ ] **Step 3: Map output slides to source slides**

Map cover to source slide 1, screenshot overview to source slide 3, Prompt to source slide 4, Workflow to source slide 5, and Learning Trace to source slide 6 or 9 based on inherited editable slots.

- [ ] **Step 4: Validate the frame map**

Run:

```bash
node "$SKILL_DIR/scripts/validate_template_plan.mjs" \
  --workspace "$WORKSPACE" \
  --pptx "$SOURCE_PPTX" \
  --map "$WORKSPACE/template-frame-map.json"
```

Expected: map validation succeeds with five output slides and no unsupported add-only overlays.

### Task 2: Build The Template Starter

**Files:**
- Create: `outputs/manual-20260610-genai5/presentations/five-slide-preview/template-starter.pptx`
- Create: `outputs/manual-20260610-genai5/presentations/five-slide-preview/template-starter-preview/`
- Create: `outputs/manual-20260610-genai5/presentations/five-slide-preview/template-starter-layout/`

- [ ] **Step 1: Duplicate mapped source slides**

Run:

```bash
node "$SKILL_DIR/scripts/prepare_template_starter_deck.mjs" \
  --workspace "$WORKSPACE" \
  --pptx "$SOURCE_PPTX" \
  --map "$WORKSPACE/template-frame-map.json" \
  --out "$WORKSPACE/template-starter.pptx" \
  --preview-dir "$WORKSPACE/template-starter-preview" \
  --layout-dir "$WORKSPACE/template-starter-layout" \
  --contact-sheet "$WORKSPACE/template-starter-contact-sheet.png"
```

Expected: a five-slide starter PPTX preserving the teacher template.

- [ ] **Step 2: Inspect starter slides**

Verify slide order, inherited page chrome, editable placeholder IDs, and that every output slide has the expected source skeleton.

### Task 3: Replace Content In Place

**Files:**
- Create: `outputs/manual-20260610-genai5/presentations/five-slide-preview/edit-deck.mjs`
- Create: `outputs/manual-20260610-genai5/presentations/five-slide-preview/output/genai-frontend-workflow-five-slide.pptx`

- [ ] **Step 1: Import the starter PPTX**

Use:

```js
const presentation = await PresentationFile.importPptx(
  await FileBlob.load(starterPptx)
);
```

- [ ] **Step 2: Replace inherited text**

Set the approved titles, concise body text, author, subtitle, and page numbers. Preserve inherited font family, size, weight, spacing, alignment, and vertical anchor.

- [ ] **Step 3: Replace inherited images**

Replace template example images with:

```text
site-screenshots/home.png
site-screenshots/projects.png
site-screenshots/resume.png
```

Use crop-to-fill without stretching.

- [ ] **Step 4: Export the final PPTX**

Use:

```js
const pptx = await PresentationFile.exportPptx(presentation);
await pptx.save(finalPptx);
```

Expected: editable five-slide PPTX with no template sample content.

### Task 4: Render And Verify

**Files:**
- Create: `outputs/manual-20260610-genai5/presentations/five-slide-preview/preview/`
- Create: `outputs/manual-20260610-genai5/presentations/five-slide-preview/layout/final/`
- Create: `outputs/manual-20260610-genai5/presentations/five-slide-preview/qa/`

- [ ] **Step 1: Render all five slides**

Export PNG previews, layout JSON, and a contact sheet.

- [ ] **Step 2: Inspect content**

Extract all slide text and verify:

```bash
rg -i "僅供參考|我常用這樣|或是這樣|Reddit|Thank You|插入圖片" "$WORKSPACE"
```

Expected: no matches in final slide content.

- [ ] **Step 3: Inspect visuals**

Check every slide for clipping, overlap, weak contrast, screenshot distortion, excessive text, inconsistent page numbers, and missing template chrome.

- [ ] **Step 4: Run template fidelity check**

Run:

```bash
node "$SKILL_DIR/scripts/check_template_fidelity.mjs" \
  --workspace "$WORKSPACE" \
  --starter-pptx "$WORKSPACE/template-starter.pptx" \
  --final-pptx "$FINAL_PPTX" \
  --map "$WORKSPACE/template-frame-map.json" \
  --starter-layout-dir "$WORKSPACE/template-starter-layout" \
  --final-layout-dir "$WORKSPACE/layout/final" \
  --edit-dir "$WORKSPACE"
```

Expected: fidelity check passes or reports only intentional text/image replacements listed in `deviation-log.txt`.

- [ ] **Step 5: Perform one fix-and-verify cycle**

Fix all issues found in the first render, re-export the PPTX, and rerender affected slides before delivery.

