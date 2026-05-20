---
name: "aws-iam-best-practices"
description: "IAM policy review, hardening, and least privilege implementation"
category: "custom-skill"
trigger: "/aws-iam-best-practices"
---

# AWS IAM Best Practices

Review and harden IAM policies following AWS security best practices and least privilege principles.

## When to Use
Use this skill when you need to review IAM policies, implement least privilege access, or harden IAM security.

## Core Principles

**Least Privilege**
- Grant minimum permissions needed
- Use managed policies when possible
- Avoid wildcard (*) permissions
- Regular access reviews

**Defense in Depth**
- Enable MFA for all users
- Use IAM roles instead of access keys
- Implement service control policies (SCPs)
- Enable CloudTrail for audit

**Separation of Duties**
- Separate admin and user roles
- Use different roles for different environments
- Implement approval workflows
- Regular permission audits

## IAM Security Checks

### Find Overly Permissive Policies
