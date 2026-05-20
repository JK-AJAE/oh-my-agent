---
name: "odoo-automated-tests"
description: "Write and run Odoo automated tests using TransactionCase, HttpCase, and browser tour tests. Covers test data setup, mocking, and CI integration."
category: "custom-skill"
trigger: "/odoo-automated-tests"
---

# Odoo Automated Tests

## Overview

Odoo has a built-in testing framework based on Python's `unittest`. This skill helps you write `TransactionCase` unit tests, `HttpCase` integration tests, and JavaScript tour tests. It also covers running tests in CI pipelines.

## When to Use This Skill

- Writing unit tests for a custom model's business logic.
- Creating an HTTP test to verify a controller endpoint.
- Debugging test failures in a CI pipeline.
- Setting up automated test execution with `--test-enable`.

## How It Works

1. **Activate**: Mention `@odoo-automated-tests` and describe the feature to test.
2. **Generate**: Get complete test class code with setup, teardown, and assertions.
3. **Run**: Get the exact `odoo` CLI command to execute your tests.

## Examples

### Example 1: TransactionCase Unit Test (Odoo 15+ pattern)
