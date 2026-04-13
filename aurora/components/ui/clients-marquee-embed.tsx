"use client"

import clientsPayload from "@/data/clients.json"
import { useState } from "react"

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

/** Same bubble for everyone; only the logo graphic scales (1.25× except Thermax). */
const BUBBLE_CLASS =
  "flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-black/5 dark:bg-neutral-200 dark:ring-white/10"

function logoImgClass(slug: string): string {
  const base = "h-[4.5rem] w-[4.5rem] object-contain p-1"
  if (slug === "thermax") {
    return base
  }
  return `${base} origin-center scale-125`
}

export default function ClientsMarqueeEmbed() {
  const [marqueePaused, setMarqueePaused] = useState(false)

  const row1 = clientsPayload.row1 as ClientLogo[]
  const row2 = clientsPayload.row2 as ClientLogo[]
  const allLogos: ClientLogo[] = [...row1, ...row2]

  return (
    <section className="flex min-h-0 w-full flex-1 flex-col justify-center bg-transparent">
      <div
        className="clients-marquee-root relative mx-auto w-full max-w-7xl px-6"
        onPointerEnter={() => setMarqueePaused(true)}
        onPointerLeave={() => setMarqueePaused(false)}
      >
        <div className="relative overflow-hidden py-4">
          <div
            className="clients-marquee-track animate-integration-scroll-left flex w-max max-w-none flex-nowrap gap-12"
            style={{
              animationPlayState: marqueePaused ? "paused" : "running",
            }}
          >
            {doubleStrip(allLogos).map((client, i) => (
              <a
                key={`${client.slug}-${i}`}
                href={client.link}
                target="_blank"
                rel="noopener noreferrer"
                className={BUBBLE_CLASS}
                aria-label={client.title}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- remote Framer CMS URLs; avoid Image remote config */}
                <img
                  src={client.image}
                  alt=""
                  className={logoImgClass(client.slug)}
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
