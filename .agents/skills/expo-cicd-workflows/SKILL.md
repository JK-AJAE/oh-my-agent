---
name: "expo-cicd-workflows"
description: "Helps understand and write EAS workflow YAML files for Expo projects. Use this skill when the user asks about CI/CD or workflows in an Expo or EAS context, mentions .eas/workflows/, or wants help with EAS build pipelines or deployment automation."
category: "custom-skill"
trigger: "/expo-cicd-workflows"
---

# EAS Workflows Skill

Help developers write and edit EAS CI/CD workflow YAML files.

## When to Use
- You need to create, edit, or validate `.eas/workflows/*.yml` files for an Expo project.
- The task involves EAS build pipelines, deployment automation, workflow triggers, or Expo CI/CD configuration.
- You need schema-backed workflow guidance rather than relying on stale memorized syntax.

## Reference Documentation

Fetch these resources before generating or validating workflow files. Use the fetch script (implemented using Node.js) in this skill's `scripts/` directory; it caches responses using ETags for efficiency:
