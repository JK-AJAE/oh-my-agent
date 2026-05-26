---
description: Initialize project harness with AGENTS.md as table of contents, ARCHITECTURE.md as domain map, and a structured docs/ knowledge base
---

# MANDATORY RULES: VIOLATION IS FORBIDDEN

- **Response language follows `language` setting in `.agents/oma-config.yaml` if configured.**
- **NEVER skip steps.** Execute from Step 0 in order. Explicitly report completion of each step before proceeding.
- **You MUST use MCP tools throughout the entire workflow.** This is NOT optional.
  - Use code analysis tools (`get_symbols_overview`, `find_symbol`, `search_for_pattern`, `list_dir`) for code exploration.
  - Use file writing tools to generate all output files.
- **Exclude directories:** Respect `.gitignore`. Skip framework-generated cross-platform directories (e.g., Flutter/RN's `android`, `ios`, `macos`, `linux`, `windows`, `web`).

---

> **Vendor note:** This workflow executes inline (no subagent spawning). All vendors use their native file exploration, code analysis, and file writing tools.

---

## Core Philosophy

**AGENTS.md is a table of contents, not an encyclopedia.**

The knowledge base lives in a structured `docs/` directory. A short AGENTS.md (~100 lines) serves as a map with pointers to deeper sources.

Three documentation categories: **Maps** (ARCHITECTURE.md, topology), **Plans** (work plans, tech debt), **Design Specifications** (architectural decisions, core beliefs, product specs).

Agents discover file listings via tools. What the harness MUST provide (not discoverable from code): why decisions were made, forbidden patterns, dependency direction rules, product sense/design principles, domain-specific working guides.

---

## Target Output Structure

```
AGENTS.md                           ← table of contents (~100 lines)
ARCHITECTURE.md                     ← domain map and package layering
docs/
├── design-docs/                    ← indexed architectural decisions
│   ├── index.md
│   ├── core-beliefs.md
│   └── {decision-name}.md
├── plans/                          ← local working notes (gitignored)
│   ├── designs/{NNN}-{name}.md     ← permanent design references
│   └── work/
│       ├── {NNN}-{name}.md         ← execution plans (Active/Completed)
│       └── tech-debt-tracker.md
├── generated/                      ← auto-generated (DB schema, API specs)
├── product-specs/                  ← feature specs with acceptance criteria
│   ├── index.md
│   └── {feature-name}.md
├── references/                     ← {library}-llms.txt for LLM-formatted docs
└── {DOMAIN}.md                     ← domain guides (see table below)
```

Not all files are required. Generate only what is **discoverable and relevant**.

---

## Step 0: Preparation

1. Read `.agents/skills/oma-coordination/SKILL.md` and confirm Core Rules.
2. Check if `AGENTS.md`, `ARCHITECTURE.md`, or `docs/` already exists → **update run** (see Step 6).

---

## Step 1: Analyze Codebase

1. **Project type**: Monorepo / single app / library? Packages, services, tech stacks.
2. **Architectural patterns**: Layer structure, module boundaries, dependency direction, naming conventions, test organization.
3. **Implicit rules**: Import restrictions, error handling, state management, code organization patterns.
4. **Domains**: Frontend, backend, mobile, infra, design system, security-sensitive areas, reliability-critical paths.
5. **Boundaries**: Root (always) + each package/app in monorepo + major architectural boundaries. NOT every subdirectory.

Report findings before proceeding.

---

## Step 2: Generate ARCHITECTURE.md

**Top-level domain map.** Keep under 200 lines. Content:

- Domain map: major domains, ownership
- Package/module layering with dependency direction
- Key integration points, data flow
- Infrastructure topology (if applicable)
- Use diagrams (mermaid/ascii) for clarity

Focus on **topology and relationships**, not implementation details.

---

## Step 3: Generate `docs/` Knowledge Base

Generate only files **relevant and discoverable** from the codebase.

### `docs/design-docs/`
- **`index.md`**: catalogue with status (draft/verified/superseded)
- **`core-beliefs.md`**: agent-first operating principles
- **`{decision-name}.md`**: decisions with context, options, rationale, consequences

### `docs/plans/`
Folder = type. Status field = lifecycle. 3-digit zero-padded prefix per folder.
- **`designs/`**: permanent design references
- **`work/`**: execution plans (Active → Completed) + `tech-debt-tracker.md`

### `docs/generated/`
Auto-generated docs (DB schemas, API specs). Mark with generation method and timestamp. Populate only if generation sources exist.

### `docs/product-specs/`
- **`index.md`** + **`{feature-name}.md`** with acceptance criteria. Populate from discovered product-facing code.

### `docs/references/`
`{library}-llms.txt` — key API surfaces, patterns, gotchas for heavy external deps.

### Domain Docs (root-level in `docs/`)

| File | When | Content |
|------|------|---------|
| `DESIGN.md` | Has UI/design system | Design system, component patterns, visual language |
| `FRONTEND.md` | Has frontend | Frontend architecture, rendering, state, routing |
| `PLANS.md` | Always | Planning conventions, template |
| `PRODUCT-SENSE.md` | User-facing product | Product thinking, user mental models |
| `QUALITY-SCORE.md` | Always | Per-domain quality grades, gap tracking |
| `RELIABILITY.md` | Has backend/infra | SLOs, error budgets, incident response |
| `SECURITY.md` | Has auth/data | Security policies, threat model, auth patterns |
| `CODE-REVIEW.md` | Always | Review standards, checklist, severity levels, anti-patterns |

### Generation Rules
- Write **only what was discovered**. Don't fabricate rules.
- Mark unclear patterns as "observed but unconfirmed".
- Mark sections needing human input with `<!-- TODO: confirm this rule -->`.
- Use concrete examples from the actual codebase.

---

## Step 4: Generate Root AGENTS.md

**~100 lines. Table of contents pointing to docs/.** Template:

```markdown
# {Project Name}

> {One-line description}

## Architecture
See [ARCHITECTURE.md](ARCHITECTURE.md) for the full domain map.

## Documentation
- [Design Docs](docs/design-docs/index.md) — decisions and core beliefs
- [Plans](docs/plans/) — designs and execution plans
- [Product Specs](docs/product-specs/index.md) — feature specs
- [References](docs/references/) — external library docs

## Domain Guides
{Only list actually generated docs}

## Quality & Planning
- [Quality Score](docs/QUALITY-SCORE.md) | [Code Review](docs/CODE-REVIEW.md)
- [Plans](docs/PLANS.md) | [Tech Debt](docs/plans/work/tech-debt-tracker.md)

## Project Structure
{Brief layout — packages, apps, key directories. Point to boundary AGENTS.md.}

## Quick Rules
{3-5 most critical rules}

<!-- MANUAL: Notes below this line are preserved on regeneration -->
```

**Rules:** No file listings (agents can `list_dir`). Every line points somewhere or states a rule. Only list generated docs — no dead links.

---

## Step 5: Generate Boundary AGENTS.md Files

Only at **package/app boundaries** in monorepos. Max 50 lines. Template:

```markdown
<!-- Parent: ../AGENTS.md -->
# {Package/App Name}
> {One-line purpose}
## Constraints
{Rules specific to this boundary}
## Working Here
{How to correctly add/modify code here}
## Dependencies
- Depends on: {internal deps}
- Depended on by: {reverse deps}
<!-- MANUAL: Preserved on regeneration -->
```

Content must be **specific to this boundary**. Don't repeat root-level rules.

---

## Step 6: Verify After Updates (Delegated)

Handled by `oma-docs`. After deepinit: `/oma-docs verify`. Set `docs.auto_verify: true` in config for automatic verification. Deepinit only generates 0→1 bootstrap content.

---

## Step 7: Validate

1. All AGENTS.md references resolve (no dead links).
2. All `<!-- Parent: -->` references resolve.
3. ARCHITECTURE.md matches actual structure.
4. No `docs/` file contains tool-derivable info (file listings, symbol enumerations).
5. Root AGENTS.md < 120 lines. ARCHITECTURE.md < 200 lines. Boundary AGENTS.md < 60 lines.
6. `design-docs/index.md` and `product-specs/index.md` list all existing docs.

Report validation results.
