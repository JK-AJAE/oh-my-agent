---
name: "planning-with-files"
description: "Work like Manus: Use persistent markdown files as your \\"working memory on disk.\"
category: "custom-skill"
trigger: "/planning-with-files"
---

# Planning with Files

Work like Manus: Use persistent markdown files as your "working memory on disk."

## Important: Where Files Go

When using this skill:

- **Templates** are stored in the skill directory at `${CLAUDE_PLUGIN_ROOT}/templates/`
- **Your planning files** (`task_plan.md`, `findings.md`, `progress.md`) should be created in **your project directory** — the folder where you're working

| Location | What Goes There |
|----------|-----------------|
| Skill directory (`${CLAUDE_PLUGIN_ROOT}/`) | Templates, scripts, reference docs |
| Your project directory | `task_plan.md`, `findings.md`, `progress.md` |

This ensures your planning files live alongside your code, not buried in the skill installation folder.

## Quick Start

Before ANY complex task:

1. **Create `task_plan.md`** in your project — Use [templates/task_plan.md](templates/task_plan.md) as reference
2. **Create `findings.md`** in your project — Use [templates/findings.md](templates/findings.md) as reference
3. **Create `progress.md`** in your project — Use [templates/progress.md](templates/progress.md) as reference
4. **Re-read plan before decisions** — Refreshes goals in attention window
5. **Update after each phase** — Mark complete, log errors

> **Note:** All three planning files should be created in your current working directory (your project root), not in the skill's installation folder.

## The Core Pattern
