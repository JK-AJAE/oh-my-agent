# WorldCraft Kids — Implementation Plan

**Version**: 0.1  
**Status**: Planning  
**Last Updated**: 2026-05-05  
**Stack**: Next.js 16 (App Router) · TypeScript · React Three Fiber · Drei · Tailwind CSS 4 · Zustand · OpenAI API (gpt-4o-mini) · SQLite (better-sqlite3) — MVP uses localStorage initially

---

## How to Read This Document

Each phase maps to one week of solo development or roughly half that with a 2–3 person team. Tasks are ordered so that later tasks in a phase can begin once their stated dependencies are done — the listed dependencies are the minimum, not a strict waterfall.

**Priority codes used throughout**: P0 = must have for core loop, P1 = launch quality, P2 = post-launch sprint.

**Hour estimates** are realistic estimates for a developer already familiar with the stack. Add 20–30% for first-time setup of unfamiliar tools (R3F, Drei, Tailwind CSS 4).

---

## Screens to Build (Ordered Priority)

Build screens in this order. Each screen depends on the components built before it.

1. **Landing** — entry point, one CTA, no state required
2. **Onboarding** — name + starter world selection, seeds the user store
3. **Builder Workspace** — the core product loop; everything else is optional without this
4. **Dashboard** — My Worlds grid; requires save/load to be meaningful
5. **Play Mode** — first-person canvas render; reuses the 3D scene built for the builder
6. **Gallery** — read-only world cards; requires sharing infrastructure

---

## Components to Build (Ordered Priority)

Build shared components before the screens that consume them. Within each group, order is top-to-bottom.

1. **UI primitives** — Button, Card, Input, Sheet, Tooltip, Badge (shadcn/ui base + Tailwind customization)
2. **3D canvas** — WorldCanvas wrapper, Scene, EnvironmentPreset, GridPlane, WorldObject mesh
3. **Object library** — static catalog data, ObjectThumbnail, ObjectLibraryPanel
4. **Toolbar** — title edit, theme switcher, undo/redo, save, play button
5. **AI panel** — SparkPanel, SparkMessage, SparkInput, VariationCards
6. **Properties panel** — color palette, texture picker, scale slider, animation toggle

---

## Phase 1: Foundation (Week 1)

**Goal**: A running Next.js app with all tooling configured, shared types defined, and Zustand stores wired. No visible features yet — just solid ground to build on.

### Tasks

#### 1.1 Project Bootstrap
**Estimated hours**: 4  
**Description**: Initialize Next.js 16 with the App Router, install all dependencies, configure Tailwind CSS 4 with the project color tokens, set up path aliases, configure TypeScript strict mode, and add the `mise.toml` task runner.

**Dependencies**: None

**Acceptance Criteria**:
- `mise run dev` starts the dev server without errors
- `mise run lint` and `mise run typecheck` both pass on the empty scaffold
- Tailwind CSS 4 is configured with all semantic color tokens from `docs/PRODUCT.md` (Section 6) as CSS custom properties
- Path alias `@/` resolves to `src/`
- `next.config.ts` enables `reactStrictMode: true`

**Risk**: Tailwind CSS 4 uses a different config format from v3. The `@theme` block in `globals.css` replaces `tailwind.config.js` — verify this pattern before assuming v3 docs apply.  
**Mitigation**: Prototype the color token setup in isolation first; allocate 1 extra hour if upgrading from a v3 reference project.

---

#### 1.2 Dependency Installation
**Estimated hours**: 2  
**Description**: Install and verify all runtime dependencies: `@react-three/fiber`, `@react-three/drei`, `three`, `@types/three`, `zustand`, `immer`, `nanoid`, `better-sqlite3`, `@types/better-sqlite3`, `zod`, `openai`, `clsx`, `tailwind-merge`. Install shadcn/ui with `npx shadcn@latest init`.

**Dependencies**: 1.1

**Acceptance Criteria**:
- All packages install without peer dependency conflicts
- `npx shadcn@latest add button card input sheet tooltip badge` completes successfully
- `import { Canvas } from '@react-three/fiber'` compiles without errors in a test file
- TypeScript reports no missing type definitions for installed packages

**Risk**: R3F may have peer dependency conflicts with React 19 (Next.js 16). Drei version must be compatible with the R3F version.  
**Mitigation**: Pin R3F and Drei to mutually compatible versions confirmed before install. Check the R3F GitHub releases for a React 19 compatibility note.

---

#### 1.3 Type Definitions
**Estimated hours**: 3  
**Description**: Write all shared TypeScript types in `src/types/`. These types are the contract between client stores, API routes, and the 3D canvas. No implementation — only type files.

Files to create:
- `src/types/world.ts` — `WorldObject`, `EnvironmentTheme`, `CameraPosition`, `World`
- `src/types/user.ts` — `User`, `Session`
- `src/types/ai.ts` — `SparkMessage`, `AISuggestion`, `WorldSnapshot`
- `src/types/api.ts` — API request/response envelope types for all routes

**Dependencies**: 1.1

**Acceptance Criteria**:
- All types match the exact shapes defined in `docs/ARCHITECTURE.md` (Sections 4 and 6) and `docs/AI-SYSTEM.md` (Section 4)
- No `any` types in any type definition file
- `mise run typecheck` passes with all type files present

**Risk**: Type mismatches between the store definitions and API schemas discovered late cause refactors across many files.  
**Mitigation**: Write types before any implementation. Treat this file set as the single source of truth and do not deviate.

---

#### 1.4 Zustand Stores
**Estimated hours**: 5  
**Description**: Implement all four Zustand stores with `immer` middleware. Do not connect to UI yet — just implement the store actions and verify them with unit tests.

Stores:
- `src/stores/use-world-store.ts` — world state, objects, environment, camera, `isDirty`
- `src/stores/use-ui-store.ts` — panel visibility, play mode, undo/redo stack (capped at 20)
- `src/stores/use-user-store.ts` — user session, localStorage persistence via Zustand `persist`
- `src/stores/use-ai-store.ts` — Spark messages, loading state, suggestions, dismiss state

**Dependencies**: 1.3

**Acceptance Criteria**:
- Each store action can be called from a test and produces the expected state mutation
- `useUIStore` undo stack caps at 20 entries (oldest is dropped when limit is exceeded)
- `useUserStore` persists to localStorage: user data survives a simulated page reload in tests
- No store imports from another store (stores are independent; cross-store reads happen at the component level)
- All store actions are typed — no `unknown` or `any` parameter types

**Risk**: Circular imports between stores if one store tries to call another store's actions.  
**Mitigation**: Enforce the rule that stores never import each other. If cross-store behavior is needed, compose at the hook or component level.

---

#### 1.5 Shared UI Component Library
**Estimated hours**: 4  
**Description**: Customize the shadcn/ui components with project-specific styles. Add the `cn` utility. Create the `src/lib/cn.ts` helper (clsx + tailwind-merge). Apply the design tokens from `docs/PRODUCT.md` to each component variant.

Components to configure:
- `Button` — primary (`bg-[#7C5CBF]`, rounded-full, min-h-[48px], font-600), secondary (outline, sky blue border)
- `Card` — rounded-2xl, 2px border `#E3DDD6`, hover: shadow-md scale-[1.02]
- `Input` — rounded-xl, bg-white, focus ring `#7C5CBF`
- `Sheet` — bottom sheet variant: half-screen, drag handle, rounded-t-2xl
- `Tooltip` — max-width 200px, bg-charcoal, rounded-lg, 12px text
- `Badge` — rounded-full, status color variants

**Dependencies**: 1.2

**Acceptance Criteria**:
- All components render in a local Storybook-equivalent test page or a `/dev` route without visual regressions
- Primary Button meets WCAG AA contrast (4.5:1) verified with a contrast checker
- All interactive elements have visible focus rings (3px purple) — `outline: none` is never used without a focus ring replacement
- Each component is exported from `src/components/ui/index.ts` for clean imports

**Risk**: shadcn/ui component defaults may conflict with Tailwind CSS 4's new config format.  
**Mitigation**: Test each component individually after adding it. Reset any conflicting default styles before proceeding.

---

