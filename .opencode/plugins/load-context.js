// Instruction docs + session rules loader. Injects `.opencode/docs/` docs into
// every request's system context (restoring V1 `instructions` parity — V2
// accepts the config array but does not resolve its entries yet), then appends
// the rule-activation block. Catches all agents incl future — zero config
// maintenance.
// shortcut: docs injected manually while V2 ignores config `instructions`; when
// upstream resolves them, drop the docs block below (keep RULES), or the docs
// load twice.
import { readFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { Plugin } from "@opencode/plugin"

const FILES = ["skills-settings-rules.md", "agent-knowledge-awareness.md"]
const docsDir = resolve(dirname(fileURLToPath(import.meta.url)), "..", "docs")

const RULES = [
  "",
  "## Session rules (auto-loaded)",
  "- AGENTS.md + .opencode/docs/skills-settings-rules.md + your agent file = law. Already in your system prompt. Follow. No deviation.",
  "- Caveman: per skills-settings-rules.md (ON, full). Git Flow: per AGENTS.md. Orchestrator: plan -> approval -> execute.",
  "- Knowledge-awareness: 7-cave rules auto-loaded. Truth over help. Law.",
]
const MARKER = "## Session rules (auto-loaded)"

const readDocs = () =>
  FILES.flatMap((file) => {
    const path = join(docsDir, file)
    try {
      return [{ type: "text", text: `Instructions from: ${path}\n\n${readFileSync(path, "utf8")}` }]
    } catch (error) {
      console.warn(`load-context: cannot read ${path}: ${error.message}`)
      return []
    }
  })

export default Plugin.define({
  id: "load-context",
  async setup(ctx) {
    const docs = readDocs()

    await ctx.session.hook("context", (event) => {
      event.system.push(...docs)
      if (event.system.some((part) => String(part?.text ?? "").includes(MARKER))) return
      event.system.push(...RULES.map((text) => ({ type: "text", text })))
    })
  },
})
