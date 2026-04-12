import type { Metadata } from "next"
import { Suspense } from "react"

import { AuroraBackground } from "@/components/ui/aurora-background"

import { EmbedAuroraView } from "./embed-aurora-view"

export const metadata: Metadata = {
  title: "Aurora background",
  robots: { index: false, follow: false },
  description: "Embeddable aurora background for Framer and other hosts.",
}

/** Full-viewport aurora; transparent base + document so Framer layers behind the iframe can show through gaps. */
export default function EmbedAuroraPage() {
  return (
    <Suspense
      fallback={<AuroraBackground transparentBase />}
    >
      <EmbedAuroraView />
    </Suspense>
  )
}
