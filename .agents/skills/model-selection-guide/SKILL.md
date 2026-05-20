---
name: "model-selection-guide"
description: "ML model selection matrix by problem type, hyperparameter tuning strategies, and ensemble methodology guide. Use this skill for ML model selection and design involving 'model selection', 'algorithm comparison', 'hyperparameter tuning', 'Optuna', 'ensemble', 'XGBoost vs LightGBM', 'model comparison', 'cross-validation', etc. Enhances the model-designer and evaluation-analyst's model design capabilities. Note: data preprocessing and training infrastructure management are outside this skill's scope."
category: "utility"
---

# Model Selection Guide — ML Model Selection Matrix Guide

Optimal model selection and tuning strategies based on problem type, data characteristics, and constraints.

## Model Recommendations by Problem Type

### Tabular Data

| Problem Type | Baseline | Best Candidates | Notes |
|-------------|----------|----------------|-------|
| Binary Classification | LogisticRegression | XGBoost, LightGBM | Tree-based usually optimal |
| Multi-class Classification | LogisticRegression(OVR) | LightGBM, CatBoost | CatBoost: many categoricals |
| Regression | LinearRegression | XGBoost, LightGBM | RandomForest: overfitting prevention |
| Ranking | — | LambdaMART (LightGBM) | Search/recommendation |
| Anomaly Detection | IsolationForest | AutoEncoder, LOF | Unsupervised/semi-supervised |
| Time Series | ARIMA | Prophet, LightGBM | Feature-based time-series: trees |

### Unstructured Data

| Data | Model | Framework |
|------|-------|-----------|
| Image | ResNet, EfficientNet, ViT | PyTorch, timm |
| Text | BERT, RoBERTa | HuggingFace Transformers |
| Audio | Whisper, Wav2Vec | HuggingFace |
| Graph | GCN, GAT | PyG, DGL |

## XGBoost vs LightGBM vs CatBoost

| Criterion | XGBoost | LightGBM | CatBoost |
|-----------|---------|----------|----------|
| Speed | Medium | Fast | Slow |
| Memory | High | Low | Medium |
| Categorical Handling | Encoding required | Built-in support | Best performance |
| Missing Value Handling | Built-in | Built-in | Built-in |
| Overfitting Prevention | regularization | GOSS, EFB | Ordered Boosting |
| GPU Support | ✅ | ✅ | ✅ |
| Default Recommendation | General purpose | Large data, speed priority | Many categoricals |

## Hyperparameter Tuning

### Optuna Basic Structure
