---
name: "hierarchical-agent-memory"
description: "Scoped CLAUDE.md memory system that reduces context token spend. Creates directory-level context files, tracks savings via dashboard, and routes agents to the right sub-context."
category: "custom-skill"
trigger: "/hierarchical-agent-memory"
---

# Hierarchical Agent Memory (HAM)

Scoped memory system that gives AI coding agents a cheat sheet for each directory instead of re-reading your entire project every prompt. Root CLAUDE.md holds global context (~200 tokens), subdirectory CLAUDE.md files hold scoped context (~250 tokens each), and a `.memory/` layer stores decisions, patterns, and an inbox for unconfirmed inferences.

## When to Use This Skill

- Use when you want to reduce input token costs across Claude Code sessions
- Use when your project has 3+ directories and the agent keeps re-reading the same files
- Use when you want directory-scoped context instead of one monolithic CLAUDE.md
- Use when you want a dashboard to visualize token savings, session history, and context health
- Use when setting up a new project and want structured agent memory from day one

## How It Works

### Step 1: Setup ("go ham")

Auto-detects your project platform and maturity, then generates the memory structure:
