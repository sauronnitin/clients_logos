# High-accuracy prompt template (visual parity, embeds, compositing)

**Tracked copy for git** (this repo ignores `.cursor/`). The same text may exist locally at `.cursor/prompts/high-accuracy-visual-integration.md`. To get **always-on** assistant behavior in Cursor, copy `.cursor/rules/high-accuracy-visual-tasks.mdc` from your local `.cursor` folder after it is generated, or create that rule using the block at the end of this file.

---

Use this when you need **pixel- or behavior-level parity** with a reference implementation (e.g. Aceternity / 21st.dev), especially inside **iframes**, **Framer**, or other **embedded WebKit** hosts where `filter`, `mask-image`, and `mix-blend-mode` behave differently.

---

## Copy-paste template (fill the brackets)

**Task:** Match **[component name]** from the official source: **[URL to registry, docs, or raw component file]**. Implement in **`[path or route, e.g. /embed/aurora]`** for host **`[e.g. Framer iframe / GitHub Pages / Vercel]`**.

**Constraints:**

- **Compositing equivalence:** If the reference uses **one DOM node + `::after`** (or one filtered subtree), and we **split** into multiple nodes for iframe/animation reliability, **`filter` / `invert` / `blur` must apply to the same *composite*** as in the reference (e.g. blur the **combined** base + motion stack), not only the static base layer.
- **Mask vs filter (iframe/WebKit):** Avoid **`mask-image` and `filter` on the same element** if the embed is known to drop one of them; use an **outer mask wrapper** and an **inner filtered stack** when needed.
- **Stacking / isolation:** Call out **`isolation`**, **`mix-blend-mode`**, and **paint order** so blends still target the correct backdrop (e.g. motion layer must difference-blend against the blurred base, not an empty isolated group).
- **Host integration:** **`[z-index, pointer-events, section fills, negative z-index pitfalls]`** for the host (e.g. Framer).
- **Deviations:** Only **`[e.g. ?soft=1]`** when explicitly allowed; otherwise match reference numbers (blur px, opacity, keyframes, gradient stops).

**Deliverables:**

1. Implementation with a **short comment** linking the **canonical source URL**.
2. A **3–5 bullet “paint order” note**: which element gets mask, filter, blend, opacity, and why it matches the reference.
3. **How to verify:** what to inspect in DevTools (computed `filter`, `animation`, `mask-image`) on **`[host vs standalone URL]`**.

**Acceptance:** If **`[symptom, e.g. sharp moving edges]`** appears, treat it as a **compositing / layer structure** bug first, not a gradient color tweak.

---

## For the assistant (Cursor)

When the user asks for something in this category (reference parity, embed, Framer, CSS filters/masks/blends, “looks wrong in iframe only”):

1. **If the prompt is vague:** Paste or link **this file** and ask them to fill the template **or** reply with a **restructured prompt** in this shape, listing **assumptions** and **questions for any missing fields** (source URL, host, route, allowed deviations).
2. **Do not** jump to tuning colors/blur radii until **DOM ↔ compositing equivalence** to the reference is explicit.

---

## Example (aurora background — reference)

- **Source:** `https://ui.aceternity.com/registry/aurora-background.json`
- **Host:** Framer iframe → GitHub Pages `/embed/aurora`
- **Key insight:** Registry puts `blur` + `invert` on the **same element** as the animated `::after`; split DOM must use a **wrapper** that filters the **composite** of base + motion.

---

## Optional: Cursor rule (copy into `.cursor/rules/high-accuracy-visual-tasks.mdc`)

```yaml
---
description: For visual/CSS parity, iframe embeds, Framer, or filter-mask-blend compositing—offer the structured prompt template or restructure the user's ask and request missing details.
alwaysApply: true
---

# High-accuracy visual / embed tasks

When the user’s request involves **matching a reference component**, **CSS compositing** (`filter`, `mask-image`, `mix-blend-mode`, `isolation`), **iframes**, **Framer**, or **“works in browser but not in embed”**:

1. **Provide** the prompt template from **`framer-export/PROMPT_TEMPLATE_HIGH_ACCURACY_VISUAL_INTEGRATION.md`** (the “Copy-paste template” section), or **restructure** their message into that shape yourself.
2. **List gaps** (missing source URL, host, route, acceptance criteria) and **ask** only those questions needed to proceed.
3. **Prioritize** compositing / DOM equivalence **before** iterating on colors, blur radii, or gradient stops.

Do not assume the user has the template memorized—**include the template block** or a **direct file path** to it when you ask them to refine their prompt.
```
