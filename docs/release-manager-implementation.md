# Release Manager Agent Implementation

**Date:** 2026-07-10  
**Releases:** v1.1.0, v1.2.0  
**Status:** Complete and Tested

## What

Implemented a `@release-manager` subagent that automates the full release lifecycle with PR-only merges, hybrid GitHub authentication (gh CLI + curl fallback), semantic versioning, and GitHub Release creation.

## Why

- **PR-only policy** prevents direct commits to `main`/`develop` — every change is traceable via PR
- **Hybrid auth** makes the template portable: works with or without `gh` CLI installed
- **Semantic versioning** prevents mismatches between `package.json` and git tags
- **GitHub Releases** provide visible release artifacts with notes on the Releases page

## Next

- **PR #9** (session docs) awaiting merge to `develop`
- Future: automated changelog from PR descriptions, pre-release validation, release candidates

## Files

| File | Purpose |
|------|---------|
| `.opencode/agents/release-manager.md` | New agent: branch/PR/release/tag management |
| `.opencode/agents/orchestrator.md` | Updated: delegates all git ops to @release-manager |
| `.opencode/agents/frontend-dev.md` | Updated: pushes feature branches to GitHub |
| `AGENTS.md` | Updated: PR-only merge policy, @release-manager authority |
| `README.md` | Updated: agent table, GitHub token setup, PR-only policy |
| `opencode.json` | Updated: registered release-manager agent |
| `.gitignore` | Added: `.opencode/secrets/` for token storage |

## Releases Created

| Version | PRs | Tag | GitHub Release |
|---------|-----|-----|----------------|
| v1.1.0 | #2, #3, #4, #5 | v1.1.0 | Not created (feature not yet implemented) |
| v1.2.0 | #6, #7, #8 | v1.2.0 | [Created](https://github.com/KiKDraS/opencode-landing-page-template/releases/tag/v1.2.0) |

## Setup

Zero-config if `git push` works. Optional: add token to `.opencode/secrets/github-token` or export `GITHUB_TOKEN`. Install `gh` CLI for cleaner commands (optional).