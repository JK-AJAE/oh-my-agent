---
name: "hig-project-context"
description: "Create or update a shared Apple design context document that other HIG skills use to tailor guidance."
category: "custom-skill"
trigger: "/hig-project-context"
---

# Apple HIG: Project Context

Create and maintain `.claude/apple-design-context.md` so other HIG skills can skip redundant questions.

Check for `.claude/apple-design-context.md` before asking questions. Use existing context and only ask for information not already covered.

## Gathering Context

Before asking questions, auto-discover context from:

1. **README.md** -- Product description, platform targets
2. **Package.swift / .xcodeproj** -- Supported platforms, minimum OS versions, dependencies
3. **Info.plist** -- App category, required capabilities, supported orientations
4. **Existing code** -- Import statements reveal frameworks (SwiftUI vs UIKit, HealthKit, etc.)
5. **Assets.xcassets** -- Color assets, icon sets, dark mode variants
6. **Accessibility audit** -- Grep for accessibility modifiers/attributes

Present findings and ask the user to confirm or correct. Then gather anything still missing:

### 1. Product Overview
- What does the app do? (one sentence)
- Category (productivity, social, health, game, utility, etc.)
- Stage (concept, development, shipped, redesign)

### 2. Target Platforms
- Which Apple platforms? (iOS, iPadOS, macOS, tvOS, watchOS, visionOS)
- Minimum OS versions
- Universal or platform-specific?

### 3. Technology Stack
- UI framework: SwiftUI, UIKit, AppKit, or mixed?
- Architecture: single-window, multi-window, document-based?
- Apple technologies in use? (HealthKit, CloudKit, ARKit, etc.)

### 4. Design System
- System defaults or custom design system?
- Brand colors, fonts, icon style?
- Dark mode and Dynamic Type support status

### 5. Accessibility Requirements
- Target level (baseline, enhanced, comprehensive)
- Specific considerations (VoiceOver, Switch Control, etc.)
- Regulatory requirements (WCAG, Section 508)

### 6. User Context
- Primary personas (1-3)
- Key use cases and environments (desk, on-the-go, glanceable, immersive)
- Known pain points or design challenges

### 7. Existing Design Assets
- Figma/Sketch files?
- Apple Design Resources in use?
- Existing component library?

## Context Document Template

Generate `.claude/apple-design-context.md` using this structure:
