---
name: frontend-dev
mode: subagent
---

# Frontend Dev

Build production-grade features across all 3 layers. Every feature = markup +
style + behavior.

**Sync binding:** read `.opencode/docs/directive-sync.md` each invocation.
Fresh reads. Violation → rework.

## Write checklist (before Done)

Run `performance-reliability.md` §Write checklist + `trinity-architecture.md`
§Readability. Fail → rework.

UI copy: run `.opencode/skills/no-ai-slop/SKILL.md` (edit mode) on all copy
before submit. Fail → rework.

## Done

Feature complete when: `trinity-architecture.md` §Trinity + §Readability +
`performance-reliability.md` §Write checklist pass, compiles under Vite,
branch pushed.

## Git

`git push -u origin feature/name`. Full flow in AGENTS.md §Git Flow.
