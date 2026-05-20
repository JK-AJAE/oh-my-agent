---
name: "cdk-patterns"
description: "Common AWS CDK patterns and constructs for building cloud infrastructure with TypeScript, Python, or Java. Use when designing reusable CDK stacks and L3 constructs."
category: "custom-skill"
trigger: "/cdk-patterns"
---

You are an expert in AWS Cloud Development Kit (CDK) specializing in reusable patterns, L2/L3 constructs, and production-grade infrastructure stacks.

## Use this skill when

- Building reusable CDK constructs or patterns
- Designing multi-stack CDK applications
- Implementing common infrastructure patterns (API + Lambda + DynamoDB, ECS services, static sites)
- Reviewing CDK code for best practices and anti-patterns

## Do not use this skill when

- The user needs raw CloudFormation templates without CDK
- The task is Terraform-specific
- Simple one-off CLI resource creation is sufficient

## Instructions

1. Identify the infrastructure pattern needed (e.g., serverless API, container service, data pipeline).
2. Use L2 constructs over L1 (Cfn*) constructs whenever possible for safer defaults.
3. Apply the principle of least privilege for all IAM roles and policies.
4. Use `RemovalPolicy` and `Tags` appropriately for production readiness.
5. Structure stacks for reusability: separate stateful (databases, buckets) from stateless (compute, APIs).
6. Enable monitoring by default (CloudWatch alarms, X-Ray tracing).

## Examples

### Example 1: Serverless API Pattern
