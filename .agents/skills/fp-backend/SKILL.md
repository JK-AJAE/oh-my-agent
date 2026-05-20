---
name: "fp-backend"
description: "Functional programming patterns for Node.js/Deno backend development using fp-ts, ReaderTaskEither, and functional dependency injection"
category: "custom-skill"
trigger: "/fp-backend"
---

# fp-ts Backend Patterns

Functional programming patterns for building type-safe, testable backend services using fp-ts.

## When to Use
- You are building or refactoring a Node.js or Deno backend with fp-ts.
- The task involves dependency injection, service composition, or typed backend errors with `ReaderTaskEither`.
- You need functional backend architecture patterns rather than isolated utility snippets.

## Core Concepts

### ReaderTaskEither (RTE)

The `ReaderTaskEither<R, E, A>` type is the backbone of functional backend development:
- **R** (Reader): Dependencies/environment (database, config, logger)
- **E** (Either left): Error type
- **A** (Either right): Success value
