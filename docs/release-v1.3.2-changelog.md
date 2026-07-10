# Release v1.3.2 Changelog

**Release Date:** 2026-07-10

## What's Changed

### GitHub Release Enforcement in Release Workflow
- Marked GitHub Release creation as MANDATORY in release-manager agent
- Updated both `gh` CLI and `curl` API workflows with explicit MANDATORY markers
- Added verification step to confirm GitHub Release exists after tagging

### Orchestrator Verification Step
- Added step 5 in orchestrator workflow to verify GitHub Release exists
- Renumbered existing steps to accommodate new verification gate
- Ensured orchestrator cannot complete release without GitHub Release confirmation

## Files Changed
- `.opencode/agents/release-manager.md` - Enforced MANDATORY GitHub Release creation and added verification steps
- `.opencode/agents/orchestrator.md` - Added verification step 5 to release workflow
- `package.json` - Version bump to 1.3.2
- `docs/release-v1.3.2-changelog.md` - This changelog document

## Breaking Changes
- None

## Known Issues
- None

## Upgrade Instructions
- This is a patch release with no breaking changes
- Update to v1.3.2 by pulling from the main branch
