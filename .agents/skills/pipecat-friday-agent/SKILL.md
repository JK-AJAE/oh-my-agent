---
name: "pipecat-friday-agent"
description: "Build a low-latency, Iron Man-inspired tactical voice assistant (F.R.I.D.A.Y.) using Pipecat, Gemini, and OpenAI."
category: "custom-skill"
trigger: "/pipecat-friday-agent"
---

# Pipecat Friday Agent

## Overview

This skill provides a blueprint for building **F.R.I.D.A.Y.** (Replacement Integrated Digital Assistant Youth), a local voice assistant inspired by the tactical AI from the Iron Man films. It uses the **Pipecat** framework to orchestrate a low-latency pipeline:
- **STT**: OpenAI Whisper (`whisper-1`) or `gpt-4o-transcribe`
- **LLM**: Google Gemini 2.5 Flash (via a compatibility shim)
- **TTS**: OpenAI TTS (`nova` voice)
- **Transport**: Local Audio (Hardware Mic/Speakers)

## When to Use This Skill

- Use when you want to build a real-time, conversational voice agent.
- Use when working with the Pipecat framework for pipeline-based AI.
- Use when you need to integrate multiple providers (Google and OpenAI) into a single voice loop.
- Use when building Iron Man-themed or tactical-themed voice applications.

## How It Works

### Step 1: Install Dependencies

You will need the Pipecat framework and its service providers installed:
