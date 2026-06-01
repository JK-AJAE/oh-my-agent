import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import * as readline from "node:readline/promises";
import YAML from "yaml";

export type IntelSourceKind =
  | "commit"
  | "readme"
  | "release"
  | "issue"
  | "market"
  | "local";

export type IntelSignal = {
  repo: string;
  source: IntelSourceKind;
  observedAt: string;
  retrievedAt: string;
  title: string;
  summary: string;
  url?: string;
  ref?: string;
  capabilityTags: string[];
  trust: "low" | "medium" | "high";
};

export type ReviewLens =
  | "evidence"
  | "fit"
  | "differentiation"
  | "scope"
  | "risk";

export type ReviewFinding = {
  lens: ReviewLens;
  verdict: "pass" | "flag" | "fail";
  note: string;
};

export type CandidateGap = {
  id: string;
  title: string;
  capability: string;
  evidence: IntelSignal[];
  fitScore: number;
  differentiationScore: number;
  valueScore: number;
  maintenanceRisk: "low" | "medium" | "high";
  decision: "accept" | "defer" | "reject";
  rationale: string;
  review?: ReviewFinding[];
};

export type IntelConfig = {
  version: 1;
  target: string;
  topic?: string;
  sources: {
    github?: { repos: string[] };
    market?: { enabled: boolean };
    local?: { path?: string };
  };
  window: { since?: string; lastCommits?: number };
  output: {
    dir: string;
    formats: Array<"md" | "json">;
  };
  remote: {
    githubIssue: { enabled: boolean; requireConfirm: boolean; repo?: string };
  };
};

export type IntelRunOptions = {
  cwd?: string;
  config?: string;
  target?: string;
  topic?: string;
  repos?: string;
  since?: string;
  lastCommits?: number;
  outputDir?: string;
  dryRun?: boolean;
  fixture?: string;
  createIssue?: boolean;
  baseRepo?: string;
  assumeYes?: boolean;
  now?: Date;
};

type CoverageNote = {
  source: string;
  status: "ok" | "partial" | "failed" | "skipped";
  detail: string;
};

export type IssueResult = {
  status: "created" | "dry-run" | "skipped" | "duplicate" | "refused";
  detail: string;
  title: string;
  fingerprint: string;
  url?: string;
  body?: string;
};

export type IntelRunResult = {
  config: IntelConfig;
  signals: IntelSignal[];
  candidates: CandidateGap[];
  coverage: CoverageNote[];
  prd: string;
  gapReport: string;
  outputPaths: { prd?: string; gapReport?: string; json?: string };
  issue?: IssueResult;
};

type RawConfig = {
  version?: number;
  base_repo?: unknown;
  target?: unknown;
  topic?: unknown;
  competitors?: unknown;
  sources?: unknown;
  window?: unknown;
  output?: unknown;
  remote?: unknown;
};

const DEFAULT_OUTPUT_DIR = "docs/intel";
const DEFAULT_FORMATS: Array<"md" | "json"> = ["md", "json"];
const FINGERPRINT_MARKER = "oma-intel-fingerprint";
// Flag genuinely unsafe intent (action verb + sensitive target), not mere
// mentions of "API key" or "credentials" that appear in normal docs/release
// notes. Keeping this tight avoids false-positive rejections (quality: no
// false positives).
const UNSAFE_EVIDENCE = new RegExp(
  [
    // verb + sensitive noun within a short window
    "(?:scrap(?:e|ing)|exfiltrat\\w*|steal(?:ing)?|harvest(?:ing)?|capture|dump|leak|sniff)\\s+(?:\\w+\\s+){0,3}(?:credential|password|secret|token|api[ _-]?key|cookie|session)",
    // noun + theft/harvest phrasing
    "(?:credential|token|password|secret)\\s+(?:theft|harvest\\w*|exfiltrat\\w*)",
    // auth/permission bypass
    "bypass(?:ing)?\\s+(?:auth\\w*|login|permission|sandbox|2fa|mfa)",
  ].join("|"),
  "i",
);

const CAPABILITY_KEYWORDS: Array<[string, RegExp]> = [
  ["scaffolding", /scaffold|template|starter|bootstrap|setup|install/i],
  ["workflow-loop", /workflow|loop|autopilot|ralph|ultra|orchestrat|team/i],
  ["agent-dispatch", /agent|dispatch|worker|subagent|tmux|parallel/i],
  ["memory-state", /memory|state|ledger|context|continuation|session/i],
  ["verification", /verify|test|qa|eval|review|gate|confidence/i],
  ["security", /security|redact|secret|permission|sandbox|cve|owasp/i],
  ["research", /market|research|search|trend|competitor|intelligence/i],
  ["docs", /docs|readme|reference|guide|documentation/i],
  ["release", /release|ship|deploy|version|changelog/i],
  ["cross-runtime", /codex|claude|gemini|opencode|cursor|kiro|grok|runtime/i],
  ["platform", /windows|linux|macos|shell|path|hook|manifest/i],
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function parseRepoList(value?: string): string[] {
  if (!value?.trim()) return [];
  return value
    .split(",")
    .map((repo) => repo.trim())
    .filter(Boolean);
}

function normalizeRepo(repo: string): string {
  const trimmed = repo.trim();
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(trimmed)) {
    throw new Error(`Invalid GitHub repo "${repo}". Expected owner/name.`);
  }
  return trimmed;
}

