---
name: "privilege-escalation-methods"
description: "Provide comprehensive techniques for escalating privileges from a low-privileged user to root/administrator access on compromised Linux and Windows systems. Essential for penetration testing post-exploitation phase and red team operations."
category: "custom-skill"
trigger: "/privilege-escalation-methods"
---

# Privilege Escalation Methods

## Purpose

Provide comprehensive techniques for escalating privileges from a low-privileged user to root/administrator access on compromised Linux and Windows systems. Essential for penetration testing post-exploitation phase and red team operations.

## Inputs/Prerequisites

- Initial low-privilege shell access on target system
- Kali Linux or penetration testing distribution
- Tools: Mimikatz, PowerView, PowerUpSQL, Responder, Impacket, Rubeus
- Understanding of Windows/Linux privilege models
- For AD attacks: Domain user credentials and network access to DC

## Outputs/Deliverables

- Root or Administrator shell access
- Extracted credentials and hashes
- Persistent access mechanisms
- Domain compromise (for AD environments)

---

## Core Techniques

### Linux Privilege Escalation

#### 1. Abusing Sudo Binaries

Exploit misconfigured sudo permissions using GTFOBins techniques:
