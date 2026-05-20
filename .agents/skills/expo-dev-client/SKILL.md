---
name: "expo-dev-client"
description: "Build and distribute Expo development clients locally or via TestFlight"
category: "custom-skill"
trigger: "/expo-dev-client"
---

Use EAS Build to create development clients for testing native code changes on physical devices. Use this for creating custom Expo Go clients for testing branches of your app.

## When to Use
- You need an Expo development client because the app depends on custom native code or targets not supported by Expo Go.
- The task involves building, distributing, or testing EAS development builds on physical devices.
- You need guidance on when to choose a dev client versus staying on plain Expo Go.

## Important: When Development Clients Are Needed

**Only create development clients when your app requires custom native code.** Most apps work fine in Expo Go.

You need a dev client ONLY when using:
- Local Expo modules (custom native code)
- Apple targets (widgets, app clips, extensions)
- Third-party native modules not in Expo Go

**Try Expo Go first** with `npx expo start`. If everything works, you don't need a dev client.

## EAS Configuration

Ensure `eas.json` has a development profile:
