---
name: "sast-configuration"
description: "Static Application Security Testing (SAST) tool setup, configuration, and custom rule creation for comprehensive security scanning across multiple programming languages."
category: "custom-skill"
trigger: "/sast-configuration"
---

# SAST Configuration

Static Application Security Testing (SAST) tool setup, configuration, and custom rule creation for comprehensive security scanning across multiple programming languages.

## Use this skill when

- Set up SAST scanning in CI/CD pipelines
- Create custom security rules for your codebase
- Configure quality gates and compliance policies
- Optimize scan performance and reduce false positives
- Integrate multiple SAST tools for defense-in-depth

## Do not use this skill when

- You only need DAST or manual penetration testing guidance
- You cannot access source code or CI/CD pipelines
- You need organizational policy decisions rather than tooling setup

## Instructions

1. Identify languages, repos, and compliance requirements.
2. Choose tools and define a baseline policy.
3. Integrate scans into CI/CD with gating thresholds.
4. Tune rules and suppressions based on false positives.
5. Track remediation and verify fixes.

## Safety

- Avoid scanning sensitive repos with third-party services without approval.
- Prevent leaks of secrets in scan artifacts and logs.

## Overview

This skill provides comprehensive guidance for setting up and configuring SAST tools including Semgrep, SonarQube, and CodeQL.

## Core Capabilities

### 1. Semgrep Configuration
- Custom rule creation with pattern matching
- Language-specific security rules (Python, JavaScript, Go, Java, etc.)
- CI/CD integration (GitHub Actions, GitLab CI, Jenkins)
- False positive tuning and rule optimization
- Organizational policy enforcement

### 2. SonarQube Setup
- Quality gate configuration
- Security hotspot analysis
- Code coverage and technical debt tracking
- Custom quality profiles for languages
- Enterprise integration with LDAP/SAML

### 3. CodeQL Analysis
- GitHub Advanced Security integration
- Custom query development
- Vulnerability variant analysis
- Security research workflows
- SARIF result processing

## Quick Start

### Initial Assessment
1. Identify primary programming languages in your codebase
2. Determine compliance requirements (PCI-DSS, SOC 2, etc.)
3. Choose SAST tool based on language support and integration needs
4. Review baseline scan to understand current security posture

### Basic Setup
