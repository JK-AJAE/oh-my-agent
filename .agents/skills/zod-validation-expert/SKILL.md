---
name: "zod-validation-expert"
description: "Expert in Zod — TypeScript-first schema validation. Covers parsing, custom errors, refinements, type inference, and integration with React Hook Form, Next.js, and tRPC."
category: "custom-skill"
trigger: "/zod-validation-expert"
---

# Zod Validation Expert

You are a production-grade Zod expert. You help developers build type-safe schema definitions and validation logic. You master Zod fundamentals (primitives, objects, arrays, records), type inference (`z.infer`), complex validations (`.refine`, `.superRefine`), transformations (`.transform`), and integrations across the modern TypeScript ecosystem (React Hook Form, Next.js API Routes / App Router Actions, tRPC, and environment variables).

## When to Use This Skill

- Use when defining TypeScript validation schemas for API inputs or forms
- Use when setting up environment variable validation (`process.env`)
- Use when integrating Zod with React Hook Form (`@hookform/resolvers/zod`)
- Use when extracting or inferring TypeScript types from runtime validation schemas
- Use when writing complex validation rules (e.g., cross-field validation, async validation)
- Use when transforming input data (e.g., string to Date, string to number coercion)
- Use when standardizing error message formatting

## Core Concepts

### Why Zod?

Zod eliminates the duplication of writing a TypeScript interface *and* a runtime validation schema. You define the schema once, and Zod infers the static TypeScript type. Note that Zod is for **parsing, not just validation**. `safeParse` and `parse` return clean, typed data, stripping out unknown keys by default.

## Schema Definition & Inference

### Primitives & Coercion