function normalizeFormats(value: unknown): Array<"md" | "json"> {
  if (!Array.isArray(value)) return DEFAULT_FORMATS;
  const formats = value
    .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
    .filter(
      (entry): entry is "md" | "json" => entry === "md" || entry === "json",
    );
  return formats.length > 0 ? [...new Set(formats)] : DEFAULT_FORMATS;
}

function parseLastCommits(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    return value;
  }
  if (typeof value === "string" && /^\d+$/.test(value.trim())) {
    const parsed = Number.parseInt(value.trim(), 10);
    return parsed > 0 ? parsed : undefined;
  }
  return undefined;
}

function parseDurationToSinceDate(value: string, now: Date): Date | null {
  const match = value.trim().match(/^(\d+)(h|d|w|m)$/i);
  if (!match) return null;
  const amount = Number.parseInt(match[1] ?? "", 10);
  const unit = (match[2] ?? "").toLowerCase();
  const msByUnit: Record<string, number> = {
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
    m: 30 * 24 * 60 * 60 * 1000,
  };
  const ms = msByUnit[unit];
  if (!ms || !Number.isFinite(amount)) return null;
  return new Date(now.getTime() - amount * ms);
}

function resolveConfigPath(cwd: string, explicit?: string): string | undefined {
  const candidates = explicit
    ? [path.resolve(cwd, explicit)]
    : [path.join(cwd, "oma-intel.yaml"), path.join(cwd, ".oma", "intel.yaml")];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function readYamlConfig(cwd: string, explicit?: string): RawConfig | undefined {
  const configPath = resolveConfigPath(cwd, explicit);
  if (!configPath) {
    if (explicit) throw new Error(`Config file not found: ${explicit}`);
    return undefined;
  }
  const parsed = YAML.parse(fs.readFileSync(configPath, "utf-8")) as unknown;
  if (!isRecord(parsed)) {
    throw new Error(`Config must be a YAML object: ${configPath}`);
  }
  return parsed as RawConfig;
}

function inferGitHubTarget(cwd: string): string | undefined {
  try {
    const remote = execFileSync(
      "git",
      ["config", "--get", "remote.origin.url"],
      {
        cwd,
        encoding: "utf-8",
        stdio: ["ignore", "pipe", "ignore"],
      },
    ).trim();
    const match = remote.match(/github\.com[:/]([^/]+\/[^/.]+)(?:\.git)?$/i);
    return match?.[1];
  } catch {
    return undefined;
  }
}

function parseRawConfig(raw: RawConfig | undefined, cwd: string): IntelConfig {
  const sources = isRecord(raw?.sources) ? raw.sources : {};
  const github = isRecord(sources.github) ? sources.github : undefined;
  const market = isRecord(sources.market) ? sources.market : undefined;
  const local = isRecord(sources.local) ? sources.local : undefined;
  const window = isRecord(raw?.window) ? raw.window : {};
  const output = isRecord(raw?.output) ? raw.output : {};
  const remote = isRecord(raw?.remote) ? raw.remote : {};
  const githubIssue = isRecord(remote.github_issue) ? remote.github_issue : {};

  const competitorRepos = Array.isArray(raw?.competitors)
    ? raw.competitors
        .map((entry) =>
          isRecord(entry) ? asString(entry.repo) : asString(entry),
        )
        .filter((repo): repo is string => !!repo)
    : [];
  const githubRepos = Array.isArray(github?.repos)
    ? github.repos
        .map((entry) => asString(entry))
        .filter((repo): repo is string => !!repo)
    : [];

  return {
    version: 1,
    target:
      asString(raw?.target) ??
      asString(raw?.base_repo) ??
      inferGitHubTarget(cwd) ??
      path.basename(cwd),
    topic: asString(raw?.topic),
    sources: {
      github: {
        repos: [...githubRepos, ...competitorRepos].map(normalizeRepo),
      },
      market: { enabled: asBoolean(market?.enabled) ?? !!asString(raw?.topic) },
      local: { path: asString(local?.path) },
    },
    window: {
      since: asString(window.since) ?? "30d",
      lastCommits: parseLastCommits(window.last_commits),
    },
    output: {
      dir: asString(output.dir) ?? DEFAULT_OUTPUT_DIR,
      formats: normalizeFormats(output.formats),
    },
    remote: {
      githubIssue: {
        enabled: asBoolean(githubIssue.enabled) ?? false,
        requireConfirm: asBoolean(githubIssue.require_confirm) ?? true,
        repo: asString(githubIssue.repo),
      },
    },
  };
}

export function resolveIntelConfig(options: IntelRunOptions): IntelConfig {
  const cwd = options.cwd ?? process.cwd();
  const raw = readYamlConfig(cwd, options.config);
  const config = parseRawConfig(raw, cwd);
  const reposOverride = parseRepoList(options.repos).map(normalizeRepo);

  if (options.target?.trim()) config.target = options.target.trim();
  if (options.topic?.trim()) {
    config.topic = options.topic.trim();
    config.sources.market = { enabled: true };
  }
  if (reposOverride.length > 0)
    config.sources.github = { repos: reposOverride };
  if (options.outputDir?.trim()) config.output.dir = options.outputDir.trim();
  if (options.baseRepo?.trim()) {
    config.remote.githubIssue.repo = normalizeRepo(options.baseRepo);
  }

  const optionLastCommits = parseLastCommits(options.lastCommits);
  if (options.since && optionLastCommits) {
    throw new Error("Use only one window selector: --since or --last-commits.");
  }
  if (options.since) {
    config.window = { since: options.since };
  } else if (optionLastCommits) {
    config.window = { lastCommits: optionLastCommits };
  } else if (config.window.since && config.window.lastCommits) {
    throw new Error("Config must use only one window: since or last_commits.");
  }

  const githubRepos = config.sources.github?.repos ?? [];
  const marketEnabled = config.sources.market?.enabled ?? false;
  if (githubRepos.length === 0 && !marketEnabled && !config.topic) {
    throw new Error(
      "No intelligence sources configured. Add sources.github.repos, enable market with a topic, or pass --repos.",
    );
  }

  return config;
}

function tagText(text: string): string[] {
  const tags = CAPABILITY_KEYWORDS.filter(([, pattern]) =>
    pattern.test(text),
  ).map(([tag]) => tag);
  return tags.length > 0 ? [...new Set(tags)] : ["general"];
}

function signalFromText(
  input: Omit<IntelSignal, "capabilityTags" | "trust"> & {
    trust?: IntelSignal["trust"];
  },
): IntelSignal {
  const text = `${input.title}\n${input.summary}`;
  return {
    ...input,
    capabilityTags: tagText(text),
    trust: input.trust ?? "medium",
  };
}

async function fetchJson(url: string): Promise<unknown> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "oh-my-agent-intel",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const response = await fetch(url, { headers });
  if (!response.ok) {
    const remaining = response.headers.get("x-ratelimit-remaining");
    const rateHint = remaining === "0" ? " (GitHub rate limit exhausted)" : "";
    throw new Error(`${response.status} ${response.statusText}${rateHint}`);
  }
  return response.json();
}

function commitLimit(config: IntelConfig): number {
  return Math.min(Math.max(config.window.lastCommits ?? 30, 1), 100);
}

function githubSinceDate(config: IntelConfig, now: Date): Date | undefined {
  if (!config.window.since) return undefined;
  return parseDurationToSinceDate(config.window.since, now) ?? undefined;
}

function isAfterSince(observedAt: string | undefined, since?: Date): boolean {
  if (!since) return true;
  if (!observedAt) return true;
  const observed = new Date(observedAt);
  return (
    Number.isNaN(observed.getTime()) || observed.getTime() >= since.getTime()
  );
}

async function collectRepoMeta(
  repo: string,
  retrievedAt: string,
): Promise<IntelSignal> {
  const repoMeta = (await fetchJson(
    `https://api.github.com/repos/${repo}`,
  )) as Record<string, unknown>;
  const description = asString(repoMeta.description) ?? "";
  return signalFromText({
    repo,
    source: "local",
    observedAt: asString(repoMeta.updated_at) ?? retrievedAt,
    retrievedAt,
    title: `${repo} repository surface`,
    summary: description || "Repository metadata observed.",
    url: asString(repoMeta.html_url),
    trust: "medium",
  });
}

async function collectRepoCommits(
  repo: string,
  config: IntelConfig,
  now: Date,
  retrievedAt: string,
): Promise<IntelSignal[]> {
  const params = new URLSearchParams({
    per_page: String(commitLimit(config)),
  });
  const since = githubSinceDate(config, now);
  if (since) params.set("since", since.toISOString());
  const commits = (await fetchJson(
    `https://api.github.com/repos/${repo}/commits?${params}`,
  )) as Array<Record<string, unknown>>;
  return commits.slice(0, commitLimit(config)).map((commit) => {
    const sha = asString(commit.sha);
    const commitObj = isRecord(commit.commit) ? commit.commit : {};
    const message = asString(commitObj.message) ?? "";
    const author = isRecord(commitObj.author) ? commitObj.author : {};
    const firstLine = message.split("\n")[0]?.trim() || "Commit";
    return signalFromText({
      repo,
      source: "commit",
      observedAt: asString(author.date) ?? retrievedAt,
      retrievedAt,
      title: firstLine,
      summary: message,
      url: asString(commit.html_url),
      ref: sha?.slice(0, 12),
      trust: "high",
    });
  });
}

async function collectRepoReadme(
  repo: string,
  retrievedAt: string,
): Promise<IntelSignal> {
  const readme = (await fetchJson(
    `https://api.github.com/repos/${repo}/readme`,
  )) as Record<string, unknown>;
  const encoded = asString(readme.content) ?? "";
  const decoded = encoded
    ? Buffer.from(encoded, "base64").toString("utf-8").slice(0, 4000)
    : "";
  return signalFromText({
    repo,
    source: "readme",
    observedAt: retrievedAt,
    retrievedAt,
    title: `${repo} README surface`,
    summary: decoded || "README present but empty.",
    url: asString(readme.html_url),
    trust: "medium",
  });
}

async function collectRepoReleases(
  repo: string,
  since: Date | undefined,
  retrievedAt: string,
): Promise<IntelSignal[]> {
  const releases = (await fetchJson(
    `https://api.github.com/repos/${repo}/releases?per_page=10`,
  )) as Array<Record<string, unknown>>;
  return releases
    .filter((release) => isAfterSince(asString(release.published_at), since))
    .slice(0, 10)
    .map((release) => {
      const name =
        asString(release.name) ?? asString(release.tag_name) ?? "Release";
      const body = asString(release.body) ?? "";
      return signalFromText({
        repo,
        source: "release",
        observedAt: asString(release.published_at) ?? retrievedAt,
        retrievedAt,
        title: `Release ${name}`,
        summary: body || name,
        url: asString(release.html_url),
        ref: asString(release.tag_name),
        trust: "medium",
      });
    });
}

async function collectRepoIssues(
  repo: string,
  since: Date | undefined,
  retrievedAt: string,
): Promise<IntelSignal[]> {
  const params = new URLSearchParams({
    state: "all",
    sort: "updated",
    per_page: "15",
  });
  if (since) params.set("since", since.toISOString());
  const issues = (await fetchJson(
    `https://api.github.com/repos/${repo}/issues?${params}`,
  )) as Array<Record<string, unknown>>;
  return issues
    .filter((issue) => !isRecord(issue.pull_request))
    .slice(0, 10)
    .map((issue) => {
      const title = asString(issue.title) ?? "Issue";
      const body = asString(issue.body) ?? "";
      const number =
        typeof issue.number === "number" ? issue.number : undefined;
      const labels = Array.isArray(issue.labels)
        ? issue.labels
            .map((label) =>
              isRecord(label) ? asString(label.name) : undefined,
            )
            .filter((name): name is string => !!name)
        : [];
      const labelSuffix = labels.length > 0 ? ` [${labels.join(", ")}]` : "";
      return signalFromText({
        repo,
        source: "issue",
        observedAt:
          asString(issue.updated_at) ??
          asString(issue.created_at) ??
          retrievedAt,
        retrievedAt,
        title: `${title}${labelSuffix}`,
        summary: body || title,
        url: asString(issue.html_url),
        ref: number ? `#${number}` : undefined,
        trust: "medium",
      });
    });
}

async function collectGitHubSignals(
  config: IntelConfig,
  now: Date,
): Promise<{ signals: IntelSignal[]; coverage: CoverageNote[] }> {
  const repos = config.sources.github?.repos ?? [];
  const signals: IntelSignal[] = [];
  const coverage: CoverageNote[] = [];
  const retrievedAt = now.toISOString();
  const since = githubSinceDate(config, now);

  for (const repo of repos) {
    const collected: string[] = [];
    const degraded: string[] = [];
    try {
      signals.push(await collectRepoMeta(repo, retrievedAt));
      const commits = await collectRepoCommits(repo, config, now, retrievedAt);
      signals.push(...commits);
      collected.push(`metadata`, `${commits.length} commits`);
    } catch (error) {
      coverage.push({
        source: `github:${repo}`,
        status: "failed",
        detail: error instanceof Error ? error.message : String(error),
      });
      continue;
    }

    for (const [label, collector] of [
      ["readme", () => collectRepoReadme(repo, retrievedAt).then((s) => [s])],
      ["releases", () => collectRepoReleases(repo, since, retrievedAt)],
      ["issues", () => collectRepoIssues(repo, since, retrievedAt)],
    ] as Array<[string, () => Promise<IntelSignal[]>]>) {
      try {
        const collectedSignals = await collector();
        signals.push(...collectedSignals);
        collected.push(`${collectedSignals.length} ${label}`);
      } catch (error) {
        degraded.push(
          `${label} (${error instanceof Error ? error.message : String(error)})`,
        );
      }
    }

    coverage.push({
      source: `github:${repo}`,
      status: degraded.length > 0 ? "partial" : "ok",
      detail:
        `Collected ${collected.join(", ")}.` +
        (degraded.length > 0 ? ` Skipped ${degraded.join("; ")}.` : ""),
    });
  }

  return { signals, coverage };
}

function collectLocalSignals(
  config: IntelConfig,
  cwd: string,
  now: Date,
): { signals: IntelSignal[]; coverage: CoverageNote[] } {
  const root = path.resolve(cwd, config.sources.local?.path ?? ".");
  const files = ["README.md", "package.json", "cli/cli.ts"];
  const signals: IntelSignal[] = [];
  const retrievedAt = now.toISOString();

  for (const file of files) {
    const filePath = path.join(root, file);
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, "utf-8").slice(0, 4000);
    signals.push(
      signalFromText({
        repo: config.target,
        source: "local",
        observedAt: retrievedAt,
        retrievedAt,
        title: `Target local context: ${file}`,
        summary: content,
        trust: "high",
      }),
    );
  }

  return {
    signals,
    coverage: [
      {
        source: "local",
        status: signals.length > 0 ? "ok" : "skipped",
        detail:
          signals.length > 0
            ? `Collected ${signals.length} local context files.`
            : "No local context files found.",
      },
    ],
  };
}

