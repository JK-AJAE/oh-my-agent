---
name: "conductor-setup"
description: "Configure a Rails project to work with Conductor (parallel coding agents)"
category: "custom-skill"
trigger: "/conductor-setup"
---

Set up this Rails project for Conductor, the Mac app for parallel coding agents.

## When to Use
- You need to configure a Rails project so it runs correctly inside Conductor workspaces.
- The project should support parallel coding agents with isolated ports, Redis settings, and shared secrets.
- You want the standard `conductor.json`, `bin/conductor-setup`, and `script/server` scaffolding for a Rails repo.

# What to Create

## 1. conductor.json (project root)

Create `conductor.json` in the project root if it doesn't already exist:
