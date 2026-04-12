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
 * Default URL matches the main **21st / Aceternity** look (`mix-blend-difference`). Append
 * **`?soft=1`** if the glow reads too harsh over Framer text.
 * Do **not** set this component’s z-index to **-1** in Framer — it will sit under the section
 * background and the aurora will look missing or frozen. Use **z-index 0** here and **positive**
 * z-index on your hero content wrapper instead.
 *
 * @see ./FRAMER_EMBED_INSTRUCTIONS.md
 */
const DEFAULT_AURORA_EMBED =
  "https://sauronnitin.github.io/clients_logos/embed/aurora"

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
