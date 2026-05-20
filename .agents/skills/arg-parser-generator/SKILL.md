---
name: "arg-parser-generator"
description: "Methodology for systematically designing and generating CLI tool argument parser structures. Use this skill for 'CLI argument design', 'option structure', 'subcommand design', 'argument parser generation', 'help text design', and other CLI argument system design tasks. Note: GUI interface design and TUI framework integration are outside the scope of this skill."
category: "utility"
---

# Arg Parser Generator — CLI Argument Parser Design + Code Generation

A skill that enhances argument parser design for the command-designer and core-developer.

## Target Agents

- **command-designer** — Designs command structure and option layout
- **core-developer** — Implements argument parser code

## CLI Argument Type Classification

| Type | Format | Example |
|------|--------|---------|
| Positional argument | `<arg>` | `convert input.json` |
| Required option | `--name VALUE` | `--output out.yaml` |
| Optional option | `[--name VALUE]` | `[--indent 2]` |
| Flag | `[--flag]` | `[--verbose]` |
| Multiple values | `--name V1 V2` | `--files a.txt b.txt` |
| Enum | `--type {a,b,c}` | `--format {json,yaml}` |
| Environment variable | `$ENV_VAR` | `$API_KEY` |

## Subcommand Design Patterns

### Pattern 1: Verb-Based (CRUD)
