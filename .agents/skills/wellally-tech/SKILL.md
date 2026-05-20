---
name: "wellally-tech"
description: "Integrate multiple digital health data sources, connect to [WellAlly.tech](https://www.wellally.tech/) knowledge base, providing data import and knowledge reference for personal health management systems."
category: "custom-skill"
trigger: "/wellally-tech"
---

# WellAlly Digital Health Integration

Integrate multiple digital health data sources, connect to [WellAlly.tech](https://www.wellally.tech/) knowledge base, providing data import and knowledge reference for personal health management systems.

## When to Use
- You need to import or normalize health data from sources like Apple Health, Fitbit, Oura, or CSV/JSON exports.
- You want to connect personal health data workflows to the WellAlly.tech knowledge base.
- The task involves data import, health-data management, or article recommendations driven by user health context.

## Core Features

### 1. Digital Health Data Import
- **Apple Health (HealthKit)**: Export XML/ZIP file parsing
- **Fitbit**: OAuth2 API integration and CSV import
- **Oura Ring**: API v2 data synchronization
- **Generic Import**: CSV/JSON file import with field mapping

### 2. WellAlly.tech Knowledge Base Integration
- **Categorized Article Index**: Nutrition, fitness, sleep, mental health, chronic disease management
- **Intelligent Recommendations**: Recommend relevant articles based on user health data
- **URL References**: Provide direct links to [WellAlly.tech](https://www.wellally.tech/) platform

### 3. Data Standardization
- **Format Conversion**: Convert external data to local JSON format
- **Field Mapping**: Intelligently map data fields from different platforms
- **Data Validation**: Ensure completeness and accuracy of imported data

### 4. Intelligent Article Recommendations
- **Health Status Analysis**: Based on user health data analysis
- **Relevance Matching**: Recommend articles most relevant to user health conditions
- **Category Navigation**: Organize knowledge base articles by health topics

## Usage Instructions

### Trigger Conditions

Use this skill when users mention the following scenarios:

**Data Import**:
- ✅ "Import my health data from Apple Health"
- ✅ "Connect my Fitbit device"
- ✅ "Sync my Oura Ring data"
- ✅ "Import CSV health data file"
- ✅ "How to import fitness tracker/smartwatch data"

**Knowledge Base Query**:
- ✅ "Articles about hypertension on WellAlly platform"
- ✅ "Recommend some health management reading materials"
- ✅ "Recommend articles based on my health data"
- ✅ "WellAlly knowledge base articles about sleep"
- ✅ "How to improve my blood pressure (check knowledge base)"

**Data Management**:
- ✅ "What health data sources do I have"
- ✅ "Integrate health data from different platforms"
- ✅ "View imported external data"

### Execution Steps

#### Step 1: Identify User Intent

Determine what the user wants:
1. **Import Data**: Import data from external health platforms
2. **Query Knowledge Base**: Find [WellAlly.tech](https://www.wellally.tech/) related articles
3. **Get Recommendations**: Recommend articles based on health data
4. **Data Management**: View or manage imported external data

#### Step 2: Data Import Workflow

If user wants to import data:

**2.1 Determine Data Source**
