---
name: "dependency-analysis"
description: "Tools and methodologies for analyzing codebase dependency graphs and quantitatively measuring coupling/cohesion. Use this skill for 'dependency analysis', 'coupling measurement', 'circular dependencies', 'module coupling', 'cohesion analysis', 'dependency graph', 'coupling analysis', and other code dependency-related analysis. Enhances the dependency analysis capabilities of legacy-analyzer and refactoring-strategist. Note: full pipeline orchestration is outside the scope of this skill."
category: "utility"
---

# Dependency Analysis — Dependency Graph Analysis Tool

Methodologies and tool guide for quantitative measurement and visualization of code dependencies.

## Dependency Metric System

### 1. Coupling Metrics

| Metric | Formula | Interpretation | Risk Threshold |
|--------|---------|----------------|---------------|
| **Ca (Afferent Coupling)** | Number of packages depending on me | High = large change ripple effect | > 20 |
| **Ce (Efferent Coupling)** | Number of packages I depend on | High = unstable | > 20 |
| **I (Instability)** | Ce / (Ca + Ce) | 0=stable, 1=unstable | Warning in middle zone (0.3-0.7) |
| **D (Distance)** | \|A + I - 1\| | Distance from the main sequence | > 0.3 |

**Stable Dependencies Principle (SDP) Verification:**
