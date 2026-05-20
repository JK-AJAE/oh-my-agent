---
name: "assessment-engineering"
description: "An assessment engineering skill used by the quiz-maker agent. Provides item type design guides, distractor psychology, rubric construction, and formative/summative assessment strategies. Used for 'quiz design,' 'assessment items,' 'rubrics,' 'exam creation,' and related topics."
category: "utility"
---

# Assessment Engineering — Assessment Engineering Methodology

Expert knowledge used by the quiz-maker agent when designing formative and summative assessments.

## Why Assessment Engineering

Good assessment **accurately measures** learner understanding while simultaneously **reinforcing learning**. Poor assessment rewards memorization; good assessment rewards understanding.

## Item Type Design Guide

### 1. Multiple Choice

| Element | Rule |
|---------|------|
| **Stem** | Must be a clear question when read independently |
| **Key (Correct Answer)** | Must be unambiguously the best answer |
| **Distractors** | Plausible but clearly incorrect (see below) |
| **Number of Options** | 4 (5 adds meaningless wrong answers; 3 gives a 33% guess rate) |
| **Option Length** | Keep similar length (longest option being correct is a clue leak) |

### Distractor Design Psychology

| Distractor Type | Purpose | Example (Q: "Which HTTP method deletes a resource in REST?") |
|----------------|---------|------|
| **Common Misconception** | Diagnose incorrect knowledge | "POST" (confusing create and delete) |
| **Partial Answer** | Diagnose superficial understanding | "PUT" (confusing update and delete) |
| **Related Concept** | Diagnose concept discrimination | "PATCH" (partial update, similar concept) |
| **Correct**: | | "DELETE" |

### 2. Code Writing Problems
