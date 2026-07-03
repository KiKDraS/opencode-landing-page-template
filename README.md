# opencode Landing Page Template

A modern landing page template built with Vanilla HTML, CSS, and JavaScript,
managed by Vite. This template serves as a foundation for creating professional
landing pages with a focus on performance, accessibility, and maintainability.

## Overview

This repository provides a structured template for building landing pages
following industry best practices. It includes a modular architecture, strict
development guidelines, and a Git workflow designed for team collaboration.

## Tech Stack

- **Bundler:** Vite
- **Styles:** Native CSS with LightningCSS processing
- **JavaScript:** ES6+ modules
- **Structure:** Semantic HTML5
- **Testing:** Playwright

## Quick Start

### Prerequisites

- Node.js (v18 or later)
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd <repository-folder>

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
.
├── src/
│   ├── assets/              # Images, SVGs, Fonts, etc.
│   ├── styles/              # CSS architectural root
│   │   ├── layout/          # Structural layers
│   │   ├── components/      # UI elements
│   │   ├── boilerplate/    # Global design
│   │   └── main.css         # Layer manifest entry point
│   ├── js/                  # JavaScript modular root
│   │   ├── layout/          # Layout interactivity
│   │   ├── components/      # UI component logic
│   │   └── utils/           # Reusable pure functions
│   └── main.js              # Vite entry point
├── index.html               # Complete HTML structure
├── vite.config.js           # Bundler configuration
├── package.json             # Project dependencies
└── .gitignore               # Git ignore file
```

## Development Guidelines

### HTML Structure

The entire landing page structure must be written in the `index.html` file at
the project root. The file must include:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Page Title</title>
  </head>
  <body>
    <!-- Your HTML content here -->
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**Critical HTML Requirements:**

- **Semantic HTML5 Only:** Use native HTML5 semantic elements (`<header>`,
  `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`,
  `<h1>-<h6>`, `<button>`, `<a>`, `<figure>`, `<figcaption>`, `<time>`) instead
  of generic `<div>` or `<span>` with ARIA roles
- **No Inline Styles:** Never inject inline styles or `<style>` blocks into
  `index.html`
- **No Script Pollution:** No raw `<script>` blocks, inline JavaScript code, or
  legacy inline DOM event handlers (`onclick`, `onchange`, `onload`) inside
  `index.html`
- **Single Entry Point:** Only one script tag allowed:
  `<script type="module" src="/src/main.js"></script>`

### Feature Cohesion Rule (Trinity Rule)

Every feature must be delivered across all three architectural layers
simultaneously:

1. **HTML Layer:** Write the markup directly in the structural root
   (`index.html`)
2. **CSS Layer:** Isolate visual layout and components into scoped files within
   `src/styles/` (under `/layout` or `/components`) and link them via `@import`
   in `main.css`
3. **JavaScript Layer:** Encapsulate interactivity inside dedicated JS modules
   within `src/js/` (`layout/`, `components/`, or `utils/`) and initialize via
   `src/main.js` using a scoped lifecycle wrapper

**Definition of Done:** A feature is complete only when HTML is mapped, style
layers are isolated, JS module is organized, its init hook is registered in
`main.js`, and the entire block compiles under Vite.

### CSS Architecture

CSS must follow a modular layered architecture:

1. **Config/Tokens:** `src/styles/boilerplate/variables.css` (Custom properties)
2. **Boilerplate:** `src/styles/boilerplate/reset.css` and
   `src/styles/boilerplate/base.css`
3. **Layout:** `src/styles/layout/` (header.css, main.css, footer.css)
4. **Components:** `src/styles/components/` (button.css, cards.css, etc.)
5. **Utilities:** `src/styles/boilerplate/utilities.css`

All CSS files are aggregated in `src/styles/main.css` using `@import`
statements.

### JavaScript Architecture

JavaScript follows a modular responsibility-based structure:

1. **Layout:** `src/js/layout/` (navigation, scroll behavior, etc.)
2. **Components:** `src/js/components/` (sliders, modals, accordions)
3. **Utils:** `src/js/utils/` (debounce, validators, DOM helpers)

Each module exports a single initialization function (e.g., `initSlider()`) that
is imported and executed in `src/main.js` within a `DOMContentLoaded` wrapper.

### Skills Compliance

This project enforces compliance with the following skills:

- **HTML/CSS Best Practices:** Semantic HTML5, CSS custom properties, responsive
  design
- **Accessibility WCAG:** WCAG 2.1 Level AA compliance
- **Modern JavaScript Patterns:** ES6+ syntax, functional programming,
  performance optimizations
- **Frontend Design:** Bold conceptual direction, unique typography,
  grid-breaking layouts

## Git Workflow

This project follows a Git Flow branching model:

### Main Branches

- **`main`:** Production branch (100% stable code)
- **`develop`:** Integration branch (daily workspace)

### Feature Branches

- **`feature/`:** New features and enhancements
  - Origin: `develop`
  - Merge destination: `develop`
  - Naming: `feature/improvement-name`

### Release Branches

- **`release/`:** Preparing a deployment
  - Origin: `develop`
  - Merge destination: `main` and `develop`
  - Naming: `release/vX.X.X`

### Hotfix Branches

- **`hotfix/`:** Urgent production patches
  - Origin: `main`
  - Merge destination: `main` and `develop`
  - Naming: `hotfix/error-name`

### Agent Protocol

1. **Workspace Sync:** Always run `git fetch origin` before starting
2. **Frontend Development:** Work in `feature/*` and `hotfix/*` branches only
3. **Integration:** Only the orchestrator can merge into `develop` or `main`

## Testing

This project uses Playwright for end-to-end testing:

```bash
# Run tests
npm test

# Open test editor
npx playwright test --ui
```

## Deployment

The project is configured for automatic deployment to GitHub Pages:

- Uses dynamic base path based on repository folder name
- Builds to `dist/` directory
- Configured with GitHub Actions for automated deployment

## Best Practices

### Performance

- Use mobile-first design
- Optimize images (WebP format, lazy loading)
- Minimize CSS file sizes
- Leverage Vite + LightningCSS for processing

### Accessibility

- Use semantic HTML5 elements
- Maintain 4.5:1 color contrast ratio for normal text
- Provide alt text for all meaningful images
- Ensure keyboard navigation support

### Maintainability

- Follow the modular architecture
- Use descriptive class names
- Comment complex sections
- Validate HTML with W3C validator

## License

This template is provided as a foundation for future projects. Use it as a
starting point for your landing page development.

## Support

For questions about this template, refer to the AGENTS.md file for detailed
development guidelines and requirements.
