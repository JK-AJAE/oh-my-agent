---
name: "translation-quality-mqm"
description: "MQM(Multidimensional Quality Metrics) Translation Quality Framework, error classification , severity weight, score calculation Formula quality-reviewer Extended Skill. 'MQM ', 'Translation Quality ', 'error classification', 'Translation QA', 'Quality ric' etc. Translation Qualityof Verification . , Translation Localization application of ."
category: "utility"
---

# Translation Quality MQM — Translation Quality Assessment Framework

MQM error classification, severity system, and score calculation formulas used by the quality-reviewer agent when verifying translation quality.

## subject Agent

`quality-reviewer` — of MQM Framework Translation Quality in apply.

## MQM error classification 

### 1: vs (7 )

| | | description | weight |
|------|------|------|--------|
| **Accuracy** (Accuracy) | ACC | Source text ofof before | x2.0 |
| **Fluency** (Fluency) | FLU | Target languageof | x1.5 |
| **Terminology** (Terminology) | TER | Terminology Consistencyand Accuracy | x1.5 |
| **Style** (Style) | STY | Text typein Writing style | x1.0 |
| **to** (Locale) | LOC | Localization | x1.5 |
| **Design** (Design) | DES | , Layout, | x0.5 |
| **** (Verity) | VER | relationship, Accuracy | x2.0 |

### 2: type

#### ACC (Accuracy)
| | type | description | when |
|------|------|------|------|
| ACC-ADD | andTranslation | Source textin Information | "good" → " " |
| ACC-OMI | omission | Source text Information Translation | omission |
| ACC-MIS | mistranslation | of | "decrease" → "" |
| ACC-UNT | Translation | Source text vsto | Translation subject |
| ACC-AMB | duringof | Translation | |

#### FLU (Fluency)
| | type | description |
|------|------|------|
| FLU-GRA | | , , when, |
| FLU-PUN | | , , |
| FLU-SPE | customized | , |
| FLU-REG | language etc. | Formality level |
| FLU-AWK | | |

#### TER (Terminology)
| | type | description |
|------|------|------|
| TER-INC | Terminology | Glossaryand Translation |
| TER-DNT | DNT | Translation Terminology Translation |
| TER-WRG | Terminology | Industry standardsand Terminology |

#### LOC (to)
| | type | description |
|------|------|------|
| LOC-DAT | Date Format | Date application |
| LOC-NUM | number Format | , |
| LOC-CUR | Currency Format | Currency , |
| LOC-UNI | Units of measurement | /, / |
| LOC-CUL | | and conflict expression |

## severity etc.

| etc. | | | |
|------|------|------|------|
| **** (Critical) | CRI | 25 | of before , , expression |
| **major** (Major) | MAJ | 10 | of , |
| **** (Minor) | MIN | 1 | Style , |

## score calculation Formula
