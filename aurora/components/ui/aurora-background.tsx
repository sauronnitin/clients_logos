"use client"

import { cn } from "@/lib/utils"
import type { HTMLAttributes, ReactNode } from "react"

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
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            pointer-events-none absolute -inset-[10px] opacity-65 blur-[32px] invert filter will-change-transform
            dark:invert-0
            `,
            !softBlend &&
              `
            after:absolute after:inset-0 after:animate-aurora after:mix-blend-difference after:opacity-90 after:content-[""]
            after:[background-image:var(--white-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            `,
            !softBlend && afterAttachment,
            softBlend &&
              `
            after:absolute after:inset-0 after:animate-aurora after:mix-blend-normal after:opacity-55 after:content-[""]
            after:[background-image:var(--white-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            `,
            softBlend && afterAttachment,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        />
      </div>
      <div className="relative z-10 isolate mix-blend-normal flex w-full flex-1 flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}
