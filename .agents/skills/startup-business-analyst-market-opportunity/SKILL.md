---
name: "startup-business-analyst-market-opportunity"
description: "Generate comprehensive market opportunity analysis with TAM/SAM/SOM"
category: "custom-skill"
trigger: "/startup-business-analyst-market-opportunity"
---

# Market Opportunity Analysis

Generate a comprehensive market opportunity analysis for a startup, including Total Addressable Market (TAM), Serviceable Available Market (SAM), and Serviceable Obtainable Market (SOM) calculations using both bottom-up and top-down methodologies.

## Use this skill when

- Working on market opportunity analysis tasks or workflows
- Needing guidance, best practices, or checklists for market opportunity analysis

## Do not use this skill when

- The task is unrelated to market opportunity analysis
- You need a different domain or tool outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.
- If detailed examples are required, open `resources/implementation-playbook.md`.

## What This Command Does

This command guides through an interactive market sizing process to:
1. Define the target market and customer segments
2. Gather relevant market data
3. Calculate TAM using bottom-up methodology
4. Validate with top-down analysis
5. Narrow to SAM with appropriate filters
6. Estimate realistic SOM (3-5 year opportunity)
7. Present findings in a formatted report

## Instructions for Claude

When this command is invoked, follow these steps:

### Step 1: Gather Context

Ask the user for essential information:
- **Product/Service Description:** What problem is being solved?
- **Target Customers:** Who is the ideal customer? (industry, size, geography)
- **Business Model:** How does pricing work? (subscription, transaction, etc.)
- **Stage:** What stage is the company? (pre-launch, seed, Series A)
- **Geography:** Initial target market (US, North America, Global)

### Step 2: Activate market-sizing-analysis Skill

The market-sizing-analysis skill provides comprehensive methodologies. Reference it for:
- Bottom-up calculation frameworks
- Top-down validation approaches
- Industry-specific templates
- Data source recommendations

### Step 3: Conduct Bottom-Up Analysis

**For B2B/SaaS:**
1. Define customer segments (company size, industry, use case)
2. Estimate number of companies in each segment
3. Determine average contract value (ACV) per segment
4. Calculate TAM: Σ (Segment Size × ACV)

**For Consumer/Marketplace:**
1. Define target user demographics
2. Estimate total addressable users
3. Determine average revenue per user (ARPU)
4. Calculate TAM: Total Users × ARPU × Frequency

**For Transactions/E-commerce:**
1. Estimate total transaction volume (GMV)
2. Determine take rate or margin
3. Calculate TAM: Total GMV × Take Rate

### Step 4: Gather Market Data

Use available tools to research:
- **WebSearch:** Find industry reports, market size estimates, public company data
- **Cite all sources** with URLs and publication dates
- **Document assumptions** clearly

Recommended data sources (from skill):
- Government data (Census, BLS)
- Industry reports (Gartner, Forrester, Statista)
- Public company filings (10-K reports)
- Trade associations
- Academic research

### Step 5: Top-Down Validation

Validate bottom-up calculation:
1. Find total market category size from research
2. Apply geographic filters
3. Apply segment/product filters
4. Compare to bottom-up TAM (should be within 30%)

If variance > 30%, investigate and explain differences.

### Step 6: Calculate SAM

Apply realistic filters to narrow TAM:
- **Geographic:** Regions actually serviceable
- **Product Capability:** Features needed to serve
- **Market Readiness:** Customers ready to adopt
- **Addressable Switching:** Can reach and convert

Formula:
