# Release Manager Agent Implementation

**Date:** 2026-01-XX  
**Releases:** v1.1.0, v1.2.0  
**Status:** Complete and Tested

## Overview

This session implemented a comprehensive release management system centered around a new `@release-manager` subagent. The system enforces PR-only merges, provides hybrid GitHub authentication, automates version management, and creates proper GitHub Releases.

## What Was Implemented

### 1. Release Manager Agent

Created `.opencode/agents/release-manager.md` with the following responsibilities:

- **Branch Management:** Create, push, and delete branches (local + remote sync)
- **PR Operations:** Create and merge Pull Requests for all branch types
- **Version Management:** Fetch tags, determine next version, update package.json
- **Release Creation:** Tag releases and create GitHub Releases with notes
- **Hotfix Coordination:** Handle urgent fixes with proper back-merging

### 2. PR-Only Merge Policy

Enforced that ALL merges use Pull Requests (no direct `git merge` to main/develop):

- `feature/*` → `develop`
- `release/*` → `main` and back-merge to `develop`
- `hotfix/*` → `main` and back-merge to `develop`

**Protected branches:** `main` and `develop` are never deleted. Only temporary branches (`feature/*`, `release/*`, `hotfix/*`, and their `-backmerge` variants) are cleaned up after merge.

### 3. Hybrid GitHub Authentication

Implemented a fallback system for GitHub operations:

**Primary:** `gh` CLI (GitHub's official command-line tool)
- Cleaner commands: `gh pr create`, `gh pr merge`, `gh release create`
- Requires installation: `brew install gh` (macOS), `apt install gh` (Linux)

**Fallback:** `curl` + GitHub REST API
- Works without `gh` installed
- Uses standard HTTP requests with Bearer token authentication
- Covers all operations: PR creation, merging, release creation

### 4. Token Resolution

Three-tier authentication system (priority order):

1. **`.opencode/secrets/github-token`** - Explicit secret file (recommended)
   ```bash
   echo "ghp_xxxxxxxxxxxx" > .opencode/secrets/github-token
   ```

2. **Git credential helper** - Zero config (works if `git push` works)
   - Automatically retrieves stored credentials
   - No additional setup required

3. **`GITHUB_TOKEN` environment variable** - Shell profile export
   ```bash
   export GITHUB_TOKEN="ghp_xxxxxxxxxxxx"
   ```

### 5. Version Management Workflow

Automated semantic versioning:

1. **Fetch existing tags:** `git fetch --tags && git tag --list "v*" --sort=-v:refname | head -1`
2. **Determine next version:** Based on changes (MAJOR.MINOR.PATCH)
   - Breaking changes → MAJOR bump (v2.0.0)
   - New features → MINOR bump (v1.1.0)
   - Bug fixes → PATCH bump (v1.0.1)
3. **Update package.json:** Version field matches the new version
4. **Create tag after merge:** Tag version matches package.json

### 6. GitHub Release Creation

After tagging, the release-manager creates a proper GitHub Release (not just a tag):

- **gh path:** `gh release create vX.X.X --title "..." --notes "..."`
- **curl path:** `POST /repos/{owner}/{repo}/releases` with release notes
- Applied to both `release/*` and `hotfix/*` workflows
- Releases appear on GitHub's Releases page with downloadable source code

### 7. Mandatory PR Template

All PRs created by the release-manager follow this structure:

```markdown
## What Changed
[Brief summary of changes]

## Why It Changed
[Motivation and problem solved]

## How to Use It
[Setup instructions if applicable]
```

**Rules:**
- No testing checklists (those belong in code review)
- No boilerplate sections
- Keep it concise
- Include file list if multiple files modified

## Files Modified

### New Files
- `.opencode/agents/release-manager.md` - Complete release manager agent with PR workflows for all branch types

### Modified Files
- `.opencode/agents/orchestrator.md` - Delegates all git operations to @release-manager
- `.opencode/agents/frontend-dev.md` - Pushes feature branches to GitHub after completion
- `AGENTS.md` - Updated agent protocol with PR-only merge policy and @release-manager authority
- `README.md` - Added release-manager to agent table, GitHub Token setup section, PR-only policy docs
- `opencode.json` - Registered release-manager agent with appropriate tools
- `.gitignore` - Added `.opencode/secrets/` for secure token storage

## Workflow Examples

### Feature Branch Workflow

1. `@frontend-dev` builds feature on `feature/*` branch
2. `@frontend-dev` pushes branch to GitHub
3. `@orchestrator` invokes `@release-manager` to create PR to `develop`
4. `@orchestrator` presents PR URL to user for approval
5. User approves → `@release-manager` merges PR and deletes feature branch

### Release Workflow

1. Create `release/*` branch from `develop`
2. Fetch existing tags and determine next version
3. Update `package.json` version
4. Create PR: `release/*` → `main`
5. After merge: tag as `vX.X.X`
6. **Create GitHub Release** with release notes
7. Back-merge PR: `release/*` → `develop`
8. Delete release branch (local + remote)

### Hotfix Workflow

1. Create `hotfix/*` branch from `main`
2. Apply fix and commit
3. Create PR: `hotfix/*` → `main`
4. After merge: tag as `vX.X.X`
5. **Create GitHub Release** with hotfix description
6. Back-merge PR: `hotfix/*` → `develop`
7. Delete hotfix branch (local + remote)

## Releases Created

### v1.1.0
- **PR #2:** Added release-manager agent with PR-only merge policy
- **PR #3:** Added version management workflow
- **PR #4:** Release merge to main
- **PR #5:** Back-merge to develop
- **Tag:** v1.1.0
- **GitHub Release:** Not created (feature not yet implemented)

### v1.2.0
- **PR #6:** Added GitHub Release creation after tagging
- **PR #7:** Release merge to main
- **PR #8:** Back-merge to develop
- **Tag:** v1.2.0
- **GitHub Release:** https://github.com/KiKDraS/opencode-landing-page-template/releases/tag/v1.2.0

## Benefits

1. **Documentation Trail:** Every merge is documented via PRs with clear descriptions
2. **Template Portability:** Hybrid authentication works on any system (with or without `gh` CLI)
3. **Version Consistency:** Automatic version management prevents mismatches between package.json and tags
4. **Protected Branches:** `main` and `develop` are never deleted, only temporary branches
5. **Visible Releases:** GitHub Releases appear on the Releases page with proper notes
6. **Consistent Workflow:** All merges follow the same PR-based pattern

## Setup Instructions

### For New Developers

**Zero config (most users):**
If you can `git push` to GitHub, the agent uses your existing credentials automatically.

**Explicit token:**
Create a [GitHub personal access token](https://github.com/settings/tokens) with `repo` scope:
```bash
echo "<your-token>" > .opencode/secrets/github-token
```

**Environment variable:**
Add to your shell profile:
```bash
export GITHUB_TOKEN="ghp_xxxxxxxxxxxx"
```

### Optional: Install gh CLI

The `gh` CLI is optional. If installed, the agent uses it for cleaner commands. If not, it falls back to `curl` + GitHub REST API.

**macOS:**
```bash
brew install gh
```

**Linux:**
```bash
# Debian/Ubuntu
sudo apt install gh

# Fedora
sudo dnf install gh
```

**Windows:**
```bash
winget install GitHub.cli
```

## Testing

The workflow was tested with two releases:

1. **v1.1.0** - Tested PR-only merge policy and version management
2. **v1.2.0** - Tested GitHub Release creation (visible at https://github.com/KiKDraS/opencode-landing-page-template/releases/tag/v1.2.0)

Both releases successfully:
- Created PRs with proper documentation
- Merged to main with user approval
- Created tags
- Back-merged to develop
- Deleted temporary branches

## Future Enhancements

Potential improvements for future iterations:

- **Automated changelog generation:** Parse PR descriptions to build CHANGELOG.md
- **Release notes from docs:** Read `./docs/*.md` logs to synthesize release notes
- **Pre-release validation:** Run `npm run build` and tests before creating release PR
- **Hotfix templates:** Standardized hotfix PR template with impact assessment
- **Release candidates:** Support for `vX.X.X-rc.X` pre-release versions

## Conclusion

The release-manager agent successfully automates the entire release lifecycle while enforcing best practices:

- PR-only merges for documentation
- Hybrid authentication for portability
- Semantic versioning for consistency
- GitHub Releases for visibility
- Protected branches for safety

The system is production-ready and has been validated with two successful releases.
