---
name: "claude-monitor"
description: "Monitor de performance do Claude Code e sistema local. Diagnostica lentidao, mede CPU/RAM/disco, verifica API latency e gera relatorios de saude do sistema."
category: "custom-skill"
trigger: "/claude-monitor"
---

# Claude Monitor — Diagnóstico de Performance

## Overview

Monitor de performance do Claude Code e sistema local. Diagnostica lentidao, mede CPU/RAM/disco, verifica API latency e gera relatorios de saude do sistema.

## When to Use This Skill

- When the user mentions "lento" or related topics
- When the user mentions "lentidao" or related topics
- When the user mentions "lag" or related topics
- When the user mentions "lagado" or related topics
- When the user mentions "travando" or related topics
- When the user mentions "claude lento" or related topics

## Do Not Use This Skill When

- The task is unrelated to claude monitor
- A simpler, more specific tool can handle the request
- The user needs general-purpose assistance without domain expertise

## How It Works

Skill para diagnosticar e resolver problemas de lentidão no Claude Code e no sistema.
Determina se o gargalo é local (PC) ou remoto (API Claude) e sugere ações corretivas.

## Quando Usar

- Usuário reclama que o Claude Code está lento ou travando
- Troca de sessões de conversa demora para carregar
- Respostas do Claude demoram muito
- PC parece lento enquanto usa o Claude Code
- Qualquer menção a performance, lag, lentidão

## 1. Diagnóstico Rápido (Health_Check.Py)

Rode SEMPRE como primeiro passo:
