# Aurora (Next.js + shadcn/ui)

Next.js App Router app with **shadcn/ui** (Radix Nova preset), **Tailwind CSS v4**, and **TypeScript**. UI primitives live in [`components/ui`](./components/ui).

## Dependencies (baseline)

After `npx shadcn@latest init`, the app includes everything `cn()` and the registry need:

- `clsx`, `tailwind-merge`, `class-variance-authority`
- `lucide-react` (icons when components need them)
- `radix-ui` (Slot and primitives used by generated components)
- `shadcn`, `tw-animate-css` (registry / animation helpers)

**Adding more components:** run from this directory:

```bash
npx shadcn@latest add dialog
```

The CLI installs any extra `@radix-ui/*` (or other) peers. Then run:

```bash
npm run typecheck
```

Use **Node.js ≥ 20.9** for Next.js 16 (`npm run build`).

## Aurora background

- React implementation: [`components/ui/aurora-background.tsx`](./components/ui/aurora-background.tsx)
- Demo (Framer Motion): [`components/ui/aurora-background-demo.tsx`](./components/ui/aurora-background-demo.tsx)
- Theme tokens (`--animate-aurora`, palette vars): [`app/globals.css`](./app/globals.css)

## Framer (separate build)

The hosted Framer site does not use this bundle. For a **visually aligned** background, use native Framer layers or copy the plain-CSS reference in the repo root:

[`../framer-export/aurora-framer-reference.tsx`](../framer-export/aurora-framer-reference.tsx)

## Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
npm run typecheck
```
