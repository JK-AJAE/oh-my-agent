# Worldcraft — Technical Architecture Document

**Platform**: AI-Driven 3D Creative Learning Platform for Children
**Version**: 1.0 (Greenfield)
**Date**: 2026-05-05
**Status**: Design

---

## Table of Contents

1. [System Architecture Overview](#1-system-architecture-overview)
2. [Frontend Architecture](#2-frontend-architecture)
3. [Backend Architecture](#3-backend-architecture)
4. [3D Engine Design](#4-3d-engine-design)
5. [AI Integration Design](#5-ai-integration-design)
6. [Database Schema](#6-database-schema)
7. [Data Flow](#7-data-flow)
8. [Security Considerations](#8-security-considerations)
9. [Performance Strategy](#9-performance-strategy)

---

## 1. System Architecture Overview

### High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTS                                  │
│                                                                 │
│  ┌──────────────────┐          ┌────────────────────────────┐   │
│  │  Student Browser │          │    Teacher Browser         │   │
│  │  (Next.js + R3F) │          │    (Next.js Dashboard)     │   │
│  └────────┬─────────┘          └──────────────┬─────────────┘   │
└───────────┼──────────────────────────────────┼─────────────────┘
            │ HTTPS                             │ HTTPS
            ▼                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                   VERCEL EDGE / CDN                             │
│              (Static Assets, Image Optimization)                │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   NEXT.JS APPLICATION SERVER                    │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │  App Router  │  │  API Routes  │  │  NextAuth.js          │  │
│  │  (RSC + CSR) │  │  (Route      │  │  (Session + JWT)      │  │
│  │              │  │   Handlers)  │  │                       │  │
│  └──────────────┘  └──────┬───────┘  └───────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                             │
           ┌─────────────────┼──────────────────┐
           ▼                 ▼                  ▼
┌──────────────────┐  ┌────────────────┐  ┌───────────────────┐
│   SERVICE LAYER  │  │  AI SERVICE    │  │  STORAGE SERVICE  │
│                  │  │                │  │                   │
│  - ProjectSvc    │  │  OpenAI API    │  │  S3-Compatible    │
│  - GallerySvc    │  │  (GPT-4o-mini) │  │  (Project Assets, │
│  - TeacherSvc    │  │  + Safety      │  │   Thumbnails,     │
│  - ChallengeSvc  │  │    Filter      │  │   3D Asset Lib)   │
└────────┬─────────┘  └────────────────┘  └───────────────────┘
         │
         ▼
┌──────────────────┐
│   PRISMA ORM     │
│                  │
│  PostgreSQL DB   │
│  (Users, World   │
│   Projects, AI   │
│   Conversations, │
│   Classrooms)    │
└──────────────────┘
```

### Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Monolithic vs. Microservices | Monolith (Next.js) | Team size, deployment simplicity, single Vercel deployment |
| 3D Rendering | Client-side (React Three Fiber) | 3D state is inherently client-side; server-side 3D rendering is unnecessary complexity |
| AI Communication | Server-side API route proxying OpenAI | Keeps API keys server-side; enables server-level rate limiting and safety filtering |
| State Management | Zustand (domain-split stores) | Lightweight, no boilerplate, predictable for 3D real-time updates |
| Auth Strategy | NextAuth.js (credentials + session) | Simple email/password; avoids OAuth complexity for children's accounts under teacher supervision |

---

## 2. Frontend Architecture

### App Router Directory Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (fonts, providers)
│   ├── page.tsx                      # Landing / login redirect
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx         # Teacher registration
│   ├── (student)/
│   │   ├── layout.tsx                # Student shell (nav, Zustand providers)
│   │   ├── dashboard/page.tsx        # Project list + challenges
│   │   ├── world/
│   │   │   └── [projectId]/
│   │   │       └── page.tsx          # Main 3D editor (Client Component)
│   │   └── gallery/page.tsx
│   ├── (teacher)/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── classroom/[id]/page.tsx
│   │   └── challenges/page.tsx
│   └── api/                          # See Section 3
├── components/
│   ├── world/                        # 3D scene components (R3F)
│   │   ├── Scene.tsx
│   │   ├── WorldObject.tsx
│   │   ├── Environment.tsx
│   │   ├── AssetLibrary.tsx
│   │   └── CameraController.tsx
│   ├── ui/                           # Generic shadcn/ui base components
│   │   ├── Button.tsx
│   │   ├── Panel.tsx
│   │   └── Modal.tsx
│   ├── editor/                       # Editor-specific panels
│   │   ├── Toolbar.tsx
│   │   ├── PropertiesPanel.tsx
│   │   ├── AICompanionPanel.tsx
│   │   └── ObjectPicker.tsx
│   └── teacher/                      # Teacher dashboard components
├── lib/
│   ├── stores/                       # Zustand stores (see below)
│   ├── api/                          # Typed API client functions
│   ├── prisma.ts                     # Singleton Prisma client
│   └── auth.ts                       # NextAuth config
├── types/
│   ├── world.ts                      # WorldObject, SceneState types
│   ├── ai.ts                         # AIMessage, AIResponse types
│   └── project.ts                    # Project, Gallery types
└── middleware.ts                     # Auth guard for protected routes
```

### Component Hierarchy (Editor View)

```
WorldEditorPage (Client Component — "use client")
├── <Canvas> (React Three Fiber)
│   ├── <CameraController />           # Orbit controls with child-safe limits
│   ├── <Environment />                # Sky, ground, ambient light
│   ├── <WorldObject /> (×N)           # Each placed 3D object
│   └── <SelectionIndicator />         # Highlight selected object
├── <Toolbar />                        # Top bar: file, undo/redo, save status
├── <ObjectPicker />                   # Left panel: asset library by category
├── <PropertiesPanel />                # Right panel: transform, color, metadata
├── <AICompanionPanel />               # Bottom/side: chat with AI companion
└── <SaveStatusIndicator />            # Autosave feedback
```

### Zustand Store Design

Each store is isolated by domain. Stores communicate via selectors, not direct coupling.

```typescript
// lib/stores/worldStore.ts
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { temporal } from 'zundo'           // undo/redo middleware

export interface WorldObject {
  id: string
  type: string                             // 'cube' | 'tree' | 'house' | ...
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  color: string                            // hex string
  metadata: Record<string, unknown>        // theme-specific props
}

export interface WorldState {
  objects: Record<string, WorldObject>
  selectedObjectId: string | null
  environment: {
    skyPreset: string
    groundColor: string
    ambientIntensity: number
    timeOfDay: 'dawn' | 'day' | 'dusk' | 'night'
  }
  camera: {
    target: [number, number, number]
    minDistance: number
    maxDistance: number
    maxPolarAngle: number                  // cap at ~80deg to prevent flipping
  }
  // Actions
  addObject: (obj: WorldObject) => void
  updateObject: (id: string, patch: Partial<WorldObject>) => void
  removeObject: (id: string) => void
  selectObject: (id: string | null) => void
  setEnvironment: (patch: Partial<WorldState['environment']>) => void
}

export const useWorldStore = create<WorldState>()(
  temporal(
    immer((set) => ({
      objects: {},
      selectedObjectId: null,
      environment: {
        skyPreset: 'sunny',
        groundColor: '#4caf50',
        ambientIntensity: 0.8,
        timeOfDay: 'day',
      },
      camera: {
        target: [0, 0, 0],
        minDistance: 5,
        maxDistance: 40,
        maxPolarAngle: Math.PI * 0.45,
      },
      addObject: (obj) =>
        set((state) => { state.objects[obj.id] = obj }),
      updateObject: (id, patch) =>
        set((state) => { Object.assign(state.objects[id], patch) }),
      removeObject: (id) =>
        set((state) => { delete state.objects[id] }),
      selectObject: (id) =>
        set((state) => { state.selectedObjectId = id }),
      setEnvironment: (patch) =>
        set((state) => { Object.assign(state.environment, patch) }),
    }))
  )
)
```

```typescript
// lib/stores/uiStore.ts
interface UIState {
  activePanel: 'objects' | 'properties' | 'ai' | null
  activeTool: 'select' | 'move' | 'rotate' | 'scale' | 'place'
  openModal: 'save' | 'share' | 'settings' | null
  assetCategory: string
  isMobileDrawerOpen: boolean
  setActivePanel: (panel: UIState['activePanel']) => void
  setActiveTool: (tool: UIState['activeTool']) => void
  openModalDialog: (modal: UIState['openModal']) => void
  closeModal: () => void
}
```

```typescript
// lib/stores/projectStore.ts
interface ProjectState {
  projectId: string | null
  title: string
  description: string
  isPublic: boolean
  isDirty: boolean          // unsaved changes
  lastSavedAt: Date | null
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  // Actions
  setProjectMeta: (meta: Partial<ProjectState>) => void
  markDirty: () => void
  markSaved: (savedAt: Date) => void
}
```

```typescript
// lib/stores/aiStore.ts
interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIState {
  conversationId: string | null
  messages: AIMessage[]
  isLoading: boolean
  suggestions: string[]        // quick-reply suggestions for children
  // Actions
  addMessage: (msg: AIMessage) => void
  setSuggestions: (suggestions: string[]) => void
  setLoading: (loading: boolean) => void
  clearConversation: () => void
}
```

---

## 3. Backend Architecture (Next.js API Routes)

### Route Inventory

```
app/api/
├── auth/
│   └── [...nextauth]/route.ts         # NextAuth handler (GET, POST)
├── projects/
│   ├── route.ts                       # GET (list), POST (create)
│   └── [id]/
│       ├── route.ts                   # GET, PATCH, DELETE
│       └── thumbnail/route.ts         # POST (upload thumbnail to S3)
├── ai/
│   └── prompt/route.ts                # POST (send prompt, stream response)
├── gallery/
│   ├── route.ts                       # GET (public gallery, paginated)
│   └── [id]/
│       ├── route.ts                   # GET (single entry)
│       └── like/route.ts              # POST (toggle like)
└── teacher/
    ├── classroom/
    │   ├── route.ts                   # GET (list), POST (create)
    │   └── [id]/
    │       ├── route.ts               # GET, PATCH, DELETE
    │       ├── students/route.ts      # GET (list), POST (enroll via code)
    │       └── projects/route.ts      # GET (all student projects)
    └── challenges/
        ├── route.ts                   # GET, POST
        └── [id]/route.ts             # GET, PATCH, DELETE
```

### Service Layer Pattern

API route handlers are kept thin. Business logic lives in service modules following the router → service → repository pattern specified in backend standards.

```typescript
// app/api/projects/route.ts
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ProjectService } from '@/lib/services/projectService'
import { createProjectSchema } from '@/lib/validators/project'
import { AppError } from '@/lib/errors'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const parsed = createProjectSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  try {
    const project = await ProjectService.create(session.user.id, parsed.data)
    return Response.json(project, { status: 201 })
  } catch (error) {
    if (error instanceof AppError) {
      return Response.json({ error: error.message }, { status: error.statusCode })
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

```typescript
// lib/services/projectService.ts
import { ProjectRepository } from '@/lib/repositories/projectRepository'
import { WorldDataValidator } from '@/lib/validators/worldData'
import { AppError } from '@/lib/errors'

export class ProjectService {
  static async create(userId: string, data: CreateProjectInput) {
    const validated = WorldDataValidator.sanitize(data.worldData)
    return ProjectRepository.create({
      ...data,
      userId,
      worldData: validated,
    })
  }

  static async update(userId: string, projectId: string, patch: UpdateProjectInput) {
    const project = await ProjectRepository.findById(projectId)
    if (!project) throw new AppError('Project not found', 404)
    if (project.userId !== userId) throw new AppError('Forbidden', 403)
    return ProjectRepository.update(projectId, patch)
  }

  static async getPublicGallery(page: number, limit: number) {
    return ProjectRepository.findPublic({ page, limit })
  }
}
```

### Request Validation

All API inputs are validated using `zod` before reaching service layer:

```typescript
// lib/validators/project.ts
import { z } from 'zod'

export const worldObjectSchema = z.object({
  id: z.string().uuid(),
  type: z.string().max(50),
  position: z.tuple([z.number(), z.number(), z.number()]),
  rotation: z.tuple([z.number(), z.number(), z.number()]),
  scale: z.tuple([z.number().min(0.1).max(10), z.number().min(0.1).max(10), z.number().min(0.1).max(10)]),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  metadata: z.record(z.unknown()).optional().default({}),
})

export const createProjectSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  worldData: z.object({
    objects: z.record(worldObjectSchema).refine(
      (objs) => Object.keys(objs).length <= 200,
      { message: 'Maximum 200 objects per world' }
    ),
    environment: z.object({
      skyPreset: z.string(),
      groundColor: z.string(),
      ambientIntensity: z.number().min(0).max(2),
      timeOfDay: z.enum(['dawn', 'day', 'dusk', 'night']),
    }),
  }),
  isPublic: z.boolean().default(false),
})
```

---

## 4. 3D Engine Design

### Scene Graph Structure

```
<Canvas>                          # R3F root, WebGL context
├── <Suspense fallback={...}>     # Asset loading boundary
│   ├── <CameraController />      # OrbitControls with child-safe limits
│   ├── <EnvironmentSystem />
│   │   ├── <Sky />               # @react-three/drei Sky component
│   │   ├── <Ground />            # Infinite grid plane
│   │   └── <Lights />            # Ambient + directional
│   ├── <ObjectRenderer />        # Maps worldStore.objects → WorldObject
│   │   └── <WorldObject />       # Individual placed object
│   │       ├── <ObjectMesh />    # Geometry + material
│   │       └── <SelectionBox />  # Conditional bounding-box highlight
│   └── <GhostObject />           # Preview during placement
└── <Stats />                     # Dev-only FPS counter
```

### WorldObject Model

```typescript
// types/world.ts
export type ObjectType =
  | 'cube' | 'sphere' | 'cylinder' | 'pyramid'      // primitives
  | 'tree_oak' | 'tree_pine' | 'tree_palm'           // nature
  | 'house_small' | 'house_large' | 'castle_tower'  // structures
  | 'car' | 'rocket' | 'boat'                        // vehicles
  | 'character_human' | 'character_robot'            // characters
  | 'light_point' | 'light_directional'              // lights

export interface WorldObject {
  id: string                                // nanoid() — not UUID, cheaper
  type: ObjectType
  position: [number, number, number]        // meters in world space
  rotation: [number, number, number]        // euler angles in radians
  scale: [number, number, number]           // uniform scale 0.1–10
  color: string                             // hex, applied as mesh color
  metadata: {
    name?: string                           // user label
    locked?: boolean                        // prevent accidental moves
    groupId?: string                        // for grouped objects
    [key: string]: unknown
  }
}
```

### Asset Library Organization

Assets are organized into themed categories, each backed by pre-optimized GLTF files stored in S3 and cached at the CDN layer.

```typescript
// lib/assetLibrary.ts
export interface AssetDefinition {
  type: ObjectType
  label: string
  icon: string                     // path to 2D preview PNG
  glbUrl: string                   // S3/CDN URL to .glb file
  defaultScale: [number, number, number]
  polyCount: 'low' | 'medium'      // never 'high' — school devices
  tags: string[]
}

export const ASSET_CATEGORIES: Record<string, AssetDefinition[]> = {
  nature: [
    { type: 'tree_oak', label: 'Oak Tree', polyCount: 'low', ... },
    { type: 'tree_pine', label: 'Pine Tree', polyCount: 'low', ... },
  ],
  buildings: [
    { type: 'house_small', label: 'Small House', polyCount: 'medium', ... },
  ],
  vehicles: [ ... ],
  characters: [ ... ],
  primitives: [ ... ],
}
```

GLB assets are preloaded with `useGLTF.preload()` for the currently visible category tab, and lazily loaded for others.

### Camera Controls for Children

```typescript
// components/world/CameraController.tsx
import { OrbitControls } from '@react-three/drei'

export function CameraController() {
  return (
    <OrbitControls
      // Prevent camera from going below ground
      maxPolarAngle={Math.PI * 0.45}
      minPolarAngle={0.1}
      // Prevent extreme zoom
      minDistance={5}
      maxDistance={40}
      // Smooth damping for less disorienting movement
      enableDamping
      dampingFactor={0.08}
      // Pan limits to keep world centered
      maxTargetRadius={30}
      // Touch support for tablets
      touches={{ ONE: 4 /* TOUCH.ROTATE */, TWO: 512 /* TOUCH.DOLLY_PAN */ }}
    />
  )
}
```

### Performance Considerations for School Devices

School hardware profile: Intel HD/UHD iGPU, 4–8 GB RAM, Chrome on Windows 10/11.

| Constraint | Strategy |
|------------|----------|
| Max draw calls | Merge static geometry with `InstancedMesh` for repeated objects |
| Texture memory | Max 512×512 textures; use vertex colors where possible |
| Polygon budget | 200 objects × avg 500 polys = 100k tris per scene (well within budget) |
| JS thread | Move physics/collision to Web Worker if added later |
| Network | Cache GLBs in browser Cache API; serve from CDN with long-lived cache headers |

```typescript
// components/world/ObjectRenderer.tsx
// Use InstancedMesh for objects of the same type to reduce draw calls
import { useMemo, useRef } from 'react'
import { InstancedMesh, Matrix4, Object3D } from 'three'
import { useWorldStore } from '@/lib/stores/worldStore'

export function ObjectRenderer() {
  const objects = useWorldStore((s) => s.objects)
  // Group by type and render as instanced meshes
  const byType = useMemo(() =>
    Object.values(objects).reduce((acc, obj) => {
      ;(acc[obj.type] ??= []).push(obj)
      return acc
    }, {} as Record<string, typeof objects[string][]>),
    [objects]
  )
  // Render each type group
  return <>{Object.entries(byType).map(([type, objs]) =>
    <InstancedObjectGroup key={type} type={type} objects={objs} />
  )}</>
}
```

---

## 5. AI Integration Design

### System Architecture

```
AICompanionPanel (client)
      │ POST /api/ai/prompt
      ▼
app/api/ai/prompt/route.ts
      │
      ├── [1] Auth check
      ├── [2] Rate limit check (Redis or DB-backed token bucket)
      ├── [3] Build prompt (system prompt + world state summary + history)
      ├── [4] PII scrub (strip student names, school names from world context)
      ├── [5] OpenAI API call (GPT-4o-mini, streaming)
      ├── [6] Content safety filter (response passes through moderation check)
      └── [7] Persist to AIConversation + stream to client
```

### System Prompt Engineering

The system prompt is the primary control surface for age-appropriate behavior. It is assembled server-side and never exposed to the client.

```typescript
// lib/ai/promptBuilder.ts

function buildSystemPrompt(worldContext: WorldContextSummary): string {
  return `
You are Sparky, a friendly creative assistant for children ages 6-14 who are building 3D worlds.

PERSONALITY:
- Enthusiastic, encouraging, and patient
- Use simple language appropriate for children
- Celebrate creativity and effort, not just results
- Never mention competitor platforms, brand names, or commercial products
- Never discuss violence, scary topics, politics, or adult content

YOUR ROLE:
- Help children get unstuck creatively ("What if you added a...")
- Suggest themes and color combinations
- Explain what different objects could be used for
- Encourage storytelling ("What story is happening in your world?")
- Give simple building tips ("Trees look great near the edges of your world!")

WORLD CONTEXT:
- Objects in the scene: ${worldContext.objectCount} objects
- Current theme: ${worldContext.dominantTheme}
- Recent placements: ${worldContext.recentObjects.join(', ')}

STRICT RULES:
1. Never generate, request, or reference any personal information
2. Never ask for the child's real name, location, age, or school
3. If the child shares personal info, gently redirect: "That's cool! Let's focus on your amazing world."
4. Responses must be 1-3 short sentences maximum
5. Always end with a creative question or suggestion to keep the child engaged
6. If any message is unclear or could be harmful, respond with: "Tell me more about what you want to build!"

SAFETY ESCALATION:
- If a child expresses sadness, danger, or distress, respond: "It sounds like you might need to talk to a grown-up. Is there a teacher or adult nearby?"
`.trim()
}
```

### World Context Serialization

World state is summarized (not fully serialized) before sending to the AI to stay within context limits and avoid sending unnecessary data.

```typescript
// lib/ai/worldContextBuilder.ts

export interface WorldContextSummary {
  objectCount: number
  dominantTheme: string
  recentObjects: string[]
  environmentDescription: string
}

export function buildWorldContext(
  objects: Record<string, WorldObject>,
  environment: WorldState['environment'],
  lastNObjects: number = 5
): WorldContextSummary {
  const allObjects = Object.values(objects)
  const typeCounts = allObjects.reduce((acc, obj) => {
    acc[obj.type] = (acc[obj.type] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)

  const dominantType = Object.entries(typeCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0] ?? 'mixed'

  const themeMap: Record<string, string> = {
    tree_oak: 'forest', tree_pine: 'forest',
    house_small: 'village', castle_tower: 'medieval',
    car: 'city', rocket: 'space',
  }
  const dominantTheme = themeMap[dominantType] ?? 'creative'

  const recent = allObjects
    .slice(-lastNObjects)
    .map((o) => o.type.replace(/_/g, ' '))

  return {
    objectCount: allObjects.length,
    dominantTheme,
    recentObjects: recent,
    environmentDescription: `${environment.timeOfDay} sky, ${environment.skyPreset} weather`,
  }
}
```

### Rate Limiting

Rate limits protect both cost and child safety.

```typescript
// lib/ai/rateLimiter.ts
// Simple DB-backed rate limiter (no Redis dependency required for Vercel)
// Uses Prisma to track request counts with 1-minute sliding windows

const RATE_LIMITS = {
  student: { requests: 10, windowMs: 60_000 },     // 10 req/min
  teacher: { requests: 30, windowMs: 60_000 },
}

export async function checkRateLimit(
  userId: string,
  role: 'student' | 'teacher'
): Promise<{ allowed: boolean; remainingMs?: number }> {
  // Implementation uses a RateLimitEntry table or can use
  // Vercel KV / Upstash Redis if available for lower latency
  const limit = RATE_LIMITS[role]
  const since = new Date(Date.now() - limit.windowMs)
  const count = await prisma.aIConversation.count({
    where: { project: { userId }, createdAt: { gte: since } }
  })
  return { allowed: count < limit.requests }
}
```

### Response Safety Filter

```typescript
// lib/ai/safetyFilter.ts
// Secondary pass using OpenAI Moderation API (free) before returning to client

export async function filterResponse(text: string): Promise<string> {
  const moderation = await openai.moderations.create({ input: text })
  const result = moderation.results[0]
  if (result.flagged) {
    console.warn('[AI Safety] Response flagged, substituting fallback', result.categories)
    return "That's a great question! Try adding more objects to your world and see what you can create!"
  }
  return text
}
```

### Token Budget Management

```
Max tokens per request to GPT-4o-mini:
- System prompt:       ~400 tokens
- World context:       ~100 tokens
- Conversation history: ~300 tokens (last 6 messages, trimmed FIFO)
- User message:        ~100 tokens
- Response max:        ~200 tokens
─────────────────────────────────────
Total:                ~1,100 tokens per call

At $0.15/1M input + $0.60/1M output (GPT-4o-mini pricing):
≈ $0.00025 per conversation turn
≈ $0.0025 for 10 turns (a full session)
```

Conversation history is stored in `aiStore` client-side and in `AIConversation.messages` server-side. When history exceeds 6 messages, oldest messages are dropped from the context window but remain persisted in the database.

---

## 6. Database Schema

### Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Auth ───────────────────────────────────────────────────────────────────

enum Role {
  STUDENT
  TEACHER
  ADMIN
}

model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  emailVerified DateTime?
  passwordHash  String
  role          Role      @default(STUDENT)
  avatarUrl     String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  projects         Project[]
  aiConversations  AIConversation[]
  teacherOf        Classroom[]           @relation("TeacherClassrooms")
  enrolledIn       ClassroomStudent[]
  createdChallenges Challenge[]

  @@index([email])
}

// ─── Projects ───────────────────────────────────────────────────────────────

model Project {
  id          String   @id @default(cuid())
  userId      String
  title       String   @db.VarChar(100)
  description String?  @db.VarChar(500)
  // worldData stores the full serialized world: objects map + environment config
  // Schema is validated by WorldDataValidator before write; no raw user JSON passes through
  worldData   Json
  thumbnailUrl String?
  isPublic    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  version     Int      @default(1)      // optimistic locking

  // Relations
  user            User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  gallery         Gallery?
  aiConversations AIConversation[]

  @@index([userId])
  @@index([isPublic, createdAt])
}

// ─── AI Conversations ───────────────────────────────────────────────────────

model AIConversation {
  id        String   @id @default(cuid())
  projectId String
  userId    String
  // messages: array of { role, content, timestamp }
  // Full history stored; context window is trimmed server-side before AI calls
  messages  Json     @default("[]")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([projectId])
  @@index([userId, createdAt])
}

// ─── Challenges ─────────────────────────────────────────────────────────────

model Challenge {
  id          String   @id @default(cuid())
  title       String   @db.VarChar(100)
  description String   @db.Text
  theme       String   @db.VarChar(50)
  // prompts: array of suggested AI prompt strings to help students
  prompts     Json     @default("[]")
  createdById String
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())

  createdBy User @relation(fields: [createdById], references: [id])

  @@index([theme])
  @@index([isActive])
}

// ─── Gallery ────────────────────────────────────────────────────────────────

model Gallery {
  id        String   @id @default(cuid())
  projectId String   @unique
  likes     Int      @default(0)
  featured  Boolean  @default(false)
  createdAt DateTime @default(now())

  project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@index([featured, likes])
  @@index([createdAt])
}

// ─── Classrooms ─────────────────────────────────────────────────────────────

model Classroom {
  id        String   @id @default(cuid())
  teacherId String
  name      String   @db.VarChar(100)
  code      String   @unique @db.VarChar(8)   // short join code (e.g. "SPACE42")
  createdAt DateTime @default(now())

  teacher  User               @relation("TeacherClassrooms", fields: [teacherId], references: [id])
  students ClassroomStudent[]

  @@index([teacherId])
  @@index([code])
}

model ClassroomStudent {
  classroomId String
  studentId   String
  joinedAt    DateTime @default(now())

  classroom Classroom @relation(fields: [classroomId], references: [id], onDelete: Cascade)
  student   User      @relation(fields: [studentId], references: [id], onDelete: Cascade)

  @@id([classroomId, studentId])
}
```

### Schema Design Notes

- `worldData` JSON column is write-protected by server-side schema validation (`WorldDataValidator`) before any write reaches the database. No raw user-provided JSON is persisted.
- `AIConversation.messages` stores the full conversation log server-side, but context sent to OpenAI is always trimmed server-side. Message content should never include student PII.
- `Project.version` enables optimistic locking for concurrent save conflicts (two browser tabs).
- `Classroom.code` is a human-readable 8-character alphanumeric code generated at classroom creation, used by students to self-enroll without teacher email exchange.

---

## 7. Data Flow

### World State Persistence Flow

```
User places object in 3D editor
        │
        ▼
worldStore.addObject(obj)           # immediate, synchronous
        │
        ▼
projectStore.markDirty()            # isDirty = true
        │
        ▼
AutoSave timer fires (30s debounce)
        │
        ▼
projectStore.saveStatus = 'saving'
        │
        ▼
POST /api/projects/[id]
  body: { worldData: worldStore.snapshot(), version: current }
        │
        ├── Optimistic lock check (version match)
        ├── WorldDataValidator.sanitize(worldData)
        ├── ProjectRepository.update(id, sanitizedData)
        │
        ▼
projectStore.markSaved(new Date())  # isDirty = false, status = 'saved'
```

**Autosave Strategy**: Debounced 30-second timer starts when `isDirty` becomes true. Manual save always available. On tab close, `beforeunload` triggers a synchronous save attempt. Conflict resolution: if `version` mismatch (two tabs), the server returns HTTP 409 and the client prompts "Your world was updated elsewhere — reload?"

### AI Conversation Flow

```
Student types message in AICompanionPanel
        │
        ▼
aiStore.addMessage({ role: 'user', content })
aiStore.setLoading(true)
        │
        ▼
POST /api/ai/prompt
  body: {
    projectId,
    message: sanitized user input,
    worldContext: buildWorldContext(worldStore.objects, worldStore.environment)
  }
        │
        ├── [Server] Auth + rate limit check
        ├── [Server] Build system prompt with world context
        ├── [Server] Load last 6 messages from AIConversation
        ├── [Server] PII scrub on user message
        ├── [Server] OpenAI streaming call
        ├── [Server] Content safety filter on response
        ├── [Server] Persist updated conversation
        │
        ▼
Server-Sent Events stream response chunks to client
        │
        ▼
aiStore.addMessage({ role: 'assistant', content: streamedContent })
aiStore.setSuggestions(parsedSuggestions)
aiStore.setLoading(false)
```

---

## 8. Security Considerations

### Authentication and Authorization

| Concern | Mitigation |
|---------|-----------|
| Password storage | `bcrypt` with cost factor 12 via `next-auth` credentials provider |
| Session security | HTTP-only, Secure, SameSite=Lax cookies managed by NextAuth.js |
| Route authorization | `middleware.ts` protects all `/world/*`, `/teacher/*`, and `/api/*` routes; role checks in service layer |
| CSRF | NextAuth.js CSRF token on credential form submissions |
| Teacher-student isolation | All project ownership queries filter by `session.user.id`; teachers can only read students in their own classrooms |

### Input Sanitization

```typescript
// All worldData writes pass through this validator
// lib/validators/worldData.ts

export class WorldDataValidator {
  static sanitize(raw: unknown): WorldData {
    // 1. Zod schema parse (rejects unexpected fields)
    const parsed = worldDataSchema.parse(raw)
    // 2. Sanitize string metadata fields (strip HTML)
    for (const obj of Object.values(parsed.objects)) {
      if (obj.metadata?.name) {
        obj.metadata.name = DOMPurify.sanitize(String(obj.metadata.name))
      }
    }
    // 3. Enforce object count limit
    if (Object.keys(parsed.objects).length > 200) {
      throw new AppError('World exceeds maximum object limit', 400)
    }
    return parsed
  }
}
```

### Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| `POST /api/ai/prompt` | 10 requests | 1 minute (student) |
| `POST /api/ai/prompt` | 30 requests | 1 minute (teacher) |
| `POST /api/auth/signin` | 5 attempts | 15 minutes (by IP) |
| `PATCH /api/projects/[id]` | 60 requests | 1 minute |

Vercel's built-in edge rate limiting or a lightweight DB-backed counter is sufficient for this scale. Upgrade to Upstash Redis when approaching 1,000 concurrent users.

### COPPA Compliance

Worldcraft is intended for children under 13. The following controls address COPPA requirements:

1. **Account creation requires teacher or parent**: Students do not self-register. Teachers create classrooms and students are added via classroom join code. Student accounts are created by teachers or via a teacher-supervised flow.
2. **No direct contact**: The platform does not enable student-to-student messaging, comments, or any communication channel.
3. **Minimal data collection**: Student records store only: name, hashed password, email (optional — join code flow does not require email), classroom association, and project data.
4. **No behavioral tracking**: No analytics SDKs that fingerprint children. Server-side analytics only on aggregate usage (project count, AI request count — no user-level behavioral data exported to third parties).
5. **No PII in AI prompts**: The `buildWorldContext()` function serializes only object types, counts, and environment settings — never the student's name, school, or any identifying information. The system prompt explicitly instructs the AI model to redirect if a child volunteers personal information.
6. **Data deletion**: The `DELETE /api/projects/[id]` and user account deletion flows cascade-delete all associated AI conversation history.
7. **Gallery opt-in**: Projects are private by default. Students must explicitly mark `isPublic: true` to appear in the gallery. Teachers can override this for their classroom.

### Content Filtering

Two-layer approach:
- **Layer 1 (Input)**: Student prompts to the AI are character-limited (500 chars) and run through a simple keyword blocklist before reaching OpenAI.
- **Layer 2 (Output)**: Every AI response passes through OpenAI's Moderation API before being returned to the client.

---

## 9. Performance Strategy

### Asset Loading

```typescript
// Preload assets for the currently selected category
// components/editor/ObjectPicker.tsx
import { useGLTF } from '@react-three/drei'

const CATEGORY_ASSETS: Record<string, string[]> = {
  nature: ['/assets/tree_oak.glb', '/assets/tree_pine.glb', ...],
  buildings: ['/assets/house_small.glb', ...],
}

// Preload current category immediately, others lazily
export function ObjectPicker({ activeCategory }: { activeCategory: string }) {
  useEffect(() => {
    CATEGORY_ASSETS[activeCategory]?.forEach(url => useGLTF.preload(url))
  }, [activeCategory])
  // ...
}
```

GLB files are served from S3/CDN with `Cache-Control: public, max-age=31536000, immutable`. File names include a content hash. Typical GLB size target: 50–150 KB per asset after Draco compression.

### Object Pooling

For repeated object types (e.g., 20 trees), `InstancedMesh` is used instead of 20 separate mesh objects. This reduces draw calls from O(n) to O(unique types).

```typescript
// components/world/InstancedObjectGroup.tsx
import { useRef, useEffect } from 'react'
import { InstancedMesh, Object3D, Matrix4 } from 'three'
import { useGLTF } from '@react-three/drei'

const dummy = new Object3D()

export function InstancedObjectGroup({
  type, objects
}: { type: string; objects: WorldObject[] }) {
  const meshRef = useRef<InstancedMesh>(null)
  const { nodes, materials } = useGLTF(`/assets/${type}.glb`)

  useEffect(() => {
    if (!meshRef.current) return
    objects.forEach((obj, i) => {
      dummy.position.set(...obj.position)
      dummy.rotation.set(...obj.rotation)
      dummy.scale.set(...obj.scale)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [objects])

  return (
    <instancedMesh
      ref={meshRef}
      args={[nodes.Mesh.geometry, materials.Material, objects.length]}
    />
  )
}
```

### Level of Detail (LOD)

For the default school hardware profile, all assets use a single low-poly LOD. If higher-end devices are detected via `navigator.deviceMemory` (>= 8 GB) or `navigator.hardwareConcurrency` (>= 8 cores), medium-poly variants are used.

```typescript
// lib/lod.ts
export function getLODVariant(): 'low' | 'medium' {
  const memory = (navigator as any).deviceMemory ?? 4
  const cores = navigator.hardwareConcurrency ?? 4
  return memory >= 8 && cores >= 8 ? 'medium' : 'low'
}
```

### Object Count Limits

| Limit | Value | Reason |
|-------|-------|--------|
| Max objects per scene | 200 | Keeps triangle count under 150k on iGPU |
| Max objects per type (non-instanced) | 50 | Above this, always use InstancedMesh |
| Max texture size | 512×512 | Memory headroom on 4 GB devices |
| AI conversation history (context) | Last 6 messages | Token budget control |

### Optimistic UI Updates

The editor never waits for a server round-trip to show user actions. All object placements, movements, and deletions update Zustand stores immediately. The server sync happens asynchronously via autosave.

```
User action → worldStore update (0ms) → UI re-render
                     │
                     └→ [30s debounce] → POST /api/projects/[id] → saved confirmation
```

If the save fails, `projectStore.saveStatus = 'error'` triggers a visible warning banner: "Your world couldn't be saved. Check your connection."

---

## Architecture Assumptions and Risks

| Assumption | Risk if Wrong | Mitigation |
|------------|--------------|-----------|
| Vercel serverless is sufficient for compute | Cold start latency on AI route >1s during low traffic | Keep AI handler warm with a periodic ping, or use Vercel Fluid Compute |
| PostgreSQL JSON columns for worldData perform adequately | Slow queries on large worldData blobs when listing projects | Store thumbnail + metadata separately; only fetch full worldData on editor open |
| GPT-4o-mini is sufficient for child-appropriate creative suggestions | Occasional unhelpful or off-tone responses | Two-layer safety filter + easy teacher feedback report mechanism |
| School networks allow WebGL | Some restrictive school proxies or device policies block WebGL | Add a graceful fallback detection page with IT setup instructions |
| 200 objects per scene fits school hardware | Older Chromebooks or shared iPads may struggle | Configurable limit; teachers can lower per-classroom max via settings |

---

*Document maintained by engineering team. Update version and date on significant architecture changes.*
