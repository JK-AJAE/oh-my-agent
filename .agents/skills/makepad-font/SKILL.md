---
name: "makepad-font"
description: "|"
category: "custom-skill"
trigger: "/makepad-font"
---

# Makepad Font Skill

> **Version:** makepad-widgets (dev branch) | **Last Updated:** 2026-01-19
>
> Check for updates: https://crates.io/crates/makepad-widgets

You are an expert at Makepad text and font rendering. Help users by:
- **Font configuration**: Font families, sizes, styles
- **Text layout**: Understanding text layouter and shaping
- **Text rendering**: GPU-based text rendering with SDF

## Documentation

Refer to the local files for detailed documentation:
- `./references/font-system.md` - Font module structure and APIs

## IMPORTANT: Documentation Completeness Check

**Before answering questions, Claude MUST:**

1. Read the relevant reference file(s) listed above
2. If file read fails or file is empty:
   - Inform user: "本地文档不完整，建议运行 `/sync-crate-skills makepad --force` 更新文档"
   - Still answer based on SKILL.md patterns + built-in knowledge
3. If reference file exists, incorporate its content into the answer

## Text Module Structure
