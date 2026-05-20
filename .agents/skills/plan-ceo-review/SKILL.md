---
name: "plan-ceo-review"
description: |-
  CEO/founder-mode plan review. Rethink the problem, find the 10-star product,
  challenge premises, expand scope when it creates a better product. Four modes:
  SCOPE EXPANSION (dream big), SELECTIVE EXPANSION (hold scope + cherry-pick
  expansions), HOLD SCOPE (maximum rigor), SCOPE REDUCTION (strip to essentials).
  Use when asked to "think bigger", "expand scope", "strategy review", "rethink this",
  or "is this ambitious enough".
  Proactively suggest when the user is questioning scope or ambition of a plan,
  or when the plan feels like it could be thinking bigger. (gstack)
category: "utility"
preamble-tier: "3"
interactive: "true"
version: "1.0.0"
benefits-from: "[office-hours]"
allowed-tools: "- Read - Grep - Glob - Bash - AskUserQuestion - WebSearch"
triggers: "- think bigger - expand scope - strategy review - rethink this plan"
gbrain: "schema: 1 context_queries: - id: prior-ceo-plans kind: filesystem glob: \"~/.gstack/projects/{repo_slug}/ceo-plans/*.md\" sort: mtime_desc limit: 5 render_as: \"## Prior CEO plans for this project\" - id: recent-design-docs kind: filesystem glob: \"~/.gstack/projects/{repo_slug}/*-design-*.md\" sort: mtime_desc limit: 3 render_as: \"## Recent design docs for this project\" - id: recent-reviews kind: list filter: type: timeline tags_contains: \"repo:{repo_slug}\" content_contains: \"plan-ceo-review\" sort: updated_at_desc limit: 5 render_as: \"## Recent CEO review activity\""
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Preamble (run first)
