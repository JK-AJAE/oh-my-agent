---
name: "land-and-deploy"
description: |-
  Land and deploy workflow. Merges the PR, waits for CI and deploy,
  verifies production health via canary checks. Takes over after /ship
  creates the PR. Use when: "merge", "land", "deploy", "merge and verify",
  "land it", "ship it to production". (gstack)
category: "utility"
preamble-tier: "4"
version: "1.0.0"
allowed-tools: "- Bash - Read - Write - Glob - AskUserQuestion"
triggers: "- merge and deploy - land the pr - ship to production"
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Preamble (run first)
