import type { Metadata } from "next"

import ClientsMarqueeEmbed from "@/components/ui/clients-marquee-embed"

export const metadata: Metadata = {
  title: "Clients marquee",
  robots: { index: false, follow: false },
  description:
    "Embeddable client logo marquee (CMS data at build time) for Framer — single row, fills iframe height.",
}

/**
 * Marquee-only strip: one row of logo bubbles + links. Fills the iframe height (Framer sets iframe height).
 * Data: `data/clients.json` (regenerate: `npm run generate:clients` from `aurora/`).
 */
export default function EmbedClientsMarqueePage() {
  return (
    <div className="pointer-events-auto flex min-h-dvh w-full flex-col bg-transparent">
      <ClientsMarqueeEmbed />
    </div>
  )
}
