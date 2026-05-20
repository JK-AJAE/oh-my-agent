---
name: "angular-best-practices"
description: "Angular performance optimization and best practices guide. Use when writing, reviewing, or refactoring Angular code for optimal performance, bundle size, and rendering efficiency."
category: "custom-skill"
trigger: "/angular-best-practices"
---

# Angular Best Practices

Comprehensive performance optimization guide for Angular applications. Contains prioritized rules for eliminating performance bottlenecks, optimizing bundles, and improving rendering.

## When to Use
Reference these guidelines when:

- Writing new Angular components or pages
- Implementing data fetching patterns
- Reviewing code for performance issues
- Refactoring existing Angular code
- Optimizing bundle size or load times
- Configuring SSR/hydration

---

## Rule Categories by Priority

| Priority | Category              | Impact     | Focus                           |
| -------- | --------------------- | ---------- | ------------------------------- |
| 1        | Change Detection      | CRITICAL   | Signals, OnPush, Zoneless       |
| 2        | Async Waterfalls      | CRITICAL   | RxJS patterns, SSR preloading   |
| 3        | Bundle Optimization   | CRITICAL   | Lazy loading, tree shaking      |
| 4        | Rendering Performance | HIGH       | @defer, trackBy, virtualization |
| 5        | Server-Side Rendering | HIGH       | Hydration, prerendering         |
| 6        | Template Optimization | MEDIUM     | Control flow, pipes             |
| 7        | State Management      | MEDIUM     | Signal patterns, selectors      |
| 8        | Memory Management     | LOW-MEDIUM | Cleanup, subscriptions          |

---

## 1. Change Detection (CRITICAL)

### Use OnPush Change Detection
