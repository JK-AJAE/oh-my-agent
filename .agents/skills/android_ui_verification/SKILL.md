---
name: "android_ui_verification"
description: "Automated end-to-end UI testing and verification on an Android Emulator using ADB."
category: "custom-skill"
trigger: "/android_ui_verification"
---

# Android UI Verification Skill

This skill provides a systematic approach to testing React Native applications on an Android emulator using ADB commands. It allows for autonomous interaction, state verification, and visual regression checking.

## When to Use
- Verifying UI changes in React Native or Native Android apps.
- Autonomous debugging of layout issues or interaction bugs.
- Ensuring feature functionality when manual testing is too slow.
- Capturing automated screenshots for PR documentation.

## 🛠 Prerequisites
- Android Emulator running.
- `adb` installed and in PATH.
- Application in debug mode for logcat access.

## 🚀 Workflow

### 1. Device Calibration
Before interacting, always verify the screen resolution to ensure tap coordinates are accurate.
