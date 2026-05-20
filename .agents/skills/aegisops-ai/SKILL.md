---
name: "aegisops-ai"
description: "Autonomous DevSecOps & FinOps Guardrails. Orchestrates Gemini 3 Flash to audit Linux Kernel patches, Terraform cost drifts, and K8s compliance."
category: "custom-skill"
trigger: "/aegisops-ai"
---

# /aegisops-ai — Autonomous Governance Orchestrator

AegisOps-AI is a professional-grade "Living Pipeline" 
that integrates advanced AI reasoning directly into 
the SDLC. It acts as an intelligent gatekeeper for 
systems-level security, cloud infrastructure costs, 
and Kubernetes compliance.

## Goal

To automate high-stakes security and financial audits by:
1. Identifying logic-based vulnerabilities (UAF, Stale 
State) in Linux Kernel patches.
2. Detecting massive "Silent Disaster" cost drifts in 
Terraform plans.
3. Translating natural language security intent into 
hardened K8s manifests.

## When to Use
- **Kernel Patch Review:** Auditing raw C-based Git diffs for memory safety.
- **Pre-Apply IaC Audit:** Analyzing `terraform plan` outputs to prevent bill spikes.
- **Cluster Hardening:** Generating "Least Privilege" securityContexts for deployments.
- **CI/CD Quality Gating:** Blocking non-compliant merges via GitHub Actions.

## When Not to Use

- **Web App Logic:** Do not use for standard web vulnerabilities (XSS, SQLi); use dedicated SAST scanners.
- **Non-C Memory Analysis:** The patch analyzer is optimized for C-logic; avoid using it for high-level languages like Python or JS.
- **Direct Resource Mutation:** This is an *auditor*, not a deployment tool. It does not execute `terraform apply` or `kubectl apply`.
- **Post-Mortem Analysis:** For analyzing *why* a previous AI session failed, use `/analyze-project` instead.

---
## 🤖 Generative AI Integration

AegisOps-AI leverages the **Google GenAI SDK** to implement a "Reasoning Path" for autonomous security and financial audits:

* **Neural Patch Analysis:** Performs semantic code reviews of Linux Kernel patches, moving beyond simple pattern matching to understand complex memory state logic.
* **Intelligent Cost Synthesis:** Processes raw Terraform plan diffs through a financial reasoning model to detect high-risk resource escalations and "silent" fiscal drifts.
* **Natural Language Policy Mapping:** Translates human security intent into syntactically correct, hardened Kubernetes `securityContext` configurations.

## 🧭 Core Modules

### 1. 🐧 Kernel Patch Reviewer (`patch_analyzer.py`)

* **Problem:** Manual review of Linux Kernel memory safety is time-consuming and prone to human error.
* **Solution:** Gemini 3 performs a "Deep Reasoning" audit on raw Git diffs to detect critical memory corruption vulnerabilities (UAF, Stale State) in seconds.
* **Key Output:** `analysis_results.json`

### 2. 💰 FinOps & Cloud Auditor (`cost_auditor.py`)

* **Problem:** Infrastructure-as-Code (IaC) changes can lead to accidental "Silent Disasters" and massive cloud bill spikes.
* **Solution:** Analyzes `terraform plan` output to identify cost anomalies—such as accidental upgrades from `t3.micro` to high-performance GPU instances.
* **Key Output:** `infrastructure_audit_report.json`

### 3. ☸️ K8s Policy Hardener (`k8s_policy_generator.py`)

* **Problem:** Implementing "Least Privilege" security contexts in Kubernetes is complex and often neglected.
* **Solution:** Translates natural language security requirements into production-ready, hardened YAML manifests (Read-only root FS, Non-root enforcement, etc.).
* **Key Output:** `hardened_deployment.yaml`

## 🛠️ Setup & Environment

### 1. Clone the Repository
