---
name: "threat-modeling"
description: "STRIDE, DREAD, Attack Tree etc. threat model methodologyand threat identification·evaluation· strategy count guide. 'STRIDE', 'DREAD', 'threat model', 'threat modeling', 'attack tree', 'attack surface', 'threat identification', 'security ' etc. system threat analysis  this  for. security-consultantand pentest-reporterof threat analysis  -ize. , actual penetration test executionthis CVE  this of scope ."
category: "utility"
---

# Threat Modeling — threat model methodology guide

systemof security threat systematicas identificationand evaluationlower framework.

## STRIDE threat classification

| threat | people | security  |  pattern |
|------|------|----------|----------|
| **S**poofing |   | authentication | MFA, authentication |
| **T**ampering | data  | integrity | HMAC,  people,  |
| **R**epudiation |   |   | audit log,  |
| **I**nformation Disclosure | information  |  | encryption,   |
| **D**enial of Service | service rejection | availability | Rate Limiting, auto-scaling |
| **E**levation of Privilege | permission upper | authorization | RBAC, minimum permission principle |

## STRIDE -basedfor procedure

### Step 1: system minutes (DFD )
