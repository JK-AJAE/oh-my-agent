---
name: "react-ui-patterns"
description: "Modern React UI patterns for loading states, error handling, and data fetching. Use when building UI components, handling async data, or managing UI states."
category: "custom-skill"
trigger: "/react-ui-patterns"
---

# React UI Patterns

## Core Principles

1. **Never show stale UI** - Loading spinners only when actually loading
2. **Always surface errors** - Users must know when something fails
3. **Optimistic updates** - Make the UI feel instant
4. **Progressive disclosure** - Show content as it becomes available
5. **Graceful degradation** - Partial data is better than no data

## Loading State Patterns

### The Golden Rule

**Show loading indicator ONLY when there's no data to display.**
