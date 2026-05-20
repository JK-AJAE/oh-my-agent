---
name: "gdb-cli"
description: "GDB debugging assistant for AI agents - analyze core dumps, debug live processes, investigate crashes and deadlocks with source code correlation"
category: "custom-skill"
trigger: "/gdb-cli"
---

# GDB Debugging Assistant

## Overview

A GDB debugging skill designed for AI agents. Combines **source code analysis** with **runtime state inspection** using gdb-cli to provide intelligent debugging assistance for C/C++ programs.

## When to Use This Skill

- Analyze core dumps or crash dumps
- Debug running processes with GDB attach
- Investigate crashes, deadlocks, or memory issues
- Get intelligent debugging assistance with source code context
- Debug multi-threaded applications

## Do Not Use This Skill When

- The task is unrelated to C/C++ debugging
- The user needs general-purpose assistance without debugging
- No GDB is available (GDB 9.0+ with Python support required)

## Prerequisites
