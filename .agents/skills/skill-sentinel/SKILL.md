---
name: "skill-sentinel"
description: "Auditoria e evolucao do ecossistema de skills. Qualidade de codigo, seguranca, custos, gaps, duplicacoes, dependencias e relatorios de saude."
category: "custom-skill"
trigger: "/skill-sentinel"
---

# Skill Sentinel

## Overview

Auditoria e evolucao do ecossistema de skills. Qualidade de codigo, seguranca, custos, gaps, duplicacoes, dependencias e relatorios de saude.

## When to Use This Skill

- When the user mentions "auditar skills" or related topics
- When the user mentions "qualidade skills" or related topics
- When the user mentions "verificar skills ecossistema" or related topics
- When the user mentions "saude ecossistema skills" or related topics
- When the user mentions "skills duplicadas" or related topics
- When the user mentions "otimizar skills" or related topics

## Do Not Use This Skill When

- The task is unrelated to skill sentinel
- A simpler, more specific tool can handle the request
- The user needs general-purpose assistance without domain expertise

## How It Works

Meta-agente que monitora, audita e evolui o ecossistema de skills. Analisa
todas as skills em 7 dimensoes, identifica problemas, sugere melhorias
e recomenda novas skills especialistas.

## Resumo Rapido

| Area | Script | O que faz |
|------|--------|-----------|
| **Discovery** | `scanner.py` | Descobre todas as skills automaticamente |
| **Qualidade** | `analyzers/code_quality.py` | Complexidade, docstrings, error handling |
| **Seguranca** | `analyzers/security.py` | Secrets, SQL injection, HTTPS |
| **Performance** | `analyzers/performance.py` | API calls, caching, retry |
| **Governanca** | `analyzers/governance_audit.py` | Rate limits, audit log, confirmacoes |
| **Documentacao** | `analyzers/documentation.py` | SKILL.md, triggers, references |
| **Dependencias** | `analyzers/dependencies.py` | requirements.txt, versoes |
| **Cross-Skill** | `analyzers/cross_skill.py` | Duplicacao, padroes compartilhados |
| **Custos** | `cost_optimizer.py` | Tokens, verbosidade, output |
| **Recomendacoes** | `recommender.py` | Gap analysis, novas skills |
| **Relatorio** | `report_generator.py` | Markdown estruturado |
| **Orquestracao** | `run_audit.py` | CLI principal |

## Localizacao
