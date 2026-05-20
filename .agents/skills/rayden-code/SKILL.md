---
name: "rayden-code"
description: "Generate React code with Rayden UI components using correct props, tokens, and premium layout patterns"
category: "custom-skill"
trigger: "/rayden-code"
---

# Rayden Code Skill

## Overview

Generate production-quality React + Tailwind CSS code using the Rayden UI component library (34 components). The skill loads a complete API reference with every component, every prop, design tokens, layout patterns, and an explicit anti-pattern ban list — preventing hallucinated components and generic AI output. Built on the Rayna UI design system.

## When to Use This Skill

- You're building a new page or feature using Rayden UI components
- You want to scaffold a dashboard, landing page, auth screen, settings page, or data table
- You need to generate React code that follows a specific design system precisely
- You want to prototype UI quickly with correct component usage and premium aesthetics
- You're vibe coding and want design-system-compliant output

## How It Works

1. **Parses the request** — Identifies page type, required components, and data model
2. **Loads RAYDEN_RULES.md** — Complete reference: 34 components with full props, design philosophy, token classes, layout patterns, anti-patterns, and accessibility rules
3. **Plans the layout** — Decides page structure, component selection, spacing, color, and elevation strategy
4. **Generates code** — Writes React + Tailwind CSS using only documented components and token classes
5. **Self-validates** — Runs a 16-point checklist covering correctness (valid components/props, token usage, nesting) and design quality (whitespace, hierarchy, restraint, responsiveness)

## Examples

### Vibe code a SaaS dashboard
