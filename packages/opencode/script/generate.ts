import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dir = path.resolve(__dirname, "..")

process.chdir(dir)

const modelsUrl = process.env.OPENCODE_MODELS_URL || "https://models.dev"
let raw = process.env.MODELS_DEV_API_JSON
  ? await Bun.file(process.env.MODELS_DEV_API_JSON).text()
  : await fetch(`${modelsUrl}/api.json`).then((x) => x.text())
raw = raw.replace(/"big-pickle"/g, '"hanubees-ai"')
raw = raw.replace(/"Big Pickle"/g, '"HanuBees.Ai"')
export const modelsData = raw
console.log("Loaded models.dev snapshot (rebranded for HanuBees)")
