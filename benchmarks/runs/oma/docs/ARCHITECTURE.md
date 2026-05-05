# WorldCraft Kids — Technical Architecture

**Version**: 0.1  
**Status**: Pre-MVP  
**Stack**: Next.js 16 (App Router) · TypeScript · React Three Fiber · Tailwind CSS 4 · Zustand · OpenAI API · SQLite (better-sqlite3)

---

## Table of Contents

1. [Technical Architecture Overview](#1-technical-architecture-overview)
2. [System Architecture Diagram](#2-system-architecture-diagram)
3. [Directory Structure](#3-directory-structure)
4. [Database Schema](#4-database-schema)
5. [API Route Design](#5-api-route-design)
6. [State Management Design](#6-state-management-design)
7. [Key Technical Decisions](#7-key-technical-decisions)

---

## 1. Technical Architecture Overview

### Rendering Strategy

WorldCraft Kids uses the Next.js 16 App Router with a deliberate split between server and client rendering:

**Server Components (RSC)** handle:
- Landing page, gallery index, dashboard world list — data-fetching pages where interactivity is minimal and SEO or initial-load speed matters.
- Layout shells and navigation chrome that never change based on client state.
- Streamed data from SQLite on API boundaries (via Route Handlers, not Server Actions, to keep the backend contract explicit and testable).

**Client Components** (`"use client"`) handle:
- Everything inside the builder workspace: the 3D canvas, object library panel, AI companion panel, properties panel, and toolbar.
- The Zustand store providers and hook consumers.
- Any component that uses `useEffect`, `useState`, browser APIs, or subscribes to real-time state.

The rule is: push the boundary toward the server as far as possible, then flip to client only when interactivity or browser APIs are actually required.

### 3D Canvas Layer

React Three Fiber (R3F) renders inside a `<Canvas>` component that is always a Client Component. The canvas is isolated in `src/components/three/` and communicates with the rest of the application exclusively through the Zustand `useWorldStore`. It never fetches data directly — the store is the single source of truth for what is rendered.

Drei provides ready-made abstractions (orbit controls, environment presets, instanced meshes, HTML overlays) that reduce boilerplate. The canvas does not know about API routes or the AI companion — it only reads and writes world state through the store.

### API Layer

All server-side logic lives in Next.js Route Handlers under `src/app/api/`. This keeps the deployment to a single Node.js process (one Vercel function, one Railway container, one Docker image) with no separate backend service required for MVP.

Route Handlers follow the clean architecture pattern:

```
Route Handler (HTTP boundary) → Service (business logic) → Repository (SQLite access) → Model types
```

- Route handlers validate input with Zod and delegate immediately to a service function.
- Service functions contain all business logic and call repository functions.
- Repository functions contain all SQL and return typed model objects — never raw `Database.Statement` results.
- No SQL appears in route handlers or service files.

### Persistence Layer

SQLite via `better-sqlite3` is the MVP database. The file lives at `data/worldcraft.db` (outside `src/`, gitignored). All queries are parameterized — no string interpolation in SQL ever.

A thin repository layer in `src/lib/db/` wraps every query behind a typed function. When the product outgrows SQLite, the repository interface stays the same and the implementation is swapped to a Postgres client (via Drizzle ORM) without touching service or route code.

### Client State

Zustand manages all client state. There are four stores:

| Store | Concern |
|---|---|
| `useWorldStore` | 3D objects, environment, camera — everything the canvas renders |
| `useUIStore` | Panel visibility, undo/redo stack, play mode flag |
| `useUserStore` | Current user session (name, avatar emoji, id) |
| `useAIStore` | Spark conversation messages, loading flag, variation suggestions |

Stores are not wrapped in React Context providers — Zustand's module-level singletons are used directly. This avoids provider trees and is safe for the single-tab session model.

### Feature-Based Code Organization

`src/` is organized by feature domain, not by file type. All code related to the builder (components, hooks, utilities) lives together under `src/app/builder/` and `src/components/builder/`. Shared primitives (UI atoms, Three.js helpers, utility functions) live in `src/components/ui/`, `src/components/three/`, and `src/lib/`. No cross-feature imports — features may only import from shared directories.

---

## 2. System Architecture Diagram

### Full System

```
┌─────────────────────────────────────────────────────────┐
│                        BROWSER                          │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Next.js App Router                 │   │
│  │                                                 │   │
│  │  ┌──────────────┐    ┌──────────────────────┐  │   │
│  │  │  RSC Pages   │    │  Client Components   │  │   │
│  │  │  (dashboard, │    │  (builder, canvas,   │  │   │
│  │  │   gallery,   │    │   panels, toolbar)   │  │   │
│  │  │   landing)   │    │                      │  │   │
│  │  └──────┬───────┘    └──────────┬───────────┘  │   │
│  │         │                       │               │   │
│  │         │              ┌────────▼────────┐      │   │
│  │         │              │  Zustand Stores │      │   │
│  │         │              │  useWorldStore  │      │   │
│  │         │              │  useUIStore     │      │   │
│  │         │              │  useUserStore   │      │   │
│  │         │              │  useAIStore     │      │   │
│  │         │              └────────┬────────┘      │   │
│  │         │                       │               │   │
│  │         │              ┌────────▼────────┐      │   │
│  │         │              │   R3F Canvas    │      │   │
│  │         │              │  (Three.js +    │      │   │
│  │         │              │   Drei helpers) │      │   │
│  │         │              └─────────────────┘      │   │
│  └─────────┼───────────────────────────────────────┘   │
│            │  fetch()                                   │
└────────────┼───────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│              Next.js API Routes (Route Handlers)        │
│                                                         │
│   /api/auth/*        /api/worlds/*                      │
│   /api/ai/*          /api/gallery/*                     │
│   /api/challenges/*                                     │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │    Service Layer  (src/lib/services/)            │  │
│  │    AuthService  WorldService  AIService          │  │
│  │    GalleryService  ChallengeService              │  │
│  └──────────────┬───────────────────────────────────┘  │
│                 │                                       │
│  ┌──────────────▼───────────────────────────────────┐  │
│  │  Repository Layer  (src/lib/db/repositories/)    │  │
│  │  UserRepository  WorldRepository                 │  │
│  │  ConversationRepository  LikeRepository          │  │
│  │  ChallengeRepository  SubmissionRepository       │  │
│  └──────────────┬───────────────────────────────────┘  │
└─────────────────┼───────────────────────────────────────┘
                  │                        │
        ┌─────────▼────────┐    ┌──────────▼──────────┐
        │   SQLite DB      │    │    OpenAI API        │
        │  (better-sqlite3)│    │  (gpt-4o-mini for   │
        │  data/worldcraft │    │   Spark prompts &   │
        │  .db)            │    │   suggestions)      │
        └──────────────────┘    └─────────────────────┘
```

### Client-Side Architecture Detail

```
React Component Tree
│
├── RSC Layout Shell (layout.tsx)
│
└── Client Boundary ("use client")
    │
    ├── Zustand Stores (module-level singletons, no provider needed)
    │   ├── useWorldStore  ──────────────────────────────┐
    │   ├── useUIStore                                   │
    │   ├── useUserStore                                 │
    │   └── useAIStore                                   │
    │                                                    │
    └── Builder Page                                     │
        ├── Toolbar                   reads useUIStore   │
        ├── ObjectLibraryPanel        dispatches to      │
        ├── AICompanionPanel          useWorldStore ──►  R3F Canvas
        ├── PropertiesPanel                              │
        └── WorldCanvas ("use client")                  │
            └── <Canvas> (React Three Fiber)  ◄─────────┘
                ├── EnvironmentPreset (Drei)
                ├── OrbitControls (Drei)
                ├── InstancedObjects
                │   └── WorldObject × N  (reads store.objects)
                └── PostProcessing (if needed)
```

---

## 3. Directory Structure

```
src/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout (fonts, global CSS, metadata)
│   ├── page.tsx                      # Landing page (RSC)
│   ├── globals.css                   # Tailwind base + CSS variables
│   │
│   ├── onboarding/                   # Child onboarding flow
│   │   └── page.tsx                  # Name entry + starter world selection (Client)
│   │
│   ├── dashboard/                    # My worlds list
│   │   └── page.tsx                  # World cards grid (RSC, fetches from DB)
│   │
│   ├── builder/
│   │   └── [worldId]/
│   │       ├── page.tsx              # Builder workspace shell (Client)
│   │       └── loading.tsx           # Skeleton while world loads
│   │
│   ├── play/
│   │   └── [worldId]/
│   │       └── page.tsx              # Explore/play mode (Client, R3F full-screen)
│   │
│   ├── gallery/
│   │   └── page.tsx                  # Community gallery (RSC)
│   │
│   └── api/                          # Route Handlers
│       ├── auth/
│       │   └── login/
│       │       └── route.ts          # POST /api/auth/login
│       ├── worlds/
│       │   ├── route.ts              # GET /api/worlds, POST /api/worlds
│       │   └── [id]/
│       │       └── route.ts          # GET, PUT, DELETE /api/worlds/[id]
│       ├── ai/
│       │   ├── prompt/
│       │   │   └── route.ts          # POST /api/ai/prompt
│       │   └── suggest/
│       │       └── route.ts          # POST /api/ai/suggest
│       ├── gallery/
│       │   ├── route.ts              # GET /api/gallery
│       │   └── [id]/
│       │       └── like/
│       │           └── route.ts      # POST /api/gallery/[id]/like
│       └── challenges/
│           ├── route.ts              # GET /api/challenges, POST /api/challenges
│           └── [id]/
│               └── submit/
│                   └── route.ts      # POST /api/challenges/[id]/submit
│
├── components/
│   ├── ui/                           # Shared UI primitives (shadcn/ui base)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── sheet.tsx
│   │   ├── tooltip.tsx
│   │   └── badge.tsx
│   │
│   ├── builder/                      # Builder workspace components
│   │   ├── toolbar.tsx               # Top bar: title, theme, undo/redo, save, play
│   │   ├── object-library-panel.tsx  # Left panel: thematic groups + search
│   │   ├── object-thumbnail.tsx      # Draggable object card
│   │   ├── properties-panel.tsx      # Bottom bar: color, texture, animation, scale
│   │   └── world-canvas.tsx          # "use client" wrapper for R3F Canvas
│   │
│   ├── three/                        # React Three Fiber components
│   │   ├── scene.tsx                 # Root R3F scene: env preset, lighting, controls
│   │   ├── world-object.tsx          # Single placed object mesh
│   │   ├── instanced-objects.tsx     # InstancedMesh for many identical objects
│   │   ├── environment-preset.tsx    # Drei <Environment> with theme mapping
│   │   ├── play-camera.tsx           # First-person camera controller for play mode
│   │   └── grid-plane.tsx            # Ground grid with snap behavior
│   │
│   └── ai/                           # AI companion components
│       ├── spark-panel.tsx           # Collapsible Spark side panel
│       ├── spark-message.tsx         # Individual message bubble
│       ├── spark-input.tsx           # Child reply text field
│       └── variation-cards.tsx       # 3-card suggestion strip
│
├── stores/                           # Zustand stores
│   ├── use-world-store.ts
│   ├── use-ui-store.ts
│   ├── use-user-store.ts
│   └── use-ai-store.ts
│
├── lib/
│   ├── db/
│   │   ├── client.ts                 # better-sqlite3 singleton (server-only)
│   │   ├── schema.ts                 # CREATE TABLE statements (run once at startup)
│   │   └── repositories/
│   │       ├── user-repository.ts
│   │       ├── world-repository.ts
│   │       ├── conversation-repository.ts
│   │       ├── like-repository.ts
│   │       ├── challenge-repository.ts
│   │       └── submission-repository.ts
│   ├── services/
│   │   ├── auth-service.ts
│   │   ├── world-service.ts
│   │   ├── ai-service.ts
│   │   ├── gallery-service.ts
│   │   └── challenge-service.ts
│   ├── validations/
│   │   ├── auth-schemas.ts           # Zod schemas for auth input
│   │   ├── world-schemas.ts          # Zod schemas for world create/update
│   │   └── ai-schemas.ts             # Zod schemas for AI prompt requests
│   ├── errors.ts                     # Centralized custom error classes
│   ├── session.ts                    # Cookie-based session helpers (server-only)
│   └── cn.ts                         # clsx + tailwind-merge helper
│
├── hooks/                            # Custom React hooks
│   ├── use-auto-save.ts              # Debounced world auto-save (60s interval)
│   ├── use-drag-to-canvas.ts         # HTML drag events → R3F world coordinates
│   ├── use-keyboard-shortcuts.ts     # Ctrl+Z undo, Ctrl+Y redo, Delete object
│   └── use-spark-trigger.ts          # Heuristic: when to surface a Spark message
│
└── types/                            # Shared TypeScript type definitions
    ├── world.ts                      # WorldObject, EnvironmentTheme, CameraPosition
    ├── user.ts                       # User, Session
    ├── ai.ts                         # SparkMessage, AISuggestion
    └── api.ts                        # API request/response envelope types

data/
└── worldcraft.db                     # SQLite database file (gitignored)

public/
├── objects/                          # Static 3D model thumbnails (PNG, 64×64)
└── environments/                     # Environment preview images
```

---

## 4. Database Schema

### Design Notes

- Primary keys are `TEXT` UUIDs generated with `nanoid` in application code (not auto-increment integers), so IDs are safe to expose in URLs without enumeration risk.
- `objects_json` and `messages_json` are stored as JSON strings. The application layer owns deserialization. This avoids a separate `world_objects` table for MVP while keeping the schema simple to migrate later.
- `camera_position` is stored as a JSON string `{ x, y, z, target: { x, y, z } }`.
- `STRICT` mode is used on all tables to enforce column type contracts at the SQLite level.
- All foreign keys use `ON DELETE CASCADE` to prevent orphaned rows.
- `PRAGMA foreign_keys = ON` is set at connection time in `src/lib/db/client.ts`.

### SQL DDL

```sql
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- ─────────────────────────────────────────────
-- Users
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id           TEXT    NOT NULL PRIMARY KEY,
  display_name TEXT    NOT NULL,
  avatar_emoji TEXT    NOT NULL DEFAULT '🌟',
  role         TEXT    NOT NULL DEFAULT 'child'
                       CHECK (role IN ('child', 'teacher')),
  created_at   INTEGER NOT NULL DEFAULT (unixepoch())
) STRICT;

CREATE INDEX IF NOT EXISTS idx_users_created_at ON users (created_at);

-- ─────────────────────────────────────────────
-- Worlds
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS worlds (
  id                TEXT    NOT NULL PRIMARY KEY,
  user_id           TEXT    NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  title             TEXT    NOT NULL DEFAULT 'My World',
  description       TEXT,
  thumbnail_url     TEXT,
  environment_theme TEXT    NOT NULL DEFAULT 'meadow'
                            CHECK (environment_theme IN (
                              'meadow', 'forest', 'ocean',
                              'desert', 'night_sky', 'snowy_peak'
                            )),
  objects_json      TEXT    NOT NULL DEFAULT '[]',
  camera_position   TEXT    NOT NULL DEFAULT '{"x":0,"y":5,"z":10,"target":{"x":0,"y":0,"z":0}}',
  reflection_note   TEXT,
  is_public         INTEGER NOT NULL DEFAULT 0
                            CHECK (is_public IN (0, 1)),
  created_at        INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at        INTEGER NOT NULL DEFAULT (unixepoch())
) STRICT;

CREATE INDEX IF NOT EXISTS idx_worlds_user_id   ON worlds (user_id);
CREATE INDEX IF NOT EXISTS idx_worlds_is_public ON worlds (is_public, updated_at DESC);

-- ─────────────────────────────────────────────
-- AI Conversations (one per world, append-only messages)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_conversations (
  id           TEXT    NOT NULL PRIMARY KEY,
  world_id     TEXT    NOT NULL REFERENCES worlds (id) ON DELETE CASCADE,
  messages_json TEXT   NOT NULL DEFAULT '[]',
  created_at   INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at   INTEGER NOT NULL DEFAULT (unixepoch())
) STRICT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_ai_conversations_world_id
  ON ai_conversations (world_id);

-- ─────────────────────────────────────────────
-- Gallery Likes (emoji reactions: heart, star, wow, hmm)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_likes (
  id         TEXT    NOT NULL PRIMARY KEY,
  world_id   TEXT    NOT NULL REFERENCES worlds (id) ON DELETE CASCADE,
  user_id    TEXT    NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  reaction   TEXT    NOT NULL DEFAULT 'heart'
                     CHECK (reaction IN ('heart', 'star', 'wow', 'hmm')),
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  UNIQUE (world_id, user_id)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_gallery_likes_world_id ON gallery_likes (world_id);

-- ─────────────────────────────────────────────
-- Teacher Challenges
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS teacher_challenges (
  id                   TEXT    NOT NULL PRIMARY KEY,
  teacher_id           TEXT    NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  title                TEXT    NOT NULL,
  prompt               TEXT    NOT NULL,
  starter_theme        TEXT,
  due_at               INTEGER,
  created_at           INTEGER NOT NULL DEFAULT (unixepoch())
) STRICT;

CREATE INDEX IF NOT EXISTS idx_teacher_challenges_teacher_id
  ON teacher_challenges (teacher_id);

-- ─────────────────────────────────────────────
-- Challenge Submissions
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS challenge_submissions (
  id           TEXT    NOT NULL PRIMARY KEY,
  challenge_id TEXT    NOT NULL REFERENCES teacher_challenges (id) ON DELETE CASCADE,
  world_id     TEXT    NOT NULL REFERENCES worlds (id) ON DELETE CASCADE,
  user_id      TEXT    NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  submitted_at INTEGER NOT NULL DEFAULT (unixepoch()),
  UNIQUE (challenge_id, user_id)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_submissions_challenge_id
  ON challenge_submissions (challenge_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user_id
  ON challenge_submissions (user_id);
```

### TypeScript Model Types

```typescript
// src/types/world.ts

export type EnvironmentTheme =
  | 'meadow' | 'forest' | 'ocean'
  | 'desert' | 'night_sky' | 'snowy_peak';

export interface CameraPosition {
  x: number;
  y: number;
  z: number;
  target: { x: number; y: number; z: number };
}

export interface WorldObject {
  id: string;
  modelKey: string;          // key into the static object catalog
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string | null;      // hex color override, null = default material
  textureKey: string | null;
  animationEnabled: boolean;
}

export interface World {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  environmentTheme: EnvironmentTheme;
  objects: WorldObject[];
  cameraPosition: CameraPosition;
  reflectionNote: string | null;
  isPublic: boolean;
  createdAt: number;
  updatedAt: number;
}
```

---

## 5. API Route Design

All Route Handlers return `application/json`. Errors are returned as `{ error: string }` with the appropriate HTTP status. Input is validated with Zod; validation errors return `400` with a Zod error message.

Authentication is cookie-based: a signed session cookie (`worldcraft_session`) is set on login. Route Handlers read the session via `src/lib/session.ts`. No JWTs for MVP — the added complexity of token refresh is not warranted for a single-server, single-DB setup.

Rate limiting on `/api/auth/login`: max 10 requests per IP per minute (implemented via an in-memory sliding window in `src/lib/rate-limit.ts` for MVP; swap to Upstash Redis for production).

### Auth

#### `POST /api/auth/login`

Simple name + avatar login. Creates user on first visit. Returns session cookie.

**Request body**
```json
{
  "displayName": "Mia",
  "avatarEmoji": "🌟",
  "role": "child"
}
```

**Response `200`**
```json
{
  "user": {
    "id": "abc123",
    "displayName": "Mia",
    "avatarEmoji": "🌟",
    "role": "child"
  }
}
```

Sets `Set-Cookie: worldcraft_session=<signed-value>; HttpOnly; SameSite=Lax; Path=/`

**Errors**: `400` invalid input, `429` rate limit exceeded.

---

### Worlds

#### `GET /api/worlds`

Returns all worlds owned by the authenticated user, ordered by `updated_at` descending.

**Response `200`**
```json
{
  "worlds": [
    {
      "id": "world_abc",
      "title": "Lonely Mountain",
      "thumbnailUrl": "/thumbnails/world_abc.png",
      "environmentTheme": "snowy_peak",
      "isPublic": false,
      "updatedAt": 1746000000
    }
  ]
}
```

**Errors**: `401` not authenticated.

---

#### `POST /api/worlds`

Creates a new world with default state.

**Request body**
```json
{
  "title": "My New World",
  "environmentTheme": "meadow"
}
```

**Response `201`**
```json
{
  "world": { ...fullWorldObject }
}
```

**Errors**: `400` invalid input, `401` not authenticated.

---

#### `GET /api/worlds/[id]`

Returns a full world document including `objects`, `cameraPosition`, and `reflectionNote`.

**Response `200`**: full `World` object.

**Errors**: `401` not authenticated, `403` not owner (unless world is public), `404` not found.

---

#### `PUT /api/worlds/[id]`

Updates a world. Accepts partial updates — only provided fields are changed.

**Request body** (all fields optional)
```json
{
  "title": "Renamed World",
  "objects": [...],
  "cameraPosition": { "x": 0, "y": 5, "z": 10, "target": { "x": 0, "y": 0, "z": 0 } },
  "environmentTheme": "forest",
  "isPublic": true,
  "reflectionNote": "This world feels quiet."
}
```

**Response `200`**: updated `World` object.

**Errors**: `400` invalid input, `401` not authenticated, `403` not owner, `404` not found.

---

#### `DELETE /api/worlds/[id]`

Deletes a world and all associated records (cascade).

**Response `204`** — no body.

**Errors**: `401` not authenticated, `403` not owner, `404` not found.

---

### AI

#### `POST /api/ai/prompt`

Sends the current world state as context to OpenAI and returns a Spark contextual question or observation. Appends the exchange to the world's `ai_conversations` record.

**Request body**
```json
{
  "worldId": "world_abc",
  "worldSnapshot": {
    "objectCount": 7,
    "environmentTheme": "snowy_peak",
    "lastPlacedObject": "flag",
    "objectKeys": ["mountain", "pine_tree", "flag", "cabin"]
  },
  "userMessage": "I want it to feel foggy"
}
```

**Response `200`**
```json
{
  "sparkMessage": "Interesting — what kind of fog? Low mist on the ground, or thick clouds that hide the mountain top?",
  "conversationId": "conv_xyz"
}
```

**Errors**: `400` invalid input, `401` not authenticated, `503` OpenAI unavailable.

---

#### `POST /api/ai/suggest`

Requests 3 object or scene variation suggestions based on the current world context. Does not append to conversation history.

**Request body**
```json
{
  "worldId": "world_abc",
  "intent": "make it feel foggy",
  "environmentTheme": "snowy_peak"
}
```

**Response `200`**
```json
{
  "suggestions": [
    {
      "id": "sug_1",
      "label": "Low ground mist",
      "description": "Add a fog plane near the ground",
      "objectKey": "ground_fog",
      "previewUrl": "/objects/ground_fog_thumb.png"
    },
    {
      "id": "sug_2",
      "label": "Dense cloud layer",
      "description": "Lower a cloud ceiling over the mountain",
      "objectKey": "cloud_low",
      "previewUrl": "/objects/cloud_low_thumb.png"
    },
    {
      "id": "sug_3",
      "label": "Misty waterfall",
      "description": "A waterfall whose spray creates a mist effect",
      "objectKey": "waterfall_mist",
      "previewUrl": "/objects/waterfall_mist_thumb.png"
    }
  ]
}
```

**Errors**: `400` invalid input, `401` not authenticated, `503` OpenAI unavailable.

---

### Gallery

#### `GET /api/gallery`

Returns public worlds, ordered by `updated_at` descending. Supports optional `?limit=20&offset=0` pagination.

**Response `200`**
```json
{
  "worlds": [
    {
      "id": "world_abc",
      "title": "Lonely Mountain",
      "thumbnailUrl": "/thumbnails/world_abc.png",
      "creatorName": "Mia",
      "creatorAvatar": "🌟",
      "environmentTheme": "snowy_peak",
      "reflectionNote": "This world feels quiet.",
      "likeCount": 4,
      "updatedAt": 1746000000
    }
  ],
  "total": 42
}
```

**Errors**: none (public endpoint, no auth required).

---

#### `POST /api/gallery/[id]/like`

Upserts a reaction from the authenticated user on a public world. One reaction per user per world (upserts on `UNIQUE` constraint).

**Request body**
```json
{
  "reaction": "heart"
}
```

**Response `200`**
```json
{
  "likeCount": 5,
  "userReaction": "heart"
}
```

**Errors**: `400` invalid reaction value, `401` not authenticated, `404` world not found or not public.

---

### Challenges

#### `GET /api/challenges`

Returns challenges assigned to the authenticated child user, or all challenges created by the authenticated teacher.

**Response `200`**
```json
{
  "challenges": [
    {
      "id": "chal_abc",
      "title": "Desert Ecosystem",
      "prompt": "Build the ecosystem where your favorite animal lives.",
      "starterTheme": "desert",
      "dueAt": 1746604800,
      "submittedWorldId": null
    }
  ]
}
```

**Errors**: `401` not authenticated.

---

#### `POST /api/challenges`

Teacher only. Creates a new challenge.

**Request body**
```json
{
  "title": "Desert Ecosystem",
  "prompt": "Build the ecosystem where your favorite animal lives.",
  "starterTheme": "desert",
  "dueAt": 1746604800
}
```

**Response `201`**
```json
{
  "challenge": { ...fullChallengeObject }
}
```

**Errors**: `400` invalid input, `401` not authenticated, `403` not a teacher.

---

#### `POST /api/challenges/[id]/submit`

Submits a world as the child's response to a challenge. One submission per child per challenge.

**Request body**
```json
{
  "worldId": "world_abc"
}
```

**Response `201`**
```json
{
  "submission": {
    "id": "sub_xyz",
    "challengeId": "chal_abc",
    "worldId": "world_abc",
    "submittedAt": 1746000000
  }
}
```

**Errors**: `400` invalid input or already submitted, `401` not authenticated, `404` challenge or world not found.

---

## 6. State Management Design

All stores use Zustand with the `immer` middleware for ergonomic immutable updates on nested objects. Stores are defined in `src/stores/` as module-level singletons.

### `useWorldStore`

Owns the entire 3D scene state. The R3F canvas reads from this store and re-renders reactively.

```typescript
// src/stores/use-world-store.ts

import type { WorldObject, EnvironmentTheme, CameraPosition } from '@/types/world';

interface WorldState {
  worldId: string | null;
  title: string;
  objects: WorldObject[];
  selectedObjectId: string | null;
  environment: EnvironmentTheme;
  camera: CameraPosition;
  isDirty: boolean;   // true if unsaved changes exist

  // Actions
  setWorld: (world: {
    worldId: string;
    title: string;
    objects: WorldObject[];
    environment: EnvironmentTheme;
    camera: CameraPosition;
  }) => void;
  setTitle: (title: string) => void;
  addObject: (object: WorldObject) => void;
  moveObject: (id: string, position: [number, number, number]) => void;
  rotateObject: (id: string, rotation: [number, number, number]) => void;
  scaleObject: (id: string, scale: number) => void;
  colorObject: (id: string, color: string | null) => void;
  updateObject: (id: string, patch: Partial<WorldObject>) => void;
  removeObject: (id: string) => void;
  selectObject: (id: string | null) => void;
  setEnvironment: (theme: EnvironmentTheme) => void;
  setCamera: (camera: CameraPosition) => void;
  markSaved: () => void;
}
```

### `useUIStore`

Owns interface state: which panels are open, whether play mode is active, and the undo/redo history.

```typescript
// src/stores/use-ui-store.ts

type ActivePanel = 'objects' | 'properties' | 'ai' | null;

interface UIState {
  activePanel: ActivePanel;
  isPlaying: boolean;
  showAI: boolean;
  isSaving: boolean;
  undoStack: WorldObject[][];   // snapshots of objects[] state
  redoStack: WorldObject[][];

  // Actions
  setActivePanel: (panel: ActivePanel) => void;
  setIsPlaying: (playing: boolean) => void;
  setShowAI: (show: boolean) => void;
  setIsSaving: (saving: boolean) => void;
  pushUndo: (snapshot: WorldObject[]) => void;
  undo: () => WorldObject[] | undefined;
  redo: () => WorldObject[] | undefined;
}
```

Undo stack is capped at 20 snapshots. `pushUndo` is called by `useWorldStore` action wrappers before each mutating action.

### `useUserStore`

Owns the current user session. Persisted to `localStorage` via the Zustand `persist` middleware so the child does not need to log in again on page reload.

```typescript
// src/stores/use-user-store.ts

interface User {
  id: string;
  displayName: string;
  avatarEmoji: string;
  role: 'child' | 'teacher';
}

interface UserState {
  user: User | null;
  isHydrated: boolean;

  // Actions
  setUser: (user: User) => void;
  clearUser: () => void;
}
```

### `useAIStore`

Owns Spark's conversation and suggestion state. Separate from `useWorldStore` to avoid re-rendering the canvas on every message arrival.

```typescript
// src/stores/use-ai-store.ts

import type { SparkMessage, AISuggestion } from '@/types/ai';

interface AIState {
  conversationId: string | null;
  messages: SparkMessage[];
  isLoading: boolean;
  suggestions: AISuggestion[];
  hasDismissed: boolean;   // user tapped ×; Spark stays quiet until next trigger

  // Actions
  setConversationId: (id: string) => void;
  addMessage: (message: SparkMessage) => void;
  setIsLoading: (loading: boolean) => void;
  setSuggestions: (suggestions: AISuggestion[]) => void;
  clearSuggestions: () => void;
  dismiss: () => void;
  resetDismiss: () => void;
}
```

```typescript
// src/types/ai.ts

export interface SparkMessage {
  id: string;
  role: 'spark' | 'child';
  content: string;
  timestamp: number;
}

export interface AISuggestion {
  id: string;
  label: string;
  description: string;
  objectKey: string;
  previewUrl: string;
}
```

---

## 7. Key Technical Decisions

### SQLite for MVP — Zero Configuration, One File

**Decision**: Use `better-sqlite3` directly (no ORM) for MVP. Database file at `data/worldcraft.db`.

**Reasoning**:
- Zero infrastructure: no Postgres instance to provision, no connection pooling to configure, no Docker Compose required for local development. A new contributor runs `npm install && npm run dev` and has a working database.
- Single-writer workload: SQLite's serialized write model is not a limitation for an MVP with a handful of concurrent users.
- Synchronous API of `better-sqlite3` is a performance advantage in Next.js Route Handlers — no async overhead for short queries.
- `STRICT` tables and `PRAGMA foreign_keys = ON` give reasonable data integrity guarantees without an ORM.

**Migration path to Postgres**: The repository layer is the only place with SQL. Swapping to Postgres means:
1. Add `drizzle-orm` and `@vercel/postgres` (or `pg`).
2. Rewrite `src/lib/db/repositories/*.ts` using Drizzle's query builder.
3. Keep all service and route handler code identical.
4. Run `drizzle-kit generate` to produce migrations from the existing schema shape.

The `objects_json` and `messages_json` columns become `jsonb` in Postgres with no application-layer changes.

---

### Zustand for Client State — Minimal Boilerplate, R3F Compatible

**Decision**: Zustand with `immer` middleware. No Redux, no React Context, no Jotai.

**Reasoning**:
- R3F's `useFrame` and `useThree` hooks run inside the canvas on every animation frame. They need to read state synchronously without triggering React re-renders. Zustand's `getState()` function is called outside React's render cycle without subscription overhead. Redux and Context both require being inside a React tree.
- No provider required: stores are module-level singletons. This eliminates the `Provider` wrapping that becomes verbose in App Router when mixing RSC and Client Components.
- `immer` middleware makes nested object mutations (updating one field on one `WorldObject` out of 50) readable without manual spread chains.
- The store boundary is explicit: canvas reads `useWorldStore`, Spark reads `useAIStore`. A Spark message arriving does not re-render the canvas.

---

### React Three Fiber over Raw Three.js — Declarative Scene Graph

**Decision**: R3F `@react-three/fiber` with Drei `@react-three/drei` helpers.

**Reasoning**:
- A placed world object is a React component. Adding, removing, or updating an object is a state update — React's reconciler diffs the scene graph. This eliminates manual `scene.add()` / `scene.remove()` bookkeeping.
- Drei provides `<Environment>`, `<OrbitControls>`, `<Html>`, `<useGLTF>`, and instanced mesh helpers that would each take significant boilerplate to build with raw Three.js.
- TypeScript types from `@types/three` work seamlessly with R3F's JSX props.
- The canvas boundary is a clean Client Component boundary — RSC outside, Three.js inside. No mixing of server-rendering concerns with WebGL.

**Performance mitigation for many objects**:
- Use `<InstancedMesh>` for object types that appear more than 3 times in the scene (trees, rocks, etc.). This collapses N draw calls to 1.
- Apply `<Detailed>` (LOD) for complex models: high-poly version within 10 units, low-poly beyond.
- Lazy-load GLTF models with `useGLTF.preload()` for objects likely to be used (based on environment theme).

---

### Next.js API Routes over a Separate Backend — Single Deployment Unit

**Decision**: All API logic lives in `src/app/api/` as Next.js Route Handlers. No separate Express, Hono, or Fastify server.

**Reasoning**:
- One deployment artifact: the Next.js app serves both the frontend and the API. One Dockerfile, one Railway/Fly.io/Vercel project, one environment variable set.
- Shared TypeScript types: `src/types/` is imported by both client stores and server Route Handlers without a build step or code generation.
- For MVP traffic (a classroom of 30 children), a single Next.js server handles the load comfortably.
- When API load outgrows the frontend server, Route Handlers are extracted to a standalone Node.js service with minimal changes — the service and repository layers are already decoupled from the HTTP framework.

**Tradeoff acknowledged**: Route Handlers cold-start time on serverless platforms can add latency to the first AI request. Mitigation: use a persistent server (Railway, Fly.io) rather than serverless functions for the AI routes in production.

---

### Object Catalog as Static Data — No DB Table for Object Definitions

**Decision**: The object catalog (the 60–80 3D models a child can place) is a static TypeScript file at `src/lib/objects-catalog.ts`, not a database table.

**Reasoning**:
- The catalog changes only on deployments, not at runtime. It is not user-generated data.
- Static import means the catalog is available to both the server (Route Handlers generating AI context) and the client (Object Library panel) with no API round-trip.
- GLTF model files are served from `/public/models/` as static assets, benefiting from CDN caching.

---

*Document owner: Engineering — WorldCraft Kids*  
*Last updated: 2026-05-05*
