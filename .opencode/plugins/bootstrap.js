// First-load bootstrap. Runs `npm run setup` once per machine. The persistent
// `.opencode/.setup-done` marker IS the guard: every launch/hook-fire reads the
// directory, no in-memory state. Marker written only on full success → failed
// or interrupted setups retry next launch. `npm install` stays manual; hints
// if `node_modules` absent (re-checks each fire, so installing mid-session
// then triggers setup).
import { existsSync, writeFileSync } from "node:fs"
import { join } from "node:path"

export const Bootstrap = async ({ directory, $ }) => {
  return {
    "experimental.chat.system.transform": async () => {
      const root = directory || process.cwd()
      const marker = join(root, ".opencode", ".setup-done")
      if (existsSync(marker)) return
      if (!existsSync(join(root, "node_modules"))) {
        console.log("[bootstrap] node_modules missing — run `npm install` first")
        return
      }
      console.log("[bootstrap] running `npm run setup`...")
      try {
        await $`npm run setup`.cwd(root)
        writeFileSync(marker, new Date().toISOString())
      } catch (err) {
        console.error("[bootstrap] `npm run setup` failed:", err)
      }
    },
  }
}