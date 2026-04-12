import type { Metadata } from "next"

import { AuroraBackground } from "@/components/ui/aurora-background"

export const metadata: Metadata = {
  title: "Aurora background",
  robots: { index: false, follow: false },
  description: "Embeddable aurora background for Framer and other hosts.",
}

/** Full-viewport aurora; transparent base + document so Framer layers behind the iframe can show through gaps. */
export default function EmbedAuroraPage() {
  return <AuroraBackground transparentBase />
}
