---
name: "recursive-context-pruning-token-budgeting"
description: "Optimizes AI agent performance by pruning redundant context, managing token usage, and enforcing ultra-concise, direct-to-value responses."
category: "custom-skill"
trigger: "/recursive-context-pruning-token-budgeting"
---

# Recursive Context Pruning & Token Budgeting

## Overview

This skill implements a "Gatekeeper" logic to prevent context window bloat and unnecessary token expenditure. It ensures the agent only processes relevant data shards and adheres to an Atomic Precision protocol—delivering functional answers with zero conversational filler. By recursively summarizing state and stripping "bridge phrases," it maximizes the longevity and speed of long-running development workflows.

## When to Use This Skill

- Use when building multi-step agents to prevent repetition and "memory drift" in long conversations.
- Use when working with large document sets or codebases to avoid dumping entire files into the prompt.
- Use when you need purely functional output (code/logic) without "Sure! Here is your..." intros.

## How It Works

### Step 1: Metadata Sharding

Scan the available data for headers, summaries, and key indicators. Create a "map" of the context rather than injecting the full source. Never pull the entire file into the prompt unless a specific, narrowed fragment is requested.

### Step 2: Token Budget Allocation

Calculate a "Safe Response Limit" based on the current context window. Allocate 30% for current logic processing, 20% for immediate output, and 50% for a future context buffer.

### Step 3: Atomic Output Filtering

Strip all "Bridge Phrases" (e.g., "I've updated the code," "Based on your request," "Sure"). Start the response immediately with the solution or the code block.

### Step 4: Ambiguity Check

Before executing Step 3, scan for missing critical variables (e.g., specific file names or environment types). If the prompt is too ambiguous, bypass the atomic output and generate exactly one concise question to resolve the blocker.

### Step 5: Abstractive Compression

Summarize the current turn into a "compressed state string" (e.g., `[Project: Feasify | State: Auth-Fixed | Remaining-Tasks: 2]`) to discard redundant conversational data before the next prompt.

## Examples

### Example 1: Filtered Code Output (No Filler)
