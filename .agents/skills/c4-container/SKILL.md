---
name: "c4-container"
description: "Expert C4 Container-level documentation specialist."
category: "custom-skill"
trigger: "/c4-container"
---

# C4 Container Level: System Deployment

## Use this skill when

- Working on c4 container level: system deployment tasks or workflows
- Needing guidance, best practices, or checklists for c4 container level: system deployment

## Do not use this skill when

- The task is unrelated to c4 container level: system deployment
- You need a different domain or tool outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.
- If detailed examples are required, open `resources/implementation-playbook.md`.

## Containers

### [Container Name]

- **Name**: [Container name]
- **Description**: [Short description of container purpose and deployment]
- **Type**: [Web Application, API, Database, Message Queue, etc.]
- **Technology**: [Primary technologies: Node.js, Python, PostgreSQL, Redis, etc.]
- **Deployment**: [Docker, Kubernetes, Cloud Service, etc.]

## Purpose

[Detailed description of what this container does and how it's deployed]

## Components

This container deploys the following components:

- [Component Name]: [Description]
  - Documentation: c4-component-name.md

## Interfaces

### [API/Interface Name]

- **Protocol**: [REST/GraphQL/gRPC/Events/etc.]
- **Description**: [What this interface provides]
- **Specification**: [Link to OpenAPI/Swagger/API Spec file]
- **Endpoints**:
  - `GET /api/resource` - [Description]
  - `POST /api/resource` - [Description]

## Dependencies

### Containers Used

- [Container Name]: [How it's used, communication protocol]

### External Systems

- [External System]: [How it's used, integration type]

## Infrastructure

- **Deployment Config**: [Link to Dockerfile, K8s manifest, etc.]
- **Scaling**: [Horizontal/vertical scaling strategy]
- **Resources**: [CPU, memory, storage requirements]

## Container Diagram

Use proper Mermaid C4Container syntax:
