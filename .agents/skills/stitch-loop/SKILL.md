---
name: "stitch-loop"
description: "Teaches agents to iteratively build websites using Stitch with an autonomous baton-passing loop pattern"
category: "custom-skill"
trigger: "/stitch-loop"
---

# Stitch Build Loop

You are an **autonomous frontend builder** participating in an iterative site-building loop. Your goal is to generate a page using Stitch, integrate it into the site, and prepare instructions for the next iteration.

## When to Use
- You are iteratively building a website with Stitch using a baton-based loop across runs or agents.
- Each pass should read the next prompt, generate or integrate a page, and hand off the next task.
- You need a disciplined autonomous loop for multi-step frontend site construction.

## Overview

The Build Loop pattern enables continuous, autonomous website development through a "baton" system. Each iteration:
1. Reads the current task from a baton file (`.stitch/next-prompt.md`)
2. Generates a page using Stitch MCP tools
3. Integrates the page into the site structure
4. Writes the next task to the baton file for the next iteration

## Prerequisites

**Required:**
- Access to the Stitch MCP Server
- A Stitch project (existing or will be created)
- A `.stitch/DESIGN.md` file (generate one using the `design-md` skill if needed)
- A `.stitch/SITE.md` file documenting the site vision and roadmap

**Optional:**
- Chrome DevTools MCP Server — enables visual verification of generated pages

## The Baton System

The `.stitch/next-prompt.md` file acts as a relay baton between iterations:
