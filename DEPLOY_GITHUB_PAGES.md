# Deploy with GitHub only (GitHub Pages + Actions)

Hosting uses **GitHub** (repository + Actions + Pages). No Vercel, Netlify, or other deploy products.

The Next.js app in **`aurora/`** is exported as **static files** (`next build` with `output: 'export'`) because GitHub Pages cannot run `next start`.

## One-time setup

1. Push this repo to GitHub (see [`DEPLOY_VERCEL_GITHUB.md`](DEPLOY_VERCEL_GITHUB.md) for `git remote` / `git push` if needed).
2. In the repo on GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
4. Merge or push to **`main`** (or **`master`**). The workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) will build and deploy.

After the first successful run, Pages shows your site URL (often `https://<user>.github.io/<repo>/`).

## URLs

| Repo type | Site base | Embed URL example |
|-----------|-----------|-------------------|
| Normal project repo | `https://<user>.github.io/<repository>/` | `https://<user>.github.io/<repository>/embed/integration-hero` |
| Repo named `<user>.github.io` | `https://<user>.github.io/` | `https://<user>.github.io/embed/integration-hero` |

The workflow sets **`NEXT_PUBLIC_BASE_PATH`** automatically: `/` + repository name for project sites, or empty for a `*.github.io` repository name.

## Local static build (optional)

PowerShell:

```powershell
cd aurora
$env:NEXT_STATIC_EXPORT = "1"
$env:NEXT_PUBLIC_BASE_PATH = "/your-repo-name"
npm run build
```

Open `aurora/out/index.html` via a static server (double-click may break client routing); e.g. `npx serve out`.

## Notes

- **CSP / `frame-ancestors`:** GitHub Pages does not apply the headers from `next.config.mjs`. Static builds skip those headers; Framer can usually still iframe the embed URL (more permissive than the Vercel-only CSP).
- **Private repos:** GitHub Pages on private repos requires a **paid** GitHub plan. Public repos use Pages for free.
- **Branch:** The workflow runs on pushes to `main` or `master`. Rename your default branch to match, or edit `pages.yml`.
