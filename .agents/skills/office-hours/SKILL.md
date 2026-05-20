---
name: "office-hours"
description: |-
  YC Office Hours — two modes. Startup mode: six forcing questions that expose
  demand reality, status quo, desperate specificity, narrowest wedge, observation,
  and future-fit. Builder mode: design thinking brainstorming for side projects,
  hackathons, learning, and open source. Saves a design doc.
  Use when asked to "brainstorm this", "I have an idea", "help me think through
  this", "office hours", or "is this worth building".
  Proactively invoke this skill (do NOT answer directly) when the user describes
  a new product idea, asks whether something is worth building, wants to think
  through design decisions for something that doesn't exist yet, or is exploring
  a concept before any code is written.
  Use before /plan-ceo-review or /plan-eng-review. (gstack)
category: "utility"
preamble-tier: "3"
version: "2.0.0"
allowed-tools: "- Bash - Read - Grep - Glob - Write - Edit - AskUserQuestion - WebSearch"
triggers: "- brainstorm this - is this worth building - help me think through - office hours"
gbrain: "schema: 1 context_queries: - id: prior-sessions kind: list filter: type: ceo-plan tags_contains: \"repo:{repo_slug}\" sort: updated_at_desc limit: 5 render_as: \"## Prior office-hours sessions in this repo\" - id: builder-profile kind: filesystem glob: \"~/.gstack/builder-profile.jsonl\" tail: 1 render_as: \"## Your builder profile snapshot\" - id: design-doc-history kind: filesystem glob: \"~/.gstack/projects/{repo_slug}/*-design-*.md\" sort: mtime_desc limit: 3 render_as: \"## Recent design docs for this project\" - id: prior-eureka kind: filesystem glob: \"~/.gstack/analytics/eureka.jsonl\" tail: 5 render_as: \"## Recent eureka moments\""
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Preamble (run first)
