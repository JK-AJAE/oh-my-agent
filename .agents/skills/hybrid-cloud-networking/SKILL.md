---
name: "hybrid-cloud-networking"
description: "Configure secure, high-performance connectivity between on-premises and cloud environments using VPN, Direct Connect, and ExpressRoute."
category: "custom-skill"
trigger: "/hybrid-cloud-networking"
---

# Hybrid Cloud Networking

Configure secure, high-performance connectivity between on-premises and cloud environments using VPN, Direct Connect, and ExpressRoute.

## Do not use this skill when

- The task is unrelated to hybrid cloud networking
- You need a different domain or tool outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.
- If detailed examples are required, open `resources/implementation-playbook.md`.

## Purpose

Establish secure, reliable network connectivity between on-premises data centers and cloud providers (AWS, Azure, GCP).

## Use this skill when

- Connect on-premises to cloud
- Extend datacenter to cloud
- Implement hybrid active-active setups
- Meet compliance requirements
- Migrate to cloud gradually

## Connection Options

### AWS Connectivity

#### 1. Site-to-Site VPN
- IPSec VPN over internet
- Up to 1.25 Gbps per tunnel
- Cost-effective for moderate bandwidth
- Higher latency, internet-dependent
