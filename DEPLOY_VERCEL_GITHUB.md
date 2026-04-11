# Deploy `aurora` with GitHub + Vercel

The Next.js app lives in **`aurora/`**. The Git repository root is this folder (`Portfolio - Framer - Mar26`).

## 1. Create a GitHub repository

1. On GitHub: **New repository** (empty, no README if you already have files locally).
2. Copy the remote URL, e.g. `https://github.com/YOU/portfolio-framer-mar26.git`.

## 2. Push from this machine

In a terminal (including Cursor’s terminal), from **this project root**:

```powershell
git remote add origin https://github.com/YOU/YOUR-REPO.git
git branch -M main
git push -u origin main
```

If `origin` already exists, use `git remote set-url origin ...` instead.

## 3. Import the repo in Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → import your GitHub repo.
2. **Root Directory:** set to **`aurora`** (required).
3. Framework Preset: **Next.js** (auto-detected).
4. **Deploy.**

Vercel will run `npm install` and `npm run build` inside `aurora` on every push to the production branch.

## 4. Framer embed URL

After deploy, your embed URL is:

`https://<your-vercel-domain>/embed/integration-hero`

Use that in Framer’s **Embed** block. If the iframe is blocked, add your Framer site origin to `frame-ancestors` in [`aurora/next.config.mjs`](aurora/next.config.mjs).

## Notes

- Do not commit `aurora/node_modules` or `aurora/.next` (ignored via [`.gitignore`](.gitignore)).
- If the GitHub repo is private, connect Vercel with a GitHub integration that has access to that repo.
