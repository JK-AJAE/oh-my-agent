---
name: "aws-secrets-rotation"
description: "Automate AWS secrets rotation for RDS, API keys, and credentials"
category: "custom-skill"
trigger: "/aws-secrets-rotation"
---

# AWS Secrets Rotation

Automate rotation of secrets, credentials, and API keys using AWS Secrets Manager and Lambda.

## When to Use
Use this skill when you need to implement automated secrets rotation, manage credentials securely, or comply with security policies requiring regular key rotation.

## Supported Secret Types

**AWS Services**
- RDS database credentials
- DocumentDB credentials
- Redshift credentials
- ElastiCache credentials

**Third-Party Services**
- API keys
- OAuth tokens
- SSH keys
- Custom credentials

## Secrets Manager Setup

### Create a Secret
