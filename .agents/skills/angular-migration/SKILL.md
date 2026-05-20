---
name: "angular-migration"
description: "Master AngularJS to Angular migration, including hybrid apps, component conversion, dependency injection changes, and routing migration."
category: "custom-skill"
trigger: "/angular-migration"
---

# Angular Migration

Master AngularJS to Angular migration, including hybrid apps, component conversion, dependency injection changes, and routing migration.

## Use this skill when

- Migrating AngularJS (1.x) applications to Angular (2+)
- Running hybrid AngularJS/Angular applications
- Converting directives to components
- Modernizing dependency injection
- Migrating routing systems
- Updating to latest Angular versions
- Implementing Angular best practices

## Do not use this skill when

- You are not migrating from AngularJS to Angular
- The app is already on a modern Angular version
- You need only a small UI fix without framework changes

## Instructions

1. Assess the AngularJS codebase, dependencies, and migration risks.
2. Choose a migration strategy (hybrid vs rewrite) and define milestones.
3. Set up ngUpgrade and migrate modules, components, and routing.
4. Validate with tests and plan a safe cutover.

## Safety

- Avoid big-bang cutovers without rollback and staging validation.
- Keep hybrid compatibility testing during incremental migration.

## Migration Strategies

### 1. Big Bang (Complete Rewrite)
- Rewrite entire app in Angular
- Parallel development
- Switch over at once
- **Best for:** Small apps, green field projects

### 2. Incremental (Hybrid Approach)
- Run AngularJS and Angular side-by-side
- Migrate feature by feature
- ngUpgrade for interop
- **Best for:** Large apps, continuous delivery

### 3. Vertical Slice
- Migrate one feature completely
- New features in Angular, maintain old in AngularJS
- Gradually replace
- **Best for:** Medium apps, distinct features

## Hybrid App Setup