#### 1.6 App Routing Structure
**Estimated hours**: 3  
**Description**: Create the Next.js App Router file structure with placeholder pages and layouts. No real content — just the routing tree, layout shells, and `loading.tsx` files so navigation works end-to-end.

Routes to scaffold:
- `/` — Landing (`app/page.tsx`, RSC)
- `/onboarding` — Onboarding flow (`app/onboarding/page.tsx`, Client)
- `/dashboard` — My Worlds (`app/dashboard/page.tsx`, RSC)
- `/builder/[worldId]` — Builder workspace (`app/builder/[worldId]/page.tsx` + `loading.tsx`, Client)
- `/play/[worldId]` — Play mode (`app/play/[worldId]/page.tsx`, Client)
- `/gallery` — Gallery (`app/gallery/page.tsx`, RSC)
- Root layout: `app/layout.tsx` with global CSS import, font stack, metadata

**Dependencies**: 1.1

**Acceptance Criteria**:
- All routes render without 404 errors when navigated to
- `loading.tsx` on the builder route shows a skeleton placeholder
- Root layout includes `<html lang="en">` and a semantic `<main>` landmark
- `globals.css` imports Tailwind CSS 4 and defines CSS custom property color tokens

**Risk**: App Router's RSC/client component split is easy to violate accidentally, causing "you cannot use useClient in a server component" errors.  
**Mitigation**: Mark every page that uses hooks or browser APIs with `"use client"` from the start. Keep RSC pages pure data-fetching with no interactivity imports.

---

**Phase 1 Total Estimate**: 21 hours (solo), ~11 hours (team of 2)

---

## Phase 2: Core 3D Builder (Week 2)

**Goal**: A working 3D canvas where objects can be placed, selected, and moved. The basic creative tool is functional even if it lacks UI polish.

### Tasks

#### 2.1 WorldCanvas and Scene Root
**Estimated hours**: 5  
**Description**: Build `src/components/builder/world-canvas.tsx` (the `"use client"` wrapper) and `src/components/three/scene.tsx` (the R3F `<Canvas>` root). Configure the canvas with: WebGL renderer settings (shadow maps, tone mapping), ambient and directional lighting, `<OrbitControls>` from Drei, and a default camera position.

**Dependencies**: 1.4 (world store), 1.5 (UI)

**Acceptance Criteria**:
- The canvas renders a 3D scene at 60fps on a mid-range laptop
- `<OrbitControls>` allows orbit, pan, and zoom with mouse and touch
- Canvas occupies at least 70% of the viewport width on desktop (verified via CSS)
- No console errors or WebGL context warnings on first load
- The canvas is a `"use client"` component; the parent builder page shell can be a server component

**Risk**: Canvas initial render performance on tablets may be below target if default WebGL settings are too expensive.  
**Mitigation**: Start with basic lighting (one ambient, one directional). Defer shadows and post-processing to Phase 6 polish.

---

#### 2.2 Environment Themes and Lighting
**Estimated hours**: 4  
**Description**: Build `src/components/three/environment-preset.tsx`. Implement the 6 environment themes using Drei's `<Environment>` component and custom lighting configurations. Wire to `useWorldStore.environment`.

Themes: `meadow`, `forest`, `ocean`, `desert`, `night_sky`, `snowy_peak`

Each theme defines:
- Drei `<Environment>` preset or HDR map
- Ambient light color and intensity
- Directional light position and shadow settings
- Sky/background color or gradient (applied via R3F `<color attach="background" />`)
- Ground plane color

**Dependencies**: 2.1

**Acceptance Criteria**:
- All 6 themes render visually distinct scenes recognizable by name
- Theme switch happens in under 2 seconds (no full page reload)
- Selecting a theme in `useWorldStore` causes the canvas to update reactively without a component remount
- Environment preview images in `/public/environments/` match the in-canvas appearance

**Risk**: Drei's built-in environment presets may not match the intended visual style for all 6 themes.  
**Mitigation**: Use Drei presets as a starting point; override ambient/directional light colors per theme for visual accuracy.

---

#### 2.3 Object Catalog and Static Data
**Estimated hours**: 4  
**Description**: Define `src/lib/objects-catalog.ts` — the static catalog of all 60–80 placeable objects. Each entry includes: `modelKey`, `displayName`, `category`, `thumbnailUrl`, `modelUrl`, and default `scale`.

Categories (matching the product spec's "thematic groups"): `cozy`, `wild`, `magical`, `urban`, `nature`, `sky`

Also define placeholder geometry (colored `<boxGeometry>`) for every object type so the builder works before GLTF models are added.

**Dependencies**: 1.3 (types)

**Acceptance Criteria**:
- Catalog exports a typed array of at least 12 object definitions (one per category minimum)
- Every catalog entry has all required fields with no `undefined` values
- Catalog is importable by both client components (`ObjectLibraryPanel`) and server code (`ai-service.ts`) without build errors
- Placeholder geometry renders for every object key without errors

**Risk**: GLTF model sourcing (60–80 models) is a significant art production task that can block rendering.  
**Mitigation**: Use colored primitive geometry (box, sphere, cylinder, cone, torus) as placeholders for all objects. Replace with GLTF models incrementally. The builder should be functional with primitives for all of Phase 2–4.

---

#### 2.4 WorldObject Mesh Component
**Estimated hours**: 5  
**Description**: Build `src/components/three/world-object.tsx`. This renders a single placed object from `useWorldStore.objects`. It reads the object's `modelKey`, `position`, `rotation`, `scale`, `color`, and `animationEnabled` from the store and renders accordingly.

Implement:
- Geometry lookup from the catalog (placeholder primitives in Phase 2; GLTF via `useGLTF` later)
- Color override via `meshStandardMaterial` `color` prop
- Click handler that calls `useWorldStore.selectObject(id)`
- Visual selection state: purple ring / highlight when `selectedObjectId === id`

**Dependencies**: 2.1, 2.3

**Acceptance Criteria**:
- Placed objects render at the correct position, rotation, and scale
- Clicking an object selects it and highlights it with a visible ring
- Clicking empty canvas space deselects all objects
- Color changes via `useWorldStore.colorObject` update the material immediately without remount
- A scene with 50 objects maintains at least 30fps on a mid-range tablet (test manually)

**Risk**: Per-object re-render on every store update may cause performance issues with many objects.  
**Mitigation**: Use `React.memo` on `WorldObject`. Subscribe only to the specific object slice in the store, not the full objects array. Plan `<InstancedMesh>` grouping for Phase 6 if needed.

---

#### 2.5 Object Placement (Click to Place)
**Estimated hours**: 5  
**Description**: Implement click-to-place interaction. When a child taps a canvas location while an object type is "pending" (selected from the library), a new `WorldObject` is created at the tap position and added to `useWorldStore.objects`.

Implement:
- `useWorldStore` `pendingObjectKey` field + `setPendingObject` / `clearPendingObject` actions
- R3F `onPointerDown` on the ground plane to compute the world-space position from the pointer event
- After placement: call `useUIStore.pushUndo(snapshot)` before `useWorldStore.addObject`
- Placement animation hook: scale 0.9 → 1.05 → 1.0 spring on the newly placed object

**Dependencies**: 2.4

**Acceptance Criteria**:
- Tapping the canvas while a pending object is selected places the object at the tap position
- The placed object position is accurate to within 0.5 units of the tap location
- After placement, `pendingObjectKey` is cleared and the placed object is selected
- Undo (via `useUIStore`) reverts the last placement
- Placement spring animation plays without frame drops

**Risk**: Translating a pointer event's screen coordinates to 3D world coordinates is non-trivial with R3F's camera projection.  
**Mitigation**: Use Drei's `useThree` + raycasting against the ground plane. Reference the Drei `Plane` hit test pattern from their docs.

---

#### 2.6 Object Selection and TransformControls
**Estimated hours**: 5  
**Description**: Implement `<TransformControls>` from Drei on the selected object. This allows move, rotate, and scale operations after an object is placed.

Implement:
- `<TransformControls>` attached to the selected object's mesh ref when `selectedObjectId` is non-null
- Toolbar mode toggle: Move / Rotate / Scale (mapped to TransformControls `mode` prop)
- On transform end (`onMouseUp`): sync the final position/rotation/scale back to `useWorldStore` and push to the undo stack
- Keyboard shortcuts: `G` = grab/move, `R` = rotate, `S` = scale (industry-standard 3D editing keys)

**Dependencies**: 2.4, 2.5

**Acceptance Criteria**:
- `<TransformControls>` appears on the selected object and allows free manipulation
- Dragging a transform handle updates the object position/rotation/scale in `useWorldStore` on mouse-up
- Undo reverts the transform to the state before dragging began
- `<OrbitControls>` is disabled while `<TransformControls>` is active (Drei's `makeDefault` pattern)
- Delete key removes the selected object from the world (with undo support)

**Risk**: TransformControls and OrbitControls conflict — both respond to pointer events on the canvas.  
**Mitigation**: Use Drei's `makeDefault` on `OrbitControls` and set `enabled={!isTransforming}` based on a drag-start flag. This is a documented Drei pattern.

---

#### 2.7 Ground Plane and Grid
**Estimated hours**: 2  
**Description**: Build `src/components/three/grid-plane.tsx`. Render a ground plane (invisible collision surface for raycasting) and an optional visible grid. The grid provides spatial reference for object placement.

**Dependencies**: 2.1

**Acceptance Criteria**:
- Ground plane is invisible but receives pointer events for placement raycasting
- Grid is visible by default but can be toggled via `useUIStore`
- Grid respects environment theme colors (light grid on dark themes, dark grid on light themes)
- The grid does not cause any rendering artifacts or z-fighting at the ground plane level

**Risk**: Z-fighting between the grid and the ground plane material.  
**Mitigation**: Apply a `polygonOffset` on the grid material (`polygonOffset: true`, `polygonOffsetFactor: -1`).

---

**Phase 2 Total Estimate**: 30 hours (solo), ~16 hours (team of 2)

---

## Phase 3: Builder UX (Week 3)

**Goal**: A complete builder interface. A child can browse objects, place them, change colors, undo mistakes, and save their world.

### Tasks

#### 3.1 Object Library Panel
**Estimated hours**: 6  
**Description**: Build `src/components/builder/object-library-panel.tsx`. Left panel (or bottom sheet on mobile) showing thematic groups of objects as draggable thumbnails.

Implement:
- Tab navigation: Cozy / Wild / Magical / Urban / Nature / Sky
- Object thumbnails from `/public/objects/` (64×64px PNG)
- Click thumbnail → set `pendingObjectKey` in `useWorldStore` for canvas placement
- Search input: filter objects by `displayName` keyword (client-side, no API)
- Arrow key navigation within focused panel (accessibility requirement)
- Responsive: full panel on desktop/tablet landscape; bottom sheet on mobile/tablet portrait

**Dependencies**: 1.5 (UI primitives), 2.3 (catalog), 2.5 (pending object placement)

**Acceptance Criteria**:
- All 6 thematic tabs are navigable
- Clicking a thumbnail sets `pendingObjectKey` and the cursor changes to indicate placement mode
- Search filters visible objects in real time (no debounce required for client-side filter)
- Arrow key navigation works when the panel is focused (WCAG 2.1 Level AA)
- On mobile (375px), the panel opens as a bottom sheet (shadcn `Sheet side="bottom"`)
- Object thumbnails are 64×64px with visible labels below

**Risk**: Bottom sheet behavior on iOS Safari may not match the design spec due to browser chrome overlap.  
**Mitigation**: Test on Safari iOS early. Use `env(safe-area-inset-bottom)` CSS variable for bottom padding.

---

#### 3.2 Properties Panel
**Estimated hours**: 5  
**Description**: Build `src/components/builder/properties-panel.tsx`. A contextual bottom bar that appears when an object is selected.

Implement:
- Color palette: 12 color swatches from the curated palette; tapping applies `useWorldStore.colorObject`
- Scale slider: constrained range per object type (from catalog `minScale` / `maxScale` defaults); maps to `useWorldStore.scaleObject`
- Animation toggle: checkbox/switch for `animationEnabled`; maps to `useWorldStore.updateObject`
- Panel slides up from bottom (200ms ease-out) when `selectedObjectId` becomes non-null
- Panel slides down and hides when `selectedObjectId` becomes null

**Dependencies**: 1.5, 2.4 (world object), 3.1

**Acceptance Criteria**:
- Panel appears only when an object is selected
- Color change is visible immediately on the canvas (within one render frame)
- Scale slider range is bounded by the selected object's catalog constraints
- Animation toggle changes `animationEnabled` on the selected object
- All interactive elements in the panel have 48×48px minimum touch targets
- Panel does not obstruct the canvas canvas area on tablet portrait orientation

**Risk**: Color palette accessibility — 12 swatches must be distinguishable without color alone.  
**Mitigation**: Add a visible label or tooltip on each swatch showing the color name. Apply a selection check icon on the active swatch.

---

#### 3.3 Toolbar
**Estimated hours**: 5  
**Description**: Build `src/components/builder/toolbar.tsx`. Top bar with all builder actions.

Implement:
- World title (inline editable `<input>`, updates `useWorldStore.setTitle` on blur)
- Environment theme switcher (icon button → opens a small popover with 6 theme previews)
- Undo button (active when `useUIStore.undoStack.length > 0`)
- Redo button (active when `useUIStore.redoStack.length > 0`)
- Save button with loading state (`useUIStore.isSaving`)
- Play Mode button → sets `useUIStore.isPlaying = true`
- Transform mode toggle (Move / Rotate / Scale)

**Dependencies**: 1.5, 1.4 (stores)

**Acceptance Criteria**:
- Title edits are committed on blur and reflected in the store
- Undo and Redo buttons are visually disabled when their respective stacks are empty
- Save button shows a spinner while `isSaving` is true, then a checkmark on success
- All toolbar buttons have visible text labels below icons (accessibility requirement from design spec)
- Keyboard shortcuts: `Ctrl+Z`/`Cmd+Z` = undo, `Ctrl+Y`/`Cmd+Y` = redo, `Escape` = deselect

**Risk**: Inline title editing on mobile may trigger the virtual keyboard and shift the layout.  
**Mitigation**: Use `inputMode="text"` and a fixed-height toolbar. Test on iOS Safari.

---

#### 3.4 Undo/Redo Functionality
**Estimated hours**: 3  
**Description**: Wire the undo/redo system end-to-end. The `useUIStore` already holds the stacks. This task connects all mutating actions (place, move, rotate, scale, delete, color change) to push snapshots before mutation.

Implement:
- A wrapper in `useWorldStore` around every mutating action that calls `useUIStore.pushUndo(currentObjects)` before mutating
- `undo()` in `useUIStore` returns the previous snapshot; the caller applies it via `useWorldStore.setObjects`
- `redo()` in `useUIStore` returns the next snapshot; the caller applies it similarly
- Custom hook `useUndoRedo` in `src/hooks/use-keyboard-shortcuts.ts` for Ctrl+Z/Y binding

**Dependencies**: 1.4 (stores), 3.3 (toolbar)

**Acceptance Criteria**:
- Undo works for: object placement, object move, object rotate, object scale, object delete, color change
- Undo stack holds a maximum of 20 snapshots; the oldest is dropped when the 21st is pushed
- Redo stack is cleared when a new action is taken (standard undo/redo behavior)
- Ctrl+Z / Cmd+Z triggers undo; Ctrl+Y / Cmd+Y triggers redo
- Undo across 20 actions returns the world to its state 20 actions ago

**Risk**: Snapshot-based undo stores copies of the entire objects array, which can be large with many objects.  
**Mitigation**: Cap at 20 snapshots as specified. For MVP object counts (< 100 objects), this is acceptable. Structural sharing (via `immer`) reduces actual memory overhead since unchanged objects share references.

---

#### 3.5 Save and Load (localStorage for MVP)
**Estimated hours**: 5  
**Description**: Implement save and load using `localStorage` as the initial persistence layer. The SQLite API routes are wired up in Phase 7; for MVP, worlds persist in browser storage.

Implement:
- `useWorldStore.saveToLocalStorage()` — serializes world state to JSON and writes to `localStorage` under key `worldcraft_world_{worldId}`
- `useWorldStore.loadFromLocalStorage(worldId)` — reads and deserializes on builder mount
- Auto-save hook `src/hooks/use-auto-save.ts` — debounced save every 60 seconds when `isDirty` is true
- Save button in toolbar triggers immediate save and shows confirmation
- Dashboard reads all `worldcraft_world_*` keys from `localStorage` to list saved worlds

**Dependencies**: 1.4 (stores), 3.3 (toolbar)

**Acceptance Criteria**:
- A world survives a full browser refresh (close and reopen the tab)
- Auto-save fires at most every 60 seconds when changes are pending
- Manual save is immediate (no debounce)
- Save confirmation: toolbar Save button briefly shows a green checkmark for 1 second after save
- Dashboard shows all saved worlds with title, environment theme, and last-saved timestamp
- No data loss when the browser tab is closed mid-session (last auto-save is preserved)

**Risk**: `localStorage` has a ~5MB per-origin limit. A world with 100 objects and long AI conversation history could approach this.  
**Mitigation**: Serialize only the fields needed for restoration (exclude derived state). Monitor payload size. The SQLite migration in Phase 7 removes this constraint entirely.

---

#### 3.6 Title Editing
**Estimated hours**: 1  
**Description**: Title editing is largely handled by the toolbar input from Task 3.3. This task adds the post-save title prompt: after the first manual save on a new world, show a gentle prompt to name the world if the title is still "My World".

**Dependencies**: 3.3, 3.5

**Acceptance Criteria**:
- If `title === "My World"` and the user manually saves for the first time, a non-blocking toast or Spark message prompts them to name it
- Renaming from the prompt updates the title in both the store and the saved localStorage entry
- The prompt does not appear on subsequent saves or if the title has already been changed

**Risk**: Low complexity. The risk is prompt fatigue if it appears too often.  
**Mitigation**: Track a `hasPromptedTitle` flag in `useUIStore` (persisted to `localStorage`) to show the prompt at most once.

---

**Phase 3 Total Estimate**: 25 hours (solo), ~13 hours (team of 2)

---

## Phase 4: AI Creative Companion (Week 4)

**Goal**: Spark is alive. The AI companion asks contextual questions, responds to children's input, and offers variation suggestions.

### Tasks

#### 4.1 Content Safety Infrastructure
**Estimated hours**: 4  
**Description**: Build the safety layer before the AI routes. This must exist before any AI output reaches the UI.

Files to create:
- `src/lib/content-filter.ts` — `isBlockedInput(message)`, `isBlockedOutput(response)`, blocklists
- `src/lib/ai-fallbacks.ts` — `getFallback(triggerType)`, all fallback response pools per `docs/AI-SYSTEM.md` Section 6
- Input sanitizer function in `src/app/api/ai/prompt/route.ts` (strip HTML, URLs, emails; truncate at 100 chars)
- Output filter applied to every OpenAI response before it is returned to the client

**Dependencies**: 1.1 (project setup)

**Acceptance Criteria**:
- `isBlockedInput("kill")` returns `true`; `isBlockedInput("building")` returns `false`
- `isBlockedOutput("where do you live?")` returns `true`
- `getFallback("session_start")` returns a non-empty string from the correct pool
- Sanitizer strips `<script>` tags, email addresses, and URLs from input
- Sanitizer truncates input at 100 characters server-side (independent of client-side limit)
- All functions are unit-tested with at least 10 test cases each covering true/false/edge cases

**Risk**: Overly aggressive blocklist creates false positives that frustrate children (e.g., "shoot a star" is blocked).  
**Mitigation**: Use whole-word matching where possible. Test the blocklist against 50 expected child inputs before launch.

---

#### 4.2 AI API Route
**Estimated hours**: 6  
**Description**: Implement the two AI Route Handlers and the supporting service/repository layers.

Routes:
- `POST /api/ai/prompt` — full prompt chain, safety filters, OpenAI call, conversation persistence, fallback on error
- `POST /api/ai/suggest` — suggest 3 object variations based on world context; does not persist to conversation

Service: `src/lib/services/ai-service.ts`
- `SPARK_SYSTEM_PROMPT` constant (verbatim from `docs/AI-SYSTEM.md` Section 2)
- `buildWorldContextBlock(snapshot: WorldSnapshot): string`
- `trimConversationHistory(messages, tokenBudget)` — trims from oldest, preserves most recent 8 exchanges
- `getPromptResponse(params)` — enforces 30-interaction session limit, calls OpenAI, filters output
- Rate limiting: 5 requests per 30 seconds per session (in-memory sliding window, `src/lib/rate-limit.ts`)

Repository: `src/lib/db/repositories/conversation-repository.ts` — stubbed for localStorage MVP; full SQLite implementation in Phase 7

**Dependencies**: 4.1, 1.3 (types)

**Acceptance Criteria**:
- `POST /api/ai/prompt` returns a Spark message in under 1.5 seconds on a standard internet connection
- The system prompt matches `docs/AI-SYSTEM.md` Section 2 verbatim (no paraphrasing)
- If `conversationLength >= 30`, the route returns the session limit message without calling OpenAI
- If OpenAI returns a 5xx or times out, the route returns a fallback response with status 200 (not 503 to the child)
- If `isBlockedInput` is true, the route returns a redirect fallback without calling OpenAI
- If `isBlockedOutput` is true on the model response, the route discards it and returns a celebration fallback
- All OpenAI calls use the model parameters from `docs/AI-SYSTEM.md` Section 7 (temperature: 0.8, max_tokens: 100, etc.)
- `OPENAI_API_KEY` is never logged or exposed in error messages

**Risk**: OpenAI API latency exceeds the 1.5s target during peak times.  
**Mitigation**: Set `timeout: 3000ms` on the API call; serve a fallback immediately if exceeded. Pre-warm the connection if possible.

---

#### 4.3 Spark Chat Panel UI
**Estimated hours**: 6  
**Description**: Build all AI companion UI components.

Components:
- `src/components/ai/spark-panel.tsx` — collapsible side panel, Spark avatar (40×40px warm purple spark icon), message history
- `src/components/ai/spark-message.tsx` — individual message bubble, dismiss (×) button, 15-second fade timer
- `src/components/ai/spark-input.tsx` — optional reply text field (appears on questions), 100-char limit with counter at 80+, sends on Enter or tap
- `src/components/ai/variation-cards.tsx` — 3-card horizontal strip with thumbnail + 1-line description; tap to place

**Dependencies**: 1.5 (UI), 4.2 (AI route), 1.4 (AI store)

**Acceptance Criteria**:
- Spark panel slides in from the right (200ms ease-out) after the first object is placed
- Each Spark message has a dismiss button (×) that is at least 44×44px
- Messages fade out after 15 seconds if no interaction (but remain accessible in message history)
- `aria-live="polite"` region announces Spark messages to screen readers
- Child reply field shows character count when at 80+ characters
- Sending a message shows a loading state on the Spark avatar while awaiting the API response
- Variation cards show thumbnails, labels, and close when tapped (placing the suggested object)
- Panel collapses to a narrow icon strip when dismissed; one tap re-expands it

**Risk**: Spark panel appearing too eagerly on first object placement may feel intrusive and interrupt flow.  
**Mitigation**: Implement the 1.5-second post-placement delay before Spark's first message (per `docs/AI-SYSTEM.md` Section 5.2).

---

#### 4.4 Spark Trigger Hook
**Estimated hours**: 4  
**Description**: Build `src/hooks/use-spark-trigger.ts`. This hook watches `useWorldStore` and `useAIStore` and fires AI prompt calls at the right moments.

Trigger events to implement (per `docs/AI-SYSTEM.md` Section 5):
- `session_start` — on builder mount, sends welcome message
- `first_placement` — when `objects.length` transitions from 0 to 1
- `third_placement` — when `objects.length` reaches 3 for the first time this session
- `after_placement` — probabilistic (50% respond, 30% silent, 20% suggest), with 15-second cooldown
- `silence_45s` — no placement for 45 seconds, session has at least 1 object
- `after_theme_change` — `environment` changes in the store
- Dismissal: if `hasDismissed` is true, suppress all automatic triggers for 3 minutes

**Dependencies**: 4.2 (AI route), 4.3 (Spark panel), 1.4 (stores)

**Acceptance Criteria**:
- Welcome message fires within 500ms of builder mount
- `first_placement` trigger fires exactly once per session regardless of undo/redo
- `after_placement` trigger respects the 15-second cooldown (no two automatic messages within 15 seconds)
- 45-second silence trigger fires correctly and resets when a new object is placed
- Dismissal suppresses triggers for exactly 3 minutes, then resumes
- Trigger hook does not cause any re-renders of the 3D canvas (it does not subscribe to the world store's objects array in a way that triggers canvas updates)

**Risk**: Trigger hook subscribing to the world store in a way that causes the canvas to re-render on every store update.  
**Mitigation**: Use Zustand's selector subscription — subscribe only to `objects.length` and `environment`, not the full objects array.

---

#### 4.5 Fallback Prompts and Welcome Messages
**Estimated hours**: 2  
**Description**: Implement the deterministic fallback system fully. Add all fallback pools to `src/lib/ai-fallbacks.ts` per the spec. Implement `getFallback(triggerType)` with random rotation within pools. Write the session start welcome messages for new vs. returning worlds.

**Dependencies**: 4.1

**Acceptance Criteria**:
- All fallback pools from `docs/AI-SYSTEM.md` Section 6 are populated with at least 3 entries each
- `getFallback` returns a different message on each call within a session (rotation logic works)
- New world welcome: "This world is yours — what's the first thing you want to add?"
- Returning world welcome: "You're back! I see you left [object] here last time — what's next?" (using `lastPlacedObject` from the world snapshot)
- Fallback fires correctly when `OPENAI_API_KEY` is not set (Spark works in fallback-only mode for local dev)

**Risk**: If `OPENAI_API_KEY` is missing, the route throws an unhandled error instead of gracefully falling back.  
**Mitigation**: Validate the key at service startup. If missing, set a flag that routes all AI requests to the fallback immediately without attempting the API call.

---

**Phase 4 Total Estimate**: 22 hours (solo), ~12 hours (team of 2)

---

## Phase 5: Core Pages (Week 5)

**Goal**: All primary screens are complete. A child can land, onboard, build, save, explore, and view a gallery without hitting a dead end.

### Tasks

#### 5.1 Landing Page
**Estimated hours**: 4  
**Description**: Build `src/app/page.tsx` (RSC). A single-screen landing page with a single CTA.

Content:
- Headline and subheadline (Grade 3 reading level)
- A single prominent "Start Building" CTA button (routes to `/onboarding`)
- A subtle secondary link: "I already have a world" (routes to `/dashboard`)
- Background: a static screenshot or rendered thumbnail of a sample world (no 3D canvas on the landing page — too slow for first load)
- No login form, no sign-up form, no email collection

**Dependencies**: 1.5 (UI primitives), 1.6 (routing)

**Acceptance Criteria**:
- First Contentful Paint (FCP) is under 1.5 seconds on a 4G connection (test with Lighthouse)
- "Start Building" CTA is visible above the fold at all breakpoints (375px, 768px, 1280px)
- The page contains no 3D canvas or R3F imports (RSC boundary maintained)
- The page is keyboard navigable: Tab lands on the CTA first

**Risk**: Landing page performance — including any heavy images or fonts can push FCP above target.  
**Mitigation**: Use Next.js `<Image>` component with explicit dimensions and lazy loading. Use system font stack (already specified in design docs) — no Google Fonts.

---

#### 5.2 Onboarding Flow
**Estimated hours**: 6  
**Description**: Build `src/app/onboarding/page.tsx` (Client). A 2-step onboarding flow that seeds the user session and gets the child into the builder within 60 seconds.

Step 1: "What's your name?" — single text input (optional; if skipped, use "Explorer")
Step 2: "Pick a starter world" — 3 illustrated cards (Cozy Meadow, Ocean Shore, Starry Desert)

On completing Step 2:
1. Call `POST /api/auth/login` with `{ displayName, avatarEmoji: "🌟", role: "child" }` — or skip if user is already in `useUserStore`
2. Create a new world in `useWorldStore` with the selected `environmentTheme`
3. Save a new `worldId` (nanoid)
4. Navigate to `/builder/{worldId}`

**Dependencies**: 1.5 (UI), 1.4 (stores), 4.2 (auth route for login)

**Acceptance Criteria**:
- A child reaches the builder within 60 seconds of arriving at `/onboarding` (time manually on a tablet)
- Step 1 is optional — pressing Enter or tapping "Next" with an empty name proceeds with the default
- Step 2 shows 3 world preview cards with illustrated thumbnails (static PNG from `/public/environments/`)
- Selecting a card immediately navigates to the builder (no loading modal, under 2-second load)
- The onboarding flow is accessible: each card is keyboard selectable, steps are navigable with Tab
- After onboarding, `useUserStore.user` is non-null and `useWorldStore.worldId` is set

**Risk**: `POST /api/auth/login` failure during onboarding leaves the child in a broken state.  
**Mitigation**: If the login API call fails, create a local-only guest session (no server account) and continue. The child can save properly once network is restored. Guest mode uses `localStorage` only.

---

#### 5.3 Dashboard (My Worlds)
**Estimated hours**: 5  
**Description**: Build `src/app/dashboard/page.tsx`. Shows the child's saved worlds as a card grid with a "New World" CTA.

Sections:
- Pending teacher challenges (if any, shown as a challenge card at the top)
- "My Worlds" grid — world thumbnail, title, environment theme icon, last edited timestamp
- "New World" button — creates a new world and navigates to `/builder/new`
- Empty state: "You haven't built anything yet — let's start!" with a Start Building CTA

For MVP: reads worlds from `localStorage`. Phase 7 migrates to API calls.

**Dependencies**: 1.5 (UI), 3.5 (save/load), 1.6 (routing)

**Acceptance Criteria**:
- Dashboard loads and displays all saved worlds within 500ms
- Each world card shows thumbnail (or placeholder), title, and relative last-edit time ("2 hours ago")
- Clicking a card navigates to `/builder/{worldId}` with the world pre-loaded
- "New World" creates a fresh world ID and navigates to the builder
- Empty state is displayed when no worlds exist in localStorage
- Dashboard is responsive: 1 column on mobile, 2 columns on tablet, 3–4 columns on desktop

**Risk**: Thumbnail generation — at MVP, there are no auto-captured thumbnails.  
**Mitigation**: Use a colored gradient placeholder based on the environment theme as the thumbnail until Play Mode thumbnails are implemented (Phase 6).

---

#### 5.4 Play/Explore Mode
**Estimated hours**: 6  
**Description**: Build `src/app/play/[worldId]/page.tsx` (Client). A full-screen first-person walkthrough of a saved world.

Implement:
- Load the world from `useWorldStore` (or localStorage if navigating from outside the builder)
- First-person camera controller `src/components/three/play-camera.tsx` using Drei's `PointerLockControls` or keyboard-based WASD movement
- Same environment and object rendering as the builder, minus all editor UI
- "Back to Builder" overlay button (top-left, always visible)
- World title + creator name overlay (top-center)
- WASD / arrow keys for movement, mouse for look direction

**Dependencies**: 2.1, 2.4, 2.2 (3D canvas components), 3.5 (load from storage)

**Acceptance Criteria**:
- Play Mode runs at 30fps minimum on a mid-range tablet (iPad Air 2019 or equivalent)
- WASD movement works on desktop; swipe movement works on touch devices
- "Back to Builder" navigates to `/builder/{worldId}` without losing world state
- All placed objects are visible and correctly positioned in Play Mode
- Play Mode has no visible editor controls (no transform gizmos, no object library, no toolbar)
- The first-person camera starts at the position defined in `useWorldStore.camera`

**Risk**: Pointer lock API for first-person mouse look may not be permitted in all browser contexts or on iOS.  
**Mitigation**: Implement an alternative: click-and-drag mouse look without pointer lock. On iOS, implement swipe-to-look. Pointer lock is a progressive enhancement, not a requirement.

---

#### 5.5 Gallery
**Estimated hours**: 5  
**Description**: Build `src/app/gallery/page.tsx` (RSC for the page shell; Client for the reaction buttons). Shows shared worlds as cards.

Sections:
- "Class Gallery" tab — worlds shared within the child's class (teacher-curated; for MVP, any `isPublic` world)
- "My Worlds" tab — all the child's worlds (same as Dashboard but in gallery view)

Each card shows: thumbnail, title, creator name (display name), reflection note (if written), reaction counts.

Reaction system: 4 emoji (heart/star/wow/hmm). Tapping one calls `POST /api/gallery/{id}/like`.

MVP shortcut: gallery shows all worlds where `isPublic: true` from localStorage.

**Dependencies**: 1.5 (UI), 5.3 (dashboard patterns), 1.6 (routing)

**Acceptance Criteria**:
- Gallery loads in under 2 seconds
- Tapping a reaction updates the count optimistically (immediately) before the API confirms
- Each world card links to `/play/{worldId}` (read-only Play Mode)
- Reactions are limited to the 4 preset options — no free text
- "My Worlds" tab shows all personal worlds including private ones
- "Class Gallery" tab shows only public worlds

**Risk**: Reaction API calls for guest users (no account) will fail authentication.  
**Mitigation**: Show reactions as read-only for unauthenticated users. Prompt login only when a user taps a reaction.

---

**Phase 5 Total Estimate**: 26 hours (solo), ~14 hours (team of 2)

---

## Phase 6: Polish and Safety (Week 6)

**Goal**: The product is ready for real children. Safety is hardened, performance is verified, and the experience has the quality of finish that builds trust.

### Tasks

#### 6.1 Content Safety Hardening
**Estimated hours**: 4  
**Description**: Extend and harden the safety layer built in Phase 4.

- Expand the blocklist in `src/lib/content-filter.ts` with additional terms (include common profanity, additional violence terms, hate speech terms)
- Apply `isBlockedInput` to world titles and reflection notes on the save API route (in addition to AI input)
- Write a test suite with 50 real-world child inputs (collected from the team's imagination of what a 7-year-old might type) — verify correct classification
- Verify the output filter catches all patterns in `docs/AI-SYSTEM.md` Section 6 Level 3
- Log safety events (blocked input, blocked output) with `worldId` and timestamp but NOT the content of the blocked message

**Dependencies**: 4.1, 4.2

**Acceptance Criteria**:
- Blocklist test suite passes with zero false negatives on the test corpus
- World title save with a blocked term returns `400` with child-friendly message
- Server-side safety event log does not contain the text of blocked messages (only `worldId`, `timestamp`, `blocked: true`)
- Input blocklist does not block common benign phrases that a child might use (test: "shooting star", "dead tree", "knife fish")

**Risk**: False positives frustrate children and undermine trust.  
**Mitigation**: For ambiguous terms, require the word to appear in a harmful context (use context-aware matching). Review every false positive in testing and adjust the blocklist.

---

#### 6.2 Loading States and Error Handling
**Estimated hours**: 4  
**Description**: Add loading states and user-friendly error messages throughout the application.

- Builder workspace: skeleton loader in `app/builder/[worldId]/loading.tsx` while the world loads
- Object library: skeleton thumbnails while catalog images load
- AI companion: spinner on Spark avatar while API is in flight
- Save: spinner + success confirmation in toolbar
- Error messages: child-friendly phrasing ("Something went wrong — let's try that again!"), never technical jargon
- Network error handling: if save fails, show a persistent banner with a retry button and keep the world in memory

**Dependencies**: 3.3, 4.3, all page components

**Acceptance Criteria**:
- Every async operation has a visible loading state
- Every error state has a user-facing message written at Grade 3 reading level
- A save failure does not lose world state — the in-memory store is preserved
- The builder canvas is never blank for more than 500ms during loading (skeleton shown immediately)

**Risk**: Error state messages that are condescending or unclear to children.  
**Mitigation**: Write all error messages in the voice guide used for Spark (warm, brief, no technical terms). Have a non-technical colleague read-test every message.

---

#### 6.3 Responsive Design (Tablet Support)
**Estimated hours**: 5  
**Description**: Verify and fix responsive layouts across all target breakpoints. Primary focus is tablet (768px portrait and 1024px landscape) as the highest-priority non-desktop target.

Breakpoints from design spec:
- 375px (mobile): object library as bottom sheet, AI companion as floating button
- 768px portrait: canvas full-width, bottom panel for objects, right panel for Spark
- 1024px landscape: canvas 70%, left panel, right panel
- 1280px+ desktop: canvas 75%, wider panels

**Dependencies**: All UI components from Phases 3–5

**Acceptance Criteria**:
- Builder workspace is fully functional at 768px portrait on a real iPad (not just Chrome DevTools)
- Object library opens as a bottom sheet (not a side panel) at ≤768px width
- All touch targets are at least 48×48px on all breakpoints
- No horizontal scrollbars at any supported breakpoint
- Spark panel collapses to a floating button on mobile/tablet portrait

**Risk**: Touch behavior on iPadOS differs from desktop Chrome DevTools emulation.  
**Mitigation**: Test on a real iPad. Pay special attention to drag-and-drop (which behaves differently with touch events).

---

#### 6.4 Animations and Transitions
**Estimated hours**: 4  
**Description**: Implement all motion spec from `docs/PRODUCT.md` Section 6 (Motion and Animation). Ensure all animations respect `prefers-reduced-motion`.

Key animations:
- Object drop: spring settle (scale 0.9 → 1.05 → 1.0, 250ms, spring stiffness 280 damping 24)
- Spark message: slide up + fade in (200ms ease-out)
- Panel open/close: slide + fade (180ms ease-in-out)
- Play Mode enter: crossfade to full screen (300ms ease-in-out)
- Reaction emoji: scale + particle burst (400ms spring)
- Save confirmation: checkmark draw (500ms ease-out)

`prefers-reduced-motion` fallback: replace all springs with a simple 100ms opacity change.

**Dependencies**: All component phases

**Acceptance Criteria**:
- All animations match the duration and easing from the design spec
- `@media (prefers-reduced-motion: reduce)` disables all spring/particle animations
- Object placement spring does not cause frame drops below 30fps on a mid-range tablet
- No "janky" layout reflows during panel transitions (use `transform` and `opacity` only, not `height`/`width`)

**Risk**: Spring physics animation on object placement may drop frames on lower-end tablets.  
**Mitigation**: Use CSS `@keyframes` instead of JavaScript spring libraries for the placement animation. CSS animations run on the compositor thread and are more performant.

---

#### 6.5 Accessibility Audit
**Estimated hours**: 5  
**Description**: Conduct a full accessibility audit against WCAG 2.1 Level AA and fix all critical and high findings.

Audit checklist (from `docs/PRODUCT.md` and `docs/SAFETY.md`):
- Keyboard navigation: Tab order through all interactive elements
- Focus indicators: visible 3px purple ring on all focusable elements
- ARIA landmarks: `<main>`, `<nav>`, `<aside>` used correctly
- `aria-live="polite"` on Spark message region
- Canvas accessible name: `aria-label="3D building canvas"`
- Object library arrow key navigation
- Color contrast: all text/background pairs ≥ 4.5:1 (body), ≥ 3:1 (large text/UI)
- Touch targets: all interactive elements ≥ 48×48px
- Headings: logical heading hierarchy (`h1` → `h2` → `h3`)

**Dependencies**: All components built in Phases 1–5

**Acceptance Criteria**:
- `axe-core` automated scan reports zero critical or serious violations
- Keyboard-only navigation reaches all interactive elements in the builder without using a mouse
- Screen reader (VoiceOver or NVDA) announces Spark messages via the `aria-live` region
- Color contrast passes WCAG AA for all text/background pairs (verified with browser DevTools)
- No `outline: none` or `outline: 0` without a visible focus replacement

**Risk**: The 3D canvas is largely inaccessible to screen readers by its nature.  
**Mitigation**: Provide keyboard placement mode (Tab to cycle objects, arrow keys to move) as documented in `docs/SAFETY.md`. Add a descriptive `aria-label` to the canvas. The canvas itself cannot be made screen-reader navigable, but the surrounding builder UI must be fully accessible.

---

#### 6.6 Performance Optimization
**Estimated hours**: 4  
**Description**: Measure and optimize rendering performance for target devices (mid-range tablet at 30fps minimum).

Optimizations:
- `<InstancedMesh>` grouping for object types with more than 3 instances in the scene (trees, rocks, etc.)
- `React.memo` on `WorldObject` component with a custom comparison function
- Lazy-load GLTF models with `useGLTF.preload()` for objects likely in the selected theme
- Verify no unnecessary re-renders of the canvas tree (use React DevTools Profiler)
- Measure and document frame rate for a scene with 50 objects across 3 device classes

**Dependencies**: 2.4 (WorldObject), 2.3 (catalog)

**Acceptance Criteria**:
- A scene with 50 placed objects maintains at least 30fps on a 2019 iPad Air (tested manually)
- Adding a new object to the scene does not cause visible frame drops
- Zustand store updates from the AI panel do not trigger canvas re-renders (verified via React DevTools)
- Lighthouse Performance score ≥ 70 for the landing page

**Risk**: `<InstancedMesh>` implementation requires refactoring the object rendering approach.  
**Mitigation**: Start `<InstancedMesh>` only if the 30fps target is not met with standard mesh rendering. It is a premature optimization if frame rate is already acceptable.

---

**Phase 6 Total Estimate**: 26 hours (solo), ~14 hours (team of 2)

---

## Phase 7: Extended Features (Weeks 7–8)

**Goal**: The product is complete for a classroom pilot. SQLite replaces localStorage, teacher tools are available, and sharing works.

### Tasks

#### 7.1 SQLite Database Setup
**Estimated hours**: 5  
**Description**: Set up the SQLite database and all repository layers. This is the foundation for all server-side persistence in Phase 7.

Files:
- `src/lib/db/client.ts` — `better-sqlite3` singleton, `PRAGMA journal_mode = WAL`, `PRAGMA foreign_keys = ON`
- `src/lib/db/schema.ts` — run all `CREATE TABLE IF NOT EXISTS` DDL from `docs/ARCHITECTURE.md` Section 4 at startup
- All repository files: `user-repository.ts`, `world-repository.ts`, `conversation-repository.ts`, `like-repository.ts`, `challenge-repository.ts`, `submission-repository.ts`
- All Zod validation schemas: `src/lib/validations/auth-schemas.ts`, `world-schemas.ts`, `ai-schemas.ts`

**Dependencies**: 1.1, 1.3 (types)

**Acceptance Criteria**:
- Running `mise run dev` auto-creates `data/worldcraft.db` if it does not exist
- All `CREATE TABLE` statements execute without errors
- Each repository function is type-safe: it accepts typed parameters and returns typed model objects
- No raw SQL appears outside repository files
- All SQL uses parameterized queries (`stmt.run(params)` — never string interpolation)
- `data/worldcraft.db` is in `.gitignore`

**Risk**: SQLite `STRICT` mode may reject JSON strings stored in `TEXT` columns during migration from localStorage.  
**Mitigation**: `TEXT` columns in `STRICT` mode accept any string, including JSON strings. Test the insert path explicitly.

---

#### 7.2 World API Routes
**Estimated hours**: 6  
**Description**: Implement all world API routes using the repository layer. Migrate save/load from localStorage to the API.

Routes (per `docs/ARCHITECTURE.md` Section 5):
- `GET /api/worlds` — returns user's worlds ordered by `updated_at`
- `POST /api/worlds` — creates a new world
- `GET /api/worlds/[id]` — returns full world including objects JSON
- `PUT /api/worlds/[id]` — partial update (accepts any subset of world fields)
- `DELETE /api/worlds/[id]` — deletes world and cascades

Update `use-auto-save.ts` and the toolbar Save button to call `PUT /api/worlds/[id]` instead of `localStorage`.

**Dependencies**: 7.1, 4.2 (auth route for session), 3.5 (auto-save hook)

**Acceptance Criteria**:
- All routes match the exact request/response shapes in `docs/ARCHITECTURE.md` Section 5
- `PUT /api/worlds/[id]` accepts partial updates — sending only `{ title }` does not wipe other fields
- `DELETE /api/worlds/[id]` cascades to `ai_conversations` and `gallery_likes`
- `401` is returned for unauthenticated requests (not a redirect)
- `403` is returned when a user tries to read/write a world they do not own (unless `is_public: true` for reads)
- Auto-save migrated from localStorage to `PUT /api/worlds/[id]` — localStorage remains as a local backup

**Risk**: Migration from localStorage to API may cause data loss for worlds saved in the browser before the API existed.  
**Mitigation**: On first load after the migration, check localStorage for existing worlds and offer to import them to the server. Keep localStorage as a secondary backup for 30 days.

---

#### 7.3 Auth Route
**Estimated hours**: 3  
**Description**: Implement `POST /api/auth/login` with cookie-based session and rate limiting.

- `src/lib/session.ts` — signed cookie helpers using `crypto.subtle` (built into Node.js 18+) or the `iron-session` library
- `src/lib/rate-limit.ts` — in-memory sliding window, max 10 requests per IP per minute for `/api/auth/login`, 5 requests per 30 seconds per session for `/api/ai/prompt`
- `POST /api/auth/login` — create or find user by `displayName` + `role`, set `HttpOnly SameSite=Lax` session cookie

**Dependencies**: 7.1

**Acceptance Criteria**:
- Successful login sets a `worldcraft_session` cookie with `HttpOnly`, `SameSite=Lax`, `Path=/`
- Calling the route 11+ times per minute from the same IP returns `429`
- A returning user (same `displayName`, same `role`) gets their existing `userId` back (not a new account per login)
- The session cookie is validated by a shared `getSession()` helper used in all protected routes

**Risk**: Session implementation without a battle-tested library may have subtle security issues.  
**Mitigation**: Use `iron-session` (an established cookie encryption library) rather than rolling a custom implementation. It provides secure `seal`/`unseal` with HMAC-SHA-256.

---

#### 7.4 World Sharing and Publishing
**Estimated hours**: 4  
**Description**: Implement the sharing flow. A child can choose to make their world public (visible in the gallery).

- `PUT /api/worlds/[id]` already supports `{ isPublic: true }` — this task adds the UI
- Post-save prompt in the builder: "Share with your class?" — two buttons: "Share" (sets `isPublic: true`) / "Keep Private"
- Gallery API route `GET /api/gallery` — returns `is_public: 1` worlds with creator info
- `POST /api/gallery/[id]/like` — upserts a reaction

**Dependencies**: 7.2, 5.5 (gallery page)

**Acceptance Criteria**:
- The post-save share prompt appears after every manual save (but can be dismissed)
- "Keep Private" is the default (no affirmative action needed to keep a world private)
- Once public, a world appears in `GET /api/gallery` within one page refresh
- Reactions are deduplicated: the same user can only have one reaction per world (upsert behavior)
- `POST /api/gallery/[id]/like` validates the `reaction` field against the allowed enum values

**Risk**: A child accidentally shares a world they wanted to keep private.  
**Mitigation**: Make "Keep Private" the prominent default. Add an unshare option in the world card's context menu.

---

#### 7.5 Teacher Challenge Dashboard
**Estimated hours**: 8  
**Description**: Build the teacher portal (`/teacher` routes). This is a separate authenticated context with a `role: "teacher"` check on all routes.

Pages:
- `/teacher/dashboard` — overview (classes, recent activity)
- `/teacher/challenges` — list challenges, "New Challenge" form
- `/teacher/challenges/[id]/progress` — student progress view (name, status, last edit, AI message count)

API routes:
- `GET /api/challenges` — teacher gets their own challenges
- `POST /api/challenges` — create a new challenge (teacher only)
- `POST /api/challenges/[id]/submit` — child submits a world to a challenge

**Dependencies**: 7.2, 7.3 (auth)

**Acceptance Criteria**:
- A teacher can create and publish a challenge in under 3 minutes (user test criterion)
- All `/teacher` routes return `403` for users with `role: "child"`
- The progress view shows one row per student with: name, avatar, status (Not Started / In Progress / Submitted), last edit time, AI message count
- "View World" in the progress view opens the student's world in Play Mode (read-only)
- New Challenge form validates all required fields before submission

**Risk**: Teacher portal scope expansion — teacher features can grow unbounded.  
**Mitigation**: Strictly implement only the 5 fields in `POST /api/challenges` (title, prompt, starterTheme, dueAt, classId). No additional metadata or configuration until this baseline is validated in a pilot.

---

#### 7.6 Remix Mode
**Estimated hours**: 4  
**Description**: Allow a child to load a classmate's public world as a starting template for their own world.

- In the gallery, add a "Remix" button on each world card
- Remixing creates a new world in the child's account with:
  - All objects, environment theme, and camera position copied from the original
  - A new `worldId`
  - Title: "Remix of [original title]"
  - `isPublic: false` (private by default)
  - `remixedFromId` field stored (for attribution display)
- Attribution shown in the builder toolbar: "Remixed from [creator name]'s world"

**Dependencies**: 7.2, 7.4 (sharing)

**Acceptance Criteria**:
- Remixing creates a new world in the child's account — it does not modify the original
- The original world's `is_public` status and objects are unchanged after a remix
- Attribution is shown in the builder for remixed worlds
- A child cannot remix their own world (the button is hidden on the child's own worlds)

**Risk**: Attribution of remixed worlds may feel punitive to younger children who do not understand the concept.  
**Mitigation**: Frame attribution positively: "You started from [name]'s world — nice!" rather than "This is a copy of..."

---

#### 7.7 Simple Object Animations
**Estimated hours**: 5  
**Description**: Implement idle animations for selected object types. This is the `animationEnabled` toggle from the properties panel.

Animated objects (initial set):
- Flag: wave (sine-driven Y-rotation)
- Water/ocean plane: ripple (normal map scrolling)
- Cloud: gentle drift (slow X-translation, looping)
- Tree: subtle sway (small Z-rotation oscillation)
- Flame: flicker (scale + brightness variation)

Implementation: R3F `useFrame` hook inside `WorldObject` when `animationEnabled: true`. Each animation is a pure mathematical function of `clock.elapsedTime` — no external animation library required.

**Dependencies**: 2.4 (WorldObject)

**Acceptance Criteria**:
- Each animated object plays its animation smoothly at 60fps
- Turning off `animationEnabled` stops the animation immediately (next frame)
- Animations do not affect object position in the persistent world state — they are purely visual
- A scene with 10 animated objects maintains 30fps on a mid-range tablet

**Risk**: Many animated objects using `useFrame` can cause performance degradation.  
**Mitigation**: Gate each animated object's `useFrame` call with `if (!animationEnabled) return`. Only animated objects pay the per-frame cost.

---

#### 7.8 Sound Effects
**Estimated hours**: 3  
**Description**: Add subtle, optional sound effects for key interactions. All sounds are disabled by default and must be enabled in settings. No sounds autoplay without user action.

Sound events:
- Object placement: soft "pop" or "click" sound
- Object deletion: soft "whoosh"
- Save confirmation: gentle chime
- Spark message arrival: soft notification tone
- Play Mode entry: ambient environment sound (low volume, loops)

Implementation: HTML5 Web Audio API via the `howler.js` library or native `<audio>` elements loaded lazily.

**Dependencies**: 3.5, 4.3

**Acceptance Criteria**:
- All sounds are disabled by default (opt-in in settings)
- Enabling sounds is a persistent setting in localStorage
- Sound files are under 100KB total (compressed)
- No sound plays before the user has interacted with the page (respects browser autoplay policy)

**Risk**: Browser autoplay policies may silently prevent sounds from playing if not triggered by a direct user action.  
**Mitigation**: Initialize the Web Audio context on the first user click event (onboarding "Start Building" tap counts). Use `howler.js` which handles this correctly.

---

**Phase 7 Total Estimate**: 38 hours (solo), ~20 hours (team of 2–3)

---

## Summary: Estimated Timeline

| Phase | Solo Developer | Team of 2–3 |
|-------|---------------|-------------|
| Phase 1: Foundation | Week 1 (21h) | ~2.5 days |
| Phase 2: Core 3D Builder | Week 2 (30h) | ~3 days |
| Phase 3: Builder UX | Week 3 (25h) | ~2.5 days |
| Phase 4: AI Companion | Week 4 (22h) | ~2.5 days |
| Phase 5: Core Pages | Week 5 (26h) | ~3 days |
| Phase 6: Polish and Safety | Week 6 (26h) | ~3 days |
| Phase 7: Extended Features | Weeks 7–8 (38h) | ~4 days |
| **Total** | **~188 hours / 6–8 weeks** | **~3–4 weeks** |

---

## Post-MVP Roadmap

The following features are captured for strategic planning but are not scoped for the current development cycle. Each item should be preceded by user research validating the need before implementation.

### Multiplayer Collaborative Building
**Complexity**: Very High  
Children build in the same world simultaneously with real-time sync. Requires WebSocket infrastructure (Socket.io or Partykit), operational transformation or CRDT-based conflict resolution for concurrent object placements, presence indicators, and a moderation layer for real-time interactions. This is a significant architecture addition, not an extension of the current codebase.

### Voice Input for Younger Children
**Complexity**: High  
Children narrate their intent; Spark listens and responds. Requires an ASR (Automatic Speech Recognition) integration compliant with COPPA — on-device ASR (Web Speech API) is the privacy-safe choice but has inconsistent cross-browser support. Off-device ASR (Whisper API) requires careful data handling review given the target age group.

### Curriculum-Aligned Challenge Packs
**Complexity**: Medium  
Curated challenge sets tagged to learning standards (NGSS for science, Common Core ELA for literacy). Requires partnerships with curriculum designers and school districts for standard alignment. The technical implementation (challenge templates + tags) is a moderate extension of the existing challenge system.

### Analytics for Teachers (Creativity Metrics)
**Complexity**: Medium  
Dashboard showing aggregate class data: average world size, most-used objects, AI interaction patterns, time-on-task distribution. Requires careful definition of what "creativity metrics" are ethically meaningful (and what is surveillance). Must be opt-in at the school level. Privacy review required before any analytics infrastructure is added.

### Export to Video/Image
**Complexity**: Medium  
Auto-capture a Play Mode camera flythrough as a video (WebM/MP4) or export a high-resolution screenshot of the current canvas view. Requires `canvas.toDataURL()` for screenshots and `MediaRecorder` API for video. Video encoding on the client is CPU-intensive; server-side rendering (Puppeteer or a headless Three.js render) is more reliable but adds infrastructure.

### Parent Dashboard
**Complexity**: Medium  
A separate authenticated context for parents to view their child's worlds, see Spark conversation summaries, and manage account deletion. Requires a parent account linked to a child account — a new data relationship not in the current schema. COPPA parental consent flows must be implemented carefully.

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| R3F / React 19 peer dependency conflict | Medium | High | Pin compatible versions before install; test in isolation |
| GLTF art production blocks rendering | High | Medium | Use primitive geometry throughout development; replace with models as art is completed |
| OpenAI API latency >1.5s | Medium | Medium | 3-second timeout + immediate fallback; use persistent server (Railway/Fly) not serverless |
| localStorage 5MB limit exceeded | Low | Medium | Serialize only essential fields; Phase 7 SQLite migration removes the constraint |
| iOS Safari touch drag behavior differs | High | Medium | Test on real iPad early in Phase 3; implement touch-specific drag handlers |
| Blocklist false positives frustrate children | Medium | High | Test blocklist against 50 real-world inputs; use word-boundary matching |
| TransformControls / OrbitControls conflict | Medium | Medium | Use documented Drei `makeDefault` pattern; test in Phase 2.6 |
| COPPA non-compliance at launch | Low | Critical | Legal review before any public launch; no email collection ever; no behavioral tracking |

---

*Document owner: Product + Engineering — WorldCraft Kids*  
*Based on: docs/PRODUCT.md, docs/ARCHITECTURE.md, docs/AI-SYSTEM.md, docs/SAFETY.md*  
*Next review: Sprint 1 kickoff*
