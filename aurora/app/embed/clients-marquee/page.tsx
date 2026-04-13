import type { Metadata } from "next"

import ClientsMarqueeEmbed from "@/components/ui/clients-marquee-embed"

export const metadata: Metadata = {
  title: "Clients marquee",
  robots: { index: false, follow: false },
  description:
    "Embeddable dual-row client logo marquee (CMS data at build time) for Framer.",
}

/**
 * Marquee-only strip: logo bubbles + links. Data from `data/clients.json`
 * (regenerate: `npm run generate:clients` from `aurora/`).
 */
export default function EmbedClientsMarqueePage() {
  return (
    <div className="pointer-events-auto min-w-0 bg-transparent">
      <ClientsMarqueeEmbed />
    </div>
  )
}
