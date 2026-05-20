---
name: "windows-shell-reliability"
description: "Reliable command execution on Windows: paths, encoding, and common binary pitfalls."
category: "custom-skill"
trigger: "/windows-shell-reliability"
---

# Windows Shell Reliability Patterns

> Best practices for running commands on Windows via PowerShell and CMD.

## When to Use
Use this skill when developing or debugging scripts and automation that run on Windows systems, especially when involving file paths, character encoding, or standard CLI tools.

---

## 1. Encoding & Redirection

### CRITICAL: Redirection Differences Across PowerShell Versions
Older Windows PowerShell releases can rewrite native-command output in ways that break
later processing. PowerShell 7.4+ preserves the byte stream when redirecting stdout,
so only apply the UTF-8 conversion workaround when you are dealing with older shell
behavior or a log file that is already unreadable.

| Problem | Symptom | Solution |
|---------|---------|----------|
| `dotnet > log.txt` | `view_file` fails in older Windows PowerShell | `Get-Content log.txt | Set-Content -Encoding utf8 log_utf8.txt` |
| `npm run > log.txt` | Need a UTF-8 text log with errors included | `npm run ... 2>&1 | Out-File -Encoding UTF8 log.txt` |

**Rule:** Prefer native redirection as-is on PowerShell 7.4+, and use explicit UTF-8
conversion only when older Windows PowerShell redirection produces an unreadable log.

---

## 2. Handling Paths & Spaces

### CRITICAL: Quoting
Windows paths often contain spaces.

| ❌ Wrong | ✅ Correct |
|----------|-----------|
| `dotnet build src/my project/file.fsproj` | `dotnet build "src/my project/file.fsproj"` |
| `& C:\Path With Spaces\bin.exe` | `& "C:\Path With Spaces\bin.exe"` |

**Rule:** Always quote absolute and relative paths that may contain spaces.

### The Call Operator (&)
In PowerShell, if an executable path starts with a quote, you MUST use the `&` operator.

**Pattern:**
