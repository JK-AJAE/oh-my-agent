---
name: "odoo-migration-helper"
description: "Step-by-step guide for migrating Odoo custom modules between versions (v14→v15→v16→v17). Covers API changes, deprecated methods, and view migration."
category: "custom-skill"
trigger: "/odoo-migration-helper"
---

# Odoo Migration Helper

## Overview

Migrating Odoo modules between major versions requires careful handling of API changes, deprecated methods, renamed fields, and new view syntax. This skill guides you through the migration process systematically, covering the most common breaking changes between versions.

## When to Use This Skill

- Upgrading a custom module from Odoo 14/15/16 to a newer version.
- Getting a checklist of things to check before running `odoo-upgrade`.
- Fixing deprecation warnings after a version upgrade.
- Understanding what changed between two specific Odoo versions.

## How It Works

1. **Activate**: Mention `@odoo-migration-helper`, specify your source and target versions, and paste your module code.
2. **Analyze**: Receive a list of breaking changes with before/after code fixes.
3. **Validate**: Get a migration checklist specific to your module's features.

## Key Migration Changes by Version

### Odoo 16 → 17

| Topic | Old (v16) | New (v17) |
|---|---|---|
| View visibility | `attrs="{'invisible': [...]}"` | `invisible="condition"` |
| Chatter | `<div class="oe_chatter">` | `<chatter/>` |
| Required/Readonly | `attrs="{'required': [...]}"` | `required="condition"` |
| Python minimum | 3.10 | 3.10+ |
| JS modules | Legacy `define(['web.core'])` | ES module `import` syntax |

### Odoo 15 → 16

| Topic | Old (v15) | New (v16) |
|---|---|---|
| Website published flag | `website_published = True` | `is_published = True` |
| Mail aliases | `alias_domain` on company | Moved to `mail.alias.domain` model |
| Report render | `_render_qweb_pdf()` | `_render_qweb_pdf()` (same, but signature changed) |
| Accounting move | `account.move.line` grouping | Line aggregation rules updated |
| Email threading | `mail_thread_id` | Deprecated; use `message_ids` |

## Examples

### Example 1: Migrate `attrs` visibility to Odoo 17
