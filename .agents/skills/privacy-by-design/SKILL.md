---
name: "privacy-by-design"
description: "Use when building apps that collect user data. Ensures privacy protections are built in from the start—data minimization, consent, encryption."
category: "custom-skill"
trigger: "/privacy-by-design"
---

# Privacy by Design

## Overview

Integrate privacy protections into software architecture from the beginning, not as an afterthought. This skill applies Privacy by Design principles (GDPR Article 25, Cavoukian's framework) when designing databases, APIs, and user flows. Protects real users' data and builds trust.

## When to Use This Skill

- Use when building apps that collect personal data (names, emails, locations, preferences)
- Use when designing database schemas, APIs, or authentication flows
- Use when the user mentions forms, user accounts, analytics, or third-party integrations
- Use when deploying to production—verify privacy controls before launch

## Legal Frameworks

**GDPR (EU)** — Primary reference. Article 25 mandates "data protection by design and by default." Applies to EU users and often adopted globally.

**CCPA (California)** — Right to know, delete, opt-out of sale. Similar principles: minimize, disclose, allow control.

**LGPD (Brazil)** — Aligned with GDPR. Purpose limitation, necessity, transparency. Applies to Brazil users.

Design for the strictest framework you target; it often satisfies others.

---

## Core Principles

### 1. Data Minimization
Collect only what is strictly necessary. Every field needs a documented justification. Avoid "we might need it later."

### 2. Purpose Limitation
Store the purpose of each data point. Do not reuse data for purposes the user did not consent to.

### 3. Storage Limitation
Define retention periods. Implement automated deletion or anonymization when retention expires. Never keep data "forever" by default.

### 4. Privacy as Default
Opt-in for optional collection, not opt-out. Sensitive settings (analytics, marketing) off by default. No pre-checked consent boxes.

### 5. End-to-End Security
Encrypt at rest and in transit. Use RBAC. Log access to sensitive data for audit.

### 6. Transparency
Document what is collected and why. Clear privacy policies. Easy access and deletion for users.

---

## User Rights (GDPR)

Ensure these are implementable from day one:

| Right | What to build |
|-------|---------------|
| **Access** | Endpoint or flow to return all user data |
| **Rectification** | Ability to update/correct data |
| **Erasure** | Account deletion + data purge (including backups) |
| **Portability** | Export data in machine-readable format (JSON, CSV) |

---

## Deep Dive: Why It Matters

**Data minimization** — Less data = less breach impact, lower storage cost, simpler compliance. Each field is a liability.

**Purpose limitation** — Reusing data without consent is illegal under GDPR. Document purpose in schema or metadata.

**Retention** — Indefinite storage increases risk and violates GDPR. Define `retention_days` per data type; automate cleanup.

**Logging** — Logs often leak PII. Redact emails, IDs, tokens. Use structured logging with allowlists.

**Third parties** — Every SDK (analytics, crash reporting, ads) may send data elsewhere. Audit dependencies; require consent before loading.

---

## Code Examples

### JavaScript/Node — Minimal User Model
