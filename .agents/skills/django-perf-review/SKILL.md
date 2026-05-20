---
name: "django-perf-review"
description: "Django performance code review. Use when asked to \"review Django performance\", \"find N+1 queries\", \"optimize Django\", \"check queryset performance\", \"database performance\", \"Django ORM issues\", or audit Django code for performance problems."
category: "custom-skill"
trigger: "/django-perf-review"
---

# Django Performance Review

Review Django code for **validated** performance issues. Research the codebase to confirm issues before reporting. Report only what you can prove.

## When to Use
- You need a Django performance review focused on verified ORM and query issues.
- The code likely has N+1 queries, unbounded querysets, missing indexes, or other database-driven bottlenecks.
- You want only provable performance findings, not speculative optimization advice.

## Review Approach

1. **Research first** - Trace data flow, check for existing optimizations, verify data volume
2. **Validate before reporting** - Pattern matching is not validation
3. **Zero findings is acceptable** - Don't manufacture issues to appear thorough
4. **Severity must match impact** - If you catch yourself writing "minor" in a CRITICAL finding, it's not critical. Downgrade or skip it.

## Impact Categories

Issues are organized by impact. Focus on CRITICAL and HIGH - these cause real problems at scale.

| Priority | Category | Impact |
|----------|----------|--------|
| 1 | N+1 Queries | **CRITICAL** - Multiplies with data, causes timeouts |
| 2 | Unbounded Querysets | **CRITICAL** - Memory exhaustion, OOM kills |
| 3 | Missing Indexes | **HIGH** - Full table scans on large tables |
| 4 | Write Loops | **HIGH** - Lock contention, slow requests |
| 5 | Inefficient Patterns | **LOW** - Rarely worth reporting |

---

## Priority 1: N+1 Queries (CRITICAL)

**Impact:** Each N+1 adds `O(n)` database round trips. 100 rows = 100 extra queries. 10,000 rows = timeout.

### Rule: Prefetch related data accessed in loops

Validate by tracing: View → Queryset → Template/Serializer → Loop access
