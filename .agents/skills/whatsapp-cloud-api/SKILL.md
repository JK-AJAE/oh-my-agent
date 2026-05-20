---
name: "whatsapp-cloud-api"
description: "Integracao com WhatsApp Business Cloud API (Meta). Mensagens, templates, webhooks HMAC-SHA256, automacao de atendimento. Boilerplates Node.js e Python."
category: "custom-skill"
trigger: "/whatsapp-cloud-api"
---

# WhatsApp Cloud API - Integracao Profissional

## Overview

Integracao com WhatsApp Business Cloud API (Meta). Mensagens, templates, webhooks HMAC-SHA256, automacao de atendimento. Boilerplates Node.js e Python.

## When to Use This Skill

- When the user mentions "whatsapp" or related topics
- When the user mentions "whatsapp business" or related topics
- When the user mentions "api whatsapp" or related topics
- When the user mentions "chatbot whatsapp" or related topics
- When the user mentions "mensagem whatsapp" or related topics
- When the user mentions "template whatsapp" or related topics

## Do Not Use This Skill When

- The task is unrelated to whatsapp cloud api
- A simpler, more specific tool can handle the request
- The user needs general-purpose assistance without domain expertise

## How It Works

Skill para implementar integracoes profissionais com WhatsApp Business usando a Cloud API oficial da Meta. Suporta Node.js/TypeScript e Python.

### Overview

A WhatsApp Cloud API e a API oficial da Meta para envio e recebimento de mensagens via WhatsApp Business. Desde outubro 2025, e a unica opcao suportada (a API On-Premises foi descontinuada).

**Versao da API:** Graph API v21.0 (2026)
**Base URL:** `https://graph.facebook.com/v21.0/{phone-number-id}/messages`
**Autenticacao:** Bearer Token (System User Token para producao)

**Pricing 2026 (por mensagem):**

| Categoria      | Custo             | Quando cobrado                          |
|----------------|-------------------|-----------------------------------------|
| Marketing      | $0.025-$0.1365    | Campanhas, promocoes                    |
| Utility        | $0.004-$0.0456    | Confirmacoes de pedido, atualizacoes    |
| Authentication | $0.004-$0.0456    | OTP, reset de senha                     |
| Service        | GRATIS            | Resposta dentro da janela de 24h        |

**Pre-requisitos:**
- Conta Meta Business Suite (gratuita)
- App no Meta for Developers com produto WhatsApp
- Numero de telefone verificado
- System User Token (permanente)

Se o usuario nao tem conta Meta Business, leia `references/setup-guide.md` para o guia completo de setup do zero.

---

## Decision Tree

Use esta arvore para determinar o proximo passo:
