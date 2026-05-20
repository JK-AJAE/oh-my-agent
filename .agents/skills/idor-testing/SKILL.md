---
name: "idor-testing"
description: "Provide systematic methodologies for identifying and exploiting Insecure Direct Object Reference (IDOR) vulnerabilities in web applications."
category: "custom-skill"
trigger: "/idor-testing"
---

> AUTHORIZED USE ONLY: Use this skill only for authorized security assessments, defensive validation, or controlled educational environments.

# IDOR Vulnerability Testing

## Purpose

Provide systematic methodologies for identifying and exploiting Insecure Direct Object Reference (IDOR) vulnerabilities in web applications. This skill covers both database object references and static file references, detection techniques using parameter manipulation and enumeration, exploitation via Burp Suite, and remediation strategies for securing applications against unauthorized access.

## Inputs / Prerequisites

- **Target Web Application**: URL of application with user-specific resources
- **Multiple User Accounts**: At least two test accounts to verify cross-user access
- **Burp Suite or Proxy Tool**: Intercepting proxy for request manipulation
- **Authorization**: Written permission for security testing
- **Understanding of Application Flow**: Knowledge of how objects are referenced (IDs, filenames)

## Outputs / Deliverables

- **IDOR Vulnerability Report**: Documentation of discovered access control bypasses
- **Proof of Concept**: Evidence of unauthorized data access across user contexts
- **Affected Endpoints**: List of vulnerable API endpoints and parameters
- **Impact Assessment**: Classification of data exposure severity
- **Remediation Recommendations**: Specific fixes for identified vulnerabilities

## Core Workflow

### 1. Understand IDOR Vulnerability Types

#### Direct Reference to Database Objects
Occurs when applications reference database records via user-controllable parameters:
