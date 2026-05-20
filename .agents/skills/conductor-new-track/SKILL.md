---
name: "conductor-new-track"
description: "Create a new track with specification and phased implementation plan"
category: "custom-skill"
trigger: "/conductor-new-track"
---

# New Track

Create a new track (feature, bug fix, chore, or refactor) with a detailed specification and phased implementation plan.

## Use this skill when

- Working on new track tasks or workflows
- Needing guidance, best practices, or checklists for new track

## Do not use this skill when

- The task is unrelated to new track
- You need a different domain or tool outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.
- If detailed examples are required, open `resources/implementation-playbook.md`.

## Pre-flight Checks

1. Verify Conductor is initialized:
   - Check `conductor/product.md` exists
   - Check `conductor/tech-stack.md` exists
   - Check `conductor/workflow.md` exists
   - If missing: Display error and suggest running `/conductor:setup` first

2. Load context files:
   - Read `conductor/product.md` for product context
   - Read `conductor/tech-stack.md` for technical context
   - Read `conductor/workflow.md` for TDD/commit preferences

## Track Classification

Determine track type based on description or ask user:
