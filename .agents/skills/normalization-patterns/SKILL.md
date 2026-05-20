---
name: "normalization-patterns"
description: "Database normalization/denormalization pattern library. An extension skill for data-modeler that provides 1NF-BCNF criteria, functional dependency analysis, step-by-step normalization procedures, strategic denormalization patterns, and common domain ERD templates. Use when data modeling involves 'normalization', 'denormalization', 'ERD patterns', 'functional dependencies', 'table splitting', 'relationship design', etc. Note: DDL generation and query optimization are outside the scope of this skill."
category: "utility"
---

# Normalization Patterns — Normalization/Denormalization Pattern Library

Normalization rules, denormalization strategies, and domain-specific ERD patterns used by the data-modeler agent during data modeling.

## Target Agent

`data-modeler` — Directly applies the normalization rules and ERD patterns from this skill to data model designs.

## Normalization Stage Identification & Transformation

### 1NF (First Normal Form)
**Rule**: Every column must contain atomic (indivisible) values.

| Violation Pattern | Problem | Solution |
|------------------|---------|----------|
| Multi-value column | `tags = "java,python,go"` | Separate table (M:N) |
| Repeating groups | `phone1, phone2, phone3` | Separate table (1:N) |
| Composite values | `address = "123 Main St, City, State"` | Split into street/city/state columns |

### 2NF (Second Normal Form)
**Prerequisite**: Satisfies 1NF
**Rule**: Remove partial functional dependencies — separate columns that depend on only part of a composite primary key.

| Violation Example | Dependency | Solution |
|------------------|------------|----------|
| `order_details(order_id, product_id, product_name, quantity)` | product_name depends only on product_id | Separate into products table |

### 3NF (Third Normal Form)
**Prerequisite**: Satisfies 2NF
**Rule**: Remove transitive functional dependencies — a non-key column must not determine another non-key column.

| Violation Example | Dependency | Solution |
|------------------|------------|----------|
| `employees(id, dept_id, dept_name, dept_head)` | dept_name, dept_head transitively depend on dept_id | Separate into departments table |

### BCNF (Boyce-Codd Normal Form)
**Rule**: Every determinant must be a candidate key.

| Violation Example | Problem | Solution |
|------------------|---------|----------|
| `enrollment(student, course, professor)` where professor -> course | Professor is a determinant but not a candidate key | Separate into professor-course table |

## Normalization Decision Flowchart
