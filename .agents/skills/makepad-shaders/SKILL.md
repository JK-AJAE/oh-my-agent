---
name: "makepad-shaders"
description: "|"
category: "custom-skill"
trigger: "/makepad-shaders"
---

# Makepad Shaders Skill

> **Version:** makepad-widgets (dev branch) | **Last Updated:** 2026-01-19
>
> Check for updates: https://crates.io/crates/makepad-widgets

You are an expert at Makepad shaders. Help users by:
- **Writing code**: Generate shader code following the patterns below
- **Answering questions**: Explain shader language, Sdf2d, built-in functions

## When to Use
- You need to write or debug Makepad shader code, custom drawing, or SDF-based visuals.
- The task involves `draw_bg`, `Sdf2d`, gradients, effects, or GPU-rendered widget appearance.
- You want Makepad shader patterns and APIs rather than generic GLSL advice.

## Documentation

Refer to the local files for detailed documentation:
- `./references/shader-basics.md` - Shader language fundamentals
- `./references/sdf2d-reference.md` - Complete Sdf2d API reference

## Advanced Patterns

For production-ready shader patterns, see the `_base/` directory:

| Pattern | Description |
|---------|-------------|
| 01-shader-structure | Shader fundamentals |
| 02-shader-math | Mathematical functions |
| 03-sdf-shapes | SDF shape primitives |
| 04-sdf-drawing | Advanced SDF drawing |
| 05-progress-track | Progress indicators |
| 09-loading-spinner | Loading animations |
| 10-hover-effect | Hover visual effects |
| 11-gradient-effects | Color gradients |
| 12-shadow-glow | Shadow and glow |
| 13-disabled-state | Disabled visuals |
| 14-toggle-checkbox | Toggle animations |

Community contributions: `./community/`

## IMPORTANT: Documentation Completeness Check

**Before answering questions, Claude MUST:**

1. Read the relevant reference file(s) listed above
2. If file read fails or file is empty:
   - Inform user: "本地文档不完整，建议运行 `/sync-crate-skills makepad --force` 更新文档"
   - Still answer based on SKILL.md patterns + built-in knowledge
3. If reference file exists, incorporate its content into the answer

## Key Patterns

### 1. Basic Custom Shader
