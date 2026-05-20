---
name: "rest-api-conventions"
description: "REST API design conventions reference. An extension skill for api-architect that provides URL naming, HTTP method mapping, status code selection, pagination/filtering/sorting patterns, HATEOAS, and versioning strategies. Use when designing RESTful APIs involving 'REST conventions', 'URL design', 'HTTP status codes', 'pagination', 'API versioning', 'HATEOAS', etc. Note: GraphQL design and actual server implementation are outside the scope of this skill."
category: "utility"
---

# REST API Conventions — RESTful API Design Conventions Reference

A reference of naming rules, status codes, and pagination patterns used by the api-architect agent when designing REST APIs.

## Target Agent

`api-architect` — Directly applies the conventions in this skill to API designs.

## URL Naming Rules

### Basic Principles
| Rule | Correct Example | Incorrect Example |
|------|----------------|-------------------|
| Plural nouns | `/users` | `/user`, `/getUsers` |
| Lowercase kebab-case | `/user-profiles` | `/userProfiles`, `/User_Profiles` |
| No verbs (use methods for CRUD) | `POST /orders` | `POST /createOrder` |
| Hierarchical relationships | `/users/{id}/orders` | `/getUserOrders` |
| No trailing slash | `/users` | `/users/` |
| No file extensions | `/users` (use Accept header) | `/users.json` |

### Resource URL Patterns

| Operation | Method | URL | Example |
|-----------|--------|-----|---------|
| List retrieval | GET | `/resources` | `GET /products` |
| Single retrieval | GET | `/resources/{id}` | `GET /products/123` |
| Create | POST | `/resources` | `POST /products` |
| Full update | PUT | `/resources/{id}` | `PUT /products/123` |
| Partial update | PATCH | `/resources/{id}` | `PATCH /products/123` |
| Delete | DELETE | `/resources/{id}` | `DELETE /products/123` |

### Relationship Resources
