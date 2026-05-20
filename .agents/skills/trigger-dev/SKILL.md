---
name: "trigger-dev"
description: "Trigger.dev expert for background jobs, AI workflows, and reliable"
category: "custom-skill"
trigger: "/trigger-dev"
---

# Trigger.dev Integration

Trigger.dev expert for background jobs, AI workflows, and reliable async
execution with excellent developer experience and TypeScript-first design.

## Principles

- Tasks are the building blocks - each task is independently retryable
- Runs are durable - state survives crashes and restarts
- Integrations are first-class - use built-in API wrappers for reliability
- Logs are your debugging lifeline - log liberally in tasks
- Concurrency protects your resources - always set limits
- Delays and schedules are built-in - no external cron needed
- AI-ready by design - long-running AI tasks just work
- Local development matches production - use the CLI

## Capabilities

- trigger-dev-tasks
- ai-background-jobs
- integration-tasks
- scheduled-triggers
- webhook-handlers
- long-running-tasks
- task-queues
- batch-processing

## Scope

- redis-queues -> bullmq-specialist
- pure-event-driven -> inngest
- workflow-orchestration -> temporal-craftsman
- infrastructure -> infra-architect

## Tooling

### Core

- trigger-dev-sdk
- trigger-cli

### Frameworks

- nextjs
- remix
- express
- hono

### Integrations

- openai
- anthropic
- resend
- stripe
- slack
- supabase

### Deployment

- trigger-cloud
- self-hosted
- docker

## Patterns

### Basic Task Setup

Setting up Trigger.dev in a Next.js project

**When to use**: Starting with Trigger.dev in any project

// trigger.config.ts
import { defineConfig } from '@trigger.dev/sdk/v3';

export default defineConfig({
  project: 'my-project',
  runtime: 'node',
  logLevel: 'log',
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
    },
  },
});

// src/trigger/tasks.ts
import { task, logger } from '@trigger.dev/sdk/v3';

export const helloWorld = task({
  id: 'hello-world',
  run: async (payload: { name: string }) => {
    logger.log('Processing hello world', { payload });

    // Simulate work
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { message: `Hello, ${payload.name}!` };
  },
});

// Triggering from your app
import { helloWorld } from '@/trigger/tasks';

// Fire and forget
await helloWorld.trigger({ name: 'World' });

// Wait for result
const handle = await helloWorld.trigger({ name: 'World' });
const result = await handle.wait();

### AI Task with OpenAI Integration

Using built-in OpenAI integration with automatic retries

**When to use**: Building AI-powered background tasks

import { task, logger } from '@trigger.dev/sdk/v3';
import { openai } from '@trigger.dev/openai';

// Configure OpenAI with Trigger.dev
const openaiClient = openai.configure({
  id: 'openai',
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateContent = task({
  id: 'generate-content',
  retry: {
    maxAttempts: 3,
  },
  run: async (payload: { topic: string; style: string }) => {
    logger.log('Generating content', { topic: payload.topic });

    // Uses Trigger.dev's OpenAI integration - handles retries automatically
    const completion = await openaiClient.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are a ${payload.style} writer.`,
        },
        {
          role: 'user',
          content: `Write about: ${payload.topic}`,
        },
      ],
    });

    const content = completion.choices[0].message.content;
    logger.log('Generated content', { length: content?.length });

    return { content, tokens: completion.usage?.total_tokens };
  },
});

### Scheduled Task with Cron

Tasks that run on a schedule

**When to use**: Periodic jobs like reports, cleanup, or syncs

import { schedules, task, logger } from '@trigger.dev/sdk/v3';

export const dailyCleanup = schedules.task({
  id: 'daily-cleanup',
  cron: '0 2 * * *',  // 2 AM daily
  run: async () => {
    logger.log('Starting daily cleanup');

    // Clean up old records
    const deleted = await db.logs.deleteMany({
      where: {
        createdAt: { lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
    });

    logger.log('Cleanup complete', { deletedCount: deleted.count });

    return { deleted: deleted.count };
  },
});

// Weekly report
export const weeklyReport = schedules.task({
  id: 'weekly-report',
  cron: '0 9 * * 1',  // Monday 9 AM
  run: async () => {
    const stats = await generateWeeklyStats();
    await sendReportEmail(stats);
    return stats;
  },
});

### Batch Processing

Processing large datasets in batches

**When to use**: Need to process many items with rate limiting

import { task, logger, wait } from '@trigger.dev/sdk/v3';

export const processBatch = task({
  id: 'process-batch',
  queue: {
    concurrencyLimit: 5,  // Only 5 running at once
  },
  run: async (payload: { items: string[] }) => {
    const results = [];

    for (const item of payload.items) {
      logger.log('Processing item', { item });

      const result = await processItem(item);
      results.push(result);

      // Respect rate limits
      await wait.for({ seconds: 1 });
    }

    return { processed: results.length, results };
  },
});

// Trigger batch processing
export const startBatchJob = task({
  id: 'start-batch',
  run: async (payload: { datasetId: string }) => {
    const items = await fetchDataset(payload.datasetId);

    // Split into chunks of 100
    const chunks = chunkArray(items, 100);

    // Trigger parallel batch tasks
    const handles = await Promise.all(
      chunks.map(chunk => processBatch.trigger({ items: chunk }))
    );

    logger.log('Started batch processing', {
      totalItems: items.length,
      batches: chunks.length,
    });

    return { batches: handles.length };
  },
});

### Webhook Handler

Processing webhooks reliably with deduplication

**When to use**: Handling webhooks from Stripe, GitHub, etc.

import { task, logger, idempotencyKeys } from '@trigger.dev/sdk/v3';

export const handleStripeEvent = task({
  id: 'handle-stripe-event',
  run: async (payload: {
    eventId: string;
    type: string;
    data: any;
  }) => {
    // Idempotency based on Stripe event ID
    const idempotencyKey = await idempotencyKeys.create(payload.eventId);

    if (idempotencyKey.isNew === false) {
      logger.log('Duplicate event, skipping', { eventId: payload.eventId });
      return { skipped: true };
    }

    logger.log('Processing Stripe event', {
      type: payload.type,
      eventId: payload.eventId,
    });

    switch (payload.type) {
      case 'checkout.session.completed':
        await handleCheckoutComplete(payload.data);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(payload.data);
        break;
    }

    return { processed: true, type: payload.type };
  },
});

## Sharp Edges

### Task timeout kills execution without clear error

Severity: CRITICAL

Situation: Long-running AI task or batch process suddenly stops. No error in logs.
Task shows as failed in dashboard but no stack trace. Data partially processed.

Symptoms:
- Task fails with no error message
- Partial data processing
- Works locally, fails in production
- "Task timed out" in dashboard

Why this breaks:
Trigger.dev has execution timeouts (defaults vary by plan). When exceeded, the
task is killed mid-execution. If you're not logging progress, you won't know
where it stopped. This is especially common with AI tasks that can take minutes.

Recommended fix:

# Configure explicit timeouts:
