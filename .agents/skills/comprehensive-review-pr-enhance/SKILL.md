---
name: "comprehensive-review-pr-enhance"
description: ">"
category: "custom-skill"
trigger: "/comprehensive-review-pr-enhance"
---

# Pull Request Enhancement

## When to Use
- You need to turn a git diff into a reviewer-friendly pull request description.
- You want a PR summary with change categories, risks, testing notes, and a checklist.
- The diff is large enough that reviewers need explicit structure instead of a short ad hoc summary.

## Workflow

1. Run `git diff <base>...HEAD --stat` to identify changed files and scope
2. Categorise changes: source, test, config, docs, build, styles
3. Generate the PR description using the template below
4. Add a review checklist based on which file categories changed
5. Flag breaking changes, security-sensitive files, or large diffs (>500 lines)

## PR Description Template
