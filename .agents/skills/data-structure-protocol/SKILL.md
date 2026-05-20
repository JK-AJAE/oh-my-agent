---
name: "data-structure-protocol"
description: "Give agents persistent structural memory of a codebase — navigate dependencies, track public APIs, and understand why connections exist without re-reading the whole repo."
category: "custom-skill"
trigger: "/data-structure-protocol"
---

# Data Structure Protocol (DSP)

LLM coding agents lose context between tasks. On large codebases they spend most of their tokens on "orientation" — figuring out where things live, what depends on what, and what is safe to change. DSP solves this by externalizing the project's structural map into a persistent, queryable graph stored in a `.dsp/` directory next to the code.

DSP is NOT documentation for humans and NOT an AST dump. It captures three things: **meaning** (why an entity exists), **boundaries** (what it imports and exposes), and **reasons** (why each connection exists). This is enough for an agent to navigate, refactor, and generate code without loading the entire source tree into the context window.

## When to Use
Use this skill when:
- The project has a `.dsp/` directory (DSP is already set up)
- The user asks to set up DSP, bootstrap, or map a project's structure
- Creating, modifying, or deleting code files in a DSP-tracked project (to keep the graph updated)
- Navigating project structure, understanding dependencies, or finding specific modules
- The user mentions DSP, dsp-cli, `.dsp`, or structure mapping
- Performing impact analysis before a refactor or dependency replacement

## Core Concepts

### Code = graph

DSP models the codebase as a directed graph. Nodes are **entities**, edges are **imports** and **shared/exports**.

Two entity kinds exist:
- **Object**: any "thing" that isn't a function (module/file/class/config/resource/external dependency)
- **Function**: an exported function/method/handler/pipeline

### Identity by UID, not by file path

Every entity gets a stable UID: `obj-<8hex>` for objects, `func-<8hex>` for functions. File paths are attributes that can change; UIDs survive renames, moves, and reformatting.

For entities inside a file, the UID is anchored with a comment marker in source code:
