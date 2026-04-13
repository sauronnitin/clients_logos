"use client"

import clientsPayload from "@/data/clients.json"

export type ClientLogo = {
  id: string
  slug: string
  title: string
  image: string
  link: string
}

/** Two copies so translateX(-50%) loops seamlessly. */
function doubleStrip(items: ClientLogo[]): ClientLogo[] {
  return [...items, ...items]
}

export default function ClientsMarqueeEmbed() {
  const row1 = clientsPayload.row1 as ClientLogo[]
  const row2 = clientsPayload.row2 as ClientLogo[]
  const allLogos: ClientLogo[] = [...row1, ...row2]

  return (
    <section className="flex min-h-0 w-full flex-1 flex-col justify-center bg-transparent">
      <div className="clients-marquee-root relative mx-auto w-full max-w-7xl px-6">
        <div className="relative overflow-hidden py-4">
          {/*
            w-max + flex-nowrap: one horizontal strip. A full-width flex row can wrap bubbles
            onto a second line in a narrow iframe (looks like “two rows”).
          */}
          <div className="clients-marquee-track animate-integration-scroll-left flex w-max max-w-none flex-nowrap gap-12">
            {doubleStrip(allLogos).map((client, i) => (
              <a
                key={`${client.slug}-${i}`}
                href={client.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 dark:bg-neutral-200 dark:ring-white/10"
                aria-label={client.title}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- remote Framer CMS URLs; avoid Image remote config */}
                <img
                  src={client.image}
                  alt=""
                  className="h-[4.5rem] w-[4.5rem] object-contain p-1"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ))}
          </div>

          <div className="pointer-events-none absolute top-0 left-0 h-full w-28 bg-gradient-to-r from-white to-transparent dark:from-neutral-950" />
          <div className="pointer-events-none absolute top-0 right-0 h-full w-28 bg-gradient-to-l from-white to-transparent dark:from-neutral-950" />
        </div>
      </div>
    </section>
  )
}
