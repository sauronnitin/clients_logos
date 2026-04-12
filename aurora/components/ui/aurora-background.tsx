"use client"

import { cn } from "@/lib/utils"
import type { CSSProperties, HTMLAttributes, ReactNode } from "react"

/** Literal hex gradients for Framer embed — avoids var(--blue-500) failing if chunks reorder. */
const EMBED_STRIPE_GRADIENT =
  "repeating-linear-gradient(100deg, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.58) 8%, transparent 11%, transparent 14%, rgba(255,255,255,0.42) 18%)"
const EMBED_COLOR_GRADIENT =
  "repeating-linear-gradient(100deg, #3b82f6 8%, #a5b4fc 13%, #93c5fd 20%, #ddd6fe 26%, #60a5fa 32%)"

function embedLayerBackground(): CSSProperties {
  return {
    backgroundImage: `${EMBED_STRIPE_GRADIENT}, ${EMBED_COLOR_GRADIENT}`,
  }
}

export interface AuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  showRadialGradient?: boolean
  /** No solid zinc fill — use behind Framer layers in an Embed (see /embed/aurora). */
  transparentBase?: boolean
  /**
   * Softer animated layer (no `mix-blend-difference`) for iframe/embed hosts where
   * the default blend reads as dark blobs or heavy haze over Framer text. Use `?soft=1` on `/embed/aurora`.
   */
  softBlend?: boolean
  /**
   * When `transparentBase` is on, filters still need an opaque surface to composite against.
   * Without this, `blur` + `invert` against transparency reads as black/muddy smears in iframes.
   * Embed routes should set this to true (zinc-50 plate inside the iframe only).
   */
  opaqueEmbedBase?: boolean
}

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

  /** Framer iframe: `invert` + white/black stripe gradients read as black rays; skip invert and difference blend. */
  const embedLightPipeline = opaqueEmbedBase
  const useSoftAnimatedLayer = softBlend || embedLightPipeline

  const gradientVars = embedLightPipeline
    ? `
            [--white-gradient:repeating-linear-gradient(100deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.55)_8%,transparent_11%,transparent_14%,rgba(255,255,255,0.4)_18%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_8%,var(--indigo-300)_13%,var(--blue-300)_20%,var(--violet-200)_26%,var(--blue-400)_32%)]
            `
    : `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            `

  /**
   * Tight top-right radial (main site) wipes most of the iframe on a full-width hero — copy side reads “empty”.
   * Embed pipeline skips it so blue/lavender washes fill the frame; main / demo keep the vignette.
   */
  const radialMask =
    !embedLightPipeline &&
    showRadialGradient &&
    `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`

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
      <div className="pointer-events-none absolute inset-0 z-[1] origin-center isolate scale-x-[-1] overflow-hidden">
        {embedLightPipeline ? (
          <div className="pointer-events-none absolute inset-0">
            <div className="aurora-embed-static" style={embedLayerBackground()} />
            <div className="aurora-embed-motion" style={embedLayerBackground()} />
          </div>
        ) : (
          <div
            className={cn(
              gradientVars,
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
              softBlend && "after:opacity-55",
              !softBlend && "after:opacity-90",
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
