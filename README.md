# opencode Landing Page Template

A modern **Landing Page Template** built with Vanilla HTML, CSS, and JavaScript,
managed by Vite. Designed to work with [OpenCode](https://opencode.ai) — an
open-source AI coding agent — using a multi-agent orchestration pipeline for
planning, development, code review, and automated E2E testing.

Built for performance, accessibility (WCAG 2.1 AA), and maintainability with a
strict modular architecture and enforced development guidelines.

## Tech Stack

- **Bundler:** Vite
- **Styles:** Native CSS with LightningCSS processing
- **JavaScript:** ES6+ modules (no framework)
- **Structure:** Semantic HTML5
- **Testing:** Playwright
- **Security:** `sanitize-html` for XSS protection

---

## Getting Started

The template is ready to use after **two commands**:

```bash
npm install && npm run setup    # install deps + init codegraph + install browsers
opencode                        # start coding with AI agents
```

### 1. Create Your Repository

Click the green **"Use this template"** button on GitHub (or visit
`https://github.com/KiKDraS/opencode-landing-page-template/generate`) to create
a new repository from this template.

### 2. Clone & Install

```bash
git clone https://github.com/<your-username>/<your-new-repo>.git
cd <your-new-repo>
npm install && npm run setup
```

### 3. Set Up Git Flow Branches

```bash
git checkout -b develop
git push -u origin develop
```

You now have `main` (production) and `develop` (integration) branches.

### 4. Configure Provider

OpenCode requires an LLM provider. Configure one before use:

```bash
opencode
/connect
```

Sign in at [opencode.ai/auth](https://opencode.ai/auth), copy your API key, and
paste it into the prompt. Alternatively, configure other providers (OpenAI,
Anthropic, etc.) — see
[OpenCode Providers](https://opencode.ai/docs/providers/).

### 5. Start Developing

```bash
npm run dev
```

Open `http://localhost:5173` and start building your landing page.

### Ponytail Plugin

This template comes pre-configured with the **Ponytail** plugin
(`@dietrichgebert/ponytail`) — it makes your AI agent think like the laziest
senior developer, enforcing YAGNI, stdlib-first, and minimal-diff principles.
See the
[Ponytail documentation](https://github.com/DietrichGebert/ponytail#opencode)
for full details.

**Install the plugin:**

The plugin is already referenced in `opencode.json`. OpenCode will cache it
automatically at startup.

**Default mode:** Pre-configured to `full` via
`.opencode/plugins/ponytail-mode.js`.

**Change the default mode:**

Edit `.opencode/plugins/ponytail-mode.js` and change the value:

```js
output.env.PONYTAIL_DEFAULT_MODE = "ultra"; // lite | full | ultra
```

Or override in-session at any time with `/ponytail [lite|full|ultra|off]`.

**Available commands:**

| Command                              | Description                              |
| ------------------------------------ | ---------------------------------------- |
| `/ponytail [lite\|full\|ultra\|off]` | Set intensity level (default: `full`)    |
| `/ponytail-review`                   | Review current diff for over-engineering |
| `/ponytail-audit`                    | Audit entire repo for over-engineering   |
| `/ponytail-debt`                     | List deferred `ponytail:` shortcuts      |
| `/ponytail-help`                     | Quick reference                          |

---

## Codegraph Plugin (Context Reduce)

This template uses **[Codegraph](https://github.com/colbymchenry/codegraph)** to
provide AI agents with surgical code context — fewer tool calls, faster answers,
and accurate cross-file dependency tracking.

### What Gets Indexed

- All JavaScript, CSS, and HTML files in `src/`
- Configuration files (`vite.config.js`, `opencode.json`, etc.)
- Excludes `node_modules/`, `dist/`, and anything in `.gitignore`

### Notes

- `.codegraph/` is gitignored — each developer generates their own index
- The index is a local SQLite database; no data leaves your machine
- If the index gets stale, re-run `npm run setup` to rebuild it

---

## Context7 MCP (Library Documentation)

This template uses **[Context7](https://context7.com)** to give AI agents
up-to-date documentation for libraries, frameworks, SDKs, and APIs — directly in
their toolset. Instead of guessing API signatures or relying on stale training
data, agents fetch current docs in real time (React, Next.js, Prisma, Express,
Tailwind, Django, Playwright, etc.).

### How It Works

Context7 is configured as a remote MCP server in `opencode.json`. When an agent
needs library docs (e.g., "How do I use `next/headers` in Next.js 15?"), it
calls `resolve-library-id` → `query-docs` and gets back current, versioned
documentation with code examples.

The agent skill at `.opencode/skills/context7-mcp/SKILL.md` tells the AI
**when** to use it (setup questions, API syntax, config, version migrations) and
**when not to** (refactoring, debugging business logic, code review).

### Setup

Context7 requires a free API key. Set it up in one step:

```bash
echo "<your-context7-api-key>" > .opencode/secrets/context7-api-key
```

The MCP server reads the key from this file at startup via
`{file:.opencode/secrets/context7-api-key}` in `opencode.json`.

### Where to Get an API Key

1. Go to [context7.com](https://context7.com)
2. Sign up for a free account
3. Copy your API key from the dashboard
4. Paste it into the command above

### How the File-Based Key Works

OpenCode's `{file:path}` syntax reads the file content and substitutes it as a
string at config parse time. This means:

- **No environment variables needed** — the key stays inside the project
- **Gitignored** — `.opencode/secrets/` is tracked but its contents are ignored
  (see `.opencode/secrets/.gitignore`)
- **Portable** — clone the repo, add your key, done. No global config required

### Enabling Context7

Context7 is the **only MCP server disabled by default** (requires an API key).
Enable it in `opencode.json`:

```json
"context7": {
  "type": "remote",
  "url": "https://mcp.context7.com/mcp",
  "headers": {
    "CONTEXT7_API_KEY": "{file:.opencode/secrets/context7-api-key}"
  },
  "enabled": true
}
```

To disable it later, set `"enabled": false` or remove the block entirely.

### Notes

- The API key file must be **plain text** — no `.js` extension, no `export`,
  just the raw key string
- If the file doesn't exist, OpenCode will fail to parse the config with an
  error like `bad file reference: "{file:...}" <path> does not exist`
- Context7 uses `{file:...}` for the API key — the same pattern is also used
  elsewhere in the project (e.g., prompts in agent definitions), so it's worth
  understanding how it works

---

## Troubleshooting

### `{file:...}` reference: "does not exist"

```
Error: bad file reference: "{file:.opencode/secrets/context7-api-key}" ... does not exist
```

OpenCode's `{file:path}` substitution reads the file and inlines its content. If
the file doesn't exist, the config fails to load.

**Fix:** Create the file as a plain text file (no `.js` extension, no `export`):

```bash
echo "<your-api-key>" > .opencode/secrets/context7-api-key
```

### Config file is not valid JSON

```
Error: Config file at .../opencode.json is not valid JSON
```

**Fix:** Validate your `opencode.json` syntax:

```bash
npx jsonlint opencode.json
```

Or use `jq`:

```bash
jq . opencode.json > /dev/null && echo "valid"
```

Common causes: trailing commas, missing commas between fields, unquoted keys.

### MCP server not connecting

If an agent reports that an MCP tool is unavailable (e.g., `codegraph_explore`,
`playwright-test*`, or `query-docs`):

1. **Check if the server is enabled** — verify `"enabled": true` for the
   specific MCP server in `opencode.json`. Only `context7` is opt-in by default.
2. **Restart the session** — MCP server configuration is read at startup.
   Changes require a new session.
3. **Check the server is installed** — Playwright and Codegraph need local
   dependencies (both installed by `npm run setup`):
   - Playwright: `npm run setup` (or `npx playwright install` directly)
   - Codegraph: `npm run setup` (`npx @colbymchenry/codegraph init`)

### Playwright browsers not found

```
Error: browserType.launch: Executable doesn't exist at ...
```

**Fix:** Run the setup command to install Playwright browsers:

```bash
npm run setup
```

### Port already in use

If a local MCP server fails to start, another process may be using its port.
Playwright MCP and Codegraph use ephemeral ports by default — if the issue
persists, restart your terminal or check with:

```bash
lsof -i :<port>
```

---

## Project Structure

```
├── src/
│   ├── assets/              # Images, SVGs, Fonts (Vite-processed & hashed)
│   │   └── fonts/           # Self-hosted TTF/WOFF2 fonts
│   ├── styles/              # CSS architectural root
│   │   ├── layout/          # Structural layers (header.css, footer.css)
│   │   ├── components/      # UI elements (button.css, card.css)
│   │   ├── boilerplate/     # Global design (variables, reset, base, fonts)
│   │   └── main.css         # Layer manifest entry point (@import aggregator)
│   ├── js/                  # JavaScript modular root
│   │   ├── layout/          # Layout interactivity (navigation, scroll-reveal)
│   │   ├── components/      # UI component logic (slider, modal, accordion)
│   │   └── utils/           # Reusable pure functions (debounce, validators)
│   └── main.js              # Vite JS entry point (initializes modules)
├── public/
│   └── favicon/             # Favicon bundle (served as-is)
├── index.html               # Complete HTML structure
├── vite.config.js           # Bundler config (dynamic base path for GH Pages)
├── playwright.config.ts     # E2E test configuration
├── opencode.json            # Agent & plugin configuration
└── package.json             # Dependencies & scripts
```

---

## AI Agent System

This template uses a multi-agent orchestration pipeline managed by OpenCode:

| Agent                         | Role                                                        |
| ----------------------------- | ----------------------------------------------------------- |
| **orchestrator**              | Plans architecture, delegates tasks, manages releases       |
| **frontend-dev**              | Builds features across HTML, CSS, and JS layers             |
| **code-review**               | Audits code against skills checklists (APPROVED / REJECTED) |
| **playwright-test-planner**   | Explores the UI and creates test plans                      |
| **playwright-test-generator** | Converts test plans into executable `.spec.ts` files        |
| **playwright-test-healer**    | Runs, debugs, and auto-fixes failing tests                  |

```mermaid
flowchart LR
    P[("Plan")]
    B["Build<br/><i>@frontend-dev</i>"]
    A["Audit<br/><i>@code-review</i>"]
    T["Test<br/><i>Playwright Agents</i>"]
    S["Ship<br/><i>@orchestrator</i>"]

    P --> B
    B --> A
    A -->|REJECTED| B
    A -->|APPROVED| T
    T --> S
    S -.->|User Approval| R>"Release"]
```

### Pipeline Flow

1. **Plan** → Orchestrator maps requirements and awaits user approval
2. **Build** → `@frontend-dev` creates the feature (HTML + CSS + JS)
3. **Audit** → `@code-review` validates → loops back if `REJECTED`
4. **Test** → Playwright agents plan → generate → execute → self-heal
5. **Ship** → Orchestrator coordinates release (requires user approval)

---

## Git Workflow

This project follows a strict **Git Flow** branching model:

| Branch      | Purpose         | Rules                                              |
| ----------- | --------------- | -------------------------------------------------- |
| `main`      | Production      | Only merged from `release/*` or `hotfix/*`         |
| `develop`   | Integration     | Daily workspace, features merge here               |
| `feature/*` | New features    | Branch from `develop`, merge back to `develop`     |
| `release/*` | Deployment prep | Branch from `develop`, merge to `main` + `develop` |
| `hotfix/*`  | Urgent fixes    | Branch from `main`, merge to `main` + `develop`    |

**Agent Permissions:**

- `@frontend-dev` can ONLY work on `feature/*` and `hotfix/*` branches
- `@orchestrator` is the ONLY entity authorized to merge into `develop` or
  `main`
- All merges require `@code-review` approval first

---

## Deployment to GitHub Pages

The project is configured with a dynamic `base` path in `vite.config.js` that
uses the folder name with a `-page` suffix for production builds:

```js
base: isProd ? `/${folderName}-page/` : "/";
```

You have two deployment options:

### Option A: Direct Deploy (Not Recommended)

Deploy directly from the same repository. This requires modifying
`vite.config.js` to remove the `-page` suffix:

```js
base: isProd ? `/${folderName}/` : "/";
```

**Steps:**

1. Build the project: `npm run build`
2. Push the `dist/` folder to a `gh-pages` branch or configure GitHub Pages to
   serve from `/dist` on `main`
3. Your site will be available at `https://<username>.github.io/<repo-name>/`

**Why this is not recommended:** Your source code becomes public (if the repo is
public), and you lose the clean separation between development and deployment.

---

### Option B: Dual-Repo Flow (Recommended)

Keep your source code **private** in one repository and deploy to a **public**
`[project]-page` repository. The `-page` suffix in `vite.config.js`
automatically matches the public repo name.

#### Step 1: Create the Public Deploy Repo

1. Go to GitHub and create a new **public** repository named
   `<your-project>-page`
   - Example: if your source repo is `my-landing`, name this `my-landing-page`
2. Leave it **empty** — no README, no `.gitignore`, no license
3. Note the repository URL: `https://github.com/<username>/<your-project>-page`

#### Step 2: Enable GitHub Pages on the Deploy Repo

1. Go to the `<your-project>-page` repo **Settings** → **Pages**
2. Set **Source** to `GitHub Actions` (recommended) or `Deploy from a branch` →
   `main` branch, `/ (root)` folder
3. Save

#### Step 3: Add the GitHub Actions Workflow

Create `.github/workflows/deploy.yml` in your **private source repo**:

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
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### Step 4: Push to Main

```bash
git add .
git commit -m "feat: initial landing page setup"
git push origin main
```

The workflow triggers automatically, builds your project, and deploys to GitHub
Pages.

#### Step 5: Verify

Your site will be live at:

```
https://<username>.github.io/<your-project>-page/
```

The `base: /${folderName}-page/` in `vite.config.js` resolves correctly because
the public deploy repo name matches the `-page` suffix.

#### Alternative: Push to External Repo via PAT

If you prefer to push `dist/` to a separate repo instead of using GitHub Pages
Actions, use this workflow:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to public repo
        uses: peaceiris/actions-gh-pages@v4
        with:
          personal_token: ${{ secrets.DEPLOY_PAT }}
          external_repository: <username>/<your-project>-page
          publish_dir: ./dist
          publish_branch: main
```

Create a **Personal Access Token** (PAT) with `repo` scope and add it as a
secret named `DEPLOY_PAT` in your private repo settings.

---

## Skills & Guidelines

All code generated in this project must comply with the following skills defined
in `.opencode/skills/`:

### HTML/CSS Best Practices

- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`,
  `<section>`, `<footer>`)
- Modular layered CSS architecture (boilerplate → layout → components →
  utilities)
- CSS custom properties for design tokens
- Mobile-first responsive design with relative units

### Accessibility WCAG 2.1 AA

- Native semantic elements (no `<div role="button">`)
- Color contrast ≥ 4.5:1 (normal text), ≥ 3:1 (large text)
- Keyboard navigation with visible focus indicators
- ARIA landmarks, skip links, descriptive `alt` text
- Proper form labels and error messages

### Modern JavaScript Patterns

- ES6+ syntax (const/let, arrow functions, destructuring, async/await)
- Pure functions, immutability, declarative array pipelines
- `try/catch` error boundaries for async operations
- Event delegation via `event.target.closest()`

### Frontend Design

- **No generic "AI slop" aesthetics** — bold, specific conceptual direction
  required
- Unique typography pairings (no Inter, Roboto, or system fonts)
- Asymmetric layouts, grid-breaking structures, advanced CSS motion
- Distinctive color palettes and background textures

### SEO Optimization

- Technical SEO: proper `robots.txt`, meta robots, canonical URLs
- Structured data with JSON-LD (schema.org compliance)
- Semantic headings hierarchy (single `<h1>`, logical nesting)
- Descriptive `alt` attributes and optimized image assets
- Sitemap.xml for search engine crawling

### Context7 MCP (Library Documentation)

- Fetches live, versioned documentation for libraries and frameworks
- Priority use: setup questions, API syntax, config, version migrations
- **Do not use for**: refactoring, debugging business logic, code review
- Uses `resolve-library-id` → `query-docs` pipeline for accurate results

### Playwright Best Practices

- Reliable locators (user-facing attributes over implementation details)
- Page Object Model for test maintainability
- Web-first assertions with auto-retrying
- Test isolation via fixtures and hooks
- Accessibility testing integration (axe-core)

---

## Available Commands

```bash
npm run dev       # Start local development server
npm run build     # Generate production files in dist/
npm run preview   # Preview production build locally
```
