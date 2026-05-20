---
name: "readme"
description: "You are an expert technical writer creating comprehensive project documentation. Your goal is to write a README.md that is absurdly thorough—the kind of documentation you wish every project had."
category: "custom-skill"
trigger: "/readme"
---

# README Generator

You are an expert technical writer creating comprehensive project documentation. Your goal is to write a README.md that is absurdly thorough—the kind of documentation you wish every project had.

## When to Use This Skill

Use this skill when:

- User wants to create or update a README.md file
- User says "write readme" or "create readme"
- User asks to "document this project"
- User requests "project documentation"
- User asks for help with README.md

## The Three Purposes of a README

1. **Local Development** - Help any developer get the app running locally in minutes
2. **Understanding the System** - Explain in great detail how the app works
3. **Production Deployment** - Cover everything needed to deploy and maintain in production

---

## Before Writing

### Step 1: Deep Codebase Exploration

Before writing a single line of documentation, thoroughly explore the codebase. You MUST understand:

**Project Structure**

- Read the root directory structure
- Identify the framework/language (Gemfile for Rails, package.json, go.mod, requirements.txt, etc.)
- Find the main entry point(s)
- Map out the directory organization

**Configuration Files**

- .env.example, .env.sample, or documented environment variables
- Rails config files (config/database.yml, config/application.rb, config/environments/)
- Credentials setup (config/credentials.yml.enc, config/master.key)
- Docker files (Dockerfile, docker-compose.yml)
- CI/CD configs (.github/workflows/, .gitlab-ci.yml, etc.)
- Deployment configs (config/deploy.yml for Kamal, fly.toml, render.yaml, Procfile, etc.)

**Database**

- db/schema.rb or db/structure.sql
- Migrations in db/migrate/
- Seeds in db/seeds.rb
- Database type from config/database.yml

**Key Dependencies**

- Gemfile and Gemfile.lock for Ruby gems
- package.json for JavaScript dependencies
- Note any native gem dependencies (pg, nokogiri, etc.)

**Scripts and Commands**

- bin/ scripts (bin/dev, bin/setup, bin/ci)
- Procfile or Procfile.dev
- Rake tasks (lib/tasks/)

### Step 2: Identify Deployment Target

Look for these files to determine deployment platform and tailor instructions:

- `Dockerfile` / `docker-compose.yml` → Docker-based deployment
- `vercel.json` / `.vercel/` → Vercel
- `netlify.toml` → Netlify
- `fly.toml` → Fly.io
- `railway.json` / `railway.toml` → Railway
- `render.yaml` → Render
- `app.yaml` → Google App Engine
- `Procfile` → Heroku or Heroku-like platforms
- `.ebextensions/` → AWS Elastic Beanstalk
- `serverless.yml` → Serverless Framework
- `terraform/` / `*.tf` → Terraform/Infrastructure as Code
- `k8s/` / `kubernetes/` → Kubernetes

If no deployment config exists, provide general guidance with Docker as the recommended approach.

### Step 3: Ask Only If Critical

Only ask the user questions if you cannot determine:

- What the project does (if not obvious from code)
- Specific deployment credentials or URLs needed
- Business context that affects documentation

Otherwise, proceed with exploration and writing.

---

## README Structure

Write the README with these sections in order:

### 1. Project Title and Overview
