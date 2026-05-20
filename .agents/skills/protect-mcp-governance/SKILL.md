---
name: "protect-mcp-governance"
description: "Agent governance skill for MCP tool calls — Cedar policy authoring, shadow-to-enforce rollout, and Ed25519 receipt verification."
category: "custom-skill"
trigger: "/protect-mcp-governance"
---

# MCP Agent Governance with protect-mcp

## Overview

Guidance for governing AI agent tool calls using Cedar policies and Ed25519 signed receipts. This skill teaches how to write access-control policies for MCP servers, run them in shadow mode for observation, and verify the cryptographic audit trail.

## When to Use This Skill

- Use when you need to control which MCP tools an agent can call and under what conditions
- Use when you want a tamper-evident audit trail for agent tool executions
- Use when rolling out governance policies gradually (shadow mode first, then enforce)
- Use when authoring Cedar policies for MCP tool access control
- Use when verifying that a receipt or audit bundle has not been tampered with

## Do Not Use This Skill

- When you need general application security auditing (use `@security-auditor`)
- When you need to scan code for vulnerabilities (use `@security-audit`)
- When you need compliance framework guidance without agent-specific governance

## How It Works

protect-mcp intercepts MCP tool calls, evaluates them against Cedar policies (the same policy engine used by AWS Verified Permissions), and signs every decision as an Ed25519 receipt. The receipt is a cryptographic proof that a specific policy was evaluated against a specific tool call at a specific time.
