"use client"

import { cn } from "@/lib/utils"
import type { HTMLAttributes, ReactNode } from "react"

export interface AuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  showRadialGradient?: boolean
  /** No solid zinc fill — use behind Framer layers in an Embed (see /embed/aurora). */
  transparentBase?: boolean
}

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  transparentBase = false,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex h-[100vh] flex-col items-center justify-center text-slate-950 transition-colors",
        !transparentBase &&
          "bg-zinc-50 dark:bg-zinc-900",
        transparentBase && "bg-transparent dark:bg-transparent",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
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
            pointer-events-none absolute -inset-[10px] opacity-50 blur-[10px] invert filter will-change-transform
            dark:invert-0
            after:absolute after:inset-0 after:animate-aurora after:mix-blend-difference after:content-[""]
            after:[background-attachment:fixed]
            after:[background-image:var(--white-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            `,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        />
      </div>
      {children}
    </div>
  )
}
