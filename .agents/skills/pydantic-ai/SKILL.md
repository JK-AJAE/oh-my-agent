---
name: "pydantic-ai"
description: "Build production-ready AI agents with PydanticAI — type-safe tool use, structured outputs, dependency injection, and multi-model support."
category: "custom-skill"
trigger: "/pydantic-ai"
---

# PydanticAI — Typed AI Agents in Python

## Overview

PydanticAI is a Python agent framework from the Pydantic team that brings the same type-safety and validation guarantees as Pydantic to LLM-based applications. It supports structured outputs (validated with Pydantic models), dependency injection for testability, streamed responses, multi-turn conversations, and tool use — across OpenAI, Anthropic, Google Gemini, Groq, Mistral, and Ollama. Use this skill when building production AI agents, chatbots, or LLM pipelines where correctness and testability matter.

## When to Use This Skill

- Use when building Python AI agents that call tools and return structured data
- Use when you need validated, typed LLM outputs (not raw strings)
- Use when you want to write unit tests for agent logic without hitting a real LLM
- Use when switching between LLM providers without rewriting agent code
- Use when the user asks about `Agent`, `@agent.tool`, `RunContext`, `ModelRetry`, or `result_type`

## How It Works

### Step 1: Installation
