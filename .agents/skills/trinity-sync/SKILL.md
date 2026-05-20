---
name: "trinity-sync"
description: ""
category: "utility"
Name: "Trinity Sync Finalizer"
Description: "사용자가 코드의 최종 확정을 요청하거나, 기획(CD)·디자인(VS)·구조(UA)·엔지니어링(CE)·검증(LA) 5자 교차 검증을 통해 충돌 없는 무결점 최종 코드와 아키텍처 결정 기록(ADR)을 도출해야 할 때 가동합니다."
trigger: "/trinity-sync"
mode: "expert"
---

# ⚡ SKILL: Trinity Sync Execution

**[Core Objective]**
Execute a silent, background cross-validation using the predefined personas (Creative Director, Visual Stylist, UI Architect, Core Engineer, Logic Audit) and output ONLY the final, flawless code block alongside its Architecture Decision Record (ADR).

**[Action Pipeline]**
1. **Persona Simulation**: Silently process the user's input strictly through the constraints of CD, VS, UA, CE, and LA workflows.
2. **Conflict Resolution**: Identify and resolve architectural, styling (CSS/Tokens), or UI/UX conflicts internally without prompting the user.
3. **Resource Integration**: If applicable, analyze ideal output patterns from `./examples/` before generating the final logic.
4. **Code Synthesis**: Merge the optimized logic into a SINGLE, complete code block. (NO TRUNCATION allowed).
5. **ADR Generation**: Summarize decisions, alternatives, and resolved conflicts using the standard ADR format.

**[Strict Constraints]**
- Do NOT output greetings, conversational filler, or internal debate steps.
- Output strictly the final code block and the ADR.
- **LANGUAGE OVERRIDE: All final outputs, explanations, and ADRs MUST be written in professional, native-level Korean.**

**[Folder Asset References]**
- `examples/`: Reference this directory for ideal ADR formats or code style guidelines, if present.
