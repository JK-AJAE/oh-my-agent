---
name: "aws-cost-optimizer"
description: "Comprehensive AWS cost analysis and optimization recommendations using AWS CLI and Cost Explorer"
category: "custom-skill"
trigger: "/aws-cost-optimizer"
---

# AWS Cost Optimizer

Analyze AWS spending patterns, identify waste, and provide actionable cost reduction strategies.

## When to Use This Skill

Use this skill when you need to analyze AWS spending, identify cost optimization opportunities, or reduce cloud waste.

## Core Capabilities

**Cost Analysis**
- Parse AWS Cost Explorer data for trends and anomalies
- Break down costs by service, region, and resource tags
- Identify month-over-month spending increases

**Resource Optimization**
- Detect idle EC2 instances (low CPU utilization)
- Find unattached EBS volumes and old snapshots
- Identify unused Elastic IPs
- Locate underutilized RDS instances
- Find old S3 objects eligible for lifecycle policies

**Savings Recommendations**
- Suggest Reserved Instance/Savings Plans opportunities
- Recommend instance rightsizing based on CloudWatch metrics
- Identify resources in expensive regions
- Calculate potential savings with specific actions

## AWS CLI Commands

### Get Cost and Usage