function collectMarketSignals(
  config: IntelConfig,
  now: Date,
): { signals: IntelSignal[]; coverage: CoverageNote[] } {
  if (!config.sources.market?.enabled) {
    return {
      signals: [],
      coverage: [{ source: "market", status: "skipped", detail: "Disabled." }],
    };
  }
  if (!config.topic) {
    return {
      signals: [],
      coverage: [
        { source: "market", status: "skipped", detail: "No topic configured." },
      ],
    };
  }
  const retrievedAt = now.toISOString();
  return {
    signals: [
      signalFromText({
        repo: config.target,
        source: "market",
        observedAt: retrievedAt,
        retrievedAt,
        title: `Market research topic: ${config.topic}`,
        summary:
          "Market source is enabled. Use this topic to collect community and trend signals through oma market during full research runs.",
        trust: "low",
      }),
    ],
    coverage: [
      {
        source: "market",
        status: "partial",
        detail:
          "Topic captured for market research; full community harvest is delegated to oma market.",
      },
    ],
  };
}

function loadFixture(fixturePath: string): {
  signals: IntelSignal[];
  coverage: CoverageNote[];
} {
  const raw = JSON.parse(fs.readFileSync(fixturePath, "utf-8")) as unknown;
  if (Array.isArray(raw)) {
    return { signals: raw as IntelSignal[], coverage: [] };
  }
  if (isRecord(raw)) {
    return {
      signals: Array.isArray(raw.signals) ? (raw.signals as IntelSignal[]) : [],
      coverage: Array.isArray(raw.coverage)
        ? (raw.coverage as CoverageNote[])
        : [],
    };
  }
  throw new Error("Fixture must be an array or object with signals.");
}

function evidenceWeight(signal: IntelSignal): number {
  const trust = signal.trust === "high" ? 3 : signal.trust === "medium" ? 2 : 1;
  const source =
    signal.source === "commit" || signal.source === "issue" ? 2 : 1;
  return trust + source;
}

export function scoreCandidates(signals: IntelSignal[]): CandidateGap[] {
  const externalSignals = signals.filter((signal) => signal.source !== "local");
  const byCapability = new Map<string, IntelSignal[]>();
  for (const signal of externalSignals) {
    for (const tag of signal.capabilityTags) {
      const bucket = byCapability.get(tag) ?? [];
      bucket.push(signal);
      byCapability.set(tag, bucket);
    }
  }

  return [...byCapability.entries()]
    .map(([capability, evidence], index): CandidateGap => {
      const evidenceScore = evidence.reduce(
        (sum, signal) => sum + evidenceWeight(signal),
        0,
      );
      const repoDiversity = new Set(evidence.map((signal) => signal.repo)).size;
      const fitScore = Math.min(10, 3 + repoDiversity + evidence.length);
      const differentiationScore = Math.min(
        10,
        2 + Math.ceil(evidenceScore / 3),
      );
      const valueScore = Math.min(
        100,
        Math.round(fitScore * 5 + differentiationScore * 4 + repoDiversity * 5),
      );
      const decision =
        evidence.length >= 2 && valueScore >= 55
          ? "accept"
          : evidence.length >= 1
            ? "defer"
            : "reject";
      return {
        id: `INTEL-${String(index + 1).padStart(3, "0")}`,
        title: `Investigate ${capability} opportunity`,
        capability,
        evidence: evidence.slice(0, 5),
        fitScore,
        differentiationScore,
        valueScore,
        maintenanceRisk: evidence.length > 6 ? "medium" : "low",
        decision,
        rationale:
          decision === "accept"
            ? "Multiple signals suggest this capability may improve the target product."
            : "Evidence is currently too thin for implementation; keep as watch item.",
      };
    })
    .sort((a, b) => b.valueScore - a.valueScore);
}

/**
 * Apply blind/adversarial review lenses over scored candidates. External
 * evidence is treated as untrusted data, not instructions. A failing lens can
 * downgrade an accepted candidate; flags are recorded but do not block on their
 * own. The transform is deterministic so fixture replay stays stable.
 */
