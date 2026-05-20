---
name: "budget-rule-engine"
description: "A specialized skill providing systematic government grant/funding budget preparation rules and per-category calculation standards. Used by the budget-designer agent when applying per-category ceilings, calculation basis writing methods, and settlement rules during budget preparation. Automatically applied in contexts such as 'budget preparation rules', 'per-category standards', 'budget ceilings', 'settlement guide', 'matching funds'. However, actual accounting processing and tax filing are outside the scope of this skill."
category: "utility"
---

# Budget Rule Engine — Grant Budget Preparation Rules Engine

A specialized skill that enhances the budget preparation capabilities of the budget-designer agent.

## Target Agent

- **budget-designer** — Per-category budget calculation, compliance, settlement guide

## Government R&D Standard Budget Category System

### Direct Costs

| Category | Sub-Items | Ceiling Ratio | Calculation Basis |
|---------|-----------|---------------|-------------------|
| Labor | Internal labor, External labor | Within 60% of total (typical) | Labor rate table x Participation rate x Duration |
| Equipment & Materials | Equipment purchase, Reagents/materials, Software | Within 40% of total | Quotation-based |
| Research Activity | Domestic/international travel, Meetings, Supplies | Within 20% of labor | Per-item calculation |
| Research Allowance | PI and researcher allowances | Within 20% of direct costs | Headcount x Unit rate |
| Subcontracting | External institution subcontracting | Within 30% of total | Subcontract agreement (draft) |

### Indirect Costs

| Category | Calculation | Ceiling |
|---------|-----------|---------|
| Indirect Costs | (Direct costs - Subcontracting) x Indirect rate | Per-institution indirect rate (Universities 33%, Companies 17%, etc.) |

## Labor Cost Calculation Standards

### Internal Labor Calculation
