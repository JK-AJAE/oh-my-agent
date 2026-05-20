---
name: "investigate"
description: |-
  Systematic debugging with root cause investigation. Four phases: investigate,
  analyze, hypothesize, implement. Iron Law: no fixes without root cause.
  Use when asked to "debug this", "fix this bug", "why is this broken",
  "investigate this error", or "root cause analysis".
  Proactively invoke this skill (do NOT debug directly) when the user reports
  errors, 500 errors, stack traces, unexpected behavior, "it was working
  yesterday", or is troubleshooting why something stopped working. (gstack)
category: "utility"
preamble-tier: "2"
version: "1.0.0"
allowed-tools: "- Bash - Read - Write - Edit - Grep - Glob - AskUserQuestion - WebSearch"
triggers: "- debug this - fix this bug - why is this broken - root cause analysis - investigate this error"
hooks: "PreToolUse: - matcher: \"Edit\" hooks: - type: command command: \"bash ${CLAUDE_SKILL_DIR}/../freeze/bin/check-freeze.sh\" statusMessage: \"Checking debug scope boundary...\" - matcher: \"Write\" hooks: - type: command command: \"bash ${CLAUDE_SKILL_DIR}/../freeze/bin/check-freeze.sh\" statusMessage: \"Checking debug scope boundary...\""
gbrain: "schema: 1 context_queries: - id: prior-investigations kind: list filter: type: timeline tags_contains: \"repo:{repo_slug}\" content_contains: \"investigate\" sort: updated_at_desc limit: 5 render_as: \"## Prior investigations in this repo\" - id: project-learnings kind: filesystem glob: \"~/.gstack/projects/{repo_slug}/learnings.jsonl\" tail: 10 render_as: \"## Recent learnings (patterns + pitfalls)\" - id: recent-eureka kind: filesystem glob: \"~/.gstack/analytics/eureka.jsonl\" tail: 5 render_as: \"## Recent eureka moments (cross-project)\""
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Preamble (run first)
