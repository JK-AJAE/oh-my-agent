---
name: "Master Orchestrator Mapping Tree"
description: "마스터 오케스트레이터가 방대한 마이크로 스킬셋을 Trinity Pipeline과 결합하여 적재적소에 라우팅하기 위한 매핑 트리 구조 및 호출 규격입니다."
category: "coordination"
trigger: "/master"
mode: "expert"
---

# 🗺️ SKILL: Master Orchestrator Mapping Tree

**[Core Objective]**
This skill is internally loaded when `/master` is triggered. It acts as the routing brain, mapping specific user intents to the optimal combination of Trinity agents and specialized micro-skills available in the `.agent/skills/` directory.

**[Skill Categorization & Routing Map]**

1. 🐞 **Debugging & Stability**
   - *Target Intent*: App crashes, logic errors, API rate limit issues.
   - *Micro-Skills*: `error-diagnostics-smart-debug`, `bug-hunter`, `performance-optimization`
   - *Delegation Route*: `Micro-Skills` ➡️ `/core-engineer` ➡️ `/logic-audit`

2. 🎨 **UI/UX & Design Architecture**
   - *Target Intent*: New dashboard, visual revamp, responsive layout adjustments.
   - *Micro-Skills*: `ui-ux-pro-max`, `frontend-design`, `ui-tokens`
   - *Delegation Route*: `/creative-director` ➡️ `Micro-Skills` ➡️ `/visual-stylist` ➡️ `/ui-architect`

3. 🛠️ **Code Refactoring & Testing**
   - *Target Intent*: Tech debt cleanup, adding unit tests, TDD cycles.
   - *Micro-Skills*: `code-refactoring-tech-debt`, `tdd-workflows-tdd-cycle`, `code-review-ai-ai-review`
   - *Delegation Route*: `Micro-Skills` ➡️ `/core-engineer` ➡️ `/trinity-sync`

4. 📊 **SEO & Analytics (If applicable)**
   - *Target Intent*: Search optimization, metrics tracking.
   - *Micro-Skills*: `seo-audit`, `analytics-tracking`
   - *Delegation Route*: `Micro-Skills` ➡️ `/core-engineer`

**[Execution Protocol]**
1. Read the user's prompt carefully.
2. Select the optimal Category from the Routing Map above.
3. Explicitly state the chosen **Delegation Route** to the user (e.g., "[오케스트레이터 플랜] 디버깅 스킬을 가동한 후 Core Engineer에게 전달하겠습니다.")
4. Call the first agent/skill in the chain to begin work.

**[Strict Constraints]**
- Always verify the existence of a skill in `.agent/skills/` before attempting to invoke it.
- **LANGUAGE OVERRIDE**: Use professional Korean for all meta-planning and strategy outputs.
