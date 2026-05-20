---
name: "temporal-golang-pro"
description: "Use when building durable distributed systems with Temporal Go SDK. Covers deterministic workflow rules, mTLS worker configs, and advanced patterns."
category: "custom-skill"
trigger: "/temporal-golang-pro"
---

# Temporal Go SDK (temporal-golang-pro)

## Overview

Expert-level guide for building resilient, scalable, and deterministic distributed systems using the Temporal Go SDK. This skill transforms vague orchestration requirements into production-grade Go implementations, focusing on durable execution, strict determinism, and enterprise-scale worker configuration.

## When to Use This Skill

- **Designing Distributed Systems**: When building microservices that require durable state and reliable orchestration.
- **Implementing Complex Workflows**: Using the Go SDK to handle long-running processes (days/months) or complex Saga patterns.
- **Optimizing Performance**: When workers need fine-tuned concurrency, mTLS security, or custom interceptors.
- **Ensuring Reliability**: Implementing idempotent activities, graceful error handling, and sophisticated retry policies.
- **Maintenance & Evolution**: Versioning running workflows or performing zero-downtime worker updates.

## Do not use this skill when

- Using Temporal with other SDKs (Python, Java, TypeScript) - refer to their specific `-pro` skills.
- The task is a simple request/response without durability or coordination needs.
- High-level design without implementation (use `workflow-orchestration-patterns`).

## Step-by-Step Guide

1.  **Gather Context**: Proactively ask for:
    - Target **Temporal Cluster** (Cloud vs. Self-hosted) and **Namespace**.
    - **Task Queue** names and expected throughput.
    - **Security requirements** (mTLS paths, authentication).
    - **Failure modes** and desired retry/timeout policies.
2.  **Verify Determinism**: Before suggesting workflow code, verify against these **5 Rules**:
    - No native Go concurrency (goroutines).
    - No native time (`time.Now`, `time.Sleep`).
    - No non-deterministic map iteration (must sort keys).
    - No direct external I/O or network calls.
    - No non-deterministic random numbers.
3.  **Implement Incrementally**: Start with shared Protobuf/Data classes, then Activities, then Workflows, and finally Workers.
4.  **Leverage Resources**: If the implementation requires advanced patterns (Sagas, Interceptors, Replay Testing), explicitly refer to the implementation playbook and testing strategies.

## Capabilities

### Go SDK Implementation

- **Worker Management**: Deep knowledge of `worker.Options`, including `MaxConcurrentActivityTaskPollers`, `WorkerStopTimeout`, and `StickyScheduleToStartTimeout`.
- **Interceptors**: Implementing Client, Worker, and Workflow interceptors for cross-cutting concerns (logging, tracing, auth).
- **Custom Data Converters**: Integrating Protobuf, encrypted payloads, or custom JSON marshaling.

### Advanced Workflow Patterns

- **Durable Concurrency**: Using `workflow.Go`, `workflow.Channel`, and `workflow.Selector` instead of native primitives.
- **Versioning**: Implementing safe code evolution using `workflow.GetVersion` and `workflow.GetReplaySafeLogger`.
- **Large-scale Processing**: Pattern for `ContinueAsNew` to manage history size limits (defaults: 50MB or 50K events).
- **Child Workflows**: Managing lifecycle, cancellation, and parent-child signal propagation.

### Testing & Observability

- **Testsuite Mastery**: Using `WorkflowTestSuite` for unit and functional testing with deterministic time control.
- **Mocking**: Sophisticated activity and child workflow mocking strategies.
- **Replay Testing**: Validating code changes against production event histories.
- **Metrics**: Configuring Prometheus/OpenTelemetry exporters for worker performance tracking.

## Examples

### Example 1: Versioned Workflow (Deterministic)
