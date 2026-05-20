---
name: "aws-security-audit"
description: "Comprehensive AWS security posture assessment using AWS CLI and security best practices"
category: "custom-skill"
trigger: "/aws-security-audit"
---

# AWS Security Audit

Perform comprehensive security assessments of AWS environments to identify vulnerabilities and misconfigurations.

## When to Use
Use this skill when you need to audit AWS security posture, identify vulnerabilities, or prepare for compliance assessments.

## Audit Categories

**Identity & Access Management**
- Overly permissive IAM policies
- Unused IAM users and roles
- MFA enforcement gaps
- Root account usage
- Access key rotation

**Network Security**
- Open security groups (0.0.0.0/0)
- Public S3 buckets
- Unencrypted data in transit
- VPC flow logs disabled
- Network ACL misconfigurations

**Data Protection**
- Unencrypted EBS volumes
- Unencrypted RDS instances
- S3 bucket encryption disabled
- Backup policies missing
- KMS key rotation disabled

**Logging & Monitoring**
- CloudTrail disabled
- CloudWatch alarms missing
- VPC Flow Logs disabled
- S3 access logging disabled
- Config recording disabled

## Security Audit Commands

### IAM Security Checks
