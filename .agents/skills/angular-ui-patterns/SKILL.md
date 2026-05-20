---
name: "angular-ui-patterns"
description: "Modern Angular UI patterns for loading states, error handling, and data display. Use when building UI components, handling async data, or managing component states."
category: "custom-skill"
trigger: "/angular-ui-patterns"
---

# Angular UI Patterns

## Core Principles

1. **Never show stale UI** - Loading states only when actually loading
2. **Always surface errors** - Users must know when something fails
3. **Optimistic updates** - Make the UI feel instant
4. **Progressive disclosure** - Use `@defer` to show content as available
5. **Graceful degradation** - Partial data is better than no data

---

## Loading State Patterns

### The Golden Rule

**Show loading indicator ONLY when there's no data to display.**
