---
name: "production-audit"
description: "Audit a shipped repo for production-readiness gaps across RLS, webhooks, secrets, grants, Stripe idempotency, mobile UX, and deployment health."
category: "custom-skill"
trigger: "/production-audit"
---

# Production Audit

## Overview

A skill that runs an external audit on a shipped repo's deployed state — live URL, GitHub signals, secrets exposure, RLS gaps, webhook idempotency, indexes, observability, prompt injection, and ten other failure modes that AI-assisted projects routinely miss.

This is **complementary** to in-session security skills (`security-review`, OWASP-style, VibeSec, Trail of Bits). Those scan the editor buffer at write-time. This scans the deployed product after you commit. Different timing, different inputs, different findings. Run both for serious launches.

The skill wraps the [commit.show](https://commit.show) audit engine via the public CLI (`npx commitshow audit . --json`). Stable JSON envelope (`schema_version: "1"`, additive-only). Writes a `.commitshow/audit.{md,json}` sidecar so future agent sessions can read prior state without re-running the engine.

## When to Use This Skill

- Use when the user asks "is this production-ready", "what would break in prod", "score my project", "what did I miss", "audit my repo", "ready to ship".
- Use right after merging a feature branch to `main` (helpful as a pre-deploy gate).
- Use before a public launch / Show HN post / investor demo.
- Use when `git log` shows >20 commits since the last `.commitshow/audit.md` was written.

### Skip when

- During active in-session coding — use `security-review` / OWASP-style for line-level patterns. This skill is for post-merge / pre-ship review.
- For library / scaffold-form repos — the engine handles **app form** best; libraries get a partial-substitute score.
- If `.commitshow/audit.json` already exists and is < 1 hour old, read that instead of re-running. Audit is rate-limited (anonymous: 20/IP/day · 5/repo/day · 2000/day global).
- Inside a private / non-GitHub repo — the audit pulls public GitHub signals, so private repos return a `not_found` error.

## How It Works

### Step 1: Run the audit

From the repo root. The CLI is pinned to a known-good range (an attacker-pushed `0.4.x` won't be picked up silently — bumping the floor is a deliberate edit), the sidecar directory is created up-front, and stderr is split off so install/deprecation warnings can't corrupt the JSON envelope:
