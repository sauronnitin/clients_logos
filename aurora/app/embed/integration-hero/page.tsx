import type { Metadata } from "next"

import IntegrationHero from "@/components/ui/integration-hero"

export const metadata: Metadata = {
  title: "Integration hero",
  robots: { index: false, follow: false },
  description: "Embeddable integrations hero for Framer and other hosts.",
}

export default function EmbedIntegrationHeroPage() {
  return <IntegrationHero />
}
