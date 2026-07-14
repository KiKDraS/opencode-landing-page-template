# OpenCode Landing Page Template

![Version](https://img.shields.io/badge/version-1.4.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)

Vanilla HTML/CSS/JS landing page, powered by [Vite](https://vitejs.dev) and
built for the [OpenCode](https://opencode.ai) multi-agent pipeline — planning,
code generation, review, and automated E2E testing. WCAG 2.1 AA, modular
architecture, no framework lock-in.

```bash
npm install && npm run setup    # deps + codegraph index + playwright browsers
opencode                        # start building with AI agents
```

---

## Getting Started

1. **Create repo** — Click ["Use this template"](https://github.com/KiKDraS/opencode-landing-page-template/generate) on GitHub
2. **Clone & install** — `git clone <your-repo> && cd <your-repo> && npm install && npm run setup`
3. **Git Flow branches** — `git checkout -b develop && git push -u origin develop`
4. **Connect OpenCode** — `opencode` then `/connect` → sign in at [opencode.ai/auth](https://opencode.ai/auth)
5. **Start dev server** — `npm run dev` → open `http://localhost:5173`

---

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

---

## Project Structure

```
├── src/
│   ├── assets/           # Images, SVGs, fonts (Vite-processed)
│   ├── styles/           # CSS layers: boilerplate/ → layout/ → components/
│   │   └── main.css      # Entry point (@import aggregator)
│   ├── js/               # JS modules: layout/ → components/ → utils/
│   └── main.js           # Vite entry (initializes modules)
├── public/favicon/       # Favicon bundle (served as-is)
├── tests/                # Playwright specs (e2e/ + components/)
├── index.html            # HTML + SEO + JSON-LD structured data
├── specs/                # Test plans (written by playwright-test-planner)
├── vite.config.js        # Dynamic base path for GitHub Pages deploy
├── playwright.config.ts  # E2E test runner config
├── opencode.json         # Agent definitions, plugins & MCP servers
└── package.json
```

---

## AI Agent Pipeline

| Agent | Role |
|-------|------|
| **orchestrator** | Plans architecture, delegates tasks, manages releases |
| **frontend-dev** | Builds features across HTML, CSS, JS layers |
| **code-review** | Audits against skill checklists (APPROVED / REJECTED) |
| **release-manager** | Creates PRs, branches, merges, tags |
| **playwright-test-planner** | Explores live UI, writes test plans to `specs/` |
| **playwright-test-generator** | Converts plans → executable `.spec.ts` files |
| **playwright-test-healer** | Runs tests, debugs, auto-fixes failures |

```mermaid
flowchart LR
    P[("Plan")]
    B["Build<br/><i>@frontend-dev</i>"]
    A["Audit<br/><i>@code-review</i>"]
    T["Test<br/><i>Playwright Agents</i>"]
    S["Ship<br/><i>@orchestrator</i>"]
    P --> B --> A
    A -->|REJECTED| B
    A -->|APPROVED| T --> S
    S -.->|User Approval| R>"Release"]
```

**Pipeline:** Plan → Build → Audit (loops if rejected) → Test (plan → generate → execute → self-heal) → Ship (user approval required for release).

---

## Tools & Configuration

| Tool | What it does | Setup |
|------|-------------|-------|
| **[Ponytail](https://github.com/DietrichGebert/ponytail)** | Makes AI write minimal code — YAGNI, stdlib-first, shortest diff | Pre-configured. Commands: `/ponytail [lite\|full\|ultra\|off]`, `/ponytail-review`, `/ponytail-audit`, `/ponytail-debt`, `/ponytail-help` |
| **[Codegraph](https://github.com/colbymchenry/codegraph)** | SQLite code graph — AI gets surgical context, fewer round-trips | `npm run setup` builds index. Re-run if stale. `.codegraph/` is gitignored. |
| **[Playwright](https://playwright.dev)** | Browser automation — agents explore UI, generate tests, self-heal failures | Pre-configured. Tests in `tests/e2e/` and `tests/components/`. |
| **[Context7](https://context7.com)** | Live library docs for AI (React, Next.js, Prisma, Tailwind, etc.) | Needs API key. [Sign up](https://context7.com), then `echo "<key>" > .opencode/secrets/context7-api-key` and enable in `opencode.json`. |
| **GitHub Token** | PR automation for `@release-manager` | Optional. Auto-detects `gh` CLI → git credentials → `GITHUB_TOKEN`. |

> **Note:** Context7 is the only tool disabled by default (needs an API key).
> Everything else works after `npm install && npm run setup`.

---

## Git Workflow

Strict **Git Flow**. All merges through Pull Requests — no direct commits to `main` or `develop`.

| Branch | From → To | Purpose |
|--------|-----------|---------|
| `main` | — | Production (merge only from `release/*` or `hotfix/*`) |
| `develop` | — | Daily integration branch |
| `feature/*` | from `develop` → PR to `develop` | New features |
| `release/*` | from `develop` → PR to `main` + back-PR to `develop` | Deployment prep |
| `hotfix/*` | from `main` → PR to `main` + back-PR to `develop` | Urgent production fixes |

After merge, the source branch is deleted (local + remote). **`main` and `develop` are never deleted.**

| Agent | Branch authority |
|-------|-----------------|
| `@frontend-dev` | `feature/*` and `hotfix/*` only |
| `@release-manager` | All remote git operations (PR, push, merge, tag, delete) |
| `@orchestrator` | Decides **when** to merge or release — always requires user approval |
| `@code-review` | All merges need APPROVED status first |

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines — scope (agent
infrastructure only, not demo content), Git Flow, review criteria, and how to
submit changes.

---

## Deployment

**Recommended: dual-repo flow** — private source repo, public deploy repo.

1. Create a **public** repo named `<your-project>-page` on GitHub (empty, no README)
2. Enable **GitHub Pages** → **GitHub Actions** in that repo's Settings
3. Add this workflow to your **private source repo** (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: {node-version: 20, cache: npm}
      - run: npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
        with: {path: dist}
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

4. Push to `main` — the workflow builds and deploys automatically
5. Site at `https://<username>.github.io/<your-project>-page/`

The `base: /${folderName}-page/` in `vite.config.js` automatically matches the
public repo name.

> **Warning:** Deploying from the same repo (no `-page` suffix) is possible but
> makes source code public. Not recommended.

---

## Skills & Guidelines

All generated code complies with these skills (defined in `.opencode/skills/`):

| Skill | What it enforces |
|-------|-----------------|
| **HTML/CSS Best Practices** | Semantic HTML5, modular CSS layers, custom properties, mobile-first |
| **Accessibility WCAG** | WCAG 2.1 AA — contrast ≥4.5:1, keyboard nav, ARIA landmarks, skip links |
| **Modern JavaScript** | ES6+, pure functions, async/await, declarative pipelines, event delegation |
| **Frontend Design** | No generic AI slop — bold typography, asymmetric layouts, distinctive palette, CSS motion |
| **SEO** | JSON-LD structured data, semantic headings, `robots.txt`, sitemap, canonical URLs |
| **Context7 MCP** | Live library docs for setup, API syntax, migrations (not for refactoring/debugging) |
| **Playwright** | User-facing locators, Page Object Model, web-first assertions, test isolation |

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `bad file reference: "{file:...}"` | `echo "<your-key>" > .opencode/secrets/context7-api-key` |
| `opencode.json is not valid JSON` | `npx jsonlint opencode.json` — check for trailing commas, unquoted keys |
| `browserType.launch: Executable doesn't exist` | `npm run setup` (installs Playwright browsers) |
| MCP server tool unavailable | Check `"enabled": true` in `opencode.json`, restart session, run `npm run setup` |
