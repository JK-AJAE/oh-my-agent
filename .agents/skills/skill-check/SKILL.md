---
name: "skill-check"
description: "Validate Claude Code skills against the agentskills specification. Catches structural, semantic, and naming issues before users do."
category: "custom-skill"
trigger: "/skill-check"
---

# SkillCheck

## Overview

Validate SKILL.md files against the [agentskills specification](https://agentskills.io) and Anthropic best practices. Catches structural errors, semantic contradictions, naming anti-patterns, and quality gaps in a single read-only pass.

## When to Use This Skill

- Use when user says "check skill", "skillcheck", or "validate SKILL.md"
- Use when reviewing a skill before publishing to a marketplace
- Use when debugging why a skill doesn't trigger correctly
- Use when onboarding a team to skill authoring standards
- Do NOT use for anti-slop detection, security scanning, or token analysis; use [SkillCheck Pro](https://getskillcheck.com) for those

## How It Works

### Step 1: Parse

Read the target SKILL.md file and extract YAML frontmatter.

### Step 2: Validate

Apply all Free tier checks in order:

| Category | Checks | What it catches |
|----------|--------|----------------|
| Structure (1.x) | Name format, description WHAT+WHEN, allowed-tools, categories, XML injection | Malformed frontmatter, missing fields |
| Body (2.x) | Line count, hardcoded paths, stale dates, empty sections, deprecated syntax, MCP tool qualification | Content quality issues |
| Naming (3.x) | Vague terms, single-word names, gerund suggestions | Poor discoverability |
| Semantic (4.x) | Contradictions, ambiguous terms, missing output format, wisdom/platitudes, misplaced triggers | Logical inconsistencies |
| Quality (8.x) | Examples, error handling, triggers, output format, prerequisites, negative triggers | Strengths (positive patterns) |

### Step 3: Score

Calculate overall score (0-100). Penalties: critical = -20, warning = -5, suggestion = -1.

### Step 4: Report

Return structured results: score, grade (Excellent/Good/Needs Work/Poor), issue list with check IDs, line numbers, messages, and fix suggestions.

## Examples

### Example 1: Validating a skill
