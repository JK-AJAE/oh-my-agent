---
name: "grpc-golang"
description: "Build production-ready gRPC services in Go with mTLS, streaming, and observability. Use when designing Protobuf contracts with Buf or implementing secure service-to-service transport."
category: "custom-skill"
trigger: "/grpc-golang"
---

# gRPC Golang (gRPC-Go)

## Overview

Comprehensive guide for designing and implementing production-grade gRPC services in Go. Covers contract standardization with Buf, transport layer security via mTLS, and deep observability with OpenTelemetry interceptors.

## Use this skill when

- Designing microservices communication with gRPC in Go.
- Building high-performance internal APIs using Protobuf.
- Implementing streaming workloads (unidirectional or bidirectional).
- Standardizing API contracts using Protobuf and Buf.
- Configuring mTLS for service-to-service authentication.

## Do not use this skill when

- Building pure REST/HTTP public APIs without gRPC requirements.
- Modifying legacy `.proto` files without the ability to introduce a new API version (e.g., `api.v2`) or ensure backward compatibility.
- Managing service mesh traffic routing (e.g., Istio/Linkerd), which is outside the application code scope.

## Step-by-Step Guide

1. **Confirm Technical Context**: Identify Go version, gRPC-Go version, and whether the project uses Buf or raw protoc.
2. **Confirm Requirements**: Identify mTLS needs, load patterns (unary/streaming), SLOs, and message size limits.
3. **Plan Schema**: Define package versioning (e.g., `api.v1`), resource types, and error mapping.
4. **Security Design**: Implement mTLS for service-to-service authentication.
5. **Observability**: Configure interceptors for tracing, metrics, and structured logging.
6. **Verification**: Always run `buf lint` and breaking change checks before finalizing code generation.

Refer to `resources/implementation-playbook.md` for detailed patterns, code examples, and anti-patterns.

## Examples

### Example 1: Defining a Service & Message (v1 API)
