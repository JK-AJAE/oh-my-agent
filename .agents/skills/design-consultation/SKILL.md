---
name: "design-consultation"
description: |-
  Design consultation: understands your product, researches the landscape, proposes a
  complete design system (aesthetic, typography, color, layout, spacing, motion), and
  generates font+color preview pages. Creates DESIGN.md as your project's design source
  of truth. For existing sites, use /plan-design-review to infer the system instead.
  Use when asked to "design system", "brand guidelines", or "create DESIGN.md".
  Proactively suggest when starting a new project's UI with no existing
  design system or DESIGN.md. (gstack)
category: "design"
preamble-tier: "3"
version: "1.0.0"
allowed-tools: "- Bash - Read - Write - Edit - Glob - Grep - AskUserQuestion - WebSearch"
triggers: "- design system - create a brand - design from scratch"
gbrain: "schema: 1 context_queries: - id: existing-design-md kind: filesystem glob: \"DESIGN.md\" tail: 1 render_as: \"## Existing DESIGN.md (if any)\" - id: prior-design-decisions kind: filesystem glob: \"~/.gstack/projects/{repo_slug}/*-design-*.md\" sort: mtime_desc limit: 3 render_as: \"## Prior design decisions for this project\" - id: brand-guidelines kind: list filter: type: ceo-plan tags_contains: \"repo:{repo_slug}\" content_contains: \"brand\" sort: updated_at_desc limit: 3 render_as: \"## Brand-related notes from CEO plans\""
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Preamble (run first)
