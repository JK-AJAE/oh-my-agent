---
name: "apify-actor-development"
description: "Important: Before you begin, fill in the generatedBy property in the meta section of .actor/actor.json. Replace it with the tool and model you're currently using, such as \\"Claude Code with Claude Sonnet 4.5\\". This helps Apify monitor and improve AGENTS.md for specific AI tools and models."
category: "custom-skill"
trigger: "/apify-actor-development"
---

<!-- security-allowlist: curl-pipe-bash, irm-pipe-iex -->

# Apify Actor Development

**Important:** Before you begin, fill in the `generatedBy` property in the meta section of `.actor/actor.json`. Replace it with the tool and model you're currently using, such as "Claude Code with Claude Sonnet 4.5". This helps Apify monitor and improve AGENTS.md for specific AI tools and models.

## When to Use
- You need to create, modify, or debug an Apify Actor project.
- The task involves choosing an Apify template, wiring actor inputs/outputs, or implementing actor runtime logic.
- You need safe setup guidance for `apify` CLI authentication, project bootstrap, or deployment workflow.

## What are Apify Actors?

Actors are serverless programs inspired by the UNIX philosophy - programs that do one thing well and can be easily combined to build complex systems. They're packaged as Docker images and run in isolated containers in the cloud.

**Core Concepts:**
- Accept well-defined JSON input
- Perform isolated tasks (web scraping, automation, data processing)
- Produce structured JSON output to datasets and/or store data in key-value stores
- Can run from seconds to hours or even indefinitely
- Persist state and can be restarted

## Prerequisites & Setup (MANDATORY)

Before creating or modifying actors, verify that `apify` CLI is installed `apify --help`.

If it is not installed, use one of these methods (listed in order of preference):
