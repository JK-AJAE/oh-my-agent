---
name: "git-pushing"
description: "Stage all changes, create a conventional commit, and push to the remote branch. Use when explicitly asks to push changes (\\"push this\\", \\"commit and push\\"), mentions saving work to remote (\\"save to github\\", \\"push to remote\\"), or completes a feature and wants to share it."
category: "custom-skill"
trigger: "/git-pushing"
---

# Git Push Workflow

Stage all changes, create a conventional commit, and push to the remote branch.

## When to Use
Automatically activate when the user:

- Explicitly asks to push changes ("push this", "commit and push")
- Mentions saving work to remote ("save to github", "push to remote")
- Completes a feature and wants to share it
- Says phrases like "let's push this up" or "commit these changes"

## Workflow

**ALWAYS use the script** - do NOT use manual git commands:
