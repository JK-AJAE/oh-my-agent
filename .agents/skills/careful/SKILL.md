---
name: "careful"
description: |-
  Safety guardrails for destructive commands. Warns before rm -rf, DROP TABLE,
  force-push, git reset --hard, kubectl delete, and similar destructive operations.
  User can override each warning. Use when touching prod, debugging live systems,
  or working in a shared environment. Use when asked to "be careful", "safety mode",
  "prod mode", or "careful mode". (gstack)
category: "utility"
version: "0.1.0"
triggers: "- be careful - warn before destructive - safety mode"
allowed-tools: "- Bash - Read"
hooks: "PreToolUse: - matcher: \"Bash\" hooks: - type: command command: \"bash ${CLAUDE_SKILL_DIR}/bin/check-careful.sh\" statusMessage: \"Checking for destructive commands...\""
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

# /careful — Destructive Command Guardrails

Safety mode is now **active**. Every bash command will be checked for destructive
patterns before running. If a destructive command is detected, you'll be warned
and can choose to proceed or cancel.
