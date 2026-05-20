---
name: "defuddle"
description: "Extract clean markdown content from web pages using Defuddle CLI, removing clutter and navigation to save tokens. Use instead of WebFetch when the user provides a URL to read or analyze, for online documentation, articles, blog posts, or any standard web page."
category: "custom-skill"
trigger: "/defuddle"
---

# Defuddle

Use Defuddle CLI to extract clean readable content from web pages. Prefer over WebFetch for standard web pages — it removes navigation, ads, and clutter, reducing token usage.

## When to Use
- Use when the user provides a normal webpage URL to read, summarize, or analyze.
- Prefer it over noisy page-fetch approaches when token efficiency matters.
- Use for docs, articles, blog posts, and similar public web content.

If not installed: `npm install -g defuddle`

## Usage

Always use `--md` for markdown output:
