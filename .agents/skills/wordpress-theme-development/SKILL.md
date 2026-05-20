---
name: "wordpress-theme-development"
description: "WordPress theme development workflow covering theme architecture, template hierarchy, custom post types, block editor support, responsive design, and WordPress 7.0 features: DataViews, Pattern Editing, Navigation Overlays, and admin refresh."
category: "custom-skill"
trigger: "/wordpress-theme-development"
---

# WordPress Theme Development Workflow

## Overview

Specialized workflow for creating custom WordPress themes from scratch, including modern block editor (Gutenberg) support, template hierarchy, responsive design, and WordPress 7.0 enhancements.

## WordPress 7.0 Theme Features

1. **Admin Refresh**
   - New default color scheme
   - View transitions between admin screens
   - Modern typography and spacing

2. **Pattern Editing**
   - ContentOnly mode defaults for unsynced patterns
   - `disableContentOnlyForUnsyncedPatterns` setting
   - Per-block instance custom CSS

3. **Navigation Overlays**
   - Customizable navigation overlays
   - Improved mobile navigation

4. **New Blocks**
   - Icon block
   - Breadcrumbs block with filters
   - Responsive grid block

5. **Theme.json Enhancements**
   - Pseudo-element support
   - Block-defined feature selectors honored
   - Enhanced custom CSS

6. **Iframed Editor**
   - Block API v3+ enables iframed post editor
   - Full enforcement in 7.1, opt-in in 7.0

## When to Use This Workflow

Use this workflow when:
- Creating custom WordPress themes
- Converting designs to WordPress themes
- Adding block editor support
- Implementing custom post types
- Building child themes
- Implementing WordPress 7.0 design features

## Workflow Phases

### Phase 1: Theme Setup

#### Skills to Invoke
- `app-builder` - Project scaffolding
- `frontend-developer` - Frontend development

#### Actions
1. Create theme directory structure
2. Set up style.css with theme header
3. Create functions.php
4. Configure theme support
5. Set up enqueue scripts/styles

#### WordPress 7.0 Theme Header
