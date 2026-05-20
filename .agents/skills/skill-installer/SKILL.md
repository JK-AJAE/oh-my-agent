---
name: "skill-installer"
description: "Instala, valida, registra e verifica novas skills no ecossistema. 10 checks de seguranca, copia, registro no orchestrator e verificacao pos-instalacao."
category: "custom-skill"
trigger: "/skill-installer"
---

# Skill Installer v3.0

## Overview

Instala, valida, registra e verifica novas skills no ecossistema. 10 checks de seguranca, copia, registro no orchestrator e verificacao pos-instalacao.

## When to Use This Skill

- When the user mentions "instalar skill" or related topics
- When the user mentions "install skill" or related topics
- When the user mentions "registrar skill" or related topics
- When the user mentions "nova skill" or related topics
- When the user mentions "new skill" or related topics
- When the user mentions "adicionar skill ao ecossistema" or related topics

## Do Not Use This Skill When

- The task is unrelated to skill installer
- A simpler, more specific tool can handle the request
- The user needs general-purpose assistance without domain expertise

## How It Works

Agente instalador enterprise-grade que garante que toda skill criada (via skill-creator
ou manualmente) seja corretamente instalada, registrada e verificada no ecossistema.
Inclui auto-repair, rollback, dry-run, dashboard, e diagnostico avancado.

## Principio: Redundancia Maxima

Seis camadas de validacao garantem que nenhuma skill fique mal-instalada:

| Camada | Script | O que valida |
|--------|--------|-------------|
| 1 | detect_skills.py | SKILL.md existe + tem frontmatter |
| 2 | validate_skill.py | 10 checks profundos |
| 3 | install_skill.py (pre) | Conflitos, permissoes, espaco, versao |
| 4 | install_skill.py (pos) | Arquivos copiados corretamente |
| 5 | scan_registry.py | Skill aparece no registry (com deduplicacao) |
| 6 | package_skill.py | ZIP valido sem backslashes, nao-vazio, integrity check |

---

## Localizacao
