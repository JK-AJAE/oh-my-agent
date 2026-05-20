---
name: "project-development"
description: "This skill covers the principles for identifying tasks suited to LLM processing, designing effective project architectures, and iterating rapidly using agent-assisted development."
category: "custom-skill"
trigger: "/project-development"
---

# Project Development Methodology

This skill covers the principles for identifying tasks suited to LLM processing, designing effective project architectures, and iterating rapidly using agent-assisted development. The methodology applies whether building a batch processing pipeline, a multi-agent research system, or an interactive agent application.

## When to Use
Activate this skill when:
- Starting a new project that might benefit from LLM processing
- Evaluating whether a task is well-suited for agents versus traditional code
- Designing the architecture for an LLM-powered application
- Planning a batch processing pipeline with structured outputs
- Choosing between single-agent and multi-agent approaches
- Estimating costs and timelines for LLM-heavy projects

## Core Concepts

### Task-Model Fit Recognition

Not every problem benefits from LLM processing. The first step in any project is evaluating whether the task characteristics align with LLM strengths. This evaluation should happen before writing any code.

**LLM-suited tasks share these characteristics:**

| Characteristic | Why It Fits |
|----------------|-------------|
| Synthesis across sources | LLMs excel at combining information from multiple inputs |
| Subjective judgment with rubrics | LLMs handle grading, evaluation, and classification with criteria |
| Natural language output | When the goal is human-readable text, not structured data |
| Error tolerance | Individual failures do not break the overall system |
| Batch processing | No conversational state required between items |
| Domain knowledge in training | The model already has relevant context |

**LLM-unsuited tasks share these characteristics:**

| Characteristic | Why It Fails |
|----------------|--------------|
| Precise computation | Math, counting, and exact algorithms are unreliable |
| Real-time requirements | LLM latency is too high for sub-second responses |
| Perfect accuracy requirements | Hallucination risk makes 100% accuracy impossible |
| Proprietary data dependence | The model lacks necessary context |
| Sequential dependencies | Each step depends heavily on the previous result |
| Deterministic output requirements | Same input must produce identical output |

The evaluation should happen through manual prototyping: take one representative example and test it directly with the target model before building any automation.

### The Manual Prototype Step

Before investing in automation, validate task-model fit with a manual test. Copy one representative input into the model interface. Evaluate the output quality. This takes minutes and prevents hours of wasted development.

This validation answers critical questions:
- Does the model have the knowledge required for this task?
- Can the model produce output in the format you need?
- What level of quality should you expect at scale?
- Are there obvious failure modes to address?

If the manual prototype fails, the automated system will fail. If it succeeds, you have a baseline for comparison and a template for prompt design.

### Pipeline Architecture

LLM projects benefit from staged pipeline architectures where each stage is:
- **Discrete**: Clear boundaries between stages
- **Idempotent**: Re-running produces the same result
- **Cacheable**: Intermediate results persist to disk
- **Independent**: Each stage can run separately

**The canonical pipeline structure:**
