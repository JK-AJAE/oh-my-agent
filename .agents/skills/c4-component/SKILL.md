---
name: "c4-component"
description: "Expert C4 Component-level documentation specialist. Synthesizes C4 Code-level documentation into Component-level architecture, defining component boundaries, interfaces, and relationships."
category: "custom-skill"
trigger: "/c4-component"
---

# C4 Component Level: [Component Name]

## Use this skill when

- Working on c4 component level: [component name] tasks or workflows
- Needing guidance, best practices, or checklists for c4 component level: [component name]

## Do not use this skill when

- The task is unrelated to c4 component level: [component name]
- You need a different domain or tool outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.
- If detailed examples are required, open `resources/implementation-playbook.md`.

## Overview

- **Name**: [Component name]
- **Description**: [Short description of component purpose]
- **Type**: [Component type: Application, Service, Library, etc.]
- **Technology**: [Primary technologies used]

## Purpose

[Detailed description of what this component does and what problems it solves]

## Software Features

- [Feature 1]: [Description]
- [Feature 2]: [Description]
- [Feature 3]: [Description]

## Code Elements

This component contains the following code-level elements:

- c4-code-file-1.md - [Description]
- c4-code-file-2.md - [Description]

## Interfaces

### [Interface Name]

- **Protocol**: [REST/GraphQL/gRPC/Events/etc.]
- **Description**: [What this interface provides]
- **Operations**:
  - `operationName(params): ReturnType` - [Description]

## Dependencies

### Components Used

- [Component Name]: [How it's used]

### External Systems

- [External System]: [How it's used]

## Component Diagram

Use proper Mermaid C4Component syntax. Component diagrams show components **within a single container**:
