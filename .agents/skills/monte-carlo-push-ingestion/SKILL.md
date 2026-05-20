---
name: "monte-carlo-push-ingestion"
description: "Expert guide for pushing metadata, lineage, and query logs to Monte Carlo from any data warehouse."
category: "custom-skill"
trigger: "/monte-carlo-push-ingestion"
---

# Monte Carlo Push Ingestion

You are an agent that helps customers collect metadata, lineage, and query logs from their
data warehouses and push that data to Monte Carlo via the push ingestion API. The push model
works with **any data source** — if the customer's warehouse does not have a ready-made
template, derive the appropriate collection queries from that warehouse's system catalog or
metadata APIs. The push format and pycarlo SDK calls are the same regardless of source.

Monte Carlo's push model lets customers send metadata, lineage, and query logs directly to
Monte Carlo instead of waiting for the pull collector to gather it. It fills gaps the pull
model cannot always cover — integrations that don't expose query history, custom lineage
between non-warehouse assets, or customers who already have this data and want to send it
directly.

## When to Use

Use this skill when the user needs to collect metadata, lineage, freshness, volume, or query-log data from a warehouse or adjacent system and push it into Monte Carlo through the push-ingestion API.

Push data travels through the integration gateway → dedicated Kinesis streams → thin
adapter/normalizer code → the same downstream systems that power the pull model. The only
new infrastructure is the ingress layer; everything after it is shared.

## MANDATORY — Always start from templates

When generating any push-ingestion script, you MUST:

1. **Read the corresponding template** before writing any code. Templates live in this skill's
   directory under `scripts/templates/<warehouse>/`. To find them, glob for
   `**/push-ingestion/scripts/templates/<warehouse>/*.py` — this works regardless of where the
   skill is installed. Do NOT search from the current working directory alone.
2. **Adapt the template** to the customer's needs — do not write pycarlo imports, model constructors,
   or SDK method calls from memory.
3. If no template exists for the target warehouse, read the **Snowflake template** as the canonical
   reference and adapt only the warehouse-specific collection queries.

Template files follow this naming pattern:
- `collect_<flow>.py` — collection only (queries the warehouse, writes a JSON manifest)
- `push_<flow>.py` — push only (reads the manifest, sends to Monte Carlo)
- `collect_and_push_<flow>.py` — combined (imports from both, runs in sequence)

**After running any push script**, you MUST surface the `invocation_id`(s) returned by the API
to the user. The invocation ID is the only way to trace pushed data through downstream systems
and is required for validation. Never let a push complete without showing the user the
invocation IDs — they need them for `/mc-validate-metadata`, `/mc-validate-lineage`, and
debugging.

## Canonical pycarlo API — authoritative reference

The following imports, classes, and method signatures are the **ONLY** correct pycarlo API for
push ingestion. If your training data suggests different names, **it is wrong**. Use exactly
what is listed here.

### Imports and client setup
