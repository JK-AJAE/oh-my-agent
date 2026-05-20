---
name: "hugging-face-paper-publisher"
description: "Publish and manage research papers on Hugging Face Hub. Supports creating paper pages, linking papers to models/datasets, claiming authorship, and generating professional markdown-based research articles."
category: "custom-skill"
trigger: "/hugging-face-paper-publisher"
---

# Overview

## When to Use
Use this skill when a user wants to publish, link, index, or manage research papers on the Hugging Face Hub.
This skill provides comprehensive tools for AI engineers and researchers to publish, manage, and link research papers on the Hugging Face Hub. It streamlines the workflow from paper creation to publication, including integration with arXiv, model/dataset linking, and authorship management.

## Integration with HF Ecosystem
- **Paper Pages**: Index and discover papers on Hugging Face Hub
- **arXiv Integration**: Automatic paper indexing from arXiv IDs
- **Model/Dataset Linking**: Connect papers to relevant artifacts through metadata
- **Authorship Verification**: Claim and verify paper authorship
- **Research Article Template**: Generate professional, modern scientific papers

# Version
1.0.0

# Dependencies
The included script uses PEP 723 inline dependencies. Prefer `uv run` over
manual environment setup.

- huggingface_hub>=0.26.0
- pyyaml>=6.0.3
- requests>=2.32.5
- markdown>=3.5.0
- python-dotenv>=1.2.1

# Core Capabilities

## 1. Paper Page Management
- **Index Papers**: Add papers to Hugging Face from arXiv
- **Claim Authorship**: Verify and claim authorship on published papers
- **Manage Visibility**: Control which papers appear on your profile
- **Paper Discovery**: Find and explore papers in the HF ecosystem

## 2. Link Papers to Artifacts
- **Model Cards**: Add paper citations to model metadata
- **Dataset Cards**: Link papers to datasets via README
- **Automatic Tagging**: Hub auto-generates arxiv:<PAPER_ID> tags
- **Citation Management**: Maintain proper attribution and references

## 3. Research Article Creation
- **Markdown Templates**: Generate professional paper formatting
- **Modern Design**: Clean, readable research article layouts
- **Dynamic TOC**: Automatic table of contents generation
- **Section Structure**: Standard scientific paper organization
- **LaTeX Math**: Support for equations and technical notation

## 4. Metadata Management
- **YAML Frontmatter**: Proper model/dataset card metadata
- **Citation Tracking**: Maintain paper references across repositories
- **Version Control**: Track paper updates and revisions
- **Multi-Paper Support**: Link multiple papers to single artifacts

# Usage Instructions

The skill includes Python scripts in `scripts/` for paper publishing operations.

### Prerequisites
- Run scripts with `uv run` (dependencies are resolved from the script header)
- Set `HF_TOKEN` environment variable with Write-access token

> **All paths are relative to the directory containing this SKILL.md
file.**
> Before running any script, first `cd` to that directory or use the full
path.


### Method 1: Index Paper from arXiv

Add a paper to Hugging Face Paper Pages from arXiv.

**Basic Usage:**
