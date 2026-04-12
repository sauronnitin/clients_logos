"use client"

import { useEffect, type ReactNode } from "react"

const ATTR = "data-embed-transparent"

/**
 * Makes `html` / `body` transparent so a cross-origin Framer page can show
 * through “empty” pixels inside the iframe (see `globals.css`).
 */
export function EmbedTransparentDocument({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute(ATTR, "true")
    return () => {
      document.documentElement.removeAttribute(ATTR)
    }
  }, [])

  return children
}
