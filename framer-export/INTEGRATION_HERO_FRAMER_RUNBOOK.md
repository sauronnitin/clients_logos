# Integration hero + CMS marquee — Framer (Free) runbook

Use this in the Framer editor to implement the plan. Repo artifacts: [`cms-clients-framer-schema.json`](cms-clients-framer-schema.json) (field audit), [`assets/dot-grid-hero.svg`](assets/dot-grid-hero.svg) and [`assets/dot-grid-hero-dark.svg`](assets/dot-grid-hero-dark.svg) (24px tiles for light / dark backgrounds).

---

## 1. CMS field audit (todo: audit-cms-fields)

1. Open **CMS** and select your **Clients** collection.
2. Compare fields to [`cms-clients-framer-schema.json`](cms-clients-framer-schema.json). Minimum for the marquee: **Image**, **Link**, **Title** (or equivalent for alt text).
3. Optional: add **Order** (number) and **Show in marquee** (boolean); filter the Collection List with `Show in marquee == true` when you roll that out.
4. Confirm **12** client items match [`cms-clients.csv`](cms-clients.csv) (images and links load in CMS table view).

---

## 2. Section layout (todo: build-hero-layout)

1. Add a **Frame** (full width) for the section; name it `Integration Hero`.
2. Inside, add a **vertical Stack** centered horizontally, **max width** ~1120–1280px, **padding** ~96px top/bottom (adjust to taste).
3. **Background (dot grid):** Behind the stack, add a layer covering the section. Use **Image** with [`assets/dot-grid-hero.svg`](assets/dot-grid-hero.svg) (light) or [`assets/dot-grid-hero-dark.svg`](assets/dot-grid-hero-dark.svg) (dark) set to **tile/repeat**, or build a dot pattern in Framer; tune **opacity** per theme.
4. **Badge:** Text frame, pill style — full corner radius, border, small padding; copy e.g. `Integrations`.
5. **Headline** (H1 style) e.g. `Integrate with favorite tools`.
6. **Subcopy** — muted style; max width ~36rem centered.
7. **CTA:** Button or Link component to your target URL.

Leave space below for the marquee block (§3–4).

---

## 3. Marquee row 1 (todo: marquee-row-1)

1. **Mask:** New **Frame** full width of the content area, fixed height ~88–100px, **clip contents** / overflow hidden (Framer: clip sublayers).
2. **Track:** Inside mask, **horizontal Stack**, gap ~40px, vertical align center. Name it `Marquee Track 1`.
3. **First CMS List:** Insert **CMS Collection List** → collection **Clients**, same sort you want (Title A–Z or **Order** ascending).  
   - **Item template:** Frame **64×64**, corner radius **pill/full**, fill matches light/dark card, light **shadow**.  
   - Inner **Image** bound to CMS **Image**, fit **contain**.  
   - Wrap in **Link** to CMS **Link** (external, new tab if available).  
   - Set accessible name from **Title** where Framer allows alt / label on CMS images.
4. **Second CMS List:** Duplicate the **entire** Collection List (same collection, same sort, same template). Place it **to the right** of the first list in the same `Marquee Track 1` stack so the order is `[List A][List B]` with identical items — this duplicates the strip for a seamless loop.

---

## 4. Marquee row 2 + motion (todo: marquee-row-2)

1. Duplicate the **mask + track + two lists** group for **Row 2**; name `Marquee Track 2`.
2. Add **vertical spacing** between Row 1 and Row 2 (~24px).
3. **Animate Row 1 track:** Select `Marquee Track 1`. Add **Motion** (or **Scroll / Effects** depending on Framer version) animating **X position**:
   - **Linear** easing, duration **~30s**.
   - Start/end: move so that over one cycle the track shifts by exactly **half** its total width (one list width = width of first CMS list including gaps). Use **Repeat / Loop** = infinite if shown.
4. **Animate Row 2 track:** Same setup but **reverse** direction (invert start and end X, or use negative distance) so row 2 scrolls opposite to row 1.
5. If **infinite repeat** is unavailable on Free: use **scroll-linked** horizontal offset on the section as fallback, or a single slow **Appear** motion; re-check Framer release notes for loop on transforms.

**Seam fix:** If the loop jumps, nudge **gap** or verify both lists have the same item count and sort; the translation must equal the width of **one** of the two identical sequences.

---

## 5. Edge fades + responsive + QA (todo: edge-fades-responsive)

1. **Fades:** On each mask frame, add two **absolute** layers on top (left and right), narrow (~96px), **linear gradient** from background color to transparent. Do **not** put links inside these layers so clicks pass through to logos (or disable pointer on gradient frames if Framer exposes it).
2. **Tablet/mobile breakpoints:** Duplicate breakpoint layouts or use responsive props: logo **48–56px**, smaller **gap** (~24–32px), reduce mask height slightly; keep tappable area ≥ **44px** if links remain on logos.
3. **QA:** Run through the checklist in `cms-clients-framer-schema.json` → `auditChecklist`, plus: no seam at loop boundary, external links correct, dark mode readable grid and fades.

---

## Reference copy (from React hero)

- Badge: `Integrations` (optional prefix emoji in Framer text if desired).
- Headline: `Integrate with favorite tools`
- Body: `250+ top apps are available to integrate seamlessly with your workflow.`
- CTA: `Get started` (set href in Framer).

Adjust copy to match your portfolio voice.
