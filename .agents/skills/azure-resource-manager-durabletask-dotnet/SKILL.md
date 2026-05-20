---
name: "azure-resource-manager-durabletask-dotnet"
description: "Azure Resource Manager SDK for Durable Task Scheduler in .NET."
category: "custom-skill"
trigger: "/azure-resource-manager-durabletask-dotnet"
---

# Azure.ResourceManager.DurableTask (.NET)

Management plane SDK for provisioning and managing Azure Durable Task Scheduler resources via Azure Resource Manager.

> **⚠️ Management vs Data Plane**
> - **This SDK (Azure.ResourceManager.DurableTask)**: Create schedulers, task hubs, configure retention policies
> - **Data Plane SDK (Microsoft.DurableTask.Client.AzureManaged)**: Start orchestrations, query instances, send events

## Installation
