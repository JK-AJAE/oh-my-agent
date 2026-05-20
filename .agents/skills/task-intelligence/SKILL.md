---
name: "task-intelligence"
description: "Protocolo de Inteligência Pré-Tarefa — ativa TODOS os agentes relevantes do ecossistema ANTES de executar qualquer tarefa solicitada pelo usuário."
category: "custom-skill"
trigger: "/task-intelligence"
---

# Task Intelligence — Protocolo de Amplificação Pré-Tarefa

## Overview

Protocolo de Inteligência Pré-Tarefa — ativa TODOS os agentes relevantes do ecossistema ANTES de executar qualquer tarefa solicitada pelo usuário. Enriquece o contexto com análise paralela multi-agente, produz estimativa real de tempo (início→fim), mapeia problemas prováveis e improvável, e formula um plano de execução antecipado com estratégias de contingência.

## When to Use This Skill

- When the user mentions "pre-task briefing" or related topics
- When the user mentions "briefing tarefa" or related topics
- When the user mentions "plano execucao tarefa" or related topics
- When the user mentions "antes de executar analise" or related topics
- When the user mentions "task intelligence" or related topics
- When the user mentions "consultar agentes paralelo" or related topics

## Do Not Use This Skill When

- The task is unrelated to task intelligence
- A simpler, more specific tool can handle the request
- The user needs general-purpose assistance without domain expertise

## How It Works

Antes de qualquer execução, este agente realiza um **briefing inteligente completo**:

1. **Ativa todos os agentes relevantes em paralelo** — cada um analisa a tarefa pela sua ótica
2. **Sintetiza o conhecimento coletivo** em um plano unificado
3. **Estima tempo real** do início ao fim (com breakdown por etapa)
4. **Mapeia problemas prováveis** e os resolve antecipadamente
5. **Define pontos de verificação** para detectar desvios antes que virem bloqueadores

A razão central: executar uma tarefa sem esse briefing é como cirurgiar sem exame pré-operatório.
O custo de 30-60 segundos de análise paralela elimina horas de retrabalho.

---

## Fase 1 — Classificação Da Tarefa (5-10 Segundos)

Antes de qualquer coisa, classifique a tarefa em uma das categorias:

| Categoria | Exemplos | Nível de Briefing |
|-----------|---------|-------------------|
| **Simples** | responder pergunta, explicar conceito, pequena edição | Mínimo (só scan) |
| **Moderada** | criar arquivo, modificar skill, instalar dependência | Normal (scan + match + estimativa) |
| **Complexa** | criar skill nova, integração API, arquitetura, refatoração | Completo (todos os passos abaixo) |
| **Crítica** | ações irreversíveis, deploys, delete, reset, modificar infra | Máximo + confirmação explícita |

Para tarefas **Simples**, execute normalmente sem briefing completo.
Para **Moderada**, **Complexa** e **Crítica**, execute o protocolo completo abaixo.

---

## Fase 2 — Scan E Match Paralelo

Execute simultaneamente:
