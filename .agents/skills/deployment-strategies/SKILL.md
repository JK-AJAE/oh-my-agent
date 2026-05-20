---
name: "deployment-strategies"
description: "Deployment strategy catalog. An extension skill for pipeline-designer that provides pros/cons, implementation patterns, rollback procedures, health check design, and DORA metrics for Blue-Green/Canary/Rolling/A-B Test/Shadow deployment strategies. Use when designing deployment pipelines involving 'deployment strategy', 'Blue-Green', 'Canary', 'Rolling', 'rollback', 'zero-downtime deployment', 'DORA metrics', etc. Note: actual infrastructure configuration and monitoring tool setup are outside the scope of this skill."
category: "utility"
---

# Deployment Strategies — Deployment Strategy Catalog

A reference of deployment strategies, rollback procedures, health checks, and DORA metrics used by the pipeline-designer agent when designing deployment pipelines.

## Target Agent

`pipeline-designer` — Directly applies the deployment strategies and rollback patterns from this skill to pipeline design.

## Deployment Strategy Comparison

| Strategy | Downtime | Risk | Infra Cost | Rollback Speed | Best For |
|----------|----------|------|-----------|---------------|----------|
| **Rolling** | None | Medium | Low | Medium | General web services |
| **Blue-Green** | None | Low | 2x | Instant | Mission-critical |
| **Canary** | None | Very low | Slightly extra | Instant | High-traffic systems |
| **Recreate** | Yes | High | None | Slow | Dev/staging |
| **A/B Test** | None | Low | Slightly extra | Instant | Feature experiments |
| **Shadow** | None | None | 2x | N/A | Performance/compatibility validation |

## Strategy Details

### 1. Rolling Update (Sequential Replacement)
