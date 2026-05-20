---
name: "progressive-web-app"
description: "Build Progressive Web Apps (PWAs) with offline support, installability, and caching strategies. Trigger whenever the user mentions PWA, service workers, web app manifests, Workbox, 'add to home screen', or wants their web app to work offline, feel native, or be installable."
category: "custom-skill"
trigger: "/progressive-web-app"
---

# Progressive Web Apps (PWAs)

## Overview

A Progressive Web App is a web application that uses modern browser capabilities to deliver a fast, reliable, and installable experience — even on unreliable networks. The three required pillars are:

1. **HTTPS** — Required in production for service workers to register (localhost is exempt for development).
2. **Web App Manifest** (`manifest.json`) — Makes the app installable and defines its appearance on device home screens.
3. **Service Worker** (`sw.js`) — A background script that intercepts network requests, manages caches, and enables offline functionality.

## When to Use This Skill

- Use when the user wants their web app to work offline or on unreliable networks.
- Use when building a mobile-first web project where users should be able to install the app to their home screen.
- Use when the user asks about caching strategies, service workers, or improving web app performance and resilience.
- Use when the user mentions Workbox, web app manifests, background sync, or push notifications for the web.
- Use when the user asks "can my website be installed like an app?" or "how do I make my site work offline?" — even if they don't use the word PWA.

## Deliverables Checklist

Every PWA implementation must include these files at minimum:

- [ ] `index.html` — Links manifest, registers service worker
- [ ] `manifest.json` — Full app metadata and icon set
- [ ] `sw.js` — Service worker with install, activate, and fetch handlers
- [ ] `app.js` — Main app logic with SW registration and install prompt handling
- [ ] `offline.html` — Fallback page shown when navigation fails offline (required — missing file will cause install to fail)

---

## Step 1: Web App Manifest (`manifest.json`)

Defines how the app appears when installed. Must be linked from `<head>` via `<link rel="manifest">`.
