---
name: "review"
description: |-
  Pre-landing PR review. Analyzes diff against the base branch for SQL safety, LLM trust
  boundary violations, conditional side effects, and other structural issues. Use when
  asked to "review this PR", "code review", "pre-landing review", or "check my diff".
  Proactively suggest when the user is about to merge or land code changes. (gstack)
category: "utility"
preamble-tier: "4"
version: "1.0.0"
allowed-tools: "- Bash - Read - Edit - Write - Grep - Glob - Agent - AskUserQuestion - WebSearch"
triggers: "- review this pr - code review - check my diff - pre-landing review"
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Preamble (run first)
