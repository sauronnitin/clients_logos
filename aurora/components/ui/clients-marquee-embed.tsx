"use client"

import clientsPayload from "../../data/clients.json"
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

function logoImgClass(slug: string): string {
  const base =
    "h-[4.5rem] w-[4.5rem] object-contain p-1 grayscale opacity-80 transition duration-300 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:opacity-100"
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
                className="group flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden"
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

          {/* Transparent section background for embed hosts (GitHub Pages + Framer). */}
        </div>
      </div>
    </section>
  )
}
