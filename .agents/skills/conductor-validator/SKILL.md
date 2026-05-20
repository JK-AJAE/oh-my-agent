---
name: "conductor-validator"
description: "Validates Conductor project artifacts for completeness,"
category: "custom-skill"
trigger: "/conductor-validator"
---

# Check if conductor directory exists
ls -la conductor/

# Find all track directories
ls -la conductor/tracks/

# Check for required files
ls conductor/index.md conductor/product.md conductor/tech-stack.md conductor/workflow.md conductor/tracks.md
