---
name: "godot-4-migration"
description: "Specialized guide for migrating Godot 3.x projects to Godot 4 (GDScript 2.0), covering syntax changes, Tweens, and exports."
category: "custom-skill"
trigger: "/godot-4-migration"
---

# Godot 4 Migration Guide

## Overview

A critical guide for developers transitioning from Godot 3.x to Godot 4. This skill focuses on the major syntax changes in GDScript 2.0, the new `Tween` system, and `export` annotation updates.

## When to Use This Skill

- Use when porting a Godot 3 project to Godot 4.
- Use when encountering syntax errors after upgrading.
- Use when replacing deprecated nodes (like `Tween` node vs `create_tween`).
- Use when updating `export` variables to `@export` annotations.

## Key Changes

### 1. Annotations (`@`)

Godot 4 uses `@` for keywords that modify behavior.
- `export var x` -> `@export var x`
- `onready var y` -> `@onready var y`
- `tool` -> `@tool` (at top of file)

### 2. Setters and Getters

Properties now define setters/getters inline.

**Godot 3:**
