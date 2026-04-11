import { AuroraBackgroundDemo } from "@/components/ui/aurora-background-demo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <AuroraBackgroundDemo />
      <div className="border-t bg-background px-6 py-4 text-sm text-muted-foreground">
        <div className="mx-auto flex max-w-md flex-col gap-3">
          <p>
            Press <kbd className="rounded border px-1 font-mono text-xs">d</kbd>{" "}
            to toggle dark mode.
          </p>
          <p className="text-xs leading-relaxed">
            shadcn/ui is wired in <code className="font-mono">components/ui</code>.
            Add more primitives with{" "}
            <code className="font-mono">npx shadcn@latest add …</code>.
          </p>
          <Button asChild variant="outline" size="sm" className="w-fit">
            <Link href="https://ui.shadcn.com/docs/components">Component docs</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
