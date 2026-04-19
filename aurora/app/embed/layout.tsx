import { EmbedTransparentDocument } from "@/components/embed-transparent-document"

export default function EmbedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <EmbedTransparentDocument>
      <div className="pointer-events-none relative z-0 isolate min-h-[100dvh] w-full min-w-0 overflow-x-hidden bg-transparent">
        {children}
      </div>
    </EmbedTransparentDocument>
  )
}
