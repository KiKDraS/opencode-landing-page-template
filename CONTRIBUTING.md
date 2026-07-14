# Contributing to OpenCode Landing Page Template

## What This Project Is

This is a **template for AI-agent-driven development** using
[OpenCode](https://opencode.ai). The core value lives in the **agent
infrastructure** — not the demo landing page content.

| What matters (the template) | What doesn't (the demo) |
|-----------------------------|------------------------|
| Agent prompts & definitions (`.opencode/agents/`, `.opencode/prompts/`) | The specific HTML in `index.html` |
| Skill enforcement rules (`.opencode/skills/`) | The CSS styles in `src/styles/` |
| Pipeline orchestration (`AGENTS.md`, `opencode.json`) | The JavaScript in `src/js/` |
| MCP server configuration | The assets in `src/assets/` |
| Architectural contracts & best practices | The fonts and images |

Contributions that improve the **agent infrastructure** are welcome.
Contributions that only change the **demo landing page content** are out of
scope — the demo is there to validate the pipeline, not to be the product.

---

## What Contributions Are Welcome

| Category | Examples |
|----------|----------|
| **Skills** | Improving enforcement rules, adding edge case coverage, fixing false positives/negatives in audit checklists |
| **Agent Prompts** | Refining agent behavior in `.opencode/agents/` and `.opencode/prompts/` |
| **Architectural Rules** | Tighter enforcement in `AGENTS.md`, new contracts, clearer error messages |
| **Pipeline Improvements** | Better orchestrator flow, faster delegation, improved QA gates |
| **MCP Servers** | Adding new MCP integrations, improving existing configs in `opencode.json`, writing MCP client skills, improving tool resolution and fallback patterns |
| **Tooling Config** | `opencode.json` refinements, permission rules, plugin configuration |
| **Testing Infrastructure** | Better Playwright configs, test patterns, assertion strategies |
| **Bug Fixes** | Issues in agent behavior, skill checklists, or pipeline logic |
| **Documentation** | Clarifying rules in `AGENTS.md`, `CONTRIBUTING.md`, or skill files |

---

## What to Avoid

- Custom landing page content (colors, copy, images, layout) — fork the
  template for that
- Adding frameworks or dependencies when native solutions work
- Generic "AI slop" aesthetics — the `frontend-design` skill exists to prevent
  this
- Changes that break the architectural contracts (CSS layering, JS module
  patterns, Git Flow)

When in doubt, open an issue first to discuss.

---

## Quick Start

```bash
# 1. Fork and clone
git clone https://github.com/<your-username>/opencode-landing-page-template.git
cd opencode-landing-page-template
npm install && npm run setup

# 2. Create your feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/your-improvement

# 3. Make changes, commit, push
git add .
git commit -m "feat: describe your change"
git push -u origin feature/your-improvement

# 4. Open a pull request to develop
```

---

## Understanding the Architecture

Before contributing, read these files:

| File | What it defines |
|------|----------------|
| `AGENTS.md` | The master agent context — all architectural rules live here |
| `opencode.json` | Agent definitions, MCP servers, permissions, tools |
| `.opencode/agents/` | Individual agent prompts and instructions |
| `.opencode/skills/` | Enforcement rules for code quality, accessibility, SEO |
| `.opencode/prompts/` | Specialized prompts for test planning, generation, healing |
| `DESIGN.md` | (When present) The active design contract for the demo page |

---

## Git Flow Rules

- **Base branch is always `develop`**
- All work goes on `feature/*` branches
- **ALL merges use Pull Requests** — no direct commits to `main` or `develop`
- After merge, the feature branch is deleted
- See `AGENTS.md` → "Workflow Structure: Git Flow" for full details

---

## Code Review Expectations

Since this project is about the **agent infrastructure** (not a user-facing
application), reviews focus on:

1. **Does the change improve the agent infrastructure?** (skills, prompts,
   pipeline, MCP, configs — not the demo page)
2. **Is the change self-consistent?** Do skill enforcement rules match the
   stated intent? Are agent prompts clear and unambiguous?
3. **Is it the simplest working solution?** (Ponytail-aligned: YAGNI,
   stdlib-first, native features)
4. **Is the config valid?** JSON validity, MCP server reachability, no broken
   references
5. **Are agent behavior changes reflected in agent files?** If you change what
   an agent does, update its prompt or definition

This project uses an AI agent pipeline. Since the template's output is the
agent configuration itself (not a user-facing app), the automated review and
testing pipeline (`@code-review`, Playwright) does **not** apply to
contributions — they are scoped to the demo landing page content.

---

## Need Help?

Open an issue or start a discussion. If you're unsure whether a change is in
scope, file a feature request first.
