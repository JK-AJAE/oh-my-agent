---
name: "n8n-expression-syntax"
description: "Validate n8n expression syntax and fix common errors. Use when writing n8n expressions, using {{}} syntax, accessing $json/$node variables, troubleshooting expression errors, or working with webhook data in workflows."
category: "custom-skill"
trigger: "/n8n-expression-syntax"
---

# n8n Expression Syntax

Expert guide for writing correct n8n expressions in workflows.

## When to Use
- You need to write or debug n8n expressions using `{{ ... }}` syntax.
- The task involves `$json`, `$node`, webhook payloads, or expression-related workflow errors.
- You want syntax-correct dynamic values inside n8n nodes and parameters.

---

## Expression Format

All dynamic content in n8n uses **double curly braces**:
