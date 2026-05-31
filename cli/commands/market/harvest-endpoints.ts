/**
 * harvest-endpoints.ts — source URL templates, reddit auth, and window helpers.
 *
 * The auth/URL layer that the per-source fetchers in `harvest-sources.ts` build
 * on. Kept dependency-free (no fetch dispatch) so it stays trivially testable —
 * see `harvest.endpoints.test.ts`.
 */

// ---------------------------------------------------------------------------
// URL templates
// ---------------------------------------------------------------------------

// Exported for endpoint regression tests (host/path guards).
export const SOURCE_URL_TEMPLATES = {
  // reddit search is reached through OAuth (oauth.reddit.com); the anonymous
  // www.reddit.com/search.json endpoint now returns 403. The keyless fallback
  // uses pullpush.io instead. See getRedditToken / buildPullpushUrl below.
  reddit: (query: string, windowT: string, limit: number) =>
    `https://oauth.reddit.com/search?q=${encodeURIComponent(query)}&restrict_sr=&t=${windowT}&limit=${limit}&sort=relevance&raw_json=1`,
  hn: (query: string, unixTs: number, limit: number) =>
    `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&hitsPerPage=${limit}&numericFilters=${encodeURIComponent(`created_at_i>${unixTs}`)}`,
  // `api.bsky.app` exposes unauthenticated searchPosts; the formerly used
  // `public.api.bsky.app` host returns 403 for the search endpoint.
  bluesky: (query: string, limit: number) =>
    `https://api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=${encodeURIComponent(query)}&limit=${limit}`,
  mastodon: (query: string, limit: number) =>
    `https://mastodon.social/api/v2/search?q=${encodeURIComponent(query)}&type=statuses&limit=${limit}`,
  github: (query: string, limit: number) =>
    `https://api.github.com/search/issues?q=${encodeURIComponent(query)}+sort:reactions&per_page=${limit}`,
} as const;

// ---------------------------------------------------------------------------
// Reddit auth (app-only OAuth) + pullpush keyless fallback
// ---------------------------------------------------------------------------

// Descriptive, unique User-Agent — reddit's API rejects generic/empty UAs.
export const REDDIT_UA =
  "oma-market/0.1 (+https://github.com/first-fluke/oh-my-agent)";

// Cached app-only OAuth token (client_credentials grant), module-scoped so a
// multi-source / multi-query harvest reuses one token instead of re-minting.
let _redditToken: { value: string; expiresAt: number } | null = null;

/**
 * Mint (or reuse) a reddit app-only OAuth bearer token.
 *
 * Returns `null` — without any network call — when `REDDIT_CLIENT_ID` /
 * `REDDIT_CLIENT_SECRET` are absent, so callers degrade gracefully. Keyless
 * reddit search (`www.reddit.com/search.json`, `.rss`, even with browser TLS
 * impersonation) is blocked with HTTP 403, so OAuth is the only reliable path.
 */
export async function getRedditToken(
  timeoutMs: number,
): Promise<string | null> {
  const id = process.env.REDDIT_CLIENT_ID;
  const secret = process.env.REDDIT_CLIENT_SECRET;
  if (!id || !secret) return null;

  const now = Date.now();
  if (_redditToken && _redditToken.expiresAt > now + 30_000) {
    return _redditToken.value;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": REDDIT_UA,
      },
      body: "grant_type=client_credentials",
    });
    clearTimeout(timer);
    if (!resp.ok) return null;
    const json = (await resp.json()) as {
      access_token?: string;
      expires_in?: number;
    };
    if (!json.access_token) return null;
    _redditToken = {
      value: json.access_token,
      expiresAt: now + (json.expires_in ?? 3600) * 1000,
    };
    return _redditToken.value;
  } catch {
    clearTimeout(timer);
    return null;
  }
}

/**
 * Build a pullpush.io submission-search URL (the Pushshift successor). Keyless.
 *
 * pullpush is recommended by voice-of-customer research playbooks as the way to
 * search reddit without fighting the anonymous-API 403. It lags live reddit by
 * an ingestion window, so results are sorted by recency and the freshness
 * window is left to the scorer rather than applied as a hard `after` cutoff —
 * a hard cutoff would zero out the corpus whenever the archive is behind.
 */
export function buildPullpushUrl(query: string, limit: number): string {
  const size = Math.min(Math.max(limit, 1), 100);
  return `https://api.pullpush.io/reddit/search/submission/?q=${encodeURIComponent(
    query,
  )}&size=${size}&sort=desc&sort_type=created_utc`;
}

/**
 * Adapt a pullpush response (`{ data: [...] }`, each entry already mirroring
 * reddit's post fields: title/selftext/permalink/score/created_utc/...) into
 * the reddit Listing shape so both reddit paths share one normalizer.
 */
export function pullpushToListing(data: unknown): unknown {
  const typed = data as { data?: Array<Record<string, unknown>> };
  const children = (typed?.data ?? []).map((d) => ({ data: d }));
  return { data: { children } };
}

// ---------------------------------------------------------------------------
// Window helpers
// ---------------------------------------------------------------------------

export function windowToRedditT(window: string): string {
  if (window === "7d") return "week";
  if (window === "90d" || window === "180d") return "year";
  return "month"; // default: 30d
}

export function windowToSeconds(window: string): number {
  const match = /^(\d+)d$/.exec(window);
  if (!match) return 30 * 24 * 60 * 60;
  return Number(match[1]) * 24 * 60 * 60;
}
