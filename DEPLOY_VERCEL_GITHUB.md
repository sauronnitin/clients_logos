# Deploy `aurora` with GitHub + Vercel

If you want **GitHub only** (no Vercel/Netlify), use **[`DEPLOY_GITHUB_PAGES.md`](DEPLOY_GITHUB_PAGES.md)** instead.

The Next.js app lives in **`aurora/`**. The Git repository root is this folder (`Portfolio - Framer - Mar26`).

## 1. Create a GitHub repository

1. On GitHub: **New repository** (empty, no README if you already have files locally).
2. Copy the remote URL, e.g. `https://github.com/YOU/portfolio-framer-mar26.git`.

## 2. Push from this machine

A local repo is already initialized with an initial commit. In a terminal (including Cursor’s), from **this project root**:

```powershell
git remote add origin https://github.com/YOU/YOUR-REPO.git
git push -u origin main
```

(`main` is already the default branch name here.)

If `origin` already exists, use `git remote set-url origin ...` instead.

## 3. Import the repo in Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → import your GitHub repo.
2. **Root Directory:** set to **`aurora`** (required).
3. Framework Preset: **Next.js** (auto-detected).
4. **Deploy.**

Vercel will run `npm install` and `npm run build` inside `aurora` on every push to the production branch.

## 4. Framer embed URL

After deploy, your embed URL is:

`https://<your-vercel-domain>/embed/integration-hero` or `…/embed/clients-marquee`

Use that in Framer’s **Embed** block. If the iframe is blocked, add your Framer site origin to `frame-ancestors` in [`aurora/next.config.mjs`](aurora/next.config.mjs).

## Notes

- Do not commit `aurora/node_modules` or `aurora/.next` (ignored via [`.gitignore`](.gitignore)).
- If the GitHub repo is private, connect Vercel with a GitHub integration that has access to that repo.
