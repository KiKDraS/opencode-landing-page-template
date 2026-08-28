# Agent Skills Rules

## Ponytail + Skills (Intersectional Golden Rule)

> No complex abstractions. Rely on platform, Vite, stdlib. Native HTML5
> elements, native CSS (lightningcss, custom properties), ES6+ stdlib before
> custom code or npm deps. No frameworks, no UI libraries.

**Project skills binding:** use `.opencode/skills/` —
`frontend-design` (UI), `html-css-best-practices` (semantic+responsive),
`modern-javascript-patterns` (ES6+), `accessibility-wcag` (a11y), `seo`
(meta/structured data), `playwright-best-practices` (tests). Ponytail's
_fewest files possible_ prevents unrequested features, redundant helpers.
Must NOT replace project CSS architecture with per-component files —
follow `src/styles/` schema.

---

## Rules

**Caveman ON (full).** Sub-agents inherit. Off: "stop caveman". Drop
articles/filler/pleasantries/hedging. Fragments OK. Pattern:
`[thing] [action] [reason].` Spec: `.opencode/skills/caveman/SKILL.md`

**Caveman ultra enforced** on edits to `AGENTS.md`, `DESIGN.md*`,
`.opencode/agents/*.md`. Max compression. These are meta files — no prose, no
explanations, no pleasantries. If reading: caveman ultra. If writing: caveman
ultra.

**Context7 MCP optional.** Needs `CONTEXT7_API_KEY` env + `"enabled": true` in
`opencode.json`. Off by default → server absent. Use websearch instead. Spec:
`.opencode/skills/context7-mcp/SKILL.md`

**CodeGraph mandatory.** `.codegraph/` in root? **USE CODEGRAPH FIRST.** No
grep/find/Read before. MCP `codegraph_codegraph_explore`: source + line nums +
call paths + dynamic-dispatch grep misses. Insufficient/empty context? →
`@explore` (Task tool, subagent `explore`). Still no answer → grep/Read last.
No `.codegraph/` dir or no index? → `@explore` first. Indexing user choice.

---
