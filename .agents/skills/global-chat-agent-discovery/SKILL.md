---
name: "global-chat-agent-discovery"
description: "Discover and search 18K+ MCP servers and AI agents across 6+ registries using Global Chat's cross-protocol directory and MCP server."
category: "custom-skill"
trigger: "/global-chat-agent-discovery"
---

# Global Chat Agent Discovery

## Overview

Global Chat is a cross-protocol AI agent discovery platform that aggregates MCP servers and AI agents from 6+ registries into a single searchable directory. This skill helps you find the right MCP server, A2A agent, or agents.txt endpoint for any task by searching across 18,000+ indexed entries. It also provides an MCP server (`@global-chat/mcp-server`) for programmatic access to the directory from any MCP-compatible client.

## When to Use This Skill

- Use when you need to find an MCP server for a specific capability (e.g., database access, file conversion, API integration)
- Use when evaluating which agent registries carry tools for your use case
- Use when you want to search across multiple protocols (MCP, A2A, agents.txt) simultaneously
- Use when setting up agent-to-agent communication and need to discover available endpoints

## How It Works

### Option 1: Use the MCP Server (Recommended for Agents)

Install the Global Chat MCP server to search the directory programmatically from Claude Code, Cursor, or any MCP client.
