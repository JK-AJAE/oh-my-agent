---
name: "git-hooks-automation"
description: "Master Git hooks setup with Husky, lint-staged, pre-commit framework, and commitlint. Automate code quality gates, formatting, linting, and commit message enforcement before code reaches CI."
category: "custom-skill"
trigger: "/git-hooks-automation"
---

# Git Hooks Automation

Automate code quality enforcement at the Git level. Set up hooks that lint, format, test, and validate before commits and pushes ever reach your CI pipeline — catching issues in seconds instead of minutes.

## When to Use This Skill

- User asks to "set up git hooks" or "add pre-commit hooks"
- Configuring Husky, lint-staged, or the pre-commit framework
- Enforcing commit message conventions (Conventional Commits, commitlint)
- Automating linting, formatting, or type-checking before commits
- Setting up pre-push hooks for test runners
- Migrating from Husky v4 to v9+ or adopting hooks from scratch
- User mentions "pre-commit", "commit-msg", "pre-push", "lint-staged", or "githooks"

## Git Hooks Fundamentals

Git hooks are scripts that run automatically at specific points in the Git workflow. They live in `.git/hooks/` and are not version-controlled by default — which is why tools like Husky exist.

### Hook Types & When They Fire

| Hook | Fires When | Common Use |
|---|---|---|
| `pre-commit` | Before commit is created | Lint, format, type-check staged files |
| `prepare-commit-msg` | After default msg, before editor | Auto-populate commit templates |
| `commit-msg` | After user writes commit message | Enforce commit message format |
| `post-commit` | After commit is created | Notifications, logging |
| `pre-push` | Before push to remote | Run tests, check branch policies |
| `pre-rebase` | Before rebase starts | Prevent rebase on protected branches |
| `post-merge` | After merge completes | Install deps, run migrations |
| `post-checkout` | After checkout/switch | Install deps, rebuild assets |

### Native Git Hooks (No Framework)
