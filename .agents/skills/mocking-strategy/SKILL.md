---
name: "mocking-strategy"
description: "Test double (Mock, Stub, Spy, Fake) selection and effective mocking strategy guide. Use this skill for 'mocking', 'Mock', 'Stub', 'Spy', 'Fake', 'test doubles', 'dependency isolation', 'external service mocking', 'DB mocking', and other test isolation strategy tasks. Enhances the mocking design capabilities of unit-tester and integration-tester. Note: overall test strategy formulation and CI integration are outside the scope of this skill."
category: "utility"
---

# Mocking Strategy — Test Double Selection and Mocking Strategy Guide

Methodologies for effectively isolating dependencies to create reliable tests.

## Test Double Type Comparison

| Type | Purpose | Behavior | Verification Target |
|------|---------|----------|-------------------|
| **Dummy** | Fill parameters | Does nothing | Not used |
| **Stub** | Provide fixed responses | Return predefined values | State (result values) |
| **Spy** | Record calls | Real behavior + recording | Interactions (call count/args) |
| **Mock** | Define expected behavior | Pass if expectations met | Interactions (call order/args) |
| **Fake** | Lightweight implementation | Working simplified implementation | State (integration level) |

## Selection Decision Tree
