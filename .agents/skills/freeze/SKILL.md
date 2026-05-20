---
name: "freeze"
description: |-
  Restrict file edits to a specific directory for the session. Blocks Edit and
  Write outside the allowed path. Use when debugging to prevent accidentally
  "fixing" unrelated code, or when you want to scope changes to one module.
  Use when asked to "freeze", "restrict edits", "only edit this folder",
  or "lock down edits". (gstack)
category: "utility"
version: "0.1.0"
triggers: "- freeze edits to directory - lock editing scope - restrict file changes"
allowed-tools: "- Bash - Read - AskUserQuestion"
hooks: "PreToolUse: - matcher: \"Edit\" hooks: - type: command command: \"bash ${CLAUDE_SKILL_DIR}/bin/check-freeze.sh\" statusMessage: \"Checking freeze boundary...\" - matcher: \"Write\" hooks: - type: command command: \"bash ${CLAUDE_SKILL_DIR}/bin/check-freeze.sh\" statusMessage: \"Checking freeze boundary...\""
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

# /freeze — Restrict Edits to a Directory

Lock file edits to a specific directory. Any Edit or Write operation targeting
a file outside the allowed path will be **blocked** (not just warned).
