---
name: "naver-search-ads-api"
description: "Naver Search Ads API (searchad.naver.com) authentication and data retrieval patterns. Covers HMAC-SHA256 signature generation, API endpoint catalog, report type parameters, rate limit handling, and response parsing. Referenced by the data-collector agent in the naver-ads-report harness. Also useful standalone for any Naver advertising API integration task."
category: "utility"
---

# Naver Search Ads API — Authentication & Endpoint Reference

A complete reference for authenticating and retrieving data from the Naver Search Ads API (`https://api.searchad.naver.com`).

## Authentication

Naver Search Ads API uses **HMAC-SHA256 signature-based authentication**.

### Required Credentials
