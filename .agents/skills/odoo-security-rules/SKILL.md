---
name: "odoo-security-rules"
description: "Expert in Odoo access control: ir.model.access.csv, record rules (ir.rule), groups, and multi-company security patterns."
category: "custom-skill"
trigger: "/odoo-security-rules"
---

# Odoo Security Rules

## Overview

Security in Odoo is managed at two levels: **model-level access** (who can read/write which models) and **record-level rules** (which records a user can see). This skill helps you write correct `ir.model.access.csv` entries and `ir.rule` domain-based record rules.

## When to Use This Skill

- Setting up access rights for a new custom module.
- Restricting records so users only see their own data or their company's data.
- Debugging "Access Denied" or "You are not allowed to access" errors.
- Implementing multi-company record visibility rules.

## How It Works

1. **Activate**: Mention `@odoo-security-rules` and describe the access scenario.
2. **Generate**: Get correct CSV access lines and XML record rules.
3. **Debug**: Paste an access error and get a diagnosis with the fix.

## Examples

### Example 1: ir.model.access.csv
