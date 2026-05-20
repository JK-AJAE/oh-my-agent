---
name: "wordpress"
description: "Complete WordPress development workflow covering theme development, plugin creation, WooCommerce integration, performance optimization, and security hardening. Includes WordPress 7.0 features: Real-Time Collaboration, AI Connectors, Abilities API, DataViews, and PHP-only blocks."
category: "custom-skill"
trigger: "/wordpress"
---

# WordPress Development Workflow Bundle

## Overview

Comprehensive WordPress development workflow covering theme development, plugin creation, WooCommerce integration, performance optimization, and security. This bundle orchestrates skills for building production-ready WordPress sites and applications.

## WordPress 7.0 Features (Backward Compatible)

WordPress 7.0 (April 9, 2026) introduces significant features while maintaining backward compatibility:

### Real-Time Collaboration (RTC)
- Multiple users can edit simultaneously using Yjs CRDT
- HTTP polling provider (configurable via `WP_COLLABORATION_MAX_USERS`)
- Custom transport via `sync.providers` filter
- **Backward Compatibility**: Falls back to post locking when legacy meta boxes detected

### AI Connectors API
- Provider-agnostic AI interface in core (`wp_ai_client_prompt()`)
- Settings > Connectors for centralized API credential management
- Official providers: OpenAI, Anthropic Claude, Google Gemini
- **Backward Compatibility**: Works with WordPress 6.9+ via plugin

### Abilities API (Stable in 7.0)
- Standardized capability declaration system
- REST API endpoints: `/wp-json/abilities/v1/manifest`
- MCP adapter for AI agent integration
- **Backward Compatibility**: Can be used as Composer package in 6.x

### DataViews & DataForm
- Replaces WP_List_Table on Posts, Pages, Media screens
- New layouts: table, grid, list, activity
- Client-side validation (pattern, minLength, maxLength, min, max)
- **Backward Compatibility**: Plugins using old hooks still work

### PHP-Only Block Registration
- Register blocks entirely via PHP without JavaScript
- Auto-generated Inspector controls
- **Backward Compatibility**: Existing JS blocks continue to work

### Interactivity API Updates
- `watch()` replaces `effect` from @preact/signals
- State navigation changes
- **Backward Compatibility**: Old syntax deprecated but functional

### Admin Refresh
- New default color scheme
- View transitions between admin screens
- **Backward Compatibility**: CSS-level changes, no breaking changes

### Pattern Editing
- ContentOnly mode defaults for unsynced patterns
- `disableContentOnlyForUnsyncedPatterns` setting
- **Backward Compatibility**: Existing patterns work

## When to Use This Workflow

Use this workflow when:
- Building new WordPress websites
- Creating custom themes
- Developing WordPress plugins
- Setting up WooCommerce stores
- Optimizing WordPress performance
- Hardening WordPress security
- Implementing WordPress 7.0 features (RTC, AI, DataViews)

## Workflow Phases

### Phase 1: WordPress Setup

#### Skills to Invoke
- `app-builder` - Project scaffolding
- `environment-setup-guide` - Development environment

#### Actions
1. Set up local development environment (LocalWP, Docker, or Valet)
2. Install WordPress (recommend 7.0+ for new projects)
3. Configure development database
4. Set up version control
5. Configure wp-config.php for development

#### WordPress 7.0 Configuration
