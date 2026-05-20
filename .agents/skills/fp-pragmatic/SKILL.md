---
name: "fp-pragmatic"
description: "A practical, jargon-free guide to functional programming - the 80/20 approach that gets results without the academic overhead"
category: "custom-skill"
trigger: "/fp-pragmatic"
---

# Pragmatic Functional Programming

**Read this first.** This guide cuts through the academic jargon and shows you what actually matters. No category theory. No abstract nonsense. Just patterns that make your code better.

## When to Use
- You want a pragmatic starting point for fp-ts or functional programming in TypeScript.
- The task is exploratory or educational and needs an 80/20 view of what is actually worth adopting.
- You need guidance on when FP helps and when it is better to keep code simple.

## The Golden Rule

> **If functional programming makes your code harder to read, don't use it.**

FP is a tool, not a religion. Use it when it helps. Skip it when it doesn't.

---

## The 80/20 of FP

These five patterns give you most of the benefits. Master these before exploring anything else.

### 1. Pipe: Chain Operations Clearly

Instead of nesting function calls or creating intermediate variables, chain operations in reading order.
