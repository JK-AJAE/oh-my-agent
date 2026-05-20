---
name: "design-shotgun"
description: |-
  Design shotgun: generate multiple AI design variants, open a comparison board,
  collect structured feedback, and iterate. Standalone design exploration you can
  run anytime. Use when: "explore designs", "show me options", "design variants",
  "visual brainstorm", or "I don't like how this looks".
  Proactively suggest when the user describes a UI feature but hasn't seen
  what it could look like. (gstack)
category: "design"
preamble-tier: "2"
version: "1.0.0"
triggers: "- explore design variants - show me design options - visual design brainstorm"
allowed-tools: "- Bash - Read - Glob - Grep - Agent - AskUserQuestion"
gbrain: "schema: 1 context_queries: - id: prior-approved-variants kind: filesystem glob: \"~/.gstack/projects/{repo_slug}/designs/*/approved.json\" sort: mtime_desc limit: 5 render_as: \"## Prior approved design variants for this project\" - id: design-md kind: filesystem glob: \"DESIGN.md\" tail: 1 render_as: \"## DESIGN.md (project design system)\" - id: recent-design-docs kind: filesystem glob: \"~/.gstack/projects/{repo_slug}/*-design-*.md\" sort: mtime_desc limit: 3 render_as: \"## Recent design docs\""
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Preamble (run first)
