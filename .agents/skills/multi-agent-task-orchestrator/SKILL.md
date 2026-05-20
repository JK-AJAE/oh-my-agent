---
name: "multi-agent-task-orchestrator"
description: "Route tasks to specialized AI agents with anti-duplication, quality gates, and 30-minute heartbeat monitoring"
category: "custom-skill"
trigger: "/multi-agent-task-orchestrator"
---

# Multi-Agent Task Orchestrator

## Overview

A production-tested pattern for coordinating multiple AI agents through a single orchestrator. Instead of letting agents work independently (and conflict), one orchestrator decomposes tasks, routes them to specialists, prevents duplicate work, and verifies results before marking anything done. Battle-tested across 10,000+ tasks over 6 months.

## When to Use This Skill

- Use when you have 3+ specialized agents that need to coordinate on complex tasks
- Use when agents are doing duplicate or conflicting work
- Use when you need audit trails showing who did what and when
- Use when agent output quality is inconsistent and needs verification gates

## How It Works

### Step 1: Define the Orchestrator Identity

The orchestrator must know what it IS and what it IS NOT. This prevents it from doing work instead of delegating:
