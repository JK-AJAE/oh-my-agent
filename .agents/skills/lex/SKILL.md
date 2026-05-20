---
name: "lex"
description: "Centralized 'Truth Engine' for cross-jurisdictional legal context (US, EU, CA) and contract scaffolding."
category: "custom-skill"
trigger: "/lex"
---

# LEX: Legal-Entity-X-ref

## Overview

LEX is a structured truth engine designed to eliminate legal hallucinations by grounding agents in verified government references and legislation across 29+ jurisdictions. It provides deterministic context for business formation, employment, and contract drafting.

## When to Use This Skill

- Use when you need to cross-reference or compare legal requirements between different territories, such as verifying the compliance gap between an **EU SARL** and a **US LLC**.
- Use when working with foundational business or employment documents that require specific, jurisdiction-compliant clauses to be inserted into a professional scaffold.
- Use when the user asks about the specific regulatory nuances, formation steps, or "truth-based" definitions of legal entities within the **29 supported jurisdictions** (USA, Canada, and the EU).

## How It Works

### Step 1: Identify Jurisdiction
Before drafting, determine if the user's entity or contract target is in the **USA, Canada, or the EU**.

### Step 2: Search & Fetch Context
Use the CLI shortcuts to find the relevant legal patterns and templates.
- Run `lex search <query>` to find matching templates.
- Run `lex get <path>` to read the granular metadata and requirements.

### Step 3: Scaffold Drafting
Generate foundation-level documents using `lex draft <description>`. This ensures that all drafts include the mandatory AI-generated content disclaimer.

### Step 4: Verify Authority
Always include a "Verified Sources" section in your output by running `lex verify`, which fetches official government links for the retrieved context.

## Examples

### Example 1: Comparing Employment Laws
