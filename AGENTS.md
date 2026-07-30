# Agent Context

Project-level constitution. Goal: **Landing Page** — vanilla HTML/CSS/JS + **Vite**.

---

## Tech Stack

- **Bund:** Vite
- **Struct:** Classic HTML5
- **Style:** Native CSS (lightningcss)
- **Logic:** JS (ES6+)

### Vite Config

```js
import path from "node:path";
import { defineConfig } from "vite";
const folderName = path.basename(process.cwd());
export default defineConfig(({ command }) => {
  const isProd = command === "build";
  return {
    base: isProd ? `/${folderName}-page/` : "/",
    publicDir: "public",
    build: { outDir: "dist", cssMinify: "lightningcss" },
    css: { transformer: "lightningcss" },
  };
});
```

---

## Project Structure

Strict. No files outside schema.

```bash
├── src/
│   ├── assets/         # Imgs, SVGs, Icons, Graphics
│   │   └── fonts/      # TTF/WOFF2 files
│   ├── styles/         # CSS Root
│   │   ├── layout/     # header.css, main.css, footer.css
│   │   ├── components/ # button.css, cards.css
│   │   ├── boilerplate/ # variables.css, reset.css, base.css, fonts.css, utilities.css
│   │   └── main.css    # @import aggregator
│   ├── js/             # JS Root
│   │   ├── layout/     # navigation.js, sticky-header.js
│   │   ├── components/ # UI logic
│   │   └── utils/      # debounce.js, validators.js
│   └── main.js         # Entry (init only)
├── tests/              # Playwright
│   ├── e2e/
│   └── components/
├── public/
│   ├── favicon/
│   └── robots.txt
├── DESIGN.md
├── DESIGN.md.template  # DO NOT EDIT
├── index.html
├── sitemap.xml
├── playwright.config.js
└── package.json
```

---

## Rules (All Agents)

**Caveman ON.** Sub-agents inherit. Off: "stop caveman". Drop articles/filler/pleasantries/hedging. Fragments OK. Pattern: `[thing] [action] [reason].` Spec: `.opencode/skills/caveman/SKILL.md`

**Caveman ultra enforced** on edits to `AGENTS.md`, `DESIGN.md*`, `.opencode/agents/*.md`. Max compression. These are meta files — no prose, no explanations, no pleasantries. If reading: caveman ultra. If writing: caveman ultra.

**Context7 MCP mandatory.** `resolve-library-id` → `query-docs` for lib/framework/API/CLI questions. Spec: `.opencode/skills/context7-mcp/SKILL.md`

**Ponytail override.** CSS split into modular layers. Ponytail "fewest files" does NOT flatten CSS. HTML in `index.html`, CSS in `src/styles/`, JS in `src/js/`.

**CodeGraph mandatory.** `.codegraph/` in root? **USE CODEGRAPH FIRST.** No grep/find/Read before. MCP `codegraph_codegraph_explore`: source + line nums + call paths + dynamic-dispatch grep misses. Fallback chain: MCP → shell `codegraph explore` → grep/Read. No `.codegraph/` dir? Skip. Indexing user choice.

---

## Dev Rules by Owner

| Area | Owner | File |
|---|---|---|
| HTML+CSS+JS | `@frontend-dev` | `.opencode/agents/frontend-dev.md` |
| Audit | `@code-review` | `.opencode/agents/code-review.md` |
| Pipeline+QA+release | `@orchestrator` | `.opencode/agents/orchestrator.md` |
| PR+merge+tag | `@release-manager` | `.opencode/agents/release-manager.md` |

**All agents respect:**
- CSS: `src/styles/main.css` only import. NOT imported from `src/main.js`.
- JS: `src/main.js` = init only. No DOM manipulate, no `DOMContentLoaded`.
- HTML: `<link rel="stylesheet" href="/src/styles/main.css">` in head. `<script type="module" src="/src/main.js">` before body end.
- Fonts: local in `src/assets/fonts/`. No Google Fonts CDN. Relative CSS paths.
- Assets: `src/assets/` (Vite-processed). `public/` (as-is: favicon, robots.txt).

---

## Git Flow

**main** — prod. Merge only from `release/*` / `hotfix/*`.
**develop** — daily integration.

| Type | From→To | Naming |
|---|---|---|
| `feat/*` | dev→dev | `feature/name` |
| `release/*` | dev→main+dev | `release/vX.X.X` |
| `hotfix/*` | main→main+dev | `hotfix/fix` |

**All merges via PR.** `feat/*`→dev delete branch. `release/*`→main tag+GH Release then back-merge dev. `hotfix/*`→main tag+GH Release then back-merge dev. Never delete main or develop.

**Agent perms:**
1. `@frontend-dev`: code on `feature/*`+`hotfix/*`. Push only. No main/develop.
2. `@release-manager`: only git write (push/PR/merge/tag/delete). `gh` CLI → fallback `curl`+REST. Token: `.opencode/secrets/github-token` > git cred > `GITHUB_TOKEN`.
3. `@orchestrator`: decide merge/release. Delegate to `@release-manager`. User checkpoint before any release branch or merge to main.
4. Merge guard: only merge to develop after `@code-review` `STATUS: APPROVED` + QA pass.
