# Worldcraft — Product Documentation

**Working Title**: Worldcraft
**Target Audience**: Children under Grade 6 (ages 5–11)
**Document Status**: Draft v0.1
**Last Updated**: 2026-05-05

---

## Table of Contents

1. [Product Concept Summary](#1-product-concept-summary)
2. [User Personas](#2-user-personas)
3. [Core User Journeys](#3-core-user-journeys)
4. [Feature List (MVP Priority)](#4-feature-list-mvp-priority)
5. [Information Architecture](#5-information-architecture)
6. [UX/UI Design Direction](#6-uxui-design-direction)
7. [Safety & Moderation](#7-safety--moderation)

---

## 1. Product Concept Summary

### Vision

Worldcraft is an AI-driven 3D creative learning platform built for children in Grades K–5 (approximately ages 5–11). Children build imaginary 3D worlds — and in doing so, they learn spatial reasoning, creative problem-solving, narrative thinking, and digital literacy — without ever feeling like they are in a classroom.

### Core Idea

> **Creation IS the learning process.**

The act of building — placing a tree beside a castle, choosing the color of the sky, deciding whether a fish can fly — is where learning happens. Worldcraft does not layer learning on top of play. It makes play itself the curriculum.

### The AI Creative Partner

Worldcraft's AI companion (working name: "Spark") guides children's imagination through:

- **Prompts**: Open-ended questions that invite reflection and new ideas ("What lives under that bridge?")
- **Variations**: Gentle suggestions that expand what a child has already made ("What if it was nighttime here?")
- **Reflection**: Simple prompts that encourage children to talk about their choices ("Why did you pick the ocean theme?")

Spark never dominates. It never completes a creation for the child. It listens, suggests, celebrates, and steps back. The child's imagination leads; Spark is a creative sidekick, not a director.

### Design Principles

| Principle | Description |
|-----------|-------------|
| Child Agency | Every decision is the child's. The AI responds, never commands. |
| Low Floor, High Ceiling | Instantly approachable for a 5-year-old; expressive enough for an 11-year-old. |
| Emotional Safety | Creations are never judged as wrong or right. All worlds are valid. |
| Progressive Complexity | Tools reveal themselves as children are ready, not all at once. |
| Teacher-Enabled | Classroom use is a first-class experience, not an afterthought. |

---

## 2. User Personas

### Persona 1 — Maya, Age 7 (Primary User)

**Nickname**: The Dreamer

| Attribute | Detail |
|-----------|--------|
| Age | 7 years old, Grade 2 |
| Device | Family iPad at home; school Chromebook in class |
| Tech comfort | Plays mobile games, can navigate YouTube Kids independently |
| Reading level | Emerging reader; relies heavily on icons and audio cues |
| Motivation | Loves stories, drawing, and imaginative play ("I want to make a unicorn farm") |
| Frustrations | Gets confused by long menus; gives up when she can't find what she wants quickly |
| Goals | Make something colorful and fun; show her parents what she built |
| Key needs | Large tap targets, audio feedback, icon-first UI, instant gratification, encouraging tone |

**Design implications**: Minimal text in UI, large colorful buttons, Spark speaks out loud with a friendly voice, onboarding completes in under 60 seconds, first creation feels finished and shareable.

---

### Persona 2 — Ethan, Age 10 (Primary User)

**Nickname**: The Architect

| Attribute | Detail |
|-----------|--------|
| Age | 10 years old, Grade 5 |
| Device | School Chromebook; home desktop |
| Tech comfort | Plays Minecraft and Roblox; comfortable with layered menus |
| Reading level | Fluent reader; can follow written instructions |
| Motivation | Wants to build something complex: a working city with a train system |
| Frustrations | Feels patronized by baby-ish UX; wants more control and precision |
| Goals | Build elaborate worlds; show friends; iterate and improve over multiple sessions |
| Key needs | Undo/redo, save versioning, detailed object controls, challenge modes with goals |

**Design implications**: Progressive disclosure of advanced tools, challenge modes with optional constraints, project history, ability to load/save multiple named projects.

---

### Persona 3 — Ms. Park, Age 34 (Secondary User)

**Nickname**: The Facilitator

| Attribute | Detail |
|-----------|--------|
| Age | 34, Grade 3 teacher |
| Device | School laptop (Windows); classroom projector |
| Tech comfort | Confident with Google Classroom; learns new tools if they save time |
| Motivation | Needs a structured creative activity that fits a 45-minute class period |
| Frustrations | Tools that require lengthy setup; content she can't preview or control; no way to see student progress |
| Goals | Assign a themed creative challenge; review student work as a class; connect to curriculum topics |
| Key needs | Class roster management, challenge assignment, gallery review mode, progress visibility, no student-to-student messaging |

**Design implications**: Teacher dashboard with class overview, assignable creative challenge templates, gallery view for class review on projector, teacher moderation controls.

---

## 3. Core User Journeys

### Journey 1 — First-Time Child Experience (Onboarding → First Creation)

**Goal**: A child with no prior experience completes onboarding and finishes their first 3D world creation within 5 minutes, feeling proud of the result.

```
Step 1: Launch
  → Child opens Worldcraft
  → Sees a welcoming, animated splash screen (no text-heavy login)
  → Taps "Start Creating" (large button, icon + text)

Step 2: Onboarding (< 60 seconds)
  → Spark appears: "Hi! I'm Spark. I help you build amazing worlds."
  → Interactive tutorial: drag one object into the scene (forest theme pre-set)
  → Spark: "You did it! What should we add next?"
  → Skip option available at any point (top-right corner)

Step 3: Theme Selection
  → 5 large illustrated tiles: Forest / Ocean / Space / City / Fantasy
  → Spark suggests: "Ooh, which world feels like YOU today?"
  → Child taps a theme; environment loads instantly with ambient sound

Step 4: First Creation
  → Object palette opens with 6–8 thematic objects (large icons, no text)
  → Child drags objects into the 3D scene
  → Tap object → color picker, rotate handle, scale handle appear
  → Spark prompts at natural pauses: "What's this place called?"

Step 5: Play Mode
  → Child taps the "Play" button (rocket icon)
  → Camera moves into the world; ambient sounds play
  → Simple "Explore" mode: no controls to learn, just experience the world

Step 6: Save & Share
  → "Great world! Want to save it?" — Spark prompt
  → Child types (or voice-inputs) a world name
  → "Save" stores project; "Share to Gallery" makes it visible to class (if in school mode)
  → Celebration animation + Spark cheers
```

**Success criteria**: Time from launch to first saved creation under 5 minutes; no error states encountered; child expresses positive emotion.

---

### Journey 2 — Returning Child (Load → Iterate → Share)

**Goal**: A child who has used Worldcraft before continues a project, improves it, and shares it with their class.

```
Step 1: Return Visit
  → Child sees "Welcome back, Maya!" with avatar/name
  → "My Worlds" grid shows thumbnail previews of saved projects
  → Spark: "Your ocean world is waiting for you!"

Step 2: Load Project
  → Child taps their saved world thumbnail
  → World loads in under 3 seconds
  → Scene is exactly as left; undo history preserved

Step 3: Iterate
  → Child adds new objects, changes colors, rearranges layout
  → Spark offers periodic prompts: "What if the sky changed color?"
  → Undo/redo available (circular arrow buttons, always visible)

Step 4: Version Save
  → Child saves; new version is created (not overwriting)
  → "Your world grew!" — Spark milestone message

Step 5: Share to Gallery
  → Child taps "Share" → selects class gallery or personal link
  → Sets a title and optional description (voice or text)
  → World appears in class gallery for teacher and peers to view
```

---

### Journey 3 — Teacher Assigns Challenge → Students Create → Gallery Review

**Goal**: A teacher assigns a themed creative challenge to her class, students complete it, and the class reviews the gallery together on a projector.

```
Step 1: Teacher Setup (Teacher Dashboard)
  → Ms. Park logs into teacher account
  → Navigates to "Challenges" tab
  → Selects "Design an Underwater City" from challenge library
    (or creates a custom challenge with a prompt and theme)
  → Assigns to Class 3B, sets due date
  → Challenge appears in each student's Worldcraft home screen

Step 2: Students Create (Student View)
  → Students see challenge banner: "Ms. Park set a challenge: Underwater City!"
  → Tapping it starts a focused creation session:
    - Ocean theme pre-selected and locked
    - Challenge prompt displayed by Spark
    - Optional constraints shown (e.g., "Include at least one building")
  → Students create at their own pace; Spark provides challenge-specific prompts

Step 3: Submission
  → Student taps "Submit to Ms. Park"
  → World is saved and flagged as submitted
  → Teacher is notified (dashboard badge)

Step 4: Gallery Review (Teacher-Led)
  → Teacher opens class gallery in "Presentation Mode"
  → Projects displayed one at a time, full-screen
  → Teacher can highlight specific worlds; add written comment
  → Students can react with emoji (no text messages)
  → Teacher can feature a "World of the Week"
```

---

### Journey 4 — Creative Challenge Mode Flow

**Goal**: A child chooses a Creative Challenge independently and completes a guided creative session with optional constraints and Spark-guided reflection.

```
Step 1: Challenge Discovery
  → From home screen, child taps "Challenges" tab
  → Sees colorful illustrated challenge cards:
    "Build a treehouse", "Design a robot city", "Make a night market"
  → Each card shows: theme icon, estimated time, difficulty star rating

Step 2: Challenge Start
  → Child taps a challenge card → brief animated intro
  → Spark explains the challenge in 1–2 sentences (audio + icon)
  → Optional: "Want a hint?" toggle

Step 3: Constrained Creation
  → Theme and object palette are scoped to the challenge
  → Progress indicator shows optional goals ("Added 3 objects", "Used 2 colors")
  → No hard requirements — child can submit at any point

Step 4: Completion + Reflection
  → "I'm done!" button triggers Spark reflection prompt:
    "What's your favorite part of your world?"
  → Child responds (voice or choice from 3 illustrated options)
  → Spark celebrates with animation and badge unlock

Step 5: Gallery + Remix
  → Completed challenge world added to personal gallery
  → Option to "Remix a friend's world" (view-only copy to modify)
  → Challenge marked as complete; next challenge unlocked
```

---

## 4. Feature List (MVP Priority)

### P0 — Must Have for MVP

These features define the minimum viable product. Without them, the core experience is broken.

| # | Feature | Description | Acceptance Criteria |
|---|---------|-------------|---------------------|
| P0-01 | Child-friendly onboarding | < 60-second interactive tutorial, skippable, no account required for first session | Child completes first creation without reading any text |
| P0-02 | 3D world builder — drag-and-drop | Touch and mouse drag to place objects in a 3D scene | Objects snap to grid; no collision errors; works on tablet and desktop |
| P0-03 | Object manipulation | Move, rotate, scale, and color any placed object | All operations accessible via tap/click on object; no menus deeper than 2 levels |
| P0-04 | Environment themes | Forest, Ocean, Space, City, Fantasy with pre-set skyboxes, ground, and ambient sound | Theme loads in < 2 seconds; each theme has minimum 8 unique objects |
| P0-05 | AI creative companion (Spark) | Spark offers contextual creative prompts, variations, and celebrations | Spark responds within 1 second; all output is age-appropriate and non-directive |
| P0-06 | Play / explore mode | Child enters world and experiences it from a first-person or orbit camera | Mode accessible via single tap; exits gracefully back to builder |
| P0-07 | Save / load projects | Projects persist between sessions, associated with child profile | Auto-save every 60 seconds; manual save available; project recoverable after crash |
| P0-08 | Basic gallery | Personal gallery of saved worlds shown as thumbnail grid | Thumbnails generated at save time; grid loads in < 2 seconds |
| P0-09 | Child account creation | Simple account flow (parent email + child display name), no child email required | Compliant with COPPA; parental consent captured before any data stored |

---

### P1 — Next Iteration

These features significantly improve engagement and classroom value. Target for Version 1.1.

| # | Feature | Description | Notes |
|---|---------|-------------|-------|
| P1-01 | Creative challenge modes | Pre-designed challenge prompts with optional constraints and progress tracking | See Journey 4 |
| P1-02 | Undo / redo + versioning | Multi-step undo/redo; named version snapshots saved automatically | Minimum 30 undo steps; versioning UI is non-technical |
| P1-03 | Teacher dashboard | Class roster, challenge assignment, submission tracking, gallery moderation | Role-based access; teacher login separate from student flow |
| P1-04 | Sharing and remix | Share world to class gallery; view and remix a copy of another child's world | Original world is never modified; remix is a new copy |
| P1-05 | Simple animations | Loop animations on objects (spin, bounce, float) via single-tap animation picker | No timeline or keyframe UI; animations are preset loops |

---

### P2 — Future

These are high-value future capabilities that require significant infrastructure or design investment.

| # | Feature | Description | Notes |
|---|---------|-------------|-------|
| P2-01 | Multiplayer worlds | Two or more children build in the same world simultaneously | Requires real-time sync infrastructure; safety architecture review required |
| P2-02 | Advanced interactions | Scripted object behaviors (if-then logic, triggers, paths) | Entry point for computational thinking curriculum |
| P2-03 | Curriculum integration | Alignment tags for Common Core, NGSS, and other standards; LMS export | Requires curriculum specialist involvement |
| P2-04 | Export and 3D printing | Export world as STL or OBJ for 3D printing; screenshot export | Requires geometry pipeline work |

---

## 5. Information Architecture

### Site Map

```
Worldcraft
├── Landing / Splash
│   ├── "Start Creating" (guest / new child)
│   └── "Sign In" (returning child or teacher)
│
├── Onboarding Flow (new child only)
│   ├── Step 1: Meet Spark (animated intro)
│   ├── Step 2: Place your first object (interactive)
│   ├── Step 3: Pick a theme (theme selector)
│   └── Step 4: You're ready! (celebration → Builder)
│
├── Home (child, authenticated)
│   ├── My Worlds (thumbnail grid of saved projects)
│   ├── Challenges (challenge card browser)
│   └── Explore Gallery (class gallery, view-only)
│
├── World Builder
│   ├── Scene Viewport (3D canvas)
│   ├── Object Palette (thematic object library)
│   ├── Theme Selector (switcher)
│   ├── Object Controls (move / rotate / scale / color — contextual on selection)
│   ├── Spark Panel (AI companion prompts)
│   ├── Play Mode (first-person / orbit camera)
│   ├── Save / Version Panel
│   └── Share Dialog
│
├── Challenges
│   ├── Challenge Browser (card grid by theme and difficulty)
│   ├── Challenge Detail (intro + start)
│   └── Challenge Builder (scoped Builder with progress tracking)
│
├── Gallery
│   ├── Personal Gallery (my worlds)
│   ├── Class Gallery (teacher-curated, view-only)
│   └── World Detail (full-screen view + react with emoji)
│
├── Parent / Guardian Portal
│   ├── Consent Flow (initial setup)
│   ├── Child Profile Management
│   ├── Activity Summary (time spent, worlds created)
│   └── Data & Privacy Settings
│
└── Teacher Dashboard
    ├── Class Roster
    ├── Challenge Management (create / assign / set due date)
    ├── Submissions Inbox (review submitted worlds)
    ├── Gallery Moderation (approve / remove from class gallery)
    └── Presentation Mode (full-screen gallery for class review)
```

### Navigation Hierarchy

| Level | Child View | Teacher View |
|-------|-----------|--------------|
| Primary Nav | Home, Challenges, Gallery | Dashboard, Classes, Challenges, Gallery |
| Secondary Nav | My Worlds (within Home) | Roster, Submissions (within Classes) |
| Contextual | Object Controls (within Builder) | Moderation Controls (within Gallery) |

### Page Relationships

- **Home → Builder**: Tap "New World" or tap an existing world thumbnail
- **Challenge Detail → Challenge Builder**: Tap "Start Challenge"
- **Builder → Gallery**: Tap "Share to Gallery" → world appears in Gallery
- **Teacher Dashboard → Gallery**: Teacher approves submission → visible in Class Gallery
- **Class Gallery → World Detail**: Tap any thumbnail → full-screen view

---

## 6. UX/UI Design Direction

### Design Philosophy

Worldcraft uses a **calm, playful, and encouraging** visual language. The interface should feel like a friendly art studio — not a video game or a classroom application. Every element reinforces the child's sense of creative ownership.

---

### Layout and Interaction

| Principle | Specification |
|-----------|--------------|
| Tap targets | Minimum 44px × 44px for all interactive elements; 56px for primary actions |
| Text in UI | Minimal — icons carry primary meaning; text labels used as secondary confirmation |
| Progressive disclosure | Basic tools visible by default; advanced tools revealed on demand or over time |
| Visual guidance | Animated arrows, glowing highlights, and Spark's gestures replace written instructions |
| Responsive breakpoints | Mobile: 375px+; Tablet (primary): 768px+; Desktop: 1280px+ |
| Orientation | Landscape-first for Builder; portrait supported for Gallery and Home |
| Feedback | Every tap produces immediate visual + haptic (on supported devices) feedback |

---

### Color Palette

The palette uses warm pastels as the base with vibrant saturated accents for calls to action and celebration states.

| Role | Color Name | Hex | Usage |
|------|-----------|-----|-------|
| Background (primary) | Cream Puff | `#FFF8F0` | Main app background |
| Background (secondary) | Sky Mist | `#EFF6FF` | Panel backgrounds, cards |
| Surface | Warm White | `#FFFFFF` | Input fields, modals |
| Accent (primary) | Sunshine Yellow | `#FFD23F` | Primary buttons, highlights |
| Accent (secondary) | Coral Bloom | `#FF6B6B` | Secondary actions, warnings |
| Accent (tertiary) | Mint Breeze | `#4ECDC4` | Success states, Spark |
| Accent (quaternary) | Lavender Soft | `#C7B8EA` | Fantasy theme accents |
| Text (primary) | Deep Cocoa | `#2D2D2D` | Headings, body text |
| Text (secondary) | Stone Grey | `#6B7280` | Labels, secondary info |
| Text (on dark) | Snow | `#FAFAFA` | Text on colored buttons |
| Disabled | Pebble | `#D1D5DB` | Inactive states |

**Color accessibility**: All text-on-background combinations meet WCAG AA contrast ratio (minimum 4.5:1 for normal text, 3:1 for large text). High contrast mode available in settings.

**Dark/night mode**: Not in MVP scope. Planned for P2 under accessibility roadmap.

---

### Typography

| Role | Typeface | Weight | Size (mobile) | Size (desktop) |
|------|---------|--------|---------------|----------------|
| Display / World names | Nunito | 800 ExtraBold | 28px | 36px |
| Headings (H1) | Nunito | 700 Bold | 22px | 28px |
| Headings (H2) | Nunito | 600 SemiBold | 18px | 22px |
| Body text | Nunito | 400 Regular | 16px | 16px |
| Labels / UI | Nunito | 600 SemiBold | 14px | 14px |
| Spark speech | Nunito | 500 Medium | 16px | 18px |

**Rationale**: Nunito is a rounded sans-serif typeface with open apertures and soft letterforms, making it highly legible for emerging readers. It avoids ambiguous letterforms (e.g., `Il1`) common in other typefaces.

**Minimum body size**: 16px on mobile. Never smaller than 12px for any UI element.

**Line height**: 1.5× for body text; 1.2× for display and headings.

---

### Component Design

**Buttons**
- Primary: Sunshine Yellow background, Deep Cocoa text, 12px border-radius, 56px height on mobile
- Secondary: transparent with 2px Coral Bloom border
- Destructive: Coral Bloom background, Snow text
- Icon-only: 44px × 44px minimum, always include `aria-label`

**Object Cards (palette items)**
- 80px × 80px on tablet, 64px × 64px on mobile
- Rounded corners (16px)
- Illustrated icon (no photography)
- Label below icon (12px, optional, toggled by parent setting)

**Spark Panel**
- Slides up from bottom (mobile) or appears in right sidebar (desktop)
- Rounded top corners (24px)
- Warm White background with subtle Mint Breeze border
- Spark's animated avatar (lottie loop) + speech bubble

**Modals and sheets**
- Bottom sheet on mobile; centered modal on desktop
- Max-width 480px; always dismissible by tap outside or close button
- Never full-screen on desktop

---

### Motion and Animation

| Type | Duration | Easing | Notes |
|------|---------|--------|-------|
| Button press | 100ms | ease-out | Scale down 0.95 |
| Panel slide | 250ms | ease-in-out | Bottom sheet entrance |
| Object placement | 150ms | spring | Bounce-drop into scene |
| Spark entrance | 300ms | ease-out | Slide + fade |
| Theme transition | 500ms | ease-in-out | Cross-fade skybox and ground |
| Celebration | 600ms | spring | Confetti burst, scale |

All animations respect `prefers-reduced-motion`: decorative animations are disabled; functional transitions use opacity-only at 150ms.

---

## 7. Safety & Moderation

### Content Safety Principles

Worldcraft operates under a **child-safe by design** model. Safety measures are built into the product architecture, not applied as afterthought filtering.

| Principle | Implementation |
|-----------|---------------|
| Assume a child is always present | All AI output filtered as if a child is the recipient, regardless of account type |
| Defense in depth | Multiple layers: AI model filtering, application-level rules, teacher moderation, parental controls |
| Minimal data collection | Collect only what is operationally necessary; no behavioral advertising |
| Auditability | All AI interactions logged and retainable for parental/teacher review |

---

### AI Content Filtering (Spark)

- **Blocklist**: Spark's output is filtered against a curated list of age-inappropriate terms, themes, and concepts before display.
- **Prompt injection protection**: User-provided text (world names, descriptions) is never inserted directly into AI system prompts.
- **Safe completion mode**: The AI model is instructed via system prompt to operate in a child-safe creative companion mode. Requests that violate this constraint are silently redirected to a neutral alternative response.
- **No opinions on real-world topics**: Spark does not comment on news, politics, religion, or any real-world divisive topic.
- **Response review**: All novel Spark prompt templates are human-reviewed by a child safety expert before deployment.
- **Rate limiting**: Spark interactions are rate-limited to prevent abuse of the AI endpoint.

---

### Communication Restrictions

| Feature | Policy |
|---------|--------|
| User-to-user direct messaging | Not permitted in MVP or P1. Children cannot send messages to each other. |
| Gallery reactions | Emoji-only reactions (pre-set list of 6). No free-text comments from children. |
| Teacher comments | Teachers can add text comments visible only to the individual child. |
| Parent notifications | Parents receive email summaries; no in-app parent-child messaging. |
| External links | Zero external links exposed to children within the product. |
| Social sharing | No public social media sharing. Sharing is restricted to class gallery (teacher-controlled) or private link shared by parent. |

---

### Age-Appropriate Language

- All UI text written at a Grade 2 reading level (Flesch-Kincaid target: 70+).
- All Spark dialogue reviewed by a child literacy consultant.
- No sarcasm, irony, or ambiguous idioms in AI responses.
- Spark uses inclusive, gender-neutral language.
- Emotional language is encouraging and specific: "You added a dragon! Amazing!" not generic "Good job."

---

### Teacher Oversight Capabilities

| Capability | Detail |
|-----------|--------|
| Class gallery moderation | Teacher approves or removes any world before it appears in class gallery |
| Challenge submission review | Teacher reviews all submitted worlds before marking as complete |
| Spark interaction log | Teacher can view a summary of Spark prompts shown to students in class mode |
| Student activity summary | Time spent, sessions, worlds created — no granular behavioral tracking |
| Flagging | Teacher can flag a world for administrator review |

---

### COPPA Compliance Considerations

Worldcraft serves children under 13 in the United States and must comply with the Children's Online Privacy Protection Act (COPPA).

| Requirement | Implementation |
|-------------|---------------|
| Parental consent | Verifiable parental consent collected before any personal data is stored for a child under 13. Consent flow via parent email with confirmation link. |
| Data minimization | Only display name, parent email, and world data are collected. No device fingerprinting, location data, or behavioral advertising profiles. |
| Data access and deletion | Parents can view all data associated with their child's account and request deletion at any time via the Parent Portal or email. |
| No third-party data sharing | No personal data shared with third-party advertisers or analytics providers. |
| School-based exception | For classroom use, school operators may provide consent on behalf of parents under the COPPA school exception. Teacher accounts must acknowledge operator responsibility. |
| Data retention | World data retained for 24 months of inactivity, then deleted. Parent notified by email 30 days before deletion. |
| Age gate | Date-of-birth or grade-level gate at account creation to identify users under 13. No self-reporting bypass. |

**Note**: This section represents product intent. Legal counsel must review the final implementation for regulatory compliance.

---

### Advertising and Monetization Safety

- **No advertising of any kind** is shown to children within the product.
- **No in-app purchases** are surfaced to children directly. Subscription management is accessible only through the Parent Portal.
- **No dark patterns**: No countdown timers, artificial scarcity, or emotional manipulation to drive upgrades.
- **No sponsored content** or branded objects within child-facing product areas.

---

### Parental Consent Flow

```
Step 1: Child starts account creation
  → Enters display name and grade level
  → System detects age < 13 (based on grade)

Step 2: Parent gate
  → "Ask your parent or guardian to help you sign up"
  → Child enters parent's email address
  → No further setup without parent action

Step 3: Parent receives email
  → Clear explanation of what data is collected and why
  → Link to full Privacy Policy (plain language version + legal version)
  → "Approve" button creates parent account and grants child access

Step 4: Parent portal setup
  → Parent sets optional time limits and content preferences
  → Receives weekly activity summary emails (opt-in)
  → Can revoke consent and delete all data at any time

Step 5: Child account activated
  → Child receives notification on device: "You're ready to build!"
  → Onboarding begins
```

---

*Document maintained by the Worldcraft product team. For questions, contact the product owner.*
