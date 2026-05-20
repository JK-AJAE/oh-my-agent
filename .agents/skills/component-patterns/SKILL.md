---
name: "component-patterns"
description: "React/Next.js component design pattern library. Provides Compound/Render Props/HOC/Custom Hooks patterns, state management strategies (Zustand/React Query/Context), and folder structure conventions as a frontend-dev extension skill. Use for requests like 'component patterns', 'React patterns', 'state management', 'folder structure', 'Custom Hook', 'component separation', and other frontend architecture design tasks. However, actual code implementation or backend logic is outside this skill's scope."
category: "utility"
---

# Component Patterns — React/Next.js Component Design Patterns

A reference for component patterns, state management strategies, and project structure that the frontend-dev agent uses during frontend development.

## Target Agent

`frontend-dev` — Applies this skill's patterns directly to component design and state management.

## Component Design Patterns

### 1. Compound Components
A pattern where parent and child share implicit state.

**Suited for**: Tab, Accordion, Dropdown, Select, and other composite UI
**Structure**: `<Select>` + `<Select.Trigger>` + `<Select.Option>`
**Key Concept**: State sharing via Context, flexible composition through children

### 2. Render Props / Children as Function
Delegates rendering logic externally.

**Suited for**: Data fetching wrappers, mouse/scroll tracking
**Structure**: `<DataLoader render={(data) => <UI data={data} />} />`
**Note**: Prefer Hook pattern when it can replace this

### 3. Custom Hooks (Extraction Pattern)
Extracts state logic into reusable Hooks.

**Suited for**: Form management, API calls, localStorage, debounce
**Naming**: `use` prefix required — `useForm`, `useDebounce`, `useAuth`

### 4. Container/Presentational Separation
Separates data logic (Container) from UI presentation (Presentational).

**Suited for**: Large-scale apps, when testability is needed
**Container**: Data fetch, state management, event handlers
**Presentational**: Renders only from props, functionally pure

### 5. Higher-Order Component (HOC)
Wraps a component to add functionality.

**Suited for**: Auth guards, layout wrappers, error boundaries
**Naming**: `with` prefix — `withAuth`, `withLayout`
**Note**: Prefer Hook/Context when they can replace this

### 6. Headless Component
Provides behavior/state without UI.

**Suited for**: Sharing logic independent of design system
**Examples**: headless `useCombobox`, `useDialog`, `useTable`

## State Management Strategy Selection Guide

| State Type | Recommended Tool | Rationale |
|-----------|-----------------|-----------|
| **UI Local State** | useState, useReducer | Component-internal |
| **Server State** | React Query (TanStack Query) | Caching, refetch, optimistic updates |
| **Global Client State** | Zustand | Concise, minimal boilerplate |
| **Complex Global State** | Zustand + Immer | Immutability convenience |
| **URL State** | nuqs / useSearchParams | Filters, pagination |
| **Form State** | React Hook Form + Zod | Integrated validation |
| **Theme/Language** | Context + Provider | Low change frequency |

### State Placement Decision Flow
