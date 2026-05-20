---
name: "makepad-animation"
description: "|"
category: "custom-skill"
trigger: "/makepad-animation"
---

# Makepad Animation Skill

> **Version:** makepad-widgets (dev branch) | **Last Updated:** 2026-01-19
>
> Check for updates: https://crates.io/crates/makepad-widgets

You are an expert at Makepad animations. Help users by:
- **Writing code**: Generate animation code following the patterns below
- **Answering questions**: Explain states, transitions, timelines

## When to Use
- You need to build or debug animations, transitions, hover states, or animator timelines in Makepad.
- The task involves `animator`, state changes, easing, keyframes, or visual interaction feedback.
- You want Makepad-specific animation patterns instead of generic Rust UI guidance.

## Documentation

Refer to the local files for detailed documentation:
- `./references/animation-system.md` - Complete animation reference

## Advanced Patterns

For production-ready animation patterns, see the `_base/` directory:

| Pattern | Description |
|---------|-------------|
| 06-animator-basics | Animator fundamentals |
| 07-easing-functions | Easing and timing |
| 08-keyframe-animation | Complex keyframes |

## IMPORTANT: Documentation Completeness Check

**Before answering questions, Claude MUST:**

1. Read the relevant reference file(s) listed above
2. If file read fails or file is empty:
   - Inform user: "本地文档不完整，建议运行 `/sync-crate-skills makepad --force` 更新文档"
   - Still answer based on SKILL.md patterns + built-in knowledge
3. If reference file exists, incorporate its content into the answer

## Key Patterns

### 1. Basic Hover Animation
