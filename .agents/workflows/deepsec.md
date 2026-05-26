---
description: Drive the `oma-deepsec` skill end-to-end. Installs `.deepsec/`, calibrates cost, runs the right scan/process/triage/revalidate/export pass, gates PRs with `process --diff`, writes custom matchers, and routes findings to follow-up specialists.
---

# MANDATORY RULES: VIOLATION IS FORBIDDEN

- **Response language follows `language` setting in `.agents/oma-config.yaml` if configured.**
- **NEVER skip steps.** Execute from Step 1 in order.
- **Do NOT modify product source code in this workflow.** Findings hand off to domain specialists in Step 5.
- **Read the skill before acting.** Step 1 mandates loading `.agents/skills/oma-deepsec/SKILL.md`.
- **Calibrate before any unbounded `process`.** Use `--limit 50 --concurrency 5` as recommended defaults.
- **Resume, do not reset.** On interruption, re-run the same command. Never delete `data/<id>/` without explicit user instruction.

---

> **Vendor note:** This workflow executes inline (no subagent spawning). All vendors invoke the deepsec CLI directly.

---

## Step 1: Load the skill

Read `.agents/skills/oma-deepsec/SKILL.md` in full. Load **only** the resource files needed for the resolved intent:

| Intent | Resource(s) |
|--------|-------------|
| `setup` | `setup.md` (+`config.md` if credentials unclear) |
| `scan` | `scanning.md` (+`setup.md` if `.deepsec/` missing) |
| `pr-review` | `pr-review.md` (+`config.md` for CI env vars) |
| `matchers` | `matchers.md` (+`scanning.md` for supporting pass) |
| `triage` | `triage.md` (+`scanning.md` if `revalidate` not done) |
| `config`/`troubleshoot` | `config.md` |

Check if `.deepsec/` exists → incremental run (never re-`init`).

---

## Step 2: Classify intent

Resolve to exactly one: `setup`, `scan`, `pr-review`, `matchers`, `triage`, `config`, `troubleshoot`.

- Multiple intents → execute sequentially (e.g., `setup` → `scan`).
- If `.deepsec/` missing and intent needs AI → insert `setup` first.

---

## Step 3: Confirm agent choice

Skip if: user named an agent, `deepsec.config.ts` pins `defaultAgent`, or user delegated ("just pick defaults").

Otherwise ask:
> - **`claude`** (`claude-opus-4-7`): strongest reasoning, most expensive.
> - **`codex`** (`gpt-5.5`): strict read-only sandbox, fast, cheaper.
> Both can be mixed later via `--reinvestigate`.

---

## Step 4: Execute the resolved intent

Run from inside `.deepsec/`. Use the package manager matching the project's lockfile.

### 4A: `setup`
```bash
cd <target-repo> && bunx deepsec init && cd .deepsec && bun install
```
Edit `.env.local` per `resources/setup.md` § 2. Verify with `scan --limit 20` + `process --limit 5`. Write `data/<id>/INFO.md` (50-100 lines, project-specific). **Get user confirmation on INFO.md.**

### 4B: `scan`
1. `bunx deepsec scan && bunx deepsec status`
2. Calibrate: `bunx deepsec process --limit 50 --concurrency 5`
3. Report cost extrapolation → **get user go-ahead**
4. Full: `bunx deepsec process --concurrency 5`
5. Triage + revalidate: `bunx deepsec triage --severity HIGH && bunx deepsec revalidate --min-severity HIGH`
6. Export: `bunx deepsec export --format md-dir --out ./findings && bunx deepsec metrics`

On quota/Ctrl-C halt: re-run same command (already-done files are skipped).

### 4C: `pr-review`
```bash
bunx deepsec process --diff origin/${BASE_REF} --comment-out comment.md
```
CI: two-job pattern from `resources/pr-review.md` — `analyze` (AI gateway, no PR write) + `comment` (PR write, no PR code). Exit codes: `0`=clean, `1`=net-new finding. Pin actions to full SHAs.

### 4D: `matchers`
Precondition: at least one `scan`+`process` pass exists. Follow `resources/matchers.md`:
1. Read contract from `.deepsec/node_modules/deepsec/dist/config.d.ts` and `samples/webapp/matchers/*`
2. Identify entry-point coverage gaps
3. Write per-slug matchers with correct noise tier (`precise`/`normal`/`noisy`)
4. Verify: `bunx deepsec scan --matchers <slug1>,<slug2>`

### 4E: `triage`
Per `resources/triage.md`: triage → revalidate → filter to `true-positive` + `uncertain`. Suppress `false-positive` + `fixed`. Note recurring FP shapes for next INFO.md revision.

### 4F: `config`/`troubleshoot`
Use `resources/config.md`. Match symptom against table, apply fix.

---

## Step 5: Summarize and route

```markdown
## deepsec run summary
- Repo: <path>  • Project id: <id>
- Pass: <type>  • Agent: <agent>  • Model: <id>
- Files scanned: <n>  • Findings: <n>  • TP after revalidate: <n>
- Cost: $<x>  • Wall time: <m> min
- Stop conditions: <none | quota | refusal | user halt>

## Findings (severity ≥ <floor>)
- <severity> · <vulnSlug> · <filePath>:<line> · <title>  [<verdict>]

## Follow-ups
- <item>
```

**Route by layer of the vulnerable file** (not by "is it a bug"). Use `filePath` + `vulnSlug` + `revalidation.verdict` + `data/<id>/tech.json` + `INFO.md` as signals.

| Layer | Specialist |
|-------|-----------|
| Backend / server / API | `oma-backend` |
| Frontend / web client | `oma-frontend` |
| Mobile / native client | `oma-mobile` |
| IaC / cloud / network | `oma-tf-infra` |
| Database / data model | `oma-db` |
| CI / workflow / supply chain | `oma-dev-workflow` |
| Documentation drift | `oma-docs` |
| Entry-point gap | re-enter Step 4D |
| **Ambiguous** | `oma-debug` first (triage, not fix) |

Include: file path, severity, `vulnSlug`, verdict, export markdown path per routed item.

---

## Step 6: Stop conditions

End when **any** is true:
- User's intent is complete and summary delivered.
- Blocking precondition (missing credential, no calibration agreement, refused INFO.md).
- Quota/credit stop surfaced with safe-resume command.

Do not loop back unless user re-invokes with a new intent.

---

## Absolute Rules

- Do NOT echo/commit credentials. `.env.local` is gitignored.
- Do NOT grant `pull-requests: write` to any CI job running PR-controlled code.
- Do NOT silently drop a refusal. Log, retry with other backend, or add to `ignorePaths`.
- Do NOT invent CLI flags. Check `--help` first.
- Do NOT modify `.agents/` files unless editing the OMA source repo.
