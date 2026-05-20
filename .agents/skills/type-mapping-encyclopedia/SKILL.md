---
name: "type-mapping-encyclopedia"
description: "RDBMS-to-RDBMS data type mapping tables, RDBMS-to-NoSQL conversion patterns, character set/collation conversion, and special type handling guide. Use this skill for requests involving 'type mapping', 'data type conversion', 'MySQL PostgreSQL conversion', 'Oracle migration', 'character set conversion', 'collation', 'AUTO_INCREMENT sequence', 'JSON type', etc. Enhances schema-mapper's type conversion capabilities. Note: ETL script writing and validation queries are outside the scope of this skill."
category: "utility"
---

# Type Mapping Encyclopedia — Data Type Mapping Reference

A comprehensive reference for RDBMS-to-RDBMS data type mapping, special type conversions, and character set handling.

## MySQL to PostgreSQL Mapping

| MySQL | PostgreSQL | Notes |
|-------|-----------|-------|
| TINYINT | SMALLINT | TINYINT UNSIGNED -> SMALLINT |
| INT | INTEGER | |
| INT UNSIGNED | BIGINT | PostgreSQL has no UNSIGNED |
| BIGINT | BIGINT | |
| FLOAT | REAL | |
| DOUBLE | DOUBLE PRECISION | |
| DECIMAL(M,N) | NUMERIC(M,N) | Identical |
| VARCHAR(N) | VARCHAR(N) | |
| CHAR(N) | CHAR(N) | |
| TEXT | TEXT | |
| MEDIUMTEXT | TEXT | PostgreSQL TEXT has no size limit |
| LONGTEXT | TEXT | |
| BLOB | BYTEA | |
| LONGBLOB | BYTEA | Or use Large Object |
| DATE | DATE | |
| DATETIME | TIMESTAMP | MySQL: not UTC; PG: timezone option |
| TIMESTAMP | TIMESTAMPTZ | MySQL: auto UTC conversion |
| TIME | TIME | |
| YEAR | SMALLINT | |
| ENUM('a','b') | VARCHAR + CHECK | Or CREATE TYPE |
| SET('a','b') | VARCHAR[] | Or normalize |
| JSON | JSONB | JSONB recommended (indexable) |
| BIT(N) | BIT(N) | |
| BOOLEAN | BOOLEAN | MySQL TINYINT(1) -> BOOLEAN |
| AUTO_INCREMENT | GENERATED ALWAYS AS IDENTITY | Or SERIAL (legacy) |

### Special Conversion Patterns
