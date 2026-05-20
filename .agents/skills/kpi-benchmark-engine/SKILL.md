---
name: "kpi-benchmark-engine"
description: "A specialized skill providing industry-specific benchmark data and KPI selection frameworks for KPI dashboard design. Used by the kpi-designer agent when selecting key metrics and setting benchmarks. Automatically applied in contexts such as 'KPI benchmarks', 'key metric selection', 'performance indicators', 'OKR metrics', 'industry KPIs'. However, actual BI tool (Tableau, Power BI) dashboard implementation and real-time data pipeline construction are outside the scope of this skill."
category: "utility"
---

# KPI Benchmark Engine — KPI Benchmark and Selection Framework

A specialized skill that enhances the KPI design capabilities of the kpi-designer agent.

## Target Agent

- **kpi-designer** — Used for KPI selection, benchmark setting, and dashboard composition

## KPI Selection Framework: SMART-R

| Criterion | Description | Validation Question |
|-----------|------------|---------------------|
| **S**pecific | Specifically defined | "What is the exact formula for this KPI?" |
| **M**easurable | Quantitatively measurable | "Where is the data source?" |
| **A**ctionable | Drives action | "What action do we take when this KPI deteriorates?" |
| **R**elevant | Linked to strategic objectives | "Which strategic objective does this KPI contribute to?" |
| **T**ime-bound | Clear frequency | "What is the measurement frequency (daily/weekly/monthly/quarterly)?" |
| **R**eliable | Not gameable | "Can this KPI be gamed?" |

## Industry-Specific Core KPI Benchmarks

### SaaS / Software

| KPI | Seed | Series A | Series B+ | Public |
|-----|------|---------|----------|--------|
| ARR Growth | 200%+ | 100-200% | 50-100% | 20-40% |
| NRR | 100%+ | 110%+ | 115%+ | 120%+ |
| Gross Margin | 60%+ | 65%+ | 70%+ | 75%+ |
| CAC Payback (months) | <24 | <18 | <15 | <12 |
| LTV/CAC | >3x | >3x | >4x | >5x |
| Logo Churn (monthly) | <5% | <3% | <2% | <1% |

### E-commerce / D2C

| KPI | Early | Growth | Mature |
|-----|-------|--------|--------|
| GMV Growth | 100%+ | 40-80% | 15-25% |
| Take Rate | 5-15% | 10-20% | 15-25% |
| Repeat Purchase Rate | 20%+ | 30%+ | 40%+ |

### Fintech

| KPI | Benchmark |
|-----|-----------|
| TPV Growth | QoQ 20%+ |
| Revenue/TPV | 1-3% |
| Default Rate | <2% |

### Manufacturing / Hardware

| KPI | Benchmark |
|-----|-----------|
| OEE | 85%+ World-class |
| Yield | 95%+ |
| Raw Material Ratio | 30-50% |

## KPI Pyramid Structure
