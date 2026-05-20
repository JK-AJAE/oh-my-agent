---
name: "skill-router"
description: "Use when the user is unsure which skill to use or where to start. Interviews the user with targeted questions and recommends the best skill(s) from the installed library for their goal."
category: "custom-skill"
trigger: "/skill-router"
---

# Skill Router

## When to Use
Use this skill when:
- The user says "I don't know where to start" or "which skill should I use"
- The user has a vague goal without a clear method
- The user asks "what should I use for..." or "I'm not sure how to approach this"
- The user is new to the skill library and needs guidance

## Goal

Help users who are unsure of what they want to do or which skill to use.
Interview them with a short structured conversation, then recommend the most
relevant skill(s) from the installed library — with a clear explanation of
why each skill fits and exactly how to invoke it.

---

## Instructions

### Step 1 — Acknowledge and open the interview

Respond warmly and tell the user you'll ask a few quick questions to find
the right skill for them. Do NOT suggest any skills yet.

Example opener:
> "No problem — let me ask you a few quick questions so I can point you to
> exactly the right skill."

---

### Step 2 — Ask the Funnel Questions (one at a time, in order)

Ask only what you need. If an earlier answer makes a later question
irrelevant, skip it.

**Q1 — What is the broad area of the task?**
Present these as numbered options:
1. Building / coding something (app, feature, component, script)
2. Fixing or debugging something that's broken
3. Security, pentesting, or vulnerability assessment
4. AI agents, LLMs, or automation pipelines
5. Marketing, SEO, content, or growth
6. DevOps, infrastructure, deployment, or git
7. Design, UI/UX, or creative output
8. Planning, strategy, or documentation
9. Something else (ask them to describe it)

**Q2 — How specific is the task?**
1. I have a clear spec / I know exactly what I want built
2. I have a rough idea but need help shaping it
3. I'm totally starting from scratch with no clear direction

**Q3 — What tech stack or domain is involved?** (only ask if relevant)
Examples: React / Next.js, Node.js, Python, AWS, Stripe, AI/LLM, no-code, etc.
If they say "not sure" or "any", that's fine — move on.

**Q4 — Do you want to work autonomously (agent does everything) or
collaboratively (you stay in the loop)?**
1. Fully autonomous — just go
2. Collaborative — I want to review/approve steps
3. Not sure yet

---

### Step 3 — Recommend skills

Based on their answers, recommend **1 primary skill** and up to **2 secondary
skills**. Structure your recommendation exactly like this:

**✅ Primary Skill: `@skill-name`**
*Why:* [1–2 sentences explaining why this is the best fit for what they described]
*Invoke it like this:*
