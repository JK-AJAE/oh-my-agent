---
name: "sentiment-scoring"
description: "Sentiment analysis scoring framework. Referenced by the sentiment-analyst agent for systematic sentiment classification and scoring of text data. Used for 'sentiment analysis', 'emotion score', 'NPS analysis' requests. Note: ML model training and NLP pipeline development are out of scope."
category: "utility"
---

# Sentiment Scoring

Enhances the sentiment-analyst agent's sentiment classification and scoring capabilities.

## Sentiment Classification System

### 3-Level Basic Classification

| Classification | Score Range | Signal Words |
|---------------|------------|--------------|
| Positive | +0.5 to +1.0 | good, satisfied, recommend, convenient, best |
| Neutral | -0.5 to +0.5 | average, okay, so-so |
| Negative | -1.0 to -0.5 | dissatisfied, disappointed, worst, inconvenient, slow |

### 5-Level Detailed Classification

| Classification | Score | Expression Examples |
|---------------|-------|-------------------|
| Very Positive | +0.8 to +1.0 | "Absolutely the best!", "Highly recommend" |
| Positive | +0.3 to +0.7 | "Pretty good", "Satisfied" |
| Neutral | -0.2 to +0.2 | "It's average", "Not bad" |
| Negative | -0.7 to -0.3 | "Somewhat inconvenient", "Below expectations" |
| Very Negative | -1.0 to -0.8 | "Never using this again", "Worst ever" |

## Sentiment Analysis Methodology

### Rule-based Analysis
