---
name: "senior-frontend"
description: "Frontend development skill for React, Next.js, TypeScript, and Tailwind CSS applications. Use when building React components, optimizing Next.js performance, analyzing bundle sizes, scaffolding frontend projects, implementing accessibility, or reviewing frontend code quality."
category: "custom-skill"
trigger: "/senior-frontend"
---

# Senior Frontend

Frontend development patterns, performance optimization, and automation tools for React/Next.js applications.

## When to Use
- Use when scaffolding a new React or Next.js project with TypeScript and Tailwind CSS.
- Use when generating new components or custom hooks.
- Use when analyzing and optimizing bundle sizes for frontend applications.
- Use to implement or review advanced React patterns like Compound Components or Render Props.
- Use to ensure accessibility compliance and implement robust testing strategies.

## Table of Contents

- [Project Scaffolding](#project-scaffolding)
- [Component Generation](#component-generation)
- [Bundle Analysis](#bundle-analysis)
- [React Patterns](#react-patterns)
- [Next.js Optimization](#nextjs-optimization)
- [Accessibility and Testing](#accessibility-and-testing)

---

## Project Scaffolding

Generate a new Next.js or React project with TypeScript, Tailwind CSS, and best practice configurations.

### Workflow: Create New Frontend Project

1. Run the scaffolder with your project name and template:

   ```bash
   python scripts/frontend_scaffolder.py my-app --template nextjs
   ```

2. Add optional features (auth, api, forms, testing, storybook):

   ```bash
   python scripts/frontend_scaffolder.py dashboard --template nextjs --features auth,api
   ```

3. Navigate to the project and install dependencies:

   ```bash
   cd my-app && npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Scaffolder Options

| Option               | Description                                       |
| -------------------- | ------------------------------------------------- |
| `--template nextjs`  | Next.js 14+ with App Router and Server Components |
| `--template react`   | React + Vite with TypeScript                      |
| `--features auth`    | Add NextAuth.js authentication                    |
| `--features api`     | Add React Query + API client                      |
| `--features forms`   | Add React Hook Form + Zod validation              |
| `--features testing` | Add Vitest + Testing Library                      |
| `--dry-run`          | Preview files without creating them               |

### Generated Structure (Next.js)
