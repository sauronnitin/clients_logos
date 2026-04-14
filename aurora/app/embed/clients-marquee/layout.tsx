import { EmbedTransparentDocument } from "@/components/embed-transparent-document"

export default function ClientsMarqueeEmbedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <EmbedTransparentDocument>{children}</EmbedTransparentDocument>
}
