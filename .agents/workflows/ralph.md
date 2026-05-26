---
description: Ralph - persistent self-referential execution loop wrapping ultrawork with independent verifier verification
---

# MANDATORY RULES: VIOLATION IS FORBIDDEN

- **Response language follows `language` setting in `.agents/oma-config.yaml` if configured.**
- **NEVER skip phases.** Execute from Phase 0 in order. Explicitly report completion of each phase before proceeding.
- **You MUST use MCP tools throughout the entire workflow.** This is NOT optional.
  - Use code analysis tools (`get_symbols_overview`, `find_symbol`, `find_referencing_symbols`, `search_for_pattern`) for code exploration.
  - Use memory tools (read/write/edit) for progress tracking.
  - Memory path: configurable via `memoryConfig.basePath` (default: `.serena/memories`)
  - Tool names: configurable via `memoryConfig.tools` in `mcp.json`
  - Do NOT use raw file reads or grep as substitutes.
- **This workflow does NOT stop until all completion criteria pass or safeguards trigger.**
- **Follow the context-loading guide.** Read `.agents/skills/_shared/core/context-loading.md` and load only task-relevant resources.

---

## Vendor Detection

Before starting, determine your runtime environment by following `.agents/skills/_shared/core/vendor-detection.md`.
The detected vendor determines how ultrawork spawns agents internally.

---

## Phase 0: INIT (DO NOT SKIP)

### Step 0.1: Load Prerequisites

1. Read `.agents/skills/_shared/core/context-loading.md` for resource loading strategy.
2. Read `.agents/skills/_shared/runtime/memory-protocol.md` for memory protocol.
3. Read `.agents/workflows/ralph/resources/judge-protocol.md` for JUDGE rules.

### Step 0.2: Define Completion Criteria

Analyze the user's request and define **verifiable** completion criteria:

```markdown
criteria:
  - id: C{N}
    description: "<what to achieve>"
    verification: "<how to verify — test result, build output, file existence, command output>"
    status: PENDING
    fail_count: 0
    previous_status: null
    regressed_at_iteration: null
    affected_paths: []    # optional; for heavy verification caching (see judge-protocol.md)
```

**Rules:**
- Every criterion must be mechanically verifiable (test pass, build success, file exists, command output)
- Reject subjective criteria. Ask the user to rephrase.
- Present criteria to the user for confirmation before proceeding

### Step 0.3: Initialize Session

1. Set `max_iterations: 5` (default safeguard)
2. Set `current_iteration: 0`
3. Record session start using memory write tool:
   - Create `session-ralph.md` with: start time, request summary, criteria, max_iterations

---

## Phase 1: EXEC

// turbo

### Step 1.1: Prepare Ultrawork Input

- **Iteration 1**: Full user request with all PENDING criteria
- **Iteration 2+**: REMAINING (FAIL + REGRESSED) criteria from previous JUDGE, with previous JUDGE results and suggested actions as context. Already-PASSED criteria excluded from **implementation scope** but remain in **JUDGE scope** (re-verified for regressions).

### Step 1.2: Delegate to Ultrawork

**Invoke `.agents/workflows/ultrawork.md` as a delegated workflow.** Do NOT re-read ultrawork.md on every iteration — the executing agent retains the workflow instructions from the first read. On iteration 2+, pass only the narrowed scope as input.

1. Pass the prepared input as the task description.
2. Ultrawork handles all vendor-specific agent spawning internally.
3. Wait for ultrawork to complete all 5 phases (PLAN, IMPL, VERIFY, REFINE, SHIP).

### Step 1.3: Record EXEC Completion

1. Increment `current_iteration`
2. Record iteration start in `session-ralph.md`

---

## Phase 2: JUDGE

### Step 2.1: Independent Verification

**You are now the independent verifier, NOT the implementer.**

For **EVERY criterion regardless of current status** (including PASS from prior iterations), execute the verification method defined in Phase 0. Re-verification catches regressions caused by shared code modifications.

**Heavy verification caching**: For verifications >30 seconds, apply cache rules in `judge-protocol.md` § "Caching for Heavy Verification".

