---
name: "xss-html-injection"
description: "Execute comprehensive client-side injection vulnerability assessments on web applications to identify XSS and HTML injection flaws, demonstrate exploitation techniques for session hijacking and credential theft, and validate input sanitization and output encoding mechanisms."
category: "custom-skill"
trigger: "/xss-html-injection"
---

> AUTHORIZED USE ONLY: Use this skill only for authorized security assessments, defensive validation, or controlled educational environments.

# Cross-Site Scripting and HTML Injection Testing

## Purpose

Execute comprehensive client-side injection vulnerability assessments on web applications to identify XSS and HTML injection flaws, demonstrate exploitation techniques for session hijacking and credential theft, and validate input sanitization and output encoding mechanisms. This skill enables systematic detection and exploitation across stored, reflected, and DOM-based attack vectors.

## Inputs / Prerequisites

### Required Access
- Target web application URL with user input fields
- Burp Suite or browser developer tools for request analysis
- Access to create test accounts for stored XSS testing
- Browser with JavaScript console enabled

### Technical Requirements
- Understanding of JavaScript execution in browser context
- Knowledge of HTML DOM structure and manipulation
- Familiarity with HTTP request/response headers
- Understanding of cookie attributes and session management

### Legal Prerequisites
- Written authorization for security testing
- Defined scope including target domains and features
- Agreement on handling of any captured session data
- Incident response procedures established

## Outputs / Deliverables

- XSS/HTMLi vulnerability report with severity classifications
- Proof-of-concept payloads demonstrating impact
- Session hijacking demonstrations (controlled environment)
- Remediation recommendations with CSP configurations

## Core Workflow

### Phase 1: Vulnerability Detection

#### Identify Input Reflection Points
Locate areas where user input is reflected in responses:
