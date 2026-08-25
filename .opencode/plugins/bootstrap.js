// First-load bootstrap. Runs `npm run setup` once per machine, tracked by a
// persistent `.opencode/.setup-done` marker (written only on full success), so
// every opencode launch decides from the directory, not an in-memory flag.
// `npm install` stays a manual user step; hints if `node_modules` absent.
import { existsSync, writeFileSync } from "node:fs"
import { join } from "node:path"

export const Bootstrap = async ({ directory, $ }) => {
  let ran = false
  return {
    "experimental.chat.system.transform": async () => {
      if (ran) return
      ran = true
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
