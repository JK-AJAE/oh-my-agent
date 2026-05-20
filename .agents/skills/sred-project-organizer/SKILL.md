---
name: "sred-project-organizer"
description: "Take a list of projects and their related documentation, and organize them into the SRED format for submission."
category: "custom-skill"
trigger: "/sred-project-organizer"
---

# SRED Project Organization

SRED expects projects to be presented in a particular format. Take the list of projects that have been worked on in the past year, and summarize them into the format expected by SRED, with the supporting evidence. Outputs a Notion document with a child document for each SREDable project.

## When to Use
- You need to turn a prior-year work summary into SRED-formatted project documents.
- The task involves classifying projects as SREDable, collecting evidence, and organizing output in Notion.
- You already have or are ready to generate the upstream work summary that this organizer depends on.

# Prerequisites

Before starting make sure that Github, Notion and Linear can be accessed. Notion and Linear should be connected using an MCP. Github can be connected with an MCP, but if you have access to the `gh` CLI tool, you can use that instead.

If any of these can't be accessed, prompt the user to grant access before proceeding.

# Process

## Step 1

Prompt the user for a link a Notion document, which is a Work Summary for the previous year produced by the `sred-work-summary` skill.

Ensure:
- The notion links to a valid document that roughly matches this format:
