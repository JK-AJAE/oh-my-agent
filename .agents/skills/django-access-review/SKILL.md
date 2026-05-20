---
name: "django-access-review"
description: "django-access-review"
category: "custom-skill"
trigger: "/django-access-review"
---

---
name: django-access-review
description: Django access control and IDOR security review. Use when reviewing Django views, DRF viewsets, ORM queries, or any Python/Django code handling user authorization. Trigger keywords: "IDOR", "access control", "authorization", "Django permissions", "object permissions", "tenant...
--- LICENSE
---

<!--
Reference material based on OWASP Cheat Sheet Series (CC BY-SA 4.0)
https://cheatsheetseries.owasp.org/
-->

# Django Access Control & IDOR Review

Find access control vulnerabilities by investigating how the codebase answers one question:

**Can User A access, modify, or delete User B's data?**

## When to Use
- You need to review Django or DRF code for access control gaps, IDOR risk, or object-level authorization failures.
- The task involves confirming whether one user can access, modify, or delete another user's data.
- You want an investigation-driven authorization review instead of generic pattern matching.

## Philosophy: Investigation Over Pattern Matching

Do NOT scan for predefined vulnerable patterns. Instead:

1. **Understand** how authorization works in THIS codebase
2. **Ask questions** about specific data flows
3. **Trace code** to find where (or if) access checks happen
4. **Report** only what you've confirmed through investigation

Every codebase implements authorization differently. Your job is to understand this specific implementation, then find gaps.

---

## Phase 1: Understand the Authorization Model

Before looking for bugs, answer these questions about the codebase:

### How is authorization enforced?

Research the codebase to find:
