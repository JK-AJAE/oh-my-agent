---
name: "kotlin-coroutines-expert"
description: "Expert patterns for Kotlin Coroutines and Flow, covering structured concurrency, error handling, and testing."
category: "custom-skill"
trigger: "/kotlin-coroutines-expert"
---

# Kotlin Coroutines Expert

## Overview

A guide to mastering asynchronous programming with Kotlin Coroutines. Covers advanced topics like structured concurrency, `Flow` transformations, exception handling, and testing strategies.

## When to Use This Skill

- Use when implementing asynchronous operations in Kotlin.
- Use when designing reactive data streams with `Flow`.
- Use when debugging coroutine cancellations or exceptions.
- Use when writing unit tests for suspending functions or Flows.

## Step-by-Step Guide

### 1. Structured Concurrency

Always launch coroutines within a defined `CoroutineScope`. Use `coroutineScope` or `supervisorScope` to group concurrent tasks.
