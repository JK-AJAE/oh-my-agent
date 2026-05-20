---
name: "distributed-patterns"
description: "Implementation guide and selection matrix for core distributed system patterns (Saga, CQRS, Circuit Breaker, Event Sourcing, etc.). Use this skill for 'distributed transactions', 'Saga pattern', 'CQRS', 'circuit breaker', 'event sourcing', 'distributed patterns', 'compensating transactions', 'eventual consistency', and other distributed system pattern applications. Enhances the distributed system design capabilities of communication-designer and service-architect. Note: infrastructure setup and monitoring configuration are outside the scope of this skill."
category: "utility"
---

# Distributed Patterns — Core Distributed System Pattern Guide

Detailed pattern implementations for inter-microservice communication, data consistency, and fault tolerance.

## 1. Saga Pattern

### Choreography vs Orchestration Selection

| Criteria | Choreography | Orchestration |
|----------|-------------|---------------|
| Number of services | 2-4 | 5 or more |
| Flow complexity | Linear | Branching/conditional |
| Coupling | Event-driven loose coupling | Centralized in orchestrator |
| Visibility | Difficult to trace flow | Central state management |
| Failure handling | Each service self-compensates | Orchestrator coordinates compensation |

### Orchestration Saga Implementation
