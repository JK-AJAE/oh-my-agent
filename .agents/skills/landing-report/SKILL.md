---
name: "landing-report"
description: |-
  Read-only queue dashboard for workspace-aware ship. Shows which VERSION slots
  are currently claimed by open PRs, which sibling Conductor workspaces have
  WIP work likely to ship soon, and what slot /ship would pick next. No
  mutations — just a snapshot. Use when asked to "landing report", "what's in
  the queue", "show me open PRs", or "which version do I claim next". (gstack)
category: "utility"
version: "0.1.0"
triggers: "- landing report - version queue - ship queue - what version comes next - show open PR versions"
allowed-tools: "- Bash - Read"
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

# /landing-report — Version Queue Dashboard

## Preamble (run first)
