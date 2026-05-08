import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import type { OmaConfig } from "../../platform/agent-config.js";
import { ConfigError } from "./config-error.js";

function findFileUp(startDir: string, relativePath: string): string | null {
  let current = path.resolve(startDir);
  const root = path.parse(current).root;
  while (current !== root) {
    const candidate = path.join(current, relativePath);
    if (fs.existsSync(candidate)) return candidate;
    current = path.dirname(current);
  }
  return null;
}

/**
 * Load user config from the canonical .agents/oma-config.yaml.
 * Returns partial OmaConfig shape — only fields present in the file are set.
 * Migration 003 ensures oma-config.yaml is the only user config file.
 *
 * Throws ConfigError with file:line:col when the file exists but contains
 * invalid YAML, so the user gets an actionable error message.
 */
export function loadUserConfig(cwd: string): Partial<OmaConfig> {
  const canonicalPath = findFileUp(
    cwd,
    path.join(".agents", "oma-config.yaml"),
  );
  if (!canonicalPath) return {};
  let content: string;
  try {
    content = fs.readFileSync(canonicalPath, "utf-8");
  } catch {
    return {};
  }
  try {
    const parsed = parseYaml(content);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Partial<OmaConfig>;
    }
    return {};
  } catch (err) {
    const pos =
      err &&
      typeof err === "object" &&
      "linePos" in err &&
      Array.isArray((err as { linePos: unknown[] }).linePos) &&
      (err as { linePos: Array<{ line: number; col: number }> }).linePos
        .length > 0
        ? (err as { linePos: Array<{ line: number; col: number }> }).linePos[0]
        : null;
    const location = pos
      ? `${canonicalPath}:${pos.line}:${pos.col}`
      : canonicalPath;
    throw new ConfigError(
      `Failed to parse YAML at ${location}: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}
