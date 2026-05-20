---
name: "odoo-woocommerce-bridge"
description: "Sync Odoo with WooCommerce: products, inventory, orders, and customers via WooCommerce REST API and Odoo external API."
category: "custom-skill"
trigger: "/odoo-woocommerce-bridge"
---

# Odoo ↔ WooCommerce Bridge

## Overview

This skill guides you through building a reliable sync bridge between Odoo (the back-office ERP) and WooCommerce (the WordPress online store). It covers product catalog sync, real-time inventory updates, order import, and customer record management.

## When to Use This Skill

- Running a WooCommerce store with Odoo for inventory and fulfillment.
- Automatically pulling WooCommerce orders into Odoo as sale orders.
- Keeping WooCommerce product stock in sync with Odoo's warehouse.
- Mapping WooCommerce order statuses to Odoo delivery states.

## How It Works

1. **Activate**: Mention `@odoo-woocommerce-bridge` and describe your sync requirements.
2. **Design**: Get the field mapping table between WooCommerce and Odoo objects.
3. **Build**: Receive Python integration scripts using the WooCommerce REST API.

## Field Mapping: WooCommerce → Odoo

| WooCommerce | Odoo |
|---|---|
| `products` | `product.template` + `product.product` |
| `orders` | `sale.order` + `sale.order.line` |
| `customers` | `res.partner` |
| `stock_quantity` | `stock.quant` |
| `sku` | `product.product.default_code` |
| `order status: processing` | Sale Order: `sale` (confirmed) |
| `order status: completed` | Delivery: `done` |

## Examples

### Example 1: Pull WooCommerce Orders into Odoo (Python)
