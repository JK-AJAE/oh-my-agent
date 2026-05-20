---
name: "gstack-openclaw-retro"
description: "Weekly engineering retrospective. Analyzes commit history, work patterns, and code quality metrics with persistent history and trend tracking. Team-aware with per-person contributions, praise, and growth areas. Use when asked for weekly retro, what shipped this week, or engineering retrospective."
category: "utility"
---

# Weekly Engineering Retrospective

Generates a comprehensive engineering retrospective analyzing commit history, work patterns, and code quality metrics. Team-aware: identifies the user running the command, then analyzes every contributor with per-person praise and growth opportunities.

## Arguments

- Default: last 7 days
- `24h`: last 24 hours
- `14d`: last 14 days
- `30d`: last 30 days
- `compare`: compare current window vs prior same-length window

## Instructions

Parse the argument to determine the time window. Default to 7 days. All times should be reported in the user's **local timezone**.

**Midnight-aligned windows:** For day units, compute an absolute start date at local midnight. For example, if today is 2026-03-18 and the window is 7 days, the start date is 2026-03-11. Use `--since="2026-03-11T00:00:00"` for git log queries. For hour units, use `--since="N hours ago"`.

---

### Step 1: Gather Raw Data

First, fetch origin and identify the current user:
