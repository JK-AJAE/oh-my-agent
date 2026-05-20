---
name: "naver-ads-report"
description: "Naver Search Ads automated report generation skill. Orchestrates a 4-agent team (data-collector, data-analyst, report-writer, quality-reviewer) to collect Naver API data and produce structured weekly performance reports. Use for requests like 'generate Naver ads report,' 'pull last week's ad data,' 'Naver search ads performance,' 'weekly advertising report,' 'campaign KPI report.' Requires NAVER_API_KEY, NAVER_SECRET_KEY, NAVER_CUSTOMER_ID environment variables."
category: "utility"
---

# Naver Ads Report — Automated Performance Report Pipeline

A 4-agent team collects Naver Search Ads data via API and generates structured weekly reports covering campaigns, ad groups, and keywords.

## Execution Mode

**Agent Team** — 4 members communicate via SendMessage and file-based handoffs.

## Agent Roster

| Agent | File | Role | Type |
|-------|------|------|------|
| data-collector | `.claude/agents/data-collector.md` | API auth & data retrieval | general-purpose |
| data-analyst | `.claude/agents/data-analyst.md` | KPI calculation & trend analysis | general-purpose |
| report-writer | `.claude/agents/report-writer.md` | Report composition | general-purpose |
| quality-reviewer | `.claude/agents/quality-reviewer.md` | Validation & sign-off | general-purpose |

## Workflow

### Phase 1: Preparation

1. Extract from user input: report period, customer ID, scope, output format
2. Create `_workspace/` directory
3. Save `_workspace/00_input.md`
4. Verify environment credentials

### Phase 2: Execution

| Order | Task | Owner | Deliverable |
|-------|------|-------|-------------|
| 1 | API Collection | data-collector | `_workspace/01_raw_data.json` |
| 2 | KPI Analysis | data-analyst | `_workspace/02_kpi_analysis.md` |
| 3 | Report Writing | report-writer | `_workspace/03_report_draft.md` |
| 4 | Review | quality-reviewer | `_workspace/04_review_report.md` |

### Phase 3: Delivery

Verify all files, resolve 🔴 items, deliver final report to user.

## Extension Skills

| Skill | Path | Target Agent | Purpose |
|-------|------|-------------|---------|
| naver-search-ads-api | `skills/naver-search-ads-api/SKILL.md` | data-collector | API auth, endpoints, rate limits |
| kpi-report-formatter | `skills/kpi-report-formatter/SKILL.md` | report-writer | KPI formatting, table structures |

## Error Handling

| Error | Strategy |
|-------|----------|
| Missing credentials | Halt, show setup guide |
| Rate limit | Retry with backoff (max 3x) |
| Data gaps | Flag in report, proceed with available data |
