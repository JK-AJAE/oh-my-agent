---
name: "sync-gbrain"
description: |-
  Keep gbrain current with this repo's code and refresh agent search
  guidance in CLAUDE.md. Wraps the gstack-gbrain-sync orchestrator with
  state probing, native code-surface registration, capability checks,
  and a verdict block. Re-runnable, idempotent. Use when: "sync gbrain",
  "refresh gbrain", "re-index this repo", "gbrain search isn't finding
  things". (gstack)
category: "utility"
preamble-tier: "2"
version: "1.0.0"
triggers: "- sync gbrain - refresh gbrain - reindex repo - update gbrain"
allowed-tools: "- Bash - Read - Write - Edit - Glob - Grep - AskUserQuestion"
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Preamble (run first)
