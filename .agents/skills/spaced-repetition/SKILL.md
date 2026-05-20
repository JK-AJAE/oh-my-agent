---
name: "spaced-repetition"
description: "A specialized skill for designing vocabulary and grammar review schedules using Spaced Repetition algorithms. Used by the review-coach agent to calculate optimal review intervals based on the Ebbinghaus forgetting curve and maximize long-term memory conversion rates. Automatically applied in contexts such as 'spaced repetition', 'Ebbinghaus', 'review schedule', 'forgetting curve', 'SRS', 'Anki method'. However, external app integration (Anki/Quizlet) and real-time notification system construction are outside the scope of this skill."
category: "utility"
---

# Spaced Repetition — Spaced Repetition Algorithm Tool

A specialized skill that enhances the review-coach agent's review design capabilities.

## Target Agent

- **review-coach** — Review scheduling, weakness reinforcement, long-term memory retention

## Ebbinghaus Forgetting Curve-Based Review Intervals

### Base Review Intervals (SM-2 Algorithm Variant)

| Review Round | Interval | Retention Target | Action |
|-------------|----------|-----------------|--------|
| 1st review | 1 day after learning | 80%+ | Review all items |
| 2nd review | 3 days later | 75%+ | Focus on items missed in 1st review |
| 3rd review | 7 days later | 70%+ | Items missed in 2nd review + full sample |
| 4th review | 14 days later | 70%+ | Weak items + random sample |
| 5th review | 30 days later | 65%+ | Long-term memory confirmation test |
| 6th+ | 60, 120 days... | 60%+ | Maintenance review |

### Difficulty-Based Interval Adjustment

Dynamically adjust intervals based on learner response quality:

| Response Quality | Score | Interval Factor | Next Interval |
|-----------------|-------|----------------|---------------|
| Perfect recall (instant) | 5 | x 2.5 | Significantly extended |
| Correct (slight hesitation) | 4 | x 2.0 | Extended |
| Correct (much hesitation) | 3 | x 1.5 | Slightly extended |
| Incorrect (recalled after seeing) | 2 | x 1.0 | Maintained |
| Incorrect (could not recall) | 1 | x 0.5 | Shortened |
| Complete blank | 0 | Reset | Start over |

### Interval Calculation Formula
