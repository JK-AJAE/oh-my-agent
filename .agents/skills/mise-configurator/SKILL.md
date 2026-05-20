---
name: "mise-configurator"
description: "Generate production-ready mise.toml setups for local development, CI/CD pipelines, and toolchain standardization."
category: "custom-skill"
trigger: "/mise-configurator"
---

# Mise Configurator

## Overview

This skill generates clean, production-ready `mise.toml` configurations for local development environments and CI/CD pipelines.

It helps standardize runtime versions, simplify onboarding, replace legacy version managers like `asdf`, `nvm`, and `pyenv`, and create reproducible multi-language environments with minimal setup effort.

## When to Use This Skill

- Use when you need to create or update a `mise.toml`
- Use when working with Node.js, Python, Go, Rust, Java, Bun, Terraform, or mixed stacks
- Use when the user asks about CI/CD runtime setup using mise
- Use when migrating from `.tool-versions`, `asdf`, `nvm`, or `pyenv`
- Use when standardizing tool versions across teams or monorepos

## How It Works

### Step 1: Detect Project Context

Inspect available repository files such as:

- `package.json`
- `pnpm-lock.yaml`
- `pyproject.toml`
- `requirements.txt`
- `go.mod`
- `Cargo.toml`
- `.tool-versions`
- `Dockerfile`
- GitHub Actions or CI files

Infer languages, package managers, and pinned versions.

### Step 2: Generate `mise.toml`

Create a minimal, valid, copy-paste-ready configuration using:

- existing pinned versions when found
- explicit user-provided target versions when absent
- practical defaults for developer productivity
- concrete pinned versions in shared production configs

### Step 3: Add Bootstrap Commands

Provide setup commands such as:
