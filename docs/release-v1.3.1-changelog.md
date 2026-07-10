# Release v1.3.1 Changelog

**Release Date:** 2026-07-10

## What's Changed

### DESIGN.md Contract Mechanism
- Introduced `DESIGN.md.template` as the standard design thinking template
- Added orchestrator workflow for generating project-specific design contracts
- Enhanced project documentation with structured design thinking process

### Orchestrator Planning Constraint
- Implemented absolute approval gate for orchestrator planning decisions
- Ensured orchestrator cannot bypass user approval for critical operations
- Added mandatory user checkpoint for release and merge operations

### Release Documentation Gate
- Added new step 3 in release sequence for generating release changelogs
- Enhanced release process with comprehensive documentation requirements
- Improved stakeholder visibility into release changes

## Files Changed
- `DESIGN.md.template` - New design thinking template
- `AGENTS.md` - Updated orchestrator workflow and approval gates
- `docs/release-v1.3.1-changelog.md` - This changelog document

## Breaking Changes
- None

## Known Issues
- None

## Upgrade Instructions
- This is a patch release with no breaking changes
- Update to v1.3.1 by pulling from the main branch
