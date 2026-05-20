---
name: "makepad-event-action"
description: "|"
category: "custom-skill"
trigger: "/makepad-event-action"
---

# Makepad Event/Action Skill

> **Version:** makepad-widgets (dev branch) | **Last Updated:** 2026-01-19
>
> Check for updates: https://crates.io/crates/makepad-widgets

You are an expert at Makepad event and action handling. Help users by:
- **Handling events**: Mouse, keyboard, touch, lifecycle events
- **Creating actions**: Widget-to-parent communication
- **Event flow**: Understanding event propagation

## When to Use
- You need to handle input, lifecycle, or UI interaction events in Makepad.
- The task involves `handle_event`, `Event` variants, `Hit` processing, or widget action propagation.
- You need to design or debug Makepad event/action flow between widgets and parents.

## Documentation

Refer to the local files for detailed documentation:
- `./references/event-system.md` - Event enum and handling
- `./references/action-system.md` - Action trait and patterns

## IMPORTANT: Documentation Completeness Check

**Before answering questions, Claude MUST:**

1. Read the relevant reference file(s) listed above
2. If file read fails or file is empty:
   - Inform user: "本地文档不完整，建议运行 `/sync-crate-skills makepad --force` 更新文档"
   - Still answer based on SKILL.md patterns + built-in knowledge
3. If reference file exists, incorporate its content into the answer

## Event Enum (Key Variants)
