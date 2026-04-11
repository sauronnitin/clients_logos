# Embed the Next.js integration hero in Framer (option 2)

The `aurora` app exposes a **minimal page** meant for an iframe:

**Path:** `/embed/integration-hero`  
**Example URL:** `https://YOUR_DEPLOYMENT.vercel.app/embed/integration-hero`

## 1. Deploy `aurora`

From the [`aurora`](../aurora) folder, deploy to [Vercel](https://vercel.com) (or any host). Set the project root to `aurora` if your repo root is the portfolio folder.

Confirm the URL loads the hero full-width with no extra chrome.

## 2. Add the embed in Framer

1. In Framer, insert **Embed** (or **Utility → Embed**).
2. Paste your deployed URL:  
   `https://<your-domain>/embed/integration-hero`
3. Set a **fixed height** tall enough for the block (the section uses large vertical padding; start around **720px** and adjust until nothing is clipped).
4. Set width to **100%** of your frame (or the max width you want).
5. Publish and check the live site (preview and production can differ).

## 3. If the iframe is blank or blocked

- **CSP:** This repo sets `frame-ancestors` for Framer hosts on `/embed/*`. If your site uses a **custom domain** on Framer, add that origin in [`aurora/next.config.mjs`](../aurora/next.config.mjs) under `frame-ancestors` (CSP wildcards may not cover every edge case).
- **Mixed content:** Framer is HTTPS; your embed URL must be **https**.
- **Height:** Increase the embed height if the bottom is cut off.

## 4. Tradeoffs (vs building in Framer)

- SEO: important copy inside the iframe is weaker for search than native Framer text.
- Performance: extra request + iframe boundary.
- Styling: matches the Next/Tailwind hero, not Framer’s native CMS logo strip unless you change the React component to load CMS data later.

## 5. Optional: dark mode

The hero respects **system** theme via `next-themes` in the root layout. The iframe does not know Framer’s theme toggle unless you add a query param and wire it in the app later (not implemented by default).
