/**
 * Reads framer-export/cms-clients.json and writes aurora/data/clients.json
 * for the embed marquee (build-time client list).
 *
 * Usage (from repo root): node scripts/generate-clients-data.cjs
 * Or from aurora/: npm run generate:clients
 */
const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..")
const srcPath = path.join(root, "framer-export", "cms-clients.json")
const outPath = path.join(root, "aurora", "data", "clients.json")

const raw = JSON.parse(fs.readFileSync(srcPath, "utf8"))
const items = raw.items
  .filter((i) => !i.draft)
  .map((i) => ({
    id: i.id,
    slug: i.slug,
    title: i.title,
    image: i.image,
    link: i.link,
  }))

const mid = Math.ceil(items.length / 2)
const row1 = items.slice(0, mid)
const row2 = items.slice(mid)

const payload = {
  generatedAt: new Date().toISOString(),
  source: "framer-export/cms-clients.json",
  row1,
  row2,
}

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8")
console.log(`Wrote ${outPath} (${row1.length} + ${row2.length} logos)`)
