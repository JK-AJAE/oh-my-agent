---
name: "odoo-performance-tuner"
description: "Expert guide for diagnosing and fixing Odoo performance issues: slow queries, worker configuration, memory limits, PostgreSQL tuning, and profiling tools."
category: "custom-skill"
trigger: "/odoo-performance-tuner"
---

# Odoo Performance Tuner

## Overview

This skill helps diagnose and resolve Odoo performance problems — from slow page loads and database bottlenecks to worker misconfiguration and memory bloat. It covers PostgreSQL query tuning, Odoo worker settings, and built-in profiling tools.

## When to Use This Skill

- Odoo is slow in production (slow page loads, timeouts).
- Getting `MemoryError` or `Worker timeout` errors in logs.
- Diagnosing a slow database query using Odoo's profiler.
- Tuning `odoo.conf` for a specific server spec.

## How It Works

1. **Activate**: Mention `@odoo-performance-tuner` and describe your performance issue.
2. **Diagnose**: Share relevant log lines or config and receive a root cause analysis.
3. **Fix**: Get exact configuration changes with explanations.

## Examples

### Example 1: Recommended Worker Configuration
