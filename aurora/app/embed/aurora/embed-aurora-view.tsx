"use client"

import { AuroraBackground } from "@/components/ui/aurora-background"
import { useSearchParams } from "next/navigation"

/**
 * Reads `?soft=1` at runtime (static export / GitHub Pages) for a gentler blend
 * when the iframe still looks harsh over Framer UI.
 */
export function EmbedAuroraView() {
  const searchParams = useSearchParams()
  const softBlend =
    searchParams.get("soft") === "1" || searchParams.get("soft") === "true"

  return <AuroraBackground transparentBase softBlend={softBlend} />
}
