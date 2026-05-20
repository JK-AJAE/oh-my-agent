---
name: "fp-errors"
description: "Stop throwing everywhere - handle errors as values using Either and TaskEither for cleaner, more predictable code"
category: "custom-skill"
trigger: "/fp-errors"
---

# Practical Error Handling with fp-ts

This skill teaches you how to handle errors without try/catch spaghetti. No academic jargon - just practical patterns for real problems.

The core idea: **Errors are just data**. Instead of throwing them into the void and hoping someone catches them, return them as values that TypeScript can track.

## When to Use
- You need to replace exception-heavy code with `Either` or `TaskEither`.
- The task involves validation, domain errors, or clearer error contracts in TypeScript.
- You want pragmatic fp-ts error-handling guidance for real application code.

---

## 1. Stop Throwing Everywhere

### The Problem with Exceptions

Exceptions are invisible in your types. They break the contract between functions.
