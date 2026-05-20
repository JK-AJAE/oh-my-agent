---
name: "apify-ecommerce"
description: "Extract product data, prices, reviews, and seller information from any e-commerce platform using Apify's E-commerce Scraping Tool."
category: "custom-skill"
trigger: "/apify-ecommerce"
---

# E-commerce Data Extraction

Extract product data, prices, reviews, and seller information from any e-commerce platform using Apify's E-commerce Scraping Tool.

## When to Use
- You need product, pricing, review, stock, or seller data from e-commerce sites.
- The task involves price monitoring, competitor product comparison, MAP enforcement, or review analysis.
- You need a guided workflow for extracting marketplace data and summarizing findings.

## Prerequisites

- `.env` file with `APIFY_TOKEN` (at `~/.claude/.env`)
- Node.js 20.6+ (for native `--env-file` support)

## Workflow Selection

| User Need | Workflow | Best For |
|-----------|----------|----------|
| Track prices, compare products | Workflow 1: Products & Pricing | Price monitoring, MAP compliance, competitor analysis. Add AI summary for insights. |
| Analyze reviews (sentiment or quality) | Workflow 2: Reviews | Brand perception, customer sentiment, quality issues, defect patterns |
| Find sellers across stores | Workflow 3: Sellers | Unauthorized resellers, vendor discovery via Google Shopping |

## Progress Tracking
