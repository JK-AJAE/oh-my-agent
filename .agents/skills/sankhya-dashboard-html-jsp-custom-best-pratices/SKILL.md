---
name: "sankhya-dashboard-html-jsp-custom-best-pratices"
description: "This skill should be used when the user asks for patterns, best practices, creation, or fixing of Sankhya dashboards using HTML, JSP, Java, and SQL."
category: "custom-skill"
trigger: "/sankhya-dashboard-html-jsp-custom-best-pratices"
---

# sankhya-dashboard-html-jsp-custom-best-pratices

## Purpose

To provide a consolidated guide of patterns and best practices for creating and maintaining dashboards, SQL queries, BI parameterization, and UI/UX within the Sankhya ecosystem (JSP/HTML/Java).

## When to Use This Skill

This skill should be used when:
- The user asks about "boas praticas do sankhya" or "Sankhya best practices".
- The user mentions "dashboard sankhya" or is working on a Sankhya BI dashboard.
- The user asks for anything related to the word "Sankhya".
- The user wants to create or modify code files for Sankhya dashboards.

## Core Capabilities

1. **Code Generation & Review**: Apply JSP/JSTL patterns and server-side organization to reduce compilation errors and rendering failures.
2. **Visual Consistency**: Standardize visual identity in BI components using predefined CSS tokens.
3. **Database Exploration**: Structure data exploration queries for performance and correct mapping of Sankhya entities.
4. **BI Construction Guide**: Use the HTML5 component flow in BI to ensure correct rendering, reactivity, and navigation.

## Patterns

### Melhores Práticas de Código
Aplicar padrões de JSP/JSTL e organização server-side para reduzir erros de compilação, falhas de renderização e regressões em dashboards/telas.

**Diretrizes de implementação**
- Declarar diretivas JSP e taglibs obrigatórias no topo do arquivo.
- Forçar `isELIgnored="false"` para habilitar `${...}` em tempo de renderização.
- Preferir `core_rt` para JSTL core no ecossistema Sankhya.
- Evitar scriptlets Java em JSP; usar JSTL (`c:if`, `c:choose`, `c:forEach`).
- Modularizar lógica de negócio (camadas/serviços), evitando acoplamento em arquivo único.
- Evitar hardcode de credenciais, URLs sensíveis e tokens.
- Modelar estado global da UI (dados, filtros, ordenação, aba ativa) e resetar estado antes de novo carregamento.
- Persistir preferências de visualização no `localStorage` (ordem de colunas e ordenação).
- Implementar carregamento sob demanda para abas/modais pesados (lazy-load) para reduzir tempo inicial.
- **Blindagem de Parâmetros**: Sempre definir um valor padrão (fallback) para parâmetros de URL via `c:set` para evitar Erro 500 no servidor Java do Sankhya.
- **Separação de Camadas (JSP vs JS)**: Evitar injetar tags JSP diretamente dentro de blocos `<script>`. Utilizar containers HTML ocultos para passar dados ao JavaScript, mantendo a saúde do editor de código (IDE Linting).

> Os nomes de tabelas e campos abaixo são representativos e podem variar conforme a implementação da instância.
