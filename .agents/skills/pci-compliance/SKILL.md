---
name: "pci-compliance"
description: "Master PCI DSS (Payment Card Industry Data Security Standard) compliance for secure payment processing and handling of cardholder data."
category: "custom-skill"
trigger: "/pci-compliance"
---

# PCI Compliance

Master PCI DSS (Payment Card Industry Data Security Standard) compliance for secure payment processing and handling of cardholder data.

## Do not use this skill when

- The task is unrelated to pci compliance
- You need a different domain or tool outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.
- If detailed examples are required, open `resources/implementation-playbook.md`.

## Use this skill when

- Building payment processing systems
- Handling credit card information
- Implementing secure payment flows
- Conducting PCI compliance audits
- Reducing PCI compliance scope
- Implementing tokenization and encryption
- Preparing for PCI DSS assessments

## PCI DSS Requirements (12 Core Requirements)

### Build and Maintain Secure Network
1. Install and maintain firewall configuration
2. Don't use vendor-supplied defaults for passwords

### Protect Cardholder Data
3. Protect stored cardholder data
4. Encrypt transmission of cardholder data across public networks

### Maintain Vulnerability Management
5. Protect systems against malware
6. Develop and maintain secure systems and applications

### Implement Strong Access Control
7. Restrict access to cardholder data by business need-to-know
8. Identify and authenticate access to system components
9. Restrict physical access to cardholder data

### Monitor and Test Networks
10. Track and monitor all access to network resources and cardholder data
11. Regularly test security systems and processes

### Maintain Information Security Policy
12. Maintain a policy that addresses information security

## Compliance Levels

**Level 1**: > 6 million transactions/year (annual ROC required)
**Level 2**: 1-6 million transactions/year (annual SAQ)
**Level 3**: 20,000-1 million e-commerce transactions/year
**Level 4**: < 20,000 e-commerce or < 1 million total transactions

## Data Minimization (Never Store)
