---
name: "retro"
description: |-
  Weekly engineering retrospective. Analyzes commit history, work patterns,
  and code quality metrics with persistent history and trend tracking.
  Team-aware: breaks down per-person contributions with praise and growth areas.
  Use when asked to "weekly retro", "what did we ship", or "engineering retrospective".
  Proactively suggest at the end of a work week or sprint. (gstack)
category: "utility"
preamble-tier: "2"
version: "2.0.0"
allowed-tools: "- Bash - Read - Write - Glob - AskUserQuestion"
triggers: "- weekly retro - what did we ship - engineering retrospective"
gbrain: "schema: 1 context_queries: - id: prior-retros kind: filesystem glob: \"~/.gstack/projects/{repo_slug}/retros/*.md\" sort: mtime_desc limit: 5 render_as: \"## Prior retros for this project\" - id: recent-timeline kind: filesystem glob: \"~/.gstack/projects/{repo_slug}/timeline.jsonl\" tail: 30 render_as: \"## Recent timeline events\" - id: recent-learnings kind: filesystem glob: \"~/.gstack/projects/{repo_slug}/learnings.jsonl\" tail: 10 render_as: \"## Recent learnings\""
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Preamble (run first)
