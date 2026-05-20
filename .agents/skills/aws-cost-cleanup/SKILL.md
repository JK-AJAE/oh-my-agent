---
name: "aws-cost-cleanup"
description: "Automated cleanup of unused AWS resources to reduce costs"
category: "custom-skill"
trigger: "/aws-cost-cleanup"
---

# AWS Cost Cleanup

Automate the identification and removal of unused AWS resources to eliminate waste.

## When to Use This Skill

Use this skill when you need to automatically clean up unused AWS resources to reduce costs and eliminate waste.

## Automated Cleanup Targets

**Storage**
- Unattached EBS volumes
- Old EBS snapshots (>90 days)
- Incomplete multipart S3 uploads
- Old S3 versions in versioned buckets

**Compute**
- Stopped EC2 instances (>30 days)
- Unused AMIs and associated snapshots
- Unused Elastic IPs

**Networking**
- Unused Elastic Load Balancers
- Unused NAT Gateways
- Orphaned ENIs

## Cleanup Scripts

### Safe Cleanup (Dry-Run First)
