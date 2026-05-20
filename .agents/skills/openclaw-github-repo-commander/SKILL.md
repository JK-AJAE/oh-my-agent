---
name: "openclaw-github-repo-commander"
description: "7-stage super workflow for GitHub repo audit, cleanup, PR review, and competitor analysis"
category: "custom-skill"
trigger: "/openclaw-github-repo-commander"
---

# OpenClaw GitHub Repo Commander

## Overview

A structured 7-stage super workflow for comprehensive GitHub repository management. This skill automates repository auditing, cleanup, competitor benchmarking, and optimization — turning a messy repo into a clean, well-documented, production-ready project.

## When to Use This Skill

- Use when you need to audit a repository for secrets, junk files, or low-quality content
- Use when the user says "clean up my repo", "optimize my GitHub project", or "audit this library"
- Use when reviewing or creating pull requests with structured analysis
- Use when comparing your project against competitors on GitHub
- Use when running `/super-workflow` or `/openclaw-github-repo-commander` on a repo URL

## How It Works

### Stage 1: Intake
Clone the target repository, define success criteria, and establish baseline metrics.

### Stage 2: Execution
Run `scripts/repo-audit.sh` — automated checks for:
- Hardcoded secrets (`ghp_`, `sk-`, `AKIA`, etc.)
- Tracked `node_modules/` or build artifacts
- Empty directories
- Large files (>1MB)
- Missing `.gitignore` coverage
- Broken internal README links

### Stage 3: Reflection
Deep manual review beyond automation: content quality, documentation consistency, structural issues, version mismatches.

### Stage 4: Competitor Analysis
Search GitHub for similar repositories. Compare documentation standards, feature coverage, star counts, and community adoption.

### Stage 5: Synthesis
Consolidate all findings into a prioritized action plan (P0 critical / P1 important / P2 nice-to-have).

### Stage 6: Iteration
Execute the plan: delete low-value files, fix security issues, upgrade documentation, add CI workflows, update changelogs.

### Stage 7: Validation
Re-run the audit script (target: 7/7 PASS), verify all changes, push to GitHub, and deliver a full report.

## Examples

### Example 1: Full Repo Audit
