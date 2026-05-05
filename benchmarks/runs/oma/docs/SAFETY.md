# WorldCraft Kids — Safety and Moderation for Children

**Version**: 0.1  
**Status**: Pre-MVP  
**Last Updated**: 2026-05-05

---

## Table of Contents

1. [COPPA Compliance Considerations](#1-coppa-compliance-considerations)
2. [Content Safety](#2-content-safety)
3. [Data Minimization](#3-data-minimization)
4. [AI Safety Guardrails](#4-ai-safety-guardrails)
5. [Accessibility and Inclusion](#5-accessibility-and-inclusion)
6. [Reporting and Oversight](#6-reporting-and-oversight)

---

## 1. COPPA Compliance Considerations

### Scope

The Children's Online Privacy Protection Act (COPPA) applies to online services directed at children under 13, or services with actual knowledge that a user is under 13. WorldCraft Kids is explicitly directed at children up to Grade 6 (approximately age 11–12). The platform is designed from the ground up to operate without collecting, using, or disclosing personal information from children.

**This section does not constitute legal advice.** Compliance posture must be reviewed by qualified legal counsel before any public launch.

### No Collection of Personal Information from Children

COPPA defines "personal information" broadly. WorldCraft Kids eliminates collection at the system design level, not just at the policy level.

| Data point | Collection approach | Rationale |
|-----------|---------------------|-----------|
| Legal name | Not collected | Child enters a display name (can be fictional: "SparkFox", "Mia") |
| Email address | Not collected from children | Email is never requested during child onboarding |
| Home/school address | Not collected | No address fields exist anywhere in the child-facing UI |
| Phone number | Not collected | No phone fields exist anywhere in the child-facing UI |
| Age or birthdate | Not collected | No age gate; platform designed for all under-Grade-6 users |
| Persistent identifier | Session-based for guests | Returning users use display name + avatar emoji login; no email or password required |
| Location data | Not collected | No geolocation API calls, no IP-based location storage |
| Photos/video | Not collected | No camera or file upload features for children |

### Authentication Model for Children

Child accounts use **name + emoji avatar login only**:

```
POST /api/auth/login
{
  "displayName": "SparkFox",   // child-chosen, can be fictional
  "avatarEmoji": "🌟",
  "role": "child"
}
```

- No password required. No email required.
- The `users` table stores only `display_name`, `avatar_emoji`, `role`, and `created_at`.
- Display names are not required to be unique across the platform. The child's user `id` (a `nanoid`-generated UUID) is the identifier, not the name.
- Guest sessions (no account created) are supported for the first session. World data is stored locally in `localStorage` until the child chooses to save (which creates an account silently).

### No Social Features That Expose Identity

The class gallery shows a world card with `creatorName` (the display name). Display names are intentionally fictional-friendly and never linked to real identity. The system:
- Never displays a child's profile page viewable by other users.
- Never shows one child to another outside of the class gallery context (teacher-mediated).
- Never allows one child to search for or contact another child directly.
- Never exposes any persistent identifier (`userId`) in client-rendered HTML or JavaScript.

The `creatorName` shown on gallery cards is the display name only. It is not linked to a profile page. Clicking it does nothing.

### Parent/Teacher Gatekeeper for Sharing

Children cannot share their worlds to the class gallery without either:
1. **Explicitly opting in** at the post-save screen ("Share with your class?" with a clear default of "Keep Private"), or
2. **A teacher flagging** their world for the class gallery via the teacher portal.

This two-step gatekeeping means no child's work appears publicly without either affirmative choice by the child or affirmative action by the supervising adult.

### Local and School-Managed Storage

For school deployments, the platform supports a **self-hosted instance**:
- The Next.js application and SQLite database run on school-managed infrastructure.
- No data leaves the school network unless the teacher explicitly configures a hosted endpoint.
- The Docker image is available for local or school server deployment.
- In the cloud-hosted version, data is stored in a single-tenant SQLite file per school, not in a shared multi-tenant database.

### No Behavioral Advertising

- No third-party advertising SDKs.
- No tracking pixels, ad networks, or affiliate links.
- No retargeting or behavioral profiling of any kind.
- The platform is funded by school licensing, not advertising.

---

## 2. Content Safety

### AI Response Filtering

All AI responses pass through a two-stage filter before being sent to the client (see `docs/AI-SYSTEM.md`, Section 6 for implementation details):

1. **Blocklist screen**: regex patterns for violence, sexual content, and personal information solicitation.
2. **Output filter**: post-generation check applied to every OpenAI API response before it is stored or returned.

Responses that fail either check are discarded silently and replaced with a safe fallback from `src/lib/ai-fallbacks.ts`. The child never sees an error — they simply receive a benign creative prompt.

### User-Generated Content Moderation

Children can provide three types of user-generated text content:

| Content type | Location | Max length | Moderation approach |
|--------------|----------|------------|---------------------|
| World title | Inline toolbar edit | 50 characters | Synchronous blocklist check on save |
| Reflection note | Post-save prompt | 100 characters | Synchronous blocklist check on save |
| Spark reply | AI panel input | 100 characters | Blocklist check before sending to API |

All three are passed through `isBlockedInput()` in `src/lib/content-filter.ts` before persistence or API forwarding. If blocked:
- The save or send is rejected with a `400` response.
- The client (`world-canvas.tsx`, `spark-input.tsx`) displays: "That word doesn't work here — try something else!"
- No shame language, no red warnings, no "inappropriate content" messaging to the child.

### Blocklist Maintenance

The blocklist in `src/lib/content-filter.ts` is a TypeScript constant array. It is versioned in source control and updated by the content team via pull request. The blocklist is not configurable at runtime and is not database-driven — runtime configurability would introduce injection risk.

Initial categories:
- Common profanity (English)
- Violence and harm terminology
- Sexual content terminology
- Personal information solicitation patterns (regex)

The blocklist is intentionally conservative and will produce some false positives (e.g., "shooting star" blocked due to "shoot"). The UX response ("try something else") is designed to be low-friction for false positives — the child rephrases and continues without disruption.

### No Direct User-to-User Messaging

There is no direct messaging, commenting, or chat feature between children. The only child-to-child interaction is the gallery reaction system (4 preset emoji: heart / star / wow / hmm). Reactions:
- Are anonymous to the recipient (the creator sees a count, not who reacted).
- Cannot include free text.
- Are limited to 4 predefined options.
- Can be toggled off per-world by the teacher.

### Class Gallery Moderation

No student world enters the class gallery without teacher mediation. The moderation flow:

```
Student world saved
  └── Student clicks "Share with class"
        └── World enters "pending" state in teacher's moderation queue
              └── Teacher reviews in /teacher/gallery
                    └── Teacher approves → world appears in class gallery
                    └── Teacher rejects → world stays private, student not notified
```

Teachers can also retroactively remove worlds from the gallery at any time. The teacher dashboard (`/teacher/gallery`) shows a thumbnail, title, and reflection note for each pending world.

For MVP, there is no AI-based pre-moderation of gallery submissions. Manual teacher review is the only gate. Automatic AI pre-screening of image thumbnails is a P2 roadmap item (after the gallery feature ships).

---

## 3. Data Minimization

### Data Stored Per User

The `users` table stores the absolute minimum required for the platform to function:

```sql
CREATE TABLE IF NOT EXISTS users (
  id           TEXT    NOT NULL PRIMARY KEY,   -- nanoid UUID, never exposed to children
  display_name TEXT    NOT NULL,               -- child-chosen, can be fictional
  avatar_emoji TEXT    NOT NULL DEFAULT '🌟',  -- from a predefined safe emoji list
  role         TEXT    NOT NULL DEFAULT 'child',
  created_at   INTEGER NOT NULL DEFAULT (unixepoch())
) STRICT;
```

Nothing else is stored about the user. No last login, no IP address, no device fingerprint, no usage statistics.

### Data Stored Per World

```sql
-- The worlds table stores world content and metadata only.
-- No behavioral data, no time-on-task, no analytics.
```

The `worlds` table intentionally does not store:
- Session duration or time-on-task
- Click or interaction logs
- Object placement history (only the final state)
- Edit history or revision tracking

`updated_at` is stored (for "last edited" display) but is the only temporal tracking beyond `created_at`.

### Data Stored Per AI Conversation

```sql
CREATE TABLE IF NOT EXISTS ai_conversations (
  id            TEXT NOT NULL PRIMARY KEY,
  world_id      TEXT NOT NULL REFERENCES worlds (id) ON DELETE CASCADE,
  messages_json TEXT NOT NULL DEFAULT '[]',   -- array of {role, content, timestamp}
  created_at    INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at    INTEGER NOT NULL DEFAULT (unixepoch())
) STRICT;
```

`messages_json` stores the text content of each Spark exchange. It does not store:
- The child's user ID inline in the message (the conversation belongs to a world, not a user directly)
- The `worldSnapshot` sent with each request (world state at time of exchange is not persisted per-message)
- Any metadata about the child's session (browser, device, IP)

### No Analytics or Tracking

WorldCraft Kids does not integrate any third-party analytics:
- No Google Analytics
- No Mixpanel, Amplitude, or Segment
- No error monitoring that sends child-associated data externally (Sentry may be configured for server errors only, with user context explicitly disabled)
- No performance monitoring that includes user identifiers

Server-side request logging (standard Next.js/Node.js access logs) captures IP addresses, but these logs:
- Are not retained for more than 7 days
- Are not associated with user IDs or world IDs
- Are accessible only to infrastructure administrators, not to the product team

### No Advertising Infrastructure

WorldCraft Kids has zero advertising-related code. The `package.json` is reviewed at each dependency update to ensure no advertising, tracking, or behavioral analytics SDKs are introduced transitively.

### Data Deletion

Any user (or their parent or teacher) can request deletion of all data associated with an account. The deletion cascade in the database schema handles this automatically:

```sql
-- All tables use ON DELETE CASCADE from users.id
-- Deleting a user row deletes: all worlds, all ai_conversations, all gallery_likes,
-- all challenge_submissions. Nothing is retained.
```

The API route `DELETE /api/users/[id]` (teacher-accessible) performs this deletion. Teachers can delete any student account in their class. There is no self-service deletion in the child UI for MVP (children do not manage their own accounts in this model — the teacher is the account administrator).

### Session Duration

Child sessions use a signed cookie (`worldcraft_session`). The cookie:
- Is `HttpOnly` (not accessible to JavaScript)
- Is `SameSite=Lax` (mitigates CSRF)
- Has a `Max-Age` of 30 days by default
- Is cleared on explicit logout (though children rarely log out; returning to the site and entering their display name creates or resumes a session)

Guest sessions (pre-account) use `localStorage` only. No cookie is set until an account is created.

---

## 4. AI Safety Guardrails

### Hard-Coded Safety Rules

The system prompt contains safety rules that are constants in `src/lib/services/ai-service.ts`. These rules:
- Cannot be overridden by the world context block
- Cannot be overridden by the conversation history
- Cannot be changed without a code deployment (not database-configurable)

The five non-negotiable rules in the system prompt:

1. "Never describe, suggest, or engage with violent, scary, sexual, or frightening content."
2. "Never ask for or acknowledge personal information."
3. "Never complete the child's world for them."
4. "If you are unsure whether a response is appropriate, send: 'What are you adding to your world next?'"
5. "Never write more than 2 sentences."

Rule 5 is both a UX rule and a safety rule: longer responses increase the probability that the model wanders into off-topic or unsafe territory.

### Response Length Limiting

`max_tokens: 100` is set on every OpenAI API call. At approximately 4 characters per token, this limits responses to roughly 400 characters — enforcing the 2-sentence brevity requirement at the API level, not just at the prompt level.

This length constraint also:
- Prevents the model from providing detailed instructions for harmful activities (even if the prompt somehow elicited such a response, it would be cut off before it became actionable)
- Reduces the surface area for model hallucination
- Keeps response time under 1 second for typical queries

### Fallback to Curated Prompts

The fallback chain (`src/lib/ai-fallbacks.ts`) is triggered by:

| Trigger | Response |
|---------|----------|
| OpenAI API timeout (>3 seconds) | Served from `generic` fallback pool |
| OpenAI API error (4xx, 5xx) | Served from `generic` fallback pool |
| Input blocklist match | Served from `redirect` fallback pool |
| Output filter match | Served from `after_placement` fallback pool |
| Session limit reached (30 interactions) | "Spark is taking a break — keep building!" (hardcoded string) |
| `conversationLength === 0` failure | Served from `session_start` fallback pool |

Fallback responses are pre-vetted by the content team, cover all response type categories, and are never generated dynamically. They cannot be made unsafe.

### No Image Generation

Spark produces text responses only. There is no integration with image generation APIs (DALL-E, Stable Diffusion, Midjourney, etc.). The "variation cards" shown in the AI companion panel display pre-rendered thumbnails of existing catalog objects — these are static PNGs stored in `/public/objects/`, not AI-generated images.

This eliminates an entire class of safety risk: inappropriate image generation is architecturally impossible in the MVP.

### Child Cannot Trigger World Modification via AI

Spark can only suggest — the child must act. The `/api/ai/suggest` endpoint returns a list of `objectKey` references. The client (`variation-cards.tsx`) uses these keys to look up objects in the static catalog and places them when the child taps a card.

The AI API has no ability to:
- Write to the `worlds` table
- Call `addObject` in `useWorldStore`
- Modify any scene state directly

This architectural constraint means that even a fully compromised AI response cannot modify the child's world without the child's affirmative tap action.

### Rate Limiting Architecture

```
Layer 1: Client-side (use-spark-trigger.ts)
  - 15-second cooldown between trigger events
  - Respects "dismissed" state in useAIStore

Layer 2: Server-side session limit (ai-service.ts)
  - Checks conversationLength before each API call
  - Returns 429 if conversationLength >= 30

Layer 3: Server-side rate limit (rate-limit.ts)
  - 5 requests per 30 seconds per session
  - In-memory sliding window (swap to Redis for production scale)

Layer 4: OpenAI API rate limit
  - Organization-level rate limits set in OpenAI dashboard
```

The 30-interactions-per-session limit exists for both safety and cost control. At 30 interactions, Spark has had ample opportunity to support the child's creative work. Further interaction beyond this limit is statistically unlikely to be healthy engagement — it is more likely to indicate a child trying to probe the system or having become dependent on Spark for each action.

---

## 5. Accessibility and Inclusion

### Visual Accessibility

**High contrast mode**:
- A toggle in the settings menu (accessible from the toolbar) switches to a high-contrast theme.
- High-contrast palette replaces `color-primary-light` (`#C4B0E8`) with `#FFFFFF` for panel backgrounds, and increases `color-text-primary` weight.
- The toggle state is stored in `localStorage` and persists across sessions.
- Implementation: Tailwind `dark:` class variants with a `[data-theme="high-contrast"]` attribute on `<html>`.

**Large text option**:
- A font size toggle increases all body text by 2px steps (18px → 20px → 22px).
- Minimum body text: 16px. Minimum label text: 14px. Never reduced below these values.
- Implementation: CSS custom property `--font-size-base` updated by the toggle; Tailwind configuration uses this property.

**Color contrast compliance**:
- All foreground/background pairs meet WCAG AA (4.5:1 for body text, 3:1 for large text and UI components).
- Color is never the only differentiator — every state change is communicated by shape, text, or icon in addition to color.
- Specifically: selected object state uses both a purple ring AND a resize handle icon — not just color.

### Motor Accessibility

**Touch targets**:
- All interactive elements meet the 48×48px minimum touch target size specified in WCAG 2.5.5 and the product design spec.
- Draggable objects in the library have 64×64px thumbnails.
- The dismiss (×) button on Spark messages is 44×44px (minimum for comfortable tapping by a child with small fingers).

**Keyboard navigation**:
- All interactive elements are reachable via Tab. Tab order follows visual left-to-right, top-to-bottom order.
- Object library panels are navigable with arrow keys when focused.
- The builder canvas has a keyboard placement mode: Tab to cycle through placed objects, arrow keys to move the selected object in 1-unit increments, Delete to remove.
- Keyboard shortcuts: `Ctrl+Z` / `Cmd+Z` for undo, `Ctrl+Y` / `Cmd+Y` for redo.

**No drag required for primary actions**:
- Drag-and-drop from the library to canvas is the primary interaction model, but every object can also be placed by: (1) tapping the object thumbnail to select it, then (2) tapping on the canvas to place it. This two-tap model is fully keyboard-accessible and works for users who cannot drag.

**No time pressure**:
- No timed elements. No auto-dismissing modals (Spark messages fade after 15 seconds, but are accessible in the message history panel).
- No sequences that require completing an action within a time window.

### Cognitive Accessibility

**Simple language**:
- All UI copy is written at a Grade 3 reading level (consistent with Spark's voice guidelines).
- Action labels are one or two words: "Save", "Play", "Add Object", "Back".
- Error messages are written without technical language: "That didn't work — try again?" not "Request failed with status 500."

**Visual cues over text**:
- Object categories in the library are represented by icon + label. The icon is the primary affordance; text is supplementary.
- Status states (saving, saved, error) use icon + color + brief text: a checkmark icon + "Saved" not just a green flash.
- Spark messages include Spark's avatar icon to provide a visual anchor for who is speaking.

**Predictable and consistent UI**:
- The toolbar is always at the top. The object library is always on the left (or bottom on mobile). Spark is always on the right (or a floating button on mobile). This layout never changes based on context.
- Panels open and close consistently with the same animations at the same speeds.
- Actions are reversible: undo for object placement, "Keep Private" default for sharing, no destructive actions without confirmation.

**Reduced cognitive load for young children**:
- The object library shows at most 8 objects per category without scrolling. Groupings use emotional/sensory labels ("cozy things," "wild things," "magical things") rather than taxonomic categories.
- Progressive disclosure: the properties panel (color, texture, scale) only appears when an object is selected. Children who do not need it are not distracted by it.
- Spark messages are a maximum of 2 sentences. Short messages are less cognitively demanding for early readers.

### Cultural Inclusion

**Neutral and diverse themes**:
- The 6 environment themes (meadow, forest, ocean, desert, night sky, snowy peak) are geographically neutral — no theme is specifically tied to a single cultural context.
- The object catalog includes objects from multiple cultural contexts (e.g., yurt, pagoda, adobe house, treehouse, igloo are all in the "shelter" category alongside each other).
- No theme is labeled as "exotic" or "foreign."

**Diverse character representations**:
- Character and figure objects in the catalog (people, animals, mythical creatures) are represented with visual diversity in skin tones, body types, and styles where characters are depicted.
- No default "generic" human is white or has a specific gender presentation. Character figures are stylized and non-realistic to minimize projection of specific demographics.

**Language and script**:
- The platform UI is English for MVP. Internationalization infrastructure (i18n keys, RTL layout support) is built into the component architecture from the start so that localization does not require component rewrites.
- Spark's system prompt instructs it to respond in the language the child writes in. A child who types in Spanish will receive a Spanish response.

**Avoiding cultural harm**:
- The object catalog is reviewed before each release for cultural stereotypes or insensitive representations.
- No object in the catalog is a cultural artifact used as a decoration or prop without context (e.g., totem poles, dreamcatchers are not included as generic decorative objects).

---

## 6. Reporting and Oversight

### Teacher Dashboard: AI Interaction Review

Teachers can review all AI conversations for students in their class via `/teacher/challenges/:id/progress` and a dedicated AI log view.

The AI log view shows:
- Student display name + avatar
- World title
- Each Spark message and the child's reply (if any)
- Timestamp
- A flag button to mark a conversation for follow-up

**What teachers see**: The full text of Spark's messages and the child's replies. Teachers do not see the world context blocks or technical parameters sent to the API.

**What teachers cannot do**: Teachers cannot edit AI conversation records. The log is read-only and append-only.

### Flag System

Any AI conversation can be flagged by a teacher. Flags are stored in a `conversation_flags` table (MVP: a simple boolean `is_flagged` column added to `ai_conversations`).

A flagged conversation:
- Appears at the top of the teacher's AI log view with a warning icon.
- Can have a teacher note added (text field, stored in the flag record, not in the conversation record).
- Can be unflagged by the teacher once reviewed.

There is no automated flagging in MVP. All flags are manually set by teachers. Automated flagging (based on blocklist hits) is a P1 roadmap item.

### Server-Side Logging of Safety Events

Two categories of server-side logs are written by `ai-service.ts` and the input/output filters:

**Input blocked log**:
```json
{
  "event": "input_blocked",
  "worldId": "world_abc",
  "timestamp": 1746000000,
  "blockedTermMatch": true
}
```
Note: The blocked message text is NOT logged. Only the `worldId` and the fact that blocking occurred. This prevents the log system from becoming a repository of inappropriate content.

**Output blocked log**:
```json
{
  "event": "output_blocked",
  "worldId": "world_abc",
  "timestamp": 1746000000,
  "fallbackUsed": "after_placement"
}
```

These logs are written to the server's standard output (captured by the deployment platform). They are not stored in the SQLite database. They are accessible to infrastructure administrators for monitoring. The `worldId` can be cross-referenced by teachers if needed.

### Rate Limit: 30 AI Interactions Per Session

The 30-interaction limit per session is enforced in `ai-service.ts`:

```typescript
// src/lib/services/ai-service.ts

async function getPromptResponse(params: AIPromptParams): Promise<string> {
  const conversation = await ConversationRepository.getByWorldId(params.worldId);
  const messageCount = JSON.parse(conversation?.messages_json ?? '[]').length;

  if (messageCount >= 30) {
    return "Spark is taking a break — keep building!";
  }

  // ... continue with API call
}
```

When the limit is reached:
- The client disables the Spark input field.
- A persistent (non-dismissible) message appears: "Spark has said a lot today — your world is yours now. Keep building!"
- The builder continues to function normally; only the AI companion is paused.
- The limit resets when the child starts a new session (page reload or new world).

### Session Monitoring (Teacher)

The teacher dashboard at `/teacher/challenges/:id/progress` shows:

| Column | Value |
|--------|-------|
| Student | Display name + avatar |
| Status | Not Started / In Progress / Submitted |
| Last Edit | Relative timestamp ("2 hours ago") |
| AI Messages | Count of Spark exchanges for this world |
| Actions | View World, View AI Log, Flag |

The "AI Messages" count gives teachers a quick signal for unusual AI usage patterns (e.g., a student who has had 28 AI interactions but has not placed any objects may need support).

Teachers cannot see real-time activity — the dashboard refreshes on page load. Real-time monitoring is out of scope for MVP.

### Data Retention for AI Conversations

AI conversation records (`ai_conversations`) are retained for the lifetime of the world. When a world is deleted, all associated conversation records are cascade-deleted.

Teachers may request bulk export of AI conversation logs for a class (for safeguarding documentation purposes). This is a manual process for MVP: an administrator exports the relevant `ai_conversations` rows for the teacher's class and provides them as a JSON file. Automated export is a P2 roadmap item.

### Incident Response

If a serious safety concern is identified (e.g., a child's AI interaction suggests they are in danger), the teacher reporting pathway is:

1. Teacher flags the conversation in the dashboard.
2. Teacher contacts the school safeguarding lead through normal school protocols.
3. The flagged conversation record serves as the platform-side documentation.

WorldCraft Kids does not have a direct hotline to child safety authorities — this is the school's responsibility through their existing safeguarding procedures. The platform's role is to make the relevant information (the flagged conversation) easily accessible to the responsible adult.

---

*Document owner: Product + Engineering — WorldCraft Kids*  
*Legal review required before public launch*  
*Next review: Sprint 1 kickoff*
