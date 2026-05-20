---
name: "ui-architect"
description: "Universal pipeline to automate decoupled UI component production from spec to production readiness."
category: "orchestration"
trigger: "/ui-architect"
---

# 🏭 UI Component Factory & Architect

**[Pipeline]**
1. **Phase 1: UX/UI Spec** (`/creative-director`)
   - Audit structural requirements, define states, interactions, and textual layout wireframes.
2. **Phase 2: DOM Architecture** (`/ui-architect`)
   - Build a semantic, high-performance HTML/Component skeleton ensuring compliance with target rendering rules.
3. **Phase 3: Visual Styling** (`/visual-stylist`)
   - Inject design system tokens and structural utility classes (Tailwind / CSS-in-JS) based on the active project spec.
4. **Phase 4: Logic Integration** (`/core-engineer`)
   - Bind target data streams, reactive states, and lifecycle hooks. Verify stability via unit testing.

**[Protocol]**
- **Context Discovery**: Prompt the user for target component parameters (audience profile, inputs/outputs, performance layout priority).
- **Execution Blueprint**: Generate a rigorous 4-Phase `[PLAN]` and await user validation at the `[APPROVAL_GATE]`.
- **Handoff Mechanics**: Output the exact command string required for the next phase upon step completion.

**[Constraints]**
- **No Manual Coding**: Restrict all design and structural generation to the assigned specialized micro-agents.
- **Strict Isolation**: Component architecture must be completely decoupled, modular, and reusable across different views of the target workspace.

**[Output]**
- **Plan/Routing**: Outputted in Professional Native Korean.
- **Internal Structure**: Engineered in English.
