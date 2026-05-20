---
name: "videodb"
description: "Video and audio perception, indexing, and editing. Ingest files/URLs/live streams, build visual/spoken indexes, search with timestamps, edit timelines, add overlays/subtitles, generate media, and create real-time alerts."
category: "custom-skill"
trigger: "/videodb"
---

# VideoDB Skill

**Perception + memory + actions for video, live streams, and desktop sessions.**

Use this skill when you need to:

## When to Use
- You need video or audio perception, indexing, search, or timeline editing from files, URLs, desktop sessions, or live streams.
- The task involves timestamps, searchable evidence, subtitles, clips, overlays, or real-time monitoring alerts.
- You want one workflow that combines ingestion, understanding, retrieval, and media actions.

## 1) Desktop Perception
- Start/stop a **desktop session** capturing **screen, mic, and system audio**
- Stream **live context** and store **episodic session memory**
- Run **real-time alerts/triggers** on what's spoken and what's happening on screen
- Produce **session summaries**, a searchable timeline, and **playable evidence links**

## 2) Video ingest + stream
- Ingest a **file or URL** and return a **playable web stream link**
- Transcode/normalize: **codec, bitrate, fps, resolution, aspect ratio**

## 3) Index + search (timestamps + evidence)
- Build **visual**, **spoken**, and **keyword** indexes
- Search and return exact moments with **timestamps** and **playable evidence**
- Auto-create **clips** from search results

## 4) Timeline editing + generation
- Subtitles: **generate**, **translate**, **burn-in**
- Overlays: **text/image/branding**, motion captions
- Audio: **background music**, **voiceover**, **dubbing**
- Programmatic composition and exports via **timeline operations**

## 5) Live streams (RTSP) + monitoring
- Connect **RTSP/live feeds**
- Run **real-time visual and spoken understanding** and emit **events/alerts** for monitoring workflows

---

## Common inputs
- Local **file path**, public **URL**, or **RTSP URL**
- Desktop capture request: **start / stop / summarize session**
- Desired operations: get context for understanding, transcode spec, index spec, search query, clip ranges, timeline edits, alert rules

## Common outputs
- **Stream URL**
- Search results with **timestamps** and **evidence links**
- Generated assets: subtitles, audio, images, clips
- **Event/alert payloads** for live streams
- Desktop **session summaries** and memory entries

---

## Canonical prompts (examples)
- "Start desktop capture and alert when a password field appears."
- "Record my session and produce an actionable summary when it ends."
- "Ingest this file and return a playable stream link."
- "Index this folder and find every scene with people, return timestamps."
- "Generate subtitles, burn them in, and add light background music."
- "Connect this RTSP URL and alert when a person enters the zone."

## Running Python code

Before running any VideoDB code, change to the project directory and load environment variables:
