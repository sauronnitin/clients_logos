# Embed Next.js pages in Framer (iframes)

## Aurora-only background (`/embed/aurora`)

Use this when you want the **animated aurora** behind a Framer section (no hero copy, no footer).

**Path:** `/embed/aurora`

**Example (GitHub Pages, repo `clients_logos`):**  
`https://sauronnitin.github.io/clients_logos/embed/aurora`

### Steps in Framer

1. Build your **section** (headline, logos, etc.) in Framer as usual.
2. Insert **Embed** (Utilities → **Embed**).
3. Paste the full **https** URL above (swap user/repo if yours differ).
4. In the **Layers** panel, drag the Embed **below** your content so the content sits **on top**, or pin the Embed **absolute** with **Fill** so it covers the section and keep content in a higher **z-index** layer.
5. Set the Embed frame to the **same size** as the section (width **100%**, height = section height — e.g. **720–900px**). The aurora uses `100vh` inside the iframe, so it fills whatever height you give the embed.
6. **Layer order:** An iframe is a **rectangle of pixels**, not a Photoshop mask. Anything **behind** the Embed in Framer is **hidden** unless the iframe’s page leaves areas transparent. The deployed `/embed/aurora` route uses a **transparent** `html`/`body` and **no solid zinc fill** so Framer content **below** the Embed can show through where the glow is thin or masked—but the blurred gradient still covers a lot of the area. For **crisp** logos or a marquee, place those layers **above** the Embed (higher in the layer list), not underneath.
7. Publish and test on the live Framer site.

### If “Book a call” (or any Framer button) does not click

The **Embed** is still a full rectangle in the layer stack. After deploy, `/embed/aurora` uses **`pointer-events: none`** on the iframe document so clicks pass through to Framer content **on top** of the embed. If a button still ignores clicks:

- In **Layers**, move the Embed **below** the CTA and text (lower in the list = farther back).
- Or select the Embed → **Effects** (or style overrides) → set **pointer events** to **None** if Framer exposes it.

### Without an iframe (Code / native)

- Copy the plain-CSS reference from [`aurora-framer-reference.tsx`](aurora-framer-reference.tsx) into a **Framer Code** component, or rebuild the look with **gradients + blur** on a full-bleed frame (no Tailwind in Code).

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
