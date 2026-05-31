import sharp from "sharp"
import { readdir, stat, unlink } from "node:fs/promises"
import path from "node:path"

// Uso: node scripts/optimize-images.mjs <dir1> [dir2...] [--delete-png]
// Converte PNGs em WebP (máx. 1600px de largura, qualidade 80).
const args = process.argv.slice(2)
const deletePng = args.includes("--delete-png")
const dirs = args.filter((a) => !a.startsWith("--"))

if (dirs.length === 0) {
  console.error("Informe ao menos um diretório. Ex: node scripts/optimize-images.mjs public/imagens/stock-manager")
  process.exit(1)
}

const kb = (n) => (n / 1024).toFixed(0).padStart(6) + " KB"
const mb = (n) => (n / 1024 / 1024).toFixed(2) + " MB"

let beforeTotal = 0
let afterTotal = 0

for (const rel of dirs) {
  const dir = path.resolve(rel)
  const files = (await readdir(dir)).filter((f) => f.toLowerCase().endsWith(".png")).sort()
  if (files.length === 0) continue

  console.log(`\n# ${rel}`)
  for (const file of files) {
    const input = path.join(dir, file)
    const output = path.join(dir, file.replace(/\.png$/i, ".webp"))

    const before = (await stat(input)).size
    await sharp(input).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(output)
    const after = (await stat(output)).size

    beforeTotal += before
    afterTotal += after
    console.log(`${file} -> ${path.basename(output)}  ${kb(before)} -> ${kb(after)}`)

    if (deletePng) await unlink(input)
  }
}

console.log(`\nTotal: ${mb(beforeTotal)} -> ${mb(afterTotal)} (${((1 - afterTotal / beforeTotal) * 100).toFixed(1)}% menor)`)
if (deletePng) console.log("PNGs originais removidos do destino.")
