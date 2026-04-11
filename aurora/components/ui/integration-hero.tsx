"use client"

import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  Boxes,
  Calendar,
  Cloud,
  Cpu,
  Database,
  Globe2,
  HardDrive,
  Layers,
  Mail,
  MessageCircle,
  Puzzle,
  Settings,
  Shield,
  Webhook,
  Workflow,
  Zap,
} from "lucide-react"

const ICONS_ROW1: LucideIcon[] = [
  Zap,
  Cloud,
  Database,
  Globe2,
  Layers,
  Puzzle,
  Webhook,
  Boxes,
]

const ICONS_ROW2: LucideIcon[] = [
  Cpu,
  HardDrive,
  Mail,
  MessageCircle,
  BarChart3,
  Settings,
  Shield,
  Workflow,
]

function repeatedIcons<T>(icons: T[], repeat = 4): T[] {
  return Array.from({ length: repeat }).flatMap(() => icons)
}

export default function IntegrationHero() {
  return (
    <section className="relative overflow-hidden bg-white py-32 dark:bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)]" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <span className="mb-4 inline-block rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-black dark:border-gray-700 dark:bg-black dark:text-white">
          ⚡ Integrations
        </span>
        <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
          Integrate with favorite tools
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-500 dark:text-muted-foreground">
          250+ top apps are available to integrate seamlessly with your workflow.
        </p>
        <Button
          variant="default"
          size="lg"
          className="mt-8 rounded-lg px-6 py-3 font-medium"
        >
          Get started
        </Button>

        <div className="relative mt-12 overflow-hidden pb-2">
          <div className="animate-integration-scroll-left flex gap-10 whitespace-nowrap">
            {repeatedIcons(ICONS_ROW1, 4).map((Icon, i) => (
              <div
                key={i}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-md dark:bg-muted"
              >
                <Icon
                  className="h-10 w-10 text-foreground"
                  aria-hidden
                  strokeWidth={1.5}
                />
              </div>
            ))}
          </div>

          <div className="animate-integration-scroll-right mt-6 flex gap-10 whitespace-nowrap">
            {repeatedIcons(ICONS_ROW2, 4).map((Icon, i) => (
              <div
                key={i}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-md dark:bg-muted"
              >
                <Icon
                  className="h-10 w-10 text-foreground"
                  aria-hidden
                  strokeWidth={1.5}
                />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent dark:from-black" />
          <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent dark:from-black" />
        </div>
      </div>
    </section>
  )
}
