---
name: "favicon"
description: "Generate favicons from a source image"
category: "custom-skill"
trigger: "/favicon"
---

Generate a complete set of favicons from the source image at `$1` and update the project's HTML with the appropriate link tags.

## When to Use
- You need to generate a complete favicon set from a single source image.
- The task includes placing the assets in the correct framework-specific static directory and updating HTML link tags.
- You want one workflow that validates the source image, detects the project type, and writes the right favicon outputs.

## Prerequisites

First, verify ImageMagick v7+ is installed by running:
