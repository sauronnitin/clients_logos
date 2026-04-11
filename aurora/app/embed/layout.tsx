export default function EmbedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full min-w-0 overflow-x-hidden bg-transparent">
      {children}
    </div>
  )
}
