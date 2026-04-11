/**
 * Framer visual parity (plain CSS, no Tailwind build).
 *
 * Framer Code Components do not compile Tailwind. Copy this file’s JSX + the
 * `<style>` rules into a Framer Code file, or recreate the same layers on the
 * canvas (stack: background fills → blur → content). Match tokens to
 * `aurora/app/globals.css` (:root blues / zinc) when aligning with the Next app.
 *
 * This file is not imported by the Next.js `aurora` app.
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
  background: #fafafa;
  color: #020617;
}

.dark .aurora-framer-root {
  background: #18181b;
  color: #f8fafc;
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
  overflow: hidden;
  pointer-events: none;
}

.aurora-framer-base {
  position: absolute;
  inset: -10px;
  opacity: 0.5;
  filter: blur(10px) invert(1);
  background-image: var(--white-gradient), var(--aurora);
  background-size: 300%, 200%;
  background-position: 50% 50%, 50% 50%;
}

.dark .aurora-framer-base {
  filter: blur(10px) invert(0);
  background-image: var(--dark-gradient), var(--aurora);
}

.aurora-framer-radial.aurora-framer-base {
  mask-image: radial-gradient(ellipse 80% 50% at 100% 0%, black 10%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 80% 50% at 100% 0%, black 10%, transparent 70%);
}

.aurora-framer-shimmer {
  position: absolute;
  inset: 0;
  mix-blend-mode: difference;
  background-attachment: fixed;
  background-image: var(--white-gradient), var(--aurora);
  background-size: 200%, 100%;
  animation: aurora-framer 60s linear infinite;
}

.dark .aurora-framer-shimmer {
  background-image: var(--dark-gradient), var(--aurora);
}

.aurora-framer-content {
  position: relative;
  z-index: 1;
}
`

export type AuroraFramerReferenceProps = {
  children?: React.ReactNode
  showRadialGradient?: boolean
}

/**
 * Drop-in visual twin of `aurora/components/ui/aurora-background.tsx` using plain CSS.
 */
export function AuroraFramerReference({
  children,
  showRadialGradient = true,
}: AuroraFramerReferenceProps) {
  return (
    <div className="aurora-framer-root">
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
