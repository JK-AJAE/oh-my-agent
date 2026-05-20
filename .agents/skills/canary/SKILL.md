---
name: "canary"
description: |-
  Post-deploy canary monitoring. Watches the live app for console errors,
  performance regressions, and page failures using the browse daemon. Takes
  periodic screenshots, compares against pre-deploy baselines, and alerts
  on anomalies. Use when: "monitor deploy", "canary", "post-deploy check",
  "watch production", "verify deploy". (gstack)
category: "utility"
preamble-tier: "2"
version: "1.0.0"
allowed-tools: "- Bash - Read - Write - Glob - AskUserQuestion"
triggers: "- monitor after deploy - canary check - watch for errors post-deploy"
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Preamble (run first)