**Follow `.agents/workflows/ralph/resources/judge-protocol.md` for the full protocol** — including status definitions (PASS/FAIL/REGRESSED/BLOCKED), verdict rules, evidence requirements, and remaining items format.

### Step 2.2: Produce JUDGE Result

Output in this format:

```markdown
## JUDGE Result — Iteration {N}

| Criterion | Status    | Evidence                     |
|-----------|-----------|------------------------------|
| C1        | PASS      | <concrete evidence>          |
| C2        | FAIL      | <failure evidence>           |
| C3        | BLOCKED   | <failed 3x: reason>         |
| C4        | REGRESSED | prev PASS iter N — <evidence + diff> |

verdict: PASS | FAIL
```

If FAIL, include `remaining:` block with `id`, `reason`, `suggested_action`, `fail_count`, `regression` (true/false).

### Step 2.3: Apply Transition Rules

Before updating, capture `status` → `previous_status`. Then apply rules per `judge-protocol.md` § "Detection rule". Summary:

1. Passed → `PASS`, reset regression.
2. Failed + was PASS → `REGRESSED` (first-class signal, don't increment fail_count).
3. Failed + not regression + fail_count < 3 → `FAIL`, increment.
4. Failed + fail_count >= 3 → `BLOCKED`.

`REGRESSED` = FAIL for verdict; only PASS and BLOCKED count toward "DONE".

---

## Decision Gate

### → DONE (All criteria PASS or BLOCKED)
1. Report partial (BLOCKED exists) or full completion.
2. Record final results.
3. Output: `## Ralph Complete — Iteration {N}/{max}` with PASSED/BLOCKED lists.

### → REPLAN (Any FAIL or REGRESSED)
Proceed to Phase 3.

### → SAFEGUARD (max_iterations reached)
1. Force stop. Report partial completion with PASSED/FAILED/BLOCKED lists.
2. Recommend: "Review FAILED criteria manually or increase max_iterations."
3. Record safeguard trigger.

---

## Phase 3: REPLAN

// turbo

### Step 3.1: Extract Remaining Work

Separate FAIL and REGRESSED criteria:

1. **FAIL**: list with reason and suggested_action
2. **REGRESSED**: list with previous-pass iteration, inter-iteration diff, regression-specific action
3. Include previous JUDGE evidence as context
4. State PASS criteria (don't re-implement, but keep in JUDGE scope)
5. State BLOCKED criteria (don't retry)

### Step 3.2: Narrow Scope

Compose focused task separating regressions from first-fail items:

- **Already Complete**: PASS items (DO NOT re-implement; will be re-verified)
- **Blocked**: BLOCKED items (DO NOT retry)
- **Regressed**: Diagnose what broke it via diff-aware investigation; minimal fix preserving recent changes
- **To Fix**: First-time or persistent failures with suggested actions

**Why separate**: "fix from scratch" vs "diagnose a regression" produce different reasoning paths. Regressed items trigger diff-based investigation, not greenfield re-implementation.

### Step 3.3: Loop Back

1. Record REPLAN in `session-ralph.md`
2. Return to **Phase 1: EXEC** with narrowed scope

---

## Summary

```
Phase 0: INIT → Define criteria, initialize session
    ↓
Phase 1: EXEC → Delegate to ultrawork (full or narrowed scope)
    ↓
Phase 2: JUDGE → Independent verification of each criterion
    ↓
Decision: DONE? → End
          SAFEGUARD? → Force end
          FAIL? → Phase 3
    ↓
Phase 3: REPLAN → Extract remaining, narrow scope
    ↓
    └──→ Phase 1 (loop)
```

| Phase   | Purpose                    | Key Action                              |
|---------|----------------------------|-----------------------------------------|
| INIT    | Define success criteria     | Verifiable criteria + session init      |
| EXEC    | Implementation             | Delegate to ultrawork                   |
| JUDGE   | Independent verification   | Evidence-based pass/fail per criterion  |
| REPLAN  | Scope narrowing            | Separate FAIL + REGRESSED, loop back    |
