// Session rules loader. Appends rule-activation block to every agent's
// system prompt. Catches all agents incl future — zero config maintenance.
export const LoadRules = async () => {
  const RULES = [
    "",
    "## Session rules (auto-loaded)",
    "- Caveman ON (full). Terse. Off only: \"stop caveman\".",
    "- Git Flow mandatory: feature/* from develop -> PR -> approval. No direct edits to develop/main.",
    "- Orchestrator: plan -> approval -> execute. No change without user ok.",
    "- Read AGENTS.md + .opencode/docs/skills-settings-rules.md at session start.",
  ]
  const MARKER = "## Session rules (auto-loaded)"
  return {
    "experimental.chat.system.transform": async (_input, output) => {
      if (output.system.join("\n").includes(MARKER)) return
      output.system.push(...RULES)
    },
  }
}
