---
name: "wireshark-analysis"
description: "Execute comprehensive network traffic analysis using Wireshark to capture, filter, and examine network packets for security investigations, performance optimization, and troubleshooting."
category: "custom-skill"
trigger: "/wireshark-analysis"
---

# Wireshark Network Traffic Analysis

## Purpose

Execute comprehensive network traffic analysis using Wireshark to capture, filter, and examine network packets for security investigations, performance optimization, and troubleshooting. This skill enables systematic analysis of network protocols, detection of anomalies, and reconstruction of network conversations from PCAP files.

## Inputs / Prerequisites

### Required Tools
- Wireshark installed (Windows, macOS, or Linux)
- Network interface with capture permissions
- PCAP/PCAPNG files for offline analysis
- Administrator/root privileges for live capture

### Technical Requirements
- Understanding of network protocols (TCP, UDP, HTTP, DNS)
- Familiarity with IP addressing and ports
- Knowledge of OSI model layers
- Understanding of common attack patterns

### Use Cases
- Network troubleshooting and connectivity issues
- Security incident investigation
- Malware traffic analysis
- Performance monitoring and optimization
- Protocol learning and education

## Outputs / Deliverables

### Primary Outputs
- Filtered packet captures for specific traffic
- Reconstructed communication streams
- Traffic statistics and visualizations
- Evidence documentation for incidents

## Core Workflow

### Phase 1: Capturing Network Traffic

#### Start Live Capture
Begin capturing packets on network interface:
