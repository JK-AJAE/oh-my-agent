---
name: "vibers-code-review"
description: "Human review workflow for AI-generated GitHub projects with spec-based feedback, security review, and follow-up PRs from the Vibers service."
category: "custom-skill"
trigger: "/vibers-code-review"
---

# Vibers — Human Code Review for AI-Generated Projects

You push code. We review it against your spec, fix issues, and send a PR.

## When to Use
Use this skill when:

- You want human review for AI-generated code pushed to GitHub
- You have a project spec and want reviewers to check implementation against it
- You want review feedback delivered as a follow-up PR with suggested fixes
- You are comfortable granting the Vibers service collaborator access to the repository

## Quick Start (3 steps)

### Step 1. Add collaborator

Go to your repo → Settings → Collaborators → Add **`marsiandeployer`**

### Step 2. Add GitHub Action

Create `.github/workflows/vibers.yml`:
