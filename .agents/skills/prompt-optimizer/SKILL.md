---
name: "prompt-optimizer"
description: "Methodology for systematically evaluating and optimizing LLM prompt quality. Use this skill for 'prompt optimization', 'prompt improvement', 'guardrail design', 'prompt debugging', 'few-shot optimization', 'system prompt design', and other prompt quality improvement tasks. Note: LLM model fine-tuning and model weight modification are outside the scope of this skill."
category: "utility"
---

# Prompt Optimizer — Prompt Optimization Methodology

A skill that enhances prompt quality for the prompt-engineer and eval-specialist.

## Target Agents

- **prompt-engineer** — Optimizes system prompts and few-shot examples
- **eval-specialist** — Measures the effect of prompt changes

## Prompt Quality Evaluation Rubric (CRISP)

| Dimension | Description | Score Criteria |
|-----------|------------|---------------|
| **C**larity | Are instructions unambiguous? | 5: Only one interpretation possible |
| **R**elevance | Is there no unnecessary information? | 5: Every sentence contributes to the goal |
| **I**nstructability | Does it specify concrete actions? | 5: Step-by-step actions specified |
| **S**tructure | Is it logically organized? | 5: Role > Context > Task > Constraints order |
| **P**recision | Is the output format clear? | 5: Output schema/examples included |

Total: 25 points max. 20+ Excellent, 15-19 Good, <15 Needs improvement

## System Prompt Structure Template (RCTF)
