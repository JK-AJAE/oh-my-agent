---
name: "multi-cloud-architecture"
description: "Decision framework and patterns for architecting applications across AWS, Azure, and GCP."
category: "custom-skill"
trigger: "/multi-cloud-architecture"
---

# Multi-Cloud Architecture

Decision framework and patterns for architecting applications across AWS, Azure, and GCP.

## Do not use this skill when

- The task is unrelated to multi-cloud architecture
- You need a different domain or tool outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.
- If detailed examples are required, open `resources/implementation-playbook.md`.

## Purpose

Design cloud-agnostic architectures and make informed decisions about service selection across cloud providers.

## Use this skill when

- Design multi-cloud strategies
- Migrate between cloud providers
- Select cloud services for specific workloads
- Implement cloud-agnostic architectures
- Optimize costs across providers

## Cloud Service Comparison

### Compute Services

| AWS | Azure | GCP | Use Case |
|-----|-------|-----|----------|
| EC2 | Virtual Machines | Compute Engine | IaaS VMs |
| ECS | Container Instances | Cloud Run | Containers |
| EKS | AKS | GKE | Kubernetes |
| Lambda | Functions | Cloud Functions | Serverless |
| Fargate | Container Apps | Cloud Run | Managed containers |

### Storage Services

| AWS | Azure | GCP | Use Case |
|-----|-------|-----|----------|
| S3 | Blob Storage | Cloud Storage | Object storage |
| EBS | Managed Disks | Persistent Disk | Block storage |
| EFS | Azure Files | Filestore | File storage |
| Glacier | Archive Storage | Archive Storage | Cold storage |

### Database Services

| AWS | Azure | GCP | Use Case |
|-----|-------|-----|----------|
| RDS | SQL Database | Cloud SQL | Managed SQL |
| DynamoDB | Cosmos DB | Firestore | NoSQL |
| Aurora | PostgreSQL/MySQL | Cloud Spanner | Distributed SQL |
| ElastiCache | Cache for Redis | Memorystore | Caching |

**Reference:** See `references/service-comparison.md` for complete comparison

## Multi-Cloud Patterns

### Pattern 1: Single Provider with DR

- Primary workload in one cloud
- Disaster recovery in another
- Database replication across clouds
- Automated failover

### Pattern 2: Best-of-Breed

- Use best service from each provider
- AI/ML on GCP
- Enterprise apps on Azure
- General compute on AWS

### Pattern 3: Geographic Distribution

- Serve users from nearest cloud region
- Data sovereignty compliance
- Global load balancing
- Regional failover

### Pattern 4: Cloud-Agnostic Abstraction

- Kubernetes for compute
- PostgreSQL for database
- S3-compatible storage (MinIO)
- Open source tools

## Cloud-Agnostic Architecture

### Use Cloud-Native Alternatives

- **Compute:** Kubernetes (EKS/AKS/GKE)
- **Database:** PostgreSQL/MySQL (RDS/SQL Database/Cloud SQL)
- **Message Queue:** Apache Kafka (MSK/Event Hubs/Confluent)
- **Cache:** Redis (ElastiCache/Azure Cache/Memorystore)
- **Object Storage:** S3-compatible API
- **Monitoring:** Prometheus/Grafana
- **Service Mesh:** Istio/Linkerd

### Abstraction Layers
