---
name: "setup-browser-cookies"
description: |-
  Import cookies from your real Chromium browser into the headless browse session.
  Opens an interactive picker UI where you select which cookie domains to import.
  Use before QA testing authenticated pages. Use when asked to "import cookies",
  "login to the site", or "authenticate the browser". (gstack)
category: "utility"
preamble-tier: "1"
version: "1.0.0"
triggers: "- import browser cookies - login to test site - setup authenticated session"
allowed-tools: "- Bash - Read - AskUserQuestion"
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Preamble (run first)
