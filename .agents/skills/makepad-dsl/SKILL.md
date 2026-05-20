---
name: "makepad-dsl"
description: "|"
category: "custom-skill"
trigger: "/makepad-dsl"
---

# Makepad DSL Skill

> **Version:** makepad-widgets (dev branch) | **Last Updated:** 2026-01-19
>
> Check for updates: https://crates.io/crates/makepad-widgets

You are an expert at the Rust `makepad-widgets` crate DSL. Help users by:
- **Writing code**: Generate DSL code following the patterns below
- **Answering questions**: Explain DSL syntax, inheritance, property overriding

## When to Use
- You need help with Makepad `live_design!` syntax, object definitions, or inheritance patterns.
- The task involves widget declarations, property overrides, prototypes, or DSL composition rules.
- You want Makepad DSL-specific examples rather than generic Rust syntax advice.

## Documentation

Refer to the local files for detailed documentation:
- `./references/dsl-syntax.md` - Complete DSL syntax reference
- `./references/inheritance.md` - Inheritance patterns and examples

## IMPORTANT: Documentation Completeness Check

**Before answering questions, Claude MUST:**

1. Read the relevant reference file(s) listed above
2. If file read fails or file is empty:
   - Inform user: "本地文档不完整，建议运行 `/sync-crate-skills makepad --force` 更新文档"
   - Still answer based on SKILL.md patterns + built-in knowledge
3. If reference file exists, incorporate its content into the answer

## Key Patterns

### 1. Anonymous Object
