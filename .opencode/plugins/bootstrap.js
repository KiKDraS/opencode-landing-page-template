// First-load bootstrap. Runs `npm run setup` once when `.codegraph/` is missing.
// `npm install` stays a manual user step; hints if `node_modules` absent.
import { existsSync } from "node:fs"
import { join } from "node:path"

export const Bootstrap = async ({ directory, $ }) => {
  let ran = false
  return {
    "experimental.chat.system.transform": async () => {
      if (ran) return
      ran = true
      const root = directory || process.cwd()
      if (!existsSync(join(root, "node_modules"))) {
        console.log("[bootstrap] node_modules missing — run `npm install` first")
        return
      }
      if (existsSync(join(root, ".codegraph"))) return
      console.log("[bootstrap] .codegraph missing — running `npm run setup`...")
      try {
        await $`npm run setup`.cwd(root)
      } catch (err) {
        console.error("[bootstrap] `npm run setup` failed:", err)
      }
    },
  }
}
