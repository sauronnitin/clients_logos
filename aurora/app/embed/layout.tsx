export default function EmbedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="pointer-events-none relative isolate min-h-[100dvh] w-full min-w-0 overflow-x-hidden bg-transparent">
      {children}
    </div>
  )
}
