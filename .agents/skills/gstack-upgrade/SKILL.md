---
name: "gstack-upgrade"
description: |-
  Upgrade gstack to the latest version. Detects global vs vendored install,
  runs the upgrade, and shows what's new. Use when asked to "upgrade gstack",
  "update gstack", or "get latest version".
  Voice triggers (speech-to-text aliases): "upgrade the tools", "update the tools", "gee stack upgrade", "g stack upgrade".
category: "utility"
version: "1.1.0"
triggers: "- upgrade gstack - update gstack version - get latest gstack"
allowed-tools: "- Bash - Read - Write - AskUserQuestion"
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

# /gstack-upgrade

Upgrade gstack to the latest version and show what's new.

## Inline upgrade flow

This section is referenced by all skill preambles when they detect `UPGRADE_AVAILABLE`.

### Step 1: Ask the user (or auto-upgrade)

First, check if auto-upgrade is enabled:
