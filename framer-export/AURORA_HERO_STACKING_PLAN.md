# Plan: Aurora behind hero copy + marquee (Framer + GitHub embed)

**Goal:** “Available for new projects,” headline, body, client-logo marquee, and CTAs are **visually on top** of the aurora; aurora reads as **background only**; **Book a call** (and other controls) stay **clickable**.

**Context you confirmed**

- Embed URL: hosted `/embed/aurora` (optionally `?soft=1`).
- In **Layers**, Embed is **separate** and **bottom-most** in the hero — good for *list* order.
- Embed is **`position: fixed`** — this often **breaks** the intuitive “below = behind” behavior because fixed layers participate in the **viewport stacking context** and can paint **over** in-flow hero content unless z-index is explicitly managed.

**References (read once, then use while testing)**

| Topic | Why it matters |
|--------|----------------|
| [Framer — Disable pointer events](https://www.framer.com/help/articles/disable-pointer-events/) | Clicks through iframe; does **not** fix paint order. |
| [MDN — `position: fixed`](https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed) | Fixed is removed from normal flow; positioned vs **viewport** (or containing block). |
| [MDN — Stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-order/Stacking_context) | `fixed`, `z-index`, `transform`, and `isolation` create contexts that change who paints on top. |
| Repo: [`FRAMER_EMBED_INSTRUCTIONS.md`](./FRAMER_EMBED_INSTRUCTIONS.md) | Embed URL, `?soft=1`, Pointer events, Code iframe option. |

---

## Phase A — Quick checks (5–10 min)

| # | Action | Pass criteria |
|---|--------|----------------|
| A1 | On **live** site (not only canvas), open DevTools → **Inspect** the iframe and the text wrapper. Note computed `position` and `z-index` on both. | You can see whether fixed + z-index explains overlap. |
| A2 | Temporarily set Embed to **not fixed** (e.g. **Absolute** with **Fill** to the **hero frame only**, or stretch inside hero section — not full viewport). Republish. | Copy + marquee look **sharp**; aurora still visible **behind** them. |
| A3 | If A2 fixes it: keep Embed **inside** the same hero **Section** as text; avoid spanning the whole site with fixed unless nav is the only thing that should sit above it. | Hero-only background; no aurora over footer/other sections unless intended. |

**Validation:** Headline/badge/body/marquee are crisp; aurora visibly **behind**; Book button still works (if Embed has Pointer events **None** or [`AuroraIframePassThrough.tsx`](./AuroraIframePassThrough.tsx)).

---

## Phase B — Z-index discipline (if you must keep fixed or overlap persists)

| # | Action | Pass criteria |
|---|--------|----------------|
| B1 | Select the **container** that holds text + marquee (and soon 21st.dev block). In **Styles → +**, add **`z-index`** (try **1**, then **10** if needed). | That stack paints **above** the iframe. |
| B2 | Ensure the Embed / iframe wrapper has **lower** z-index (0 or auto) or no z-index. | Clear ordering: content > aurora. |
| B3 | If the hero **Section** has `overflow: hidden` or odd `clip`, confirm it’s not clipping the wrong subtree. | No accidental clipping of text or marquee. |

**References:** [MDN stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-order/Stacking_context).

**Validation:** Same as Phase A; marquee logos sharp; no haze or dark blobs **on** letterforms.

---

## Phase C — Hosted page tuning (optional)

| # | Action | Pass criteria |
|---|--------|----------------|
| C1 | Point Embed to `…/embed/aurora?soft=1` after deploy ([`FRAMER_EMBED_INSTRUCTIONS.md`](./FRAMER_EMBED_INSTRUCTIONS.md)). | Fewer harsh **difference-blend** artifacts if order is correct but glow still feels strong. |
| C2 | Keep **Pointer events → None** on the Embed ([Framer help](https://www.framer.com/help/articles/disable-pointer-events/)). | CTAs remain clickable. |

**Validation:** Visual softer; interaction unchanged.

---

## Phase D — Swap Embed for Code iframe (if Framer UI blocks A/B)

| # | Action | Pass criteria |
|---|--------|----------------|
| D1 | Use [`AuroraIframePassThrough.tsx`](./AuroraIframePassThrough.tsx) with the same GitHub URL; size and place like current Embed; **not** fixed full viewport unless you repeat B1/B2. | Same as Phase A + guaranteed `pointer-events: none` on iframe in Framer’s DOM. |

**Validation:** Same as Phase A.

---

## Phase E — 21st.dev marquee swap (upcoming)

| # | Action | Pass criteria |
|---|--------|----------------|
| E1 | After replacing the marquee, put the new component in the **same** stack as headline/body (the one you raised with z-index in B1). | Marquee stays **above** aurora like text. |
| E2 | Re-run A2/B1 if the new component introduces its own `transform` / `isolation` / `fixed`. | No regression on stacking. |

**Reference:** [MDN — `transform` creates a stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-order/Stacking_context).

---

## Definition of done (checklist)

- [ ] Badge, headline, body, and marquee read **crisp** (no “underwater” / difference blobs on type).
- [ ] Aurora reads as **background** (visible but not obscuring UI).
- [ ] **Book a call** and other hero links work (pointer strategy unchanged).
- [ ] Behavior matches on **published** site (Framer preview can differ).
- [ ] Document which combination worked (fixed vs absolute, z-index values, `?soft=1` yes/no) for your future self and the 21st.dev swap.

---

## Most likely fix given your answers

**`position: fixed` on the Embed** while text/marquee are in-flow or in a different stacking subtree — list order in Framer is not enough; **try Phase A2 first**, then **B1** if you must keep fixed.
