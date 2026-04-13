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

/** 1.5× prior tab sizes; Thermax SVG stays at previous scale so it doesn’t dominate. */
function bubbleClasses(slug: string): string {
  if (slug === "thermax") {
    return "h-28 w-28"
  }
  return "h-[10.5rem] w-[10.5rem]"
}

function imgClasses(slug: string): string {
  if (slug === "thermax") {
    return "h-[4.5rem] w-[4.5rem]"
  }
  return "h-[6.75rem] w-[6.75rem]"
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
          {/*
            w-max + flex-nowrap: one horizontal strip.
            animationPlayState via React so pause wins over Tailwind animation shorthand (Framer iframe).
          */}
          <div
            className="clients-marquee-track animate-integration-scroll-left flex w-max max-w-none flex-nowrap gap-[4.5rem]"
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
                className={`flex shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 dark:bg-neutral-200 dark:ring-white/10 ${bubbleClasses(client.slug)}`}
                aria-label={client.title}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- remote Framer CMS URLs; avoid Image remote config */}
                <img
                  src={client.image}
                  alt=""
                  className={`object-contain p-1 ${imgClasses(client.slug)}`}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ))}
          </div>

          <div className="pointer-events-none absolute top-0 left-0 h-full w-40 bg-gradient-to-r from-white to-transparent dark:from-neutral-950" />
          <div className="pointer-events-none absolute top-0 right-0 h-full w-40 bg-gradient-to-l from-white to-transparent dark:from-neutral-950" />
        </div>
      </div>
    </section>
  )
}
