import type { Metadata } from "next"

import { AuroraBackground } from "@/components/ui/aurora-background"

export const metadata: Metadata = {
  title: "Aurora background",
  robots: { index: false, follow: false },
  description: "Embeddable aurora background for Framer and other hosts.",
}

/** Full-viewport aurora inside the iframe; Framer sets iframe height → 100vh matches the embed. */
export default function EmbedAuroraPage() {
  return <AuroraBackground />
}
