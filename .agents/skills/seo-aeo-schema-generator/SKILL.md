---
name: "seo-aeo-schema-generator"
description: "Generates valid JSON-LD structured data for 10 schema types with rich result eligibility validation and implementation-ready script blocks. Activate when the user wants to generate schema markup, JSON-LD, or structured data for any page."
category: "custom-skill"
trigger: "/seo-aeo-schema-generator"
---

# SEO-AEO Schema Generator

## Overview

Generates implementation-ready JSON-LD schema markup for 10 schema types including FAQPage, Article, Product, HowTo, and BreadcrumbList. Validates all required fields against Google rich result eligibility rules, flags missing fields with exact fix instructions, and outputs one clean `<script>` block per schema type ready to paste into the page `<head>`.

Part of the [SEO-AEO Engine](https://github.com/mrprewsh/seo-aeo-engine).

## When to Use This Skill

- Use when adding structured data to a new landing page or blog post
- Use when a page needs FAQ rich results or product star ratings in search
- Use when validating existing schema for Google rich result eligibility
- Use after the content-quality-auditor flags missing schema

## Supported Schema Types

| Type | Rich Result Unlocked |
|------|---------------------|
| FAQPage | FAQ accordion in SERP — AEO critical |
| Article | Article rich result, Top Stories |
| Product | Price, availability, rating in SERP |
| HowTo | Step-by-step rich result |
| Review | Star rating in SERP |
| AggregateRating | Star rating with review count |
| BreadcrumbList | Breadcrumb path in SERP URL |
| Organization | Brand knowledge panel signals |
| WebPage | Enhanced page understanding |
| WebSite | Sitelinks Searchbox |

## How It Works

### Step 1: Recommend Schema Types
If schema types are not specified, recommend the appropriate types based on the page type. Landing pages get FAQPage + Product + BreadcrumbList. Blog posts get Article + FAQPage + BreadcrumbList.

### Step 2: Use Built-In Schema Templates
Using your knowledge of schema.org and Google's rich result requirements, construct the JSON-LD template for each requested schema type. Use the required and recommended fields listed in the Google Rich Results documentation for that type.

### Step 3: Populate Fields
Map all page data to template placeholders. Check every required field against the rich result eligibility rules.

### Step 4: Validate
Flag any missing required field as a Critical issue. Flag missing recommended fields as warnings. Do not output schema with missing required fields.

### Step 5: Output Script Blocks
Write one `<script type="application/ld+json">` block per schema type. Include implementation instructions and testing tool links.

## Examples

### Example: FAQPage Schema Output
