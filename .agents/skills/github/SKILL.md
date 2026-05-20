---
name: "github"
description: "Use the `gh` CLI for issues, pull requests, Actions runs, and GitHub API queries."
category: "custom-skill"
trigger: "/github"
---

# GitHub Skill

Use the `gh` CLI to interact with GitHub. Always specify `--repo owner/repo` when not in a git directory, or use URLs directly.

## When to Use
- When the user asks about GitHub issues, pull requests, workflow runs, or CI failures.
- When you need `gh issue`, `gh pr`, `gh run`, or `gh api` from the command line.

## Pull Requests

Check CI status on a PR:
