# STATE.md — Current Position

Last updated: 2026-04-09

## Current Phase
**Phase 1 — Identity Replacement** (not yet started)

## What's Done
- [x] Project structure explored (all pages + components mapped)
- [x] Personal info collected from Nitin
- [x] Planning docs created (PROJECT.md, REQUIREMENTS.md, INFO.md, STATE.md)
- [x] Memory files created
- [x] Unframer MCP server connected
- [x] Calendly.tsx code component created (popup + inline embed, both exported)
- [x] Hero headline → "Designing at the edge of craft and code."
- [x] Hero description → Nitin's positioning copy
- [x] Availability badge → "Available for new projects"
- [x] Hero CTA booking link → https://calendly.com/nitin-sauran
- [x] **Latest Projects grid (Unframer MCP, 2026-04-08):** `Project Card` — thumbnail width **460px** (fits 2-col inside 1080 content), image area **380px** tall, vertical **20px** gap, meta row **32px** gap; Hero / Mobile / Empty / secondary thumbnail variants synced; **Latest Projects** bottom padding **220px** (clearance above fixed bottom nav); **Projects** vertical gap **48px**; **TopProjects** / **BottomProjects** horizontal gap **40px**; column wrappers gap **20px**; **Latest Projects** inner stack gap **80px**; **Hero** frame bottom padding **56px** before Main.

## What's Next
1. Update **Nav Bar** — replace "Joseph Alexander" with "Nitin Sauran"
2. Update **Footer** — name, email, booking link, copyright, social icons, big text
3. Update **Schedule Call CTA** — booking link (already set to Calendly)
4. Update **Social Icons** — LinkedIn URL
5. Update **Terms + Privacy pages** — name/email references

## Blockers
- **Unframer MCP timeouts (2026-04-09):** `getProjectXml` / `getNodeXml` / `getSelectedNodesXml` timed out (30s) — Framer app likely closed, Unframer plugin disconnected, or network. **Fix:** Open the project in Framer, ensure Unframer is connected, save; retry Cursor Agent or run edits manually using **Hero right stack — execution** below.
- **Hero scroll + stacked mockups:** Some MCP exports showed `Hero` (`BZchDvhMe`) without a right-column stack while the live site shows two columns — **unblock** by selecting the **hero right projects parent** in Framer → `getSelectedNodesXml` → paste IDs into the table below.
- **MCP snapshot vs earlier edits (2026-04-08):** Live read shows **template hero copy** again (“Available for August'25”, “Design that delivers results.”, cal.com CTA). Code components list shows **Formatted_Number.tsx** only (no **Calendly.tsx** in this snapshot). If you intended Nitin’s customized hero, confirm Framer file / site and Unframer are the same project and changes are published/saved.
- Calendly account not yet created — Nitin needs to sign up at calendly.com with handle `nitin-sauran`
- Hero copy / tagline not yet provided
- Work History content not yet provided
- Profile photo not yet available
- Brand/studio name TBD (currently using "launchnow.design" as placeholder)
- Other social links (Twitter, Dribbble, GitHub) not confirmed

## Key Node IDs (for updates)

| Location | NodeId | What |
|---|---|---|
| Nav — name text | `biRMThLiL` | "Joseph Alexander" |
| Nav — profile pic | `Kmn9M8Wig` | Profile Picture instance |
| Footer — email text | `F2raTtVYa` | email address + mailto link |
| Footer — booking link text | `I98RVqjvo` | "Book Now" link |
| Footer — big name | `hGX3Ho77a` | "JOSEPH" |
| Footer — copyright | `pfDT8vyUL` | AutoCopyright name prop |
| Footer — social icons | `ObwIbKZrh` | SocialIcons instance |
| Home page | `augiA20Il` | Root page |
| Hero (home) | `BZchDvhMe` | Hero frame — verify two-column layout in Framer |
| Hero inside container | `K9WfQb2Ox` | Max width 1080px stack |
| **Hero right projects parent** | *TBD* | Select stack parent on canvas → MCP `getSelectedNodesXml` |
| Latest Projects section | `bPRlM5v_3` | **Do not shrink** card sizing here (plan) |
| Latest inner container | `eEJGDSoi8` | Header + grid + View all |
| Projects grid wrapper | `r1e_l7g4o` | Vertical gap between rows |
| Top row (2 cols) | `V8zY16Byd` | Horizontal gap |
| Bottom row (2 cols) | `fBB14CWhn` | Horizontal gap |
| Project Card (component) | `rUZIxkN3p` | Avoid lowering defaults if it shrinks Latest Projects |
| Project Card instances (home grid) | `D0IcHQdtY`, `JRty21YTx`, `lGMTpzwMi`, `kCbCLdgwP` | Hero variant `xReGGV0wD` — hero-canvas instances may differ |
| Nav Bar component | `N1bKBOB15` | Component |
| Footer component | `SFtLYbx68` | Component |

## Hero right stack — execution (plan: smaller deck in hero, large cards in Latest Projects)

**Constraints:** (1) Hero right: **small overlapping stacked** thumbnails (z-order, optional ±4–8° rotation, negative Y overlap). (2) **Latest Projects** and scroll **end** state: keep **current large** card presentation — do **not** reduce `Project Card` defaults if that shrinks the second section.

**Classify in Framer:** If hero uses a **Scroll Section** → edit **Start** only for size/position/rotation/stack; leave **End / Target** large. If **static** → resize/reposition only layers inside the hero right column.

**MCP (when connected):** `getNodeXml` on `augiA20Il` or hero right parent → `updateXmlForNode` in small batches on **hero instances only** (`width`, `height`, `rotation`, `top`/`left`/`centerX`/`centerY`, `zIndex`). Do **not** batch-update `rUZIxkN3p` root sizes unless hero uses isolated variant.

**Manual (Framer UI):** Select each hero-right card → reduce frame scale or width/height → overlap vertically → set z-index front-to-back → slight rotations → test scroll. Confirm **Latest Projects** unchanged.

**Visual reference:** [hero-stack-preview.html](../hero-stack-preview.html) (concept only).

**Status (2026-04-09):** Unframer MCP timed out — **pixel updates to hero-right layers were not applied** in this run. After plugin reconnect, re-run Agent with “apply hero stack from STATE” or follow **Manual** steps above, then confirm Latest Projects + responsive in preview.

## Decisions Made
- Brand/studio name will change — don't hardcode "launchnow.design" permanently
- Profile photo: use placeholder for now
- Scope: update ALL pages (not just global components)
- Booking: plan to use Cal.com once Nitin creates account
