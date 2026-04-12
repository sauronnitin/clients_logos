# Structured prompt template (general)

Use this for **any** task where a few minutes up front saves bad assumptions and token churn: features, refactors, integrations, content, design-to-code, debugging, deploys, etc.

**Git-tracked.** This repo ignores `.cursor/`; mirror locally at `.cursor/prompts/structured-tasks.md` if you want. For always-on assistant behavior, use the Cursor rule block at the end (`.cursor/rules/structured-prompt-enrichment.mdc`).

---

## When to use

- The outcome or **scope** is fuzzy.
- More than one **interpretation** is plausible.
- Work touches **multiple systems** (host + repo + CMS + Framer + CI, etc.).
- You care about **matching** something external (design, component registry, API spec).
- You want **explicit acceptance** and **verification** so “done” is unambiguous.

---

## Copy-paste template (fill or delete sections you don’t need)

**Goal:** What should be true when this is finished? *(one or two sentences)*

**Scope:**

- **In:** …
- **Out / not doing now:** …

**Context:** *(anything that changes the answer)*

- **Where in the repo / product:** …
- **Who it’s for:** …
- **Environment:** *(local, staging, prod, Framer, iframe, mobile, …)* …

**Source of truth:** *(optional but use when “match X” matters)*

- Links, registry JSON, Figma, API docs, screenshots, prior PR, …

**Constraints:**

- **Must / must not:** …
- **Compatibility / risk:** *(browsers, a11y, perf, security, backwards compatibility)* …
- **Style:** *(commit format, file limits, no new deps, …)* …

**Deliverables:** *(check what you want)*

- Code / config / docs / tests / migration / deploy steps / Framer steps / …

**Verification:** How will we **prove** it works? *(commands, URLs, checklist, screenshot)*

**Open questions / unknowns:** What you’re unsure about *(assistant should fill or ask)*

---

## For the assistant (Cursor)

1. **Infer from context** whether this task is **underspecified** for its apparent complexity (integrations, parity work, multi-file refactors, security-sensitive changes, vague “fix it” or “make it better”).
2. If underspecified: **either** paste the **“Copy-paste template”** section from this file and ask the user to fill gaps **or** **restructure** their request into this shape yourself, state **assumptions**, and ask **only** for missing high-leverage details (not an interrogation).
3. If the prompt is already tight (small bug, one file, clear repro): **proceed** without forcing the template.
4. When you share the template, include the **file path** or the **template block** so the user doesn’t have to hunt.

---

## Appendix A — Visual / CSS / embed / compositing *(optional constraints)*

Add under **Constraints** when matching a reference UI or embedding in Framer / iframes / WebKit:

- **Compositing equivalence:** If the reference uses **one node + pseudo-element** and you **split** the DOM, **`filter` / `blur` / `invert` must apply to the same composite** as in the reference (e.g. wrapper blurs base + motion together), not only the static layer.
- **Mask vs filter:** In embedded WebKit, avoid **`mask-image` + `filter` on the same element** if both drop; use **outer mask, inner filtered stack** when needed.
- **Stacking:** Call out **`isolation`**, **`mix-blend-mode`**, **z-index**, **pointer-events** for the host (e.g. Framer section fills, negative `z-index`).

**Example source:** [Aceternity aurora registry](https://ui.aceternity.com/registry/aurora-background.json) — blur+invert on the same element as animated `::after`; split DOM needs a **filtered wrapper** around both layers.

---

## Optional: Cursor rule (save as `.cursor/rules/structured-prompt-enrichment.mdc`)

```yaml
---
description: When a task is underspecified for its complexity, offer the structured prompt template or restructure the ask and request missing details. Judge from context; do not over-apply to trivial prompts.
alwaysApply: true
---

# Structured prompt enrichment

Use **`framer-export/PROMPT_TEMPLATE_STRUCTURED_TASKS.md`** when the user’s message is **ambiguous**, **integration-heavy**, **“match X” without a source**, or **large in scope** relative to what they wrote.

1. **Decide** if more structure would materially reduce wrong assumptions. If yes: provide the **copy-paste template** from that file (or the full path) **or** rewrite their prompt into that shape, list **assumptions**, and ask **targeted** questions for gaps.
2. If the task is **small and clear** (obvious file, repro steps, one-liner fix), **execute** without requiring the template.
3. Specialty visual/embed/compositing guidance lives in **Appendix A** of the same file—use when context matches.
```
