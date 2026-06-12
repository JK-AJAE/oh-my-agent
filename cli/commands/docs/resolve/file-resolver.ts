/**
 * File reference resolution for the docs resolver.
 *
 * Design: docs/plans/designs/008-oma-docs.md § Resolver
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { toPosixPath } from "../../../utils/fs-utils.js";

// ---------------------------------------------------------------------------
// Internal helpers — file resolution
// ---------------------------------------------------------------------------

/**
 * Case-sensitive file existence check using fs.readdir (not fs.access).
 * Required because macOS is case-insensitive but git is not.
 *
 * Per-directory listing cache. Same directory queried for multiple file refs
 * (extremely common — `src/`, `cli/commands/`, etc. each accumulate hundreds
 * of refs) reuses one readdir call. Without this cache, full-repo verify
 * does ~12k readdir syscalls; with the cache, typically under 200.
 */
const dirListingCache = new Map<string, Set<string> | null>();

function existsCaseSensitive(absPath: string): boolean {
  const dir = path.dirname(absPath);
  const base = path.basename(absPath);
  let entries = dirListingCache.get(dir);
  if (entries === undefined) {
    try {
      entries = new Set(fs.readdirSync(dir));
    } catch {
      entries = null;
    }
    dirListingCache.set(dir, entries);
  }
  return entries?.has(base) ?? false;
}

/**
 * Reset the directory listing cache. Tests call this between fixtures to
 * avoid stale entries; production callers don't need to.
 */
export function _clearDirListingCache(): void {
  dirListingCache.clear();
  trackedFilesCache.clear();
}

// ---------------------------------------------------------------------------
// Internal helpers — repo-wide suffix resolution
// ---------------------------------------------------------------------------

// git-tracked file list per repo root, loaded lazily. `null` = git
// unavailable (not a repo, no binary) — suffix resolution is then skipped.
const trackedFilesCache = new Map<string, string[] | null>();

function getTrackedFiles(repoRoot: string): string[] | null {
  let cached = trackedFilesCache.get(repoRoot);
  if (cached === undefined) {
    try {
      const out = execSync("git ls-files", {
        cwd: repoRoot,
        encoding: "utf-8",
        stdio: ["ignore", "pipe", "ignore"],
        maxBuffer: 64 * 1024 * 1024,
      });
      cached = out.split("\n").filter(Boolean);
    } catch {
      cached = null;
    }
    trackedFilesCache.set(repoRoot, cached);
  }
  return cached;
}

/**
 * Last-resort resolution: the target matches a tracked file by path suffix.
 * Docs conventionally reference per-context paths from elsewhere — e.g.
 * `resources/checklist.md` (exists under every skill) mentioned from
 * `web/docs/` — which no fixed search root can anticipate. Only
 * multi-segment targets qualify: a bare filename suffix-matches far too
 * loosely to be evidence the reference is intact.
 */
function resolvesBySuffix(target: string, repoRoot: string): boolean {
  const normalized = toPosixPath(target).replace(/^(?:\.\.?\/)+/, "");
  if (!normalized.includes("/")) return false;
  const files = getTrackedFiles(repoRoot);
  if (!files) return false;
  const suffix = `/${normalized}`;
  return files.some((f) => f === normalized || f.endsWith(suffix));
}

// Convention prefixes searched when both doc-relative and repo-root
// resolution fail. Many OMA docs reference well-known files (e.g.
// `oma-config.yaml`, `mcp.json`) that actually live under `.agents/`,
// or skill resources under `.agents/skills/`. Adding these search roots
// catches the common case without requiring docs to write the full path.
const FALLBACK_PREFIXES = [".agents", "cli", "docs"];

/**
 * Candidate paths for a target. Extensionless targets are commonly
 * Docusaurus-style doc links (`../guide/intro`, `/docs/core-concepts/agents`)
 * that resolve to `<target>.md` or `<target>/index.md` on disk.
 */
function existsWithDocExpansion(absPath: string): boolean {
  if (existsCaseSensitive(absPath)) return true;
  if (path.extname(absPath) !== "") return false;
  return (
    existsCaseSensitive(`${absPath}.md`) ||
    existsCaseSensitive(path.join(absPath, "index.md"))
  );
}

export async function resolveFile(
  target: string,
  docPath: string,
  repoRoot: string,
): Promise<{ ok: boolean; reason?: string }> {
  // Anchor fragments (`commands.md#doctor`) reference a section within the
  // file; resolution applies to the file itself.
  const cleanTarget = target.replace(/#.*$/, "");
  if (!cleanTarget) return { ok: true };

  // Root-absolute targets (`/docs/core-concepts/agents`) are site routes,
  // not filesystem paths. Docusaurus serves `web/docs/**` under `/docs/`,
  // so try the route under `web/` first, then repo-root-relative. A literal
  // absolute path that exists on disk still resolves (machine-local refs in
  // generated reports).
  if (cleanTarget.startsWith("/")) {
    if (existsCaseSensitive(cleanTarget)) {
      return { ok: true };
    }
    const routeRel = cleanTarget.slice(1);
    if (
      existsWithDocExpansion(path.resolve(repoRoot, "web", routeRel)) ||
      existsWithDocExpansion(path.resolve(repoRoot, routeRel))
    ) {
      return { ok: true };
    }
    return {
      ok: false,
      reason: `file_missing (route ${cleanTarget} tried: web/${routeRel}, ${routeRel}, with .md and /index.md expansion)`,
    };
  }

  // 1. Doc-relative resolution, walking up every ancestor directory to the
  //    repo root (the repo root itself is the final iteration). Skill docs
  //    commonly reference siblings relative to the skill root — e.g.
  //    `resources/checklist.md` written inside `resources/execution-protocol.md`
  //    — so ancestor resolution is required to avoid false positives.
  const docDir = path.dirname(path.join(repoRoot, docPath));
  const docRelPath = path.resolve(docDir, cleanTarget);
  let current = docDir;
  while (current.startsWith(repoRoot)) {
    if (existsWithDocExpansion(path.resolve(current, cleanTarget))) {
      return { ok: true };
    }
    if (current === repoRoot) break;
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }

  // 2. Fallback prefixes (.agents/, cli/, docs/)
  for (const prefix of FALLBACK_PREFIXES) {
    const prefixedPath = path.resolve(repoRoot, prefix, cleanTarget);
    if (existsWithDocExpansion(prefixedPath)) {
      return { ok: true };
    }
  }

  // 3. Repo-wide suffix match against git-tracked files
  if (resolvesBySuffix(cleanTarget, repoRoot)) {
    return { ok: true };
  }

  // All failed
  const repoRelPath = path.resolve(repoRoot, cleanTarget);
  const attempted1 = toPosixPath(path.relative(repoRoot, docRelPath));
  const attempted2 = toPosixPath(path.relative(repoRoot, repoRelPath));
  return {
    ok: false,
    reason: `file_missing (tried: ${attempted1}, ${attempted2}, ancestor dirs, ${FALLBACK_PREFIXES.map((p) => `${p}/${cleanTarget}`).join(", ")})`,
  };
}
