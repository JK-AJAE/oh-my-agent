---
name: "clause-risk-database"
description: "A risk clause database that systematically identifies and grades risk patterns in contract clauses. The 'risk-assessor' and 'clause-analyst' agents must use this skill's pattern DB and scoring methodology when evaluating clause-level risk in contracts. Used for clause-level risk assessment tasks such as 'risk clause analysis', 'disadvantageous clause identification', 'risk scoring', etc. Note: Overall contract orchestration or contract drafting itself is outside the scope of this skill."
category: "domain"
---

# Clause Risk Database — Risk Clause Pattern DB and Scoring Engine

A specialized knowledge base that identifies risk patterns in contract clauses and calculates quantitative risk scores.

## Risk Clause Pattern Classification System

### Tier 1: Critical Risk (80-100 points)

| Pattern ID | Pattern Name | Description | Representative Wording |
|-----------|-------------|-------------|----------------------|
| C-01 | Unlimited Liability | Full liability without cap | "shall indemnify all damages" |
| C-02 | Unilateral Termination | Only the counterparty can terminate unconditionally | "Party A may terminate immediately without cause" |
| C-03 | Blanket Indemnification | Complete exemption of counterparty's liability | "Party A shall not be liable under any circumstances" |
| C-04 | Unlimited IP Transfer | Transfer of all IP without consideration | "All rights to deliverables shall vest in Party A" |
| C-05 | Excessive Non-Compete | Non-compete with excessive scope in duration, geography, and range | "Prohibited from working in the same industry for 2 years" |

### Tier 2: High Risk (60-79 points)

| Pattern ID | Pattern Name | Description | Representative Wording |
|-----------|-------------|-------------|----------------------|
| H-01 | Auto-Renewal Trap | Excessive notice period + automatic renewal | "Auto-renews for 1 year without 60-day prior notice" |
| H-02 | Excessive Delay Penalties | Delay penalty rate exceeding market standard | "1% of contract amount per day of delay" |
| H-03 | Infinite Acceptance Loop | No limit on acceptance review count/duration | "Revisions shall continue until Party A is satisfied" |
| H-04 | One-Sided Confidentiality | Confidentiality obligation imposed on one party only | "Party B shall not disclose the contents of this contract" |
| H-05 | Unfavorable Jurisdiction | Exclusive jurisdiction at counterparty's location | "Court at Party A's headquarters location" |

### Tier 3: Medium Risk (40-59 points)

| Pattern ID | Pattern Name | Description |
|-----------|-------------|-------------|
| M-01 | Delayed Payment | Payment terms exceeding 60 days after acceptance |
| M-02 | Unlimited Change Requests | Lack of cost adjustment provisions for scope changes |
| M-03 | Unclear Completion Criteria | Ambiguous completion/acceptance standards |
| M-04 | Excessive Warranty Period | Warranty period exceeding industry standard |
| M-05 | Unspecified Governing Law | Unclear governing law in international transactions |

### Tier 4: Low Risk (20-39 points)

| Pattern ID | Pattern Name | Description |
|-----------|-------------|-------------|
| L-01 | Insufficient Notice Provisions | Absence of written/email notification rules |
| L-02 | No Assignment Restriction | Absence of restrictions on transfer of contractual rights/obligations |
| L-03 | Missing Force Majeure | Absence of force majeure exemption clause |

## Risk Scoring Algorithm

### Individual Clause Score Calculation
