---
name: "gh-review-requests"
description: "Fetch unread GitHub notifications for open PRs where review is requested from a specified team or opened by a team member. Use when asked to \"find PRs I need to review\", \"show my review requests\", \"what needs my review\", \"fetch GitHub review requests\", or \"check team review queue\"."
category: "custom-skill"
trigger: "/gh-review-requests"
---

# GitHub Review Requests

Fetch unread `review_requested` notifications for open (unmerged) PRs, filtered by a GitHub team.

**Requires**: GitHub CLI (`gh`) authenticated.

## When to Use
- You need to find unread GitHub PR review requests for a specific team.
- You want to check which open PRs currently need your review or a teammate's review.
- You need a filtered review queue instead of manually browsing GitHub notifications.

## Step 1: Identify the Team

If the user has not specified a team, ask:

> Which GitHub team should I filter by? (e.g. `streaming-platform`)

Accept either a team slug (`streaming-platform`) or a display name ("Streaming Platform") — convert to lowercase-hyphenated slug before passing to the script.

## Step 2: Run the Script
