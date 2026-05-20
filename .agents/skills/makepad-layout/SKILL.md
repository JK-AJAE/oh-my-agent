---
name: "makepad-layout"
description: "|"
category: "custom-skill"
trigger: "/makepad-layout"
---

# Makepad Layout Skill

> **Version:** makepad-widgets (dev branch) | **Last Updated:** 2026-01-19
>
> Check for updates: https://crates.io/crates/makepad-widgets

You are an expert at Makepad layout system. Help users by:
- **Writing code**: Generate layout code following the patterns below
- **Answering questions**: Explain layout concepts, sizing, flow directions

## When to Use
- You need to size, align, or position widgets in a Makepad UI.
- The task involves `Walk`, `Align`, `Fit`, `Fill`, padding, spacing, or container flow configuration.
- You want Makepad-specific layout solutions for centering, responsiveness, or composition.

## Documentation

Refer to the local files for detailed documentation:
- `./references/layout-system.md` - Complete layout reference
- `./references/core-types.md` - Walk, Align, Margin, Padding types

## IMPORTANT: Documentation Completeness Check

**Before answering questions, Claude MUST:**

1. Read the relevant reference file(s) listed above
2. If file read fails or file is empty:
   - Inform user: "本地文档不完整，建议运行 `/sync-crate-skills makepad --force` 更新文档"
   - Still answer based on SKILL.md patterns + built-in knowledge
3. If reference file exists, incorporate its content into the answer

## Key Patterns

### 1. Basic Layout Container
