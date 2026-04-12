import { addPropertyControls, ControlType } from "framer"
import * as React from "react"

/**
 * Aurora as a hosted iframe, with clicks passing through to Framer layers above.
 *
 * Framer’s built-in **Embed** often does not set `pointer-events: none` on the iframe
 * element, so buttons behind it never receive clicks—even if the page inside the
 * iframe uses pointer-events: none (that only affects hit targets *inside* the iframe).
 *
 * Drop this file into Framer as a **Code** component, size it like your background,
 * place it behind hero text/CTAs/marquee in the layer list, and set your deploy URL below.
 *
 * Default URL includes **`?soft=1`** (gentler blend for native Framer layers on top).
 *
 * @see ./FRAMER_EMBED_INSTRUCTIONS.md
 */
const DEFAULT_AURORA_EMBED =
  "https://sauronnitin.github.io/clients_logos/embed/aurora?soft=1"

export default function AuroraIframePassThrough({
  src = DEFAULT_AURORA_EMBED,
  title = "Aurora background",
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
        pointerEvents: "none",
        isolation: "isolate",
        mixBlendMode: "normal",
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
          pointerEvents: "none",
        }}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}

addPropertyControls(AuroraIframePassThrough, {
  src: {
    type: ControlType.String,
    title: "Aurora URL",
    defaultValue: DEFAULT_AURORA_EMBED,
    displayTextArea: true,
  },
  title: {
    type: ControlType.String,
    title: "Accessible name",
    defaultValue: "Aurora background",
  },
})
