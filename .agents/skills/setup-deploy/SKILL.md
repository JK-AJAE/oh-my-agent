---
name: "setup-deploy"
description: |-
  Configure deployment settings for /land-and-deploy. Detects your deploy
  platform (Fly.io, Render, Vercel, Netlify, Heroku, GitHub Actions, custom),
  production URL, health check endpoints, and deploy status commands. Writes
  the configuration to CLAUDE.md so all future deploys are automatic.
  Use when: "setup deploy", "configure deployment", "set up land-and-deploy",
  "how do I deploy with gstack", "add deploy config".
category: "utility"
preamble-tier: "2"
version: "1.0.0"
triggers: "- configure deploy - setup deployment - set deploy platform"
allowed-tools: "- Bash - Read - Write - Edit - Glob - Grep - AskUserQuestion"
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Preamble (run first)
