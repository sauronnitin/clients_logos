/**
 * Framer visual parity (plain CSS, no Tailwind build).
 *
 * Framer Code Components do not compile Tailwind. Copy this file’s JSX + the
 * `<style>` rules into a Framer Code file, or recreate the same layers on the
 * canvas (stack: background fills → blur → content). Match tokens to
 * `aurora/app/globals.css` (:root blues / zinc) when aligning with the Next app.
 *
 * This file is not imported by the Next.js `aurora` app.
 *
 * Stacking: pass hero UI as `children`, or keep aurora behind separate Framer layers
 * in the Layers panel — `mix-blend-mode` must not sit above your text in paint order.
 */

import * as React from "react"

const css = `
@keyframes aurora-framer {
  from { background-position: 50% 50%, 50% 50%; }
  to { background-position: 350% 50%, 350% 50%; }
}

.aurora-framer-root {
  --white: #ffffff;
  --black: #000000;
  --transparent: transparent;
  --blue-300: #93c5fd;
  --blue-400: #60a5fa;
  --blue-500: #3b82f6;
  --indigo-300: #a5b4fc;
  --violet-200: #ddd6fe;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  color: #020617;
  /* Keep mix-blend/difference from compositing over sibling UI */
  isolation: isolate;
}

/* Solid fill — matches Next bg-zinc-50 / dark:bg-zinc-900 */
.aurora-framer-root.aurora-framer-root--solid {
  background: #fafafa;
}

.dark .aurora-framer-root.aurora-framer-root--solid {
  background: #18181b;
  color: #f8fafc;
}

/* Default for Framer: no fill so the page/section background shows (not flat white) */
.aurora-framer-root.aurora-framer-root--transparent {
  background: transparent;
}

.aurora-framer-backdrop {
  --white-gradient: repeating-linear-gradient(
    100deg,
    var(--white) 0%,
    var(--white) 7%,
    var(--transparent) 10%,
    var(--transparent) 12%,
    var(--white) 16%
  );
  --dark-gradient: repeating-linear-gradient(
    100deg,
    var(--black) 0%,
    var(--black) 7%,
    var(--transparent) 10%,
    var(--transparent) 12%,
    var(--black) 16%
  );
  /* Aceternity registry stops */
  --aurora: repeating-linear-gradient(
    100deg,
    var(--blue-500) 10%,
    var(--indigo-300) 15%,
    var(--blue-300) 20%,
    var(--violet-200) 25%,
    var(--blue-400) 30%
  );
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  transform: scaleX(-1);
  transform-origin: center center;
}

.aurora-framer-base {
  position: absolute;
  inset: -10px;
  /* Aceternity registry: opacity-50, blur(10px), invert */
  opacity: 0.5;
  filter: blur(10px) invert(1);
  background-image: var(--white-gradient), var(--aurora);
  background-size: 300%, 200%;
  background-position: 50% 50%, 50% 50%;
}

.dark .aurora-framer-base {
  filter: blur(32px) invert(0);
  background-image: var(--dark-gradient), var(--aurora);
}

/* Must match Next arbitrary mask: ellipse at 100% 0% (not a fixed 80%×50% ellipse) */
.aurora-framer-radial.aurora-framer-base {
  mask-image: radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%);
}

.aurora-framer-shimmer {
  position: absolute;
  inset: 0;
  mix-blend-mode: difference;
  /* scroll avoids broken “fixed” attachment inside Framer’s viewport */
  background-attachment: scroll;
  background-image: var(--white-gradient), var(--aurora);
  background-size: 200%, 100%;
  animation: aurora-framer 60s linear infinite;
  will-change: background-position;
}

.dark .aurora-framer-shimmer {
  background-image: var(--dark-gradient), var(--aurora);
}

.aurora-framer-radial.aurora-framer-shimmer {
  mask-image: radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%);
}

.aurora-framer-content {
  position: relative;
  z-index: 2;
  isolation: isolate;
  mix-blend-mode: normal;
  /* Sit above the glow; Framer text/buttons passed as children stay crisp */
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
`

export type AuroraFramerReferenceProps = {
  children?: React.ReactNode
  showRadialGradient?: boolean
  /**
   * When true (default), root has no fill — Framer page/section color shows through.
   * When false, uses the same zinc-50 / zinc-900 base as the Next `AuroraBackground`.
   */
  transparentBase?: boolean
}

/**
 * Plain-CSS aurora aligned with `aurora/components/ui/aurora-background.tsx`
 * (blur, mask, opacity tuned for Framer’s canvas; default transparent base).
 */
export function AuroraFramerReference({
  children,
  showRadialGradient = true,
  transparentBase = true,
}: AuroraFramerReferenceProps) {
  const rootClass =
    "aurora-framer-root " +
    (transparentBase
      ? "aurora-framer-root--transparent"
      : "aurora-framer-root--solid")

  return (
    <div className={rootClass}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="aurora-framer-backdrop">
        <div
          className={
            showRadialGradient
              ? "aurora-framer-base aurora-framer-radial"
              : "aurora-framer-base"
          }
        />
        <div
          className={
            showRadialGradient
              ? "aurora-framer-shimmer aurora-framer-radial"
              : "aurora-framer-shimmer"
          }
        />
      </div>
      <div className="aurora-framer-content">{children}</div>
    </div>
  )
}

export default AuroraFramerReference