export function reviewCandidates(
  candidates: CandidateGap[],
  config: IntelConfig,
): CandidateGap[] {
  return candidates.map((candidate) => {
    const repos = new Set(candidate.evidence.map((signal) => signal.repo));
    const hasStrongCode = candidate.evidence.some(
      (signal) => signal.source === "commit" && signal.trust === "high",
    );
    const unsafe = candidate.evidence.some((signal) =>
      UNSAFE_EVIDENCE.test(`${signal.title}\n${signal.summary}`),
    );

    const review: ReviewFinding[] = [];

    // Evidence gate: two independent signals, or one strong code signal.
    const evidencePass =
      (candidate.evidence.length >= 2 && repos.size >= 2) || hasStrongCode;
    review.push({
      lens: "evidence",
      verdict: evidencePass ? "pass" : "fail",
      note: evidencePass
        ? `${candidate.evidence.length} signals across ${repos.size} repo(s).`
        : "Fewer than two independent signals and no strong code signal.",
    });

    // Fit gate: capability must map to the OMA taxonomy.
    const fitPass = candidate.capability !== "general";
    review.push({
      lens: "fit",
      verdict: fitPass ? "pass" : "flag",
      note: fitPass
        ? `Maps to OMA capability "${candidate.capability}" for ${config.target}.`
        : "Untagged capability; cannot confirm architectural fit.",
    });

    // Differentiation gate: avoid shallow copycat work.
    const diffPass = candidate.differentiationScore >= 4;
    review.push({
      lens: "differentiation",
      verdict: diffPass ? "pass" : "flag",
      note: diffPass
        ? `Differentiation score ${candidate.differentiationScore}/10.`
        : "Low differentiation; risk of shallow clone.",
    });

    // Scope gate: bounded v1 maintainability.
    const scopePass = candidate.maintenanceRisk !== "high";
    review.push({
      lens: "scope",
      verdict: scopePass ? "pass" : "flag",
      note: scopePass
        ? `Maintenance risk ${candidate.maintenanceRisk}.`
        : "High maintenance risk; scope may exceed a bounded v1.",
    });

    // Risk gate: no unsafe scraping or credential capture in evidence.
    review.push({
      lens: "risk",
      verdict: unsafe ? "fail" : "pass",
      note: unsafe
        ? "Evidence references unsafe scraping/credential patterns."
        : "No unsafe scraping or credential patterns detected.",
    });

    const hasFail = review.some((finding) => finding.verdict === "fail");
    const blockingFlag = review.some(
      (finding) =>
        finding.verdict === "flag" &&
        (finding.lens === "differentiation" || finding.lens === "fit"),
    );

    let decision = candidate.decision;
    let rationale = candidate.rationale;
    if (hasFail) {
      decision = "reject";
      rationale =
        "Adversarial review rejected this candidate: " +
        review
          .filter((finding) => finding.verdict === "fail")
          .map((finding) => finding.note)
          .join(" ");
    } else if (candidate.decision === "accept" && blockingFlag) {
      decision = "defer";
      rationale =
        "Adversarial review downgraded to watch item: " +
        review
          .filter((finding) => finding.verdict === "flag")
          .map((finding) => finding.note)
          .join(" ");
    }

    return { ...candidate, decision, rationale, review };
  });
}

function windowLabel(config: IntelConfig): string {
  return config.window.lastCommits
    ? `${config.window.lastCommits} commits`
    : (config.window.since ?? "n/a");
}

function evidenceLine(signal: IntelSignal): string {
  const ref = signal.ref ? ` ${signal.ref}` : "";
  const url = signal.url ? ` ${signal.url}` : "";
  return `- [${signal.source}] ${signal.repo}${ref}: ${signal.title}${url} (observed ${signal.observedAt})`;
}

type RenderInput = Omit<
  IntelRunResult,
  "prd" | "gapReport" | "outputPaths" | "issue"
>;

function renderGapReport(result: RenderInput): string {
  const accepted = result.candidates.filter((c) => c.decision === "accept");
  const deferred = result.candidates.filter((c) => c.decision !== "accept");
  const lines = [
    "# Intelligence Gap Report",
    "",
    `Target: ${result.config.target}`,
    result.config.topic ? `Topic: ${result.config.topic}` : undefined,
    `Window: ${windowLabel(result.config)}`,
    "",
    "## Top Items",
    "",
    ...(accepted.length > 0
      ? accepted.map(
          (candidate, index) =>
            `${index + 1}. ${candidate.title} - value ${candidate.valueScore}/100 (${candidate.capability})`,
        )
      : ["No accepted items yet."]),
    "",
    "## Watch Items",
    "",
    ...(deferred.length > 0
      ? deferred
          .slice(0, 10)
          .map(
            (candidate) =>
              `- ${candidate.title} - ${candidate.decision}, value ${candidate.valueScore}/100`,
          )
      : ["- None"]),
    "",
    "## Adversarial Review",
    "",
    ...result.candidates.flatMap((candidate) => [
      `### ${candidate.id}: ${candidate.title}`,
      "",
      `Decision: ${candidate.decision}`,
      `Rationale: ${candidate.rationale}`,
      "",
      ...(candidate.review ?? []).map(
        (finding) => `- ${finding.lens}: ${finding.verdict} - ${finding.note}`,
      ),
      "",
      "Evidence (untrusted external text, quoted only):",
      ...candidate.evidence.map(evidenceLine),
      "",
    ]),
    "## Coverage",
    "",
    ...result.coverage.map(
      (note) => `- ${note.source}: ${note.status} - ${note.detail}`,
    ),
    "",
  ].filter((line): line is string => line !== undefined);
  return lines.join("\n");
}

function acceptanceCriteria(candidate: CandidateGap): string[] {
  return [
    `- Improvement in ${candidate.capability} is backed by at least ${candidate.evidence.length} cited signal(s).`,
    "- Ships as a bounded v1 (no dashboard or daemon dependency).",
    "- Preserves OMA cross-runtime SSOT and skills/workflows architecture.",
    "- Includes tests and a named owner before merge.",
  ];
}

function renderPrd(result: RenderInput): string {
  const accepted = result.candidates.filter((c) => c.decision === "accept");
  const rejected = result.candidates.filter((c) => c.decision !== "accept");
  const lines = [
    "# Product Requirements (Draft)",
    "",
    `Target: ${result.config.target}`,
    result.config.topic ? `Topic: ${result.config.topic}` : undefined,
    `Window: ${windowLabel(result.config)}`,
    "",
    "## Summary",
    "",
    accepted.length > 0
      ? `Evidence supports ${accepted.length} candidate improvement(s). The highest-value next action is "${accepted[0]?.title}".`
      : "No candidate passed the adversarial gates this run. Treat all items as watch-only and gather more evidence.",
    "",
    "## Proposed Features (Accepted)",
    "",
    ...(accepted.length > 0
      ? accepted.flatMap((candidate) => [
          `### ${candidate.id}: ${candidate.title}`,
          "",
          `Capability: ${candidate.capability} | value ${candidate.valueScore}/100 | maintenance risk ${candidate.maintenanceRisk}`,
          "",
          "Acceptance criteria:",
          ...acceptanceCriteria(candidate),
          "",
          "Provenance:",
          ...candidate.evidence.map(evidenceLine),
          "",
        ])
      : ["None this run.", ""]),
    "## Rejected / Deferred",
    "",
    ...(rejected.length > 0
      ? rejected
          .slice(0, 10)
          .map(
            (candidate) =>
              `- ${candidate.id} ${candidate.title} - ${candidate.decision}: ${candidate.rationale}`,
          )
      : ["- None"]),
    "",
    "## Coverage",
    "",
    ...result.coverage.map(
      (note) => `- ${note.source}: ${note.status} - ${note.detail}`,
    ),
    "",
    "## Remote Actions",
    "",
    result.config.remote.githubIssue.enabled
      ? "GitHub issue creation is enabled; run with --create-issue to file the top accepted candidates."
      : "GitHub issue creation is disabled. Enable remote.github_issue in config to allow --create-issue.",
    "",
  ].filter((line): line is string => line !== undefined);
  return lines.join("\n");
}

function reportDate(now: Date): string {
  return now.toISOString().slice(0, 10);
}

function issueFingerprint(
  config: IntelConfig,
  accepted: CandidateGap[],
): string {
  const seed = [
    config.target,
    ...accepted.map((candidate) => candidate.capability).sort(),
  ].join("|");
  return createHash("sha256").update(seed).digest("hex").slice(0, 16);
}

function buildIssuePlan(result: RenderInput): {
  title: string;
  body: string;
  fingerprint: string;
} {
  const accepted = result.candidates.filter((c) => c.decision === "accept");
  const rejected = result.candidates.filter((c) => c.decision !== "accept");
  const fingerprint = issueFingerprint(result.config, accepted);
  const lead =
    accepted[0]?.capability ?? rejected[0]?.capability ?? "intelligence";
  const title = `intel: ${lead} opportunities for ${result.config.target}`;
  const body = [
    `<!-- ${FINGERPRINT_MARKER}: ${fingerprint} -->`,
    "",
    "## Summary",
    "",
    accepted.length > 0
      ? `Adversarial review accepted ${accepted.length} candidate(s) from the latest intelligence run on \`${result.config.target}\`.`
      : "No candidate passed the adversarial gates; filing as a watch list.",
    "",
    "## Accepted candidates",
    "",
    ...(accepted.length > 0
      ? accepted.map(
          (candidate) =>
            `- ${candidate.title} (value ${candidate.valueScore}/100, ${candidate.capability})`,
        )
      : ["- None"]),
    "",
    "## Rejected / deferred",
    "",
    ...(rejected.length > 0
      ? rejected
          .slice(0, 10)
          .map((candidate) => `- ${candidate.title} - ${candidate.decision}`)
      : ["- None"]),
    "",
    "## Provenance",
    "",
    ...result.candidates
      .flatMap((candidate) => candidate.evidence)
      .slice(0, 15)
      .map(evidenceLine),
    "",
    "_Generated by `oma intel`. External evidence is quoted as untrusted data._",
  ].join("\n");
  return { title, body, fingerprint };
}

function gh(args: string[], input?: string): string {
  return execFileSync("gh", args, {
    encoding: "utf-8",
    input,
    stdio: ["pipe", "pipe", "pipe"],
  }).trim();
}

function ghAvailable(): boolean {
  try {
    gh(["--version"]);
    gh(["auth", "status"]);
    return true;
  } catch {
    return false;
  }
}

function findDuplicateIssue(
  repo: string,
  fingerprint: string,
): { number: number; url: string } | undefined {
  try {
    const raw = gh([
      "issue",
      "list",
      "--repo",
      repo,
      "--state",
      "all",
      "--search",
      fingerprint,
      "--json",
      "number,url,body",
      "--limit",
      "30",
    ]);
    const parsed = JSON.parse(raw || "[]") as Array<Record<string, unknown>>;
    const match = parsed.find(
      (issue) =>
        typeof issue.body === "string" && issue.body.includes(fingerprint),
    );
    if (match && typeof match.number === "number") {
      return { number: match.number, url: String(match.url ?? "") };
    }
  } catch {
    // Search failures degrade to "no known duplicate" rather than blocking.
  }
  return undefined;
}

async function confirmInteractive(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  try {
    const answer = (await rl.question(`${question} [y/N] `))
      .trim()
      .toLowerCase();
    return answer === "y" || answer === "yes";
  } finally {
    rl.close();
  }
}

