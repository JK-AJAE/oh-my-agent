---
name: "chunking-strategy-guide"
description: "Methodology for systematically designing document chunking strategies for RAG pipelines. Use this skill for 'chunking strategy', 'document splitting', 'RAG chunking', 'embedding optimization', 'semantic chunking', 'text splitting', and other RAG data preprocessing tasks. Note: vector DB infrastructure construction and embedding model training are outside the scope of this skill."
category: "utility"
---

# Chunking Strategy Guide — RAG Document Chunking Strategy

A skill that enhances the data preprocessing capabilities of the rag-architect.

## Target Agents

- **rag-architect** — Effectively chunks documents to improve retrieval quality
- **eval-specialist** — Evaluates the retrieval quality of chunking strategies

## Chunking Strategy Comparison

| Strategy | Principle | Advantages | Disadvantages | Best For |
|----------|----------|-----------|--------------|---------|
| Fixed-size | Cut at N-token intervals | Simple implementation | Semantic breaks | Logs, code |
| Sentence-based | Split by sentence | Preserves meaning | Uneven sizes | News, blogs |
| Paragraph-based | Split at blank lines | Maintains logical units | Paragraph size variance | Documents, reports |
| Semantic | Based on embedding similarity | Highest quality | Slow, costly | Complex documents |
| Recursive | Hierarchical separators | Balanced | Complex configuration | General-purpose |
| Markdown | Based on headings | Preserves structure | MD-only | Technical docs |

## Chunking Parameter Guide

### Optimal Chunk Sizes
