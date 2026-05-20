---
name: "decision-trigger-mapper"
description: "A specialized skill for designing decision trigger maps and strategy option portfolios within scenario response strategies. Used by the strategy-architect agent when converting robust/hedge/option strategies into concrete execution plans. Automatically applied in contexts such as 'decision triggers', 'strategy options', 'execution roadmap', 'trigger map', 'hedge strategy'. However, actual project management tool (Jira, Asana) integration and budget execution approval are outside the scope of this skill."
category: "infrastructure"
---

# Decision Trigger Mapper — Decision Trigger Map Design Tool

A specialized skill that enhances the strategy execution design capabilities of the strategy-architect agent.

## Target Agent

- **strategy-architect** — Response strategy development, decision trigger design

## Strategy Type Classification System

### 3-Tier Strategy Portfolio

| Type | Definition | Execution Condition | Investment Level |
|------|-----------|--------------------|----|
| **Robust Strategy** | Valid across all scenarios | Execute immediately | Full investment |
| **Hedge Strategy** | Valid across most scenarios | Start early, adjust direction | Medium investment |
| **Option Strategy** | Valid only in specific scenarios | Execute when trigger fires | Minimum investment (secure option) |

### Strategy Type Decision Tree
