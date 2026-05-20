---
name: "frontend-api-integration-patterns"
description: "Production-ready patterns for integrating frontend applications with backend APIs, including race condition handling, request cancellation, retry strategies, error normalization, and UI state management."
category: "custom-skill"
trigger: "/frontend-api-integration-patterns"
---

# Frontend API Integration Patterns

## Overview

This skill provides production-ready patterns for integrating frontend applications with backend APIs.

Most frontend issues are not caused by APIs being difficult to call, but by **incorrect handling of asynchronous behavior**—leading to race conditions, stale data, duplicated requests, and poor user experience.

This skill focuses on **correctness, resilience, and user experience**, not just making API calls work.

---

## When to Use This Skill

* Connecting frontend apps (React, React Native, Vue, etc.) to backend APIs
* Integrating ML/AI endpoints (`/predict`, `/recommend`)
* Handling asynchronous data in UI
* Fixing stale data, flickering UI, or duplicate requests
* Designing scalable frontend API layers

---

## Core Patterns

### 1. API Layer (Separation of Concerns)

Centralize API logic and normalize errors.
