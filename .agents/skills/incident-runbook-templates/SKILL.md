---
name: "incident-runbook-templates"
description: "Production-ready templates for incident response runbooks covering detection, triage, mitigation, resolution, and communication."
category: "custom-skill"
trigger: "/incident-runbook-templates"
---

# Incident Runbook Templates

Production-ready templates for incident response runbooks covering detection, triage, mitigation, resolution, and communication.

## Do not use this skill when

- The task is unrelated to incident runbook templates
- You need a different domain or tool outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.
- If detailed examples are required, open `resources/implementation-playbook.md`.

## Use this skill when

- Creating incident response procedures
- Building service-specific runbooks
- Establishing escalation paths
- Documenting recovery procedures
- Responding to active incidents
- Onboarding on-call engineers

## Core Concepts

### 1. Incident Severity Levels

| Severity | Impact | Response Time | Example |
|----------|--------|---------------|---------|
| **SEV1** | Complete outage, data loss | 15 min | Production down |
| **SEV2** | Major degradation | 30 min | Critical feature broken |
| **SEV3** | Minor impact | 2 hours | Non-critical bug |
| **SEV4** | Minimal impact | Next business day | Cosmetic issue |

### 2. Runbook Structure
