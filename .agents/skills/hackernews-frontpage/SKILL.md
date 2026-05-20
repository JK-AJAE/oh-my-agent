---
name: "hackernews-frontpage"
description: "Scrape the Hacker News front page (titles, points, comment counts)."
category: "utility"
host: "news.ycombinator.com"
trusted: "true"
source: "human"
version: "1.0.0"
args: "[]"
triggers: "- scrape hacker news frontpage - scrape hn frontpage - get hn top stories - latest hacker news stories"
---

# Hacker News front-page scraper

Scrapes the Hacker News (`news.ycombinator.com`) front page and returns the
top 30 stories as JSON. Each story has its rank, title, link URL, point count,
and comment count.

## Usage
