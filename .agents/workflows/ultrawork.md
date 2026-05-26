---
description: Ultrawork - high-quality 5-phase development workflow with 11 review steps out of 17
---

# MANDATORY RULES: VIOLATION IS FORBIDDEN

- **Response language follows `language` setting in `.agents/oma-config.yaml` if configured.**
- **NEVER skip steps.** Execute from Step 0 in order. Explicitly report completion of each step to the user before proceeding to the next.
- **You MUST use MCP tools throughout the entire workflow.** This is NOT optional.
  - Use code analysis tools (`get_symbols_overview`, `find_symbol`, `find_referencing_symbols`, `search_for_pattern`) for code exploration.
  - Use memory tools (read/write/edit) for progress tracking.
  - Memory path: configurable via `memoryConfig.basePath` (default: `.serena/memories`)
  - Tool names: configurable via `memoryConfig.tools` in `mcp.json`
  - Do NOT use raw file reads or grep as substitutes. MCP tools are the primary interface for code and memory operations.
- **Read the oma-coordination skill BEFORE starting.** Read `.agents/skills/oma-coordination/SKILL.md` and follow its Core Rules.
- **Follow the context-loading guide.** Read `.agents/skills/_shared/core/context-loading.md` and load only task-relevant resources.

---

## Vendor Detection

Before starting, determine your runtime environment by following `.agents/skills/_shared/core/vendor-detection.md`.
The detected runtime vendor and each agent's target vendor determine how agents are spawned.

---

## Agent Dispatch Pattern

All phases use the same dispatch logic. Resolve the target vendor for each agent from `.agents/oma-config.yaml`:

| Runtime + Target | Method |
|------------------|--------|
| Claude Code, target=Claude | `Agent(subagent_type="{role}", prompt="{task}. IMPORTANT: Follow .agents/skills/_shared/core/context-loading.md rules.", run_in_background=true)` — multiple calls in same message = parallel |
| Codex CLI, target=Codex | Native `.codex/agents/{agent}.toml`; fall back to `oma agent:spawn` if unverified |
| Gemini CLI, target=Gemini | Native Gemini subagents; fall back to `oma agent:spawn` |
| Cross-vendor or unavailable | `oma agent:spawn {role} "{task}. IMPORTANT: Follow context-loading.md rules." session-id [-w ./path] &` |

## Agent Monitoring Pattern

After spawning any agent, **wait for completion before proceeding**:

1. Use memory read tool to poll `progress-{agent}[-{sessionId}].md`
2. Use MCP code analysis tools to verify alignment
3. Check for `result-{agent}[-{sessionId}].md` to confirm completion
4. Use memory edit tool to record results in `session-ultrawork.md`

**Continue polling until all agents report completion or failure.**

## Review Loop Termination

When any gate fails, check these conditions before re-spawning (OR, whichever fires first):

1. Total failure count has reached the configured maximum iterations (default: 5 cycles across VERIFY + REFINE). Stop.
2. Session cost cap exceeded: call `checkCap(sessionId, loadQuotaCap())` from `cli/io/session-cost.ts`. If `exceeded === true`, print `formatPromptMessage(result)`, save results, and stop.

If neither condition is met, continue.

## Quality Score Pattern (Conditional)

At measurement checkpoints (Steps 5.2, 8.1, 13.1, 17.1), if automated tools are available:

1. Run tests/lint/type-check to measure score
2. Calculate delta from previous checkpoint
3. Record in Experiment Ledger via memory tools
4. **Discard rule** (REFINE only): if delta < -5, revert changes

If no measurement tools exist, gates fall back to binary checklist. Quality Score is loaded **conditionally** per `context-loading.md`, not at Phase 0.

---

## Phase 0: Initialization (DO NOT SKIP)

1. Read `.agents/skills/oma-coordination/SKILL.md` and confirm Core Rules.
2. Read `.agents/skills/_shared/core/context-loading.md` for resource loading strategy.
3. Read `.agents/skills/_shared/runtime/memory-protocol.md` for memory protocol.
4. Read `.agents/workflows/ultrawork/resources/multi-review-protocol.md` (11 review guides)
5. Read `.agents/workflows/ultrawork/resources/phase-gates.md` (gate definitions)
6. Record session start using memory write tool:
   - Create `session-ultrawork.md` in the memory base path
   - Include: session start time, user request summary, workflow version (ultrawork)

---

## Phase 1: PLAN (Steps 1-4)

### Step 1-4: Create Plan & Reviews
// turbo
Activate PM Agent to execute Steps 1-4:

1. Analyze requirements, define API contracts, create prioritized task breakdown.
2. **Step 2** Plan Review (Completeness): Ensure requirements fully mapped.
3. **Step 3** Meta Review: Self-verify if review was sufficient.
4. **Step 4** Over-Engineering Review (Simplicity): Check for unnecessary complexity.
5. Save plan to `.agents/results/plan-{sessionId}.json`.
6. Create `task-board.md` in memory path. Record plan completion.

### PLAN_GATE
See `phase-gates.md` § PLAN_GATE. Requires user confirmation.
**On pass**: Record phase completion. **On fail**: Return to Step 1.

---

## Phase 2: IMPL (Step 5)

### Step 5: Implementation
// turbo
Spawn Implementation Agents (Backend/Frontend/Mobile) in parallel using the **Agent Dispatch Pattern** above.

- **Role**: `backend-engineer`, `frontend-engineer` (or as needed)
- **Task**: "Implement {domain} tasks per plan."

### Step 5.1: Monitor & Wait
Follow the **Agent Monitoring Pattern** above.

### Step 5.2: Measure Baseline Quality Score
Follow the **Quality Score Pattern** above. Record as IMPL baseline.

### IMPL_GATE
See `phase-gates.md` § IMPL_GATE.
**On pass**: Record phase completion. **On fail**: Re-spawn failed agents, repeat until pass.

---

## Phase 3: VERIFY (Steps 6-8)

### Steps 6-8: QA Verification
// turbo
Spawn QA Agent using the **Agent Dispatch Pattern**.

- **Role**: `qa-reviewer`
- **Task**: "Step 6: Alignment Review. Step 7: Security/Bug Review (npm audit, OWASP). Step 8: Improvement/Regression Review."

Monitor with the **Agent Monitoring Pattern**.

- **Step 6**: Compare implementation vs plan.
- **Step 7**: Check for vulnerabilities (OWASP Top 10).
- **Step 8**: Run regression tests.
- **Step 8.1**: Measure Post-VERIFY Quality Score (conditional).

### VERIFY_GATE
See `phase-gates.md` § VERIFY_GATE.
**On pass**: Record phase completion.

**On fail**: Check **Review Loop Termination** conditions. If continuing:

**Root-cause-first fix mandate:** fix prompts MUST require root-cause remediation. Forbid tactical patches (try/catch swallowing, validation bypass, hardcoded values, feature flags hiding bugs, silencing tests) unless explicitly justified.

**2nd failure on same issue (termination not triggered)** → Activate **Exploration Loop**:
1. Load `exploration-loop.md` (conditional)
2. Generate 2-3 alternative hypotheses
3. Experiment each (git stash per attempt), measure Quality Score
4. Select highest-scoring approach, record in Experiment Ledger

---

## Phase 4: REFINE (Steps 9-13)

### Steps 9-13: Deep Refinement
// turbo
Spawn Debug Agent using the **Agent Dispatch Pattern**.

- **Role**: `debug-investigator`
- **Task**: "Step 9: Split large files. Step 10: Integration check. Step 11: Side Effect analysis. Step 12: Consistency review. Step 13: Cleanup dead code."

Monitor with the **Agent Monitoring Pattern**.

- **Step 9**: Files > 500 lines, Functions > 50 lines.
- **Step 10**: Check for duplicate logic (Reusability).
- **Step 11**: Analyze impact scope (Cascade Impact).
- **Step 12**: Review naming and style (Consistency).
- **Step 13**: Remove newly created dead code.
- **Step 13.1**: Measure Post-REFINE Quality Score (conditional). Apply Discard rule if delta < -5.

### REFINE_GATE
See `phase-gates.md` § REFINE_GATE.
**On pass**: Record phase completion. **On fail**: Check **Review Loop Termination**, then re-spawn.
**Skip conditions**: Simple tasks < 50 lines.

---

## Phase 5: SHIP (Steps 14-17)

### Steps 14-17: Final QA & Deployment Readiness
// turbo
Spawn QA Agent using the **Agent Dispatch Pattern**.

- **Role**: `qa-reviewer`
- **Task**: "Step 14: Quality Review (lint/coverage). Step 15: UX Flow Verification. Step 16: Related Issues Review. Step 17: Deployment Readiness."

Monitor with the **Agent Monitoring Pattern**.

- **Step 14**: Lint, Types, Coverage.
- **Step 15**: User journey check.
- **Step 16**: Final impact check.
- **Step 17**: Secrets, Migrations, checklist.
- **Step 17.1**: Final Quality Score & Session Summary (conditional).

**Always at session end** (regardless of Quality Score):
- Record Evaluator Accuracy events (false_positive, missed_stub, good_catch)
- Append EA events to `session-metrics.md`
- If rolling 3-session EA >= 30: Flag → "QA tuning suggested. Run `oma retro` to review."

### SHIP_GATE
See `phase-gates.md` § SHIP_GATE. Requires user final approval.
**On pass**: Record final results. **On fail**: Address issues, re-run affected steps.

---

## Step 18: Optional Doc Verify Hook

If `oma-config.yaml` has `docs.auto_verify: true`:

1. Run `oma docs verify --json` from repo root.
2. If `broken.length === 0`: print summary and continue.
3. If `broken.length > 0`: print 1-3 line drift summary with hint `Run /oma-docs verify for the full report.`
4. If `oma-docs` unavailable: skip silently.

---

## Review Steps Summary

| Phase  | Steps | Agent       | Execution | Perspective                       |
| ------ | ----- | ----------- | --------- | --------------------------------- |
| PLAN   | 1-4   | PM Agent    | Inline    | Completeness, Meta, Simplicity    |
| IMPL   | 5     | Dev Agents  | Spawn     | Implementation                    |
| VERIFY | 6-8   | QA Agent    | Spawn     | Alignment, Safety, Regression     |
| REFINE | 9-13  | Debug Agent | Spawn     | Reusability, Cascade, Consistency |
| SHIP   | 14-17 | QA Agent    | Spawn     | Quality, UX, Cascade 2nd, Deploy  |

**Total 11 review steps + conditional Quality Score checkpoints → High quality guaranteed**

---

## Autoresearch-Inspired Enhancements

| Pattern | When Active | Reference |
|---------|-------------|-----------|
| **Continuous metrics** | When measurement tools available | `quality-score.md` |
| **Keep/Discard** | When quality score is measured | `quality-score.md` delta rules |
| **Experiment logging** | When baseline is established | `experiment-ledger.md` |
| **Hypothesis exploration** | On repeated gate failures | `exploration-loop.md` |
| **Auto-learning** | At session end, if experiments exist | `lessons-learned.md` |

All protocols are loaded **conditionally** per `context-loading.md`, not at Phase 0.
