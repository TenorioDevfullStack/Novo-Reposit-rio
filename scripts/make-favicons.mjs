import sharp from "sharp"
import path from "node:path"

const dir = path.resolve("public/logos")

// Rounded "browser tab" variant — terminal window with >_ prompt.
const rounded = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="6.5" fill="#0e1311" stroke="#40f5a1" stroke-opacity="0.4"/>
  <rect x="0.75" y="0.75" width="30.5" height="6.2" rx="6.5" fill="#40f5a1" fill-opacity="0.1"/>
  <circle cx="5" cy="3.8" r="1" fill="#40f5a1" fill-opacity="0.6"/>
  <circle cx="8.2" cy="3.8" r="1" fill="#60daff" fill-opacity="0.5"/>
  <circle cx="11.4" cy="3.8" r="1" fill="#ffc75c" fill-opacity="0.5"/>
  <g stroke="#40f5a1" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <polyline points="9.5,13 14.5,18 9.5,23"/>
  </g>
  <rect x="16.4" y="20.6" width="6.6" height="2.6" rx="1.1" fill="#40f5a1"/>
</svg>`

// Full-bleed "maskable" variant for PWA / Apple touch (glyph centered in safe zone).
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#0e1311"/>
  <rect width="32" height="32" fill="url(#g)" fill-opacity="0.12"/>
  <defs><radialGradient id="g" cx="50%" cy="35%" r="70%">
    <stop offset="0%" stop-color="#40f5a1"/><stop offset="100%" stop-color="#0e1311"/>
  </radialGradient></defs>
  <g stroke="#40f5a1" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <polyline points="10.5,11 15,15.5 10.5,20"/>
  </g>
  <rect x="16.6" y="17.8" width="6" height="2.4" rx="1" fill="#40f5a1"/>
</svg>`

const jobs = [
  { svg: rounded, size: 32, out: "favicon-32x32.png" },
  { svg: rounded, size: 96, out: "favicon-96x96.png" },
  { svg: maskable, size: 180, out: "apple-touch-icon.png" },
  { svg: maskable, size: 192, out: "web-app-manifest-192x192.png" },
  { svg: maskable, size: 512, out: "web-app-manifest-512x512.png" },
]

for (const job of jobs) {
  await sharp(Buffer.from(job.svg))
    .resize(job.size, job.size)
    .png()
    .toFile(path.join(dir, job.out))
  console.log(`✓ ${job.out} (${job.size}px)`)
}
console.log("favicons gerados.")
