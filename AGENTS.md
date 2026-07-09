# Agent Context

This file defines the rules, structure, and development guidelines for the AI
assistant in this project. The goal is to build a modern **Landing Page** using
Vanilla HTML, CSS, and JavaScript, managed by **Vite**.

---

## Tech Stack

- **Bundler:** Vite
- **Structure:** Classic HTML5
- **Styles:** Native CSS (processed with `lightningcss`)
- **Logic:** JavaScript (ES6+)

### Vite Configuration (`vite.config.js`)

The project uses a dynamic configuration optimized for automatic deployment to
**GitHub Pages**, using the root folder name as the `base` path in production
environments. This project leverage **GitHub Actions** to keep it source code on
a private repository while deploying to **GitHub Pages** using `/dist` content
for a public repository.

```bash
  import path from "node:path";
  import { defineConfig } from "vite";

  const folderName = path.basename(process.cwd());

  export default defineConfig(({ command }) => {
    const isProd = command === "build";

    return {
      base: isProd ? `/${folderName}-page/` : "/",
      publicDir: "public",
      build: {
        outDir: "dist",
      },
      css: {
        transformer: "lightningcss",
      },
    };
  });
```

---

## Project Structure

The agent must strictly respect the following file architecture. No folders or
files should be created outside of this schema without prior authorization.

```bash
  ├──   src/
  │   ├── assets/       # Images, SVGs, Icons, and Graphic resources
  │   │   └── fonts/    # Self-hosted TTF/WOFF2 font files
  │   ├── styles/       # CSS Architectural Root
  │   │   ├── layout/   # Structural layers (header.css, main.css, footer.css)
  │   │   ├── components/ # UI elements layers (button.css, cards.css, etc.)
  │   │   ├── boilerplate/ # Global Design
  │   │   │   ├── variables.css # Global Design Tokens / Custom Properties
  │   │   │   ├── reset.css     # Base normalization
  │   │   │   ├── base.css      # Global element overrides (html, body)
  │   │   │   ├── fonts.css     # @font-face declarations
  │   │   │   └── utilities.css # Atomic modifier utilities
  │   │   └── main.css      # Layer manifest entry point (aggregates via @import)
  │   ├── js/           # JavaScript Modular Root
  │   │   ├── layout/   # Interactivity tied to layout (e.g., navigation.js, sticky-header.js)
  │   │   ├── components/ # Isolated UI components logic & factory elements
  │   │   └── utils/    # Reusable pure functions & tools (e.g., debounce.js, validators.js)
  │   └── main.js       # Native JavaScript entry point (Initializes JS modules only)
  ├── tests/            # Playwright Test Suite
  │   ├── e2e/          # End-to-End user flow tests
  │   └── components/   # Component isolation tests
  ├── public/
  │   ├── favicon/      # Favicon bundle files (served as-is at /favicon/)
  │   └── robots.txt    # Search Engine crawl directives
  ├── index.html        # Complete HTML structure & SEO Core for the Landing Page
  ├── sitemap.xml       # Canonical XML mapping for search indices
  ├── playwright.config.js # Testing framework configuration
  └── package.json      # Project dependencies and scripts
```

---

## Development Rules and Guidelines

When generating code or modifying files, the AI must strictly follow these
rules:

### 1. HTML Structure (`index.html`)

- **The entire structure** of the Landing Page must be written in the
  `index.html` file located at the root of the project. Do not fragment the HTML
  into separate components unless explicitly requested.

- **On-Page SEO Priority:** The `index.html` file must contain unique meta-tags,
  localized structural rules, high-priority semantic headings (`<h1>` rules),
  fully specified descriptive image attributes (`alt`, layout sizing), and
  JSON-LD structured data scripts conforming to semantic schema guidelines.

- The `index.html` file must include the CSS manifest entry point via a `<link>`
  tag in the `<head>`: `<link rel="stylesheet" href="/src/styles/main.css" />`
- The `index.html` file must include the script tag to connect the JS entry
  point: `<script type="module" src="/src/main.js"></script>`

### 2. Styles and CSS (`src/styles/`)

- Any design rules, CSS variables, or global styles must be created within the
  `src/styles/` directory following the strict **Modular Layered Architecture**
  defined in `html-css-best-practices.md`.
- **CRITICAL:** Do not dump all CSS declarations inside a single flat file. You
  must isolate concerns into their respective layer files (e.g.,
  `boilerplate/variables.css`, `layout/header.css`, `components/button.css`) and
  stitch them together using native CSS `@import` statements inside
  `src/styles/main.css`.
- Only the master manifest entry point (`src/styles/main.css`) must be imported
  via a `<link rel="stylesheet">` tag inside `index.html` for Vite +
  LightningCSS to process the full cascaded bundle accurately. CSS must NOT be
  imported from `src/main.js`.

### 3. Logic and Scripts (`src/js/` and `src/main.js`)

- `src/main.js` acts strictly as the orchestration layer. It must handle the
  central initialization of all interactive modules. No raw DOM manipulations or
  direct feature logic should be written here.
- All interactivity must be modularized inside `src/js/` split strictly by
  responsibility:
  1. **`src/js/layout/`**: For scripts modifying structural behavior (e.g.,
     mobile menu toggles, viewport scroll-reveal triggers).
  2. **`src/js/components/`**: For self-contained UI interaction units (e.g.,
     custom sliders, testimonial carousels, accessible dialog popups).
  3. **`src/js/utils/`**: For stateless, side-effect-free pure functions (e.g.,
     input validators, performance debouncers or throttlers).
- **The Lifecycle Contract:** Every JS module inside `layout/` or `components/`
  must export a single initialization function (e.g., `initSlider()`). You must
  import this function into `src/main.js` and execute it directly, cleanly, and
  sequentially. Do not wrap execution in `DOMContentLoaded` or load events, as
  Vite compiles scripts as native ES modules, which are natively deferred by
  default.

### 4. Asset Management (`src/assets/` and `public/`)

- All images, icons, SVGs, and local fonts must be stored in either
  `src/assets/` or `public/`, depending on how they need to be served:
  - **`src/assets/`**: For assets that Vite should process, hash, and optimize
    (images, SVGs, icons, fonts). Reference them with relative paths from CSS
    (e.g., `../../assets/fonts/file.ttf`) and Vite will rewrite the URLs with
    content hashes in production builds.
  - **`public/`**: For assets that must be served as-is at the root URL path
    without Vite processing. This is the standard location for:
    - **Favicon bundles** and `site.webmanifest` — placed in `public/favicon/`
- **Font files belong in `src/assets/fonts/`**, not in `public/`. By processing
  fonts through Vite, they receive content-hashed filenames that enable
  long-term caching and are automatically versioned when the file changes.
  Reference them from `@font-face` declarations using relative CSS paths (e.g.,
  `url('../../assets/fonts/Outfit-VariableFont_wght.ttf')`).

---

## Workflow Structure: Git Flow

To ensure project stability, all agents must strictly adhere to the Git Flow
branching model. Making direct commits to the main stability branches is
**strictly prohibited**.

### Main Branches

- **`main` (Production):** Exclusively contains 100% stable code. Every update
  to this branch triggers the automated deployment workflow to the public GitHub
  Pages repository. It only receives changes via merges from `release/*` or
  `hotfix/*` branches.
- **`develop` (Integration):** The daily workspace. All completed new features
  are consolidated here to be tested together before moving to production.

### Temporary and Working Branches

1.  **`feature/` (New features and enhancements):**
    - **Origin:** `develop`
    - **Merge Destination:** `develop`
    - **Naming Convention:** `feature/improvement-name` (e.g.,
      `feature/pnpm-support`)
    - **Rule:** All new logic, refactoring, or plugin additions must start and
      finish here.
2.  **`release/` (Preparing a deployment):**
    - **Origin:** `develop`
    - **Merge Destination:** `main` and `develop`
    - **Naming Convention:** `release/vX.X.X` (e.g., `release/v1.0.0`)
    - **Rule:** Generated when `develop` has accumulated enough changes for a
      new public version. Only minor bug fixes detected during the preparation
      phase are allowed.
3.  **`hotfix/` (Urgent production patches):**
    - **Origin:** `main`
    - **Merge Destination:** `main` and `develop`
    - **Naming Convention:** `hotfix/error-name` (e.g.,
      `hotfix/fix-asset-routes`)
    - **Rule:** Opened exclusively if a critical failure is reported directly on
      the public website requiring an immediate fix.

### Agent Protocol & Branch Permissions

1. **Workspace Sync:** Before starting any assigned task, agents must ensure
   they run `git fetch origin` to have an updated view of the repository.
2. **@frontend-dev Exclusivity & Restrictions:**
   - The frontend development agent is **SOLELY RESPONSIBLE** for creating and
     writing code inside `feature/*` and `hotfix/*` branches.
   - When a task is assigned, it must check out `develop`, pull the latest
     changes, and spawn its working branch from there
     (`git checkout -b feature/name`).
   - It is completely forbidden for `@frontend-dev` to check out, commit to, or
     merge into `main` or `develop`.
3. **@orchestrator Exclusivity & Integration Powers:**
   - The `@orchestrator` is the **ONLY** entity authorized to execute branch
     merges into `develop` or `main`, and to manage `release/*` branches.
   - **Merge Guardrail:** The orchestrator will only merge a `feature/*` or
     `hotfix/*` branch into `develop` once `@code-review` returns
     `STATUS: APPROVED`.
   - **Mandatory User Checkpoint:** The orchestrator is strictly prohibited from
     creating a `release/*` branch or merging into `main` automatically. It must
     explicitly explain the release scope to the user and halt operations until
     the user provides a verbatim text confirmation (e.g., "Approved" or
     "Aprobar release").

---

## Mandatory Skills (Skills Compliance)

The agent is prohibited from generating code based on general assumptions. It
must strictly comply with the rules defined in the configuration files located
in the `.opencode/skills/` folder:

- **HTML/CSS Best Practices (`html-css-best-practices`):** Governs the mandatory
  use of semantic HTML5, the organization of CSS custom properties, nesting
  methodology, and performance optimization criteria.
- **Accessibility WCAG (`accessibility-wcag`):** Governs compliance with the
  WCAG 2.1 Level AA standard. It requires the correct use of ARIA attributes,
  transparent keyboard navigation, accessible form validation, and native color
  contrasts.
- **Modern JavaScript Patterns (`modern-javascript-patterns`):** Governs the
  execution of ES6+ core syntax, functional programming patterns (immutability,
  piping, pure functions), declarative array methods over imperative loops,
  asynchronous handling (async/await error boundaries), and performance
  optimizations like debouncing or throttling.
- **Frontend Design (`frontend-design`):** Forces the absolute avoidance of
  generic "AI slop" aesthetics. Mandates a bold and specific conceptual
  direction (e.g., brutalist, editorial, luxury, retro-futuristic) before
  coding. Enforces unique typography pairings, sharp asymmetric layouts,
  grid-breaking structures, advanced background meshes/textures, and high-impact
  CSS motion choreography.
- **Playwright Best Practices (`playwright-best-practices`):** Enforces
  execution constraints, selector reliability, trace review loops, Page Object
  Model layouts, and testing isolation bounds.
- **SEO Optimization (`seo`):** Mandates technical crawling structure, robots
  compliance, proper JSON-LD deployment, optimized content assets, and tap
  targets.

---

### Intersectional Golden Rule: Ponytail + Skills

Ponytail's "lazy" philosophy and these design rules do not contradict each
other; they enhance one another. When building the interface:

> _"Do not create complex abstractions in JavaScript or add libraries for
> elements that the HTML/CSS, Accessibility, or Modern JavaScript Skills require
> to be resolved natively. Rely heavily on the JavaScript standard library,
> modern browser Web APIs, and native CSS solutions (e.g., standard array
> pipelines, native `<dialog>` elements, or CSS scroll snaps) before writing
> custom boilerplate."_

**Architectural Override Rule:** Splitting styles into the layered folder
structure defined in `html-css-best-practices` is a mandatory structural
contract. Ponytail's _'fewest files possible'_ restriction applies exclusively
to preventing unrequested features or redundant helper utilities. It **MUST
NOT** compress the mandated modular CSS layers into a single flat asset file.

---

## Codegraph (Code Intelligence)

This project uses [Codegraph](https://github.com/colbymchenry/codegraph) to
provide AI agents with surgical code context — fewer tool calls, faster answers,
and accurate cross-file dependency tracking.

### Setup

After cloning the repository, initialize the codegraph index:

```bash
npm install
npm run setup
```

This runs `npx @colbymchenry/codegraph init`, which creates the `.codegraph/`
directory and builds the full knowledge graph. The index auto-syncs on every
file change — no manual re-indexing needed.

### What Gets Indexed

- All JavaScript, CSS, and HTML files in `src/`
- Configuration files (`vite.config.js`, `opencode.json`, etc.)
- Excludes `node_modules/`, `dist/`, and anything in `.gitignore`

### MCP Integration

The MCP server is configured in `opencode.json`. When an agent session starts,
codegraph launches automatically and provides tools like `codegraph_explore` for
semantic code queries.

### Notes

- `.codegraph/` is gitignored — each developer generates their own index
- The index is a local SQLite database; no data leaves your machine
- If the index gets stale, re-run `npm run setup` to rebuild it

---

## Useful Commands

- `npm run dev`: Starts the local development server.
- `npm run build`: Generates production files in the `dist/` folder, applying
  the dynamic subpath for `gh-pages`.
