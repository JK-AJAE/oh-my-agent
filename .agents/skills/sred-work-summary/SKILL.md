---
name: "sred-work-summary"
description: "Go back through the previous year of work and create a Notion doc that groups relevant links into projects that can then be documented as SRED projects."
category: "custom-skill"
trigger: "/sred-work-summary"
---

# SRED Work Summary

Collect all the Github PRs, Notion docs and Linear tickets a person completed in a given year. Group the links from all of those into projects. Put everything into a private Notion document and return a link to that document.

## When to Use
- You need to gather a year's worth of PRs, Notion docs, and Linear tickets into project groupings for SRED preparation.
- The task is to build the upstream Notion work summary before writing individual SRED project descriptions.
- You need a repeatable collection workflow across GitHub, Notion, and Linear for a fixed time window.

## Prerequisites

Before starting make sure that Github, Notion and Linear can be accessed. Notion and Linear should be connected using an MCP. Github can be connected with an MCP, but if you have access to the `gh` CLI tool, you can use that instead.

If any of these can't be accessed, prompt the user to grant access before proceeding.

## Process

### Step 1
