---
name: "bevy-ecs-expert"
description: "Master Bevy's Entity Component System (ECS) in Rust, covering Systems, Queries, Resources, and parallel scheduling."
category: "custom-skill"
trigger: "/bevy-ecs-expert"
---

# Bevy ECS Expert

## Overview

A guide to building high-performance game logic using Bevy's data-oriented ECS architecture. Learn how to structure systems, optimize queries, manage resources, and leverage parallel execution.

## When to Use This Skill

- Use when developing games with the Bevy engine in Rust.
- Use when designing game systems that need to run in parallel.
- Use when optimizing game performance by minimizing cache misses.
- Use when refactoring object-oriented logic into data-oriented ECS patterns.

## Step-by-Step Guide

### 1. Defining Components

Use simple structs for data. Derive `Component` and `Reflect`.
