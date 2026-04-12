# Embed Next.js pages in Framer (iframes)

## Aurora-only background (`/embed/aurora`)

Use this when you want the **animated aurora** behind a Framer section (no hero copy, no footer).

**Path:** `/embed/aurora`

**Example (GitHub Pages, repo `clients_logos`):**  
`https://sauronnitin.github.io/clients_logos/embed/aurora`

### Why Framer buttons stop working (important)

`pointer-events: none` **inside** the Next.js page only changes hit-testing **inside the iframe**. It does **not** make the iframe transparent to clicks on the **Framer** page. The `<iframe>` node Framer injects still sits on top of your stack and **captures every click** in its box until **Framer** applies `pointer-events: none` to that layer (or you use a Code component that sets it on the iframe).

**You want three outcomes at once:** aurora visible, Framer text/buttons clickable, correct stacking. Pick **one** of the approaches below.

---

### Option A — Native Embed + Framer “Pointer events” (quickest)

1. Build the section (headline, CTA, etc.) as usual.
2. Add **Embed** (Utilities → **Embed**) and paste your full **https** aurora URL.
3. Size the embed to the section (e.g. width **100%**, height **720–900px**). Inside the iframe, aurora uses `100vh` relative to the iframe height.
4. In **Layers**, put the Embed **behind** copy and buttons (lower in the list than the things you need to click).
5. **Critical:** Select the **Embed** layer → right panel **Styles** → **+** → add **Pointer events** → set to **None** so clicks reach Framer layers above.  
   Framer docs: [Disable pointer events](https://www.framer.com/help/articles/disable-pointer-events/)
6. Publish and test on the **live** site (preview can differ).

#### Headline / badge / body look “under” the glow (hazy or dark blobs on letters)

Framer’s **Embed** only loads the page at  
`https://sauronnitin.github.io/clients_logos/embed/aurora` — your “Available for new projects” line, title, and paragraph **are not inside that URL**. They are separate Framer layers. **Paint order follows the Layers list:** whatever is **higher** in the list is drawn **on top**.

- Drag the **Embed** layer **below** your text stack (badge, heading, body) so copy sits **above** the iframe.
- **Pointer events → None** on the Embed only fixes clicks; it does **not** move the glow behind the text.

If the order is already correct but the effect still feels harsh, try a softer blend (hosted page): append **`?soft=1`** to the embed URL, e.g.  
`https://sauronnitin.github.io/clients_logos/embed/aurora?soft=1`  
That turns off `mix-blend-difference` on the moving layer inside the iframe (slightly different look, fewer dark artifacts).

#### Aurora looks black / muddy inside the iframe (light Framer page)

The hosted `/embed/aurora` route paints a **zinc-50 plate inside the iframe** behind the blurred gradients so `blur` + `invert` composite against a real light surface. Without that, transparency under the filters reads as **dark smears**. Redeploy GitHub Pages (or your host) after updating the `aurora` app so you get this behavior.

#### Framer Embed only offers Fixed / Relative height (no Fill / Auto)

Set a **fixed height in px** that matches your hero frame (often **720–900**; tweak until the glow is not clipped). **Width** can be **100%** or full bleed. Position the embed **inside** the hero section; avoid full-viewport **fixed** unless you also raise `z-index` on the text stack (see `AURORA_HERO_STACKING_PLAN.md`).

---

### Option B — Code component iframe (guaranteed pass-through)

If you do not see Pointer events on the Embed, or it still blocks clicks:

1. In Framer: **Assets → Code** → create a component from [`AuroraIframePassThrough.tsx`](AuroraIframePassThrough.tsx) (copy/paste the file).
2. On canvas, size it like a full-bleed background and place it **behind** hero content in **Layers**.
3. Set **Aurora URL** in the properties panel to your deployed `/embed/aurora` URL.

The component sets `pointer-events: none` on both the wrapper and the **iframe** in Framer’s DOM, which is what actually lets “Book a call” and other native controls work. The wrapper also uses **`isolation: isolate`** so the hosted page’s blend modes stay inside the iframe bitmap and your Framer text stays crisp on top.

The **GitHub Pages** `/embed/aurora` route applies the same idea inside the iframe (`isolate` on `html`/`body` via `data-embed-transparent`, plus embed layout + `AuroraBackground`). Re-sync the Code file after repo updates, then redeploy Pages so the hosted document matches.

---

### Option C — No iframe (true background, best UX)

For a decorative background with **zero** iframe quirks, use the plain-CSS twin in [`aurora-framer-reference.tsx`](aurora-framer-reference.tsx) as a **Framer Code** component (or rebuild the same layers with gradients + blur on the canvas). Same visual language as the Next app; all hero UI stays 100% native Framer.

The component defaults to **`transparentBase`** so your Framer section background shows through (no flat white card). Pass **`transparentBase={false}`** if you want the same zinc-50 / dark zinc fill as the Next site. After pulling updates, **re-paste** the file into Framer so CSS changes apply.

**Stacking (text looks washed out by the glow):** The aurora uses `mix-blend-mode`. Either (1) place your headline and body **inside** the Code component as **children** (so they render in `.aurora-framer-content`, above the glow), or (2) if they are **separate** Framer layers, put those layers **above** the aurora in the **Layers** panel (higher in the list = drawn on top). Pointer-events **None** on the aurora layer does not change paint order.

---

### Layer order reminder

An iframe is a **rectangle of pixels**. The hosted `/embed/aurora` page uses a **transparent** `html`/`body` and no solid base so, visually, Framer layers **behind** the iframe can show through in softer areas—but **clicks** still require **Pointer events: None** (Option A) or **Option B/C** above. Put logos, marquees, and CTAs **above** the aurora layer in the layer list.

---

## Integration hero (`/embed/integration-hero`)

The `aurora` app also exposes a **minimal page** for the integrations hero:

**Path:** `/embed/integration-hero`

## Deployed URL examples

- **GitHub Pages (GitHub-only hosting):**  
  `https://<user>.github.io/<repository>/embed/integration-hero`  
  Use your real `user` and `repository` from the Pages URL. If the repo is named `<user>.github.io`, there is **no** extra path segment:  
  `https://<user>.github.io/embed/integration-hero`  
  Setup: [`DEPLOY_GITHUB_PAGES.md`](../DEPLOY_GITHUB_PAGES.md).

- **Other hosts (e.g. Vercel):**  
  `https://YOUR_DOMAIN/embed/integration-hero`  
  Set the project **root** to `aurora` when the repo root is this portfolio folder.

Confirm the URL loads the hero full-width with no extra chrome.

## Add the embed in Framer

1. In Framer, insert **Embed** (or **Utility → Embed**).
2. Paste your full **https** URL (include the `/repository` segment for GitHub project Pages).
3. Set a **fixed height** tall enough for the block (the section uses large vertical padding; start around **720px** and adjust until nothing is clipped).
4. Set width to **100%** of your frame (or the max width you want).
5. Publish and check the live site (preview and production can differ).

## If you see “Application error: a client-side exception”

Embedded pages must not use **`next-themes` / `localStorage`** in a cross-origin iframe (Framer blocks storage; Safari throws). This repo keeps **`ThemeProvider` only on site routes** (`(site)` group); **`/embed/*`** routes render without it so the aurora and integration-hero embeds load in Framer.

## If the iframe is blank or blocked

- **Wrong path:** GitHub project sites need the repo name in the path; copy the URL from the browser after opening the deployed page.
- **CSP:** On **non–GitHub Pages** hosts, this repo can set `frame-ancestors` for `/embed/*` in [`aurora/next.config.mjs`](../aurora/next.config.mjs) when **not** using static export. **GitHub Pages** builds do not send those headers; if Framer still blocks, check Framer’s embed settings and use an **https** URL.
- **Mixed content:** Framer is HTTPS; your embed URL must be **https**.
- **Height:** Increase the embed height if the bottom is cut off.

## Tradeoffs (vs building in Framer)

- SEO: important copy inside the iframe is weaker for search than native Framer text.
- Performance: extra request + iframe boundary.
- Styling: matches the Next/Tailwind hero, not Framer’s native CMS logo strip unless you change the React component to load CMS data later.

## Optional: dark mode

The hero respects **system** theme via `next-themes` in the root layout. The iframe does not know Framer’s theme toggle unless you add a query param and wire it in the app later (not implemented by default).
