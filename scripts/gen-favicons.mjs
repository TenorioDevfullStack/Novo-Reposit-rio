// Generates the PNG favicon/app-icon set from the LT monogram (indigo brand mark).
// Run: node scripts/gen-favicons.mjs
import sharp from "sharp"
import { fileURLToPath } from "node:url"
import path from "node:path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, "..", "public", "logos")

const INDIGO = "#4F46E5"

// LT monogram in a 32-unit box. `rx` controls corner rounding of the tile.
function svg(size, rx) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}">
      <rect width="32" height="32" rx="${rx}" fill="${INDIGO}"/>
      <g fill="#FFFFFF">
        <rect x="7.5" y="9" width="3.2" height="14" rx="0.4"/>
        <rect x="7.5" y="19.8" width="8" height="3.2" rx="0.4"/>
        <rect x="16.5" y="9" width="8" height="3.2" rx="0.4"/>
        <rect x="18.9" y="9" width="3.2" height="14" rx="0.4"/>
      </g>
    </svg>`,
  )
}

// Browser favicons: keep the rounded tile. App/PWA icons: full-bleed (rx 0)
// so iOS/Android apply their own mask without showing transparent corners.
const targets = [
  { file: "favicon-32x32.png", size: 32, rx: 8 },
  { file: "favicon-96x96.png", size: 96, rx: 24 },
  { file: "apple-touch-icon.png", size: 180, rx: 0 },
  { file: "web-app-manifest-192x192.png", size: 192, rx: 0 },
  { file: "web-app-manifest-512x512.png", size: 512, rx: 0 },
]

for (const { file, size, rx } of targets) {
  await sharp(svg(size, rx)).png().toFile(path.join(outDir, file))
  console.log(`✓ ${file} (${size}x${size})`)
}
