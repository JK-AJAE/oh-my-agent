# WorldCraft Kids — Product Document

**Working name**: WorldCraft Kids
**Version**: 0.1 (Pre-MVP)
**Date**: 2026-05-05
**Status**: Planning

---

## Table of Contents

1. [Product Concept Summary](#1-product-concept-summary)
2. [User Personas](#2-user-personas)
3. [Core User Journeys](#3-core-user-journeys)
4. [Feature List (MVP-Prioritized)](#4-feature-list-mvp-prioritized)
5. [Information Architecture](#5-information-architecture)
6. [UX/UI Design Direction](#6-uxui-design-direction)

---

## 1. Product Concept Summary

### What It Is

WorldCraft Kids is a browser-based creative learning platform where children (ages 6–12, up to Grade 6) build 3D worlds guided by an AI creative partner. The platform treats creation itself as the learning activity — children express ideas, stories, and emotions by placing objects, shaping environments, and narrating their worlds.

### Core Thesis

**Creation IS learning.** Worksheets teach children to recall. WorldCraft Kids teaches children to think, express, and reflect. When a child builds a "lonely mountain with a secret cave," they are practicing spatial reasoning, narrative construction, emotional vocabulary, and creative decision-making simultaneously — without a single multiple-choice question.

### The AI Creative Partner Role

The AI companion (working name: "Spark") guides without dominating. Spark:

- Asks open-ended questions to deepen the child's intent ("What happens inside that cave at night?")
- Offers 2–3 variations when a child is stuck, not a single answer
- Reflects back what the child has built ("I see you made the water darker — what made you choose that?")
- Never completes the child's world for them
- Celebrates decisions, not results ("That's a really interesting choice.")

Spark does not generate the world. The child builds it. Spark asks questions that make the child want to build more.

### What It Is Not

- Not a game with goals, levels, or scores
- Not an AI generator where the child types a prompt and a world appears
- Not a classroom drill tool wearing a creative disguise
- Not multiplayer-first (solo creative expression is the MVP core)

### Platform Target

Web-first (desktop + tablet). Touch and mouse parity. Mobile as P2 stretch. No native app install required for MVP.

---

## 2. User Personas

### Persona 1 — Creative Explorer (Age 7–8)

**Name**: Mia, age 7
**Context**: Second-grader who fills her notebooks with drawings and invents elaborate pretend-play scenarios. She gets frustrated when technology doesn't cooperate quickly.

**Goals**:
- Bring her stories to life in a space that feels like hers
- Make a world her stuffed animals could "live" in
- Show her friends and family what she imagined

**Pain Points**:
- Loses interest if setup takes more than 30 seconds
- Gets stuck if there are too many choices at once
- Feels discouraged when she can't make something look "right"

**Behaviors**:
- Picks objects by appearance, not category
- Names everything she creates
- Abandons projects when interrupted; needs easy re-entry

**How WorldCraft Kids Serves Mia**:
- Onboarding drops her into a starter world in under 60 seconds — she's building before she's done reading
- Object library shows big, recognizable thumbnails grouped by feel ("cozy things," "wild things," "magical things")
- Spark praises the story logic, not the visual fidelity ("I love that the tiny house is next to the big tree — who lives there?")

---

### Persona 2 — Curious Builder (Age 9–10)

**Name**: Theo, age 10
**Context**: Fourth-grader obsessed with how things work. Builds elaborate LEGO systems, reads about animal habitats, and asks "but why?" constantly.

**Goals**:
- Build ecosystems with logical rules (this animal needs this food, which needs this water)
- Understand cause and effect through spatial construction
- Push the limits of what the tool can do

**Pain Points**:
- Gets bored if he can't go deeper into a topic
- Frustrated when he can't find specific objects (wants a "baobab tree," not just "tree")
- Wants to know why things look the way they do

**Behaviors**:
- Reads every tooltip
- Tests edge cases: what happens if I put water on top of a mountain?
- Spends 30 minutes on one small corner of the world

**How WorldCraft Kids Serves Theo**:
- Spark asks systems-thinking questions ("If a predator lives here, where does its prey hide?")
- Object search + tagging allows specific queries ("desert," "nocturnal," "underground")
- Progressive disclosure reveals properties panel with material, size, and placement detail when he's ready for it
- Environment themes include biome-accurate sky, ground, and ambient lighting presets he can study and modify

---

### Persona 3 — Reflective Dreamer (Age 11–12)

**Name**: Aisha, age 12
**Context**: Sixth-grader who keeps a private journal and processes her feelings through art. She's skeptical of "educational" apps and values authenticity over gamification.

**Goals**:
- Build worlds that represent internal emotional states
- Have a creative outlet that doesn't feel like school
- Explore abstract concepts (loneliness, change, in-between spaces) through environment

**Pain Points**:
- Dismisses anything that feels condescending or over-designed for "little kids"
- Distrusts AI suggestions that feel formulaic or hollow
- Wants privacy — doesn't want classmates to see unfinished work

**Behaviors**:
- Works slowly and deliberately
- Titles and annotates her worlds with short written notes
- Returns to old worlds and revises them over time

**How WorldCraft Kids Serves Aisha**:
- Visual style is soft and non-childish — it respects her aesthetic sensibility
- Spark's reflection prompts are open and emotional, never prescriptive ("What does this space feel like to you?")
- Worlds default to private; sharing is an explicit, opt-in act
- Builder supports world notes — a small text field for her to annotate the meaning of the world
- Gallery has a "personal archive" view separate from class/public sharing

---

### Persona 4 — Teacher Facilitator

**Name**: Ms. Chen, 5th Grade Homeroom
**Context**: Ten-year teaching veteran who integrates project-based learning into her classroom. Uses tech purposefully, not as babysitter. Limited time for setup; needs observable outcomes.

**Goals**:
- Assign open creative prompts tied to curriculum themes (ecosystems, historical settings, emotional literacy)
- See what students are working on without disrupting their process
- Spark meaningful class discussion from what students create

**Pain Points**:
- Loses time to student tech confusion in the first 10 minutes of class
- Can't tell if a student "got it" from a 3D world alone — needs some artifact or reflection
- Worried about inappropriate content or sharing

**Behaviors**:
- Sets up assignments a week in advance
- Wants a clean summary view, not a data dashboard
- Shares compelling student work on the class projector

**How WorldCraft Kids Serves Ms. Chen**:
- Teacher portal: create a challenge with a prompt, optional starter world, and due date in under 3 minutes
- Student view feed shows world thumbnail, title, last edited, and any reflection note — no complex metrics
- Content is limited to curated object library — no freeform text or image upload from students
- Projector mode: opens any student world in full-screen read-only Play Mode
- Class gallery: teacher curates which worlds are visible to classmates

---

## 3. Core User Journeys

### Journey 1 — First-Time Child Onboarding (Target: Under 60 Seconds to First Build)

**Entry point**: Child navigates to worldcraftkids.com or teacher-provided link.

```
Landing Screen
  └── Single CTA: "Start Building" (no account required for first session)
        └── Name prompt: "What's your name?" (first name only, optional)
              └── "Pick a starter world" — 3 illustrated cards:
                    [ Cozy Meadow ]  [ Ocean Shore ]  [ Starry Desert ]
                        └── Child taps a card
                              └── Builder Workspace loads (~2s)
                                    └── Spark says: "Hi [Name]! This world is yours.
                                                     What's the first thing you want to add?"
                                          └── Child is in the builder. Timer stops.
```

**Account creation**: Deferred until the child wants to save. After 5 minutes in the builder, a gentle prompt: "Want to save your world? It takes 10 seconds." This reduces front-loaded friction to zero.

**Success criterion**: 90% of children reach first object placement within 60 seconds of landing.

---

### Journey 2 — Building a World from a Creative Prompt

**Entry point**: Dashboard → "New World" button, or teacher-assigned challenge.

```
Dashboard
  └── "New World"
        ├── Option A: "Free Build" — skip to environment selection
        └── Option B: "Start with an idea" — Spark offers 3 prompt cards:
              [ "Build a place where secrets are kept" ]
              [ "What does a perfect afternoon look like?" ]
              [ "Make a world that feels really far away" ]
                    └── Child picks or skips
                          └── Environment theme selection (6 options with live previews):
                                Meadow / Forest / Ocean / Desert / Night Sky / Snowy Peak
                                      └── Builder Workspace opens
                                            └── Spark: "You chose [theme]. 
                                                         What do you want to put here first?"
```

**Building flow inside workspace**:

```
Child drags object from Object Library onto Canvas
  └── Object places at drag point
        └── Spark (after first placement): "Nice! What else belongs here?"
Child places 3–5 objects
  └── Spark: "I see you're building [observed pattern].
               Where does [character/creature] go?"
Child names the world (optional prompt after 10 minutes)
  └── Auto-save occurs every 60 seconds
```

---

### Journey 3 — AI-Guided Iteration and Reflection

**Entry point**: Child has been building for 5–10 minutes, or reopens a saved world.

**Spark interaction model**:

- Spark speaks in a side panel (not a blocking modal)
- Messages are short — max 2 sentences
- Spark offers one question OR one suggestion, never both simultaneously
- Child can dismiss Spark at any time with a single tap

**Iteration sequence**:

```
Child places a mountain
  └── Spark: "That mountain is really tall! 
               Is there anything at the very top?"
        └── Child adds a flag (or ignores)
              └── Child places water nearby
                    └── Spark: "Interesting — the water is right next to the mountain.
                                 Does it flow down?"
                          └── Child rotates the terrain piece
                                └── [Child pauses for 30+ seconds]
                                      └── Spark: "What are you thinking about?"
                                            └── Child types: "I want fog but I don't know how"
                                                  └── Spark: "I can show you 3 ways to make it feel foggy.
                                                               Want to see?"
                                                        └── Spark surfaces 3 object/setting variations
                                                              └── Child picks one and applies it
```

**Reflection trigger** (end of session or on save):

```
Child clicks Save
  └── Spark: "Before you go — what's one thing you love about this world?"
        └── Text input (optional, max 100 chars)
              └── Response stored as world annotation
                    └── "See you next time, [Name]."
```

---

### Journey 4 — Sharing and Viewing Gallery

**Entry point**: Dashboard → Gallery tab, or post-save share prompt.

```
Child finishes saving world
  └── Post-save screen: 
        "Share with your class?" 
        [ Share ]  [ Keep Private ]
              └── If Share:
                    World thumbnail + title enters Class Gallery
                          └── Classmates see it in Gallery
                                └── Reaction: tap one of 4 emoji reactions
                                      (heart / star / wow / hmm — no free text from other kids)
              └── If Keep Private:
                    World stays in personal archive only
```

**Gallery view**:

```
Gallery
  ├── Class Gallery tab (teacher-curated, shared worlds from classmates)
  └── My Worlds tab (all personal worlds, public and private)
        └── Each world card shows:
              - Thumbnail (auto-captured from Play Mode camera)
              - World title
              - Creator name (class gallery only)
              - Reflection note (if written, shown as small italicized text)
              └── Tap → opens Play Mode (read-only first-person explore)
```

---

### Journey 5 — Teacher Assigning a Challenge

**Entry point**: Teacher portal → Challenges tab.

```
Teacher Portal → Challenges → "New Challenge"
  └── Step 1: Write the prompt (text field, max 200 chars)
        e.g. "Build the ecosystem where your favorite animal lives."
  └── Step 2 (optional): Pick a starter world for students
        (select from environment themes or leave blank for free choice)
  └── Step 3: Set due date (date picker)
  └── Step 4: Assign to class (dropdown: select class/group)
  └── Step 5: "Publish Challenge"
        └── Students see challenge card on their Dashboard
              └── Card shows: prompt text, teacher name, due date, "Start Building" CTA
                    └── Clicking CTA launches Journey 2 with the prompt pre-loaded
```

**Monitoring**:

```
Teacher Portal → Challenges → [Challenge Name] → Student Progress
  └── List view, one row per student:
        [ Name ] [ Status: Not Started / In Progress / Submitted ] [ Last Edit ] [ Actions ]
              └── "View World" → opens student's world in read-only Play Mode
                    └── Teacher can flag world for Class Gallery
```

---

## 4. Feature List (MVP-Prioritized)

### P0 — Must Ship (MVP Scope)

These features define the core loop. Without any one of them, the product does not function as described.

| # | Feature | Description | Success Criterion |
|---|---------|-------------|-------------------|
| P0-1 | **Child Onboarding** | Name entry, starter world selection, auto-entry into builder | First object placed within 60s of landing; no account required |
| P0-2 | **3D Builder — Canvas** | Drag-and-drop 3D object placement on a flat terrain canvas | Child can place, move, and delete objects via drag and tap |
| P0-3 | **Object Library** | Curated set of 60–80 3D objects organized by thematic group | Objects load within 500ms; browsable without search on first use |
| P0-4 | **Environment Themes** | 6 prebuilt environment presets (sky, ground, ambient light) | Switching theme takes under 2 seconds; previews visible before selection |
| P0-5 | **AI Companion (Spark)** | Side panel with contextual prompts, questions, and variation suggestions | Spark responds within 1.5s; child can dismiss at any time |
| P0-6 | **Save / Load** | Auto-save every 60s; explicit save with title prompt; load from dashboard | World persists across browser sessions; no data loss on refresh |
| P0-7 | **Play / Explore Mode** | First-person walkthrough of the completed world | Child can enter and exit Play Mode with one tap; runs at 30fps minimum on mid-range tablet |

---

### P1 — Should Ship (Launch Quality)

These features significantly improve usability and retention. Target: ship within 6 weeks of MVP.

| # | Feature | Description | Success Criterion |
|---|---------|-------------|-------------------|
| P1-1 | **Gallery (Class + Personal)** | View shared and personal worlds as thumbnail cards with Play Mode entry | Gallery loads in under 2s; reaction system works without auth friction |
| P1-2 | **Undo / Redo** | Multi-step undo/redo for object placement actions | Undo/redo works for last 20 actions; keyboard shortcut + button |
| P1-3 | **Object Color / Texture** | Recolor placed objects from a curated 12-color palette; 3 texture options per object type | Color change is instantaneous; palette is accessible (sufficient contrast) |
| P1-4 | **Simple Animations** | Toggle idle animations on objects (flag waves, water ripples, clouds drift) | Animations run without frame-rate degradation; toggleable per object |

---

### P2 — Nice to Have (Post-Launch Sprint)

These features broaden the platform's value without being required for core use.

| # | Feature | Description | Success Criterion |
|---|---------|-------------|-------------------|
| P2-1 | **Teacher Dashboard** | Assign challenges, monitor student progress, flag worlds for class gallery | Teacher can create and publish a challenge in under 3 minutes |
| P2-2 | **Sharing & Reactions** | Share worlds to class gallery; emoji reaction system | Sharing is opt-in; reactions limited to 4 preset emoji, no free text |
| P2-3 | **Remix Mode** | Load a classmate's world as a starting template for your own | Remix creates a copy, does not alter the original; attribution shown |
| P2-4 | **Creative Challenges** | Rotating prompt cards on dashboard ("Build a world that starts with W") | New challenge appears weekly; accessible from dashboard without teacher |

---

### P3 — Future Roadmap

Not scoped for current development cycle. Captured for strategic alignment.

| # | Feature | Notes |
|---|---------|-------|
| P3-1 | **Multiplayer Co-Build** | Real-time shared canvas; requires conflict resolution and moderation infrastructure |
| P3-2 | **Voice Input** | Child narrates intention; Spark listens and asks back; requires on-device or privacy-compliant ASR |
| P3-3 | **Curriculum Mapping** | Tag worlds and challenges to learning standards (NGSS, Common Core ELA); requires district partnerships |
| P3-4 | **Mobile Native App** | iOS/Android app with offline mode; web-first proves concept before native investment |
| P3-5 | **World Export** | Export as static 3D scene or sharable link outside the platform |

---

## 5. Information Architecture

### Full Screen Hierarchy

```
worldcraftkids.com
├── /                          Landing Page
│     └── "Start Building" CTA → Onboarding Flow
│
├── /onboarding                Onboarding Flow (guest session)
│     ├── Step 1: Name entry
│     ├── Step 2: Starter world selection (3 cards)
│     └── Step 3: → /builder (new world, unsaved)
│
├── /dashboard                 Dashboard — My Worlds (requires account after first save)
│     ├── World cards grid (thumbnail, title, last edited)
│     ├── "New World" CTA → /builder (new)
│     ├── Challenge cards (teacher-assigned, if any)
│     └── Gallery tab → /gallery
│
├── /builder/:worldId          Builder Workspace (core screen)
│     ├── Canvas (3D viewport, 70%+ of screen)
│     │     └── Object placement, selection, deletion
│     ├── Object Library Panel (left or bottom)
│     │     ├── Thematic groups (tabs: Cozy / Wild / Magical / Urban / Nature / Sky)
│     │     ├── Search input
│     │     └── Object thumbnails (drag to canvas)
│     ├── AI Companion Panel (right side, collapsible)
│     │     ├── Spark message bubble
│     │     ├── Child text reply input (optional)
│     │     └── Variation suggestions (shown contextually)
│     ├── Properties Panel (bottom bar, contextual)
│     │     ├── Color palette (shown when object selected)
│     │     ├── Texture options (shown when object selected)
│     │     ├── Animation toggle (shown when object selected)
│     │     └── Object scale slider (min/max constrained per object)
│     ├── Toolbar (top bar, minimal)
│     │     ├── World title (editable inline)
│     │     ├── Environment theme switcher
│     │     ├── Undo / Redo buttons
│     │     ├── Save button (manual trigger)
│     │     └── Play Mode button
│     └── → /play/:worldId       Play Mode (launched from toolbar)
│
├── /play/:worldId             Play / Explore Mode
│     ├── First-person 3D walkthrough
│     ├── WASD / swipe navigation
│     ├── "Back to Builder" button (overlay, top-left)
│     └── World title + creator name overlay (top-center)
│
├── /gallery                   Gallery
│     ├── Class Gallery tab
│     │     ├── World cards (shared by classmates, teacher-curated)
│     │     ├── Reaction system (4 emoji, tap-to-react)
│     │     └── Each card → /play/:worldId (read-only)
│     └── My Worlds tab
│           ├── All personal worlds (public and private)
│           └── Each card → /builder/:worldId (own worlds) or /play/:worldId (others)
│
└── /teacher                   Teacher Portal (separate authenticated context)
      ├── /teacher/dashboard    Overview (classes, recent activity)
      ├── /teacher/challenges   Challenge management
      │     ├── Challenge list
      │     ├── New Challenge form
      │     └── /teacher/challenges/:id/progress   Student progress view
      └── /teacher/gallery      Class gallery curation
            └── Flag / unflag worlds for class visibility
```

---

### Component Ownership Map

| Panel / Component | Primary Interaction | Data Dependency |
|-------------------|--------------------|--------------------|
| Canvas (3D Viewport) | Drag, tap, rotate (trackpad/touch) | World state (object list, positions) |
| Object Library Panel | Browse, search, drag | Object catalog (static CDN) |
| AI Companion Panel | Read, type optional reply | Spark API (world state context) |
| Properties Panel | Tap color/texture, toggle animation | Selected object state |
| Toolbar | Tap buttons, edit title inline | World metadata |
| Play Mode | Navigate via keyboard/swipe | World state (read-only render) |
| Gallery Cards | Browse, tap reaction | World index (per class/user) |
| Teacher Portal | Form inputs, list views | Class roster, challenge store |

---

## 6. UX/UI Design Direction

### Visual Identity

**Aesthetic**: "Cozy Studio" — warm, inviting, and creative without being loud or game-like. Think a child's art room with good light, not a HUD-heavy game interface.

**Tone**: Encouraging and spacious. The UI steps back and lets the world (canvas) be the hero.

**Not**: Dark UI, neon colors, achievement banners, progress bars, score counters, anything that feels competitive or evaluative.

---

### Color System

| Token | Value | Usage |
|-------|-------|-------|
| `color-primary` | Warm Purple `#7C5CBF` | CTAs, Spark messages, active states |
| `color-primary-light` | Lavender `#C4B0E8` | Panel backgrounds, hover states |
| `color-secondary` | Sky Blue `#5AB4D6` | Secondary actions, Play Mode accents |
| `color-accent` | Coral `#F4785A` | Reactions, celebrate moments, Spark "wow" state |
| `color-background` | Cream `#FAF7F2` | Page and panel backgrounds |
| `color-surface` | Soft White `#FFFFFF` | Cards, modals, input fields |
| `color-text-primary` | Charcoal `#2E2A26` | Body text, labels |
| `color-text-secondary` | Warm Gray `#7A736B` | Subtitles, placeholders, timestamps |
| `color-border` | Stone `#E3DDD6` | Dividers, panel borders |

All foreground/background pairs must meet WCAG AA contrast (4.5:1 for body text, 3:1 for large text and UI components).

---

### Typography

**Primary font**: System font stack — `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

Rationale: Performance-first for a canvas-heavy app; system fonts render crisply across all platforms without flash-of-unstyled-text.

| Role | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Display | 32px | 700 | 1.2 | Onboarding headings, world titles in gallery |
| Heading | 24px | 600 | 1.3 | Panel section headers |
| Body | 18px | 400 | 1.6 | Spark messages, descriptions |
| Label | 14px | 500 | 1.4 | Object names, button text, tooltips |
| Caption | 12px | 400 | 1.5 | Timestamps, fine print (min usage) |

**Minimum body size**: 16px on mobile (18px preferred). No text under 12px in any context.

---

### Iconography

- **Style**: Rounded corners, filled shapes, 2px stroke minimum (where outlined)
- **Size tiers**: 24px (toolbar), 32px (object library thumbnails), 48px (onboarding selection cards)
- **Set**: Use a single icon family throughout (Phosphor Icons or Lucide — rounded variants)
- **Labels**: All icons in the toolbar have visible text labels below; icon-only is never the only affordance

---

### Layout Principles

**Canvas-dominant**: The 3D canvas occupies a minimum of 70% of the viewport width on desktop, and full screen minus the bottom panel on tablet.

**Floating panels**: Object Library and AI Companion panels float over the canvas (with a subtle drop shadow on `color-background`), collapsible to a narrow icon strip to maximize canvas space.

**Responsive tiers**:

| Breakpoint | Layout |
|------------|--------|
| 375px (mobile) | Single column; bottom sheet for Object Library; AI Companion collapsed to floating button |
| 768px (tablet, portrait) | Canvas full-width; bottom panel for objects; right panel for Spark |
| 1024px (tablet, landscape / laptop) | Canvas 70%; left panel for objects; right panel for Spark |
| 1280px+ (desktop) | Canvas 75%; left panel wider; right panel with extended Spark history |

**8px base grid**: All spacing in multiples of 8px (8, 16, 24, 32, 40, 48).

---

### Interaction Design

**Touch targets**: Minimum 48x48px for all interactive elements. Draggable objects in the library have a 64x64px thumbnail.

**Primary interaction**: Drag-and-drop from library to canvas. Tap to select; tap again to deselect. Long-press (or right-click) shows context menu (delete, duplicate, properties).

**Drag feedback**: Object previews a ghost image at 60% opacity while dragging; snaps to grid with a subtle "pop" spring animation on release.

**Selection state**: Selected object shows a warm-purple highlight ring (3px, `color-primary`) with resize handles.

**Progressive disclosure**:
- Default state: canvas + object library only
- After first object placed: Spark panel appears with a subtle slide-in from right
- After object selected: Properties panel rises from bottom (slide-up, 200ms ease-out)
- Advanced options (scale, rotation degrees, material override): revealed behind a "More" chevron, not shown by default

---

### Motion and Animation

**Guiding principle**: Animations celebrate creative moments and provide spatial feedback — never decorative noise.

| Interaction | Animation | Duration | Easing |
|-------------|-----------|----------|--------|
| Object drop onto canvas | Spring "settle" + scale 0.9→1.05→1.0 | 250ms | Spring (stiffness 280, damping 24) |
| Spark message arrival | Slide up + fade in | 200ms | ease-out |
| Panel open/close | Slide + fade | 180ms | ease-in-out |
| Play Mode enter | Crossfade to full screen | 300ms | ease-in-out |
| Reaction emoji tap | Scale 1.0→1.4→1.0 + particle burst | 400ms | Spring |
| World save confirmation | Checkmark draw + brief color flash on button | 500ms | ease-out |

**`prefers-reduced-motion`**: All non-essential animations are disabled. Object placement has a simple opacity flash (100ms) instead of spring. No spring physics run.

---

### AI Companion (Spark) UI Specifications

**Visual presence**: A small rounded avatar (40x40px, warm purple, stylized spark icon) with a speech bubble to its right. Does not take up its own panel section — the message bubble floats just above the bottom-right of the canvas in compact mode.

**Message bubble**:
- Background: `color-primary-light` (`#C4B0E8`)
- Border radius: 16px
- Max width: 280px
- Text: `color-text-primary`, body size (18px)
- Always shows a dismiss ("×") button
- Messages fade out after 15 seconds if no interaction; Spark does not spam

**Input field** (child response):
- Appears below the bubble when Spark asks an open question
- Placeholder: "Type what you think..."
- Max 100 chars; character count visible at 80+
- Submitting with Enter or tap sends reply; Spark responds within 1.5s

**Variation cards** (shown when Spark offers alternatives):
- 3 small cards in a horizontal strip, each with a preview thumbnail and 1-line description
- Tapping a card applies the variation to canvas and closes the strip

---

### Component Patterns (shadcn/ui Base)

Use shadcn/ui as the component foundation with the following customizations:

| Component | Base | Customization |
|-----------|------|---------------|
| Button (primary) | `Button` | `bg-[#7C5CBF]`, rounded-full, min-h-[48px], font-weight 600 |
| Button (secondary) | `Button variant="outline"` | `border-[#5AB4D6]`, `text-[#5AB4D6]` |
| Card (world thumbnail) | `Card` | rounded-2xl, 2px border `color-border`, hover: shadow-md scale-[1.02] |
| Input field | `Input` | rounded-xl, bg-surface, focus ring `color-primary` |
| Sheet (mobile object library) | `Sheet side="bottom"` | Half-screen, drag handle, rounded-t-2xl |
| Tooltip | `Tooltip` | Max-width 200px, bg-charcoal, rounded-lg, 12px text |
| Badge (challenge status) | `Badge` | Rounded-full, color-coded by status |

Install command: `npx shadcn@latest add button card input sheet tooltip badge`

---

### Accessibility Baseline

- WCAG AA for all text and interactive elements
- All interactive elements keyboard-accessible (Tab + Enter/Space)
- Object Library navigable via arrow keys when focused
- Spark messages announced via `aria-live="polite"` region
- Canvas: accessible name ("3D building canvas"), keyboard object placement mode (arrow keys to move selected object)
- Color alone is never the only differentiator (always paired with shape, text, or icon)
- Focus indicators: visible 3px purple ring on all focusable elements (never outline: none without replacement)

---

*Document owner: Product — WorldCraft Kids*
*Next review: Sprint 1 kickoff*
