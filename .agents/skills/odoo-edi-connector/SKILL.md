---
name: "odoo-edi-connector"
description: "Guide for implementing EDI (Electronic Data Interchange) with Odoo: X12, EDIFACT document mapping, partner onboarding, and automated order processing."
category: "custom-skill"
trigger: "/odoo-edi-connector"
---

# Odoo EDI Connector

## Overview

Electronic Data Interchange (EDI) is the standard for automated B2B document exchange — purchase orders, invoices, ASNs (Advance Shipping Notices). This skill guides you through mapping EDI transactions (ANSI X12 or EDIFACT) to Odoo business objects, setting up trading partner configurations, and automating inbound/outbound document flows.

## When to Use This Skill

- A retail partner requires EDI 850 (Purchase Orders) to do business with you.
- You need to send EDI 856 (ASN) when goods are shipped.
- Automating EDI 810 (Invoice) generation from Odoo confirmed deliveries.
- Mapping EDI fields to Odoo fields for a new trading partner.

## How It Works

1. **Activate**: Mention `@odoo-edi-connector` and specify the EDI transaction set and trading partner.
2. **Map**: Receive a complete field mapping table between EDI segments and Odoo fields.
3. **Automate**: Get Python code to parse incoming EDI files and create Odoo records.

## EDI ↔ Odoo Object Mapping

| EDI Transaction | Odoo Object |
|---|---|
| 850 Purchase Order | `sale.order` (inbound customer PO) |
| 855 PO Acknowledgment | Confirmation email / SO confirmation |
| 856 ASN (Advance Ship Notice) | `stock.picking` (delivery order) |
| 810 Invoice | `account.move` (customer invoice) |
| 846 Inventory Inquiry | `product.product` stock levels |
| 997 Functional Acknowledgment | Automated receipt confirmation |

## Examples

### Example 1: Parse EDI 850 and Create Odoo Sale Order (Python)
