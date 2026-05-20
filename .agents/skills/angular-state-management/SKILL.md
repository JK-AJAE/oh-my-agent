---
name: "angular-state-management"
description: "Master modern Angular state management with Signals, NgRx, and RxJS. Use when setting up global state, managing component stores, choosing between state solutions, or migrating from legacy patterns."
category: "custom-skill"
trigger: "/angular-state-management"
---

# Angular State Management

Comprehensive guide to modern Angular state management patterns, from Signal-based local state to global stores and server state synchronization.

## When to Use This Skill

- Setting up global state management in Angular
- Choosing between Signals, NgRx, or Akita
- Managing component-level stores
- Implementing optimistic updates
- Debugging state-related issues
- Migrating from legacy state patterns

## Do Not Use This Skill When

- The task is unrelated to Angular state management
- You need React state management → use `react-state-management`

---

## Core Concepts

### State Categories

| Type             | Description                  | Solutions             |
| ---------------- | ---------------------------- | --------------------- |
| **Local State**  | Component-specific, UI state | Signals, `signal()`   |
| **Shared State** | Between related components   | Signal services       |
| **Global State** | App-wide, complex            | NgRx, Akita, Elf      |
| **Server State** | Remote data, caching         | NgRx Query, RxAngular |
| **URL State**    | Route parameters             | ActivatedRoute        |
| **Form State**   | Input values, validation     | Reactive Forms        |

### Selection Criteria
