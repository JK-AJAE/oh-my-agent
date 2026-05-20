---
name: "molykit"
description: "|"
category: "custom-skill"
trigger: "/molykit"
---

# MolyKit Skill

Best practices for building AI chat interfaces with Makepad using MolyKit - a toolkit for cross-platform AI chat applications.

**Source codebase**: `/Users/zhangalex/Work/Projects/FW/robius/moly/moly-kit`

## When to Use
Use this skill when:
- Building AI chat interfaces with Makepad
- Integrating OpenAI or other LLM APIs
- Implementing cross-platform async for native and WASM
- Creating chat widgets (messages, prompts, avatars)
- Handling SSE streaming responses
- Keywords: molykit, moly-kit, ai chat, bot client, openai makepad, chat widget, sse streaming

## Overview

MolyKit provides:
- Cross-platform async utilities (PlatformSend, spawn(), ThreadToken)
- Ready-to-use chat widgets (Chat, Messages, PromptInput, Avatar)
- BotClient trait for AI provider integration
- OpenAI-compatible client with SSE streaming
- Protocol types for messages, bots, and tool calls
- MCP (Model Context Protocol) support

## Cross-Platform Async Patterns

### PlatformSend - Send Only on Native
