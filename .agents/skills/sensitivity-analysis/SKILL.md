---
name: "sensitivity-analysis"
description: "A specialized skill providing sensitivity analysis and scenario table construction methodology for financial models. Used by the scenario-planner agent when designing Bear/Base/Bull scenarios and analyzing key variable impact. Automatically applied in contexts such as 'sensitivity analysis', 'scenario analysis', 'sensitivity table', 'tornado chart', 'Monte Carlo'. However, statistical software (R, Python) execution and real-time simulation are outside the scope of this skill."
category: "utility"
---

# Sensitivity Analysis — Sensitivity Analysis Methodology

A specialized skill that enhances the scenario analysis capabilities of the scenario-planner agent.

## Target Agent

- **scenario-planner** — Bear/Base/Bull scenarios, sensitivity table construction

## 1-Way Sensitivity Analysis

Vary one variable while holding all others constant and observe changes in the result.

### Tornado Chart Construction Method

1. Select 5-8 key assumption variables
2. Vary each variable by +/-20% (or a reasonable range)
3. Calculate the variation in the result metric (enterprise value, IRR, etc.)
4. Arrange horizontal bars in descending order of variation magnitude
