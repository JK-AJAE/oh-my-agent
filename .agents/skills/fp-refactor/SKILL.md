---
name: "fp-refactor"
description: "Comprehensive guide for refactoring imperative TypeScript code to fp-ts functional patterns"
category: "custom-skill"
trigger: "/fp-refactor"
---

# Refactoring Imperative Code to fp-ts

This skill provides comprehensive patterns and strategies for migrating existing imperative TypeScript code to fp-ts functional programming patterns.

## When to Use
- You are refactoring an existing imperative TypeScript codebase toward fp-ts patterns.
- The task involves converting `try/catch`, null checks, callbacks, DI, or loops into functional equivalents.
- You need migration guidance and tradeoffs, not just isolated fp-ts examples.

## Table of Contents

1. [Converting try-catch to Either/TaskEither](#1-converting-try-catch-to-eithertaskeither)
2. [Converting null checks to Option](#2-converting-null-checks-to-option)
3. [Converting callbacks to Task](#3-converting-callbacks-to-task)
4. [Converting class-based DI to Reader](#4-converting-class-based-di-to-reader)
5. [Converting imperative loops to functional operations](#5-converting-imperative-loops-to-functional-operations)
6. [Migrating Promise chains to TaskEither](#6-migrating-promise-chains-to-taskeither)
7. [Common Pitfalls](#7-common-pitfalls)
8. [Gradual Adoption Strategies](#8-gradual-adoption-strategies)
9. [When NOT to Refactor](#9-when-not-to-refactor)

---

## 1. Converting try-catch to Either/TaskEither

### The Problem with try-catch

Traditional try-catch blocks have several issues:
- Error handling is implicit and easy to forget
- The type system doesn't track which functions can throw
- Control flow is non-linear and harder to reason about
- Composing multiple fallible operations is verbose

### Pattern: Synchronous try-catch to Either

#### Before (Imperative)
