"use client"

import clientsPayload from "@/data/clients.json"

export type ClientLogo = {
  id: string
  slug: string
  title: string
  image: string
  link: string
}

/** Two copies so translateX(-50%) loops seamlessly (same idea as ruixenui / 21st IntegrationHero). */
function doubleStrip(items: ClientLogo[]): ClientLogo[] {
  return [...items, ...items]
}

export default function ClientsMarqueeEmbed() {
  const row1 = clientsPayload.row1 as ClientLogo[]
  const row2 = clientsPayload.row2 as ClientLogo[]

  return (
    <section className="relative w-full overflow-hidden bg-transparent py-10">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden pb-2">
          <div className="animate-integration-scroll-left flex gap-10 whitespace-nowrap">
            {doubleStrip(row1).map((client, i) => (
              <a
                key={`${client.slug}-${i}`}
                href={client.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 dark:bg-neutral-200 dark:ring-white/10"
                aria-label={client.title}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- remote Framer CMS URLs; avoid Image remote config */}
                <img
                  src={client.image}
                  alt=""
                  className="h-10 w-10 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ))}
          </div>

          <div className="animate-integration-scroll-right mt-6 flex gap-10 whitespace-nowrap">
            {doubleStrip(row2).map((client, i) => (
              <a
                key={`${client.slug}-${i}`}
                href={client.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 dark:bg-neutral-200 dark:ring-white/10"
                aria-label={client.title}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.image}
                  alt=""
                  className="h-10 w-10 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ))}
          </div>

          <div className="pointer-events-none absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent dark:from-neutral-950" />
          <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent dark:from-neutral-950" />
        </div>
      </div>
    </section>
  )
}
