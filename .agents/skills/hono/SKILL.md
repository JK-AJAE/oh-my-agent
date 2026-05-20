---
name: "hono"
description: "Build ultra-fast web APIs and full-stack apps with Hono — runs on Cloudflare Workers, Deno, Bun, Node.js, and any WinterCG-compatible runtime."
category: "custom-skill"
trigger: "/hono"
---

# Hono Web Framework

## Overview

Hono (炎, "flame" in Japanese) is a small, ultrafast web framework built on Web Standards (`Request`/`Response`/`fetch`). It runs anywhere: Cloudflare Workers, Deno Deploy, Bun, Node.js, AWS Lambda, and any WinterCG-compatible runtime — with the same code. Hono's router is one of the fastest available, and its middleware system, built-in JSX support, and RPC client make it a strong choice for edge APIs, BFFs, and lightweight full-stack apps.

## When to Use This Skill

- Use when building a REST or RPC API for edge deployment (Cloudflare Workers, Deno Deploy)
- Use when you need a minimal but type-safe server framework for Bun or Node.js
- Use when building a Backend for Frontend (BFF) layer with low latency requirements
- Use when migrating from Express but wanting better TypeScript support and edge compatibility
- Use when the user asks about Hono routing, middleware, `c.req`, `c.json`, or `hc()` RPC client

## How It Works

### Step 1: Project Setup

**Cloudflare Workers (recommended for edge):**