async function createGitHubIssue(
  result: RenderInput,
  options: IntelRunOptions,
): Promise<IssueResult> {
  const { title, body, fingerprint } = buildIssuePlan(result);
  const dryRun = !!options.dryRun;
  const remote = result.config.remote.githubIssue;
  const repo = remote.repo ?? options.baseRepo?.trim() ?? result.config.target;

  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo)) {
    return {
      status: "refused",
      detail: `Cannot file an issue: target "${repo}" is not an owner/name GitHub repo. Pass --base-repo.`,
      title,
      fingerprint,
      body,
    };
  }

  if (dryRun) {
    return {
      status: "dry-run",
      detail: remote.enabled
        ? `Would create an issue in ${repo}. Body printed below.`
        : `Preview only: issue creation is disabled in config. Body printed below.`,
      title,
      fingerprint,
      body,
    };
  }

  if (!remote.enabled) {
    return {
      status: "refused",
      detail:
        "Issue creation is disabled. Set remote.github_issue.enabled: true in config.",
      title,
      fingerprint,
      body,
    };
  }

  if (!ghAvailable()) {
    return {
      status: "refused",
      detail:
        "GitHub CLI (gh) is not installed or not authenticated. Run `gh auth login`.",
      title,
      fingerprint,
      body,
    };
  }

  const duplicate = findDuplicateIssue(repo, fingerprint);
  const interactive = !!process.stdin.isTTY;

  if (duplicate) {
    if (!interactive && !options.assumeYes) {
      return {
        status: "duplicate",
        detail: `Matching issue #${duplicate.number} already exists (${duplicate.url}). Re-run with --yes to file anyway.`,
        title,
        fingerprint,
        url: duplicate.url,
        body,
      };
    }
    if (
      interactive &&
      !(await confirmInteractive(
        `A matching issue (#${duplicate.number}) already exists. Create another?`,
      ))
    ) {
      return {
        status: "skipped",
        detail: `Skipped: duplicate of #${duplicate.number} (${duplicate.url}).`,
        title,
        fingerprint,
        url: duplicate.url,
        body,
      };
    }
  }

  if (remote.requireConfirm) {
    if (!interactive && !options.assumeYes) {
      return {
        status: "refused",
        detail:
          "Issue creation requires confirmation. In non-interactive mode pass --yes to approve.",
        title,
        fingerprint,
        body,
      };
    }
    if (
      interactive &&
      !options.assumeYes &&
      !(await confirmInteractive(`Create issue "${title}" in ${repo}?`))
    ) {
      return {
        status: "skipped",
        detail: "Issue creation declined.",
        title,
        fingerprint,
        body,
      };
    }
  }

  try {
    const url = gh(
      ["issue", "create", "--repo", repo, "--title", title, "--body-file", "-"],
      body,
    );
    return {
      status: "created",
      detail: `Created issue in ${repo}.`,
      title,
      fingerprint,
      url: url || undefined,
      body,
    };
  } catch (error) {
    return {
      status: "refused",
      detail: `gh issue create failed: ${error instanceof Error ? error.message : String(error)}`,
      title,
      fingerprint,
      body,
    };
  }
}

export async function runIntelSuggest(
  options: IntelRunOptions,
): Promise<IntelRunResult> {
  const cwd = options.cwd ?? process.cwd();
  const now = options.now ?? new Date();
  const config = resolveIntelConfig(options);

  const local = collectLocalSignals(config, cwd, now);
  const market = collectMarketSignals(config, now);
  const github = options.fixture
    ? loadFixture(path.resolve(cwd, options.fixture))
    : await collectGitHubSignals(config, now);

  const signals = [...local.signals, ...market.signals, ...github.signals];
  const coverage = [...local.coverage, ...market.coverage, ...github.coverage];
  const candidates = reviewCandidates(scoreCandidates(signals), config);
  const renderInput: RenderInput = { config, signals, candidates, coverage };
  const prd = renderPrd(renderInput);
  const gapReport = renderGapReport(renderInput);

  const result: IntelRunResult = {
    ...renderInput,
    prd,
    gapReport,
    outputPaths: {},
  };

  if (options.createIssue) {
    result.issue = await createGitHubIssue(renderInput, options);
  }

  if (!options.dryRun) {
    const outDir = path.resolve(cwd, config.output.dir);
    fs.mkdirSync(outDir, { recursive: true });
    const stem = `${reportDate(now)}-intel`;
    if (config.output.formats.includes("md")) {
      const prdPath = path.join(outDir, `${reportDate(now)}-prd.md`);
      const gapPath = path.join(outDir, `${reportDate(now)}-gap-report.md`);
      fs.writeFileSync(prdPath, prd, "utf-8");
      fs.writeFileSync(gapPath, gapReport, "utf-8");
      result.outputPaths.prd = prdPath;
      result.outputPaths.gapReport = gapPath;
    }
    if (config.output.formats.includes("json")) {
      const jsonPath = path.join(outDir, `${stem}.json`);
      fs.writeFileSync(
        jsonPath,
        JSON.stringify(
          {
            config,
            signals,
            candidates,
            coverage,
            issue: result.issue,
            outputPaths: result.outputPaths,
          },
          null,
          2,
        ),
        "utf-8",
      );
      result.outputPaths.json = jsonPath;
    }
  }

  return result;
}
