"use client"

import { cn } from "@/lib/utils"
import type { CSSProperties, HTMLAttributes, ReactNode } from "react"

/**
 * Same radial vignette as Aceternity / 21st.dev and `aurora-framer-reference.tsx`:
 * `radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)`
 * (Avoid `ellipse Wx H at …` here — an oversized ellipse can make the fade invisible.)
 */
const AURORA_VIGNETTE_MASK =
  "radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)"

function vignetteStyle(show: boolean): CSSProperties {
  if (!show) return {}
  return {
    WebkitMaskImage: AURORA_VIGNETTE_MASK,
    maskImage: AURORA_VIGNETTE_MASK,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskPosition: "0% 0%",
    maskPosition: "0% 0%",
  }
}

export interface AuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  showRadialGradient?: boolean
  /** No solid zinc fill — use behind Framer layers in an Embed (see /embed/aurora). */
  transparentBase?: boolean
  /**
   * Softer animated layer (`mix-blend-normal`, lower opacity). Use `?soft=1` on `/embed/aurora`
   * if `mix-blend-difference` reads harsh over Framer UI.
   */
  softBlend?: boolean
  /**
   * Opaque zinc plate inside the iframe for filter compositing; embed uses the same *visual*
   * recipe as the main site (21st / Aceternity) in two DOM layers so animation stays reliable.
   */
  opaqueEmbedBase?: boolean
}

/** Light-mode aurora stripes — matches non-embed `AuroraBackground` / Aceternity-style recipe. */
const lightAuroraGradientVars = `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            `

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  transparentBase = false,
  softBlend = false,
  opaqueEmbedBase = false,
  ...props
}: AuroraBackgroundProps) {
  const afterAttachment = opaqueEmbedBase
    ? "after:[background-attachment:scroll]"
    : "after:[background-attachment:fixed]"

  const useSoftAnimatedLayer = softBlend

  const radialMask =
    !opaqueEmbedBase &&
    showRadialGradient &&
    `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`

  const maskInline = vignetteStyle(showRadialGradient)

  return (
    <div
      className={cn(
        "relative isolate flex h-[100vh] flex-col items-center justify-center text-slate-950 transition-colors",
        !transparentBase &&
          "bg-zinc-50 dark:bg-zinc-900",
        transparentBase &&
          "pointer-events-none bg-transparent dark:bg-transparent",
        className
      )}
      {...props}
    >
      {transparentBase && opaqueEmbedBase ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 bg-zinc-50 dark:bg-zinc-900"
        />
      ) : null}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] origin-center scale-x-[-1] overflow-hidden",
          /* Embed: skip isolate so the motion layer can difference-blend against the blurred base. */
          !opaqueEmbedBase && "isolate"
        )}
      >
        {opaqueEmbedBase ? (
          <div
            className="pointer-events-none absolute -inset-[10px] overflow-hidden"
            style={showRadialGradient ? maskInline : undefined}
          >
            {/*
             * Same stack as 21st/Aceternity: blurred + inverted base, sharp animated layer with
             * mix-blend-difference (or soft normal). Split into two nodes so iframe engines still
             * run background-position animation. Vignette on this wrapper avoids WebKit dropping
             * mask when combined with filter: blur() on the base layer.
             */}
            <div
              className={cn(
                lightAuroraGradientVars,
                "aurora-21st-base pointer-events-none absolute inset-0",
                "[background-image:var(--white-gradient),var(--aurora)]",
                "[background-size:300%,_200%]",
                "[background-position:50%_50%,50%_50%]",
                "opacity-65 will-change-transform"
              )}
            />
            <div
              className={cn(
                lightAuroraGradientVars,
                "aurora-21st-motion pointer-events-none absolute inset-0",
                "[background-image:var(--white-gradient),var(--aurora)]",
                "[background-size:200%,_100%]",
                "[background-attachment:scroll]",
                useSoftAnimatedLayer
                  ? "mix-blend-normal opacity-55"
                  : "mix-blend-difference opacity-90"
              )}
            />
          </div>
        ) : (
          <div
            className={cn(
              lightAuroraGradientVars,
              "[background-image:var(--white-gradient),var(--aurora)]",
              "dark:[background-image:var(--dark-gradient),var(--aurora)]",
              "[background-size:300%,_200%]",
              "[background-position:50%_50%,50%_50%]",
              "pointer-events-none absolute -inset-[10px] blur-[32px] filter will-change-transform",
              "opacity-65 invert dark:invert-0",
              !useSoftAnimatedLayer &&
                `
            after:absolute after:inset-0 after:animate-aurora after:mix-blend-difference after:opacity-90 after:content-[""]
            after:[background-image:var(--white-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            `,
              !useSoftAnimatedLayer && afterAttachment,
              useSoftAnimatedLayer &&
                `
            after:absolute after:inset-0 after:animate-aurora after:mix-blend-normal after:content-[""]
            after:[background-image:var(--white-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            `,
              useSoftAnimatedLayer && "after:opacity-55",
              useSoftAnimatedLayer && afterAttachment,
              radialMask
            )}
          />
        )}
      </div>
      <div className="relative z-10 isolate mix-blend-normal flex w-full flex-1 flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}
