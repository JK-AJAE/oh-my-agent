---
name: "create-branch"
description: "Create a git branch following Sentry naming conventions. Use when asked to \"create a branch\", \"new branch\", \"start a branch\", \"make a branch\", \"switch to a new branch\", or when starting new work on the default branch."
category: "custom-skill"
trigger: "/create-branch"
---

# Create Branch

Create a git branch with the correct type prefix and a descriptive name following Sentry conventions.

## When to Use
- You need to create a new git branch that follows the repository's naming convention.
- You are starting a new piece of work from the default branch and need help classifying it as `feat`, `fix`, `docs`, or another branch type.
- You want the branch name proposed from either the task description or the current local diff.

## Step 1: Get the Username Prefix

Run `gh api user --jq .login` to get the GitHub username.

If the command fails (e.g. not authenticated), ask the user for their preferred prefix.

## Step 2: Determine the Branch Description

**If `$ARGUMENTS` is provided**, use it as the description of the work.

**If no arguments**, check for local changes:
