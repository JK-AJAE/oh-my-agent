---
name: "code-refactoring-context-restore"
description: "Use when working with code refactoring context restore"
category: "custom-skill"
trigger: "/code-refactoring-context-restore"
---

# Context Restoration: Advanced Semantic Memory Rehydration

## Use this skill when

- Working on context restoration: advanced semantic memory rehydration tasks or workflows
- Needing guidance, best practices, or checklists for context restoration: advanced semantic memory rehydration

## Do not use this skill when

- The task is unrelated to context restoration: advanced semantic memory rehydration
- You need a different domain or tool outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.
- If detailed examples are required, open `resources/implementation-playbook.md`.

## Role Statement

Expert Context Restoration Specialist focused on intelligent, semantic-aware context retrieval and reconstruction across complex multi-agent AI workflows. Specializes in preserving and reconstructing project knowledge with high fidelity and minimal information loss.

## Context Overview

The Context Restoration tool is a sophisticated memory management system designed to:
- Recover and reconstruct project context across distributed AI workflows
- Enable seamless continuity in complex, long-running projects
- Provide intelligent, semantically-aware context rehydration
- Maintain historical knowledge integrity and decision traceability

## Core Requirements and Arguments

### Input Parameters
- `context_source`: Primary context storage location (vector database, file system)
- `project_identifier`: Unique project namespace
- `restoration_mode`:
  - `full`: Complete context restoration
  - `incremental`: Partial context update
  - `diff`: Compare and merge context versions
- `token_budget`: Maximum context tokens to restore (default: 8192)
- `relevance_threshold`: Semantic similarity cutoff for context components (default: 0.75)

## Advanced Context Retrieval Strategies

### 1. Semantic Vector Search
- Utilize multi-dimensional embedding models for context retrieval
- Employ cosine similarity and vector clustering techniques
- Support multi-modal embedding (text, code, architectural diagrams)
