---
name: "api-security-checklist"
description: "Web app API security checklist. Provides OWASP Top 10-based vulnerability checks, authentication/authorization patterns, input validation, Rate Limiting, CORS, CSRF, and SQL Injection defense as a backend-dev extension skill. Use for requests like 'API security', 'OWASP', 'auth implementation', 'SQL Injection', 'XSS defense', 'CORS configuration', 'security checklist', and other backend security design tasks. However, penetration testing or WAF configuration is outside this skill's scope."
category: "utility"
---

# API Security Checklist — Web App API Security Checklist

An OWASP-based security checklist, authentication patterns, and defense code guide that the backend-dev agent uses during API development.

## Target Agent

`backend-dev` — Applies this skill's security checklist directly to API implementation.

## OWASP API Security Top 10 Check

| Rank | Vulnerability | Check Item | Defense |
|------|-------------|-----------|---------|
| A1 | **BOLA** (Broken Object Level Authorization) | Can another user's resources be accessed? | Verify object ownership at every endpoint |
| A2 | **Broken Authentication** | Weak passwords, unlimited login attempts? | bcrypt hashing, Rate Limit, MFA |
| A3 | **Broken Object Property Level Authorization** | Are fields that should be hidden exposed? | Filter fields via response DTOs |
| A4 | **Unrestricted Resource Consumption** | Can mass requests crash the server? | Rate Limiting, enforce pagination |
| A5 | **Broken Function Level Authorization** | Can regular users call admin APIs? | RBAC middleware |
| A6 | **Server-Side Request Forgery (SSRF)** | Can external URL input access internal resources? | URL whitelist, block internal IPs |
| A7 | **Security Misconfiguration** | Debug mode exposed, default accounts? | Separate production config, inspect headers |
| A8 | **Lack of Protection from Automated Threats** | Can normal APIs be called in abnormal sequences? | State machine validation, server-side business rules |
| A9 | **Improper Asset Management** | Unused APIs, old versions exposed? | API inventory, version deprecation policy |
| A10 | **Unsafe Consumption of APIs** | Are external API responses blindly trusted? | Validate external responses, set timeouts |

## Authentication Patterns

### JWT-Based Authentication

| Item | Recommended Setting |
|------|-------------------|
| Access Token Expiry | 15-30 minutes |
| Refresh Token Expiry | 7-14 days |
| Algorithm | RS256 (asymmetric) or HS256 (symmetric) |
| Storage | httpOnly + secure + sameSite cookie |
| Payload | Minimal info only (userId, role) — no PII |
| Renewal Strategy | Silent Refresh or Rotation |

### Password Policy
- Minimum 8 characters, recommend uppercase + lowercase + numbers + special chars (show strength rather than enforce)
- bcrypt (cost factor 12+) or Argon2id
- Password history (prevent reuse of last 5)
- Temporary lock after 5 failed login attempts (15 min) or CAPTCHA

## Authorization Patterns

### RBAC (Role-Based)
