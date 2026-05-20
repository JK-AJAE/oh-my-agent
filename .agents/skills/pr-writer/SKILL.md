---
name: "pr-writer"
description: "Create pull requests following Sentry's engineering practices."
category: "custom-skill"
trigger: "/pr-writer"
---

# PR Writer

Create pull requests following Sentry's engineering practices.

**Requires**: GitHub CLI (`gh`) authenticated and available.

## When to Use
- You are ready to open a pull request and need a structured description based on the committed branch diff.
- You want the PR body to capture what changed, why it changed, and any reviewer context.
- You are using GitHub CLI and need a repeatable PR-writing workflow rather than writing the description ad hoc.

## Prerequisites

Before creating a PR, ensure all changes are committed. If there are uncommitted changes, run the `sentry-skills:commit` skill first to commit them properly.
