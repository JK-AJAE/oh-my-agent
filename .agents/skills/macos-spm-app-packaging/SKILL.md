---
name: "macos-spm-app-packaging"
description: "Scaffold, build, sign, and package SwiftPM macOS apps without Xcode projects."
category: "custom-skill"
trigger: "/macos-spm-app-packaging"
---

# macOS SwiftPM App Packaging (No Xcode)

## Overview
Bootstrap a complete SwiftPM macOS app folder, then build, package, and run it without Xcode. Use `assets/templates/bootstrap/` for the starter layout and `references/packaging.md` + `references/release.md` for packaging and release details.

## When to Use
- When the user needs a SwiftPM-based macOS app without relying on an Xcode project.
- When you need packaging, signing, notarization, or appcast guidance for a SwiftPM app.

## Two-Step Workflow
1) Bootstrap the project folder
   - Copy `assets/templates/bootstrap/` into a new repo.
   - Rename `MyApp` in `Package.swift`, `Sources/MyApp/`, and `version.env`.
   - Customize `APP_NAME`, `BUNDLE_ID`, and versions.

2) Build, package, and run the bootstrapped app
   - Copy scripts from `assets/templates/` into your repo (for example, `Scripts/`).
   - Build/tests: `swift build` and `swift test`.
   - Package: `Scripts/package_app.sh`.
   - Run: `Scripts/compile_and_run.sh` (preferred) or `Scripts/launch.sh`.
   - Release (optional): `Scripts/sign-and-notarize.sh` and `Scripts/make_appcast.sh`.
   - Tag + GitHub release (optional): create a git tag, upload the zip/appcast to the GitHub release, and publish.

## Minimum End-to-End Example
Shortest path from bootstrap to a running app:
