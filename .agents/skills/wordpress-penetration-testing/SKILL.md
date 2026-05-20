---
name: "wordpress-penetration-testing"
description: "Assess WordPress installations for common vulnerabilities and WordPress 7.0 attack surfaces."
category: "custom-skill"
trigger: "/wordpress-penetration-testing"
---

> AUTHORIZED USE ONLY: Use this skill only for authorized security assessments, defensive validation, or controlled educational environments.

# WordPress Penetration Testing

## WordPress 7.0 Security Considerations

WordPress 7.0 (April 2026) introduces new features that create additional attack surfaces:

### Real-Time Collaboration (RTC)
- Yjs CRDT sync provider endpoints
- `wp_sync_storage` post meta
- Collaboration session hijacking
- Data sync interception

### AI Connector API
- `/wp-json/ai/v1/` endpoints
- Credential storage in Settings > Connectors
- Prompt injection vulnerabilities
- AI response manipulation

### Abilities API
- `/wp-json/abilities/v1/` manifest exposure
- Ability invocation endpoints
- Permission boundary bypass
- MCP adapter integration points

### DataViews
- New admin interface endpoints
- Client-side validation bypass
- Filter/sort parameter injection

### PHP Requirements
- PHP 7.2/7.3 no longer supported (upgrade attacks)
- PHP 8.3+ recommended (new attack vectors)

## Purpose

Conduct comprehensive security assessments of WordPress installations including enumeration of users, themes, and plugins, vulnerability scanning, credential attacks, and exploitation techniques. WordPress powers approximately 35% of websites, making it a critical target for security testing.

## Prerequisites

### Required Tools
- WPScan (pre-installed in Kali Linux)
- Metasploit Framework
- Burp Suite or OWASP ZAP
- Nmap for initial discovery
- cURL or wget

### Required Knowledge
- WordPress architecture and structure
- Web application testing fundamentals
- HTTP protocol understanding
- Common web vulnerabilities (OWASP Top 10)

## Outputs and Deliverables

1. **WordPress Enumeration Report** - Version, themes, plugins, users
2. **Vulnerability Assessment** - Identified CVEs and misconfigurations
3. **Credential Assessment** - Weak password findings
4. **Exploitation Proof** - Shell access documentation

## Core Workflow

### Phase 1: WordPress Discovery

Identify WordPress installations:
