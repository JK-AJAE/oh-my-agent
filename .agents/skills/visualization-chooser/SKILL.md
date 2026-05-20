---
name: "visualization-chooser"
description: "Visualization type selection matrix by data type and analysis purpose, matplotlib/seaborn/plotly implementation pattern guide. Use this skill for data visualization design involving 'visualization selection', 'chart type', 'graph types', 'matplotlib', 'seaborn', 'plotly', 'heatmap', 'scatter plot', 'box plot', 'dashboard layout', etc. Enhances the visualizer's visualization design capabilities. Note: statistical analysis and data cleaning are outside this skill's scope."
category: "utility"
---

# Visualization Chooser — Visualization Type Selection Matrix Guide

A framework for selecting optimal visualizations based on data type and communication purpose.

## Visualization Selection Matrix

### Comparison

| Purpose | Chart | Suitable | Example |
|---------|-------|----------|---------|
| Item comparison | Bar chart | 5-15 categories | Sales by product |
| Time trend comparison | Line chart | Continuous time, 2-5 series | Monthly sales trend |
| Part-to-whole | Stacked bar | Ratio comparison | Sales by channel share |
| Few ratios | Pie chart | 2-5 items only | Market share |
| Many ratios | Treemap | Hierarchical data | Sales by category |

### Distribution

| Purpose | Chart | Suitable | Example |
|---------|-------|----------|---------|
| Single distribution | Histogram | Continuous variable | Age distribution |
| Distribution comparison | Box plot | Group comparison | Salary by department |
| Density comparison | Violin plot | Distribution shape matters | Score distribution |
| Outlier emphasis | Strip plot | Small data | Individual data points |

### Relationship

| Purpose | Chart | Suitable | Example |
|---------|-------|----------|---------|
| Two-variable relationship | Scatter plot | Continuous×Continuous | Ad spend vs sales |
| Multi-variable correlation | Heatmap | Correlation matrix | Inter-variable correlation |
| Trend line | Regression plot | Linear relationship | Experience vs salary |
| Density scatter | 2D density | Too many data points | Location data |
| Bubble chart | Scatter + size | 3 variables | GDP/population/life expectancy by country |

### Time

| Purpose | Chart | Suitable | Example |
|---------|-------|----------|---------|
| Trend | Line chart | Continuous time series | Daily stock price |
| Seasonality | Decomposition chart | Periodic patterns | Monthly electricity usage |
| Event highlight | Annotated line | Specific time points | Marketing campaign effect |
| Range | Area chart | Cumulative/ratio | Traffic by channel |

## Implementation Code Patterns

### Font Configuration (Essential for non-Latin scripts)
