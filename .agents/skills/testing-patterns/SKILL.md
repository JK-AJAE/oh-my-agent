---
name: "testing-patterns"
description: "Jest testing patterns, factory functions, mocking strategies, and TDD workflow. Use when writing unit tests, creating test factories, or following TDD red-green-refactor cycle."
category: "custom-skill"
trigger: "/testing-patterns"
---

# Testing Patterns and Utilities

## Testing Philosophy

**Test-Driven Development (TDD):**
- Write failing test FIRST
- Implement minimal code to pass
- Refactor after green
- Never write production code without a failing test

**Behavior-Driven Testing:**
- Test behavior, not implementation
- Focus on public APIs and business requirements
- Avoid testing implementation details
- Use descriptive test names that describe behavior

**Factory Pattern:**
- Create `getMockX(overrides?: Partial<X>)` functions
- Provide sensible defaults
- Allow overriding specific properties
- Keep tests DRY and maintainable

## Test Utilities

### Custom Render Function

Create a custom render that wraps components with required providers:
