---
name: "claude-in-chrome-troubleshooting"
description: "Diagnose and fix Claude in Chrome MCP extension connectivity issues. Use when mcp__claude-in-chrome__* tools fail, return \"Browser extension is not connected\", or behave erratically."
category: "custom-skill"
trigger: "/claude-in-chrome-troubleshooting"
---

# Claude in Chrome MCP Troubleshooting

Use this skill when Claude in Chrome MCP tools fail to connect or work unreliably.

## When to Use
- `mcp__claude-in-chrome__*` tools fail with "Browser extension is not connected"
- Browser automation works erratically or times out
- After updating Claude Code or Claude.app
- When switching between Claude Code CLI and Claude.app (Cowork)
- Native host process is running but MCP tools still fail

## When NOT to Use

- **Linux or Windows users** - This skill covers macOS-specific paths and tools (`~/Library/Application Support/`, `osascript`)
- General Chrome automation issues unrelated to the Claude extension
- Claude.app desktop issues (not browser-related)
- Network connectivity problems
- Chrome extension installation issues (use Chrome Web Store support)

## The Claude.app vs Claude Code Conflict (Primary Issue)

**Background:** When Claude.app added Cowork support (browser automation from the desktop app), it introduced a competing native messaging host that conflicts with Claude Code CLI.

### Two Native Hosts, Two Socket Formats

| Component | Native Host Binary | Socket Location |
|-----------|-------------------|-----------------|
| **Claude.app (Cowork)** | `/Applications/Claude.app/Contents/Helpers/chrome-native-host` | `/tmp/claude-mcp-browser-bridge-$USER/<PID>.sock` |
| **Claude Code CLI** | `~/.local/share/claude/versions/<version> --chrome-native-host` | `$TMPDIR/claude-mcp-browser-bridge-$USER` (single file) |

### Why They Conflict

1. Both register native messaging configs in Chrome:
   - `com.anthropic.claude_browser_extension.json` → Claude.app helper
   - `com.anthropic.claude_code_browser_extension.json` → Claude Code wrapper

2. Chrome extension requests a native host by name
3. If the wrong config is active, the wrong binary runs
4. The wrong binary creates sockets in a format/location the MCP client doesn't expect
5. Result: "Browser extension is not connected" even though everything appears to be running

### The Fix: Disable Claude.app's Native Host

**If you use Claude Code CLI for browser automation (not Cowork):**
