---
name: "python-pptx-generator"
description: "Generate complete Python scripts that build polished PowerPoint decks with python-pptx and real slide content."
category: "custom-skill"
trigger: "/python-pptx-generator"
---

# Python PPTX Generator

## Overview

Use this skill when the user wants a ready-to-run Python script that creates a PowerPoint presentation with `python-pptx`.
It focuses on turning a topic brief into a complete slide deck script with real slide content, sensible structure, and a working save step.

## When to Use This Skill

- Use when the user wants a Python script that generates a `.pptx` file automatically
- Use when the user needs slide content drafted and encoded directly into `python-pptx`
- Use when the user wants a quick presentation generator for demos, classes, or internal briefings

## How It Works

### Step 1: Collect the Deck Brief

Ask for the topic, audience, tone, and target number of slides if the request does not already include them.
If constraints are missing, pick conservative defaults and state them in the generated script comments.

### Step 2: Plan the Narrative Arc

Outline the deck before writing code:

1. Title slide
2. Agenda or context
3. Core teaching or business points
4. Summary or next steps

Keep the slide count realistic for the requested audience and avoid filler slides.

### Step 3: Generate the Python Script

Write a complete script that:

- imports `Presentation` from `python-pptx`
- creates the deck
- selects appropriate built-in layouts
- writes real titles and bullet points
- saves the file with a clear filename
- prints a success message after saving

### Step 4: Keep the Output Runnable

The final answer should be a Python code block that can run after installing `python-pptx`.
Avoid pseudocode, placeholders, or missing imports.

## Examples

### Example 1: Educational Deck
