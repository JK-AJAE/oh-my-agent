---
name: "create-issue-gate"
description: "Use when starting a new implementation task and an issue must be created with strict acceptance criteria gating before execution."
category: "custom-skill"
trigger: "/create-issue-gate"
---

# Create Issue Gate

## Overview

Create GitHub issues as the single tracking entrypoint for tasks, with a hard gate on acceptance criteria.

Core rule: **no explicit, testable acceptance criteria from user => issue stays `draft` and execution is blocked.**

## When to Use
- You are starting a new implementation task and want a GitHub issue to be the required tracking entrypoint.
- The work must be blocked until the user provides explicit, testable acceptance criteria.
- You need to distinguish between `draft`, `ready`, and `blocked` work before execution begins.

## Required Fields

Every issue must include these sections:
- Problem
- Goal
- Scope
- Non-Goals
- Acceptance Criteria
- Dependencies/Blockers
- Status (`draft` | `ready` | `blocked` | `done`)

## Acceptance Criteria Gate

Acceptance criteria are valid only when they are testable and pass/fail checkable.

Examples:
- valid: "CreateCheckoutLambda-dev returns an openable third-party payment checkout URL"
- invalid: "fix checkout" / "improve UX" / "make it better"

If criteria are missing or non-testable:
- still create the issue
- set `Status: draft`
- add `Execution Gate: blocked (missing valid acceptance criteria)`
- do not move task to execution

## Issue Creation Mode

Default mode is direct GitHub creation using `gh issue create`.

Use a body template like:
