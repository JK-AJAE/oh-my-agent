---
name: "kubernetes-deployment"
description: "Kubernetes deployment workflow for container orchestration, Helm charts, service mesh, and production-ready K8s configurations."
category: "custom-skill"
trigger: "/kubernetes-deployment"
---

# Kubernetes Deployment Workflow

## Overview

Specialized workflow for deploying applications to Kubernetes including container orchestration, Helm charts, service mesh configuration, and production-ready K8s patterns.

## When to Use This Workflow

Use this workflow when:
- Deploying to Kubernetes
- Creating Helm charts
- Configuring service mesh
- Setting up K8s networking
- Implementing K8s security

## Workflow Phases

### Phase 1: Container Preparation

#### Skills to Invoke
- `docker-expert` - Docker containerization
- `k8s-manifest-generator` - K8s manifests

#### Actions
1. Create Dockerfile
2. Build container image
3. Optimize image size
4. Push to registry
5. Test container

#### Copy-Paste Prompts
