---
name: "not-human-search-mcp"
description: "Search AI-ready websites, inspect indexed site details, verify MCP endpoints, and discover tools and APIs using the Not Human Search MCP server"
category: "custom-skill"
trigger: "/not-human-search-mcp"
---

# Not Human Search MCP

## Overview

Not Human Search is a remote MCP server that lets AI agents search a curated index of 1,750+ AI-ready websites, inspect indexed site details, submit new sites for analysis, and verify live MCP endpoints via JSON-RPC probe. It is designed for AI agents that need to discover tools, APIs, and services at runtime without relying on hardcoded lists.

## When to Use This Skill

- Use when an AI agent needs to discover tools, APIs, or MCP servers for a specific task
- Use when you want to check whether a website exposes machine-readable endpoints (llms.txt, OpenAPI, MCP)
- Use when verifying that an MCP endpoint is actually responding to JSON-RPC
- Use when building agent workflows that need to find and connect to external services dynamically

## MCP Configuration

Add the Not Human Search MCP server to your client configuration. The endpoint uses streamable HTTP and requires no authentication.

### Claude Desktop / Cursor / Windsurf
