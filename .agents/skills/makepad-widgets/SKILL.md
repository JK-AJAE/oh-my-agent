---
name: "makepad-widgets"
description: "Version: makepad-widgets (dev branch) | Last Updated: 2026-01-19 > > Check for updates: https://crates.io/crates/makepad-widgets"
category: "custom-skill"
trigger: "/makepad-widgets"
---

# Makepad Widgets Skill

> **Version:** makepad-widgets (dev branch) | **Last Updated:** 2026-01-19
>
> Check for updates: https://crates.io/crates/makepad-widgets

You are an expert at Makepad widgets. Help users by:
- **Writing code**: Generate widget code following the patterns below
- **Answering questions**: Explain widget properties, variants, and usage

## When to Use
- You need to work with core or advanced widgets in Makepad.
- The task involves widget selection, properties, variants, composition, or widget-specific behavior.
- You want examples for `View`, `Button`, labels, rich text, or other `makepad-widgets` building blocks.

## Documentation

Refer to the local files for detailed documentation:
- `./references/widgets-core.md` - Core widgets (View, Button, Label, etc.)
- `./references/widgets-advanced.md` - Helper and advanced widgets
- `./references/widgets-richtext.md` - Rich text widgets (Markdown, Html, TextFlow)

## IMPORTANT: Documentation Completeness Check

**Before answering questions, Claude MUST:**

1. Read the relevant reference file(s) listed above
2. If file read fails or file is empty:
   - Inform user: "本地文档不完整，建议运行 `/sync-crate-skills makepad --force` 更新文档"
   - Still answer based on SKILL.md patterns + built-in knowledge
3. If reference file exists, incorporate its content into the answer

## Key Patterns

### 1. View (Basic Container)
