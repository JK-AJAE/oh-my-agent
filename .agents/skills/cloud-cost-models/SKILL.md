---
name: "cloud-cost-models"
description: "AWS/GCP/Azure cost models, sizing guides, Reserved Instance/Savings Plan strategies, and FinOps framework guide. Use this skill for 'cloud costs', 'cost optimization', 'FinOps', 'instance sizing', 'Savings Plan', 'reserved instances', 'Spot instances', 'cost estimation', and other infrastructure cost-related decisions. Enhances the cost analysis capabilities of cost-optimizer. Note: actual resource provisioning and billing configuration are outside the scope of this skill."
category: "utility"
---

# Cloud Cost Models — Cloud Cost Model and FinOps Guide

A practical guide for accurately estimating and optimizing cloud infrastructure costs.

## AWS Core Service Cost Models

### EC2 Purchase Option Comparison (ap-northeast-2 basis)

| Option | Discount | Commitment | Flexibility | Suitable Workload |
|--------|---------|-----------|------------|-------------------|
| On-Demand | 0% | None | Maximum | Variable workloads, testing |
| Savings Plan (Compute) | ~30% | 1 year | Instance changeable | Stable baseline load |
| Savings Plan (EC2) | ~40% | 1 year | Within family | Predictable workloads |
| Reserved Instance | ~40% | 1yr/3yr | Limited | 24/7 servers |
| Spot Instance | ~70% | None | Interruptible | Batch, CI/CD, ML |

### Sizing Decision Table
