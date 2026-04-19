import { addPropertyControls, ControlType } from "framer"
import * as React from "react"

/**
 * Legacy Framer component name kept for backwards compatibility in existing files.
 *
 * This component intentionally mirrors `ClientsMarqueeSingleRow.tsx` and only embeds
 * the hosted `/embed/clients-marquee` page in an iframe.
 */
const DEFAULT_CLIENTS_MARQUEE_EMBED =
  "https://sauronnitin.github.io/clients_logos/embed/clients-marquee"

export default function ClientsMarqueeIframe({
  src = DEFAULT_CLIENTS_MARQUEE_EMBED,
  title = "Client logos",
}: {
  src?: string
  title?: string
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "100%",
        position: "relative",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <iframe
        title={title}
        src={src}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}

addPropertyControls(ClientsMarqueeIframe, {
  src: {
    type: ControlType.String,
    title: "Marquee URL",
    defaultValue: DEFAULT_CLIENTS_MARQUEE_EMBED,
    displayTextArea: true,
  },
  title: {
    type: ControlType.String,
    title: "Accessible name",
    defaultValue: "Client logos",
  },
})
