---
name: "api-documentation-generator"
description: "Generate comprehensive, developer-friendly API documentation from code, including endpoints, parameters, examples, and best practices"
category: "custom-skill"
trigger: "/api-documentation-generator"
---

# API Documentation Generator

## Overview

Automatically generate clear, comprehensive API documentation from your codebase. This skill helps you create professional documentation that includes endpoint descriptions, request/response examples, authentication details, error handling, and usage guidelines.

Perfect for REST APIs, GraphQL APIs, and WebSocket APIs.

## When to Use This Skill

- Use when you need to document a new API
- Use when updating existing API documentation
- Use when your API lacks clear documentation
- Use when onboarding new developers to your API
- Use when preparing API documentation for external users
- Use when creating OpenAPI/Swagger specifications

## How It Works

### Step 1: Analyze the API Structure

First, I'll examine your API codebase to understand:
- Available endpoints and routes
- HTTP methods (GET, POST, PUT, DELETE, etc.)
- Request parameters and body structure
- Response formats and status codes
- Authentication and authorization requirements
- Error handling patterns

### Step 2: Generate Endpoint Documentation

For each endpoint, I'll create documentation including:

**Endpoint Details:**
- HTTP method and URL path
- Brief description of what it does
- Authentication requirements
- Rate limiting information (if applicable)

**Request Specification:**
- Path parameters
- Query parameters
- Request headers
- Request body schema (with types and validation rules)

**Response Specification:**
- Success response (status code + body structure)
- Error responses (all possible error codes)
- Response headers

**Code Examples:**
- cURL command
- JavaScript/TypeScript (fetch/axios)
- Python (requests)
- Other languages as needed

### Step 3: Add Usage Guidelines

I'll include:
- Getting started guide
- Authentication setup
- Common use cases
- Best practices
- Rate limiting details
- Pagination patterns
- Filtering and sorting options

### Step 4: Document Error Handling

Clear error documentation including:
- All possible error codes
- Error message formats
- Troubleshooting guide
- Common error scenarios and solutions

### Step 5: Create Interactive Examples

Where possible, I'll provide:
- Postman collection
- OpenAPI/Swagger specification
- Interactive code examples
- Sample responses

## Examples

### Example 1: REST API Endpoint Documentation
