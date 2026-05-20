---
name: "conductor-status"
description: "Display project status, active tracks, and next actions"
category: "custom-skill"
trigger: "/conductor-status"
---

# Conductor Status

Display the current status of the Conductor project, including overall progress, active tracks, and next actions.

## Use this skill when

- Working on conductor status tasks or workflows
- Needing guidance, best practices, or checklists for conductor status

## Do not use this skill when

- The task is unrelated to conductor status
- You need a different domain or tool outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.
- If detailed examples are required, open `resources/implementation-playbook.md`.

## Pre-flight Checks

1. Verify Conductor is initialized:
   - Check `conductor/product.md` exists
   - Check `conductor/tracks.md` exists
   - If missing: Display error and suggest running `/conductor:setup` first

2. Check for any tracks:
   - Read `conductor/tracks.md`
   - If no tracks registered: Display setup complete message with suggestion to create first track

## Data Collection

### 1. Project Information

Read `conductor/product.md` and extract:

- Project name
- Project description

### 2. Tracks Overview

Read `conductor/tracks.md` and parse:

- Total tracks count
- Completed tracks (marked `[x]`)
- In-progress tracks (marked `[~]`)
- Pending tracks (marked `[ ]`)

### 3. Detailed Track Analysis

For each track in `conductor/tracks/`:

Read `conductor/tracks/{trackId}/plan.md`:

- Count total tasks (lines matching `- [x]`, `- [~]`, `- [ ]` with Task prefix)
- Count completed tasks (`[x]`)
- Count in-progress tasks (`[~]`)
- Count pending tasks (`[ ]`)
- Identify current phase (first phase with incomplete tasks)
- Identify next pending task

Read `conductor/tracks/{trackId}/metadata.json`:

- Track type (feature, bug, chore, refactor)
- Created date
- Last updated date
- Status

Read `conductor/tracks/{trackId}/spec.md`:

- Check for any noted blockers or dependencies

### 4. Blocker Detection

Scan for potential blockers:

- Tasks marked with `BLOCKED:` prefix
- Dependencies on incomplete tracks
- Failed verification tasks

## Output Format

### Full Project Status (no argument)
