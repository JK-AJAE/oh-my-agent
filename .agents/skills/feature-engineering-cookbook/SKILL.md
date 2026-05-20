---
name: "feature-engineering-cookbook"
description: "Feature engineering techniques catalog: numeric/categorical/time-series/text transformations, feature selection, feature store design. Use this skill for data preprocessing and feature design involving 'feature engineering', 'variable transformation', 'encoding', 'scaling', 'feature selection', 'feature store', 'feature importance', etc. Enhances the data-engineer's feature engineering capabilities. Note: model design and training management are outside this skill's scope."
category: "utility"
---

# Feature Engineering Cookbook — Feature Engineering Techniques Catalog

Transformation techniques by data type, feature selection methods, and feature store design guide.

## Numeric Transformations

### Scaling

| Method | Formula | Suitable | Not Suitable |
|--------|---------|----------|-------------|
| StandardScaler | (x - μ) / σ | Normal distribution, SVM, logistic regression | Sensitive to outliers |
| MinMaxScaler | (x - min) / (max - min) | [0,1] required, neural networks | Sensitive to outliers |
| RobustScaler | (x - Q2) / (Q3 - Q1) | When outliers exist | — |
| PowerTransformer | Box-Cox / Yeo-Johnson | Highly skewed distributions | Negative values (Box-Cox) |
| QuantileTransformer | Quantile-based | Uniform/normal distribution transformation | Destroys order relationships |

### Binning (Discretization)
