---
name: "commit"
description: "ALWAYS use this skill when committing code changes — never commit directly without it. Creates commits following Sentry conventions with proper conventional commit format and issue references. Trigger on any commit, git commit, save changes, or commit message task."
category: "custom-skill"
trigger: "/commit"
---

# Sentry Commit Messages

Follow these conventions when creating commits for Sentry projects.

## When to Use
- The user asks to commit code, prepare a commit message, or save changes in git.
- You need Sentry-style commit formatting with conventional commit structure and issue references.
- The task requires enforcing branch safety before committing, especially avoiding direct commits on `main` or `master`.

## Prerequisites

Before committing, always check the current branch:
