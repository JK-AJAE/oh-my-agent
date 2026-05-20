---
name: "financial-ratio-analyzer"
description: "A specialized skill that deepens financial ratio analysis for investor report writing. Provides the financial-analyst agent with a systematic ratio analysis framework when analyzing P&L, cash flow, and financial metrics. Automatically applied in contexts such as 'financial ratio analysis', 'profitability metrics', 'liquidity analysis', 'leverage ratios', 'DuPont analysis'. However, providing audit opinions or GAAP/IFRS conversion work are outside the scope of this skill."
category: "infrastructure"
---

# Financial Ratio Analyzer — Financial Ratio Deep Analysis Tool

A specialized skill that enhances the financial analysis capabilities of the financial-analyst agent.

## Target Agent

- **financial-analyst** — Uses this skill's framework during financial ratio analysis

## 5 Financial Ratio Categories

### 1. Profitability Ratios

| Ratio | Formula | Interpretation Criteria | Industry Benchmarks |
|-------|---------|------------------------|---------------------|
| Gross Margin | (Revenue - COGS) / Revenue x 100 | 40%+ Excellent | SaaS 70-80%, Manufacturing 25-35% |
| Operating Margin | Operating Income / Revenue x 100 | 15%+ Good | SaaS 20-30%, Retail 3-5% |
| Net Margin | Net Income / Revenue x 100 | 10%+ Healthy | SaaS 15-25%, Construction 2-4% |
| ROE | Net Income / Equity x 100 | 15%+ Target | Industry Average 10-12% |
| ROA | Net Income / Total Assets x 100 | 5%+ Healthy | Finance 0.5-1%, IT 8-15% |
| ROIC | NOPAT / Invested Capital x 100 | Value creation when exceeding WACC | WACC+3%p+ Excellent |

### 2. Liquidity Ratios

| Ratio | Formula | Safety Criteria |
|-------|---------|----------------|
| Current Ratio | Current Assets / Current Liabilities | 150-200% Good |
| Quick Ratio | (Current Assets - Inventory) / Current Liabilities | 100%+ Healthy |
| Cash Ratio | Cash & Equivalents / Current Liabilities | 20%+ Minimum |
| Cash Runway | Cash / Monthly Burn Rate | 18+ months recommended for startups |

### 3. Leverage Ratios

| Ratio | Formula | Warning Level |
|-------|---------|---------------|
| Debt-to-Equity | Total Debt / Equity x 100 | Caution above 200% |
| Interest Coverage | EBIT / Interest Expense | Risk below 3x |
| Net Debt/EBITDA | (Debt - Cash) / EBITDA | Caution above 3x |
| Equity Ratio | Equity / Total Assets x 100 | 30%+ Healthy |

### 4. Efficiency Ratios

| Ratio | Formula | Improvement Direction |
|-------|---------|----------------------|
| Receivables Turnover | Revenue / Average Receivables | Higher is better |
| Inventory Turnover | COGS / Average Inventory | Varies by industry |
| CCC (Cash Conversion Cycle) | DSO + DIO - DPO | Lower is better |

### 5. Growth Ratios

| Ratio | Formula | Startup Criteria |
|-------|---------|------------------|
| Revenue Growth | (Current - Prior) / Prior x 100 | T2D3: 3x→3x→2x→2x→2x |
| EPS Growth | (Current EPS - Prior EPS) / Prior EPS x 100 | Public 15%+ Excellent |

## DuPont Analysis Framework

Decompose ROE into 3 components to identify root causes of profitability:
