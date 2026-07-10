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
      base: isProd ? `/${folderName}/-page` : "/",
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
  ├── src/
  │   ├── assets/       # Images, SVGs, Icons, etc. (Vite-processed)
  │   ├── styles/       # CSS Architectural Root
  │   │   ├── layout/   # Structural layers (header.css, main.css, footer.css)
  │   │   ├── components/ # UI elements layers (button.css, cards.css, etc.)
  │   │   ├── boilerplate/ # Global Design
  │   │   │   ├── variables.css # Global Design Tokens / Custom Properties
  │   │   │   ├── reset.css     # Base normalization
  │   │   │   ├── base.css      # Global element overrides (html, body)
  │   │   │   ├── fonts.css     # @font-face declarations
  │   │   │   ├── utilities.css # Atomic modifier utilities
  │   │   └── main.css      # Layer manifest entry point (aggregates via @import)
  │   ├── js/           # 📦 JavaScript Modular Root
  │   │   ├── layout/   # Interactivity tied to layout (e.g., navigation.js, sticky-header.js)
  │   │   ├── components/ # Isolated UI components logic (e.g., slider.js, modal.js, accordion.js)
  │   │   └── utils/    # Reusable pure functions & tools (e.g., debounce.js, validators.js, dom-helpers.js)
  │   └── main.js       # Vite's JavaScript entry point (Initializes JS modules only)
  ├── public/
  │   ├── fonts/        # Self-hosted font files (TTF, WOFF2) — served at /fonts/
  │   └── favicon/      # Favicon bundle files
  ├── index.html        # Complete HTML structure for the Landing Page
  ├── vite.config.js    # Bundler configuration
  └── package.json      # Project dependencies and scripts
```

---

## Development Rules and Guidelines

When generating code or modifying files, the AI must strictly follow these
rules:

### 1. HTML Structure (`index.html`)

- **The entire structure of the Landing Page must be written in the `index.html`
  file located at the root of the project.** Do not fragment the HTML into
  separate components unless explicitly requested.
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
    (images, SVGs, icons). Reference them with relative paths from CSS/HTML
    (e.g., `/src/assets/logo.svg` or `./src/assets/hero.jpg`).
  - **`public/`**: For assets that must be served as-is at the root URL path
    without Vite processing. This is the standard location for:
    - **Self-hosted font files** (TTF, WOFF2, etc.) — placed in `public/fonts/`
      and referenced as `/fonts/filename.woff2`
    - **Favicon bundles** and `site.webmanifest` — placed in `public/favicon/`
- Font files are an exception to the `src/assets/` rule because Vite serves
  `public/` content at the root URL, allowing clean `/fonts/` paths in
  `@font-face` declarations and `<link rel="preload">` tags without content
  hashing.

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

- **HTML/CSS Best Practices (`html-css-best-practices.md`):** Governs the
  mandatory use of semantic HTML5, the organization of CSS custom properties,
  nesting methodology, and performance optimization criteria.
- **Accessibility WCAG (`accessibility-wcag.md`):** Governs compliance with the
  WCAG 2.1 Level AA standard. It requires the correct use of ARIA attributes,
  transparent keyboard navigation, accessible form validation, and native color
  contrasts.
- **Modern JavaScript Patterns (`modern-javascript-patterns.md`):** Governs the
  execution of ES6+ core syntax, functional programming patterns (immutability,
  piping, pure functions), declarative array methods over imperative loops,
  asynchronous handling (async/await error boundaries), and performance
  optimizations like debouncing or throttling.
- **Frontend Design (`frontend-design.md`):** Forces the absolute avoidance of
  generic "AI slop" aesthetics. Mandates a bold and specific conceptual
  direction (e.g., brutalist, editorial, luxury, retro-futuristic) before
  coding. Enforces unique typography pairings, sharp asymmetric layouts,
  grid-breaking structures, advanced background meshes/textures, and high-impact
  CSS motion choreography.
- **Context7 MCP (`context7-mcp.md`):** Fetches current documentation for
  libraries, frameworks, SDKs, and API references via Context7 MCP.

---

<!-- context7 -->
Use Context7 MCP to fetch current documentation whenever the user asks about a library, framework, SDK, API, CLI tool, or cloud service — even well-known ones like React, Next.js, Prisma, Express, Tailwind, Django, or Spring Boot. This includes API syntax, configuration, version migration, library-specific debugging, setup instructions, and CLI tool usage. Use even when you think you know the answer — your training data may not reflect recent changes. Prefer this over web search for library docs.

Do not use for: refactoring, writing scripts from scratch, debugging business logic, code review, or general programming concepts.

## Steps

1. Always start with `resolve-library-id` using the library name and the user's question, unless the user provides an exact library ID in `/org/project` format
2. Pick the best match (ID format: `/org/project`) by: exact name match, description relevance, code snippet count, source reputation (High/Medium preferred), and benchmark score (higher is better). If results don't look right, try alternate names or queries (e.g., "next.js" not "nextjs", or rephrase the question). Use version-specific IDs when the user mentions a version
3. `query-docs` with the selected library ID and the user's full question (not single words), scoped to a single concept. If the question spans multiple distinct concepts (e.g. routing and auth and caching), make a separate `query-docs` call per concept with the same library ID, unless the question is about how the concepts interact — combined queries dilute ranking and return shallow results for each topic
4. Answer using the fetched docs
<!-- context7 -->

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
structure defined in `html-css-best-practices.md` is a mandatory structural
contract. Ponytail's _'fewest files possible'_ restriction applies exclusively
to preventing unrequested features or redundant helper utilities. It **MUST
NOT** compress the mandated modular CSS layers into a single flat asset file.

---

## Useful Commands

- `npm run dev`: Starts the local development server.
- `npm run build`: Generates production files in the `dist/` folder, applying
  the dynamic subpath for `gh-pages`.
