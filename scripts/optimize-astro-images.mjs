import sharp from "sharp"
import { readdir, stat } from "node:fs/promises"
import path from "node:path"

const dir = path.resolve("public/imagens/astro-monitor")
const files = (await readdir(dir)).filter((f) => f.toLowerCase().endsWith(".png"))

let beforeTotal = 0
let afterTotal = 0

for (const file of files.sort()) {
  const input = path.join(dir, file)
  const output = path.join(dir, file.replace(/\.png$/i, ".webp"))

  const before = (await stat(input)).size
  await sharp(input)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(output)
  const after = (await stat(output)).size

  beforeTotal += before
  afterTotal += after

  const kb = (n) => (n / 1024).toFixed(0).padStart(6) + " KB"
  console.log(`${file} -> ${path.basename(output)}  ${kb(before)} -> ${kb(after)}`)
}

const mb = (n) => (n / 1024 / 1024).toFixed(2) + " MB"
console.log(`\nTotal: ${mb(beforeTotal)} -> ${mb(afterTotal)} (${((1 - afterTotal / beforeTotal) * 100).toFixed(1)}% menor)`)
