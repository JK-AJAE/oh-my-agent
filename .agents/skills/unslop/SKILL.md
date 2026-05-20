---
name: "unslop"
description: "Post-process AI-generated text through the unslop CLI to strip AI writing patterns before publishing"
category: "custom-skill"
trigger: "/unslop"
---

# unslop — Strip AI Writing Patterns via CLI

## Overview

unslop is a CLI tool that post-processes text to remove AI writing patterns programmatically. Unlike skills that ask the agent to avoid AI-isms, unslop runs as a deterministic pipeline step: pipe text in, get clean text out. Use it as a final pass before committing docs, publishing posts, or sending any AI-generated content to production.

The `--deterministic` flag makes output reproducible — same input always produces same output. The `--stdin` flag reads from stdin, enabling shell pipeline composition.

## When to Use This Skill

- When you have AI-generated text ready to publish and want a final cleanup pass
- When working in a shell pipeline where text quality needs to be enforced automatically
- When writing commit hooks or CI steps that validate content before it ships
- When you need reproducible text normalization across multiple runs

## Setup

Install once:
