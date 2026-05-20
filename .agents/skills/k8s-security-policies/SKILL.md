---
name: "k8s-security-policies"
description: "Comprehensive guide for implementing NetworkPolicy, PodSecurityPolicy, RBAC, and Pod Security Standards in Kubernetes."
category: "custom-skill"
trigger: "/k8s-security-policies"
---

# Kubernetes Security Policies

Comprehensive guide for implementing NetworkPolicy, PodSecurityPolicy, RBAC, and Pod Security Standards in Kubernetes.

## Do not use this skill when

- The task is unrelated to kubernetes security policies
- You need a different domain or tool outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.
- If detailed examples are required, open `resources/implementation-playbook.md`.

## Purpose

Implement defense-in-depth security for Kubernetes clusters using network policies, pod security standards, and RBAC.

## Use this skill when

- Implement network segmentation
- Configure pod security standards
- Set up RBAC for least-privilege access
- Create security policies for compliance
- Implement admission control
- Secure multi-tenant clusters

## Pod Security Standards

### 1. Privileged (Unrestricted)
