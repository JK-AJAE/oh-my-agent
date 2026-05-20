---
name: "scrape"
description: |-
  Pull data from a web page. First call on a new intent prototypes the flow
  via $B primitives and returns JSON. Subsequent calls on a matching intent
  route to a codified browser-skill and return in ~200ms. Read-only — for
  mutating flows (form fills, clicks, submissions), use /automate.
  Use when asked to "scrape", "get data from", "pull", "extract from", or
  "what's on" a page. (gstack)
category: "utility"
version: "1.0.0"
allowed-tools: "- Bash - Read - AskUserQuestion"
triggers: "- scrape this page - get data from - pull from - extract from - what is on"
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Preamble (run first)
