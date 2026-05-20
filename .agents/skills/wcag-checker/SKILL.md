---
name: "wcag-checker"
description: "WCAG 2.1/2.2 accessibility verification checklist and automated audit methodology skill. Use for requests like 'verify accessibility', 'WCAG check', 'check contrast ratio', 'ARIA audit', 'keyboard accessibility', 'screen reader test', etc. Note: running actual assistive technology (JAWS/NVDA), legal consultation, and accessibility certification issuance are outside the scope of this skill."
category: "utility"
---

# WCAG Checker — Accessibility Verification Checklist + Tools

A domain knowledge skill that enhances the a11y-auditor agent's accessibility verification capabilities.

## Target Agents

- **a11y-auditor** — Uses this skill's checklist and formulas to verify per-component accessibility
- **component-developer** — Checks accessibility requirements proactively during development

## WCAG 2.1 AA Mandatory Criteria Checklist

### 1. Perceivable

| Criterion | Item | Verification Method | Severity |
|----------|------|-------------------|----------|
| 1.1.1 | Alt text for non-text content | `img` has `alt`, decorative images have `alt=""` | P0 |
| 1.3.1 | Info and relationships programmatically determined | Semantic HTML, ARIA roles | P0 |
| 1.3.2 | Meaningful sequence | DOM order = visual order | P1 |
| 1.4.1 | Color not sole means of conveying info | Supplemented with icons/text | P0 |
| 1.4.3 | Contrast ratio minimum 4.5:1 (normal), 3:1 (large) | Contrast ratio formula calculation | P0 |
| 1.4.4 | No content loss at 200% zoom | Use `rem`/`em` units | P1 |
| 1.4.11 | Non-text UI contrast ratio 3:1+ | Focus rings, borders, icons | P0 |

### 2. Operable

| Criterion | Item | Verification Method | Severity |
|----------|------|-------------------|----------|
| 2.1.1 | Keyboard accessible | Tab/Enter/Space/Esc/Arrow behavior | P0 |
| 2.1.2 | No keyboard trap | Tab out possible from all elements | P0 |
| 2.4.3 | Logical focus order | No positive `tabindex` values | P0 |
| 2.4.7 | Visual focus indicator | `:focus-visible` styling | P0 |

### 3. Understandable

| Criterion | Item | Verification Method | Severity |
|----------|------|-------------------|----------|
| 3.1.1 | Page language specified | `<html lang="en">` | P0 |
| 3.2.1 | No context change on focus | Focus alone must not trigger navigation | P0 |
| 3.3.1 | Error identification text provided | Text error messages beyond color alone | P0 |
| 3.3.2 | Labels or instructions | `<label>` association; no placeholder-only usage | P0 |

### 4. Robust

| Criterion | Item | Verification Method | Severity |
|----------|------|-------------------|----------|
| 4.1.2 | Name, role, value programmatically determined | ARIA attribute accuracy | P0 |
| 4.1.3 | Status messages conveyed to assistive technology | `aria-live`, `role="status"` | P1 |

## Contrast Ratio Calculation Formula

### Relative Luminance
