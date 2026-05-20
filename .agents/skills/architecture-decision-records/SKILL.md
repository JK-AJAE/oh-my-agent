---
name: "architecture-decision-records"
description: "Comprehensive patterns for creating, maintaining, and managing Architecture Decision Records (ADRs) that capture the context and rationale behind significant technical decisions."
category: "custom-skill"
trigger: "/architecture-decision-records"
---

# Architecture Decision Records

Comprehensive patterns for creating, maintaining, and managing Architecture Decision Records (ADRs) that capture the context and rationale behind significant technical decisions.

## Use this skill when

- Making significant architectural decisions
- Documenting technology choices
- Recording design trade-offs
- Onboarding new team members
- Reviewing historical decisions
- Establishing decision-making processes

## Do not use this skill when

- You only need to document small implementation details
- The change is a minor patch or routine maintenance
- There is no architectural decision to capture

## Instructions

1. Capture the decision context, constraints, and drivers.
2. Document considered options with tradeoffs.
3. Record the decision, rationale, and consequences.
4. Link related ADRs and update status over time.

## Core Concepts

### 1. What is an ADR?

An Architecture Decision Record captures:
- **Context**: Why we needed to make a decision
- **Decision**: What we decided
- **Consequences**: What happens as a result

### 2. When to Write an ADR

| Write ADR | Skip ADR |
|-----------|----------|
| New framework adoption | Minor version upgrades |
| Database technology choice | Bug fixes |
| API design patterns | Implementation details |
| Security architecture | Routine maintenance |
| Integration patterns | Configuration changes |

### 3. ADR Lifecycle
