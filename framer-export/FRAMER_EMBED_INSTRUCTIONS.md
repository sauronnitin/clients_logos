# Embed the Next.js integration hero in Framer (option 2)

The `aurora` app exposes a **minimal page** meant for an iframe:

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
