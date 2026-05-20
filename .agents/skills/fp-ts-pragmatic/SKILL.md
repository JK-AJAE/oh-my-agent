---
name: "fp-ts-pragmatic"
description: "A practical, jargon-free guide to fp-ts functional programming - the 80/20 approach that gets results without the academic overhead. Use when writing TypeScript with fp-ts library."
category: "custom-skill"
trigger: "/fp-ts-pragmatic"
---

# Pragmatic Functional Programming

**Read this first.** This guide cuts through the academic jargon and shows you what actually matters. No category theory. No abstract nonsense. Just patterns that make your code better.

## When to Use This Skill

- When starting with fp-ts and need practical guidance
- When writing TypeScript code that handles nullable values, errors, or async operations
- When you want cleaner, more maintainable functional code without the academic overhead
- When refactoring imperative code to functional style

## The Golden Rule

> **If functional programming makes your code harder to read, don't use it.**

FP is a tool, not a religion. Use it when it helps. Skip it when it doesn't.

---

## The 80/20 of FP

These five patterns give you most of the benefits. Master these before exploring anything else.

### 1. Pipe: Chain Operations Clearly

Instead of nesting function calls or creating intermediate variables, chain operations in reading order.
