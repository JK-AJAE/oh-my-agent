---
name: "guard"
description: |-
  Full safety mode: destructive command warnings + directory-scoped edits.
  Combines /careful (warns before rm -rf, DROP TABLE, force-push, etc.) with
  /freeze (blocks edits outside a specified directory). Use for maximum safety
  when touching prod or debugging live systems. Use when asked to "guard mode",
  "full safety", "lock it down", or "maximum safety". (gstack)
category: "utility"
version: "0.1.0"
triggers: "- full safety mode - guard against mistakes - maximum safety"
allowed-tools: "- Bash - Read - AskUserQuestion"
hooks: "PreToolUse: - matcher: \"Bash\" hooks: - type: command command: \"bash ${CLAUDE_SKILL_DIR}/../careful/bin/check-careful.sh\" statusMessage: \"Checking for destructive commands...\" - matcher: \"Edit\" hooks: - type: command command: \"bash ${CLAUDE_SKILL_DIR}/../freeze/bin/check-freeze.sh\" statusMessage: \"Checking freeze boundary...\" - matcher: \"Write\" hooks: - type: command command: \"bash ${CLAUDE_SKILL_DIR}/../freeze/bin/check-freeze.sh\" statusMessage: \"Checking freeze boundary...\""
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

# /guard — Full Safety Mode

Activates both destructive command warnings and directory-scoped edit restrictions.
This is the combination of `/careful` + `/freeze` in a single command.

**Dependency note:** This skill references hook scripts from the sibling `/careful`
and `/freeze` skill directories. Both must be installed (they are installed together
by the gstack setup script).
