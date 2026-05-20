---
name: "ship"
description: |-
  Ship workflow: detect + merge base branch, run tests, review diff, bump VERSION,
  update CHANGELOG, commit, push, create PR. Use when asked to "ship", "deploy",
  "push to main", "create a PR", "merge and push", or "get it deployed".
  Proactively invoke this skill (do NOT push/PR directly) when the user says code
  is ready, asks about deploying, wants to push code up, or asks to create a PR. (gstack)
category: "utility"
preamble-tier: "4"
version: "1.0.0"
allowed-tools: "- Bash - Read - Write - Edit - Grep - Glob - Agent - AskUserQuestion - WebSearch"
triggers: "- ship it - create a pr - push to main - deploy this"
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Preamble (run first)
