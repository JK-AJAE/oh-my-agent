---
name: "story-point-estimator"
description: "A methodology for systematically estimating user story points. Used during sprint planning for tasks such as 'story point estimation,' 'SP calculation,' 'effort estimation,' 'velocity calculation,' and 'planning poker.' Note: Updating actual Jira tickets or facilitating team meetings is outside the scope of this skill."
category: "utility"
---

# Story Point Estimator

A skill that enhances the effort estimation capabilities of sprint-planner and story-writer.

## Target Agents

- **sprint-planner** — Plans sprint capacity and story allocation
- **story-writer** — Evaluates complexity when writing user stories

## Fibonacci Scale Reference

| SP | Complexity | Uncertainty | Effort | Example |
|----|-----------|-------------|--------|---------|
| 1 | Very Low | None | A few hours | Text change, config value update |
| 2 | Low | Very Low | Half a day | Simple UI component addition |
| 3 | Moderate | Low | 1 day | Single CRUD API, simple screen |
| 5 | Medium | Moderate | 2-3 days | Complex business logic, external API integration |
| 8 | High | High | 1 week | New feature module, authentication system |
| 13 | Very High | Very High | 1-2 weeks | Architecture change, large-scale refactoring |
| 21+ | Needs Decomposition | - | - | Story is too large — decomposition required |

## Complexity Assessment Dimensions

### Three-Dimensional Assessment Model
