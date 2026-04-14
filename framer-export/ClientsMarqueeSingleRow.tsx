import { addPropertyControls, ControlType } from "framer"
import * as React from "react"

/**
 * **Framer:** “Clients marquee single row” — use this file as the Code component.
 *
 * Renders the hosted Next embed (`/embed/clients-marquee`) in an **iframe** only.
 * Do **not** import JSON or use `@/` paths here; Framer’s bundler will fail.
 * Styling and data live in git: `aurora/components/ui/clients-marquee-embed.tsx`
 * — deploy that app, then keep **Marquee URL** pointed at your live embed.
 *
 * Size the frame ~200–280px tall (or more if logos clip); width 100%.
 *
 * @see ./FRAMER_EMBED_INSTRUCTIONS.md
 */
const DEFAULT_CLIENTS_MARQUEE_EMBED =
  "https://sauronnitin.github.io/clients_logos/embed/clients-marquee"

export default function ClientsMarqueeSingleRow({
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

addPropertyControls(ClientsMarqueeSingleRow, {
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
