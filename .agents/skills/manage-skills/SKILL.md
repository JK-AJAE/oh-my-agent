---
name: "manage-skills"
description: "Discover, list, create, edit, toggle, copy, move, and delete AI agent skills across 11 tools (Cursor, Claude, Agents, Windsurf, Copilot, Codex, Cline, Aider, Continue, Roo Code, Augment)"
category: "custom-skill"
trigger: "/manage-skills"
---

# Manage AI Agent Skills

You can manage skills and rules for all major AI coding tools directly from the terminal. This skill teaches you the directory layout, file format, and operations for each tool.

## When to Use

Use this skill when the user wants to inspect, create, edit, enable, disable, copy, move, or delete local AI-agent skills or rule files across supported coding tools.

## Supported Tools & Paths

### Directory-based tools (multiple skills)

Each skill lives in its own subdirectory with a `SKILL.md` file containing YAML frontmatter.

| Tool | Global Path | Project Path |
|------|------------|--------------|
| Agents | `~/.agents/skills/<name>/SKILL.md` | `.agents/skills/<name>/SKILL.md` |
| Cursor | `~/.cursor/skills/<name>/SKILL.md` | `.cursor/skills/<name>/SKILL.md` |
| Claude | `~/.claude/skills/<name>/SKILL.md` | `.claude/skills/<name>/SKILL.md` |
| Windsurf | `~/.windsurf/rules/<name>/<name>.md` | `.windsurf/rules/<name>/<name>.md` |
| Cline | `~/.cline/rules/<name>/<name>.md` | `.cline/rules/<name>/<name>.md` |
| Continue | `~/.continue/rules/<name>/<name>.md` | `.continue/rules/<name>/<name>.md` |
| Roo Code | `~/.roo/rules/<name>/<name>.md` | `.roo/rules/<name>/<name>.md` |

### Single-file tools (one config file)

| Tool | Global Path | Project Path |
|------|------------|--------------|
| Copilot | `~/.github/copilot-instructions.md` | `.github/copilot-instructions.md` |
| Codex | `~/.codex/AGENTS.md` | `.codex/AGENTS.md` |
| Aider | `~/.aider.conf.yml` | `.aider.conf.yml` |
| Augment | `~/augment-guidelines.md` | `augment-guidelines.md` |

### Cursor plugins (read-only)

Plugin skills are cached at `~/.cursor/plugins/cache/<org>/<plugin>/<version>/skills/<name>/SKILL.md`. These are managed by Cursor and should not be edited directly.

## Skill File Format

For directory-based tools (Agents, Cursor, Claude), skills use YAML frontmatter:
