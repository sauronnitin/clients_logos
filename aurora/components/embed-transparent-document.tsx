"use client"

import { useLayoutEffect, type ReactNode } from "react"

const ATTR = "data-embed-transparent"

/**
 * Makes `html` / `body` transparent so a cross-origin Framer page can show
 * through “empty” pixels inside the iframe (see `globals.css`).
 * Uses layout effect so pointer-events stay off before first paint (Framer CTAs stay clickable).
 */
export function EmbedTransparentDocument({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.setAttribute(ATTR, "true")
    return () => {
      document.documentElement.removeAttribute(ATTR)
    }
  }, [])

  return children
}
