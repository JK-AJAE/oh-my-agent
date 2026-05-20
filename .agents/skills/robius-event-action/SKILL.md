---
name: "robius-event-action"
description: "|"
category: "custom-skill"
trigger: "/robius-event-action"
---

# Robius Event and Action Patterns Skill

Best practices for event handling and action patterns in Makepad applications based on Robrix and Moly codebases.

**Source codebases:**
- **Robrix**: Matrix chat client - MessageAction, RoomsListAction, AppStateAction
- **Moly**: AI chat application - StoreAction, ChatAction, NavigationAction, Timer patterns

## When to Use
Use this skill when:
- Implementing custom actions in Makepad
- Handling events in widgets
- Centralizing action handling in App
- Widget-to-widget communication
- Keywords: makepad action, makepad event, widget action, handle_actions, cx.widget_action

## Custom Action Pattern

### Defining Domain-Specific Actions
