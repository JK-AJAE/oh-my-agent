---
name: "skill-scanner"
description: "Scan agent skills for security issues before adoption. Detects prompt injection, malicious code, excessive permissions, secret exposure, and supply chain risks."
category: "custom-skill"
trigger: "/skill-scanner"
---

# Skill Security Scanner

Scan agent skills for security issues before adoption. Detects prompt injection, malicious code, excessive permissions, secret exposure, and supply chain risks.

**Important**: Run all scripts from the repository root using the full path via `${CLAUDE_SKILL_ROOT}`.

## When to Use
- You need to evaluate a skill for prompt injection, malicious code, over-broad permissions, or supply-chain risk before adopting it.
- You want a static scan plus manual review workflow for a skill directory.
- The task is to decide whether a skill is safe enough to trust in an agent environment.

## Bundled Script

### `scripts/scan_skill.py`

Static analysis scanner that detects deterministic patterns. Outputs structured JSON.
