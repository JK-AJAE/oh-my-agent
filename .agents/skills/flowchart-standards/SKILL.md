---
name: "flowchart-standards"
description: "Process flowchart standards guide. Notation and patterns referenced by the flowchart-designer agent when visualizing business processes in Mermaid. Used for 'flowchart standards', 'process diagram' requests. Note: BPM engine implementation is out of scope."
category: "utility"
---

# Flowchart Standards — Process Flowchart Standards

Standardizes the flowchart-designer agent's process visualization quality.

## Standard Symbol System

| Symbol | Mermaid | Meaning | Usage |
|--------|---------|---------|-------|
| Rounded rectangle | `([text])` | Start/End | Process entry/exit |
| Rectangle | `[text]` | Processing/Task | Unit work activity |
| Diamond | `{text}` | Decision/Branch | Decision point |
| Parallelogram | `[/text/]` | Input/Output | Document/Data |
| Cylinder | `[(text)]` | Data store | DB/System |
| Subgraph | `subgraph` | Area grouping | Department/Phase |

## Process Type Patterns

### Pattern 1: Approval Process
