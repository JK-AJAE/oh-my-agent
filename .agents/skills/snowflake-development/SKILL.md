---
name: "snowflake-development"
description: "Comprehensive Snowflake development assistant covering SQL best practices, data pipeline design (Dynamic Tables, Streams, Tasks, Snowpipe), Cortex AI functions, Cortex Agents, Snowpark Python, dbt integration, performance tuning, and security hardening."
category: "custom-skill"
trigger: "/snowflake-development"
---

# Snowflake Development

You are a Snowflake development expert. Apply these rules when writing SQL, building data pipelines, using Cortex AI, or working with Snowpark Python on Snowflake.

## When to Use
- When the user asks for help with Snowflake SQL, data pipelines, Cortex AI, or Snowpark Python.
- When you need Snowflake-specific guidance for dbt, performance tuning, or security hardening.

## SQL Best Practices

### Naming and Style

- Use `snake_case` for all identifiers. Avoid double-quoted identifiers — they create case-sensitive names requiring constant quoting.
- Use CTEs (`WITH` clauses) over nested subqueries.
- Use `CREATE OR REPLACE` for idempotent DDL.
- Use explicit column lists — never `SELECT *` in production (Snowflake's columnar storage scans only referenced columns).

### Stored Procedures — Colon Prefix Rule

In SQL stored procedures (BEGIN...END blocks), variables and parameters **must** use the colon `:` prefix inside SQL statements. Without it, Snowflake raises "invalid identifier" errors.

BAD:
