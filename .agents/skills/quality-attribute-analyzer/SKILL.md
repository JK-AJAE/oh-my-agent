---
name: "quality-attribute-analyzer"
description: "A specialized skill for systematically analyzing quality attributes in architecture decisions and quantifying tradeoffs. Used by the tradeoff-evaluator agent when evaluating tradeoffs between quality attributes such as performance, scalability, and security. Automatically applied in contexts involving 'quality attributes,' 'QA analysis,' '-ility,' 'performance requirements,' 'scalability,' 'security,' or 'CAP theorem.' Note: actual performance test execution and security audits are outside the scope of this skill."
category: "utility"
---

# Quality Attribute Analyzer — Quality Attribute Analysis Tool

A specialized skill that enhances the tradeoff-evaluator agent's quality attribute analysis capabilities.

## Target Agent

- **tradeoff-evaluator** — Quality attribute weighted evaluation, risk-reward analysis

## Core Quality Attribute (-ility) Dictionary

### Runtime Quality Attributes

| Attribute | Definition | Measurement Metrics | Typical Targets |
|-----------|-----------|---------------------|-----------------|
| **Performance** | Response time, throughput | p50/p99 latency, TPS | p99 < 200ms |
| **Scalability** | Ability to handle increased load | Linear scaling capability | Linear at 10x load |
| **Availability** | System uptime | Uptime %, MTBF | 99.9% (Three 9s) |
| **Reliability** | Error-free operation | Failure rate, MTTR | MTTR < 30 min |
| **Security** | Protection from threats | Vulnerability count, breach incidents | OWASP Top 10 coverage |

### Development/Operations Quality Attributes

| Attribute | Definition | Measurement Metrics |
|-----------|-----------|---------------------|
| **Maintainability** | Ease of modification | Code complexity, change lead time |
| **Testability** | Ease of writing tests | Coverage, test execution time |
| **Deployability** | Deployment frequency and safety | Deployment frequency, rollback time |
| **Observability** | System state visibility | Logs, metrics, tracing |

## Quality Attribute Tradeoff Matrix

### Common Tradeoff Relationships

| Attribute A (up) | Attribute B (down) | Reason |
|-------------------|-------------------|--------|
| Performance | Maintainability | Optimized code becomes more complex |
| Security | Performance/Usability | Authentication/encryption overhead |
| Scalability | Consistency | CAP theorem |
| Availability | Consistency | CAP theorem |
| Flexibility | Performance | Abstraction layer overhead |

### CAP Theorem Decision Making
