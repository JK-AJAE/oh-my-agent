---
name: "odoo-upgrade-advisor"
description: "Step-by-step Odoo version upgrade advisor: pre-upgrade checklist, community vs enterprise upgrade path, OCA module compatibility, and post-upgrade validation."
category: "custom-skill"
trigger: "/odoo-upgrade-advisor"
---

# Odoo Upgrade Advisor

## Overview

Upgrading Odoo between major versions (e.g., v15 → v16 → v17) requires careful preparation, testing, and validation. This skill provides a structured pre-upgrade checklist, guides you through the upgrade tools (Odoo Upgrade Service and OpenUpgrade), and gives you a post-upgrade validation protocol.

## When to Use This Skill

- Planning a major Odoo version upgrade.
- Identifying which custom modules need to be migrated.
- Running the upgrade on a staging environment before production.
- Validating the system after an upgrade.

## How It Works

1. **Activate**: Mention `@odoo-upgrade-advisor`, state your current and target version.
2. **Plan**: Receive the full upgrade roadmap and risk assessment.
3. **Execute**: Get a step-by-step upgrade command sequence.

## Upgrade Paths

| From | To | Supported? | Tool |
|---|---|---|---|
| v16 | v17 | ✅ Direct | Odoo Upgrade Service / OpenUpgrade |
| v15 | v16 | ✅ Direct | Odoo Upgrade Service / OpenUpgrade |
| v14 | v15 | ✅ Direct | Odoo Upgrade Service / OpenUpgrade |
| v14 | v17 | ⚠️ Multi-hop | v14→v15→v16→v17 (cannot skip) |
| v13 or older | any | ❌ Not supported | Manual migration required |

## Examples

### Example 1: Pre-Upgrade Checklist
