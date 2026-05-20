---
name: "git-advanced-workflows"
description: "Master advanced Git techniques to maintain clean history, collaborate effectively, and recover from any situation with confidence."
category: "custom-skill"
trigger: "/git-advanced-workflows"
---

# Git Advanced Workflows

Master advanced Git techniques to maintain clean history, collaborate effectively, and recover from any situation with confidence.

## Do not use this skill when

- The task is unrelated to git advanced workflows
- You need a different domain or tool outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.
- If detailed examples are required, open `resources/implementation-playbook.md`.

## Use this skill when

- Cleaning up commit history before merging
- Applying specific commits across branches
- Finding commits that introduced bugs
- Working on multiple features simultaneously
- Recovering from Git mistakes or lost commits
- Managing complex branch workflows
- Preparing clean PRs for review
- Synchronizing diverged branches

## Core Concepts

### 1. Interactive Rebase

Interactive rebase is the Swiss Army knife of Git history editing.

**Common Operations:**
- `pick`: Keep commit as-is
- `reword`: Change commit message
- `edit`: Amend commit content
- `squash`: Combine with previous commit
- `fixup`: Like squash but discard message
- `drop`: Remove commit entirely

**Basic Usage:**
