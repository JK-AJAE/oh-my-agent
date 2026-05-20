---
name: "data-quality-framework"
description: "data  (accuracy, completeness, timeliness, consistency etc.)per verification rule and Great Expectations, dbt tests etc.of also for guide. 'data ', 'verification rule', 'Great Expectations', 'dbt test', 'data profiling', 'or more detection', 'data ' etc. data    this  for. data-quality-managerof  verification  -ize. , pipeline schedulingthis before architecture  this of scope ."
category: "utility"
---

# Data Quality Framework — data  framework guide

data  systematicas of, measurement, monitoringlower framework.

## data  6

|  | of | measurement  | threshold example |
|------|------|----------|-----------|
| **accuracy** (Accuracy) |    |  , business rule verification | also > 99.9% |
| **completeness** (Completeness) | required data  | NULL ratio, required  satisfied | NULL < 1% |
| **timeliness** (Timeliness) |  between within also | latencybetween, data also | latency < 30minutes |
| **consistency** (Consistency) | system between day |  verification,  integrity | day = 0 |
| **day** (Uniqueness) |   |  /key ratio |  = 0% |
| **valid** (Validity) | /scope compliant | , scope  | efficiency > 99% |

## verification rule  pattern

### P0 (required — failure  pipeline )
