---
name: "ml-pipeline-workflow"
description: "Complete end-to-end MLOps pipeline orchestration from data preparation through model deployment."
category: "custom-skill"
trigger: "/ml-pipeline-workflow"
---

# ML Pipeline Workflow

Complete end-to-end MLOps pipeline orchestration from data preparation through model deployment.

## Do not use this skill when

- The task is unrelated to ml pipeline workflow
- You need a different domain or tool outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.
- If detailed examples are required, open `resources/implementation-playbook.md`.

## Overview

This skill provides comprehensive guidance for building production ML pipelines that handle the full lifecycle: data ingestion → preparation → training → validation → deployment → monitoring.

## Use this skill when

- Building new ML pipelines from scratch
- Designing workflow orchestration for ML systems
- Implementing data → model → deployment automation
- Setting up reproducible training workflows
- Creating DAG-based ML orchestration
- Integrating ML components into production systems

## What This Skill Provides

### Core Capabilities

1. **Pipeline Architecture**
   - End-to-end workflow design
   - DAG orchestration patterns (Airflow, Dagster, Kubeflow)
   - Component dependencies and data flow
   - Error handling and retry strategies

2. **Data Preparation**
   - Data validation and quality checks
   - Feature engineering pipelines
   - Data versioning and lineage
   - Train/validation/test splitting strategies

3. **Model Training**
   - Training job orchestration
   - Hyperparameter management
   - Experiment tracking integration
   - Distributed training patterns

4. **Model Validation**
   - Validation frameworks and metrics
   - A/B testing infrastructure
   - Performance regression detection
   - Model comparison workflows

5. **Deployment Automation**
   - Model serving patterns
   - Canary deployments
   - Blue-green deployment strategies
   - Rollback mechanisms

### Reference Documentation

See the `references/` directory for detailed guides:
- **data-preparation.md** - Data cleaning, validation, and feature engineering
- **model-training.md** - Training workflows and best practices
- **model-validation.md** - Validation strategies and metrics
- **model-deployment.md** - Deployment patterns and serving architectures

### Assets and Templates

The `assets/` directory contains:
- **pipeline-dag.yaml.template** - DAG template for workflow orchestration
- **training-config.yaml** - Training configuration template
- **validation-checklist.md** - Pre-deployment validation checklist

## Usage Patterns

### Basic Pipeline Setup
