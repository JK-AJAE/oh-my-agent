/**
 * harvest.endpoints.test.ts — regression guards for community-source endpoints
 * that drifted into HTTP 403 and had to be re-pointed.
 *
 * Background:
 *   - bluesky search 403s on `public.api.bsky.app`; `api.bsky.app` serves it
 *     unauthenticated.
 *   - reddit's anonymous `www.reddit.com/search.json` 403s; the source now
 *     resolves via live `oauth.reddit.com` (when credentials exist) or the
 *     keyless `api.pullpush.io` archive.
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  buildPullpushUrl,
  getRedditToken,
  pullpushToListing,
  SOURCE_URL_TEMPLATES,
} from "./harvest.js";

describe("harvest endpoint hosts", () => {
  it("bluesky search targets api.bsky.app, not the 403-blocked public host", () => {
    const url = SOURCE_URL_TEMPLATES.bluesky("claude code", 5);
    expect(url).toContain(
      "https://api.bsky.app/xrpc/app.bsky.feed.searchPosts",
    );
    expect(url).not.toContain("public.api.bsky.app");
    expect(url).toContain("q=claude%20code");
    expect(url).toContain("limit=5");
  });

  it("reddit search routes through oauth.reddit.com, not anonymous search.json", () => {
    const url = SOURCE_URL_TEMPLATES.reddit("claude code", "month", 10);
    expect(url).toContain("https://oauth.reddit.com/search");
    expect(url).not.toContain("www.reddit.com/search.json");
    expect(url).toContain("t=month");
    expect(url).toContain("limit=10");
  });

  it("pullpush URL targets the keyless api.pullpush.io submission search", () => {
    const url = buildPullpushUrl("rate limit", 25);
    expect(url).toContain("https://api.pullpush.io/reddit/search/submission/");
    expect(url).toContain("q=rate%20limit");
    expect(url).toContain("size=25");
    expect(url).toContain("sort_type=created_utc");
  });

  it("pullpush size is clamped to the 1..100 API ceiling", () => {
    expect(buildPullpushUrl("x", 500)).toContain("size=100");
    expect(buildPullpushUrl("x", 0)).toContain("size=1");
  });
});

describe("pullpushToListing", () => {
  it("wraps pullpush items into the reddit Listing shape normalizeReddit expects", () => {
    const listing = pullpushToListing({
      data: [
        { id: "a1", title: "first", score: 3 },
        { id: "a2", title: "second", score: 7 },
      ],
    }) as { data: { children: Array<{ data: Record<string, unknown> }> } };

    expect(listing.data.children).toHaveLength(2);
    expect(listing.data.children[0]?.data.id).toBe("a1");
    expect(listing.data.children[1]?.data.title).toBe("second");
  });

  it("returns an empty children array for an empty/absent pullpush payload", () => {
    const empty = pullpushToListing({}) as {
      data: { children: unknown[] };
    };
    expect(empty.data.children).toEqual([]);
  });
});

describe("getRedditToken", () => {
  const KEYS = ["REDDIT_CLIENT_ID", "REDDIT_CLIENT_SECRET"] as const;
  const saved: Record<string, string | undefined> = {};

  beforeEach(() => {
    for (const k of KEYS) {
      saved[k] = process.env[k];
      delete process.env[k];
    }
  });

  afterEach(() => {
    for (const k of KEYS) {
      if (saved[k] === undefined) delete process.env[k];
      else process.env[k] = saved[k];
    }
  });

  it("resolves to null without a network call when credentials are absent", async () => {
    // No REDDIT_CLIENT_ID/SECRET → returns null before any fetch, so a short
    // timeout is irrelevant and the call must not hang or throw.
    await expect(getRedditToken(1)).resolves.toBeNull();
  });
});
