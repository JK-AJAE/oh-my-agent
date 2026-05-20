---
name: "process-mapping"
description: "process mapping method. process-analyst agent work flow analysisand visualizationto do when reference mapping technique and tabletechnique. 'SIPOC', 'process map', 'Value Stream Map' request when usage. However, BPM whensystem building specialist development scope outside."
category: "utility"
---

# Process Mapping — process mapping method

process-analyst agent work flow analysis quality mapping technique.

## SIPOC analysis framework

### SIPOC template

| S (Supplier) | I (Input) | P (Process) | O (Output) | C (Customer) |
|-------------|-----------|-------------|-----------|-------------|
| gradespecialist/beforestage | input specialistKRW/information | core process | deliverable | client/nextstage |

### writing rule
1. **Process ** — core process 5~7stage definition
2. **Output next** — each stage deliverable specify
3. **Customer identification** — deliverable receivespecialist
4. **Input tracking** — process perform neededKorean input
5. **Supplier identify** — input gradespecialist

### examplewhen: client weekdocument processing

| S | I | P | O | C |
|---|---|---|---|---|
| client | weekdocument | 1. weekdocument number | number confirm | client |
| re- whensystem | re- information | 2. re- confirm | department | logisticsteam |
| whensystem | information | 3. processing | complete | financialteam |
| logisticsteam | | 4. / | | company |
| company | | 5. | number confirm | client |

## process map tabletechnique

### BPMN between tablebasis

| basis | Mermaid tablecurrent | un- |
|------|-------------|------|
| KRW | `((whenwork))` | whenwork/ event |
| companyeach | `[task]` | / |
| | `{judgment}` | (minutebasis) |
| number | `subgraph` | departmentfrom/role minute |

### (Swim Lane)
