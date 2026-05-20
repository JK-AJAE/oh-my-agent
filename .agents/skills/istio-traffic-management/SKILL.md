---
name: "istio-traffic-management"
description: "Comprehensive guide to Istio traffic management for production service mesh deployments."
category: "custom-skill"
trigger: "/istio-traffic-management"
---

# Istio Traffic Management

Comprehensive guide to Istio traffic management for production service mesh deployments.

## Do not use this skill when

- The task is unrelated to istio traffic management
- You need a different domain or tool outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.
- If detailed examples are required, open `resources/implementation-playbook.md`.

## Use this skill when

- Configuring service-to-service routing
- Implementing canary or blue-green deployments
- Setting up circuit breakers and retries
- Load balancing configuration
- Traffic mirroring for testing
- Fault injection for chaos engineering

## Core Concepts

### 1. Traffic Management Resources

| Resource | Purpose | Scope |
|----------|---------|-------|
| **VirtualService** | Route traffic to destinations | Host-based |
| **DestinationRule** | Define policies after routing | Service-based |
| **Gateway** | Configure ingress/egress | Cluster edge |
| **ServiceEntry** | Add external services | Mesh-wide |

### 2. Traffic Flow
