---
name: "claude-settings-audit"
description: "Analyze a repository to generate recommended Claude Code settings.json permissions. Use when setting up a new project, auditing existing settings, or determining which read-only bash commands to allow. Detects tech stack, build tools, and monorepo structure."
category: "custom-skill"
trigger: "/claude-settings-audit"
---

# Claude Settings Audit

Analyze this repository and generate recommended Claude Code `settings.json` permissions for read-only commands.

## When to Use
- You are setting up or auditing Claude Code `settings.json` permissions for a repository.
- You need to infer a safe read-only allow list from the repo's tech stack, tooling, and monorepo structure.
- You want to review or replace an existing Claude permissions baseline with something evidence-based.

## Phase 1: Detect Tech Stack

Run these commands to detect the repository structure:
