---
name: "helpdesk-automation"
description: "Automate HelpDesk tasks via Rube MCP (Composio): list tickets, manage views, use canned responses, and configure custom fields. Always search tools first for current schemas."
category: "custom-skill"
trigger: "/helpdesk-automation"
---

# HelpDesk Automation via Rube MCP

Automate HelpDesk ticketing operations through Composio's HelpDesk toolkit via Rube MCP.

## Prerequisites

- Rube MCP must be connected (RUBE_SEARCH_TOOLS available)
- Active HelpDesk connection via `RUBE_MANAGE_CONNECTIONS` with toolkit `helpdesk`
- Always call `RUBE_SEARCH_TOOLS` first to get current tool schemas

## Setup

**Get Rube MCP**: Add `https://rube.app/mcp` as an MCP server in your client configuration. No API keys needed — just add the endpoint and it works.


1. Verify Rube MCP is available by confirming `RUBE_SEARCH_TOOLS` responds
2. Call `RUBE_MANAGE_CONNECTIONS` with toolkit `helpdesk`
3. If connection is not ACTIVE, follow the returned auth link to complete HelpDesk authentication
4. Confirm connection status shows ACTIVE before running any workflows

## Core Workflows

### 1. List and Browse Tickets

**When to use**: User wants to retrieve, browse, or paginate through support tickets

**Tool sequence**:
1. `HELPDESK_LIST_TICKETS` - List tickets with sorting and pagination [Required]

**Key parameters**:
- `silo`: Ticket folder - 'tickets', 'archive', 'trash', or 'spam' (default: 'tickets')
- `sortBy`: Sort field - 'createdAt', 'updatedAt', or 'lastMessageAt' (default: 'createdAt')
- `order`: Sort direction - 'asc' or 'desc' (default: 'desc')
- `pageSize`: Results per page, 1-100 (default: 20)
- `next.value`: Timestamp cursor for forward pagination
- `next.ID`: ID cursor for forward pagination
- `prev.value`: Timestamp cursor for backward pagination
- `prev.ID`: ID cursor for backward pagination

**Pitfalls**:
- Pagination uses cursor-based approach with timestamp + ID pairs
- Forward pagination requires both `next.value` and `next.ID` from previous response
- Backward pagination requires both `prev.value` and `prev.ID`
- `silo` determines which folder to list from; default is active tickets
- `pageSize` max is 100; default is 20
- Archived and trashed tickets are in separate silos

### 2. Manage Ticket Views

**When to use**: User wants to see saved agent views for organizing tickets

**Tool sequence**:
1. `HELPDESK_LIST_VIEWS` - List all agent views [Required]

**Key parameters**: (none required)

**Pitfalls**:
- Views are predefined saved filters configured by agents in the HelpDesk UI
- View definitions include filter criteria that can be used to understand ticket organization
- Views cannot be created or modified via API; they are managed in the HelpDesk UI

### 3. Use Canned Responses

**When to use**: User wants to list available canned (template) responses for tickets

**Tool sequence**:
1. `HELPDESK_LIST_CANNED_RESPONSES` - Retrieve all predefined reply templates [Required]

**Key parameters**: (none required)

**Pitfalls**:
- Canned responses are predefined templates for common replies
- They may include placeholder variables that need to be filled in
- Canned responses are managed through the HelpDesk UI
- Response content may include HTML formatting

### 4. Inspect Custom Fields

**When to use**: User wants to view custom field definitions for the account

**Tool sequence**:
1. `HELPDESK_LIST_CUSTOM_FIELDS` - List all custom field definitions [Required]

**Key parameters**: (none required)

**Pitfalls**:
- Custom fields extend the default ticket schema with organization-specific data
- Field definitions include field type, name, and validation rules
- Custom fields are configured in the HelpDesk admin panel
- Field values appear on tickets when the field has been populated

## Common Patterns

### Ticket Browsing Pattern
