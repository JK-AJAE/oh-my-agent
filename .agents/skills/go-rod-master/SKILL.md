---
name: "go-rod-master"
description: "Comprehensive guide for browser automation and web scraping with go-rod (Chrome DevTools Protocol) including stealth anti-bot-detection patterns."
category: "custom-skill"
trigger: "/go-rod-master"
---

# Go-Rod Browser Automation Master

## Overview

[Rod](https://github.com/go-rod/rod) is a high-level Go driver built directly on the [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) for browser automation and web scraping. Unlike wrappers around other tools, Rod communicates with the browser natively via CDP, providing thread-safe operations, chained context design for timeouts/cancellation, auto-wait for elements, correct iframe/shadow DOM handling, and zero zombie browser processes.

The companion library [go-rod/stealth](https://github.com/go-rod/stealth) injects anti-bot-detection evasions based on [puppeteer-extra stealth](https://github.com/nichochar/puppeteer-extra/tree/master/packages/extract-stealth-evasions), hiding headless browser fingerprints from detection systems.

## When to Use This Skill

- Use when the user asks to **scrape**, **automate**, or **test** a website using Go.
- Use when the user needs a **headless browser** for dynamic/SPA content (React, Vue, Angular).
- Use when the user mentions **stealth**, **anti-bot**, **avoiding detection**, **Cloudflare**, or **bot detection bypass**.
- Use when the user wants to work with the **Chrome DevTools Protocol (CDP)** directly from Go.
- Use when the user needs to **intercept** or **hijack** network requests in a browser context.
- Use when the user asks about **concurrent browser scraping** or **page pooling** in Go.
- Use when the user is migrating from **chromedp** or **Playwright Go** and wants a simpler API.

## Safety & Risk

**Risk Level: 🔵 Safe**

- **Read-Only by Default:** Default behavior is navigating and reading page content (scraping/testing).
- **Isolated Contexts:** Browser contexts are sandboxed; cookies and storage do not persist unless explicitly saved.
- **Resource Cleanup:** Designed around Go's `defer` pattern — browsers and pages close automatically.
- **No External Mutations:** Does not modify external state unless the script explicitly submits forms or POSTs data.

## Installation
