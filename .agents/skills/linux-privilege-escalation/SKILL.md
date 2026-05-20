---
name: "linux-privilege-escalation"
description: "Execute systematic privilege escalation assessments on Linux systems to identify and exploit misconfigurations, vulnerable services, and security weaknesses that allow elevation from low-privilege user access to root-level control."
category: "custom-skill"
trigger: "/linux-privilege-escalation"
---

> AUTHORIZED USE ONLY: Use this skill only for authorized security assessments, defensive validation, or controlled educational environments.

<!-- security-allowlist: curl-pipe-bash -->

# Linux Privilege Escalation

## Purpose

Execute systematic privilege escalation assessments on Linux systems to identify and exploit misconfigurations, vulnerable services, and security weaknesses that allow elevation from low-privilege user access to root-level control. This skill enables comprehensive enumeration and exploitation of kernel vulnerabilities, sudo misconfigurations, SUID binaries, cron jobs, capabilities, PATH hijacking, and NFS weaknesses.

## Inputs / Prerequisites

### Required Access
- Low-privilege shell access to target Linux system
- Ability to execute commands (interactive or semi-interactive shell)
- Network access for reverse shell connections (if needed)
- Attacker machine for payload hosting and receiving shells

### Technical Requirements
- Understanding of Linux filesystem permissions and ownership
- Familiarity with common Linux utilities and scripting
- Knowledge of kernel versions and associated vulnerabilities
- Basic understanding of compilation (gcc) for custom exploits

### Recommended Tools
- LinPEAS, LinEnum, or Linux Smart Enumeration scripts
- Linux Exploit Suggester (LES)
- GTFOBins reference for binary exploitation
- John the Ripper or Hashcat for password cracking
- Netcat or similar for reverse shells

## Outputs / Deliverables

### Primary Outputs
- Root shell access on target system
- Privilege escalation path documentation
- System enumeration findings report
- Recommendations for remediation

### Evidence Artifacts
- Screenshots of successful privilege escalation
- Command output logs demonstrating root access
- Identified vulnerability details
- Exploited configuration files

## Core Workflow

### Phase 1: System Enumeration

#### Basic System Information
Gather fundamental system details for vulnerability research:
