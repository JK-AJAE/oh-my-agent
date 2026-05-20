---
name: "query-optimization-catalog"
description: "SQL query optimization catalog. An extension skill for performance-analyst that provides index strategies (B-Tree/Hash/GIN/GiST), execution plan analysis, N+1 problem resolution, partitioning strategies, and per-pattern optimization techniques for slow queries. Use when performing DB performance analysis involving 'query optimization', 'index design', 'execution plans', 'N+1 problems', 'partitioning', 'slow queries', etc. Note: data modeling and security configuration are outside the scope of this skill."
category: "utility"
---

# Query Optimization Catalog — SQL Query Optimization Catalog

A reference of index strategies, execution plan analysis, and query anti-pattern resolution used by the performance-analyst agent during performance optimization.

## Target Agent

`performance-analyst` — Directly applies the optimization techniques from this skill to performance analysis and index design.

## Index Strategies

### Index Type Selection Guide

| Index Type | Suitable Queries | DBMS | Characteristics |
|-----------|-----------------|------|-----------------|
| **B-Tree** | `=`, `<`, `>`, `BETWEEN`, `ORDER BY` | All | General purpose, default |
| **Hash** | `=` equality only | PostgreSQL, MySQL | No range searches |
| **GIN** | Arrays, JSONB, full-text search | PostgreSQL | Multi-value indexing |
| **GiST** | Spatial (geometry), ranges | PostgreSQL | PostGIS, range types |
| **BRIN** | Time-series, naturally sorted data | PostgreSQL | Very small size |
| **Fulltext** | Full-text search | MySQL, PostgreSQL | Replaces LIKE '%word%' |

### Composite Index Design Principles

#### Leftmost Prefix Rule
