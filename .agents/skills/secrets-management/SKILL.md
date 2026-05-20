---
name: "secrets-management"
description: "Secure secrets management practices for CI/CD pipelines using Vault, AWS Secrets Manager, and other tools."
category: "custom-skill"
trigger: "/secrets-management"
---

# Secrets Management

Secure secrets management practices for CI/CD pipelines using Vault, AWS Secrets Manager, and other tools.

## Purpose

Implement secure secrets management in CI/CD pipelines without hardcoding sensitive information.

## Use this skill when

- Store API keys and credentials
- Manage database passwords
- Handle TLS certificates
- Rotate secrets automatically
- Implement least-privilege access

## Do not use this skill when

- You plan to hardcode secrets in source control
- You cannot secure access to the secrets backend
- You only need local development values without sharing

## Instructions

1. Identify secret types, owners, and rotation requirements.
2. Choose a secrets backend and access model.
3. Integrate CI/CD or runtime retrieval with least privilege.
4. Validate rotation and audit logging.

## Safety

- Never commit secrets to source control.
- Limit access and log secret usage for auditing.

## Secrets Management Tools

### HashiCorp Vault
- Centralized secrets management
- Dynamic secrets generation
- Secret rotation
- Audit logging
- Fine-grained access control

### AWS Secrets Manager
- AWS-native solution
- Automatic rotation
- Integration with RDS
- CloudFormation support

### Azure Key Vault
- Azure-native solution
- HSM-backed keys
- Certificate management
- RBAC integration

### Google Secret Manager
- GCP-native solution
- Versioning
- IAM integration

## HashiCorp Vault Integration

### Setup Vault
